import type { ReactNode } from "react";
import clsx from "clsx";

export type NoticeTone = "brand" | "stable" | "beta";
export type NoticeVariant =
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger";

interface Props {
  children: ReactNode;
  title?: ReactNode;
  icon?: ReactNode;
  tone?: NoticeTone;
  variant?: NoticeVariant;
  compact?: boolean;
  className?: string;
  as?: "div" | "aside";
  ariaLabel?: string;
}

export default function Notice({
  children,
  title,
  icon,
  tone,
  variant,
  compact = false,
  className,
  as: Element = "div",
  ariaLabel,
}: Props): ReactNode {
  return (
    <Element
      className={clsx(
        variant && "alert",
        variant && `alert--${variant}`,
        "z-notice",
        compact && "z-notice--compact",
        className,
      )}
      data-tone={tone}
      aria-label={ariaLabel}
    >
      {(title || icon) && (
        <div className="z-notice__heading">
          {icon && (
            <span className="z-notice__icon" aria-hidden="true">
              {icon}
            </span>
          )}
          {title && <span>{title}</span>}
        </div>
      )}
      <div className="z-notice__content">{children}</div>
    </Element>
  );
}
