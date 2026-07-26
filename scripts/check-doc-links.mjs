// Validate changed Markdown/MDX links by default. Pass --all for current unversioned content,
// or pass file paths to check a specific set.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const checkAll = args[0] === '--all';
const requestedFiles = checkAll ? args.slice(1) : args;

function gitPaths(args) {
  const output = execFileSync('git', args, { cwd: root, encoding: 'buffer' });
  return output.toString('utf8').split('\0').filter(Boolean);
}

function changedMarkdownFiles() {
  return [
    ...gitPaths(['diff', '--name-only', '-z', 'HEAD', '--', '*.md', '*.mdx']),
    ...gitPaths(['ls-files', '--others', '--exclude-standard', '-z', '--', '*.md', '*.mdx']),
  ];
}

function allMarkdownFiles() {
  return [
    ...gitPaths(['ls-files', '-z', '--', '*.md', '*.mdx']),
    ...gitPaths(['ls-files', '--others', '--exclude-standard', '-z', '--', '*.md', '*.mdx']),
  ];
}

const selectedFiles = requestedFiles.length > 0
  ? requestedFiles
  : checkAll ? allMarkdownFiles() : changedMarkdownFiles();
const files = [...new Set(selectedFiles)]
  .map((file) => path.relative(root, path.resolve(root, file)))
  .filter((file) => /\.(md|mdx)$/.test(file) && fs.existsSync(path.join(root, file)))
  .filter((file) => !checkAll || !file.startsWith('versioned_docs/'));

function slugify(raw) {
  const explicit = raw.match(/\s*\{#([^}]+)\}\s*$/);
  if (explicit) return explicit[1];

  return raw.toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/!?(\[([^\]]+)\])\([^)]*\)/g, '$2')
    .replace(/[`*~]/g, '')
    .replace(/&amp;/g, '&')
    .replace(/[^\p{L}\p{N}_\-\s]/gu, '')
    .trim()
    .replace(/\s/g, '-');
}

const headingCache = new Map();
function headings(file) {
  if (headingCache.has(file)) return headingCache.get(file);

  const found = new Set();
  const slugCounts = new Map();
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const match = line.match(/^#{1,6}\s+(.+?)\s*$/);
    if (match) {
      const base = slugify(match[1]);
      const count = slugCounts.get(base) ?? 0;
      found.add(count === 0 ? base : `${base}-${count}`);
      slugCounts.set(base, count + 1);
    }
    for (const idMatch of line.matchAll(/(?:id|name)=["']([^"']+)["']/g)) {
      found.add(idMatch[1].toLowerCase());
    }
  }
  headingCache.set(file, found);
  return found;
}

function resolveTarget(source, rawPath) {
  let targetPath;
  try {
    targetPath = decodeURI(rawPath);
  } catch {
    return { malformed: rawPath };
  }
  if (!targetPath) return source;

  const candidates = [];
  if (targetPath.startsWith('/docs/')) {
    const relative = targetPath.slice('/docs/'.length).replace(/\/$/, '');
    if (relative === '') candidates.push('docs/intro.mdx');
    candidates.push(
      `docs/${relative}.md`,
      `docs/${relative}.mdx`,
      `docs/${relative}/index.md`,
      `docs/${relative}/index.mdx`,
    );
  } else if (targetPath.startsWith('/')) {
    // Site routes outside /docs do not map directly to Markdown files.
    return null;
  } else {
    const relative = path.resolve(path.dirname(source), targetPath);
    candidates.push(relative);
    if (!path.extname(relative)) {
      candidates.push(
        `${relative}.md`,
        `${relative}.mdx`,
        path.join(relative, 'index.md'),
        path.join(relative, 'index.mdx'),
      );
    }
  }

  return candidates.map((candidate) => path.resolve(root, candidate)).find(fs.existsSync)
    ?? { missing: candidates.map((candidate) => path.relative(root, candidate)) };
}

const errors = [];
for (const file of files) {
  const source = path.join(root, file);
  const text = fs.readFileSync(source, 'utf8');
  for (const match of text.matchAll(/(?<!!)\[[^\]]+\]\(([^)]+)\)/g)) {
    const href = match[1].trim().split(/\s+['"]/)[0];
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;

    const [rawPath, rawAnchor = ''] = href.split('#', 2);
    const target = resolveTarget(source, rawPath);
    if (target === null) continue;

    const line = text.slice(0, match.index).split('\n').length;
    if (target && typeof target === 'object') {
      if ('malformed' in target) {
        errors.push(`${file}:${line}: malformed link path ${href}`);
      } else {
        errors.push(`${file}:${line}: missing target ${href} (tried ${target.missing.join(', ')})`);
      }
      continue;
    }

    let anchor;
    try {
      anchor = decodeURIComponent(rawAnchor).toLowerCase();
    } catch {
      errors.push(`${file}:${line}: malformed anchor ${href}`);
      continue;
    }
    if (anchor && !headings(target).has(anchor)) {
      errors.push(`${file}:${line}: missing anchor #${rawAnchor} in ${path.relative(root, target)}`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated internal targets and anchors in ${files.length} Markdown/MDX files.`);
