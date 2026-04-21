---
description: "Use product barcodes as Zaparoo tokens: scan the UPC on a physical game case to launch that game using mappings."
keywords: [zaparoo barcodes, barcode game launcher, upc game launch zaparoo, barcode token]
---

# Barcodes

Barcodes found on real products (like the UPC on the back of a game box) can be used as tokens in Zaparoo. Unlike [NFC tags](./nfc/index.md) or [QR codes](./qr-codes.md), barcodes can't contain ZapScript directly, so you use [mappings](../features/mappings.md) to assign an action to each barcode value.

This means you can scan the barcode on a physical game case and have it launch that game.

## Supported formats

Zaparoo supports a wide range of barcode formats:

- UPC-A and UPC-E
- EAN-8 and EAN-13
- Code 128, Code 39, Code 93
- Codabar
- ITF
- Data Matrix
- PDF-417

## How to scan

There are two ways to scan barcodes:

**Phone camera** using the [Zaparoo App](../app/index.md). Tap the camera button on the scan screen and point it at a barcode. The app uses Google ML Kit for detection and supports all the formats listed above.

**Hardware scanner** using an [RS232 barcode scanner](../readers/barcode/rs232.md) connected via serial port. These are the same scanners used in retail and POS systems. The hardware scanner is format-agnostic and will read whatever barcode types it supports.

## Setting up with the Zaparoo App

The easiest way to map a barcode is through the [Zaparoo App](../app/index.md):

1. Go to **Create > Add a Mapping**
2. Tap the **Camera** button and point at the barcode
3. The barcode value auto-populates in the token ID field
4. Write a ZapScript or use the command palette to pick a game
5. Tap **Save mapping**

## Setting up with mapping files

You can also create mappings manually. See the [mappings documentation](../features/mappings.md) for details.

```toml
[[mappings.entry]]
token_key = 'uid'
match_pattern = '045496590420'
zapscript = '**launch.search:Super Smash Bros'
```

Replace the barcode value with the one scanned from your game case.
