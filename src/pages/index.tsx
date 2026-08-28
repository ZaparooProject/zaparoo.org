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
import DemoVideo from "@site/src/components/DemoVideo";
import PlatformShowcase from "@site/src/components/Homepage/PlatformShowcase";
import UseCases from "@site/src/components/Homepage/UseCases";
import {
  Zap,
  Download,
  ChevronRight,
  CloudUpload,
  ShoppingCart,
} from "lucide-react";

import styles from "./index.module.css";
import homepageStyles from "@site/src/components/Homepage/Homepage.module.css";
import Showcase, { showcaseCount } from "@site/src/components/Showcase";
import StructuredData from "@site/src/components/StructuredData";
import ProductRow from "@site/src/components/ProductRow";

import recentPostsData from "../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json";
import siteStats from "@site/src/data/stats";
import products from "@site/src/data/products";
import { formatReleaseDate } from "@site/src/data/coreRelease";
const recentPosts = recentPostsData;

function LatestNews(): ReactNode {
  return (
    <div className="container">
      <div className="text--center padding-horiz--md">
        <h2 className={homepageStyles.sectionTitle}>Latest blog posts</h2>
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
            <div className={styles.blogCardFooter}>
              Read more{" "}
              <ChevronRight
                size={14}
                className="inline-icon"
                aria-hidden="true"
              />
            </div>
          </Link>
        ))}
      </div>
      <div className={homepageStyles.buttonGroup}>
        <Link className="button button--secondary button--lg" to="/blog/">
          See latest updates
        </Link>
      </div>
    </div>
  );
}

function Stats(): ReactNode {
  return (
    <div className={styles.statsBar}>
      <div className={styles.statItem}>
        <div className={styles.statNumber}>{siteStats.downloads}</div>
        <div className={styles.statLabel}>Downloads</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statNumber}>{siteStats.discordMembers}</div>
        <div className={styles.statLabel}>Discord Members</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statNumber}>{siteStats.githubStars}</div>
        <div className={styles.statLabel}>GitHub Stars</div>
      </div>
    </div>
  );
}

function OfficialPartners(): ReactNode {
  return (
    <div className={styles.officialPartners}>
      <h2 className={clsx(homepageStyles.sectionHeader, styles.partnersHeader)}>
        Official partners
      </h2>
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
          href="https://www.reboot-games.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.partnerLogo}
        >
          <img
            src="/img/partners/reboot-games-logo.webp"
            alt="Reboot Games"
            height="60"
          />
        </a>
      </div>
      <p className={styles.partnersLinks}>
        Building hardware or publishing a game?{" "}
        <a
          href={products.partner.integrateUrl}
          data-umami-event="homepage-partner-integrate"
        >
          Integrate with Zaparoo
        </a>{" "}
        or{" "}
        <a
          href={products.partner.gameCardsUrl}
          data-umami-event="homepage-partner-game-cards"
        >
          turn your game into a card
        </a>
        .
      </p>
    </div>
  );
}

