import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import styles from "./Homepage.module.css";

const platforms = [
  { name: "MiSTer FPGA", link: "/docs/platforms/mister" },
  { name: "MiSTeX", link: "/docs/platforms/mistex" },
  { name: "RePlayOS", link: "/docs/platforms/replayos" },
  { name: "Windows", link: "/docs/platforms/windows/" },
  { name: "Linux", link: "/docs/platforms/linux" },
  { name: "SteamOS", link: "/docs/platforms/steamos" },
  { name: "Batocera", link: "/docs/platforms/batocera" },
  { name: "LibreELEC", link: "/docs/platforms/libreelec" },
  { name: "Commodore 64", link: "/docs/platforms/commodore64" },
];

const tokens = [
  { name: "NFC Cards", link: "/docs/tokens/nfc/" },
  { name: "NFC Tags", link: "/docs/tokens/nfc/" },
  { name: "QR Codes", link: "/docs/tokens/qr-codes" },
  { name: "Barcodes", link: "/docs/tokens/barcodes" },
  { name: "CDs", link: "/docs/readers/optical-drive" },
  { name: "DVDs", link: "/docs/readers/optical-drive" },
  { name: "Blu-rays", link: "/docs/readers/optical-drive" },
  { name: "Amiibo", link: "/docs/tokens/nfc-toys/amiibo" },
  { name: "Skylanders", link: "/docs/tokens/nfc-toys/skylanders" },
  { name: "Disney Infinity", link: "/docs/tokens/nfc-toys/disney-infinity" },
  { name: "LEGO Dimensions", link: "/docs/tokens/nfc-toys/lego-dimensions" },
  { name: "PCB Cards", link: "/docs/tokens/pcb-cards" },
  { name: "USB Sticks", link: "/docs/readers/external-drive" },
  { name: "SD Cards", link: "/docs/readers/external-drive" },
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
          <h3 className={styles.sectionHeader}>Tokens</h3>
          <div className={styles.platformBadges}>
            {tokens.map((item, index) => (
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
