---
description: Connect a custom serial reader to Zaparoo Core using the Simple Serial protocol.
keywords: [zaparoo simple serial, custom reader zaparoo, diy reader serial, microcontroller nfc zaparoo]
---

# Simple Serial Reader

Simple Serial lets a microcontroller or other serial device act as a [Zaparoo reader](./index.md). Your device handles the hardware side, then sends token text or IDs to Zaparoo Core over a serial port.

Use this for custom readers, barcode or QR scanners, button panels, or hardware that Core does not support directly, such as an [RC522 RFID module](./nfc/rc522.md) connected through a microcontroller.

## Platforms

<PlatformSupport
  groups={[
    {
      name: "Base OS",
      platforms: [
        { name: "Windows", href: "../platforms/windows/", support: "supported" },
        { name: "macOS", href: "../platforms/mac", support: "supported" },
        { name: "Linux", href: "../platforms/linux/", support: "supported" },
      ],
    },
    {
      name: "FPGA",
      platforms: [
        { name: "MiSTer", href: "../platforms/mister/", support: "supported" },
        { name: "MiSTeX", href: "../platforms/mistex", support: "supported" },
      ],
    },
    {
      name: "Retro Gaming OS",
      platforms: [
        { name: "Batocera", href: "../platforms/batocera/", support: "supported" },
        { name: "RePlayOS", href: "../platforms/replayos", support: "supported" },
      ],
    },
    {
      name: "Handheld and Gaming Linux",
      platforms: [
        { name: "SteamOS", href: "../platforms/steamos", support: "supported" },
        { name: "Bazzite", href: "../platforms/bazzite", support: "supported" },
        { name: "ChimeraOS", href: "../platforms/chimeraos", support: "supported" },
      ],
    },
    {
      name: "Media Center",
      platforms: [
        { name: "LibreELEC", href: "../platforms/libreelec", support: "supported" },
      ],
    },
  ]}
/>

## Configure the reader

Simple Serial uses the `simpleserial` driver. It does not identify a device on its own, so configure the serial port in your [`config.toml`](../core/config.md):

```toml
[[readers.connect]]
driver = 'simpleserial'
path = '/dev/ttyUSB0'
```

On Windows, use the COM port shown in Device Manager:

```toml
[[readers.connect]]
driver = 'simpleserial'
path = 'COM3'
```

The serial connection uses `115200` baud. This is fixed in Core and is not currently configurable.

## Protocol

Each scan is one newline-terminated line. Use real tab characters between `SCAN` and each argument:

```text
SCAN\ttext=<ZapScript or token text>\n
SCAN\tuid=<token id>\ttext=<ZapScript or token text>\n
```

The `text` value is the [ZapScript](../zapscript/index.md) read from the token. It can be a launcher path, a command, or multiple commands separated with `||`.

```text
SCAN\ttext=SNES/Super Mario World\n
SCAN\ttext=**launch.random:Arcade\n
```

`uid` is optional metadata for the physical token. Core can use it for features such as [mappings](../features/mappings.md).

```text
SCAN\tuid=04a1b2c3d4e5f6\ttext=Genesis/Sonic The Hedgehog\n
```

If you only need token text, you can skip the `text=` name. Everything after `SCAN\t` becomes the token text:

```text
SCAN\tGenesis/Sonic 2\n
```

Core ignores blank lines, lines that do not start with `SCAN\t`, and `SCAN\t` lines with no arguments.

## Token removal

Core treats the current token as removed after about 1 second without another scan line. For a held card, tag, or toy, send the same line repeatedly while it remains present, then stop sending when it is removed.

```text
SCAN\ttext=Genesis/Sonic The Hedgehog\n
SCAN\ttext=Genesis/Sonic The Hedgehog\n
SCAN\ttext=Genesis/Sonic The Hedgehog\n
```

## Advanced options

Simple Serial also accepts `removable=`:

```text
SCAN\tremovable=no\ttext=**launch.random:Arcade\n
```

`removable=yes` is the default. Most readers should leave it out.

`removable=no` is not a token persistence option. Core still clears the active Simple Serial token after about 1 second without another scan line.

Use `removable=no` only for one-shot serial devices, such as barcode or QR scanners, when you use [hold mode](../core/config.md#scan-mode) and do not want that scan to start hold-mode media exit handling after the timeout.

## Device behavior

Your device only needs to do a few things:

1. Open the serial port at `115200` baud.
2. Send `SCAN\ttext=...\n` when a token is detected.
3. Keep sending the same line while a physical token should remain active.
4. Stop sending when the token is gone.

Core only sends data from the serial device to Zaparoo. Writing tokens through Simple Serial is not supported.

## Troubleshooting

If scans are not detected, check these first:

- The configured `path` matches the serial device, such as `/dev/ttyUSB0`, `/dev/ttyACM0`, or `COM3`.
- The device is using `115200` baud.
- Each line starts with `SCAN` followed by a tab, not spaces.
- Each line ends with `\n`.
- On Linux, the Core process has permission to open the serial device. Desktop users may need to be in the `dialout` group, then log out and back in.
