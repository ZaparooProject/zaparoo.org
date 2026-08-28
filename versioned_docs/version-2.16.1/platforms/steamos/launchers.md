---
sidebar_position: 2
description: "SteamOS launchers for Zaparoo: Steam, native emulator Flatpaks, RetroArch, EmuDeck, RetroDECK, Kodi, Gaming Mode, and shell scripts."
keywords: [zaparoo steamos launchers, steam deck emudeck nfc, retrodeck zaparoo, steam deck retroarch nfc]
---

# SteamOS Launchers

How Zaparoo Core starts games on SteamOS. Install and reader setup are on the [SteamOS](./index.md) page. For a launcher that isn't listed here, write a [custom launcher](../../features/custom-launchers.md).

## Steam

Launches games from your Steam library via the `steam://` URL scheme. Both official Steam games and non-Steam shortcuts added to your library are detected.

Zaparoo also tracks when you start Steam games externally (from Big Picture or the desktop client), showing the currently running game in ActiveMedia.

Games are indexed from:
- `~/.steam/steam/steamapps/`
- `~/.local/share/Steam/`

To manually launch a Steam game, write `steam://<app_id>` to a token. For example: `steam://1145360` for Hades.

```toml title="config.toml"
[[launchers.default]]
launcher = "Steam"
install_dir = "/custom/steam/path"  # Optional custom Steam install directory
```

## Native emulators

:::warning Experimental launchers
Native emulator launchers are experimental. Core does not install or configure these emulators for you.
:::

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

Use [`launchers.preference`](../../core/config.md#preference) to choose an ordered fallback between native emulators, EmuDeck, and RetroDECK:

```toml title="config.toml"
[launchers]
preference = ["Native", "EmuDeck", "RetroDECK"]
```

Core skips unavailable launchers in this preference list. Explicit token launchers, saved per-game overrides, and system defaults still take priority.

## RetroArch

Core automatically registers launchers for supported systems when the `org.libretro.RetroArch` Flatpak and matching core files are installed. Launchers with a missing Flatpak or core remain visible as unavailable but are not selected for launches.

Games are indexed from ES-DE-style system folders under the configured media roots. Built-in controls include save state, load state, menu, pause, reset, fast forward, rewind, and stop.

Core uses Zaparoo-owned per-system configuration overlays, leaving your primary RetroArch configuration unchanged. These profiles enable network commands and low-latency settings while disabling threaded video, run-ahead, rewind, shaders, overlays, and automatic overrides for launches managed by Core.

RetroArch launches work in Gaming Mode, including gamescope focus handling. You can override the core selected for a launcher with [`load_path`](../../core/config.md#load_path).

## EmuDeck

Zaparoo automatically detects [EmuDeck](https://www.emudeck.com/) installations and creates launchers for each system. RetroArch-based systems use Core's built-in RetroArch launchers, while other systems launch through standalone Flatpak emulators such as Dolphin and PCSX2. Missing emulators are reported as unavailable instead of being selected for a launch.

EmuDeck is detected when `~/Emulation/roms/` exists.

**Default paths:**
- ROMs: `~/Emulation/roms/`
- Gamelists: `~/ES-DE/gamelists/`

Supported systems include: NES, SNES, Game Boy, GBA, N64, NDS, GameCube, Wii, Wii U, Switch, 3DS, Genesis, Saturn, Dreamcast, PSX, PS2, PS3, PSP, Neo Geo, Arcade, and many more.

Games are discovered using ES-DE's `gamelist.xml` files for proper display names.

## RetroDECK

Zaparoo automatically detects [RetroDECK](https://retrodeck.net/) and creates launchers for each system. All games are launched through RetroDECK's unified CLI (`flatpak run net.retrodeck.retrodeck <rom_path>`), which handles emulator selection internally.

RetroDECK is detected when the `net.retrodeck.retrodeck` Flatpak is installed.

**Default paths:**
- ROMs: `~/retrodeck/roms/`
- Gamelists: `~/retrodeck/ES-DE/gamelists/`

RetroDECK supports any system folder that matches an ES-DE system definition.

## Kodi

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

## Gaming Mode

Native emulators, EmuDeck, and RetroDECK work in Steam's Gaming Mode. Zaparoo propagates the active SteamOS session environment and manages window focus through gamescope so the emulator window appears above the Steam shell.

When a launched window closes, Core restores the previous gamescope focus state. Return to Menu stops the active launcher; Steam's Game Mode shell remains responsible for displaying its menu.

## Shell scripts

Execute arbitrary shell scripts. Requires explicit allow list configuration for security.

| System ID | Extensions |
|-----------|------------|
| Any | `.sh` |

```toml title="config.toml"
[launchers]
allow_file = [
    "^/home/deck/scripts/.*\\.sh$"
]
```

