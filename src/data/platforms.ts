import type { CSSProperties } from "react";

export type SupportTier = "stable" | "beta" | "community";
export type CoreArchitecture = "amd64" | "arm64" | "arm" | "386";

export const CAPABILITIES = {
  OPTICAL_DRIVE: "optical_drive",
  USB_PORT: "usb_port",
  NETWORK: "network",
} as const;

export type PlatformCapability =
  (typeof CAPABILITIES)[keyof typeof CAPABILITIES];

interface WizardPlatformConfig {
  provides: PlatformCapability[];
  setup: string;
}

export interface PlatformDownload {
  architectures: CoreArchitecture[];
  defaultArchitecture?: CoreArchitecture;
  nativeInstall?: {
    label: string;
    link: string;
    icon: "refresh" | "package" | "terminal";
  };
}

const installScript = (
  link: string,
): NonNullable<PlatformDownload["nativeInstall"]> => ({
  label: "install.sh",
  link,
  icon: "terminal",
});

export interface PlatformDefinition {
  id:
    | "mister"
    | "mistex"
    | "batocera"
    | "replayos"
    | "windows"
    | "linux"
    | "steamos"
    | "bazzite"
    | "chimeraos"
    | "libreelec"
    | "commodore64";
  name: string;
  icon: string;
  iconStyle?: CSSProperties;
  docsPath: string;
  projectUrl: string;
  supportTier: SupportTier;
  description: string;
  /** Keep direct docs and builds, but omit this platform from discovery surfaces. */
  legacy?: boolean;
  wizard?: WizardPlatformConfig;
  download?: PlatformDownload;
}

export type PlatformId = PlatformDefinition["id"];
export type WizardPlatform = PlatformDefinition & {
  wizard: WizardPlatformConfig;
};
export type DownloadablePlatform = PlatformDefinition & {
  download: PlatformDownload;
};

export const supportTierDetails: Record<
  SupportTier,
  { label: string; description: string }
> = {
  stable: {
    label: "Stable",
    description: "Core installs and launches supported media on this platform.",
  },
  beta: {
    label: "Beta",
    description: "Core installs, but some setup paths and launchers remain incomplete.",
  },
  community: {
    label: "Community integration",
    description: "Uses Zaparoo tokens without running Zaparoo Core directly.",
  },
};

