import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import styles from "./Homepage.module.css";

const platforms = [
  { name: "MiSTer FPGA", link: "/docs/platforms/mister" },
  { name: "MiSTeX", link: "/docs/platforms/mistex" },
  { name: "Windows", link: "/docs/platforms/windows/" },
  { name: "SteamOS", link: "/docs/platforms/steamos" },
  { name: "Batocera", link: "/docs/platforms/batocera" },
  { name: "LibreELEC", link: "/docs/platforms/libreelec" },
  { name: "Commodore 64", link: "/docs/platforms/commodore64" },
];

const hardware = [
  { name: "NFC Readers", link: "/docs/readers/nfc/" },
  { name: "Phone NFC (via App)", link: "/docs/app/" },
  { name: "Barcode/QR Scanners", link: "/docs/readers/barcode-scanner" },
  { name: "Optical Drives (CD/DVD)", link: "/docs/readers/optical-drive" },
];

export default function PlatformShowcase(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.sectionGray}`}>
      <div className="container">
        <div className="text--center padding-horiz--md">
          <h2 className={styles.sectionTitle}>Supported Hardware</h2>
          <p className={styles.sectionSubtitle}>
            Our mission is Zaparoo on any platform with any hardware.
          </p>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <h3 className={styles.sectionHeader}>Platforms</h3>
          <div className={styles.platformBadges}>
            {platforms.map((platform, index) => (
              <Link
                key={index}
                to={platform.link}
                className={styles.platformBadge}
                style={{ textDecoration: "none" }}
              >
                {platform.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className={styles.sectionHeader}>Hardware</h3>
          <div className={styles.platformBadges}>
            {hardware.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={styles.platformBadge}
                style={{ textDecoration: "none" }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
