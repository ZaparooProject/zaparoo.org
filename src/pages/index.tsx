import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import {
  defaultVersion,
  defaultReleaseDate,
  latestReleaseBlogPost,
} from "@site/src/components/DownloadCard";
import RotatingText from "@site/src/components/RotatingText";
import DemoVideo from "@site/src/components/DemoVideo";
import PlatformShowcase from "@site/src/components/Homepage/PlatformShowcase";
import UseCases from "@site/src/components/Homepage/UseCases";
import { Zap, Download, ChevronRight } from "lucide-react";

import styles from "./index.module.css";
import homepageStyles from "@site/src/components/Homepage/Homepage.module.css";
import featureStyles from "@site/src/components/HomepageFeatures/styles.module.css";
import Showcase, { showcaseCount } from "@site/src/components/Showcase";
import StructuredData from "@site/src/components/StructuredData";
import ProductLink, { type ProductStore } from "@site/src/components/ProductLink";

import recentPostsData from "../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json";
const recentPosts = recentPostsData;

function LatestNews(): ReactNode {
  return (
    <div className="container">
      <div className="text--center padding-horiz--md">
        <h2 className={homepageStyles.sectionTitle}>Latest Blog Posts</h2>
        <p className={homepageStyles.sectionSubtitle}>
          Stay up to date with the latest Zaparoo news and releases.
        </p>
      </div>
      <div className={styles.blogGrid}>
        {recentPosts.items.slice(0, 3).map((item, index) => (
          <Link
            key={index}
            to={item.permalink}
            className={styles.blogCard}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={styles.blogCardDate}>
              {new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <h3 className={styles.blogCardTitle}>{item.title}</h3>
            <div className={styles.blogCardFooter}>Read more <ChevronRight size={14} className="inline-icon" /></div>
          </Link>
        ))}
      </div>
      <div className={homepageStyles.buttonGroup}>
        <Link className="button button--secondary button--lg" to="/blog/">
          See Latest Updates
        </Link>
      </div>
    </div>
  );
}

function Stats(): ReactNode {
  return (
    <div className={styles.statsBar}>
      <div className={styles.statItem}>
        <div className={styles.statNumber}>95k</div>
        <div className={styles.statLabel}>Downloads</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statNumber}>1.6k</div>
        <div className={styles.statLabel}>Discord Members</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statNumber}>150</div>
        <div className={styles.statLabel}>GitHub Stars</div>
      </div>
    </div>
  );
}

function HardwarePartners(): ReactNode {
  return (
    <div className={styles.hardwarePartners}>
      <h3 className={clsx(homepageStyles.sectionHeader, styles.partnersHeader)}>Official Hardware Partners</h3>
      <div className={styles.partnersLogos}>
        <a
          href="https://multisystem.uk/products/mister-multisystem-2/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.partnerLogo}
        >
          <img
            src="/img/partners/multisystem.png"
            alt="MiSTer Multisystem²"
            height="60"
          />
        </a>
        <a
          href="https://retroremake.co/pages/superstation%E1%B5%92%E2%81%BF%E1%B5%89"
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(styles.partnerLogo, styles.partnerLogoInvert)}
        >
          <img
            src="/img/partners/retroremake.png"
            alt="Retro Remake SuperStationᵒⁿᵉ"
            height="60"
          />
        </a>
      </div>
    </div>
  );
}

function SupportTile({
  title,
  description,
  href,
  linkText,
  external,
  umamiEvent,
  productStore,
}: {
  title: string;
  description: string;
  href: string;
  linkText: string;
  external?: boolean;
  umamiEvent: string;
  productStore?: ProductStore;
}): ReactNode {
  const inner = (
    <div className={styles.supportTile}>
      <h3 className={styles.supportTileTitle}>{title}</h3>
      <p className={styles.supportTileDesc}>{description}</p>
      <span className={styles.supportTileLink}>{linkText} <ChevronRight size={14} className="inline-icon" /></span>
    </div>
  );
  if (external) {
    if (productStore) {
      return (
        <div className="col col--4" style={{ marginBottom: "1.5rem" }}>
          <ProductLink
            href={href}
            store={productStore}
            unstyled
            showIcon={false}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {inner}
          </ProductLink>
        </div>
      );
    }

    return (
      <div className="col col--4" style={{ marginBottom: "1.5rem" }}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
          data-umami-event={umamiEvent}
        >
          {inner}
        </a>
      </div>
    );
  }
  return (
    <div className="col col--4" style={{ marginBottom: "1.5rem" }}>
      <Link to={href} style={{ textDecoration: "none", color: "inherit" }} data-umami-event={umamiEvent}>
        {inner}
      </Link>
    </div>
  );
}

function SupportStrip(): ReactNode {
  return (
    <section className={clsx(homepageStyles.section, homepageStyles.sectionLight)}>
      <div className="container">
        <div className="text--center padding-horiz--md" style={{ marginBottom: "2rem" }}>
          <h2 className={homepageStyles.sectionTitle}>Zaparoo is free and open source</h2>
          <p className={homepageStyles.sectionSubtitle}>Here's how to help it keep growing.</p>
        </div>
        <div className="row">
          <SupportTile
            title="Zaparoo App"
            description="Get the best Zaparoo experience on your phone. Your purchase directly funds continued development."
            href="https://zaparoo.app"
            linkText="Get the App"
            external
            umamiEvent="homepage-support-app"
          />
          <SupportTile
            title="Zaparoo Shop"
            description="Official hardware, readers, and accessories. Every purchase goes toward keeping the project running."
            href="https://shop.zaparoo.com"
            linkText="Visit the Shop"
            external
            umamiEvent="homepage-support-shop"
            productStore="shop"
          />
          <SupportTile
            title="Sponsor"
            description="Support development directly through Patreon or GitHub Sponsors. See all the ways to help."
            href="/sponsor/"
            linkText="Ways to Sponsor"
            umamiEvent="homepage-support-sponsor"
          />
        </div>
      </div>
    </section>
  );
}

