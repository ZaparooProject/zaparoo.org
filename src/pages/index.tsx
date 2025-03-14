import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <img
            src="/img/logo_lockup_white.png"
            alt="Zaparoo Logo"
            style={{ height: "200px" }}
          />
        </Heading>
        <p className="hero__subtitle">
          <img
            src="/img/universal_loading_system_white.png"
            alt="Universal Loading System"
            style={{ height: "40px" }}
          />
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/downloads">
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              icon={["fas", "download"]}
            />{" "}
            Download Zaparoo
            <br />
            <small>v2.1.1 (2025-01-08)</small>
          </Link>
        </div>
        <div className={styles.buttons} style={{ marginTop: "15px" }}>
          <Link
            className="button button--secondary button--lg"
            to="https://wiki.zaparoo.org/Getting_started"
          >
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              icon={["fas", "book"]}
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
      </main>
    </Layout>
  );
}
