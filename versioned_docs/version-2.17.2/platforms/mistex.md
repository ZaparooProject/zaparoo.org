---
sidebar_position: 11
sidebar_class_name: hidden
description: "Install Zaparoo on MiSTeX: identical to MiSTer in functionality, with a different installation method for the MiSTeX hardware."
keywords: [zaparoo mistex, mistex nfc, mistex fpga zaparoo, nfc mistex]
---

# MiSTeX

MiSTeX is fully supported by Zaparoo and closely follows [MiSTer](./mister/index.md). The main differences are installation and the current reader set.

## File paths

| Item               | Path                             |
| ------------------ | -------------------------------- |
| Config file        | `/media/fat/zaparoo/config.toml` |
| Data directory     | `/media/fat/zaparoo`             |
| Log file           | `/tmp/zaparoo/core.log`          |
| Mappings directory | `/media/fat/zaparoo/mappings`    |

The `/media/fat` directory is the top level of the SD card. The `/tmp` directory is deleted when MiSTeX is powered off.

## Install

Download Zaparoo Core for MiSTeX from the [GitHub releases page](https://github.com/ZaparooProject/zaparoo-core/releases/latest) and copy the `zaparoo.sh` file to the `Scripts` folder on your SD card.

Run `zaparoo` from the MiSTeX `Scripts` menu. A prompt will offer to enable Zaparoo as a startup service.

:::warning
Using FileZilla? Enable binary transfer mode per [these steps](https://oryon.net/knowledge-base/article/how-to-change-filezilla-ftp-program-to-binary-transfer/). FileZilla incorrectly detects `zaparoo.sh` as text and will corrupt it.
:::

## Readers

| Type | Reader | Support | Setup | Notes |
| ---- | ------ | ------- | ----- | ----- |
| NFC/RFID | [PN532 USB](../readers/nfc/pn532-usb.md) | Supported | Auto-detected |  |
| NFC/RFID | [PN532 Module](../readers/nfc/pn532-module.md) | Supported | Depends on wiring | UART can auto-detect. I2C is supported. |
| NFC/RFID | [ACR122U](../readers/nfc/acr122u.md) | Supported | Manual enable | Uses libnfc: LED and beeper do not work, and some clone variants are incompatible. |
| NFC/RFID | [RC522](../readers/nfc/rc522.md) | Limited | Via Simple Serial | Requires a microcontroller; not a direct USB reader. |
| Barcode and QR | [Zaparoo App camera](../app/index.md) | Supported | Via Zaparoo App |  |
| Barcode and QR | [RS-232 scanner](../readers/barcode/rs232.md) | Supported | Manual config |  |
| Optical and Media | [Optical Drive](../readers/optical-drive.md) | Not supported | Not available | Not included in the current MiSTeX Core reader set. |
| Optical and Media | [External Drive](../readers/external-drive.md) | Supported | Manual enable |  |
| Custom and Virtual | [MQTT Reader](../readers/mqtt.md) | Supported | Manual config |  |
| Custom and Virtual | [Simple Serial](../readers/simple-serial.md) | Supported | Manual config |  |
| Custom and Virtual | [File Reader](../readers/file.md) | Supported | Manual config |  |
| Displays and Integrations | [TTY2OLED](../readers/tty2oled.md) | Supported | Manual enable |  |

Each reader's page has setup steps and troubleshooting. See [readers](../readers/index.md) to compare them, or the [setup guide](/start/) to pick one for your setup.

## Launchers

All launchers supported by MiSTer are also supported by MiSTeX (as far as MiSTeX itself supports them):

| Launcher      | Notes                                   |
| ------------- | --------------------------------------- |
| FPGA Cores    | 100+ arcade, console, and computer systems |
| MGL Files     | MiSTer Game Loader format               |
| Shell Scripts | Custom `.sh` file execution             |

See [MiSTer Launchers](./mister/launchers.md) for the full list of supported systems.
