---
sidebar_position: 2
description: "SteamOS launchers for Zaparoo: Steam, native emulator Flatpaks, RetroArch, EmuDeck, RetroDECK, Kodi, Zaparoo Runtime in Gaming Mode, and shell scripts."
keywords: [zaparoo steamos launchers, steam deck emudeck nfc, retrodeck zaparoo, steam deck retroarch nfc, zaparoo runtime]
---

# SteamOS Launchers

How Zaparoo Core starts games on SteamOS. Install and reader setup are on the [SteamOS](./index.md) page. For a launcher that isn't listed here, write a [custom launcher](../../features/custom-launchers.md).

## Steam

Launches games from your Steam library via the `steam://` URL scheme. Both official Steam games and non-Steam shortcuts added to your library are detected.

Zaparoo also tracks when you start Steam games externally (from Big Picture or the desktop client), showing the currently running game in ActiveMedia.

Core uses the configured `install_dir` or the first Steam installation it finds, normally `~/.steam/steam/` or `~/.local/share/Steam/`. It indexes installed games from that installation and any additional libraries listed in Steam's `libraryfolders.vdf`, plus non-Steam shortcuts from Steam's user data.

To manually launch a Steam game, write `steam://<app_id>` to a token. For example: `steam://1145360` for Hades.

```toml title="config.toml"
[[launchers.default]]
launcher = "Steam"
install_dir = "/custom/steam/path"  # Optional custom Steam install directory
```

## Native emulators

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
| MAME | Arcade | `org.mamedev.MAME` Flatpak |
| Flycast | Dreamcast, NAOMI, and Atomiswave | `org.flycast.Flycast` Flatpak |
| RMG | Nintendo 64 | `com.github.Rosalie241.RMG` Flatpak |
| mGBA | Game Boy, Game Boy Color, and GBA | `io.mgba.mGBA` Flatpak |
| Ruffle | Flash (`.swf`) | `rs.ruffle.Ruffle` Flatpak |
| PrimeHack | GameCube and Wii | `io.github.shiiion.primehack` Flatpak |

Each emulator is detected as a native executable on `PATH` or in `~/.local/bin`, as an AppImage in `~/Applications`, or as a Flatpak. Native filesystem scanning uses ES-DE-style system folders under the configured media roots, with `~/ROMs` as the SteamOS default. Some launchers reuse compatible media indexed by another launcher instead of scanning the same files again.

shadPS4, Vita3K, and RPCS3 use `.ps4`, `.psvita`, and `.ps3` pointer files respectively when scanning. Each file holds one launch target, up to 4096 bytes. ScummVM uses `.scummvm` target files. The launcher IDs, file types, and scanned folder for every emulator are listed under [standalone emulators](../linux/launchers.md#standalone-emulators) on the Linux launchers page; SteamOS uses the same detection.

Use [`launchers.preference`](../../core/config.md#preference) to choose an ordered fallback between native emulators, EmuDeck, and RetroDECK:

```toml title="config.toml"
[launchers]
preference = ["Native", "EmuDeck", "RetroDECK"]
```

Core skips unavailable launchers in this preference list. Explicit token launchers, saved per-media overrides, and system defaults still take priority.

## RetroArch

Core registers its supported RetroArch launchers and checks for the `org.libretro.RetroArch` Flatpak and each matching core file before launch. Launchers with a missing Flatpak or core remain visible as unavailable but are not selected for launches.

Games are indexed from ES-DE-style system folders under the configured media roots. Built-in controls include save state, load state, menu, pause, reset, fast forward, rewind, and stop.

Core uses Zaparoo-owned per-system configuration overlays, leaving your primary RetroArch configuration unchanged. These profiles enable network commands and low-latency settings while disabling threaded video, run-ahead, rewind, shaders, overlays, and automatic overrides for launches managed by Core.

In Gaming Mode, RetroArch launches use Zaparoo Runtime when it is available. Direct fallback launches use gamescope focus handling. You can override the core selected for a launcher with [`load_path`](../../core/config.md#load_path).

## EmuDeck

Zaparoo detects [EmuDeck](https://www.emudeck.com/) installations and creates launchers for supported system folders present in the EmuDeck ROM directory. RetroArch-based systems use Core's built-in RetroArch launchers, while other systems launch through standalone Flatpak emulators such as Dolphin and PCSX2. Missing emulators are reported as unavailable instead of being selected for a launch.

EmuDeck systems are available when the EmuDeck launcher wrapper for the emulator exists under `tools/launchers` next to the ROM directory, or when the matching emulator Flatpak is installed. If you moved the ROM directory, Core reads the new location from `romsPath` in `~/.config/EmuDeck/settings.sh`.

**Default paths:**
- ROMs: `~/Emulation/roms/`
- Gamelists: `~/ES-DE/gamelists/`

Supported systems include: NES, SNES, Game Boy, GBA, N64, NDS, GameCube, Wii, Wii U, Switch, 3DS, Genesis, Saturn, Dreamcast, PSX, PS2, PS3, PSP, Neo Geo, Arcade, and many more.

Games are discovered using ES-DE's `gamelist.xml` files for proper display names.

## RetroDECK

Zaparoo detects [RetroDECK](https://retrodeck.net/) and creates launchers for recognized system folders in its ROM directory. Games launch through RetroDECK's unified CLI, which handles emulator selection internally.

RetroDECK is detected when the `net.retrodeck.retrodeck` Flatpak is installed and `~/retrodeck/roms/` exists. If you moved RetroDECK, Core reads the new locations from `paths.rd_home_path` and `paths.roms_path` in `~/.var/app/net.retrodeck.retrodeck/config/retrodeck/retrodeck.json`.

**Default paths:**
- ROMs: `~/retrodeck/roms/`
- Gamelists: `~/retrodeck/ES-DE/gamelists/`

RetroDECK supports any system folder that matches an ES-DE system definition.

## Bottles, Faugus, and Moonlight

Programs from [Bottles](../linux/launchers.md#bottles), games from [Faugus Launcher](../linux/launchers.md#faugus), and streamed apps through [Moonlight](../linux/launchers.md#moonlight) are indexed and launched the same way as on desktop Linux. In Gaming Mode they use gamescope focus handling like other non-Steam launchers.

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

## Zaparoo Runtime and Gaming Mode

When Zaparoo Runtime is available, native emulators, RetroArch, EmuDeck, and RetroDECK run through one permanent **Zaparoo Runtime** non-Steam shortcut in Gaming Mode. The shortcut starts the requested emulator as a Steam-owned child process.

Core continues to show and track the requested game, not Zaparoo Runtime. Play history starts after the emulator launches and ends when it exits. Launching another token stops the current Runtime session before starting the replacement.

Zaparoo Runtime does not create per-game Steam shortcuts or modify Steam game pages. The installer adds default artwork for the permanent shortcut without replacing artwork you have customized. In Desktop Mode, or when Runtime is unavailable, Core falls back to direct launching.

## Shell scripts

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

