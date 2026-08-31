/**
 * Single source of truth for product names, one-line descriptions, prices,
 * and links used across the homepage, sponsor page, downloads, callouts,
 * and the setup guide. Update here, not in individual pages.
 */

const warpPricingBase =
  "https://zaparoo.com/pricing?utm_source=zaparoo.org&utm_medium=referral&utm_campaign=warp";

export const products = {
  warp: {
    name: "Zaparoo Warp",
    short: "Warp",
    // One sentence, reused verbatim wherever Warp is introduced.
    summary:
      "Warp is the paid tier of Zaparoo Online. It backs up your Zaparoo data off-site automatically and restores it to this device or a replacement, and it includes Zaparoo App Pro while you subscribe.",
    freeLine: "Local backups are always free.",
    tagline: "Never lose a save to a dead SD card.",
    shortPitch:
      "Warp backs up your Zaparoo data off-site automatically and includes App Pro.",
    sponsorLine:
      "Automatic off-site backups, restorable to a replacement device. Includes App Pro. Local backups are always free.",
    // Platform coverage line; update when more platforms gain saves and settings backup.
    platformNote:
      "Backs up Zaparoo data on every platform. On MiSTer it also covers saves, save states, settings, and input mappings, and on SteamOS emulator settings, saves, and save states.",
    snapshots: "It keeps your last 30 changed snapshots per device.",
    priceMonthly: "US$3.99/month",
    priceAnnual: "US$29.99/year",
    priceFrom: "From US$3.99/month",
    priceLine:
      "US$29.99/year or US$3.99/month. Cancel anytime, full refund within 14 days.",
    patreonNote:
      "Patreon Supporter and Sponsor members have Warp and App Pro while their membership is active. Link Patreon in Zaparoo Online instead of subscribing separately.",
    cta: "See Warp plans",
    pricingUrl: (content: string) => `${warpPricingBase}&utm_content=${content}`,
  },
  online: {
    name: "Zaparoo Online",
    summary:
      "Zaparoo Online is a free, optional account for play history sync, virtual cards and decks, and the User API. Cloud backup is its paid tier, Warp.",
    url: "https://online.zaparoo.com",
  },
  appPro: {
    name: "Zaparoo App Pro",
    short: "Pro",
    summary:
      "Pro turns your phone into a wireless reader: scan cards, QR codes, and barcodes with your phone to launch them on your device.",
    freeLine:
      "Managing Core, browsing your library, and writing tokens are always free.",
    tagline: "Use your phone as the reader.",
    sponsorLine:
      "Scan cards, QR codes, and barcodes with your phone. Managing Core and writing tokens stay free.",
    price: "US$6.99 one-time purchase",
    priceShort: "US$6.99 one-time",
    includedNote: "Included with Warp.",
    docsUrl: "/docs/app/#zaparoo-app-pro",
  },
  app: {
    name: "Zaparoo App",
    iosUrl:
      "https://apps.apple.com/us/app/zaparoo/id6480331015?itsct=apps_box_badge&itscg=30200",
    androidUrl:
      "https://play.google.com/store/apps/details?id=dev.wizzo.tapto&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
    downloadsAnchor: "/downloads/#zaparoo-app",
  },
  shop: {
    name: "Zaparoo Shop",
    summary:
      "Official readers, cards, and starter kits, tested with Zaparoo and ready to use. Every purchase funds development.",
    shippingNote: "Ships worldwide from Australia.",
    homepageLine: "Tested with Zaparoo and ready to use. Every purchase funds development.",
    tagline: "Official readers, cards, and starter kits.",
    sponsorLine:
      "Tested with Zaparoo, ships worldwide from Australia. Every purchase funds development.",
    url: "https://shop.zaparoo.com",
    starterKitsUrl: "https://shop.zaparoo.com/collections/starter-kits",
    readersUrl: "https://shop.zaparoo.com/collections/readers",
    cardsUrl: "https://shop.zaparoo.com/collections/cards",
  },
  patreon: {
    name: "Patreon",
    priceMonthly: "US$5/month",
    from: "From US$5/month",
    tiersNote:
      "Supporter and Sponsor tiers both include Warp and App Pro while your membership is active, plus a Discord role and a credit in the App.",
    url: "https://patreon.com/wizzo",
  },
  githubSponsors: {
    name: "GitHub Sponsors",
    summary: "One-time or monthly, for individuals and companies.",
    url: "https://github.com/sponsors/ZaparooProject",
  },
  partner: {
    integrateUrl:
      "https://zaparoo.com/integrate?utm_source=zaparoo.org&utm_medium=referral&utm_campaign=partners",
    gameCardsUrl:
      "https://zaparoo.com/game-cards?utm_source=zaparoo.org&utm_medium=referral&utm_campaign=partners",
  },
  billingSupportUrl: "https://zaparoo.com/support",
} as const;

export default products;
