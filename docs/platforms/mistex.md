---
description: "Install Zaparoo on MiSTeX: identical to MiSTer in functionality, with a different installation method for the MiSTeX hardware."
keywords: [zaparoo mistex, mistex nfc, mistex fpga zaparoo, nfc mistex]
---

# MiSTeX

MiSTeX is fully supported by Zaparoo and closely follows [MiSTer](./mister/index.md). The main differences are installation and the current reader set.

## File Paths

| Item               | Path                             |
| ------------------ | -------------------------------- |
| Config file        | `/media/fat/zaparoo/config.toml` |
| Data directory     | `/media/fat/zaparoo`             |
| Log file           | `/tmp/zaparoo/core.log`          |
| Mappings directory | `/media/fat/zaparoo/mappings`    |

The `/media/fat` directory is the top level of the SD card. The `/tmp` directory is deleted when MiSTeX is powered off.

## Install

Download Zaparoo Core for MiSTeX from the [Downloads page](/downloads/) and copy the `zaparoo.sh` file to the `Scripts` folder on your SD card.

Run `zaparoo` from the MiSTeX `Scripts` menu. A prompt will offer to enable Zaparoo as a startup service.

:::warning
Using FileZilla? Enable binary transfer mode per [these steps](https://oryon.net/knowledge-base/article/how-to-change-filezilla-ftp-program-to-binary-transfer/). FileZilla incorrectly detects `zaparoo.sh` as text and will corrupt it.
:::

## Readers

<ReaderSupport
  groups={[
    {
      name: "NFC/RFID",
      readers: [
        { name: "PN532 USB", href: "../readers/nfc/pn532-usb", support: "supported", setup: "Auto-detected" },
        { name: "PN532 Module", href: "../readers/nfc/pn532-module", support: "supported", setup: "Depends on wiring", note: "UART and I2C can auto-detect." },
        { name: "ACR122U", href: "../readers/nfc/acr122u", support: "supported", setup: "Auto-detected", note: "Uses libnfc: LED and beeper do not work, and some clone variants are incompatible." },
        { name: "RC522", href: "../readers/nfc/rc522", support: "limited", setup: "Via Simple Serial", note: "Requires a microcontroller; not a direct USB reader." },
      ],
    },
    {
      name: "Barcode and QR",
      readers: [
        { name: "App/Camera Scanner", href: "../app/", support: "supported", setup: "Via Zaparoo App" },
        { name: "RS232 Scanner", href: "../readers/barcode/rs232", support: "supported", setup: "Manual config" },
      ],
    },
    {
      name: "Optical and Media",
      readers: [
        { name: "Optical Drive", href: "../readers/optical-drive", support: "unsupported", setup: "Not available", note: "Not included in the current MiSTeX Core reader set." },
        { name: "External Drive", href: "../readers/external-drive", support: "supported", setup: "Manual enable" },
      ],
    },
    {
      name: "Custom and Virtual",
      readers: [
        { name: "MQTT Reader", href: "../readers/mqtt", support: "supported", setup: "Manual config" },
        { name: "Simple Serial", href: "../readers/simple-serial", support: "supported", setup: "Manual config" },
        { name: "File Reader", href: "../readers/file", support: "supported", setup: "Manual config" },
      ],
    },
    {
      name: "Displays and Integrations",
      readers: [
        { name: "TTY2OLED", href: "../readers/tty2oled", support: "supported", setup: "Manual enable" },
      ],
    },
  ]}
/>

## Supported Launchers

All launchers supported by MiSTer are also supported by MiSTeX (as far as MiSTeX itself supports them):

| Launcher      | Notes                                   |
| ------------- | --------------------------------------- |
| FPGA Cores    | 100+ arcade, console, and computer systems |
| MGL Files     | MiSTer Game Loader format               |
| Shell Scripts | Custom `.sh` file execution             |

See [MiSTer Launchers](./mister/launchers.md) for the full list of supported systems.
