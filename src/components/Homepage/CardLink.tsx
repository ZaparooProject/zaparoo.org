import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import { ChevronRight } from "lucide-react";
import styles from "./Homepage.module.css";

interface CardLinkProps {
  children: ReactNode;
  to?: string;
  umamiEvent?: string;
}

export default function CardLink({
  children,
  to,
  umamiEvent,
}: CardLinkProps): ReactNode {
  const content = (
    <>
      {children}{" "}
      <ChevronRight
        size={14}
        className="inline-icon"
        aria-hidden="true"
      />
    </>
  );

  if (!to) {
    return <span className={styles.cardLink}>{content}</span>;
  }

  return (
    <Link
      to={to}
      className={styles.cardLink}
      data-umami-event={umamiEvent}
    >
      {content}
    </Link>
  );
}
