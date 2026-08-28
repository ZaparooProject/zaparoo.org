import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

interface ProductRowProps {
  icon: ReactNode;
  title: string;
  description: string;
  price?: string;
  /** Small line under the price, for example "Included with Warp". */
  note?: string;
  link: string;
  linkText: string;
  umamiEvent?: string;
  /** Primary rows get the card shadow and a filled button. */
  variant?: "primary" | "secondary";
  className?: string;
}

/**
 * One product or service as a single row: icon, headline, one sentence,
 * optional price, one button. Used on the homepage and the sponsor page.
 */
export default function ProductRow({
  icon,
  title,
  description,
  price,
  note,
  link,
  linkText,
  umamiEvent,
  variant = "secondary",
  className,
}: ProductRowProps): ReactNode {
  const external = /^https?:\/\//.test(link);
  const buttonClass = clsx(
    "button",
    variant === "primary"
      ? "button--primary"
      : "button--secondary button--outline",
  );
  const button = external ? (
    <a className={buttonClass} href={link} data-umami-event={umamiEvent}>
      {linkText}
    </a>
  ) : (
    <Link className={buttonClass} to={link} data-umami-event={umamiEvent}>
      {linkText}
    </Link>
  );

  return (
    <div
      className={clsx(
        styles.row,
        variant === "primary" && styles.primary,
        className,
      )}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <div className={styles.text}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.action}>
        {price && <span className={styles.price}>{price}</span>}
        {note && <span className={styles.note}>{note}</span>}
        {button}
      </div>
    </div>
  );
}
