---
description: "NFC cards and tags for Zaparoo: NTAG215, NTAG213, NTAG216, and MIFARE Classic, what fits on each, what to buy, and how to write them from your phone."
keywords: [zaparoo nfc tags, ntag215 games, ntag213 zaparoo, nfc cards zaparoo, rfid tags zaparoo, amiibo ntag215]
---

# NFC Cards and Tags

NFC tags tell the reader and software what action to take. They **do not** contain games. They store a small piece of [ZapScript](../../zapscript/index.md), such as a game launch command, that the [Zaparoo App](../../app/index.md) writes from an NFC-capable iPhone or Android phone for free.

Tags come in many form factors and standards. Cards, stickers, coins, and key fobs all work the same way, but the chip standard affects how much fits on the tag and whether phones and readers can write it. NTAG is the standard to buy; [MIFARE Classic](./mifare.md) is supported with more compatibility limits.

:::tip Buy NTAG215
NTAG215 has enough room for any normal Zaparoo token and works with every reader. Search for `NTAG215` specifically so you don't accidentally buy MIFARE Classic tags.
:::

## NTAG types

There are several NTAG types. For Zaparoo tokens, the practical difference is storage size. NDEF is the format for data on an NFC tag, and the payload limit is how much ZapScript text fits once that format's overhead is taken out:

| Standard | User memory | Zaparoo NDEF payload limit |
| -------- | ----------- | -------------------------- |
| NTAG213  | 144 bytes   | 114 bytes                  |
| NTAG215  | 504 bytes   | 496 bytes                  |
| NTAG216  | 888 bytes   | 872 bytes                  |

The text you can store is about 10 to 15 bytes less than the payload limit, because the NDEF record itself takes some room. NTAG213 can be too small for long file paths or several chained ZapScript commands. If you already have NTAG213 tags, use the [Title ID format](../../zapscript/launch.md#launchtitle) or [mappings](../../features/mappings.md) to keep the data on each tag small.

Some NFC toys use NTAG chips internally, such as [Amiibo](../nfc-toys/index.md#amiibo) (NTAG215) and [Lego Dimensions](../nfc-toys/index.md#lego-dimensions) (NTAG213). They are locked, so map their UID to a game instead of writing to them.

## Form factors

- **Cards** (credit card size, CR-80) are a good fit for game collections. Inkjet-printable PVC cards are available if you want custom artwork and have a compatible printer.
- **Stickers and coins** (typically 25 mm round) are good for sticking inside cases, on cartridges, or onto 3D printed projects.
- **Key fobs** are a compact option for keychains, handheld tokens, or setups where cards are too large.

All form factors work the same way. Pick whatever suits your setup.

## Where to buy

:::tip
The <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink> stocks NTAG215 cards, blank and pre-printed. Purchases fund development.
:::

NTAG tags are available from Amazon, eBay, AliExpress, and specialist NFC suppliers. Search for the standard and form factor, such as `NTAG215 NFC card` or `NTAG213 NFC sticker`. AliExpress is the usual choice for bulk blank cards.

## Troubleshooting

**The write failed or the app says the tag is full.** The ZapScript is longer than the tag's payload limit. Use a [Title ID](../../zapscript/launch.md#launchtitle) instead of a file path, shorten the script, or use NTAG215 or NTAG216 tags.

**The phone says the tag is read-only.** Some tags are locked at manufacture, including Amiibo and other [NFC toys](../nfc-toys/index.md). Map the tag's UID to a game instead of writing to it.

**The tag writes on the phone but the reader doesn't scan it.** Check the reader's own page for range and placement notes, and make sure the tag isn't sitting on metal.

---

<SponsorCallout variant="sponsor" />
