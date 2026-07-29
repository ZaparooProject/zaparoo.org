---
description: Show active Zaparoo media on a TTY2OLED serial display.
keywords: [tty2oled zaparoo, mister oled display, zaparoo game display, tty2oled integration]
---

# TTY2OLED Display

TTY2OLED is a serial display device for external OLED screens. [Zaparoo Core](../core/index.md) treats it as a display reader: it does not scan tokens, but it can update the display when the active media changes.

Use this if you already have [TTY2OLED](https://github.com/venice1200/MiSTer_tty2oled) hardware and want Zaparoo to show the current system name or matching artwork.

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

## Enable the reader

The `tty2oled` driver is disabled by default. Enable it in your [`config.toml`](../core/config.md):

```toml
[readers.drivers.tty2oled]
enabled = true
```

Restart Core after changing the config. With auto-detect enabled, Core probes serial ports for a TTY2OLED device.

If auto-detection does not find the display, add a manual `readers.connect` entry with the serial port path:

```toml
[[readers.connect]]
driver = "tty2oled"
path = "/dev/ttyUSB0"
```

On Windows, use the COM port shown in Device Manager:

```toml
[[readers.connect]]
driver = "tty2oled"
path = "COM3"
```

The serial connection uses `115200` baud. This is fixed in Core and is not currently configurable.

## Display behavior

When active media changes, Core sends the media system ID to the display. If matching artwork is already cached, Core sends the picture instead of text. If no cached picture is found, Core shows the system name first, then tries to download matching artwork from the [TTY2OLED pictures repository](https://github.com/venice1200/MiSTer_tty2oled_Pictures).

Pictures are cached in Core's data directory under `assets/tty2oled_pics`. Core looks for TTY2OLED picture formats in this order: `GSC_US`, `XBM_US`, `GSC`, `XBM`, then `XBM_TEXT`.

Writing tokens through TTY2OLED is not supported.

## Hardware notes

TTY2OLED devices usually connect over USB serial. Depending on the board, the operating system may identify the USB serial adapter as CH340, CP210x, FTDI, Arduino, or ESP32 hardware.

On Linux-based platforms, the device usually appears as `/dev/ttyUSB0`, `/dev/ttyACM0`, or a similar path. The Core process needs permission to open that serial device.

On Windows, install the USB serial driver required by your TTY2OLED board if the COM port does not appear in Device Manager.

## Troubleshooting

### Display not detected

Check these first:

1. The `tty2oled` driver is enabled in `config.toml`.
2. Core was restarted after changing `config.toml`.
3. The USB cable supports data, not only power.
4. No other reader or service is already using the same serial port.

If auto-detection still does not work, configure the serial path manually with `[[readers.connect]]`.

### Find the serial port

On Linux-based platforms, list likely serial devices:

```bash
ls /dev/ttyUSB* /dev/ttyACM*
```

If the device exists but Core cannot open it, make sure the Core process has permission to access the serial port. Desktop Linux users may need to be in the `dialout` group, then log out and back in.

On Windows, open Device Manager and look under **Ports (COM & LPT)**.

### Display connects but does not update

Enable `debug_logging = true` in `config.toml`, restart Core, then check the Core logs for TTY2OLED connection and media-change messages.

If text appears but artwork does not, check that the device running Core can reach GitHub and can write to Core's data directory. Core keeps the text display when artwork cannot be downloaded.
