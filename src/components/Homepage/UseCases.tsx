import type { ReactNode } from "react";
import { Joystick, Library, Users } from "lucide-react";
import Link from "@docusaurus/Link";
import styles from "./Homepage.module.css";

const useCases = [
  {
    icon: Library,
    title: "Physical collections",
    description:
      "Give digital games a place on your shelf with cards, cartridges, discs, and other objects.",
    image: "/img/showcase/Suiren_floppy_collection.webp",
    width: 1200,
    height: 573,
    alt: "Custom Zaparoo floppy disk collection by Suiren",
    credit: "Suiren",
  },
  {
    icon: Users,
    title: "Family and game nights",
    description:
      "Let family and guests browse physical choices and start playing without learning your frontend.",
    image: "/img/showcase/BigBlue709_crt_setup.webp",
    width: 1200,
    height: 900,
    alt: "Zaparoo CRT setup with physical game cases by BigBlue709",
    credit: "BigBlue709",
  },
  {
    icon: Joystick,
    title: "Arcades and custom builds",
    description:
      "Switch games with tokens in cabinets, event setups, and custom hardware without opening menus.",
    image: "/img/showcase/Foolz_arcade_coin_collection.webp",
    width: 1200,
    height: 801,
    alt: "Arcade reader with a custom NFC coin collection by Foolz",
    credit: "Foolz",
  },
];

export default function UseCases(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.sectionGray}`}>
      <div className="container">
        <div className="text--center padding-horiz--md">
          <h2 className={styles.sectionTitle}>Why people use Zaparoo</h2>
          <p className={styles.sectionSubtitle}>
            Turn digital game libraries into collections people can browse,
            share, and play.
          </p>
        </div>
        <div className={styles.useCasesGrid}>
          {useCases.map((useCase) => {
            const IconComponent = useCase.icon;
            return (
              <article key={useCase.title} className={styles.useCaseCard}>
                <img
                  className={styles.useCaseImage}
                  src={useCase.image}
                  width={useCase.width}
                  height={useCase.height}
                  alt={useCase.alt}
                  loading="lazy"
                />
                <div className={styles.useCaseCredit}>
                  Community build by{" "}
                  <Link to="/blog/community-showcase-6/">{useCase.credit}</Link>
                </div>
                <div className={styles.useCaseHeader}>
                  <div className={styles.useCaseIcon}>
                    <IconComponent size={32} aria-hidden="true" />
                  </div>
                  <h3 className={styles.useCaseTitle}>{useCase.title}</h3>
                </div>
                <p className={styles.useCaseDescription}>
                  {useCase.description}
                </p>
              </article>
            );
          })}
        </div>
        <p className={styles.beyondGames}>
          Makers can build with the <Link to="/docs/core/api/">Core API</Link>,
          while <Link to="/docs/zapscript/">ZapScript</Link> can launch media
          and trigger custom actions beyond games.
        </p>
        <div className={styles.buttonGroup}>
          <Link
            className="button button--primary button--lg"
            to="/showcase/"
            data-umami-event="use-cases-showcase"
          >
            Browse community builds
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="https://zaparoo.org/discord"
            data-umami-event="use-cases-discord"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/img/discord-logo.svg"
              alt=""
              height="16px"
              width="16px"
              style={{ marginRight: "8px" }}
            />
            Share your ideas
          </Link>
        </div>
      </div>
    </section>
  );
}
