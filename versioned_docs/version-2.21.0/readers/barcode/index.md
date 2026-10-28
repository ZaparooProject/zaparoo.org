---
description: "Use barcode scanners with Zaparoo: scan barcodes on game cases or custom labels with the Zaparoo App camera or an RS-232 serial scanner."
keywords: [zaparoo barcode, barcode scanner game launcher, rs232 barcode reader zaparoo, serial barcode scanner, qr code scanner zaparoo]
---

# Barcode Scanners

Zaparoo reads [barcodes](../../tokens/barcodes.md) and [QR codes](../../tokens/qr-codes.md) through the Zaparoo App's camera or a serial barcode scanner connected to the device running Core.

## Scanning with the Zaparoo App

Use your phone's camera to scan barcodes and QR codes with the [Zaparoo App](../../app/index.md). Scans are sent to Core through the app, so you don't need a reader driver on the device running Core, and it works on every platform. Launching from a phone scan needs [Zaparoo App Pro](../../app/index.md#zaparoo-app-pro).

<PlatformSupport readerId="barcode" />

See the [barcodes token page](../../tokens/barcodes.md) for supported formats and how to set up mappings.

## Serial scanners {#hardware-scanners}

Connect a physical barcode or QR code scanner through an RS-232 serial port or a USB-to-serial adapter for hands-free scanning. The scanner must be configured for RS-232 or USB-COM output and send each scan as a line of serial text, not keyboard-emulation keystrokes.

<PlatformSupport readerId="rs232" />

### Setup

The scanner is not auto-detected. Add it to [`config.toml`](../../core/config/index.md) with the serial port path for your scanner:

```toml
[[readers.connect]]
driver = "rs232barcode"
path = "/dev/ttyUSB0"  # Linux/macOS
```

```toml
[[readers.connect]]
driver = "rs232barcode"
path = "COM3"  # Windows
```

To find the port, run `ls /dev/ttyUSB* /dev/ttyACM*` on Linux or `ls /dev/tty.usb* /dev/cu.usb*` on macOS. On Windows, open Device Manager and look under **Ports (COM & LPT)** for "USB Serial Port (COMx)".

Core talks to the scanner at 9600 baud, 8 data bits, no parity, 1 stop bit (9600 8N1). These settings are fixed. If your scanner uses different settings, reconfigure the scanner with its manual or programming barcodes.

:::warning Keyboard emulation mode
Many barcode scanners ship in keyboard emulation mode, which this driver does not support. Switch the scanner to **RS-232** or **USB-COM** mode with a physical switch or the programming barcodes in its manual. Look for settings labeled "Serial Mode", "RS-232", or "USB-COM".
:::

### Usage

QR codes hold enough text to embed ZapScript directly. Use the [QR code generator](../../tokens/qr-codes.md#qr-code-generator) or another tool to create a code with your ZapScript, and scanning it runs the script:

```zapscript
**launch.random:snes
```

Linear barcode capacity depends on the format, scanner, and label size. For UPCs, EAN codes, and short custom IDs, use a [mapping](../../features/mappings.md): the barcode stores an ID, and Core maps that ID to ZapScript. For example, print a barcode containing `SONIC001` and add this to `mappings/barcodes.toml`:

```toml
[[mappings.entry]]
token_key = "id"
match_pattern = "SONIC001"
zapscript = "@Genesis/Sonic the Hedgehog"
```

## Troubleshooting

**Scanning a barcode types digits into a text field instead of reaching Core.** The scanner is in keyboard-emulation mode. Switch it to RS-232 or USB-COM mode as described above.

**The serial scanner is not detected.** Check the port path, make sure the scanner is in serial mode, and on Linux or macOS add your user to the `dialout` group (`sudo usermod -a -G dialout $USER`, then log out and back in). Turn on `debug_logging = true` and look for "opened RS232 barcode reader" in the log.

**Nothing happens when scanning.** For QR codes that contain ZapScript, check the text is valid ZapScript. For mapped barcodes, check the mapping uses `token_key = "id"` and that `match_pattern` matches the scanned value. Core strips common STX/ETX framing, but a scanner that adds other prefixes or suffixes can break exact mappings; reconfigure it with its programming barcodes.

**The App scans the code but nothing launches.** Barcodes need a [mapping](../../tokens/barcodes.md) that tells Core what to run, and launching from the phone's scan needs [Pro](../../app/index.md#zaparoo-app-pro).
