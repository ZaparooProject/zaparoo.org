import React from "react";
import { CloudUpload } from "lucide-react";
import Notice from "@site/src/components/Notice";
import products from "@site/src/data/products";
import styles from "./styles.module.css";

interface Props {
  /** MiSTer adds the saves and settings line. Generic is platform-neutral. */
  platform?: "mister" | "generic";
  /** utm_content value for the pricing link, also used for the umami event. */
  utmContent?: string;
}

export default function WarpCallout({
  platform = "generic",
  utmContent = "docs_callout",
}: Props) {
  const { warp } = products;
  const isMister = platform === "mister";
  const title = isMister
    ? "Want automatic off-site backups on your MiSTer?"
    : "Want automatic off-site backups?";

  return (
    <Notice
      as="aside"
      title={title}
      icon={<CloudUpload size={20} />}
      tone="brand"
      className={styles.callout}
      ariaLabel="Zaparoo Warp"
    >
      <p>
        {warp.summary} {warp.snapshots}{" "}
        {isMister
          ? "MiSTer snapshots also cover saves, save states, settings, and input mappings. "
          : ""}
        {warp.priceLine} {warp.freeLine}
      </p>
      <a
        href={warp.pricingUrl(utmContent)}
        data-umami-event={`${utmContent.replace(/_/g, "-")}-warp`}
      >
        {warp.cta}
      </a>
    </Notice>
  );
}
