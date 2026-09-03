---
description: "Install Zaparoo on SteamOS and launch Steam, native emulator, RetroArch, EmuDeck, and RetroDECK games from tokens."
keywords: [zaparoo steamos, zaparoo steam deck, steam deck nfc, nfc steam deck game launcher, steamos nfc reader]
---
# SteamOS

Zaparoo Core runs in the background on SteamOS and launches Steam games, native emulators, RetroArch, EmuDeck, and RetroDECK from physical tokens. In Gaming Mode, emulator launches run through Zaparoo Runtime, a permanent Steam shortcut the installer adds so emulators can start as Steam-owned sessions. Steam games launch directly through Steam. This page covers install, security, backups, and readers; launcher setup is on [SteamOS launchers](./launchers.md) and the Quick Access Menu plugin on [Decky Loader plugin](./decky.md).

## File paths

| Item               | Path                                             |
| ------------------ | ------------------------------------------------ |
| Application        | `/home/deck/.local/bin/zaparoo`                   |
| Config file        | `/home/deck/.config/zaparoo/config.toml`          |
| Data directory     | `/home/deck/.local/share/zaparoo`                 |
| Log file           | `/home/deck/.local/share/zaparoo/logs/core.log`   |
| Mappings directory | `/home/deck/.local/share/zaparoo/mappings`        |
| User service       | `/home/deck/.config/systemd/user/zaparoo.service` |

Assuming the default `deck` account.

## Install

In Desktop Mode:

1. <a href="https://zaparoo.org/install-zaparoo.desktop" download>Download the Zaparoo installer</a>.
2. Open the **Downloads** folder in Dolphin.
3. Double-click **install-zaparoo.desktop**, then select **Execute**.
4. Follow the installer prompts.

The desktop installer provides guided dialogs and progress while it runs the same verified install script described below.

If you prefer the terminal, open Konsole and run:

```bash
curl -fsSL https://zaparoo.org/install.sh | bash
```

The installer selects the latest stable SteamOS release, verifies its signed checksum, and installs Core under your home directory. It also:

- Installs and starts the `zaparoo.service` systemd user service
- Adds the permanent **Zaparoo Runtime** shortcut to Steam
- Offers to add a Desktop Mode shortcut
- Offers to install NFC reader support with `sudo`
- Offers to install the [Decky Loader plugin](./decky.md) when Decky Loader is present
- Verifies Core's API, platform, and installed version before reporting success
- Removes a failed fresh installation if setup or health verification fails

If your Steam Deck has no administrator (sudo) password, the installer offers to set the temporary password `Zaparoo!` for the steps that need it and removes it when it finishes. It warns you if it could not remove it.

SteamOS has an immutable system partition, so application, configuration, and data files remain under `/home/deck`. If the installer adds the Zaparoo Runtime shortcut for the first time, restart Steam or reboot the Steam Deck once so it appears.

Once Core is running, use the [Zaparoo App](/docs/app/), the optional [Decky Loader plugin](./decky.md), or the built-in web UI at `http://127.0.0.1:7497/app/`.

### Installer commands

Rerun the standard install command to upgrade an older Core release to the latest stable version. The installer preserves the previous binary and restores it if the upgrade fails.

```bash
# Install or upgrade Core
curl -fsSL https://zaparoo.org/install.sh | bash

# Show installed version, service health, and Zaparoo Runtime status
curl -fsSL https://zaparoo.org/install.sh | bash -s -- status

# Repair service, application metadata, desktop shortcut, and Zaparoo Runtime integration
curl -fsSL https://zaparoo.org/install.sh | bash -s -- repair

# Remove Core while preserving user data
curl -fsSL https://zaparoo.org/install.sh | bash -s -- uninstall

# Install beta builds, accept defaults without prompts, or preview changes
curl -fsSL https://zaparoo.org/install.sh | bash -s -- --channel beta
curl -fsSL https://zaparoo.org/install.sh | bash -s -- -y
curl -fsSL https://zaparoo.org/install.sh | bash -s -- --dry-run
```

Once installed, Core also checks for new releases on its own and can update itself in place; see [Core updates](../../core/updates.md).

### Service commands

SteamOS uses a user service, so do not add `sudo` to these commands:

```bash
systemctl --user status zaparoo.service
systemctl --user restart zaparoo.service
systemctl --user stop zaparoo.service
systemctl --user start zaparoo.service
```

## Uninstall

Run the installer in uninstall mode:

```bash
curl -fsSL https://zaparoo.org/install.sh | bash -s -- uninstall
```

