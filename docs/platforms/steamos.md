---
description: "Install Zaparoo on SteamOS and launch Steam, native emulator, RetroArch, EmuDeck, and RetroDECK games from tokens."
keywords: [zaparoo steamos, zaparoo steam deck, steam deck nfc, nfc steam deck game launcher, steamos nfc reader]
---

# SteamOS

Zaparoo Core runs in the background on SteamOS and launches Steam games, native emulators, RetroArch, EmuDeck, and RetroDECK from physical tokens. In Gaming Mode, supported emulator launches run through one permanent Zaparoo Runtime shortcut. Steam games launch directly through Steam.

## File Paths

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
- Verifies Core's API, platform, and installed version before reporting success
- Removes a failed fresh installation if setup or health verification fails

SteamOS has an immutable system partition, so application, configuration, and data files remain under `/home/deck`. If the installer adds the Zaparoo Runtime shortcut for the first time, restart Steam or reboot the Steam Deck once so it appears.

Once Core is running, use the [Zaparoo App](/docs/app/), the optional [Decky Loader companion](#decky-loader-companion), or the built-in web UI at `http://127.0.0.1:7497/app/`.

### Installer commands

Rerun the standard install command to upgrade an older Core release to the latest stable version. The installer preserves the previous binary and restores it if the upgrade fails.

```bash
# Install or upgrade Core
curl -fsSL https://zaparoo.org/install.sh | bash

# Show installed version, service health, and Steam Runtime status
curl -fsSL https://zaparoo.org/install.sh | bash -s -- status

# Repair service, application metadata, desktop shortcut, and Steam Runtime integration
curl -fsSL https://zaparoo.org/install.sh | bash -s -- repair

# Remove Core while preserving user data
curl -fsSL https://zaparoo.org/install.sh | bash -s -- uninstall
```

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

## Decky Loader companion

The optional official [Zaparoo plugin](https://github.com/ZaparooProject/zaparoo-decky) for [Decky Loader](https://decky.xyz/) puts common controls in Steam's Quick Access Menu. Core must remain installed and running; the plugin is a controller-native Core client and does not contain a second copy of Core.

From the Quick Access Menu you can:

- Write the current Core media or selected Steam game to an NFC tag
- Stop current media
- See the latest scanned token and pending Core notifications
- Update or cancel media database indexing with live progress, and resume it when paused
- Adjust scan behavior and pair client devices
- Link Zaparoo Online and separately opt into play history sync or automatic cloud backup
- Open the full web UI for advanced settings

Current media takes priority over the Steam game shown in the Steam interface. **Write to Tag** is unavailable when no writable reader is connected, and the writer selector appears only when multiple writable readers are available. Leave the tag on the reader until the write succeeds, then remove it before scanning again. The plugin does not alter Steam game pages.

Core Inbox messages remain pending under **Notifications** until you dismiss them. Closing the notification viewer leaves them in the Inbox.

## Client security

Fresh SteamOS configurations require encrypted remote client connections by default. Existing and migrated configurations keep their current encryption setting.

Pair a phone, browser, or other Core client with a temporary six-digit PIN. You can start pairing in any of these ways:

- In the Decky plugin, select **Pair client**.
- In the terminal UI, run `~/.local/bin/zaparoo`, then open **Settings > Clients** and select **Pair**.
- From Konsole, run `~/.local/bin/zaparoo -pair`.

Enter the displayed PIN in the client. The PIN expires after five minutes. The first paired client receives administrator access; the terminal UI lets you choose member or administrator access for later clients. Existing unencrypted installations may also offer **Secure Now** in the Decky plugin, which enables encryption before pairing the first client. Local Decky-to-Core traffic remains on the Steam Deck.

## Zaparoo Online

Use **Link device** in the Decky plugin to scan a QR code or open the displayed verification URL, then approve the Steam Deck from your [Zaparoo Online](../online/index.md) account. Linking alone does not upload play history or create cloud backups. Enable each feature separately:

- **Sync play history** uploads retained sessions and live session updates. It does not require Warp.
- **Automatic cloud backup** requires Warp. Its schedule can be **Daily**, **Weekly**, or **Manual only**; start an on-demand backup from the full web UI or terminal UI.

Like every Core platform, SteamOS cloud backups contain Zaparoo configuration, mappings, launcher files, and the user database. SteamOS platform data, such as emulator configuration and saves, is not included. See [Device Backups](../features/backups.md) for complete backup contents, exclusions, and restore behavior.

## Readers

<ReaderSupport
  groups={[
    {
      name: "NFC/RFID",
      readers: [
        { name: "PN532 USB", href: "../readers/nfc/pn532-usb", support: "supported", setup: "Auto-detected" },
        { name: "PN532 Module", href: "../readers/nfc/pn532-module", support: "supported", setup: "Depends on wiring", note: "UART can auto-detect. I2C is supported." },
        { name: "ACR122U", href: "../readers/nfc/acr122u", support: "limited", setup: "Auto-detected", note: "Uses libnfc: MIFARE Classic writing is limited, LED and beeper do not work, and some clone variants are incompatible." },
        { name: "RC522", href: "../readers/nfc/rc522", support: "limited", setup: "Via Simple Serial", note: "Requires a microcontroller; not a direct USB reader." },
      ],
    },
    {
      name: "Barcode and QR",
      readers: [
        { name: "App/Camera Scanner", href: "../app/", support: "supported", setup: "Via Zaparoo App" },
        { name: "RS232 Scanner", href: "../readers/barcode/rs232", support: "supported", setup: "Manual config" },
      ],
    },
    {
      name: "Optical and Media",
      readers: [
        { name: "Optical Drive", href: "../readers/optical-drive", support: "supported", setup: "Manual config" },
        { name: "External Drive", href: "../readers/external-drive", support: "supported", setup: "Manual enable" },
      ],
    },
    {
      name: "Custom and Virtual",
      readers: [
        { name: "MQTT Reader", href: "../readers/mqtt", support: "supported", setup: "Manual config" },
        { name: "Simple Serial", href: "../readers/simple-serial", support: "supported", setup: "Manual config" },
        { name: "File Reader", href: "../readers/file", support: "supported", setup: "Manual config" },
      ],
    },
    {
      name: "Displays and Integrations",
      readers: [
        { name: "TTY2OLED", href: "../readers/tty2oled", support: "supported", setup: "Manual enable" },
      ],
    },
  ]}
/>

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

### Steam

Launches games from your Steam library via the `steam://` URL scheme. Both official Steam games and non-Steam shortcuts added to your library are detected.

Zaparoo also tracks when you start Steam games externally (from Big Picture or the desktop client), showing the currently running game in ActiveMedia.

Core uses the configured `install_dir` or the first Steam installation it finds, normally `~/.steam/steam/` or `~/.local/share/Steam/`. It indexes installed games from that installation and any additional libraries listed in Steam's `libraryfolders.vdf`, plus non-Steam shortcuts from Steam's user data.

To manually launch a Steam game, write `steam://<app_id>` to a token. For example: `steam://1145360` for Hades.

```toml title="config.toml"
[[launchers.default]]
launcher = "Steam"
install_dir = "/custom/steam/path"  # Optional custom Steam install directory
```

### Native emulators

Core does not install or configure native emulators for you.

Core can launch games directly through supported emulator Flatpaks and executables without routing them through EmuDeck or RetroDECK. It checks each runtime before selecting the launcher and reports missing emulators as unavailable.

| Emulator | Systems | Detected runtime |
| -------- | ------- | ---------------- |
| Xenia Canary | Xbox 360 | `XeniaCanary` executable |
| Ryubing | Nintendo Switch | `io.github.ryubing.Ryujinx` Flatpak |
| shadPS4 | PlayStation 4 | `net.shadps4.shadPS4` Flatpak |
| PCSX2 | PlayStation 2 | `net.pcsx2.PCSX2` Flatpak |
| Cemu | Wii U | `info.cemu.Cemu` Flatpak |
| Azahar | Nintendo 3DS | `org.azahar_emu.Azahar` Flatpak |
| Vita3K | PlayStation Vita | `Vita3K` executable |
| RPCS3 | PlayStation 3 | `net.rpcs3.RPCS3` Flatpak |
| DuckStation | PlayStation | `org.duckstation.DuckStation` Flatpak |
| PPSSPP | PSP | `org.ppsspp.PPSSPP` Flatpak |
| Dolphin | GameCube and Wii | `org.DolphinEmu.dolphin-emu` Flatpak |
| melonDS | Nintendo DS | `net.kuribo64.melonDS` Flatpak |
| ScummVM | ScummVM | `org.scummvm.ScummVM` Flatpak |
| Supermodel | Sega Model 3 | `com.supermodel3.Supermodel` Flatpak |
| xemu | Xbox | `app.xemu.xemu` Flatpak |
| PrimeHack | GameCube and Wii | `io.github.shiiion.primehack` Flatpak |

Executable launchers are detected through `PATH` and `~/.local/bin`. Native filesystem scanning uses ES-DE-style system folders under the configured media roots, with `~/ROMs` as the SteamOS default. Some launchers reuse compatible media indexed by another launcher instead of scanning the same files again.

shadPS4, Vita3K, and RPCS3 use `.ps4`, `.psvita`, and `.ps3` marker files respectively when scanning. Each marker must contain one non-empty launch target on a single line. ScummVM uses `.scummvm` target files.

Use [`launchers.preference`](../core/config.md#preference) to choose an ordered fallback between native emulators, EmuDeck, and RetroDECK:

```toml title="config.toml"
[launchers]
preference = ["Native", "EmuDeck", "RetroDECK"]
```

Core skips unavailable launchers in this preference list. Explicit token launchers, saved per-media overrides, and system defaults still take priority.

### RetroArch

Core registers its supported RetroArch launchers and checks for the `org.libretro.RetroArch` Flatpak and each matching core file before launch. Launchers with a missing Flatpak or core remain visible as unavailable but are not selected for launches.

Games are indexed from ES-DE-style system folders under the configured media roots. Built-in controls include save state, load state, menu, pause, reset, fast forward, rewind, and stop.

Core uses Zaparoo-owned per-system configuration overlays, leaving your primary RetroArch configuration unchanged. These profiles enable network commands and low-latency settings while disabling threaded video, run-ahead, rewind, shaders, overlays, and automatic overrides for launches managed by Core.

In Gaming Mode, RetroArch launches use Zaparoo Runtime when it is available. Direct fallback launches use gamescope focus handling. You can override the core selected for a launcher with [`load_path`](../core/config.md#load_path).

### EmuDeck

Zaparoo detects [EmuDeck](https://www.emudeck.com/) installations and creates launchers for supported system folders present in the EmuDeck ROM directory. RetroArch-based systems use Core's built-in RetroArch launchers, while other systems launch through standalone Flatpak emulators such as Dolphin and PCSX2. Missing emulators are reported as unavailable instead of being selected for a launch.

EmuDeck is detected when `~/Emulation/roms/` exists.

**Default paths:**
- ROMs: `~/Emulation/roms/`
- Gamelists: `~/ES-DE/gamelists/`

Supported systems include: NES, SNES, Game Boy, GBA, N64, NDS, GameCube, Wii, Wii U, Switch, 3DS, Genesis, Saturn, Dreamcast, PSX, PS2, PS3, PSP, Neo Geo, Arcade, and many more.

Games are discovered using ES-DE's `gamelist.xml` files for proper display names.

### RetroDECK

Zaparoo detects [RetroDECK](https://retrodeck.net/) and creates launchers for recognized system folders in its ROM directory. Games launch through RetroDECK's unified CLI, which handles emulator selection internally.

RetroDECK is detected when the `net.retrodeck.retrodeck` Flatpak is installed and `~/retrodeck/roms/` exists.

**Default paths:**
- ROMs: `~/retrodeck/roms/`
- Gamelists: `~/retrodeck/ES-DE/gamelists/`

RetroDECK supports any system folder that matches an ES-DE system definition.

### Kodi

Launch media content from a [Kodi](https://kodi.tv/) instance running on your network.

Supported content:
- Video and audio files
- Movies and TV episodes
- Music (songs, albums, artists)

```toml title="config.toml"
[[launchers.default]]
launcher = "Kodi"
server_url = "http://kodi:8080"
```

Replace `kodi:8080` with your Kodi instance's address and web interface port.

### Zaparoo Runtime and Gaming Mode

When Zaparoo Runtime is available, native emulators, RetroArch, EmuDeck, and RetroDECK run through one permanent **Zaparoo Runtime** non-Steam shortcut in Gaming Mode. The shortcut starts the requested emulator as a Steam-owned child process.

Core continues to show and track the requested game, not Zaparoo Runtime. Play history starts after the emulator launches and ends when it exits. Launching another token stops the current Runtime session before starting the replacement.

Zaparoo Runtime does not create per-game Steam shortcuts or modify Steam game pages. The installer adds default artwork for the permanent shortcut without replacing artwork you have customized. In Desktop Mode, or when Runtime is unavailable, Core falls back to direct launching.

### Shell Scripts

Execute allow-listed `.sh` files directly. Each file must be executable and use a valid shebang, such as `#!/bin/bash`.

| System ID | Extensions |
|-----------|------------|
| Any | `.sh` |

```toml title="config.toml"
[launchers]
allow_file = [
    "^/home/deck/scripts/.*\\.sh$"
]
```

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

Use a [PN532 USB](../readers/nfc/pn532-usb.md) reader. Plug it into the Steam Deck or a connected USB hub and Core detects it automatically.

**Can Zaparoo launch non-Steam games on the Steam Deck?**

Zaparoo can launch indexed games through supported native emulators, RetroArch, EmuDeck, or RetroDECK. It can also launch anything added to your Steam library, including non-Steam shortcuts.

**Does Zaparoo work in Game Mode?**

Yes. The service runs in the background and launches games from Game Mode. You do not need to switch to Desktop Mode for normal scanning to work.

**Does Zaparoo survive SteamOS updates?**

Core, its user service, configuration, databases, and Zaparoo Runtime files are installed under your home directory rather than the immutable system partition. Normal SteamOS updates preserve these user files.

**Why is there one Zaparoo Runtime entry instead of one shortcut per game?**

The permanent Runtime entry gives every emulator launch a Steam-owned session without filling your library or rewriting Steam metadata. Core sends each selected game to that shared Runtime and keeps the actual title in current-media and play-history tracking.
