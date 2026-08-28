---
sidebar_position: 1
description: "NTAG215 and NTAG213 NFC tags for Zaparoo: the recommended token standard for game collections, Amiibo compatibility, and cross-platform reads."
keywords: [ntag215 zaparoo, ntag213 zaparoo, nfc game cards, amiibo ntag215, nfc tags zaparoo]
---

# NTAG

NTAG is the recommended NFC tag standard for Zaparoo. It works across Zaparoo's supported platforms, can be written from NFC-capable iPhones and Android phones, and comes in several useful form factors.

## Types

There are multiple NTAG types that work with Zaparoo. For Zaparoo tokens, the practical difference is storage size. NDEF is the standard format for data on an NFC tag, and the payload limit is how much ZapScript text fits once that format's overhead is taken out:

| Standard | User memory | Zaparoo NDEF payload limit |
| -------- | ----------- | -------------------------- |
| NTAG213  | 144 bytes   | 114 bytes                  |
| NTAG215  | 504 bytes   | 496 bytes                  |
| NTAG216  | 888 bytes   | 872 bytes                  |

The payload limit is the whole NDEF message. The text you can store is about 10 to 15 bytes less than that, because the NDEF record itself takes some room.

**NTAG215 is recommended** for most users. NTAG213 can be too small if you're writing long file paths or chaining multiple [ZapScript](../../zapscript/index.md) commands on a single tag. If you already have NTAG213 tags, use the [Title ID format](../../zapscript/launch.md#launchtitle) or [mappings](../../features/mappings.md) to keep the data on each tag small.

## Form factors

NTAG tags come in several form factors:

- **Cards** (credit card size, CR-80) are a good fit for game collections. Inkjet-printable PVC cards are available if you want custom artwork and have a compatible printer.
- **Stickers/coins** (typically 25mm round) are good for sticking inside cases, on cartridges, or onto 3D printed projects.
- **Key fobs** are a compact option for keychains, handheld tokens, or setups where cards are too large.

All form factors work the same way. Pick whatever suits your setup.

## Where to buy

:::tip
The <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink> stocks NTAG215 cards, blank and pre-printed. Purchases fund development.
:::

NTAG cards are available from Amazon, eBay, and AliExpress by searching for the standard and form factor, such as "NTAG215 NFC card" or "NTAG215 NFC sticker". Search for `NTAG215` specifically, because generic NFC tag listings may be [MIFARE Classic](./mifare.md), which has limited compatibility.

## NFC toys

Some NFC toy lines use NTAG chips internally. See [NFC Toys](../nfc-toys/index.md) for details on using them with Zaparoo:

- [Amiibo](../nfc-toys/index.md#amiibo) (NTAG215)
- [Lego Dimensions](../nfc-toys/index.md#lego-dimensions) (NTAG213)

## FAQ

**Why NTAG215 and not NTAG213?**

NTAG213 has 144 bytes of user memory, and Zaparoo can use 114 bytes of that for the NDEF payload. That's often too small for long file paths or multi-command ZapScript. NTAG215 gives you much more room. If you already have NTAG213 tags, use [Title IDs](../../zapscript/launch.md#launchtitle) to keep data small.

**Can I use a phone to write NFC tags?**

Yes. The [Zaparoo App](../../app/index.md) can write NTAG tags from NFC-capable Android phones and iPhones. You search for a game, select it, and tap the tag to write it. No separate reader is needed for this step.

**What's the cheapest way to buy NTAG215 tags?**

Search for "NTAG215 NFC card" on AliExpress if you want bulk blank cards.

## Troubleshooting

**The write failed or the app says the tag is full.** The ZapScript is longer than the tag's payload limit. Use a [Title ID](../../zapscript/launch.md#launchtitle) instead of a file path, shorten the script, or use NTAG215 or NTAG216 tags.

**The phone says the tag is read-only.** Some tags are locked at manufacture, including Amiibo and other [NFC toys](../nfc-toys/index.md). Map the tag's UID to a game instead of writing to it.

**The tag writes on the phone but the reader doesn't scan it.** Check the reader's own page for range and placement notes, and make sure the tag isn't sitting on metal.

---

<SponsorCallout variant="sponsor" />
