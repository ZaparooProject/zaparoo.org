import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import clsx from "clsx";
import { getStatusLabel, getStatusSymbol, resolveSupportHref, type PlatformSupportGroup } from "./types";
import styles from "./styles.module.css";
import {
  platformSupportByReader,
  type PlatformSupportEntry,
  type PlatformSupportReaderId,
} from "@site/src/data/platformSupport";

interface PlatformSupportProps {
  /** Reader id from src/data/platformSupport.ts. */
  readerId?: PlatformSupportReaderId;
  note?: ReactNode;
  /** Explicit groups, for one-off matrices. */
  groups?: PlatformSupportGroup[];
}

export default function PlatformSupport({ readerId, note: explicitNote, groups: explicitGroups }: PlatformSupportProps): ReactNode {
  const { pathname } = useLocation();
  const entry: PlatformSupportEntry | undefined = readerId
    ? (platformSupportByReader as Record<string, PlatformSupportEntry>)[readerId]
    : undefined;
  const groups: PlatformSupportGroup[] = explicitGroups ?? entry?.groups ?? [];
  const note = explicitNote ?? entry?.note;

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
                      <span className={styles.status}>
                        <span className={styles.statusIcon} aria-hidden="true">
                          {getStatusSymbol(platform.support)}
                        </span>
                        {getStatusLabel(platform.support)}
                      </span>
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
