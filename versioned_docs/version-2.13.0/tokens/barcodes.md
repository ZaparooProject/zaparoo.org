---
description: "Use product barcodes as Zaparoo tokens: scan the UPC on a physical game case to launch that game using mappings."
keywords: [zaparoo barcodes, barcode game launcher, upc game launch zaparoo, barcode token]
---

# Barcodes

Barcodes found on real products, like the UPC on the back of a game box, can be used as tokens in Zaparoo. Product barcodes usually identify an item instead of storing a command, so you use [mappings](../features/mappings.md) to assign [ZapScript](../zapscript/index.md) to each barcode value.

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

## Scanning options

There are two ways to scan barcodes with Zaparoo:

**Phone camera** using the [Zaparoo App](../app/index.md). You can scan a barcode while creating a mapping, or use the Zap screen as a camera reader if the Pro Launch on scan feature is enabled.

**Hardware scanner** using an [RS-232 barcode scanner](../readers/barcode/rs232.md) connected through a serial port or USB-to-serial adapter. Core receives whatever text the scanner sends, so supported formats depend on the scanner.

## Setting up with the Zaparoo App

The Zaparoo App can scan the barcode and save the mapping for you:

1. Go to **Create > Add a mapping**.
2. Tap **Camera** and point at the barcode.
3. Check that the scanned value appears in **Token ID**.
4. Enter ZapScript, or use the command palette to pick media.
5. Tap **Save mapping**.

## Setting up with mapping files

You can also create mappings manually. Put a `.toml` file in Zaparoo Core's `mappings` folder and match the barcode as a token ID:

```toml
[[mappings.entry]]
token_key = 'id'
match_pattern = '045496590420'
zapscript = '**launch.search:Super Smash Bros'
```

Replace `045496590420` with the value scanned from your game case. See the [mappings documentation](../features/mappings.md) for file locations, matching rules, and API-managed mappings.
