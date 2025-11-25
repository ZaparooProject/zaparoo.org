import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import type { LucideIcon } from "lucide-react";
import styles from "./styles.module.css";

interface NavCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

interface NavCardGroupProps {
  title?: string;
  cards: NavCardProps[];
}

export function NavCard({
  icon: Icon,
  title,
  description,
  link,
}: NavCardProps): ReactNode {
  return (
    <Link to={link} className={styles.navCard}>
      <div className={styles.navCardHeader}>
        <div className={styles.navCardIcon}>
          <Icon size={28} />
        </div>
        <h3 className={styles.navCardTitle}>{title}</h3>
      </div>
      <p className={styles.navCardDescription}>{description}</p>
    </Link>
  );
}

export function NavCardGroup({ title, cards }: NavCardGroupProps): ReactNode {
  return (
    <div className={styles.navCardGroup}>
      {title && <h2 className={styles.groupTitle}>{title}</h2>}
      <div className={styles.navCardGrid}>
        {cards.map((card, index) => (
          <NavCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}

export default NavCardGroup;
