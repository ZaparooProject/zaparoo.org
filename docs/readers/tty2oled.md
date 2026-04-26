---
description: Integrate Zaparoo with TTY2OLED to show game titles and artwork on an external OLED display connected to MiSTer FPGA.
keywords: [tty2oled zaparoo, mister oled display, zaparoo game display, tty2oled integration]
---

# TTY2OLED Display

TTY2OLED is a serial display device that shows game information and artwork on external OLED displays. While not a traditional reader that scans tokens, Zaparoo Core treats it as a display "reader" driver that receives game information and displays it visually.

## Overview

The TTY2OLED driver enables [Zaparoo Core](../core/index.md) to communicate with [TTY2OLED](https://github.com/venice1200/MiSTer_tty2oled) hardware, showing:
- Game titles and metadata
- System information
- Artwork and logos
- Custom display layouts

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
        { name: "ReplayOS", href: "../platforms/replayos", support: "supported" },
        { name: "Recalbox", href: "../platforms/recalbox", support: "supported" },
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

## Hardware Requirements

- TTY2OLED serial display device (typically an OLED screen connected via USB serial)
- USB connection to the host device running Zaparoo Core
- Compatible OLED display (see [TTY2OLED project](https://github.com/venice1200/MiSTer_tty2oled) for supported displays)

## Driver Configuration

### Driver Details

- **Driver ID**: `tty2oled`
- **Platforms**: Current Zaparoo Core platforms
- **Enabled by default**: No
- **Auto-detect**: Yes

:::warning
This driver is **disabled by default** and must be explicitly enabled in your configuration file.
:::

### Enabling the Driver

To enable TTY2OLED support, add the following to your [`config.toml`](../core/config.md) file:

```toml
[readers.drivers.tty2oled]
enabled = true
```

### Manual Connection

If auto-detection doesn't work, you can manually specify the serial device:

```toml
[[readers.connect]]
driver = 'tty2oled'
path = '/dev/ttyUSB0'  # Linux/MiSTer path
```

On Windows, the path would typically be:
```toml
[[readers.connect]]
driver = 'tty2oled'
path = 'COM3'  # Windows COM port
```

## Platform-Specific Notes

### MiSTer

TTY2OLED is commonly used with [MiSTer FPGA](../platforms/mister/index.md) systems. The display typically connects via USB and appears as a serial device at `/dev/ttyUSB0` or similar.

### Linux

On Linux-based platforms, ensure your user has permission to access the serial device:
```bash
sudo usermod -a -G dialout $USER
```

You may need to log out and back in for the permission change to take effect.

### Windows

Install the appropriate USB serial driver for your TTY2OLED device (typically CH340 or CP2102 drivers).

## Troubleshooting

### Display Not Working

1. **Verify the driver is enabled** in your `config.toml`
2. **Check the serial port path** - use `ls /dev/tty*` on Linux or Device Manager on Windows
3. **Ensure proper permissions** on Linux (dialout group membership)
4. **Check USB cable** - some cables are power-only and don't support data

### Finding the Serial Port

**Linux/MiSTer:**
```bash
ls /dev/ttyUSB*
# or
dmesg | grep tty
```

**Windows:**
Open Device Manager and look under "Ports (COM & LPT)"