The uninstaller removes Core, its user service, desktop integration, and Zaparoo Runtime files. It asks before removing system-wide NFC reader support. Configuration, databases, mappings, indexed media, and local backup files are preserved under `/home/deck/.config/zaparoo` and `/home/deck/.local/share/zaparoo`.

## Client security

SteamOS requires encrypted remote client connections.

Pair a phone, browser, or other Core client with a temporary six-digit PIN. You can start pairing in any of these ways:

- In the Decky plugin, select **Pair client**.
- In the terminal UI, run `~/.local/bin/zaparoo`, then open **Settings > Clients** and select **Pair**.
- From Konsole, run `~/.local/bin/zaparoo -pair`.

Enter the displayed PIN in the client. The PIN expires after five minutes. The first paired client receives administrator access; the terminal UI lets you choose member or administrator access for later clients. If encryption has been turned off, the Decky plugin may also offer **Secure Now**, which turns it back on before pairing the first client. Local Decky-to-Core traffic remains on the Steam Deck.

## Zaparoo Online

Use **Link device** in the Decky plugin to scan a QR code or open the displayed verification URL, then approve the Steam Deck from your [Zaparoo Online](../../online/index.md) account. Linking alone does not upload play history or create cloud backups. Enable each feature separately:

- **Sync play history** uploads retained sessions and live session updates. It does not require Warp.
- **Automatic cloud backup** requires Warp. Its schedule can be **Daily**, **Weekly**, or **Manual only**; start an on-demand backup from the full web UI or terminal UI.

Cloud snapshots contain the same data as a local backup; see [device backups](#device-backups) below.

## Device backups

SteamOS supports portable [device backups](../../features/backups.md) that include Zaparoo data plus emulator settings, BIOS files, saves, and save states from EmuDeck, RetroDECK, and standalone emulators, non-Steam game saves, and Bottles, Faugus Launcher, Kodi, and Moonlight configuration. Games, ROMs, and runtimes are not included. Create local backups from the Core terminal UI, or link Zaparoo Online for cloud snapshots.

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
| Bottles          | PC       | Programs from Bottles                      |
| Faugus           | PC       | Games from Faugus Launcher                 |
| Moonlight        | PC       | Streamed apps through Moonlight            |
| Kodi             | Media    | Videos, movies, TV shows, music            |
| Shell Scripts    | Any      | Custom `.sh` file execution                |

Each launcher's detection rules, paths, and configuration are on [SteamOS launchers](./launchers.md).

## Troubleshooting

### Zaparoo Runtime is missing or stale

Check the installation and Runtime shortcut:

```bash
curl -fsSL https://zaparoo.org/install.sh | bash -s -- status
```

Run repair mode if the status reports a missing or stale Runtime integration:

```bash
curl -fsSL https://zaparoo.org/install.sh | bash -s -- repair
```

If status reports duplicate Runtime shortcuts, remove the extra **Zaparoo Runtime** entries from your Steam library, then run repair. Restart Steam or reboot once if repair adds the shortcut. Zaparoo falls back to direct emulator launching while Runtime is unavailable.

### Core is not running

Check the user service and recent log output:

```bash
systemctl --user status zaparoo.service
journalctl --user -u zaparoo.service -n 100
```

Restart it without `sudo`:

```bash
systemctl --user restart zaparoo.service
```

### An NFC reader is not detected

Reconnect the reader after installing NFC reader support. If support was skipped during installation, run repair mode and accept the NFC reader support prompt. The installed udev rule covers CH340-based PN532 USB readers; other serial readers may need separate device permissions. The hardware step also configures Linux module access for libnfc ACR122U readers.

## FAQ

**What NFC reader should I use with a Steam Deck?**

Use a [PN532 USB](../../readers/nfc/pn532-usb.md) reader. Plug it into the Steam Deck or a connected USB hub and Core detects it automatically.

**Can Zaparoo launch non-Steam games on the Steam Deck?**

Zaparoo can launch indexed games through supported native emulators, RetroArch, EmuDeck, or RetroDECK. It can also launch anything added to your Steam library, including non-Steam shortcuts.

**Does Zaparoo work in Game Mode?**

Yes. The service runs in the background and launches games from Game Mode. You do not need to switch to Desktop Mode for normal scanning to work.

**Does Zaparoo survive SteamOS updates?**

Core, its user service, configuration, databases, and Zaparoo Runtime files are installed under your home directory rather than the immutable system partition. Normal SteamOS updates preserve these user files.

**Why is there one Zaparoo Runtime entry instead of one shortcut per game?**

The permanent Runtime entry gives every emulator launch a Steam-owned session without filling your library or rewriting Steam metadata. Core sends each selected game to that shared Runtime and keeps the actual title in current-media and play-history tracking.
