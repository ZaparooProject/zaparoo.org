import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import {
  defaultVersion,
  defaultReleaseDate,
  latestReleaseBlogPost,
} from "@site/src/components/DownloadCard";
import RotatingText from "@site/src/components/RotatingText";
import PlatformShowcase from "@site/src/components/Homepage/PlatformShowcase";
import UseCases from "@site/src/components/Homepage/UseCases";
import { Zap, Download, Heart, Rocket, Trophy, Wrench } from "lucide-react";

import styles from "./index.module.css";
import homepageStyles from "@site/src/components/Homepage/Homepage.module.css";
import featureStyles from "@site/src/components/HomepageFeatures/styles.module.css";
import Showcase from "@site/src/components/Showcase";
import StructuredData from "@site/src/components/StructuredData";

// Use dynamic import instead of require() for better TypeScript support
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
            <div className={styles.blogCardFooter}>Read more →</div>
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
        <div className={styles.statNumber}>79,000+</div>
        <div className={styles.statLabel}>Downloads</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statNumber}>1,500+</div>
        <div className={styles.statLabel}>Discord Members</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statNumber}>140+</div>
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

function HomepageHeader(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className={styles.heroBannerBackground} />
      <div className="zaparoo-animated-bg" />
      <div className={clsx("container", styles.heroBannerContent)}>
        <Heading as="h1" className="hero__title">
          <img
            src="/img/logo_lockup_white_sm.webp"
            alt="Zaparoo Logo"
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
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Open Source Universal Loading System"
      description="The open source universal loading system. Launch media and scripted actions using physical objects. Create your collection how YOU want."
    >
      <StructuredData type="homepage" />
      <HomepageHeader />
      <main id="main-content">
        <section
          className={clsx(homepageStyles.section, styles.whatIsZaparooSection)}
        >
          <div className="container">
            <div className="row">
              <div
                className={clsx(
                  "col col--10 col--offset-1",
                  styles.whatIsZaparooContent
                )}
              >
                <h2 className={homepageStyles.sectionTitle}>
                  What is Zaparoo?
                </h2>
                <p className={styles.whatIsZaparooText}>
                  Zaparoo is the{" "}
                  <strong>open source universal loading system</strong> that
                  lets you launch games and media instantly using physical
                  objects. Tap a card, scan a code, or use any compatible
                  reader: your content launches immediately. No menus, no
                  searching, just play!
                </p>

                <div className={homepageStyles.platformBadges}>
                  <div className={homepageStyles.platformBadge}>
                    <Rocket size={16} className={styles.buttonIcon} />
                    Instant Launch
                  </div>
                  <div className={homepageStyles.platformBadge}>
                    <Wrench size={16} className={styles.buttonIcon} />
                    No Hardware Mods
                  </div>
                  <div className={homepageStyles.platformBadge}>
                    <Heart size={16} className={styles.buttonIcon} />
                    100% Open Source
                  </div>
                </div>

                <p className={styles.whatIsZaparooSubtext}>
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
        <section className={styles.socialProofSection}>
          <div className="container">
            <HardwarePartners />
            <Stats />
          </div>
        </section>
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
              <p>
                Check out some of the awesome Zaparoo stuff our community is
                making!
              </p>
            </div>
            <Showcase limit={10} />
            <div className={styles.communityShowcaseButtons}>
              <div className={styles.buttons}>
                <Link
                  className={clsx(
                    "button button--primary button--md",
                    styles.button
                  )}
                  to="/showcase/"
                >
                  See All 58 Creations
                </Link>
                <Link
                  className={clsx(
                    "button button--secondary button--md",
                    styles.button
                  )}
                  to="#featured-creators"
                >
                  Featured Creators
                </Link>
              </div>
            </div>
          </div>
        </div>
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
                  <p>No menus, no choice paralysis, just play your games.</p>
                </div>
              </div>
            </div>
            <div className={styles.videoWrapper}>
              <iframe
                src="https://www.youtube.com/embed/BnnAX9cNUIE"
                title="Zaparoo Introduction"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={styles.videoEmbed}
              ></iframe>
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
                <Trophy size={16} className={styles.buttonIcon} />
                Start Your Collection
              </Link>
            </div>
          </div>
        </section>
        <PlatformShowcase />
        <UseCases />
        <section
          className={clsx(homepageStyles.section, homepageStyles.sectionLight)}
        >
          <LatestNews />
        </section>
        <div id="featured-creators" className={styles.communityShowcaseWrapper}>
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
              <Heading as="h2">Featured Creators</Heading>
              <p>Amazing creations from our talented community members</p>
            </div>
            <Showcase featured={true} />
            <div className={styles.communityShowcaseButtons}>
              <div className={styles.buttons}>
                <Link
                  className={clsx(
                    "button button--primary button--md",
                    styles.button
                  )}
                  to="/showcase/"
                >
                  See Full Showcase
                </Link>
              </div>
              <div className={styles.buttons}>
                <Link
                  className={clsx(
                    "button button--secondary button--md",
                    styles.button
                  )}
                  to="https://zaparoo.org/discord"
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
