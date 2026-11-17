import React, { CSSProperties, ReactNode } from "react";
import { useLocation } from "@docusaurus/router";
import { withShopUtm } from "@site/src/data/products";
import styles from "./styles.module.css";

export type ProductStore =
  | "amazon"
  | "aliexpress"
  | "elechouse"
  | "jlcpcb"
  | "kogan"
  | "shop"
  | "other";

type ProductLinkProps = {
  href: string;
  store: ProductStore;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  showIcon?: boolean;
  unstyled?: boolean;
  umamiEvent?: string;
  /** Placement name for shop referral tags. Defaults to the site section. */
  utmContent?: string;
};

export default function ProductLink({
  href,
  store,
  children,
  className,
  style,
  showIcon = true,
  unstyled = false,
  umamiEvent,
  utmContent,
}: ProductLinkProps) {
  const { pathname } = useLocation();
  // First path segment: "docs", "blog", "downloads".
  const section = pathname.split("/").filter(Boolean)[0] ?? "homepage";
  const taggedHref = withShopUtm(href, utmContent ?? section);

  const linkClassName = [unstyled ? undefined : styles.productLink, className]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={taggedHref}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClassName || undefined}
      style={style}
      data-umami-event={umamiEvent ?? `product-${store}`}
    >
      {children}
      {showIcon && (
        <svg
          className={styles.externalIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          aria-hidden="true"
        >
          <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" />
        </svg>
      )}
    </a>
  );
}
