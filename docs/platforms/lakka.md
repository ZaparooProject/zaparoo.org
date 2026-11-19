---
title: "Launch Games with NFC Cards on Lakka"
sidebar_label: "Lakka"
sidebar_position: 5
description: "Install Zaparoo on Lakka: launch RetroArch games and playlists with NFC cards."
keywords: [zaparoo lakka, lakka nfc, retroarch nfc, lakka game launcher]
---

# Lakka

:::danger[Experimental]
Lakka support is experimental and not listed as a [supported platform](./index.mdx#support-levels) yet. Expect missing features and rough edges.
:::

Zaparoo Core on [Lakka](https://www.lakka.tv/) loads games into the running RetroArch. Release builds are available for x86-64, ARM, and ARM64 devices.

## Install

Open a terminal on the device or connect to it over SSH, then run:

```bash
curl -fsSL https://zaparoo.org/install.sh | sh
```

The installer copies Core to `/storage/zaparoo/zaparoo` and installs a systemd service, so it starts on boot.

Core controls RetroArch through its network commands, so the install turns them on in `/storage/.config/retroarch/retroarch.cfg`. If they were off before, it also adds a firewall rule so only the Lakka device itself can send those commands.

Once Core is running, write your first token from the [Zaparoo App](/docs/app/#first-run) or the built-in web UI at `http://<device-ip>:7497/app/`.

## Uninstall

```bash
/storage/zaparoo/zaparoo -uninstall
```

This stops and removes the service. If the install turned on RetroArch network commands, uninstalling turns them off again and removes the firewall rule. Delete `/storage/zaparoo`, and the config and data directories if you also want to remove your settings.

## File paths

| Item | Path |
| ---- | ---- |
| Config file | `/storage/.config/zaparoo/config.toml` |
| Data directory | `/storage/.local/share/zaparoo` |
| Log file | `/storage/.local/share/zaparoo/logs/core.log` |
| Mappings directory | `/storage/.local/share/zaparoo/mappings` |

## Client security

Lakka requires remote clients to pair. Pair the Zaparoo App, a browser, or another client with the six-digit PIN Core shows when you run `/storage/zaparoo/zaparoo -pair`. The PIN expires after five minutes. See [encryption](../core/config/service.md#encryption) for how paired clients and their permissions work.

## Readers

| Type | Reader | Support | Setup | Notes |
| ---- | ------ | ------- | ----- | ----- |
| NFC/RFID | [PN532 USB](../readers/nfc/pn532-usb.md) | Supported | Auto-detected |  |
| NFC/RFID | [PN532 Module](../readers/nfc/pn532-module.md) | Supported | Depends on wiring | UART can auto-detect. I2C is supported. |
| NFC/RFID | [ACR122U](../readers/nfc/acr122u.md) | Supported | Auto-detected |  |
| NFC/RFID | [USB smart card readers](../readers/nfc/usb-smart-card-readers.md) | Supported | Auto-detected |  |
| NFC/RFID | [RC522](../readers/nfc/rc522.md) | Limited | Via Simple Serial | Requires a microcontroller; not a direct USB reader. |
| Barcode and QR | [Zaparoo App camera](../app/index.md) | Supported | Via Zaparoo App |  |
| Barcode and QR | [RS-232 scanner](../readers/barcode/index.md) | Supported | Manual config |  |
| Optical and Media | [Optical Drive](../readers/optical-drive.md) | Supported | Manual config |  |
| Optical and Media | [External Drive](../readers/external-drive.md) | Supported | Manual enable |  |
| Custom and Virtual | [MQTT Reader](../readers/mqtt.md) | Supported | Manual config |  |
| Custom and Virtual | [Simple Serial](../readers/simple-serial.md) | Supported | Manual config |  |
| Custom and Virtual | [File Reader](../readers/file.md) | Supported | Manual config |  |
| Displays and Integrations | [TTY2OLED](../readers/tty2oled.md) | Supported | Manual enable |  |

Each reader's page has setup steps and troubleshooting. See [readers](../readers/index.md) to compare them.

## Launchers

Core adds RetroArch launchers for supported systems and indexes games from ES-DE-style system folders under `/storage/roms`, such as `nes`, `snes`, and `megadrive`. It also adds a launcher for each RetroArch playlist in `/storage/playlists`, which launches each entry with the core the playlist names.

The RomM launcher downloads games from a RomM server. See [Media Servers](../features/media-servers.md).

Stopping a game closes it and leaves the RetroArch menu open. The other RetroArch [launcher controls](../features/launchers.md#launcher-controls) are available, such as save states, pause, and disc swapping.

[Input commands](../zapscript/input.md) are accepted but nothing is typed.
