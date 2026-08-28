import React from "react";
import Link from "@docusaurus/Link";
import { Heart } from "lucide-react";
import Notice from "@site/src/components/Notice";
import products from "@site/src/data/products";
import styles from "./styles.module.css";

interface Props {
  variant?: "sponsor" | "combined";
  className?: string;
}

export default function SponsorCallout({
  variant = "sponsor",
  className = "",
}: Props) {
  const combined = variant === "combined";
  const { warp, appPro, shop } = products;
  const warpUrl = warp.pricingUrl(
    combined ? "release_callout" : "sponsor_callout",
  );
  const warpEvent = combined ? "release-callout-warp" : "sponsor-callout-warp";
  const supportEvent = combined
    ? "release-callout-support"
    : "sponsor-callout-support";

  if (combined) {
    return (
      <div
        className={`z-notice z-notice--compact ${styles.combined} ${className}`}
        data-tone="brand"
      >
        Zaparoo is free and open source.{" "}
        <a href={warpUrl} data-umami-event={warpEvent}>
          Warp cloud backup
        </a>{" "}
        (from {warp.priceMonthly}, {appPro.short} included) and{" "}
        <Link to="/sponsor/" data-umami-event={supportEvent}>
          other ways to support the project
        </Link>{" "}
        help fund continued development.
      </div>
    );
  }

  return (
    <Notice
      as="aside"
      title="Keep Zaparoo free and open source"
      icon={<Heart size={20} />}
      tone="brand"
      className={`${styles.sponsor} ${className}`}
      ariaLabel="Support Zaparoo"
    >
      <p>
        <a href={warpUrl} data-umami-event={warpEvent}>
          {warp.short} cloud backup
        </a>{" "}
        (from {warp.priceMonthly}, {appPro.short} included) and{" "}
        <a href={shop.url} data-umami-event="sponsor-callout-shop">
          {shop.name}
        </a>{" "}
        hardware fund development.{" "}
        <Link to="/sponsor/" data-umami-event={supportEvent}>
          Other ways to support Zaparoo
        </Link>
        .
      </p>
    </Notice>
  );
}
