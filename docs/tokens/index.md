---
sidebar_position: 1
description: "Zaparoo tokens: NFC cards, QR codes, barcodes, Amiibo, and more physical objects that trigger game and media launches when scanned."
keywords: [zaparoo tokens, nfc cards games, zaparoo nfc, qr code game launcher, amiibo game launcher]
---

# Tokens

Tokens are physical objects that trigger actions in Zaparoo. A token holds a small piece of text, like a game title or [ZapScript](../zapscript/index.md) command, not the game itself. When you scan a token on a [reader](../readers/index.md), Zaparoo reads that text and runs it.

The most common tokens are NFC cards, but Zaparoo also supports QR codes, barcodes, and NFC toys like Amiibo figures.

:::tip
The [Zaparoo Shop](https://shop.zaparoo.com/) stocks premium NFC cards with pre-printed designs ready to use with Zaparoo.
:::

## Token types

| Token | Storage | Writable | Reader needed | Notes |
| ----- | ------- | -------- | ------------- | ----- |
| [NFC tags](./nfc/) | 48–888 bytes | Yes | NFC reader | Cards, stickers, key fobs |
| [PCB cards](./pcb-cards) | 540+ bytes | Yes | NFC reader | Custom PCBs with NFC stickers |
| [NFC toys](./nfc-toys/) | Read-only | No (UID mapped) | NFC reader | Amiibo, Skylanders, and similar |
| [QR codes](./qr-codes) | Any length | Printable | Phone camera | Free to create, no special hardware |
| [Barcodes](./barcodes) | Numeric | Printable | Barcode scanner | Works with existing product barcodes |

## Storage

We have recommendations for [storing tokens](./storage/) in fun and convenient ways, like [cassette cases](./storage/cassette-cases).

---

<SponsorCallout variant="sponsor" />
