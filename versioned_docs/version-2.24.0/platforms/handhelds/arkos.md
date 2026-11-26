---
title: "Launch Games with NFC Cards on ArkOS"
sidebar_label: "ArkOS"
sidebar_position: 2
slug: /platforms/arkos
description: "Install Zaparoo on ArkOS and dArkOS: launch EmulationStation systems with NFC cards on ArkOS handhelds."
keywords: [zaparoo arkos, zaparoo darkos, arkos nfc, arkos game launcher]
---

# ArkOS

:::danger[Experimental]
ArkOS support is experimental and not listed as a [supported platform](../index.mdx#support-levels) yet. Expect missing features and rough edges.
:::

Zaparoo Core on [ArkOS](https://github.com/christianhaitian/arkos) and dArkOS launches games with the same commands EmulationStation uses. Release builds are available for ARM64 devices.

## Install

Open a terminal on the device or connect to it over SSH, then run:

```bash
curl -fsSL https://zaparoo.org/install.sh | sh
```

The installer copies Core to `/home/ark/.config/zaparoo/zaparoo` and installs a systemd service, so it starts on boot. It asks for your password through `sudo` when you are not root.

Once Core is running, write your first token from the [Zaparoo App](/docs/app/#first-run) or the built-in web UI at `http://<device-ip>:7497/app/`.

## Uninstall

```bash
sudo /home/ark/.config/zaparoo/zaparoo -uninstall
```

This stops and removes the service. Delete `/home/ark/.config/zaparoo` if you also want to remove your settings and data.

## File paths

| Item | Path |
| ---- | ---- |
| Config file | `/home/ark/.config/zaparoo/config.toml` |
| Data directory | `/home/ark/.config/zaparoo` |
| Log file | `/home/ark/.config/zaparoo/logs/core.log` |
| Mappings directory | `/home/ark/.config/zaparoo/mappings` |

## Client security

ArkOS requires remote clients to pair. Pair the Zaparoo App, a browser, or another client with the six-digit PIN Core shows when you run `/home/ark/.config/zaparoo/zaparoo -pair`. The PIN expires after five minutes. See [encryption](../../core/config/service.md#encryption) for how paired clients and their permissions work.

## Readers

| Type | Reader | Support | Setup | Notes |
| ---- | ------ | ------- | ----- | ----- |
| NFC/RFID | [PN532 USB](../../readers/nfc/pn532-usb.md) | Supported | Auto-detected |  |
| NFC/RFID | [PN532 Module](../../readers/nfc/pn532-module.md) | Supported | Depends on wiring | UART can auto-detect. I2C is supported. |
| NFC/RFID | [ACR122U](../../readers/nfc/acr122u.md) | Supported | Auto-detected |  |
| NFC/RFID | [USB smart card readers](../../readers/nfc/usb-smart-card-readers.md) | Supported | Auto-detected |  |
| NFC/RFID | [RC522](../../readers/nfc/rc522.md) | Limited | Via Simple Serial | Requires a microcontroller; not a direct USB reader. |
| Barcode and QR | [Zaparoo App camera](../../app/index.md) | Supported | Via Zaparoo App |  |
| Barcode and QR | [Serial barcode scanner](../../readers/barcode/index.md) | Supported | Manual config |  |
| Optical and Media | [Optical Drive](../../readers/optical-drive.md) | Supported | Manual enable |  |
| Optical and Media | [External Drive](../../readers/external-drive.md) | Supported | Manual enable |  |
| Custom and Virtual | [MQTT Reader](../../readers/mqtt.md) | Supported | Manual config |  |
| Custom and Virtual | [Simple Serial](../../readers/simple-serial.md) | Supported | Manual config |  |
| Custom and Virtual | [File Reader](../../readers/file.md) | Supported | Manual config |  |
| Displays and Integrations | [TTY2OLED](../../readers/tty2oled.md) | Supported | Manual enable |  |

Each reader's page has setup steps and troubleshooting. See [readers](../../readers/index.md) to compare them.

## Launchers

Core adds a launcher for each system in EmulationStation's `es_systems.cfg`, and indexes games from `/roms`, plus `/roms2` when a second SD card is in use. To launch a game, Core closes EmulationStation, runs the game the way EmulationStation would, including per-game emulator and core choices, and brings EmulationStation back when the game exits. Games started from EmulationStation also show as playing in Zaparoo.

The RomM launcher downloads games from a RomM server. See [Media Servers](../../features/media-servers.md).

RetroArch [launcher controls](../../features/launchers.md#launcher-controls), such as save states, need RetroArch's network commands. Core does not change your RetroArch config, so turn them on yourself by setting this line in `/home/ark/.config/retroarch/retroarch.cfg`, and in `/home/ark/.config/retroarch32/retroarch.cfg` for 32-bit cores:

```text
network_cmd_enable = "true"
```

[Input commands](../../zapscript/input.md) are accepted but nothing is typed.

Shell scripts can also be launched. Add them to the [`allow_file`](../../core/config/launchers.md#allow_file) list in `config.toml`.
