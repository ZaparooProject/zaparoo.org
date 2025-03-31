import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faBook } from "@fortawesome/free-solid-svg-icons";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <img
            src="./img/logo_lockup_white_sm.webp"
            alt="Zaparoo Logo"
            height="200px"
            width="286px"
          />
        </Heading>
        <p className="hero__subtitle">
          <img
            src="./img/universal_loading_system_white_sm.webp"
            alt="Universal Loading System"
            height="40px"
            width="252px"
          />
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/downloads">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="./img/download-solid.svg"
                alt="Download icon"
                height="16px"
                width="16px"
                style={{ marginRight: "8px" }}
              />
              Download Zaparoo
            </div>
            <small>v2.2.0 (2025-03-31)</small>
          </Link>
        </div>
        <div className={styles.buttons} style={{ marginTop: "15px" }}>
          <Link
            className="button button--secondary button--lg"
            to="https://wiki.zaparoo.org/Getting_started"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src="./img/bolt-lightning-solid.svg"
              alt="Lightning icon"
              height="16px"
              width="16px"
              style={{ marginRight: "5px" }}
            />{" "}
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Open Source Universal Loading System"
      description="The open source universal loading system. Launch media and scripted actions using physical objects. Create your collection how YOU want."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
