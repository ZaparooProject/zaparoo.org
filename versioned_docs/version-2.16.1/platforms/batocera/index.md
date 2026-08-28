---
description: "Install Zaparoo on Batocera: launch emulation games from NFC cards, barcodes, and QR codes with step-by-step setup for all Batocera devices."
keywords: [zaparoo batocera, batocera nfc, batocera nfc game launcher, nfc card batocera, batocera zaparoo install]
---

# Batocera

[Batocera](https://batocera.org/) is a software emulation distribution based around EmulationStation, with support for a huge number of systems and devices.

## File paths

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

## Uninstall

Uninstall Zaparoo Core from Batocera's Content Downloader, the same place it was installed. Batocera stops and disables the `zaparoo_service` service and removes the package files. Your configuration and data are left in place; see the file paths above if you want to delete them too.

## Card-only cabinets

For a child-friendly or arcade-style setup with no visible game library, see the [Card-Only Batocera Cabinet](../../community-projects/batocera-card-only.md) community recipe. It shows a single **Insert Game Card** system while Zaparoo continues launching hidden games from physical tokens.

## Readers

| Type | Reader | Support | Setup | Notes |
| ---- | ------ | ------- | ----- | ----- |
| NFC/RFID | [PN532 USB](../../readers/nfc/pn532-usb.md) | Supported | Auto-detected |  |
| NFC/RFID | [PN532 Module](../../readers/nfc/pn532-module.md) | Supported | Depends on wiring | UART can auto-detect. I2C is supported. |
| NFC/RFID | [ACR122U](../../readers/nfc/acr122u.md) | Supported | Auto-detected | Uses libnfc: LED and beeper do not work, and some clone variants are incompatible. |
| NFC/RFID | [RC522](../../readers/nfc/rc522.md) | Limited | Via Simple Serial | Requires a microcontroller; not a direct USB reader. |
| Barcode and QR | [Zaparoo App camera](../../app/index.md) | Supported | Via Zaparoo App |  |
| Barcode and QR | [RS-232 scanner](../../readers/barcode/rs232.md) | Supported | Manual config |  |
| Optical and Media | [Optical Drive](../../readers/optical-drive.md) | Supported | Manual config |  |
| Optical and Media | [External Drive](../../readers/external-drive.md) | Supported | Manual enable |  |
| Custom and Virtual | [MQTT Reader](../../readers/mqtt.md) | Supported | Manual config |  |
| Custom and Virtual | [Simple Serial](../../readers/simple-serial.md) | Supported | Manual config |  |
| Custom and Virtual | [File Reader](../../readers/file.md) | Supported | Manual config |  |
| Displays and Integrations | [TTY2OLED](../../readers/tty2oled.md) | Supported | Manual enable |  |

Each reader's page has setup steps and troubleshooting. See [readers](../../readers/index.md) to compare them, or the [setup guide](/start/) to pick one for your setup.

## Launchers

| Launcher         | Notes                                 |
| ---------------- | ------------------------------------- |
| EmulationStation | 150+ systems via Batocera's emulators |
| Kodi             | Movies, TV, Music (Kodi mode only)    |
| Shell Scripts    | Custom `.sh` file execution           |

Kodi integration only works when Batocera is in Kodi mode with the API enabled. See [LibreELEC](../libreelec.md) for API configuration details.

See [Launchers](./launchers.md) for the full list of supported systems and launcher details.

## Troubleshooting

**Zaparoo is not running.** Check the service from a terminal (`F1`, then `F4`): `batocera-services status zaparoo_service`, and start it with `batocera-services start zaparoo_service`.

**Zaparoo is missing from Ports.** The Ports entry comes with the package. Reinstall Zaparoo Core from the Content Downloader.

**A reader is not detected.** Check the reader's page under [readers](../../readers/index.md) for the exact driver and any manual configuration.
