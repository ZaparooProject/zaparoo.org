import type { ReactNode } from "react";
import {
  Joystick,
  Users,
  Trophy,
  Library,
  Download,
  Tv,
  Code2,
} from "lucide-react";
import Link from "@docusaurus/Link";
import styles from "./Homepage.module.css";

const useCases = [
  {
    icon: Joystick,
    title: "Arcade Cabinets",
    description: "Build the ultimate arcade with instant game switching.",
  },
  {
    icon: Users,
    title: "Family Gaming",
    description: "Kids can play independently without complex menus.",
  },
  {
    icon: Trophy,
    title: "Tournaments",
    description: "Quick game switching for competitive events.",
  },
  {
    icon: Library,
    title: "Collectors",
    description: "Organize your digital collection with physical cards.",
  },
  {
    icon: Tv,
    title: "Media Centers",
    description: "Launch movies, music, and TV shows instantly.",
  },
  {
    icon: Code2,
    title: "Developer Friendly",
    description: "Open API for custom integrations and automation.",
  },
];

export default function UseCases(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.sectionGray}`}>
      <div className="container">
        <div className="text--center padding-horiz--md">
          <h2 className={styles.sectionTitle}>Perfect For Any Setup</h2>
          <p className={styles.sectionSubtitle}>
            Zaparoo is designed to work how you want it to.
          </p>
        </div>
        <div className={styles.useCasesGrid}>
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            return (
              <div key={index} className={styles.useCaseCard}>
                <div className={styles.useCaseHeader}>
                  <div className={styles.useCaseIcon}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className={styles.useCaseTitle}>{useCase.title}</h3>
                </div>
                <p className={styles.useCaseDescription}>
                  {useCase.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className={styles.buttonGroup}>
          <Link
            className="button button--primary button--lg"
            to="/downloads/"
            data-umami-event="use-cases-download"
          >
            <Download size={16} style={{ marginRight: "8px" }} />
            Download Zaparoo
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
              alt="Discord logo"
              height="16px"
              width="16px"
              style={{ marginRight: "8px" }}
            />
            Join Community
          </Link>
        </div>
      </div>
    </section>
  );
}
