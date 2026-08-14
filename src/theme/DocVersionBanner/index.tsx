import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import OriginalDocVersionBanner from "@theme-original/DocVersionBanner";
import type { Props } from "@theme/DocVersionBanner";

export default function DocVersionBanner(props: Props): ReactNode {
  const { pathname } = useLocation();
  const isNextVersion =
    pathname === "/docs/next" || pathname.startsWith("/docs/next/");

  if (!isNextVersion) {
    return <OriginalDocVersionBanner {...props} />;
  }

  const stablePath = pathname.replace(/^\/docs\/next(?=\/|$)/, "/docs");

  return (
    <div
      className={clsx(
        props.className,
        "theme-doc-version-banner alert alert--warning margin-bottom--md",
      )}
      role="alert"
    >
      <div>This is unreleased documentation for the next Zaparoo version.</div>
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
