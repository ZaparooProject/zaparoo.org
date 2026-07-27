import React from 'react';

interface StructuredDataProps {
  type?: 'homepage' | 'product' | 'organization';
}

const StructuredData: React.FC<StructuredDataProps> = ({ type = 'homepage' }) => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zaparoo Project",
    "url": "https://zaparoo.org",
    "logo": "https://zaparoo.org/img/logo_sm.webp",
    "sameAs": [
      "https://github.com/ZaparooProject",
      "https://discord.gg/zaparoo",
      "https://reddit.com/r/Zaparoo",
      "https://www.youtube.com/@HeyZaparoo"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "community support",
      "url": "https://zaparoo.org/discord"
    }
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Zaparoo",
    "alternateName": "Zaparoo Universal Loading System",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": ["Windows", "Linux", "macOS", "Android"],
    "description": "Free, open-source software for launching games with NFC cards, toys, QR codes, optical discs, and other physical objects",
    "url": "https://zaparoo.org",
    "downloadUrl": "https://zaparoo.org/downloads/",
    "author": {
      "@type": "Organization",
      "name": "Zaparoo Project",
      "url": "https://zaparoo.org"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "license": "https://github.com/ZaparooProject/zaparoo-core/blob/main/LICENSE",
    "softwareVersion": "latest",
    "screenshot": "https://zaparoo.org/img/social-card.webp",
    "featureList": [
      "Launch games with NFC cards, toys, QR codes, barcodes, and optical discs",
      "Works across supported gaming platforms",
      "Free and open source",
      "No hardware modifications required",
      "Works with existing games and emulators",
      "Supports media launching and custom scripted actions"
    ],
    "keywords": "NFC game launcher, physical game collection, QR code game launcher, MiSTer FPGA, Batocera, SteamOS, open source"
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to launch games with Zaparoo NFC cards",
    "description": "Set up Zaparoo with NFC cards, then explore other supported ways to launch games",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Install Zaparoo",
        "text": "Download and install the free Zaparoo software for your existing games and emulators."
      },
      {
        "@type": "HowToStep",
        "name": "Link a Card",
        "text": "Choose a game in the Zaparoo App and save it to an NFC card."
      },
      {
        "@type": "HowToStep",
        "name": "Tap and Play",
        "text": "Tap the card on your reader to launch the game."
      }
    ]
  };

  if (type === 'homepage') {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema)
          }}
        />
      </>
    );
  }

  return null;
};

export default StructuredData;
