import React, { ReactNode, CSSProperties, useState, useEffect } from "react";
import Button from "../Button";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fas);

export const defaultVersion = "2.8.0";
export const defaultReleaseDate = "2026-01-01";
export const latestReleaseBlogPost = "/blog/core-v2.8.0";

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
  // Linux-based platforms (except mister/mistex) use .tar.gz
  const useTarGz = !["mister", "mistex", "windows"].includes(platform);
  const ext = useTarGz ? "tar.gz" : "zip";
  return `https://github.com/ZaparooProject/zaparoo-core/releases/download/v${version}/zaparoo-${platform}_${arch}-${version}.${ext}`;
};

type DownloadCard = {
  name: string;
  platform: string;
  version?: string;
  status: "stable" | "beta";
  architectures: Arch[];
  defaultArch?: Arch;
  icon: ReactNode | null;
  docLink?: string;
  platformLink: string;
  nativeInstall?: {
    link: string;
    label: string;
  };
  id?: string;
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

export default function DownloadCard({
  name,
  platform,
  version = null,
  status = "stable",
  architectures,
  defaultArch,
  icon,
  docLink,
  platformLink,
  nativeInstall,
  id,
}: DownloadCard) {
  const [selectedArch, setSelectedArch] = useState<Arch>(
    defaultArch && architectures.includes(defaultArch)
      ? defaultArch
      : architectures[0]
  );
  const [isTargeted, setIsTargeted] = useState(false);
  const resolvedVersion = version ? version : defaultVersion;

  useEffect(() => {
    if (!id) return;

    const checkHash = () => {
      setIsTargeted(window.location.hash === `#${id}`);
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [id]);

  return (
    <div
      id={id}
      className={`download-card${isTargeted ? " download-card--targeted" : ""}`}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        margin: "10px",
        borderRadius: "8px",
        padding: "1rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        width: "250px",
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
        {"v" + resolvedVersion}
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
        <a
          href={platformLink}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event={`download-platform-${platform}`}
        >
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
          dataUmamiEvent={`download-docs-${platform}`}
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
      {architectures.length === 1 ? (
        <Button
          outline={!!nativeInstall}
          label={"Download " + displayArch(architectures[0])}
          variant={nativeInstall ? "secondary" : "primary"}
          link={downloadUrl(platform, architectures[0], resolvedVersion)}
          icon={<FontAwesomeIcon icon={["fas", "download"]} />}
          fullWidth
          dataUmamiEvent={`core-${platform}-${architectures[0]}-download`}
        />
      ) : (
        <>
          <div style={{ display: "flex", gap: "0.5rem", width: "100%", alignItems: "center" }}>
            <select
              value={selectedArch}
              onChange={(e) => setSelectedArch(e.target.value as Arch)}
              aria-label="Select architecture"
              style={{
                flex: "1",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid var(--ifm-color-emphasis-300)",
                backgroundColor: "var(--ifm-background-surface-color)",
                color: "var(--ifm-font-color-base)",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              {architectures.map((arch) => (
                <option key={arch} value={arch}>
                  {displayArch(arch)}
                </option>
              ))}
            </select>
            <a
              href="#arch-help"
              title="Which architecture should I get?"
              aria-label="Help choosing architecture"
              className="arch-help-icon"
            >
              <FontAwesomeIcon icon={["fas", "question-circle"]} />
            </a>
          </div>
          <Button
            outline={!!nativeInstall}
            label="Download"
            variant={nativeInstall ? "secondary" : "primary"}
            link={downloadUrl(platform, selectedArch, resolvedVersion)}
            icon={<FontAwesomeIcon icon={["fas", "download"]} />}
            fullWidth
            dataUmamiEvent={`core-${platform}-${selectedArch}-download`}
          />
        </>
      )}
    </div>
  );
}
