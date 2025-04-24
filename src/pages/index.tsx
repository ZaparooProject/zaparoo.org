import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";
import Showcase from "@site/src/components/Showcase";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx("hero hero--primary", styles.heroBanner)}
      style={{
        backgroundImage: "url('./img/circuit-board.svg')",
        backgroundRepeat: "repeat",
      }}
    >
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
            src="/img/universal_loading_system_white_sm.webp"
            alt="Universal Loading System"
            height="40px"
            width="252px"
          />
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/downloads/"
            data-umami-event="hero-download"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/img/download-solid.svg"
                alt="Download icon"
                height="16px"
                width="16px"
                style={{ marginRight: "8px" }}
              />
              Download
            </div>
            <small>v2.3.0 (2025-04-24)</small>
          </Link>
        </div>
        <div className={styles.buttons} style={{ marginTop: "15px" }}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            data-umami-event="hero-getting-started"
          >
            <img
              src="/img/book.svg"
              alt="Book icon"
              height="16px"
              width="16px"
              style={{ marginRight: "5px" }}
            />{" "}
            Getting Started
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
        <Showcase limit={20} />
      </main>
    </Layout>
  );
}
