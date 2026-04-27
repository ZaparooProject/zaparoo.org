---
description: "NTAG215 and NTAG213 NFC tags for Zaparoo: the recommended token standard for game collections, Amiibo compatibility, and cross-platform reads."
keywords: [ntag215 zaparoo, ntag213 zaparoo, nfc game cards, amiibo ntag215, nfc tags zaparoo]
---

# NTAG

NTAG is the recommended NFC tag standard for Zaparoo. It works across Zaparoo's supported platforms, can be written from NFC-capable iPhones and Android phones, and comes in several useful form factors.

## Types

There are multiple NTAG types that work with Zaparoo. For Zaparoo tokens, the practical difference is storage size:

| Standard | User memory | Zaparoo NDEF payload limit |
| -------- | ----------- | -------------------------- |
| NTAG213  | 144 bytes   | 114 bytes                  |
| NTAG215  | 504 bytes   | 496 bytes                  |
| NTAG216  | 888 bytes   | 872 bytes                  |

**NTAG215 is recommended** for most users. NTAG213 can be too small if you're writing long file paths or chaining multiple [ZapScript](../../zapscript/index.md) commands on a single tag. If you already have NTAG213 tags, use the [Title ID format](../../zapscript/launch.md#launchtitle) or [mappings](../../features/mappings.md) to keep the data on each tag small.

## Form factors

NTAG tags come in several form factors:

- **Cards** (credit card size, CR-80) are a good fit for game collections. Inkjet-printable PVC cards are available if you want custom artwork and have a compatible printer.
- **Stickers/coins** (typically 25mm round) are good for sticking inside cases, on cartridges, or onto 3D printed projects.
- **Key fobs** are a compact option for keychains, handheld tokens, or setups where cards are too large.

All form factors work the same way. Pick whatever suits your setup.

## Where to buy

:::tip Official Support
Get pre-printed NFC cards from the <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink> which directly supports the project!
:::

NTAG cards are available from Amazon, eBay, and AliExpress by searching for the standard and form factor, such as "NTAG215 NFC card" or "NTAG215 NFC sticker". Search for `NTAG215` specifically, because generic NFC tag listings may be [MIFARE Classic](./mifare.md), which has limited compatibility.

## NFC toys

Some NFC toy lines use NTAG chips internally. See [NFC Toys](../nfc-toys/index.md) for details on using them with Zaparoo:

- [Amiibo](../nfc-toys/amiibo.md) (NTAG215)
- [Lego Dimensions](../nfc-toys/lego-dimensions.md) (NTAG213)

## FAQ

**Why NTAG215 and not NTAG213?**

NTAG213 has 144 bytes of user memory, and Zaparoo can use 114 bytes of that for the NDEF payload. That's often too small for long file paths or multi-command ZapScript. NTAG215 gives you much more room. If you already have NTAG213 tags, use [Title IDs](../../zapscript/launch.md#launchtitle) to keep data small.

**Can I use a phone to write NFC tags?**

Yes. The [Zaparoo App](../../app/index.md) can write NTAG tags from NFC-capable Android phones and iPhones. You search for a game, select it, and tap the tag to write it. No separate reader is needed for this step.

**What's the cheapest way to buy NTAG215 tags?**

Search for "NTAG215 NFC card" on AliExpress if you want bulk blank cards. If you want custom printed cards, the [Zaparoo Shop](https://shop.zaparoo.com/) stocks pre-printed card designs.

---

<SponsorCallout variant="sponsor" />
