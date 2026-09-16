#!/usr/bin/env node
/**
 * Regenerates the plain Markdown reader tables on the platform README pages
 * from src/data/readerSupport.ts, so the pages and the <ReaderSupport>
 * component never drift. Run: pnpm docs:reader-tables
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Platform id -> README page (plain Markdown pages only; .mdx pages use <ReaderSupport />)
const pages = {
  mister: "docs/platforms/mister/index.md",
  mistex: "docs/platforms/mistex.md",
  batocera: "docs/platforms/batocera/index.md",
  steamos: "docs/platforms/steamos/index.md",
  windows: "docs/platforms/windows/index.md",
  linux: "docs/platforms/linux/index.md",
  libreelec: "docs/platforms/libreelec.md",
  replayos: "docs/platforms/replayos.md",
};

const labels = { supported: "Supported", limited: "Limited", unsupported: "Not supported" };

function loadData() {
  const src = readFileSync(resolve(root, "src/data/readerSupport.ts"), "utf8");
  const start = src.indexOf("= {") + 2;
  const end = src.lastIndexOf("} satisfies") + 1;
  return JSON.parse(src.slice(start, end));
}

function docLink(fromPage, href) {
  // hrefs are docs-root relative without extension ("readers/nfc/pn532-usb", "app/")
  const target = href.endsWith("/") ? `${href}index.md` : `${href}.md`;
  let rel = relative(dirname(fromPage), `docs/${target}`);
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel;
}

function renderTable(page, groups) {
  const rows = ["| Type | Reader | Support | Setup | Notes |", "| ---- | ------ | ------- | ----- | ----- |"];
  for (const group of groups) {
    for (const r of group.readers) {
      rows.push(
        `| ${group.name} | [${r.name}](${docLink(page, r.href)}) | ${labels[r.support]} | ${r.setup ?? ""} | ${r.note ?? ""} |`,
      );
    }
  }
  return rows.join("\n");
}

const data = loadData();
let changed = 0;
for (const [platform, page] of Object.entries(pages)) {
  const path = resolve(root, page);
  const text = readFileSync(path, "utf8");
  const match = text.match(/^## Readers\n\n([\s\S]*?)(?=\n\n[^|\n])/m);
  if (!match) {
    console.error(`${page}: no "## Readers" table found`);
    process.exitCode = 1;
    continue;
  }
  const table = renderTable(page, data[platform]);
  if (match[1] === table) continue;
  writeFileSync(path, text.replace(match[1], table));
  changed++;
  console.log(`updated ${page}`);
}
console.log(changed ? `${changed} page(s) updated` : "all reader tables up to date");
