import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = path.join(root, 'docs');
const generatedPrefixes = [
  'docs/core/api/',
  'docs/core/contributing/',
  'docs/zapesp32/',
];

function usage() {
  console.log(`Usage: pnpm docs:sync-stable [-- --write|--check] [docs/path ...]

With no paths, inspects changed Markdown and MDX files under docs/.

  (no flag)  Dry-run and classify each file
  --write    Copy safe files; refuse files with different release baselines
  --check    Verify safe copies and require a changed stable counterpart for
             files with different release baselines

Generated remote-content directories are always excluded.`);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function gitPaths(args) {
  const output = execFileSync('git', args, { cwd: root, encoding: 'buffer' });
  return output.toString('utf8').split('\0').filter(Boolean);
}

function headContent(file) {
  try {
    return execFileSync('git', ['show', `HEAD:${file}`], {
      cwd: root,
      encoding: 'buffer',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return null;
  }
}

function workingContent(file) {
  const absolute = path.join(root, file);
  return fs.existsSync(absolute) && fs.statSync(absolute).isFile()
    ? fs.readFileSync(absolute)
    : null;
}

function equal(left, right) {
  return left !== null && right !== null && left.equals(right);
}

function normalizeSource(input) {
  const candidate = input.startsWith('docs/') ? input : `docs/${input}`;
  const normalized = path.posix.normalize(candidate.replaceAll('\\', '/'));
  if (
    normalized === 'docs' ||
    !normalized.startsWith('docs/') ||
    !/\.(?:md|mdx)$/i.test(normalized)
  ) {
    fail(`Invalid docs path: ${input}`);
  }
  return normalized;
}

function isGenerated(file) {
  return generatedPrefixes.some((prefix) => file.startsWith(prefix));
}

const rawArgs = process.argv.slice(2).filter((arg) => arg !== '--');
if (rawArgs.includes('--help') || rawArgs.includes('-h')) {
  usage();
  process.exit(0);
}

const write = rawArgs.includes('--write');
const check = rawArgs.includes('--check');
if (write && check) fail('Choose either --write or --check, not both.');

const requested = rawArgs.filter((arg) => !arg.startsWith('--'));
const unknownFlags = rawArgs.filter(
  (arg) => arg.startsWith('--') && !['--write', '--check'].includes(arg),
);
if (unknownFlags.length > 0) fail(`Unknown option: ${unknownFlags[0]}`);

const versions = JSON.parse(
  fs.readFileSync(path.join(root, 'versions.json'), 'utf8'),
);
if (!Array.isArray(versions) || typeof versions[0] !== 'string') {
  fail('versions.json does not contain a latest stable version.');
}

const stableVersion = versions[0];
const stablePrefix = `versioned_docs/version-${stableVersion}`;
const discovered = requested.length > 0
  ? requested.map(normalizeSource)
  : [
      ...gitPaths(['diff', '--name-only', '-z', 'HEAD', '--', 'docs']),
      ...gitPaths([
        'ls-files',
        '--others',
        '--exclude-standard',
        '-z',
        '--',
        'docs',
      ]),
    ].filter((file) => /\.(?:md|mdx)$/i.test(file));

const generated = [];
const sources = [...new Set(discovered)].sort().filter((file) => {
  if (!isGenerated(file)) return true;
  generated.push(file);
  return false;
});

if (requested.length > 0 && generated.length > 0) {
  fail(`Generated remote content cannot be synchronized: ${generated[0]}`);
}

if (sources.length === 0) {
  console.log('No changed current documentation files require stable review.');
  process.exit(0);
}

const results = sources.map((source) => {
  const relative = path.posix.relative('docs', source);
  const stable = `${stablePrefix}/${relative}`;
  const currentHead = headContent(source);
  const stableHead = headContent(stable);
  const currentWork = workingContent(source);
  const stableWork = workingContent(stable);

  if (currentWork === null) {
    return { source, stable, kind: 'deleted', currentWork, stableWork };
  }

  if (currentHead === null && stableHead === null) {
    return { source, stable, kind: 'safe-new', currentWork, stableWork };
  }

  if (currentHead !== null && stableHead !== null && currentHead.equals(stableHead)) {
    return { source, stable, kind: 'safe-existing', currentWork, stableWork };
  }

  return {
    source,
    stable,
    kind: 'manual',
    currentWork,
    stableWork,
    stableChanged:
      stableWork !== null &&
      (stableHead === null || !stableWork.equals(stableHead)),
  };
});

let failures = 0;
let writes = 0;
for (const result of results) {
  const label = `${result.source} -> ${result.stable}`;

  if (result.kind === 'deleted') {
    console.error(`MANUAL DELETE: ${label}`);
    failures += 1;
    continue;
  }

  if (result.kind === 'manual') {
    if (check && result.stableChanged) {
      console.log(`MANUAL CHANGED (inspect diff): ${label}`);
    } else if (write || check) {
      console.error(`MANUAL REQUIRED: ${label}`);
      failures += 1;
    } else {
      console.log(`MANUAL REQUIRED: ${label}`);
    }
    continue;
  }

  if (check) {
    if (equal(result.currentWork, result.stableWork)) {
      console.log(`SYNCED: ${label}`);
    } else {
      console.error(`OUT OF SYNC: ${label}`);
      failures += 1;
    }
    continue;
  }

  if (write) {
    fs.mkdirSync(path.dirname(path.join(root, result.stable)), {
      recursive: true,
    });
    fs.copyFileSync(path.join(root, result.source), path.join(root, result.stable));
    console.log(`${result.stableWork === null ? 'CREATED' : 'COPIED'}: ${label}`);
    writes += 1;
    continue;
  }

  if (equal(result.currentWork, result.stableWork)) {
    console.log(`SYNCED: ${label}`);
  } else {
    console.log(`${result.stableWork === null ? 'CREATE' : 'COPY'}: ${label}`);
  }
}

if (generated.length > 0) {
  console.log(`Skipped ${generated.length} generated remote-content file(s).`);
}

if (!write && !check) {
  console.log('\nDry run only. Use --write to copy safe files, then --check.');
}
if (write) console.log(`\nWrote ${writes} safe stable file(s).`);

if (failures > 0) process.exit(write ? 2 : 1);
