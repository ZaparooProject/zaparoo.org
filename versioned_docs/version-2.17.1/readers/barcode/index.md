---
description: "Use barcode scanners with Zaparoo: scan barcodes on game cases or custom labels with the Zaparoo App or an RS-232 serial scanner."
keywords: [zaparoo barcode, barcode scanner game launcher, rs232 barcode reader zaparoo]
---

# Barcode Scanners

Zaparoo supports reading [barcodes](../../tokens/barcodes.md) and [QR codes](../../tokens/qr-codes.md) through the Zaparoo App or a configured serial scanner.

## Platforms

<PlatformSupport readerId="barcode" />

## Scanning with the Zaparoo App

Use your phone's camera to scan barcodes and QR codes with the native [Zaparoo App](../../app/index.md). Scans are sent to Zaparoo Core through the app, so you don't need a reader driver on the device running Core.

- No additional hardware required
- Supports barcode and QR code formats handled by the app's camera scanner

See the [barcodes token page](../../tokens/barcodes.md) for supported formats and how to set up mappings.

## Hardware scanners

Connect a physical barcode scanner through an RS-232 serial port or USB-COM adapter for a dedicated scanner setup. The scanner must output serial data, not keyboard-emulation keystrokes.

- Requires RS-232 or USB-COM barcode scanner hardware
- Hands-free operation
- Works with barcodes and QR codes supported by your scanner

See [RS-232 scanner](./rs232.md) for setup and usage.

## Troubleshooting

**Scanning a barcode types digits into a text field instead of reaching Core.** The scanner is in keyboard-emulation mode. Switch it to RS-232 or USB-COM mode using its manual or programming barcodes; see [keyboard emulation mode](./rs232.md#troubleshooting).

**The App scans the code but nothing launches.** Barcodes need a [mapping](../../tokens/barcodes.md) that tells Core what to run, and launching from the phone's scan needs [Launch on scan (Pro)](../../app/index.md#zaparoo-app-pro).
