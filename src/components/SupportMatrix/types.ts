import type { ReactNode } from "react";

export type SupportStatus = "supported" | "limited" | "unsupported" | "unknown";

export interface SupportItem {
  name: string;
  href?: string;
  support: SupportStatus;
  note?: ReactNode;
  /** Only shown in the Next docs, for support the Stable release lacks. */
  nextOnly?: boolean;
  /** Values the Stable and older docs show instead, until the next release. */
  stable?: Partial<Pick<SupportItem, "support" | "note">> & { setup?: ReactNode };
}

export interface PlatformSupportGroup {
  name: string;
  platforms: SupportItem[];
}

export interface ReaderSupportItem extends SupportItem {
  setup?: ReactNode;
}

export interface ReaderSupportGroup {
  name: string;
  readers: ReaderSupportItem[];
}

export function getStatusLabel(status: SupportStatus): string {
  switch (status) {
    case "supported":
      return "Supported";
    case "limited":
      return "Limited";
    case "unsupported":
      return "Not supported";
    case "unknown":
      return "Not verified";
  }
}

export function getStatusSymbol(status: SupportStatus): string {
  switch (status) {
    case "supported":
      return "✓";
    case "limited":
      return "!";
    case "unsupported":
      return "×";
    case "unknown":
      return "?";
  }
}

const docsSections = new Set([
  "app",
  "core",
  "designer",
  "features",
  "platforms",
  "readers",
  "tokens",
  "zapesp32",
  "zapscript",
]);

export function resolveSupportHref(href: string, pathname: string): string {
  if (href.startsWith("/") || href.startsWith("http") || href.startsWith("#")) {
    return href;
  }

  const parts = pathname.split("/").filter(Boolean);
  const docsIndex = parts.findIndex((segment) => segment === "docs");
  if (docsIndex === -1) {
    return href;
  }

  const afterDocs = parts[docsIndex + 1];
  const docsRoot = afterDocs && !docsSections.has(afterDocs)
    ? `/${parts.slice(0, docsIndex + 2).join("/")}`
    : `/${parts.slice(0, docsIndex + 1).join("/")}`;
  const docsPath = href.replace(/^(\.\.\/)+/, "").replace(/^\.\//, "");

  return `${docsRoot}/${docsPath}`;
}

/** Reports whether pathname is a page of the unreleased Next docs. */
export function isNextDocs(pathname: string): boolean {
  const parts = pathname.split("/").filter(Boolean);
  const docsIndex = parts.findIndex((segment) => segment === "docs");
  return docsIndex !== -1 && parts[docsIndex + 1] === "next";
}

/**
 * Returns items as the docs version at pathname should show them: Next shows
 * them as written, and every released version drops Next-only items and
 * applies their Stable values.
 */
export function forDocsVersion<T extends SupportItem>(items: T[], pathname: string): T[] {
  if (isNextDocs(pathname)) {
    return items;
  }
  return items.filter((item) => !item.nextOnly).map((item) => (item.stable ? { ...item, ...item.stable } : item));
}
