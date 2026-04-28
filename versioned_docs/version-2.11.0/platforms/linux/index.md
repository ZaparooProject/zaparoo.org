---
description: "Install Zaparoo on Linux: desktop integration with Steam game launching support. Foundation for SteamOS, Bazzite, ChimeraOS, and other Linux platforms."
keywords: [zaparoo linux, linux nfc game launcher, zaparoo raspberry pi, zaparoo ubuntu, linux nfc reader]
---

# Linux

Zaparoo Core on Linux provides desktop integration with support for Steam game launching. This platform serves as the foundation for other Linux-based platforms.

## File Paths

| Item               | Path                                   |
| ------------------ | -------------------------------------- |
| Config file        | `~/.config/zaparoo/config.toml`        |
| Data directory     | `~/.local/share/zaparoo`               |
| Log file           | `~/.local/share/zaparoo/logs/core.log` |
| Mappings directory | `~/.local/share/zaparoo/mappings`      |

Where `~` is the home directory of the current user.

## Install

Open a terminal and run:

```bash
curl -fsSL https://zaparoo.org/install.sh | bash
```

This installs all necessary components and sets up the service to run on startup. Once running, use the [Zaparoo App](/docs/app/) on your phone or the built-in web UI to manage your setup and write tokens.

For manual component-based installation, see [Manual Install](./install.md).

## Readers

<ReaderSupport
  groups={[
    {
      name: "NFC/RFID",
      readers: [
        { name: "PN532 USB", href: "../../readers/nfc/pn532-usb", support: "supported", setup: "Auto-detected" },
        { name: "PN532 Module", href: "../../readers/nfc/pn532-module", support: "supported", setup: "Depends on wiring", note: "UART can auto-detect. I2C is supported." },
        { name: "ACR122U", href: "../../readers/nfc/acr122u", support: "supported", setup: "Auto-detected", note: "Uses libnfc: LED and beeper do not work, and some clone variants are incompatible." },
        { name: "RC522", href: "../../readers/nfc/rc522", support: "limited", setup: "Via Simple Serial", note: "Requires a microcontroller; not a direct USB reader." },
      ],
    },
    {
      name: "Barcode and QR",
      readers: [
        { name: "App/Camera Scanner", href: "../../app/", support: "supported", setup: "Via Zaparoo App" },
        { name: "RS232 Scanner", href: "../../readers/barcode/rs232", support: "supported", setup: "Manual config" },
      ],
    },
    {
      name: "Optical and Media",
      readers: [
        { name: "Optical Drive", href: "../../readers/optical-drive", support: "supported", setup: "Manual config" },
        { name: "External Drive", href: "../../readers/external-drive", support: "supported", setup: "Manual enable" },
      ],
    },
    {
      name: "Custom and Virtual",
      readers: [
        { name: "MQTT Reader", href: "../../readers/mqtt", support: "supported", setup: "Manual config" },
        { name: "Simple Serial", href: "../../readers/simple-serial", support: "supported", setup: "Manual config" },
        { name: "File Reader", href: "../../readers/file", support: "supported", setup: "Manual config" },
      ],
    },
    {
      name: "Displays and Integrations",
      readers: [
        { name: "TTY2OLED", href: "../../readers/tty2oled", support: "supported", setup: "Manual enable" },
      ],
    },
  ]}
/>

## Launchers

| Launcher | Description |
|----------|-------------|
| Steam | Steam games and non-Steam shortcuts |
| Kodi | Movies, TV, Music (requires Kodi API) |
| Web Browser | Opens URLs in default browser |
| Shell Scripts | Custom `.sh` execution (allowlist required) |

See [Launchers](./launchers.md) for full details and configuration.
