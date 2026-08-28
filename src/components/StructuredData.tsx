import type { ReactNode } from "react";
import coreRelease from "@site/src/data/coreRelease";

interface StructuredDataProps {
  type?: "homepage" | "product" | "organization";
}

export default function StructuredData({
  type = "homepage",
}: StructuredDataProps): ReactNode {
  if (type !== "homepage") return null;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://zaparoo.org/#core",
        name: "Zaparoo Core",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: [
          "MiSTer FPGA",
          "Batocera",
          "RePlayOS",
          "Windows",
          "Linux",
          "SteamOS",
          "Bazzite",
          "ChimeraOS",
          "LibreELEC",
        ],
        description:
          "Free, open-source service for launching games and media with NFC cards, QR codes, discs, and other physical objects.",
        url: "https://zaparoo.org/docs/core/",
        downloadUrl: "https://zaparoo.org/downloads/#zaparoo-core",
        softwareVersion: coreRelease.version,
        releaseNotes: `https://zaparoo.org${coreRelease.blogPost}/`,
        author: { "@id": "https://zaparoo.org/#organization" },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        license:
          "https://github.com/ZaparooProject/zaparoo-core/blob/main/LICENSE",
        featureList: [
          "Launch games and media with physical tokens",
          "NFC, QR code, barcode, optical disc, and removable-media support",
          "Local media database and launchers",
          "Open JSON-RPC API and ZapScript automation",
        ],
      },
      {
        "@type": "MobileApplication",
        "@id": "https://zaparoo.org/#app",
        name: "Zaparoo App",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: ["iOS", "Android"],
        description:
          "Mobile app for connecting to Zaparoo Core, managing media, creating tokens, and using a phone as a wireless reader with Pro.",
        url: "https://zaparoo.org/docs/app/",
        downloadUrl: "https://zaparoo.org/downloads/#zaparoo-app",
        author: { "@id": "https://zaparoo.org/#organization" },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        license:
          "https://github.com/ZaparooProject/zaparoo-app/blob/main/LICENSE",
      },
      {
        "@type": "HowTo",
        "@id": "https://zaparoo.org/#nfc-setup",
        name: "How to launch games with Zaparoo NFC cards",
        description:
          "Install Zaparoo, link a game to an NFC card, then tap the card to launch it.",
        step: [
          {
            "@type": "HowToStep",
            name: "Install Zaparoo",
            text: "Install Zaparoo Core on the device that plays your games.",
          },
          {
            "@type": "HowToStep",
            name: "Link a card",
            text: "Choose a game in the Zaparoo App and save it to a card.",
          },
          {
            "@type": "HowToStep",
            name: "Tap and play",
            text: "Tap the card on your reader and the game launches.",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
