---
sidebar_position: 1
description: "Zaparoo tokens: NFC cards, QR codes, barcodes, NFC toys, and other physical objects that trigger game and media launches when scanned."
keywords: [zaparoo tokens, nfc cards games, zaparoo nfc, qr code game launcher, amiibo game launcher]
---

# Tokens

Tokens are physical objects that trigger actions in Zaparoo. Writable tokens hold a small piece of text, like a game title or [ZapScript](../zapscript/index.md) command, not the game itself. Read-only tokens, such as some NFC toys or product barcodes, can be matched to ZapScript with [mappings](../features/mappings.md). When you scan a token on a [reader](../readers/index.md), Zaparoo reads the token data and runs the matching action.

Tokens are the things you scan; [readers](../readers/index.md) are the hardware that scans them. The most common tokens are NFC cards, but Zaparoo also supports QR codes, barcodes, NFC toys like Amiibo figures, discs, and USB drives.

Most people start with [NTAG215 cards](./nfc/ntag.md): they hold enough for any normal ZapScript, work with every NFC reader, and are cheap in bulk.

<Gallery media={[
  { src: "/img/showcase/KarlFayeton_printed_cards.webp", width: 1200, height: 900, alt: "Sleeved NFC cards with front and back artwork" },
  { src: "/img/showcase/Foolz_arcade_coin_collection.webp", width: 1200, height: 801, alt: "Custom NFC arcade coins beside a coin-slot reader" },
  { src: "/img/showcase/Suiren_floppy_collection.webp", width: 1200, height: 573, alt: "Collection of floppy-shaped Zaparoo tokens" },
]} />

*From left: cards by Karl Fayeton from [Community Showcase #5](/blog/community-showcase-5), then NFC coins by Foolz and floppy-style tokens by Suiren from [Community Showcase #6](/blog/community-showcase-6).*

:::tip
The <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink> stocks premium NFC cards with pre-printed designs ready to use with Zaparoo.
:::

## Token types

| Token | Storage | Writable | Reader needed | Notes |
| ----- | ------- | -------- | ------------- | ----- |
| [NFC cards and tags](./nfc/index.md) | Varies by chip (NTAG215: 504 bytes) | Yes | NFC reader | Cards, stickers, key fobs |
| [PCB cards](./pcb-cards.md) | NFC sticker | Yes | NFC reader | Custom PCBs with NFC stickers |
| [NFC toys](./nfc-toys/index.md) | UID | No (mapped) | NFC reader | Amiibo, Skylanders, and similar |
| [QR codes](./qr-codes.md) | Text or URL | Printable | App, camera, or scanner | Free to create, no special hardware |
| [Barcodes](./barcodes.md) | Barcode value | Printable | App or barcode scanner | Works with existing product barcodes |
| [Online cards and decks](../online/index.md#cards-and-decks) | Short URL on an NFC tag | Yes, and editable online | NFC reader | Change what a card does without rewriting it |
| [Discs](../readers/optical-drive.md) | Disc ID | Burned discs only, as a `zaparoo.txt` file | Optical drive | Launch from real CDs, DVDs, and Blu-rays |
| [USB sticks and SD cards](../readers/external-drive.md) | Text file on the drive | Yes | External drive reader | Removable media as tokens |

## Using tokens on multiple devices

The token's contents determine how portable it is:

- `@System/Title` is the preferred cross-device format. Each device resolves the title against its own indexed library, so filenames and folder layouts can differ.
- A relative system/path token can work on another device when both devices use compatible internal folder structures.
- An absolute filesystem path is generally specific to one device and platform.
- Mappings live on Core rather than the physical token, so create the mapping on each destination device as well.

The destination device still needs compatible media and a launcher for the requested system. See [ZapScript path formats](../zapscript/launch.md#path-formats) for examples and matching behavior.

## Storage

See [token storage](./storage/index.md) for binders, [cassette cases](./storage/cassette-cases.md), Nintendo Switch replacement cases, and other ways to keep a collection on the shelf.

---

<SponsorCallout variant="sponsor" />
