---
title: "Launch Games with NFC Cards on Armada"
sidebar_label: "Armada"
sidebar_position: 3
slug: /platforms/armada
description: "Install Zaparoo on Armada: launch Steam, Heroic, Moonlight, and emulator games with NFC cards on Armada ARM handhelds."
keywords: [zaparoo armada, armada nfc, armada game launcher, zaparoo arm handheld]
---

# Armada

:::danger[Experimental]
Armada support is experimental and not listed as a [supported platform](../index.mdx#support-levels) yet. Expect missing features and rough edges.
:::

Zaparoo Core on Armada supports launching games from Steam, Heroic, standalone emulators, and Moonlight, plus web pages and shell scripts. Release builds are available for ARM64 devices.

## Install

Open a terminal on the device or connect to it over SSH, then run:

```bash
curl -fsSL https://zaparoo.org/install.sh | sh
```

Since Armada has an immutable root filesystem, the installation is user-local (installed to `~/.local/bin`), and a service starts Core on login.

Once Core is running, write your first token from the [Zaparoo App](/docs/app/#first-run) or the built-in web UI at `http://<device-ip>:7497/app/`.

## Uninstall

Remove the installed components, leaving the application binary until last:

```bash
~/.local/bin/zaparoo -uninstall service
~/.local/bin/zaparoo -uninstall desktop
sudo ~/.local/bin/zaparoo -uninstall hardware
~/.local/bin/zaparoo -uninstall application
```

## File paths

| Item | Path |
| ---- | ---- |
| Config file | `~/.config/zaparoo/config.toml` |
| Data directory | `~/.local/share/zaparoo` |
| Log file | `~/.local/share/zaparoo/logs/core.log` |
| Mappings directory | `~/.local/share/zaparoo/mappings` |

Where `~` is the home directory of the current user.

## Client security

Armada requires remote clients to pair. Pair the Zaparoo App, a browser, or another client with the six-digit PIN Core shows when you run `~/.local/bin/zaparoo -pair`. The PIN expires after five minutes. See [encryption](../../core/config/service.md#encryption) for how paired clients and their permissions work.

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

| Launcher | Systems | Notes |
| -------- | ------- | ----- |
| Steam | PC | Native Steam client |
| Heroic | PC | Epic Games and GOG titles |
| Standalone emulators | Multiple | Installed native, AppImage, or Flatpak emulators |
| Moonlight | PC | Streamed apps through Moonlight |
| Web Browser | N/A | Opens URLs in the default browser |
| Shell Scripts | Any | Custom `.sh` file execution |

Standalone emulators are the same as on [Linux](../linux/launchers.md#standalone-emulators). They scan ES-DE-style folders under `~/ROMs`, or under each [`launchers.index_root`](../../core/config/launchers.md#index_root) when you set one.

[Input commands](../../zapscript/input.md) are accepted but nothing is typed.
