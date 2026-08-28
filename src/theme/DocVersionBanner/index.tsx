import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { usePluginData } from "@docusaurus/useGlobalData";
import OriginalDocVersionBanner from "@theme-original/DocVersionBanner";
import type { Props } from "@theme/DocVersionBanner";

interface DocsGlobalData {
  versions: {
    isLast: boolean;
    path: string;
    docs: { path: string }[];
  }[];
}

const trimSlash = (value: string) => value.replace(/\/+$/, "");

export default function DocVersionBanner(props: Props): ReactNode {
  const { pathname } = useLocation();
  const docsData = usePluginData(
    "docusaurus-plugin-content-docs",
  ) as DocsGlobalData;
  const isNextVersion =
    pathname === "/docs/next" || pathname.startsWith("/docs/next/");

  if (!isNextVersion) {
    return <OriginalDocVersionBanner {...props} />;
  }

  // Link to the same page in Stable when it exists there, otherwise to the
  // Stable docs root so Next-only pages never produce a broken link.
  const stableVersion =
    docsData.versions.find((version) => version.isLast) ??
    docsData.versions[0];
  const candidate = pathname.replace(/^\/docs\/next(?=\/|$)/, "/docs");
  const existsInStable = stableVersion.docs.some(
    (doc) => trimSlash(doc.path) === trimSlash(candidate),
  );
  const stablePath = existsInStable ? candidate : stableVersion.path;

  return (
    <div
      className={clsx(
        props.className,
        "theme-doc-version-banner alert alert--warning margin-bottom--md",
      )}
      role="alert"
    >
      <div>
        This is unreleased documentation for the next Zaparoo Core release.
      </div>
      <div className="margin-top--md">
        For up-to-date documentation, see the{" "}
        <strong>
          <Link to={stablePath}>latest version</Link>
        </strong>{" "}
        (Stable).
      </div>
    </div>
  );
}
