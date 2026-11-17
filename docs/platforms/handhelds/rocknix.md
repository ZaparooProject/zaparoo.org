---
title: "Launch Games with NFC Cards on ROCKNIX"
sidebar_label: "ROCKNIX"
sidebar_position: 6
slug: /platforms/rocknix
description: "Install Zaparoo on ROCKNIX: launch EmulationStation games with NFC cards on ROCKNIX handhelds."
keywords: [zaparoo rocknix, rocknix nfc, rocknix game launcher, zaparoo handheld]
---

# ROCKNIX

:::danger[Experimental]
ROCKNIX support is experimental and not listed as a [supported platform](../index.mdx#support-levels) yet. Expect missing features and rough edges.
:::

Zaparoo Core on [ROCKNIX](https://rocknix.org/) launches games through ROCKNIX's EmulationStation. Release builds are available for x86-64 and ARM64 devices.

## Install

Open a terminal on the device or connect to it over SSH, then run:

```bash
curl -fsSL https://zaparoo.org/install.sh | sh
```

The installer copies Core to `/storage/zaparoo/zaparoo` and installs a systemd service, so it starts on boot.

Once Core is running, write your first token from the [Zaparoo App](/docs/app/#first-run) or the built-in web UI at `http://<device-ip>:7497/app/`.

## Uninstall

```bash
/storage/zaparoo/zaparoo -uninstall
```

This stops and removes the service. Delete `/storage/zaparoo`, and the config and data directories if you also want to remove your settings.

## File paths

| Item | Path |
| ---- | ---- |
| Config file | `/storage/.config/zaparoo/config.toml` |
| Data directory | `/storage/.local/share/zaparoo` |
| Log file | `/storage/.local/share/zaparoo/logs/core.log` |
| Mappings directory | `/storage/.local/share/zaparoo/mappings` |

## Client security

ROCKNIX requires remote clients to pair. Pair the Zaparoo App, a browser, or another client with the six-digit PIN Core shows when you run `/storage/zaparoo/zaparoo -pair`. The PIN expires after five minutes. See [encryption](../../core/config/service.md#encryption) for how paired clients and their permissions work.

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

Core adds a launcher for each system EmulationStation has, and indexes games from `/storage/roms` and any other ROM folders EmulationStation is set up with. Games launch through EmulationStation. Kodi launchers are also added for local video and music files.

Stopping a game is the only [launcher control](../../features/launchers.md#launcher-controls) available.

[Input commands](../../zapscript/input.md) type on a virtual keyboard. The virtual gamepad is off by default; turn it on with [`gamepad_enabled`](../../core/config/media.md#gamepad_enabled).

Shell scripts can also be launched. Add them to the [`allow_file`](../../core/config/launchers.md#allow_file) list in `config.toml`.
