import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

interface Props {
  variant?: "sponsor" | "combined";
}

export default function SponsorCallout({ variant = "sponsor" }: Props) {
  const warpUrl = `https://zaparoo.com/pricing?utm_source=zaparoo.org&utm_medium=referral&utm_campaign=warp&utm_content=${
    variant === "combined" ? "release_callout" : "sponsor_callout"
  }`;

  return (
    <div className={variant === "combined" ? styles.combined : styles.sponsor}>
      Zaparoo is free and open source.{" "}
      <a
        href={warpUrl}
        data-umami-event={
          variant === "combined"
            ? "release-callout-warp"
            : "sponsor-callout-warp"
        }
      >
        Warp cloud backup
      </a>{" "}
      and{" "}
      <Link
        to="/sponsor/"
        data-umami-event={
          variant === "combined"
            ? "release-callout-support"
            : "sponsor-callout-support"
        }
      >
        other ways to support the project
      </Link>{" "}
      help fund continued development.
    </div>
  );
}
