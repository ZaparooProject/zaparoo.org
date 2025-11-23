# TTY2OLED Display

TTY2OLED is a serial display device that shows game information and artwork on external OLED displays. While not a traditional reader that scans tokens, Zaparoo Core treats it as a display "reader" driver that receives game information and displays it visually.

## Overview

The TTY2OLED driver enables [Zaparoo Core](../core/index.md) to communicate with [TTY2OLED](https://github.com/venice1200/MiSTer_tty2oled) hardware, showing:
- Game titles and metadata
- System information
- Artwork and logos
- Custom display layouts

## Hardware Requirements

- TTY2OLED serial display device (typically an OLED screen connected via USB serial)
- USB connection to the host device running Zaparoo Core
- Compatible OLED display (see [TTY2OLED project](https://github.com/venice1200/MiSTer_tty2oled) for supported displays)

## Driver Configuration

### Driver Details

- **Driver ID**: `tty2oled`
- **Platforms**: [All platforms](../platforms/index.md)
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

TTY2OLED is commonly used with [MiSTer FPGA](../platforms/mister.md) systems. The display typically connects via USB and appears as a serial device at `/dev/ttyUSB0` or similar.

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

