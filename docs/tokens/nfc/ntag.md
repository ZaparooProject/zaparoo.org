# NTAG

The NTAG standard has the best compatibility with Zaparoo and is readily available in form factors such as cards, stickers and key chains.

There are multiple NTAG types that have been confirmed working with Zaparoo. The only difference between them is storage size:

| Standard | Storage   |
| -------- | --------- |
| NTAG213  | 144 bytes |
| NTAG215  | 504 bytes |
| NTAG216  | 888 bytes |

**NTAG215 is recommended** for most users. NTAG213 (144 bytes) can be too small if you're writing long file paths or putting multiple [ZapScript](../../zapscript/index.md) commands on a single card. That said, the [Title ID format](../../zapscript/launch.md) was designed to be short enough to fit on an NTAG213, so if you're using Title IDs you'll be fine with either. [Mappings](../../core/mappings.md) are another way to keep the data on each tag small.

## Where to Buy

:::tip Official Support
Get pre-printed NFC cards from the <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink> which directly supports the project!
:::

NTAG cards are readily available from Amazon, eBay and AliExpress by searching for the standard and form factor (e.g. "NTAG215 NFC card", "NTAG215 NFC sticker"). AliExpress offers them in bulk at low prices.