function HomepageHeader(): ReactNode {
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className={styles.heroBannerBackground} />
      <div className="zaparoo-animated-bg" />
      <div className={clsx("container", styles.heroBannerContent)}>
        <Heading as="h1" className="hero__title">
          <span className="sr-only">Zaparoo - Open Source Universal Loading System</span>
          <img
            src="/img/logo_lockup_white_sm.webp"
            alt=""
            aria-hidden="true"
            height="200px"
            width="286px"
            className={styles.heroTitle}
          />
        </Heading>
        <p className={clsx("hero__subtitle", styles.heroSubtitle)}>
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
        <p className={styles.heroDefinition}>
          Launch anything with anything. Use NFC cards, QR codes, optical discs,
          and more to instantly play your games and media.
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx("button button--primary button--lg", styles.button)}
            to="/start/"
            data-umami-event="hero-get-started"
          >
            <Zap size={16} className={styles.buttonIcon} />
            Start Here
          </Link>
          <Link
            className={clsx(
              "button button--secondary button--lg",
              styles.button
            )}
            to="/downloads/"
            data-umami-event="hero-download"
          >
            <Download size={16} className={styles.buttonIcon} />
            Downloads
          </Link>
        </div>
        <p className={clsx("hero__version", styles.heroVersion)}>
          Latest:{" "}
          <Link to={latestReleaseBlogPost} data-umami-event="hero-version-link">
            v{defaultVersion} ({defaultReleaseDate})
          </Link>
        </p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Open Source Universal Loading System"
      description="The open source universal loading system. Launch media and scripted actions using physical objects. Create your collection how YOU want."
    >
      <StructuredData type="homepage" />
      <HomepageHeader />
      <main id="main-content">
        <div className={styles.demoLoopSection}>
          <div className="container">
            <div className={styles.demoLoopWrapper}>
              <DemoVideo />
            </div>
          </div>
        </div>

        <section className={styles.socialProofSection}>
          <div className="container">
            <Stats />
            <HardwarePartners />
          </div>
        </section>

        <section
          className={clsx(homepageStyles.section, styles.howItWorksSection)}
        >
          <div className="container">
            <div className="text--center padding-horiz--md">
              <h2 className={homepageStyles.sectionTitle}>How It Works</h2>
              <p className={homepageStyles.sectionSubtitle}>
                Get started with affordable gear you might already own.
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
                          className={clsx(
                            featureStyles.featureSvg,
                            styles.featureIcon
                          )}
                          role="img"
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
                          className={clsx(
                            featureStyles.featureSvg,
                            styles.featureIcon
                          )}
                          role="img"
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
                          className={clsx(
                            featureStyles.featureSvg,
                            styles.featureIcon
                          )}
                          role="img"
                        />
                      );
                    })()}
                  </div>
                  <h3>3. Tap & Play!</h3>
                  <p>Tap the card and get straight into the game.</p>
                </div>
              </div>
            </div>
            <div className={homepageStyles.buttonGroup}>
              <Link
                className={clsx(
                  "button button--primary button--lg",
                  styles.button
                )}
                to="/start/"
                data-umami-event="how-it-works-get-started"
              >
                <Zap size={16} className={styles.buttonIcon} />
                Start Here
              </Link>
              <Link
                className={clsx(
                  "button button--secondary button--lg",
                  styles.button
                )}
                to="/docs/"
                data-umami-event="how-it-works-docs"
              >
                Browse the Docs
              </Link>
            </div>
          </div>
        </section>

        <PlatformShowcase />

        <UseCases />

        <SupportStrip />

        <div className={styles.communityShowcaseWrapper}>
          <div className="container">
            <div className="text--center padding-horiz--md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                fill="currentColor"
                className={styles.communityShowcaseIcon}
              >
                <path d="M0 256L28.5 28c2-16 15.6-28 31.8-28H228.9c15 0 27.1 12.1 27.1 27.1c0 3.2-.6 6.5-1.7 9.5L208 160H347.3c20.2 0 36.7 16.4 36.7 36.7c0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5c0-2.3 .3-4.6 .9-6.9L176 288H32c-17.7 0-32-14.3-32-32z" />
              </svg>
              <Heading as="h2">Community Showcase</Heading>
              <p>See what people are building with Zaparoo.</p>
            </div>
            <Showcase featured={true} />
            <div style={{ marginTop: "1rem" }}>
              <Showcase limit={10} excludeFeatured />
            </div>
            <div className={styles.communityShowcaseButtons}>
              <div className={styles.buttons}>
                <Link
                  className={clsx(
                    "button button--primary button--md",
                    styles.button
                  )}
                  to="/showcase/"
                >
                  See All {showcaseCount} Creations
                </Link>
                <a
                  className={clsx(
                    "button button--secondary button--md",
                    styles.button
                  )}
                  href="https://zaparoo.org/discord"
                >
                  <img
                    src="/img/discord-logo.svg"
                    alt="Discord logo"
                    height="16px"
                    width="16px"
                    className={styles.discordLogo}
                    loading="lazy"
                  />{" "}
                  Show Yours Off
                </a>
              </div>
            </div>
          </div>
        </div>

        <section
          className={clsx(homepageStyles.section, homepageStyles.sectionLight)}
        >
          <LatestNews />
        </section>
      </main>
    </Layout>
  );
}
