import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export interface Platform {
  name: string;
  icon: string;
  iconStyle?: React.CSSProperties;
  link: string;
}

export default function PlatformGrid({
  platforms,
}: {
  platforms: Platform[];
}) {
  return (
    <div className={styles.grid}>
      {platforms.map((p) => (
        <Link key={p.link} to={p.link} className={styles.card}>
          <div className={styles.icon}>
            <img src={p.icon} alt={`${p.name} logo`} style={p.iconStyle} />
          </div>
          <div className={styles.name}>{p.name}</div>
        </Link>
      ))}
    </div>
  );
}
