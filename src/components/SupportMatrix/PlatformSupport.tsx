import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import clsx from "clsx";
import { getStatusLabel, resolveSupportHref, type PlatformSupportGroup } from "./types";
import styles from "./styles.module.css";

interface PlatformSupportProps {
  note?: ReactNode;
  groups: PlatformSupportGroup[];
}

export default function PlatformSupport({ note, groups }: PlatformSupportProps): ReactNode {
  const { pathname } = useLocation();

  return (
    <div className={styles.supportSection}>
      <div className={styles.familyGrid}>
        {groups.map((group) => (
          <div key={group.name} className={styles.familyCard}>
            <div className={styles.familyTitle}>{group.name}</div>
            <div className={styles.platformList}>
              {group.platforms.map((platform) => {
                const content = (
                  <>
                    <div className={styles.itemMain}>
                      <span className={styles.itemName}>{platform.name}</span>
                      <span className={styles.status}>{getStatusLabel(platform.support)}</span>
                    </div>
                    {platform.note && <div className={styles.note}>{platform.note}</div>}
                  </>
                );
                const className = clsx(styles.platformItem, styles[platform.support]);

                return platform.href ? (
                  <Link key={platform.name} to={resolveSupportHref(platform.href, pathname)} className={className}>
                    {content}
                  </Link>
                ) : (
                  <div key={platform.name} className={className}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {note && <div className={styles.panelNote}>{note}</div>}
    </div>
  );
}
