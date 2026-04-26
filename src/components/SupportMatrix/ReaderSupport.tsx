import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import clsx from "clsx";
import { getStatusLabel, resolveSupportHref, type ReaderSupportGroup } from "./types";
import styles from "./styles.module.css";

interface ReaderSupportProps {
  groups: ReaderSupportGroup[];
}

export default function ReaderSupport({ groups }: ReaderSupportProps): ReactNode {
  const { pathname } = useLocation();

  return (
    <div className={styles.supportSection}>
      <div className={styles.readerGrid}>
        {groups.map((group) => (
          <div key={group.name} className={styles.readerGroup}>
            <div className={styles.groupTitle}>{group.name}</div>
            <div className={styles.readerList}>
              {group.readers.map((reader) => {
                const content = (
                  <>
                    <div className={styles.itemMain}>
                      <span className={styles.itemName}>{reader.name}</span>
                      <span className={styles.status}>{getStatusLabel(reader.support)}</span>
                    </div>
                    <div className={styles.readerMeta}>
                      {reader.setup && <span className={styles.setup}>{reader.setup}</span>}
                      {reader.note && <span className={styles.note}>{reader.note}</span>}
                    </div>
                  </>
                );
                const className = clsx(styles.readerItem, styles[reader.support]);

                return reader.href ? (
                  <Link key={reader.name} to={resolveSupportHref(reader.href, pathname)} className={className}>
                    {content}
                  </Link>
                ) : (
                  <div key={reader.name} className={className}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
