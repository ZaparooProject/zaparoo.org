# NTAG

NTAG is the recommended NFC tag standard for Zaparoo. It has full compatibility with all platforms, works with both iPhones and Android phones, and is available in a range of form factors.

## Types

There are multiple NTAG types that work with Zaparoo. The only difference between them is storage size:

| Standard | Storage   |
| -------- | --------- |
| NTAG213  | 144 bytes |
| NTAG215  | 504 bytes |
| NTAG216  | 888 bytes |

**NTAG215 is recommended** for most users. NTAG213 (144 bytes) can be too small if you're writing long file paths or chaining multiple [ZapScript](../../zapscript/index.md) commands on a single tag. If you do have NTAG213 tags, you can work around the storage limit by using the [Title ID format](../../zapscript/launch.md#launchtitle) (which was designed to fit on NTAG213) or [mappings](../../features/mappings.md) to keep the data on each tag small.

## Form factors

NTAG tags come in several form factors:

- **Cards** (credit card size, CR-80) are the most popular for Zaparoo. Inkjet-printable PVC cards are available for custom artwork using a standard inkjet printer.
- **Stickers/coins** (typically 25mm round) are good for sticking inside cases, on cartridges, or onto 3D printed projects.
- **Key fobs** are a compact option and often come bundled with NFC readers.

All form factors work the same way. Pick whatever suits your setup.

## Cross-platform tags

Tags written with a [Title ID](../../zapscript/launch.md#launchtitle) work across different Zaparoo platforms. A tag written on MiSTer will also work on a Steam Deck, Batocera, or any other supported platform, because the Title ID is resolved locally on each device. File paths, on the other hand, are platform-specific and won't transfer between systems.

## Where to buy

:::tip Official Support
Get pre-printed NFC cards from the <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink> which directly supports the project!
:::

NTAG cards are available from Amazon, eBay, and AliExpress by searching for the standard and form factor (e.g. "NTAG215 NFC card", "NTAG215 NFC sticker"). AliExpress has them in bulk at low prices. Make sure you search for "NTAG215" specifically, as generic NFC tags are often [MIFARE Classic](./mifare.md) which has limited compatibility.

## NFC toys

Some NFC toy lines use NTAG chips internally. See [NFC Toys](../nfc-toys/index.md) for details on using them with Zaparoo:

- [Amiibo](../nfc-toys/amiibo.md) (NTAG215)
- [Lego Dimensions](../nfc-toys/lego-dimensions.md) (NTAG213)
