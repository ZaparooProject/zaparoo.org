import React from "react";
import Link from "@docusaurus/Link";
import { Info, AlertTriangle, Lightbulb } from "lucide-react";

// Social Icons
export const DiscordIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    style={{ width: size, height: size, fill: "currentColor" }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
  >
    <path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z" />
  </svg>
);

export const RedditIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    style={{ width: size, height: size, fill: "currentColor" }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M373 138.6c-25.2 0-46.3-17.5-51.9-41l0 0c-30.6 4.3-54.2 30.7-54.2 62.4l0 .2c47.4 1.8 90.6 15.1 124.9 36.3c12.6-9.7 28.4-15.5 45.5-15.5c41.3 0 74.7 33.4 74.7 74.7c0 29.8-17.4 55.5-42.7 67.5c-2.4 86.8-97 156.6-213.2 156.6S45.5 410.1 43 323.4C17.6 311.5 0 285.7 0 255.7c0-41.3 33.4-74.7 74.7-74.7c17.2 0 33 5.8 45.7 15.6c34-21.1 76.8-34.4 123.7-36.4l0-.3c0-44.3 33.7-80.9 76.8-85.5C325.8 50.2 347.2 32 373 32c29.4 0 53.3 23.9 53.3 53.3s-23.9 53.3-53.3 53.3zM157.5 255.3c-20.9 0-38.9 20.8-40.2 47.9s17.1 38.1 38 38.1s36.6-9.8 37.8-36.9s-14.7-49.1-35.7-49.1zM395 303.1c-1.2-27.1-19.2-47.9-40.2-47.9s-36.9 22-35.7 49.1c1.2 27.1 16.9 36.9 37.8 36.9s39.3-11 38-38.1zm-60.1 70.8c1.5-3.6-1-7.7-4.9-8.1c-23-2.3-47.9-3.6-73.8-3.6s-50.8 1.3-73.8 3.6c-3.9 .4-6.4 4.5-4.9 8.1c12.9 30.8 43.3 52.4 78.7 52.4s65.8-21.6 78.7-52.4z" />
  </svg>
);

// StyledButton Component
export interface StyledButtonProps {
  to: string;
  variant?: "primary" | "secondary" | "success";
  outline?: boolean;
  block?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const StyledButton: React.FC<StyledButtonProps> = ({
  to,
  variant = "primary",
  outline = false,
  block = false,
  icon,
  children,
  className = "",
}) => {
  const classes = [
    "button",
    `button--${variant}`,
    outline && "button--outline",
    block && "button--block",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      to={to}
      className={classes}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        ...(block && { width: "100%" }),
      }}
    >
      {icon}
      {children}
    </Link>
  );
};

// Admonition Component
export type AdmonitionType = "note" | "tip" | "info" | "warning" | "danger";

export interface AdmonitionProps {
  type: AdmonitionType;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Admonition: React.FC<AdmonitionProps> = ({
  type,
  title,
  children,
  className = "",
}) => {
  // Map admonition types to icons and variants
  const iconMap: Record<
    AdmonitionType,
    { icon: React.ReactNode; variant: string }
  > = {
    note: {
      icon: (
        <Info
          size={20}
          style={{
            marginTop: "0.1rem",
            flexShrink: 0,
            marginBottom: "0.2rem",
          }}
        />
      ),
      variant: "secondary",
    },
    tip: {
      icon: (
        <Lightbulb
          size={20}
          style={{
            marginTop: "0.1rem",
            flexShrink: 0,
            marginBottom: "0.2rem",
          }}
        />
      ),
      variant: "success",
    },
    info: {
      icon: (
        <Info
          size={20}
          style={{
            marginTop: "0.1rem",
            flexShrink: 0,
            marginBottom: "0.2rem",
          }}
        />
      ),
      variant: "info",
    },
    warning: {
      icon: (
        <AlertTriangle
          size={20}
          style={{
            marginTop: "0.1rem",
            flexShrink: 0,
            marginBottom: "0.2rem",
          }}
        />
      ),
      variant: "warning",
    },
    danger: {
      icon: (
        <AlertTriangle
          size={20}
          style={{
            marginTop: "0.1rem",
            flexShrink: 0,
            marginBottom: "0.2rem",
          }}
        />
      ),
      variant: "danger",
    },
  };

  const { icon, variant } = iconMap[type];

  return (
    <div className={`alert alert--${variant} ${className}`}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textTransform: "uppercase",
            }}
          >
            {icon}
            <span
              style={{
                fontWeight: 600,
                fontSize: "90%",
                paddingBottom: "0.1rem",
              }}
            >
              {title}
            </span>
          </div>
          <div style={{ marginTop: "0.5rem" }}>{children}</div>
        </div>
      </div>
    </div>
  );
};
