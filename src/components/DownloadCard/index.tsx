import React, { ReactNode, CSSProperties, useState, useEffect } from "react";
import Button from "../Button";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  CircleCheck,
  FlaskConical,
  RefreshCw,
  Terminal,
} from "lucide-react";
import coreRelease from "@site/src/data/coreRelease";
import type { CoreArchitecture } from "@site/src/data/platforms";
library.add(fas);

export const defaultVersion = coreRelease.version;
export const defaultReleaseDate = coreRelease.releaseDate;
export const latestReleaseBlogPost = coreRelease.blogPost;

type Arch = CoreArchitecture;
type ReleaseStatus = "stable" | "beta";

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
  // Linux-based platforms use .tar.gz; FPGA builds use .zip.
  const useTarGz = !["mister", "mistex", "windows"].includes(platform);
  const ext = useTarGz ? "tar.gz" : "zip";
  return `https://github.com/ZaparooProject/zaparoo-core/releases/download/v${version}/zaparoo-${platform}_${arch}-${version}.${ext}`;
};

type DownloadCard = {
  name: string;
  platform: string;
  status: ReleaseStatus;
  architectures: Arch[];
  defaultArch?: Arch;
  icon: ReactNode | null;
  docLink?: string;
  platformLink: string;
  nativeInstall?: {
    link: string;
    label: string;
    icon: "refresh" | "package" | "terminal";
  };
  id?: string;
};

const statusDetails = {
  stable: { label: "Stable", icon: CircleCheck },
  beta: { label: "Beta", icon: FlaskConical },
} as const;

const installIcons = {
  refresh: RefreshCw,
  package: Box,
  terminal: Terminal,
} as const;

const StatusIcon = ({ status }: { status: ReleaseStatus }) => {
  const details = statusDetails[status];
  const Icon = details.icon;
  return (
    <span
      className="download-card__status"
      data-status={status}
      aria-label={details.label}
      title={details.label}
    >
      <Icon size={24} aria-hidden="true" />
    </span>
  );
};

export default function DownloadCard({
  name,
  platform,
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
        borderRadius: "var(--z-card-radius)",
        gap: "0.5rem",
      }}
    >
      <StatusIcon status={status} />
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
      <div className="download-card__native-install">
        {nativeInstall && (() => {
          const InstallIcon = installIcons[nativeInstall.icon];
          return (
            <Button
              label={nativeInstall.label}
              variant="primary"
              link={nativeInstall.link}
              icon={
                <InstallIcon
                  size={16}
                  style={{ position: "relative", top: "0.2em" }}
                />
              }
              fullWidth
              dataUmamiEvent={`core-${platform}-native-install`}
            />
          );
        })()}
      </div>
      {architectures.length === 1 ? (
        <Button
          outline={!!nativeInstall}
          label="Download"
          variant={nativeInstall ? "secondary" : "primary"}
          link={downloadUrl(platform, architectures[0], defaultVersion)}
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
              onClick={(event) => {
                event.preventDefault();
                const architectureHelp = document.getElementById("arch-help");
                if (!(architectureHelp instanceof HTMLDetailsElement)) return;

                if (!architectureHelp.open) {
                  architectureHelp.querySelector("summary")?.click();
                }
                window.history.pushState(null, "", "#arch-help");
                window.requestAnimationFrame(() => {
                  architectureHelp.scrollIntoView({ behavior: "smooth" });
                });
              }}
            >
              <FontAwesomeIcon icon={["fas", "question-circle"]} />
            </a>
          </div>
          <Button
            outline={!!nativeInstall}
            label="Download"
            variant={nativeInstall ? "secondary" : "primary"}
            link={downloadUrl(platform, selectedArch, defaultVersion)}
            icon={<FontAwesomeIcon icon={["fas", "download"]} />}
            fullWidth
            dataUmamiEvent={`core-${platform}-${selectedArch}-download`}
          />
        </>
      )}
    </div>
  );
}
