---
description: "Install Zaparoo on SteamOS and launch Steam, native emulator, RetroArch, EmuDeck, and RetroDECK games from tokens."
keywords: [zaparoo steamos, zaparoo steam deck, steam deck nfc, nfc steam deck game launcher, steamos nfc reader]
---
# SteamOS

:::warning[Beta]
SteamOS support is currently in beta. Some features may not work as expected.
:::

Zaparoo Core on SteamOS supports launching Steam, native emulator, RetroArch, EmuDeck, and RetroDECK games from your Steam Deck. This page covers install and readers; launcher setup is on [SteamOS launchers](./launchers.md).

## File paths

| Item               | Path                                       |
| ------------------ | ------------------------------------------ |
| Config file        | `/home/deck/.config/zaparoo/config.toml`   |
| Data directory     | `/home/deck/.local/share/zaparoo`          |
| Log file           | `/tmp/zaparoo/core.log`                    |
| Mappings directory | `/home/deck/.local/share/zaparoo/mappings` |

Assuming the default `deck` account.

## Install

In Desktop Mode, open Konsole and run:

```bash
curl -fsSL https://zaparoo.org/install.sh | bash
```

This installs all necessary components and sets up the service to run on startup. Since SteamOS has an immutable root filesystem, the installation is user-local (installed to `~/.local/bin`). Once running, use the [Zaparoo App](/docs/app/) or the built-in web UI to manage your setup and write tokens.

## Uninstall

Remove the installed components, leaving the application binary until last:

```bash
~/.local/bin/zaparoo -uninstall service
~/.local/bin/zaparoo -uninstall desktop
sudo ~/.local/bin/zaparoo -uninstall hardware
~/.local/bin/zaparoo -uninstall application
```

## Readers

| Type | Reader | Support | Setup | Notes |
| ---- | ------ | ------- | ----- | ----- |
| NFC/RFID | [PN532 USB](../../readers/nfc/pn532-usb.md) | Supported | Auto-detected |  |
| NFC/RFID | [PN532 Module](../../readers/nfc/pn532-module.md) | Supported | Depends on wiring | UART can auto-detect. I2C is supported. |
| NFC/RFID | [ACR122U](../../readers/nfc/acr122u.md) | Limited | Auto-detected | Uses libnfc: MIFARE Classic writing is limited, LED and beeper do not work, and some clone variants are incompatible. |
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

| Launcher         | Systems  | Notes                                      |
| ---------------- | -------- | ------------------------------------------ |
| Steam            | PC       | Games and non-Steam shortcuts              |
| Native emulators | Multiple | Direct Flatpak and executable launchers    |
| RetroArch        | Multiple | Flatpak cores with built-in controls       |
| EmuDeck          | Multiple | RetroArch and standalone emulators         |
| RetroDECK        | Multiple | Unified emulator frontend                  |
| Kodi             | Media    | Videos, movies, TV shows, music            |
| Shell Scripts    | Any      | Custom `.sh` file execution                |

Each launcher's detection rules, paths, and configuration are on [SteamOS launchers](./launchers.md).

## Known issues

- Updates require stopping the service first: `sudo systemctl stop zaparoo.service`

## FAQ

**What NFC reader should I use with a Steam Deck?**

Use a [PN532 USB](../../readers/nfc/pn532-usb.md) reader. Plug it into the Steam Deck or a connected USB hub and Core detects it automatically.

**Can Zaparoo launch non-Steam games on the Steam Deck?**

Zaparoo can launch indexed games through supported native emulators, RetroArch, EmuDeck, or RetroDECK. It can also launch anything added to your Steam library, including non-Steam shortcuts.

**Does Zaparoo work in Game Mode?**

Yes. The service runs in the background and launches games from Game Mode. You do not need to switch to Desktop Mode for normal scanning to work.

**Does Zaparoo survive SteamOS updates?**

SteamOS updates can reset the system root, but Zaparoo is installed user-locally and the service should survive updates without needing reinstallation.
