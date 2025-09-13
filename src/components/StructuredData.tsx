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
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": ["Windows", "Linux", "macOS", "Android"],
    "description": "Open source universal loading system for launching games, media and scripted actions using physical objects like NFC cards and RFID tags",
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
      "Launch games instantly with NFC cards",
      "Support for multiple media types",
      "Open source and customizable",
      "No hardware modifications required",
      "Works with existing emulators and media players"
    ],
    "keywords": "NFC, RFID, game launcher, media player, physical computing, open source"
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to use Zaparoo",
    "description": "Learn how to set up and use Zaparoo to launch games and media with physical objects",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Install Zaparoo",
        "text": "Download and install Zaparoo on your device. Works with your existing games and emulators."
      },
      {
        "@type": "HowToStep",
        "name": "Write Your Cards",
        "text": "Use your phone or an NFC reader to link games and media to cards."
      },
      {
        "@type": "HowToStep",
        "name": "Tap & Play",
        "text": "Tap your card on the reader to instantly launch your content. No menus, just play!"
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