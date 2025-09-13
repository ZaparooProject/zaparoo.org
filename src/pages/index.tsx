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
import RotatingText from "@site/src/components/RotatingText";
import PlatformShowcase from "@site/src/components/Homepage/PlatformShowcase";
import UseCases from "@site/src/components/Homepage/UseCases";
import {
  CheckCircle,
  Wrench,
  Code2,
  Gamepad2,
  Target,
  Joystick,
  Monitor,
  Smartphone,
  Zap,
  Download,
  Clock,
  Heart,
  Layers,
  Rocket,
  Trophy,
} from "lucide-react";

import styles from "./index.module.css";
import homepageStyles from "@site/src/components/Homepage/Homepage.module.css";
import featureStyles from "@site/src/components/HomepageFeatures/styles.module.css";
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
        position: "relative",
        overflow: "hidden",
        color: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('./img/circuit-board.svg')",
          backgroundRepeat: "repeat",
          opacity: 0.6,
          filter: "brightness(1.5) contrast(1.2)",
          zIndex: 1,
        }}
      />
      <div className="zaparoo-animated-bg" />
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "2rem",
          paddingBottom: "2.5rem",
        }}
      >
        <Heading as="h1" className="hero__title">
          <img
            src="/img/logo_lockup_white_sm.webp"
            alt="Zaparoo Logo"
            height="200px"
            width="286px"
            style={{ transform: "translateX(7px)" }}
          />
        </Heading>
        <p
          className="hero__subtitle"
          style={{
            fontSize: "1.8rem",
            fontWeight: "600",
            marginBottom: "2rem",
            color: "white",
          }}
        >
          Tap a Card,
          <br className="mobile-break" /> Launch{" "}
          <RotatingText
            words={[
              "a Game",
              "a Movie",
              "a TV Show",
              "Music",
              "a Podcast",
              "a Book",
              "a Comic",
              "an App",
            ]}
          />
        </p>
        <div
          className={styles.buttons}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "1rem",
          }}
        >
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started"
            data-umami-event="hero-get-started"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={16} style={{ marginRight: "8px" }} />
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/downloads/"
            data-umami-event="hero-download"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Download size={16} style={{ marginRight: "8px" }} />
            Download Now
          </Link>
        </div>
        <p
          className="hero__version"
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "0.9rem",
            margin: "0",
            textAlign: "center",
          }}
        >
          Latest: v{defaultVersion} ({defaultReleaseDate})
        </p>
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
      <section
        style={{
          padding: "2rem 0",
          backgroundColor: "var(--ifm-color-emphasis-100)",
        }}
      >
        <div className="container">
          <Showcase featured={true} />
        </div>
      </section>
      <main>
        <section
          className={`${homepageStyles.section} ${homepageStyles.sectionLight}`}
        >
          <div className="container">
            <div className="row">
              <div className="col col--10 col--offset-1 text--center">
                <h2 className={homepageStyles.sectionTitle}>
                  What is Zaparoo?
                </h2>
                <p
                  style={{
                    fontSize: "1.3rem",
                    lineHeight: "1.6",
                    marginBottom: "2rem",
                    color: "var(--ifm-color-emphasis-800)",
                  }}
                >
                  Zaparoo is the{" "}
                  <strong>open source universal loading system</strong> that
                  lets you launch games and media instantly using physical
                  objects. Tap a card, scan a code, or use any compatible
                  reader: your content launches immediately. No menus, no
                  searching, just play!
                </p>

                <div className={homepageStyles.platformBadges}>
                  <div className={homepageStyles.platformBadge}>
                    <Rocket size={16} style={{ marginRight: "0.5rem" }} />
                    Instant Launch
                  </div>
                  <div className={homepageStyles.platformBadge}>
                    <Wrench size={16} style={{ marginRight: "0.5rem" }} />
                    No Hardware Mods
                  </div>
                  <div className={homepageStyles.platformBadge}>
                    <Heart size={16} style={{ marginRight: "0.5rem" }} />
                    100% Open Source
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.6",
                    marginBottom: "1.5rem",
                    color: "var(--ifm-color-emphasis-700)",
                  }}
                >
                  Transform your digital collection into something you can touch
                  and share. Perfect for anyone who misses the tactile feel of
                  physical media, wants easier access to their library, or loves
                  the satisfaction of a curated collection you can actually
                  hold.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className={`${homepageStyles.section} ${homepageStyles.sectionLight}`}
        >
          <div className="container">
            <div className="text--center padding-horiz--md">
              <h2 className={homepageStyles.sectionTitle}>How It Works</h2>
              <p className={homepageStyles.sectionSubtitle}>
                Get started with affordable hardware and devices you already
                own.
              </p>
            </div>
            <div className="row">
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <div className="text--center">
                    {(() => {
                      const DownloadSvg =
                        require("@site/static/img/download.svg").default;
                      return (
                        <DownloadSvg
                          className={featureStyles.featureSvg}
                          role="img"
                          style={{ color: "var(--ifm-color-primary)" }}
                        />
                      );
                    })()}
                  </div>
                  <h3>1. Install Zaparoo</h3>
                  <p>Works with your existing games and emulators.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <div className="text--center">
                    {(() => {
                      const SmartphoneNfcSvg =
                        require("@site/static/img/smartphone-nfc.svg").default;
                      return (
                        <SmartphoneNfcSvg
                          className={featureStyles.featureSvg}
                          role="img"
                          style={{ color: "var(--ifm-color-primary)" }}
                        />
                      );
                    })()}
                  </div>
                  <h3>2. Write Your Cards</h3>
                  <p>Use your phone or an NFC reader to link games to cards.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <div className="text--center">
                    {(() => {
                      const GamepadSvg =
                        require("@site/static/img/gamepad.svg").default;
                      return (
                        <GamepadSvg
                          className={featureStyles.featureSvg}
                          role="img"
                          style={{ color: "var(--ifm-color-primary)" }}
                        />
                      );
                    })()}
                  </div>
                  <h3>3. Tap & Play!</h3>
                  <p>No menus, no choice paralysis, just play your games.</p>
                </div>
              </div>
            </div>
            <div className={homepageStyles.buttonGroup}>
              <Link
                className="button button--primary button--lg"
                to="/docs/getting-started"
                data-umami-event="how-it-works-get-started"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Trophy size={16} style={{ marginRight: "8px" }} />
                Start Your Collection
              </Link>
            </div>
          </div>
        </section>
        <PlatformShowcase />
        <UseCases />
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
              <div className={styles.buttons}>
                <Link
                  className="button button--primary button--md"
                  to="/showcase/"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  See More
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
      </main>
    </Layout>
  );
}