function SupportStrip(): ReactNode {
  const { warp, shop } = products;
  return (
    <section
      className={clsx(homepageStyles.section, homepageStyles.sectionLight)}
    >
      <div className="container">
        <div className="text--center padding-horiz--md">
          <h2 className={homepageStyles.sectionTitle}>Get more from Zaparoo</h2>
          <p className={homepageStyles.sectionSubtitle}>
            Zaparoo is free and open source. This is what keeps it going.
          </p>
        </div>
        <ProductRow
          icon={<CloudUpload size={40} />}
          title={warp.tagline}
          description={`${warp.shortPitch} ${warp.freeLine}`}
          price={warp.priceFrom}
          link={warp.pricingUrl("homepage_support")}
          linkText={warp.cta}
          umamiEvent="homepage-support-warp"
          variant="primary"
        />
        <ProductRow
          icon={<ShoppingCart size={40} />}
          title="Official readers, cards, and starter kits"
          description={shop.homepageLine}
          link={shop.url}
          linkText="Visit the Shop"
          umamiEvent="homepage-support-shop"
        />
        <p className={styles.supportOther}>
          Or{" "}
          <Link to="/sponsor/" data-umami-event="homepage-support-sponsor">
            sponsor directly
          </Link>{" "}
          on Patreon or GitHub.
        </p>
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
        <img
          src="/img/logo_lockup_white_sm.webp"
          alt="Zaparoo"
          height="130"
          width="186"
          className={styles.heroTitle}
        />
        <Heading as="h1" className={styles.heroHeading}>
          Make your digital game library physical.
        </Heading>
        <p className={styles.heroDefinition}>
          Free, open-source software that turns cards, toys, QR codes, discs,
          and more into shortcuts for launching games across your existing
          setup.
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx("button button--primary button--lg", styles.button)}
            to="/start/"
            data-umami-event="hero-get-started"
          >
            <Zap size={16} className={styles.buttonIcon} aria-hidden="true" />
            Start here
          </Link>
          <Link
            className={clsx(
              "button button--secondary button--lg",
              styles.button,
            )}
            to="/downloads/"
            data-umami-event="hero-download"
          >
            <Download
              size={16}
              className={styles.buttonIcon}
              aria-hidden="true"
            />
            Downloads
          </Link>
        </div>
        <p className={clsx("hero__version", styles.heroVersion)}>
          Latest:{" "}
          <Link to={latestReleaseBlogPost} data-umami-event="hero-version-link">
            v{defaultVersion} ({formatReleaseDate(defaultReleaseDate)})
          </Link>
        </p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Launch Games with NFC Cards, QR Codes, Discs & More"
      description="Launch games with NFC cards, toys, QR codes, discs, and more across MiSTer FPGA, Batocera, SteamOS, Windows, and Linux. Free and open source."
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
            <OfficialPartners />
          </div>
        </section>

        <section
          className={clsx(homepageStyles.section, styles.howItWorksSection)}
        >
          <div className="container">
            <div className="text--center padding-horiz--md">
              <h2 className={homepageStyles.sectionTitle}>
                Start with NFC cards
              </h2>
              <p className={homepageStyles.sectionSubtitle}>
                The most common setup, in three steps.
              </p>
            </div>
            <div className={clsx("row", styles.howItWorksGrid)}>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <div className="text--center">
                    {(() => {
                      const DownloadSvg =
                        require("@site/static/img/download.svg").default;
                      return (
                        <DownloadSvg
                          className={clsx(
                            styles.featureSvg,
                            styles.featureIcon,
                          )}
                          aria-hidden="true"
                        />
                      );
                    })()}
                  </div>
                  <h3>1. Install Zaparoo</h3>
                  <p>Free software for the device that plays your games.</p>
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
                            styles.featureSvg,
                            styles.featureIcon,
                          )}
                          aria-hidden="true"
                        />
                      );
                    })()}
                  </div>
                  <h3>2. Link a card</h3>
                  <p>Choose a game in the Zaparoo App and save it to a card.</p>
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
                            styles.featureSvg,
                            styles.featureIcon,
                          )}
                          aria-hidden="true"
                        />
                      );
                    })()}
                  </div>
                  <h3>3. Tap and play</h3>
                  <p>Tap the card on your reader and the game launches.</p>
                </div>
              </div>
            </div>
            <p className={styles.whatYouNeed}>
              What you'll need: free Zaparoo software, an NFC reader, and NFC
              cards. Use your own, or grab a starter kit.
            </p>
            <div className={homepageStyles.buttonGroup}>
              <Link
                className={clsx(
                  "button button--primary button--lg",
                  styles.button,
                )}
                to="/start/"
                data-umami-event="how-it-works-get-started"
              >
                <Zap
                  size={16}
                  className={styles.buttonIcon}
                  aria-hidden="true"
                />
                Start here
              </Link>
              <a
                className={clsx(
                  "button button--secondary button--lg",
                  styles.button,
                )}
                href={products.shop.starterKitsUrl}
                data-umami-event="homepage-starter-kit"
              >
                <ShoppingCart
                  size={16}
                  className={styles.buttonIcon}
                  aria-hidden="true"
                />
                Get a starter kit
              </a>
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
                aria-hidden="true"
              >
                <path d="M0 256L28.5 28c2-16 15.6-28 31.8-28H228.9c15 0 27.1 12.1 27.1 27.1c0 3.2-.6 6.5-1.7 9.5L208 160H347.3c20.2 0 36.7 16.4 36.7 36.7c0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5c0-2.3 .3-4.6 .9-6.9L176 288H32c-17.7 0-32-14.3-32-32z" />
              </svg>
              <Heading as="h2" className={homepageStyles.sectionTitle}>
                Community showcase
              </Heading>
              <p className={homepageStyles.sectionSubtitle}>
                See what people are building with Zaparoo.
              </p>
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
                    styles.button,
                  )}
                  to="/showcase/"
                >
                  See all {showcaseCount} creations
                </Link>
                <a
                  className={clsx(
                    "button button--secondary button--md",
                    styles.button,
                  )}
                  href="https://zaparoo.org/discord"
                >
                  <img
                    src="/img/discord-logo.svg"
                    alt=""
                    height="16px"
                    width="16px"
                    className={styles.discordLogo}
                    loading="lazy"
                  />{" "}
                  Show yours off
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
