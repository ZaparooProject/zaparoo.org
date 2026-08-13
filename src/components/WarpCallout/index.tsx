import React from "react";
import { CloudUpload } from "lucide-react";
import Notice from "@site/src/components/Notice";
import styles from "./styles.module.css";

const warpUrl =
  "https://zaparoo.com/pricing?utm_source=zaparoo.org&utm_medium=referral&utm_campaign=warp&utm_content=backup_post";

export default function WarpCallout() {
  return (
    <Notice
      as="aside"
      title="Want automatic off-site backups on your MiSTer?"
      icon={<CloudUpload size={20} />}
      tone="brand"
      className={styles.callout}
      ariaLabel="Zaparoo Warp"
    >
      <p>
        Warp keeps up to 30 changed snapshots per device and can restore them to
        this MiSTer or a replacement. It costs US$29.99/year or US$3.99/month.
        Local backups remain free.
      </p>
      <a href={warpUrl} data-umami-event="backup-post-warp">
        See Warp backup plans
      </a>
    </Notice>
  );
}
