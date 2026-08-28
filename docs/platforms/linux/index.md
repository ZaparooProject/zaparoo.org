---
description: "Install Zaparoo on Linux with Steam, Lutris, Heroic, RetroArch, media, and desktop launcher support."
keywords: [zaparoo linux, linux nfc game launcher, zaparoo lutris, zaparoo heroic, zaparoo retroarch, linux nfc reader]
---

# Linux

Zaparoo Core on Linux provides desktop integration with support for Steam, Lutris, Heroic, and RetroArch game launching. This platform serves as the foundation for other Linux-based platforms.

## File Paths

| Item               | Path                                   |
| ------------------ | -------------------------------------- |
| Config file        | `~/.config/zaparoo/config.toml`        |
| Data directory     | `~/.local/share/zaparoo`               |
| Log file           | `~/.local/share/zaparoo/logs/core.log` |
| Mappings directory | `~/.local/share/zaparoo/mappings`      |

Where `~` is the home directory of the current user.

## Install

Open a terminal and run:

```bash
curl -fsSL https://zaparoo.org/install.sh | bash
```

This installs all necessary components and sets up the service to run on startup. Once running, use the [Zaparoo App](/docs/app/) on your phone or the built-in web UI to manage your setup and write tokens.

For manual component-based installation, see [Manual Install](./install.md).

## Service controls

Zaparoo runs as a systemd user service. Do not add `sudo` to these commands:

```bash
systemctl --user status zaparoo.service
systemctl --user restart zaparoo.service
systemctl --user stop zaparoo.service
systemctl --user start zaparoo.service
```

## Uninstall

See [Uninstalling](./install.md#uninstalling) for the component removal commands and required permissions.

## Readers

| Type | Reader | Support | Setup | Notes |
| ---- | ------ | ------- | ----- | ----- |
| NFC/RFID | [PN532 USB](../../readers/nfc/pn532-usb.md) | Supported | Auto-detected |  |
| NFC/RFID | [PN532 Module](../../readers/nfc/pn532-module.md) | Supported | Depends on wiring | UART can auto-detect. I2C is supported. |
| NFC/RFID | [ACR122U](../../readers/nfc/acr122u.md) | Supported | Auto-detected | Uses libnfc: LED and beeper do not work, and some clone variants are incompatible. |
| NFC/RFID | [RC522](../../readers/nfc/rc522.md) | Limited | Via Simple Serial | Requires a microcontroller; not a direct USB reader. |
| Barcode and QR | [App/Camera Scanner](../../app/index.md) | Supported | Via Zaparoo App |  |
| Barcode and QR | [RS232 Scanner](../../readers/barcode/rs232.md) | Supported | Manual config |  |
| Optical and Media | [Optical Drive](../../readers/optical-drive.md) | Supported | Manual config |  |
| Optical and Media | [External Drive](../../readers/external-drive.md) | Supported | Manual enable |  |
| Custom and Virtual | [MQTT Reader](../../readers/mqtt.md) | Supported | Manual config |  |
| Custom and Virtual | [Simple Serial](../../readers/simple-serial.md) | Supported | Manual config |  |
| Custom and Virtual | [File Reader](../../readers/file.md) | Supported | Manual config |  |
| Displays and Integrations | [TTY2OLED](../../readers/tty2oled.md) | Supported | Manual enable |  |

Each reader's page has setup steps and troubleshooting. See [readers](../../readers/index.md) to compare them, or the [setup guide](/start/) to pick one for your setup.

## Launchers

| Launcher | Description |
|----------|-------------|
| Steam | Steam games and non-Steam shortcuts |
| Lutris | Installed Lutris games from native or Flatpak library data |
| Heroic | Installed Epic Games and GOG titles managed by Heroic |
| RetroArch | Games through the RetroArch Flatpak, with built-in core mappings and controls |
| Kodi | Movies, TV, Music (requires Kodi API) |
| Web Browser | Opens URLs in default browser |
| Shell Scripts | Custom `.sh` execution (allowlist required) |

See [Launchers](./launchers.md) for full details and configuration.
