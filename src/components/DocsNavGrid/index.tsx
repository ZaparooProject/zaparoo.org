import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import type { LucideIcon } from "lucide-react";
import styles from "./styles.module.css";

interface TrackedLink {
  title: string;
  link: string;
  umamiEvent?: string;
}

interface NavCardProps extends TrackedLink {
  icon: LucideIcon;
  description: string;
  cardHeadingLevel?: 3 | 4;
}

interface NavCardGroupProps {
  title?: string;
  cards: NavCardProps[];
  headingLevel?: 2 | 3;
}

interface DocsActionProps extends TrackedLink {
  icon: LucideIcon;
  primary?: boolean;
}

interface DocsActionGroupProps {
  actions: DocsActionProps[];
}

export function NavCard({
  icon: Icon,
  title,
  description,
  link,
  umamiEvent,
  cardHeadingLevel = 3,
}: NavCardProps): ReactNode {
  const CardHeadingTag = cardHeadingLevel === 4 ? "h4" : "h3";

  return (
    <Link
      to={link}
      className={styles.navCard}
      data-umami-event={umamiEvent}
    >
      <div className={styles.navCardHeader}>
        <div className={styles.navCardIcon}>
          <Icon size={28} aria-hidden="true" />
        </div>
        <CardHeadingTag className={styles.navCardTitle}>
          {title}
        </CardHeadingTag>
      </div>
      <p className={styles.navCardDescription}>{description}</p>
    </Link>
  );
}

export function NavCardGroup({
  title,
  cards,
  headingLevel = 2,
}: NavCardGroupProps): ReactNode {
  const HeadingTag = headingLevel === 3 ? "h3" : "h2";

  return (
    <div className={styles.navCardGroup}>
      {title && <HeadingTag className={styles.groupTitle}>{title}</HeadingTag>}
      <div className={styles.navCardGrid}>
        {cards.map((card) => (
          <NavCard
            key={card.title}
            {...card}
            cardHeadingLevel={headingLevel === 3 ? 4 : 3}
          />
        ))}
      </div>
    </div>
  );
}

export function DocsActionGroup({ actions }: DocsActionGroupProps): ReactNode {
  return (
    <div className={styles.actionGroup}>
      {actions.map(({ icon: Icon, ...action }) => (
        <Link
          key={action.title}
          to={action.link}
          className={`${styles.actionButton} button button--lg ${
            action.primary ? "button--primary" : "button--secondary"
          }`}
          data-umami-event={action.umamiEvent}
        >
          <Icon aria-hidden="true" size={18} />
          {action.title}
        </Link>
      ))}
    </div>
  );
}

export default NavCardGroup;
