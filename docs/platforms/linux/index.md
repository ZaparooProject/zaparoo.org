---
description: "Install Zaparoo on Linux with Steam, Lutris, Heroic, RetroArch, standalone emulators, EmuDeck, RetroDECK, media, and desktop launcher support."
keywords: [zaparoo linux, linux nfc game launcher, zaparoo lutris, zaparoo heroic, zaparoo retroarch, linux emulator launcher, zaparoo emudeck, linux nfc reader]
---

# Linux

Zaparoo Core on Linux provides desktop integration with support for Steam, Lutris, Heroic, RetroArch, standalone emulators, EmuDeck, RetroDECK, Bottles, Faugus, and Moonlight launching. This platform serves as the foundation for other Linux-based platforms.

## File paths

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

The same script has a few more modes:

```bash
# Show the installed version and service health
curl -fsSL https://zaparoo.org/install.sh | bash -s -- status

# Remove Core while keeping your configuration and data
curl -fsSL https://zaparoo.org/install.sh | bash -s -- uninstall

# Install beta builds instead of stable releases
curl -fsSL https://zaparoo.org/install.sh | bash -s -- --channel beta
```

After installation, Core checks for new releases and can update itself in place. See [Core updates](../../core/updates.md).

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

## Client security

Linux requires encrypted connections from remote clients. Pair a phone, browser, or other client with the six-digit PIN that Core shows under **Settings > Clients > Pair** in the terminal UI, or run `zaparoo -pair`. The PIN expires after five minutes. See [encryption](../../core/config.md#encryption) for how paired clients and their permissions work.

## Readers

| Type | Reader | Support | Setup | Notes |
| ---- | ------ | ------- | ----- | ----- |
| NFC/RFID | [PN532 USB](../../readers/nfc/pn532-usb.md) | Supported | Auto-detected |  |
| NFC/RFID | [PN532 Module](../../readers/nfc/pn532-module.md) | Supported | Depends on wiring | UART can auto-detect. I2C is supported. |
| NFC/RFID | [ACR122U](../../readers/nfc/acr122u.md) | Supported | Manual enable | Uses libnfc: LED and beeper do not work, and some clone variants are incompatible. |
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

| Launcher | Description |
|----------|-------------|
| Steam | Steam games and non-Steam shortcuts |
| Lutris | Installed Lutris games from native or Flatpak library data |
| Heroic | Installed Epic Games and GOG titles managed by Heroic |
| RetroArch | Games through the RetroArch Flatpak, with built-in core mappings and controls |
| Standalone emulators | Installed emulators found on `PATH`, in `~/.local/bin`, as AppImages in `~/Applications`, or as Flatpaks |
| EmuDeck | Systems from an EmuDeck installation |
| RetroDECK | Systems from a RetroDECK installation |
| Bottles | Programs from Bottles |
| Faugus | Games from Faugus Launcher |
| Moonlight | Streamed apps through Moonlight |
| Kodi | Movies, TV, Music (requires Kodi API) |
| Web Browser | Opens URLs in default browser |
| Shell Scripts | Custom `.sh` execution (allowlist required) |

See [Launchers](./launchers.md) for full details and configuration.

## Troubleshooting

**`systemctl` says the unit is not found.** Zaparoo runs as a user service, so use `systemctl --user`, not `sudo systemctl`. If it is still missing, run the install command again.

**Permission denied opening the reader's serial port.** Add your user to the `dialout` group (`sudo usermod -a -G dialout $USER`), then log out and back in.

**A reader is not detected.** Check the reader's page under [readers](../../readers/index.md) for the driver and any manual configuration, and turn on `debug_logging` in `config.toml` to see what Core finds.

**An emulator launcher is missing.** Core only registers emulators it finds installed. Install the emulator, natively or as a Flatpak, then reload Core and update the media database.
