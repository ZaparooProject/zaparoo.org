---
description: "Install Zaparoo on Batocera: launch emulation games from NFC cards, barcodes, and QR codes with step-by-step setup for all Batocera devices."
keywords: [zaparoo batocera, batocera nfc, batocera nfc game launcher, nfc card batocera, batocera zaparoo install]
---

# Batocera

[Batocera](https://batocera.org/) is a software emulation distribution based around EmulationStation, with support for a huge number of systems and devices.

## File Paths

| Item               | Path                                                  |
| ------------------ | ----------------------------------------------------- |
| Config file        | `/userdata/system/.config/zaparoo/config.toml`        |
| Data directory     | `/userdata/system/.local/share/zaparoo`               |
| Log file           | `/userdata/system/.local/share/zaparoo/logs/core.log` |
| Mappings directory | `/userdata/system/.local/share/zaparoo/mappings`      |

Network share paths use `\\BATOCERA\share\system\` prefix instead of `/userdata/system/`.

## Install

### Content Downloader

The easiest way to install is directly from Batocera's Content Downloader:

1. Press `Start` to open the main menu
2. Navigate to `Updates & Downloads` > `Content Downloader`
3. Go to the `SYS` section and find `Zaparoo Core`
4. Press `A` to install

After installation, launch Zaparoo from the Ports system in EmulationStation to access the TUI, or use the [Zaparoo App](/docs/app/) on your phone to manage your setup and write tokens.

### Terminal

Alternatively, install via SSH or in the Batocera terminal (press `F1` to open the file manager, then `F4` to open a terminal):

```bash
curl -fsSL https://zaparoo.org/install.sh | bash
```

This installs Zaparoo via the pacman package manager, sets up the startup service, and adds a Zaparoo entry to the Ports system.

For manual installation methods (Network Share, USB, or SSH), see [Manual Install](./install.md).

## Readers

<ReaderSupport
  groups={[
    {
      name: "NFC/RFID",
      readers: [
        { name: "PN532 USB", href: "../../readers/nfc/pn532-usb", support: "supported", setup: "Auto-detected" },
        { name: "PN532 Module", href: "../../readers/nfc/pn532-module", support: "supported", setup: "Depends on wiring", note: "UART and I2C can auto-detect." },
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

## Supported Launchers

| Launcher         | Notes                                 |
| ---------------- | ------------------------------------- |
| EmulationStation | 150+ systems via Batocera's emulators |
| Kodi             | Movies, TV, Music (Kodi mode only)    |
| Shell Scripts    | Custom `.sh` file execution           |

Kodi integration only works when Batocera is in Kodi mode with the API enabled. See [LibreELEC](../libreelec.md) for API configuration details.

See [Launchers](./launchers.md) for the full list of supported systems and launcher details.
