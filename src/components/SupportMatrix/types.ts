import type { ReactNode } from "react";

export type SupportStatus = "supported" | "limited" | "unsupported" | "unknown";

export interface SupportItem {
  name: string;
  href?: string;
  support: SupportStatus;
  note?: ReactNode;
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
