---
title: "Launch Games with NFC Cards on muOS"
sidebar_label: "muOS"
sidebar_position: 5
slug: /platforms/muos
description: "Install Zaparoo on muOS: launch games with NFC cards on muOS handhelds."
keywords: [zaparoo muos, muos nfc, muos game launcher, zaparoo handheld]
---

# muOS

:::danger[Experimental]
muOS support is experimental and not listed as a [supported platform](../index.mdx#support-levels) yet. Expect missing features and rough edges.
:::

Zaparoo Core on [muOS](https://muos.dev/) launches games through muOS's own content loader. Release builds are available for ARM64 devices.

## Install

Open a terminal on the device or connect to it over SSH, then run:

```bash
curl -fsSL https://zaparoo.org/install.sh | sh
```

The installer copies Core to `/mnt/mmc/MUOS/zaparoo/zaparoo`, adds a muOS user init script, and starts Core.

muOS only runs user init scripts when they are turned on. To start Core on boot, open **Configuration**, highlight **General**, press X for **Advanced**, and turn on **User Init Scripts**.

Once Core is running, write your first token from the [Zaparoo App](/docs/app/#first-run) or the built-in web UI at `http://<device-ip>:7497/app/`.

## Uninstall

```bash
/mnt/mmc/MUOS/zaparoo/zaparoo -uninstall
```

This stops Core and removes the init script. Delete `/mnt/mmc/MUOS/zaparoo` if you also want to remove your settings and data.

## File paths

| Item | Path |
| ---- | ---- |
| Config file | `/mnt/mmc/MUOS/zaparoo/config.toml` |
| Data directory | `/mnt/mmc/MUOS/zaparoo` |
| Log file | `/mnt/mmc/MUOS/zaparoo/logs/core.log` |
| Mappings directory | `/mnt/mmc/MUOS/zaparoo/mappings` |

## Client security

muOS requires remote clients to pair. Pair the Zaparoo App, a browser, or another client with the six-digit PIN Core shows when you run `/mnt/mmc/MUOS/zaparoo/zaparoo -pair`. The PIN expires after five minutes. See [encryption](../../core/config/service.md#encryption) for how paired clients and their permissions work.

## Readers

| Type | Reader | Support | Setup | Notes |
| ---- | ------ | ------- | ----- | ----- |
| NFC/RFID | [PN532 USB](../../readers/nfc/pn532-usb.md) | Supported | Auto-detected |  |
| NFC/RFID | [PN532 Module](../../readers/nfc/pn532-module.md) | Supported | Depends on wiring | UART can auto-detect. I2C is supported. |
| NFC/RFID | [ACR122U](../../readers/nfc/acr122u.md) | Supported | Auto-detected |  |
| NFC/RFID | [USB smart card readers](../../readers/nfc/usb-smart-card-readers.md) | Supported | Auto-detected |  |
| NFC/RFID | [RC522](../../readers/nfc/rc522.md) | Limited | Via Simple Serial | Requires a microcontroller; not a direct USB reader. |
| Barcode and QR | [Zaparoo App camera](../../app/index.md) | Supported | Via Zaparoo App |  |
| Barcode and QR | [RS-232 scanner](../../readers/barcode/index.md) | Supported | Manual config |  |
| Optical and Media | [Optical Drive](../../readers/optical-drive.md) | Supported | Manual config |  |
| Optical and Media | [External Drive](../../readers/external-drive.md) | Supported | Manual enable |  |
| Custom and Virtual | [MQTT Reader](../../readers/mqtt.md) | Supported | Manual config |  |
| Custom and Virtual | [Simple Serial](../../readers/simple-serial.md) | Supported | Manual config |  |
| Custom and Virtual | [File Reader](../../readers/file.md) | Supported | Manual config |  |
| Displays and Integrations | [TTY2OLED](../../readers/tty2oled.md) | Supported | Manual enable |  |

Each reader's page has setup steps and troubleshooting. See [readers](../../readers/index.md) to compare them.

## Launchers

Core adds a launcher for each system in your `ROMS` folders, using the core muOS has assigned to each folder. It indexes the `ROMS` folder on a USB drive, the second SD card, and the main SD card. Games launch through muOS's content loader.

[Input commands](../../zapscript/input.md) type on a virtual keyboard. The virtual gamepad is off by default; turn it on with [`gamepad_enabled`](../../core/config/media.md#gamepad_enabled).

Shell scripts can also be launched. Add them to the [`allow_file`](../../core/config/launchers.md#allow_file) list in `config.toml`.
