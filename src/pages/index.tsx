import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import {
  defaultVersion,
  defaultReleaseDate,
} from "@site/src/components/DownloadCard";

import styles from "./index.module.css";
import Showcase from "@site/src/components/Showcase";

const recentPosts = require("../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json");

function LatestNews() {
  return (
    <section className="container">
      <div className="padding-horiz--md">
        <Heading as="h2">What's New</Heading>
      </div>
      <div className="row padding-horiz--md">
        {recentPosts.items.slice(0, 3).map((item, index) => (
          <div key={index} className="col col--4 margin-bottom--lg">
            <Link to={item.permalink}>
              <h3 style={{ marginBottom: "0" }}>{item.title}</h3>
            </Link>
            <small>{new Date(item.date).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx(styles.heroBanner)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        color: 'white'
      }}
    >
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: "url('./img/circuit-board.svg')",
                backgroundRepeat: "repeat",
                opacity: 0.6,
                zIndex: 10,
            }}
        />
      <div className="zaparoo-animated-bg" />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
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
            <small>{`v${defaultVersion} (${defaultReleaseDate})`}</small>
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
        <div style={{ marginTop: "2rem" }}>
          <HomepageFeatures />
        </div>
        <div style={{ marginTop: "2rem" }}>
          <LatestNews />
        </div>
        <div
          style={{
            padding: "1rem",
            paddingBottom: "2rem",
            paddingTop: "2rem",
            backgroundColor: "var(--ifm-color-emphasis-100)",
            backgroundImage: "url('./img/circuit-board-dark.svg')",
            backgroundRepeat: "repeat",
            marginTop: "2rem",
          }}
        >
          <div className="container">
            <div className="text--center padding-horiz--md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                fill="currentColor"
                style={{
                  marginBottom: "0.5rem",
                  color: "var(--ifm-color-primary)",
                  width: "50px",
                  height: "50px",
                }}
              >
                <path d="M0 256L28.5 28c2-16 15.6-28 31.8-28H228.9c15 0 27.1 12.1 27.1 27.1c0 3.2-.6 6.5-1.7 9.5L208 160H347.3c20.2 0 36.7 16.4 36.7 36.7c0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5c0-2.3 .3-4.6 .9-6.9L176 288H32c-17.7 0-32-14.3-32-32z" />
              </svg>
              <Heading as="h2">Community Showcase</Heading>
              <p>
                Check out some of the awesome Zaparoo stuff our community is
                making!
              </p>
            </div>
            <Showcase limit={15} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: "1rem",
                paddingTop: "2rem",
                paddingBottom: "0",
                gap: "0.5rem",
              }}
            >
              <div style={{ textAlign: "center", fontWeight: "bolder" }}>
                Looking for more?
              </div>
              <div
                className="row"
                style={{ gap: "0.5rem", justifyContent: "center" }}
              >
                <div className={styles.buttons}>
                  <Link
                    className="button button--primary button--md"
                    to="/showcase"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Full Showcase
                  </Link>
                </div>
                <div className={styles.buttons}>
                  <Link
                    className="button button--secondary button--md"
                    to="https://zaparoo.org/discord"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="/img/discord-logo.svg"
                      alt="Discord logo"
                      height="16px"
                      width="16px"
                      style={{ marginRight: "5px" }}
                    />{" "}
                    Join the Discord
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}