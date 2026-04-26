---
description: "Use barcode scanners with Zaparoo: scan barcodes on game cases or custom labels with a USB HID scanner or your phone camera."
keywords: [zaparoo barcode, barcode scanner game launcher, usb barcode reader zaparoo]
---

# Barcode Scanners

Zaparoo supports reading barcodes and QR codes through two methods:

## Platforms

<PlatformSupport
  groups={[
    {
      name: "Base OS",
      platforms: [
        { name: "Windows", href: "../../platforms/windows/", support: "supported" },
        { name: "macOS", href: "../../platforms/mac", support: "supported" },
        { name: "Linux", href: "../../platforms/linux/", support: "supported" },
      ],
    },
    {
      name: "FPGA",
      platforms: [
        { name: "MiSTer", href: "../../platforms/mister/", support: "supported" },
        { name: "MiSTeX", href: "../../platforms/mistex", support: "supported" },
      ],
    },
    {
      name: "Retro Gaming OS",
      platforms: [
        { name: "Batocera", href: "../../platforms/batocera/", support: "supported" },
        { name: "ReplayOS", href: "../../platforms/replayos", support: "supported" },
        { name: "Recalbox", href: "../../platforms/recalbox", support: "supported" },
      ],
    },
    {
      name: "Handheld and Gaming Linux",
      platforms: [
        { name: "SteamOS", href: "../../platforms/steamos", support: "supported" },
        { name: "Bazzite", href: "../../platforms/bazzite", support: "supported" },
        { name: "ChimeraOS", href: "../../platforms/chimeraos", support: "supported" },
      ],
    },
    {
      name: "Media Center",
      platforms: [
        { name: "LibreELEC", href: "../../platforms/libreelec", support: "supported" },
      ],
    },
  ]}
/>

## App-Based Scanning

Use your phone's camera to scan barcodes and QR codes with the [Zaparoo App](../../app/index.md). This is the easiest option if you already have the app.

- No additional hardware required
- Works with any barcode or QR code

See the [barcodes token page](../../tokens/barcodes.md) for supported formats and how to set up mappings.

## Hardware Scanners

Connect a physical barcode scanner via serial port (RS232) for hands-free scanning. Great for dedicated setups and supports both linear barcodes and QR codes.

- Requires RS232 barcode scanner hardware
- Hands-free operation
- Fast and reliable

See [RS232 Scanner](./rs232.md) for setup and usage.
