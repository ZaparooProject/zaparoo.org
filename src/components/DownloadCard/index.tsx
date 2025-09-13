import React, { ReactNode, CSSProperties } from "react";
import Button from "../Button";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fas);

export const defaultVersion = "2.6.0";
export const defaultReleaseDate = "2025-09-13";
export const latestReleaseBlogPost = "/blog/core-v2.6.0";

type Arch = "amd64" | "arm64" | "arm" | "386";

const displayArch = (arch: Arch) => {
  switch (arch) {
    case "amd64":
      return "x86-64";
    case "arm64":
      return "ARM64";
    case "arm":
      return "ARM32";
    case "386":
      return "x86";
    default:
      return arch;
  }
};

const downloadUrl = (platform: string, arch: Arch, version: string) => {
  if (platform === "windows") {
    return `https://github.com/ZaparooProject/zaparoo-core/releases/download/v${version}/zaparoo-${arch}-${version}-setup.exe`;
  }
  return `https://github.com/ZaparooProject/zaparoo-core/releases/download/v${version}/zaparoo-${platform}_${arch}-${version}.zip`;
};

type DownloadCard = {
  name: string;
  platform: string;
  version?: string;
  status: "stable" | "beta";
  architectures: Arch[];
  icon: ReactNode | null;
  docLink?: string;
  platformLink: string;
  nativeInstall?: {
    link: string;
    label: string;
  };
};

const BetaBubble = () => (
  <img
    src="/img/beta-badge.svg"
    alt="Beta version"
    style={{
      width: "55px",
      minWidth: "55px",
      height: "18.79px",
      minHeight: "18.79px",
    }}
  />
);

const StableBubble = () => (
  <img
    src="/img/stable-badge.svg"
    alt="Stable version"
    style={{
      width: "55px",
      minWidth: "55px",
      height: "18.79px",
      minHeight: "18.79px",
    }}
  />
);

// Button component that accepts the specified props.
export default function DownloadCard({
  name,
  platform,
  version = null,
  status = "stable",
  architectures,
  icon,
  docLink,
  platformLink,
  nativeInstall,
}: DownloadCard) {
  return (
    <div
      className="download-card"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        margin: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        width: "220px",
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "5px",
          left: "10px",
          fontSize: "0.8rem",
          fontWeight: "bold",
        }}
      >
        {version ? "v" + version : "v" + defaultVersion}
      </div>
      <div
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
        }}
      >
        {status === "beta" ? <BetaBubble /> : <StableBubble />}
      </div>
      <div
        style={{
          height: "75px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a href={platformLink} target="_blank" rel="noopener noreferrer">
          {icon}
        </a>
      </div>
      <h3 style={{ margin: 0 }}>{name}</h3>
      {docLink && (
        <Button
          outline
          label="Platform Guide"
          variant="secondary"
          link={docLink}
          icon={<FontAwesomeIcon icon={["fas", "book"]} />}
          fullWidth
        />
      )}
      {nativeInstall && (
        <Button
          label={nativeInstall.label}
          variant="primary"
          link={nativeInstall.link}
          icon={<FontAwesomeIcon icon={["fas", "download"]} />}
          fullWidth
          dataUmamiEvent={`core-${platform}-native-install`}
        />
      )}
      {architectures.map((arch) => (
        <Button
          outline={!!nativeInstall}
          label={"Download " + displayArch(arch)}
          variant={nativeInstall ? "secondary" : "primary"}
          link={downloadUrl(platform, arch, version ? version : defaultVersion)}
          icon={<FontAwesomeIcon icon={["fas", "download"]} />}
          fullWidth
          dataUmamiEvent={`core-${platform}-${arch}-download`}
        />
      ))}
      {architectures.length > 1 && (
        <small>
          <a href="#arch-help">
            <FontAwesomeIcon icon={["fas", "question-circle"]} /> Which one
            should I get?
          </a>
        </small>
      )}
    </div>
  );
}