export const platforms: readonly PlatformDefinition[] = [
  {
    id: "mister",
    name: "MiSTer FPGA",
    icon: "/img/logos/mister.svg",
    iconStyle: { width: "75px", height: "75px" },
    docsPath: "/docs/platforms/mister/",
    projectUrl: "https://misterfpga.org/",
    supportTier: "stable",
    description: "Update All installation for MiSTer arcade, console, and computer cores.",
    wizard: {
      provides: [
        CAPABILITIES.OPTICAL_DRIVE,
        CAPABILITIES.USB_PORT,
        CAPABILITIES.NETWORK,
      ],
      setup: "Update All install",
    },
    download: {
      architectures: ["arm"],
      nativeInstall: {
        label: "Update All",
        link: "/docs/platforms/mister/#install",
        icon: "refresh",
      },
    },
  },
  {
    id: "mistex",
    name: "MiSTeX",
    icon: "/img/logos/mistex.jpeg",
    iconStyle: {
      width: "75px",
      height: "75px",
      borderRadius: "10%",
    },
    docsPath: "/docs/platforms/mistex/",
    projectUrl: "https://github.com/MiSTeX-devel",
    supportTier: "stable",
    description: "Manual script installation with MiSTer-compatible launchers.",
    legacy: true,
    download: {
      architectures: ["arm64"],
    },
  },
  {
    id: "batocera",
    name: "Batocera",
    icon: "/img/logos/batocera.png",
    iconStyle: { width: "75px", height: "73.83px" },
    docsPath: "/docs/platforms/batocera/",
    projectUrl: "https://batocera.org/",
    supportTier: "stable",
    description: "Install through Batocera Content Downloader.",
    wizard: {
      provides: [
        CAPABILITIES.OPTICAL_DRIVE,
        CAPABILITIES.USB_PORT,
        CAPABILITIES.NETWORK,
      ],
      setup: "Content Downloader install",
    },
    download: {
      architectures: ["amd64", "arm64", "arm"],
      nativeInstall: {
        label: "Content DL",
        link: "/docs/platforms/batocera/#install",
        icon: "package",
      },
    },
  },
  {
    id: "replayos",
    name: "RePlayOS",
    icon: "/img/logos/replayos.webp",
    iconStyle: { width: "125px", height: "22.06px" },
    docsPath: "/docs/platforms/replayos/",
    projectUrl: "https://www.replayos.com/",
    supportTier: "stable",
    description: "Dedicated Core build for launching games on RePlayOS.",
    wizard: {
      provides: [CAPABILITIES.USB_PORT, CAPABILITIES.NETWORK],
      setup: "Install script",
    },
    download: {
      architectures: ["arm64"],
      nativeInstall: installScript("/docs/platforms/replayos/#install"),
    },
  },
  {
    id: "windows",
    name: "Windows",
    icon: "/img/logos/windows.svg",
    iconStyle: { width: "75px", height: "75px" },
    docsPath: "/docs/platforms/windows/",
    projectUrl: "https://www.microsoft.com/windows/",
    supportTier: "beta",
    description: "Windows installer with beta launcher coverage.",
    wizard: {
      provides: [CAPABILITIES.USB_PORT, CAPABILITIES.NETWORK],
      setup: "Windows installer",
    },
    download: {
      architectures: ["amd64", "arm64", "386"],
    },
  },
  {
    id: "linux",
    name: "Linux",
    icon: "/img/logos/linux.webp",
    iconStyle: { width: "63.28px", height: "75px" },
    docsPath: "/docs/platforms/linux/",
    projectUrl: "https://www.linux.org/",
    supportTier: "beta",
    description: "Manual Linux installation with beta launcher coverage.",
    wizard: {
      provides: [
        CAPABILITIES.OPTICAL_DRIVE,
        CAPABILITIES.USB_PORT,
        CAPABILITIES.NETWORK,
      ],
      setup: "Install script",
    },
    download: {
      architectures: ["amd64", "arm64"],
      nativeInstall: installScript("/docs/platforms/linux/#install"),
    },
  },
  {
    id: "steamos",
    name: "SteamOS",
    icon: "/img/logos/steamos.svg",
    iconStyle: {
      width: "125px",
      height: "33.33px",
      backgroundColor: "white",
      borderRadius: "5px",
    },
    docsPath: "/docs/platforms/steamos/",
    projectUrl: "https://store.steampowered.com/steamos/",
    supportTier: "beta",
    description: "User-local install script for Steam Deck.",
    wizard: {
      provides: [
        CAPABILITIES.OPTICAL_DRIVE,
        CAPABILITIES.USB_PORT,
        CAPABILITIES.NETWORK,
      ],
      setup: "Install script",
    },
    download: {
      architectures: ["amd64"],
      nativeInstall: installScript("/docs/platforms/steamos/#install"),
    },
  },
  {
    id: "bazzite",
    name: "Bazzite",
    icon: "/img/logos/bazzite.svg",
    iconStyle: { width: "75px", height: "75px" },
    docsPath: "/docs/platforms/bazzite/",
    projectUrl: "https://bazzite.gg/",
    supportTier: "beta",
    description: "Core builds for Bazzite handhelds and PCs; launchers are beta.",
    wizard: {
      provides: [
        CAPABILITIES.OPTICAL_DRIVE,
        CAPABILITIES.USB_PORT,
        CAPABILITIES.NETWORK,
      ],
      setup: "Install script",
    },
    download: {
      architectures: ["amd64", "arm64"],
      nativeInstall: installScript("/docs/platforms/bazzite/#install"),
    },
  },
  {
    id: "chimeraos",
    name: "ChimeraOS",
    icon: "/img/logos/chimeraos.webp",
    iconStyle: { width: "67.09px", height: "75px" },
    docsPath: "/docs/platforms/chimeraos/",
    projectUrl: "https://chimeraos.org/",
    supportTier: "beta",
    description: "Core builds for ChimeraOS systems; launchers are beta.",
    wizard: {
      provides: [
        CAPABILITIES.OPTICAL_DRIVE,
        CAPABILITIES.USB_PORT,
        CAPABILITIES.NETWORK,
      ],
      setup: "Install script",
    },
    download: {
      architectures: ["amd64", "arm64"],
      nativeInstall: installScript("/docs/platforms/chimeraos/#install"),
    },
  },
  {
    id: "libreelec",
    name: "LibreELEC",
    icon: "/img/logos/libreelec.png",
    iconStyle: {
      width: "75px",
      height: "75px",
      borderRadius: "10%",
    },
    docsPath: "/docs/platforms/libreelec/",
    projectUrl: "https://libreelec.tv/",
    supportTier: "beta",
    description: "Manual beta setup for Kodi movies, TV shows, and music.",
    wizard: {
      provides: [
        CAPABILITIES.OPTICAL_DRIVE,
        CAPABILITIES.USB_PORT,
        CAPABILITIES.NETWORK,
      ],
      setup: "Manual Kodi setup",
    },
    download: {
      architectures: ["amd64", "arm64", "arm"],
      defaultArchitecture: "arm64",
    },
  },
  {
    id: "commodore64",
    name: "Commodore 64",
    icon: "/img/logos/commodore64.webp",
    iconStyle: { width: "200px", height: "20px" },
    docsPath: "/docs/platforms/commodore64/",
    projectUrl: "https://github.com/SensoriumEmbedded/TeensyROM/",
    supportTier: "community",
    description: "Token integration through TeensyROM; Core does not run on C64.",
  },
];

export const listedPlatforms = platforms.filter((platform) => !platform.legacy);

export const wizardPlatforms = listedPlatforms.filter(
  (platform): platform is WizardPlatform => Boolean(platform.wizard),
);

export const downloadablePlatforms = listedPlatforms.filter(
  (platform): platform is DownloadablePlatform => Boolean(platform.download),
);

const docsIndexItem = (platform: PlatformDefinition) => ({
  name: platform.name,
  icon: platform.icon,
  iconStyle: platform.iconStyle,
  link: `./${platform.docsPath.split("/").filter(Boolean).at(-1)}/`,
});

export const platformDocsGroups = {
  stable: listedPlatforms
    .filter((platform) => platform.supportTier === "stable")
    .map(docsIndexItem),
  beta: listedPlatforms
    .filter((platform) => platform.supportTier === "beta")
    .map(docsIndexItem),
  community: listedPlatforms
    .filter((platform) => platform.supportTier === "community")
    .map(docsIndexItem),
} as const;
