---
sidebar_position: 1
description: "Zaparoo tokens: NFC cards, QR codes, barcodes, NFC toys, and other physical objects that trigger game and media launches when scanned."
keywords: [zaparoo tokens, nfc cards games, zaparoo nfc, qr code game launcher, amiibo game launcher]
---

# Tokens

Tokens are physical objects that trigger actions in Zaparoo. Writable tokens hold a small piece of text, like a game title or [ZapScript](../zapscript/index.md) command, not the game itself. Read-only tokens, such as some NFC toys or product barcodes, can be matched to ZapScript with [mappings](../features/mappings.md). When you scan a token on a [reader](../readers/index.md), Zaparoo reads the token data and runs the matching action.

The most common tokens are NFC cards, but Zaparoo also supports QR codes, barcodes, and NFC toys like Amiibo figures.

:::tip
The <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink> stocks premium NFC cards with pre-printed designs ready to use with Zaparoo.
:::

## Token types

| Token | Storage | Writable | Reader needed | Notes |
| ----- | ------- | -------- | ------------- | ----- |
| [NFC tags](./nfc/) | 48–888 bytes | Yes | NFC reader | Cards, stickers, key fobs |
| [PCB cards](./pcb-cards) | NFC sticker | Yes | NFC reader | Custom PCBs with NFC stickers |
| [NFC toys](./nfc-toys/) | UID | No (mapped) | NFC reader | Amiibo, Skylanders, and similar |
| [QR codes](./qr-codes) | Text or URL | Printable | App, camera, or scanner | Free to create, no special hardware |
| [Barcodes](./barcodes) | Barcode value | Printable | App or barcode scanner | Works with existing product barcodes |

## Storage

We have recommendations for [storing tokens](./storage/) in fun and convenient ways, like [cassette cases](./storage/cassette-cases) and Nintendo Switch replacement cases.

---

<SponsorCallout variant="sponsor" />
