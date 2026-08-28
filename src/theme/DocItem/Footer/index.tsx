import type { ReactNode } from "react";
import { useLocation } from "@docusaurus/router";
import OriginalDocItemFooter from "@theme-original/DocItem/Footer";
import coreRelease from "@site/src/data/coreRelease";
import styles from "./styles.module.css";

export default function DocItemFooter(): ReactNode {
  const { pathname } = useLocation();
  const version = pathname.startsWith("/docs/next/")
    ? "Next"
    : `${coreRelease.version} (Stable)`;
  const permalink = `https://zaparoo.org${pathname}`;
  const title = `Docs: ${pathname}`;
  const body = [
    "### Documentation page",
    permalink,
    "",
    "### Documentation version",
    version,
    "",
    "### What is outdated, missing, or unclear?",
    "",
  ].join("\n");
  const issueUrl =
    "https://github.com/ZaparooProject/zaparoo.org/issues/new" +
    `?title=${encodeURIComponent(title)}` +
    `&body=${encodeURIComponent(body)}`;

  return (
    <>
      <OriginalDocItemFooter />
      <aside className={styles.feedback} aria-label="Documentation feedback">
        <div>
          <strong>Found outdated or unclear information?</strong>
          <p>
            Open a prefilled issue for this page and documentation version, or
            ask in{" "}
            <a
              href="https://zaparoo.org/discord"
              data-umami-event="docs-feedback-discord"
            >
              Discord
            </a>
            .
          </p>
        </div>
        <a
          className="button button--secondary button--outline"
          href={issueUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="docs-report-outdated"
          data-umami-event-doc={pathname}
          data-umami-event-version={version}
        >
          Report a docs issue
        </a>
      </aside>
    </>
  );
}
