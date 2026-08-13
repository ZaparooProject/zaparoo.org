import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import CardLink from "./CardLink";
import { listedPlatforms } from "@site/src/data/platforms";
import styles from "./Homepage.module.css";

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
          <h2 className={styles.sectionTitle}>Works with Your Setup</h2>
          <p className={styles.sectionSubtitle}>
            Use Zaparoo across supported gaming platforms, readers, and token
            types.
          </p>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <h3 className={styles.sectionHeader}>Platforms</h3>
          <div className={styles.platformBadges}>
            {listedPlatforms.map((platform) => (
              <Link
                key={platform.id}
                to={platform.docsPath}
                className={styles.platformBadge}
                style={{ textDecoration: "none" }}
              >
                {platform.name}
              </Link>
            ))}
          </div>
          <div className={styles.categoryLinks}>
            <CardLink
              to="/docs/platforms/"
              umamiEvent="homepage-compare-platforms"
            >
              Compare all platforms
            </CardLink>
          </div>
        </div>

        <div>
          <h3 className={styles.sectionHeader}>Ways to launch</h3>
          <div className={styles.platformBadges}>
            {tokens.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={styles.platformBadge}
                style={{ textDecoration: "none" }}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className={styles.categoryLinks}>
            <CardLink
              to="/docs/tokens/"
              umamiEvent="homepage-compare-token-types"
            >
              Compare token types
            </CardLink>
            <CardLink
              to="/docs/readers/"
              umamiEvent="homepage-compare-readers"
            >
              Compare readers
            </CardLink>
          </div>
        </div>
      </div>
    </section>
  );
}
