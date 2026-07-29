import type { ReactNode } from "react";
import {
  Code2,
  Gamepad2,
  Joystick,
  Library,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Link from "@docusaurus/Link";
import CardLink from "./CardLink";
import styles from "./Homepage.module.css";

const useCases = [
  {
    icon: Library,
    title: "Physical Collections",
    description:
      "Give digital games a place on your shelf with cards, cartridges, discs, and more.",
  },
  {
    icon: Users,
    title: "Family Gaming",
    description:
      "Let kids choose and launch games without navigating complex menus.",
  },
  {
    icon: Joystick,
    title: "Arcade Cabinets",
    description:
      "Switch games with a token instead of opening menus or reaching for a keyboard.",
  },
  {
    icon: Gamepad2,
    title: "Game Nights and Guests",
    description:
      "Let guests browse physical choices and start playing without learning your frontend.",
  },
  {
    icon: Trophy,
    title: "Events and Tournaments",
    description:
      "Move between games quickly during tournaments and community events.",
  },
  {
    icon: Code2,
    title: "Makers and Integrators",
    description:
      "Build custom readers, cabinets, and automations with open APIs and protocols.",
    docsLink: "/docs/core/api/",
    docsLinkText: "Build with the Core API",
  },
];

export default function UseCases(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.sectionGray}`}>
      <div className="container">
        <div className="text--center padding-horiz--md">
          <h2 className={styles.sectionTitle}>Why People Use Zaparoo</h2>
          <p className={styles.sectionSubtitle}>
            Turn digital game libraries into collections people can browse,
            share, and play.
          </p>
        </div>
        <div className={styles.useCasesGrid}>
          {useCases.map((useCase) => {
            const IconComponent = useCase.icon;
            return (
              <div key={useCase.title} className={styles.useCaseCard}>
                <div className={styles.useCaseHeader}>
                  <div className={styles.useCaseIcon}>
                    <IconComponent size={32} aria-hidden="true" />
                  </div>
                  <h3 className={styles.useCaseTitle}>{useCase.title}</h3>
                </div>
                <p className={styles.useCaseDescription}>
                  {useCase.description}
                </p>
                {useCase.docsLink && (
                  <CardLink
                    to={useCase.docsLink}
                    umamiEvent="homepage-makers-core-api"
                  >
                    {useCase.docsLinkText}
                  </CardLink>
                )}
              </div>
            );
          })}
        </div>
        <p className={styles.beyondGames}>
          Beyond games, <Link to="/docs/zapscript/">ZapScript</Link> can launch
          media and trigger custom actions.
        </p>
        <div className={styles.buttonGroup}>
          <Link
            className="button button--primary button--lg"
            to="/start/"
            data-umami-event="use-cases-start"
          >
            <Zap
              size={16}
              style={{ marginRight: "8px" }}
              aria-hidden="true"
            />
            Start Here
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
            Share Your Ideas
          </Link>
        </div>
      </div>
    </section>
  );
}
