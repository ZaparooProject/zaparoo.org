---
title: "Launch Games with NFC Cards on RetroPie"
sidebar_label: "RetroPie"
sidebar_position: 11
description: "Install Zaparoo on RetroPie: launch EmulationStation games with NFC cards on Raspberry Pi and other RetroPie systems."
keywords: [zaparoo retropie, retropie nfc, raspberry pi nfc game launcher, retropie game launcher]
---

# RetroPie

:::danger[Experimental]
RetroPie support is experimental and not listed as a [supported platform](./index.mdx#support-levels) yet. Expect missing features and rough edges.
:::

Zaparoo Core on [RetroPie](https://retropie.org.uk/) launches games through RetroPie's own `runcommand`. Release builds are available for x86-64, ARM, and ARM64 systems.

## Install

Open a terminal on the device or connect to it over SSH, then run:

```bash
curl -fsSL https://zaparoo.org/install.sh | sh
```

Run the installer as the user RetroPie runs as, usually `pi`, not as root. It installs Core to `~/.local/bin/zaparoo`, adds hooks to RetroPie's `autostart.sh`, `runcommand-onstart.sh`, and `runcommand-onend.sh` in `/opt/retropie/configs/all`, and asks for your password through `sudo` to install a systemd service.

Core supports RetroPie set up to boot to EmulationStation from the console. The install stops with an error on a system that starts EmulationStation from a desktop session.

Once Core is running, write your first token from the [Zaparoo App](/docs/app/#first-run) or the built-in web UI at `http://<device-ip>:7497/app/`.

## Uninstall

```bash
~/.local/bin/zaparoo -uninstall
```

This removes the service and the RetroPie hooks. Delete `~/.local/bin/zaparoo`, and the config and data directories if you also want to remove your settings.

## File paths

| Item | Path |
| ---- | ---- |
| Config file | `~/.config/zaparoo/config.toml` |
| Data directory | `~/.local/share/zaparoo` |
| Log file | `~/.local/share/zaparoo/logs/core.log` |
| Mappings directory | `~/.local/share/zaparoo/mappings` |

Where `~` is the home directory of the RetroPie user, usually `pi`.

## Client security

RetroPie requires remote clients to pair. Pair the Zaparoo App, a browser, or another client with the six-digit PIN Core shows when you run `~/.local/bin/zaparoo -pair`. The PIN expires after five minutes. See [encryption](../core/config/service.md#encryption) for how paired clients and their permissions work.

## Readers

| Type | Reader | Support | Setup | Notes |
| ---- | ------ | ------- | ----- | ----- |
| NFC/RFID | [PN532 USB](../readers/nfc/pn532-usb.md) | Supported | Auto-detected |  |
| NFC/RFID | [PN532 Module](../readers/nfc/pn532-module.md) | Supported | Depends on wiring | UART can auto-detect. I2C is supported. |
| NFC/RFID | [ACR122U](../readers/nfc/acr122u.md) | Supported | Auto-detected |  |
| NFC/RFID | [USB smart card readers](../readers/nfc/usb-smart-card-readers.md) | Supported | Auto-detected |  |
| NFC/RFID | [RC522](../readers/nfc/rc522.md) | Limited | Via Simple Serial | Requires a microcontroller; not a direct USB reader. |
| Barcode and QR | [Zaparoo App camera](../app/index.md) | Supported | Via Zaparoo App |  |
| Barcode and QR | [Serial barcode scanner](../readers/barcode/index.md) | Supported | Manual config |  |
| Optical and Media | [Optical Drive](../readers/optical-drive.md) | Supported | Manual enable |  |
| Optical and Media | [External Drive](../readers/external-drive.md) | Supported | Manual enable |  |
| Custom and Virtual | [MQTT Reader](../readers/mqtt.md) | Supported | Manual config |  |
| Custom and Virtual | [Simple Serial](../readers/simple-serial.md) | Supported | Manual config |  |
| Custom and Virtual | [File Reader](../readers/file.md) | Supported | Manual config |  |
| Displays and Integrations | [TTY2OLED](../readers/tty2oled.md) | Supported | Manual enable |  |

Each reader's page has setup steps and troubleshooting. See [readers](../readers/index.md) to compare them.

## Launchers

Core adds a launcher for each RetroPie system and indexes games from `~/RetroPie/roms`. To launch a game, Core closes EmulationStation, runs the game through `runcommand` the same way EmulationStation would, and brings EmulationStation back when the game exits. Games started from EmulationStation also show as playing in Zaparoo.

The RomM launcher downloads games from a RomM server. See [Media Servers](../features/media-servers.md).

Stopping a game is the only [launcher control](../features/launchers.md#launcher-controls) available.

[Input commands](../zapscript/input.md) are accepted but nothing is typed.

Shell scripts can also be launched. Add them to the [`allow_file`](../core/config/launchers.md#allow_file) list in `config.toml`.
