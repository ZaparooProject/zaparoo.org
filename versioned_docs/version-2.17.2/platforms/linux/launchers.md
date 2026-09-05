---
description: "Configure Steam, Lutris, Heroic, RetroArch, standalone emulator, EmuDeck, RetroDECK, Bottles, Faugus, Moonlight, Kodi, browser, and script launchers in Zaparoo Core for Linux."
keywords: [zaparoo linux launchers, zaparoo steam linux, zaparoo lutris, zaparoo heroic, zaparoo retroarch, linux emulator nfc launch, zaparoo emudeck linux, zaparoo retrodeck linux, zaparoo bottles, zaparoo moonlight]
---

# Launchers

Linux supports Steam, Lutris, Heroic, RetroArch, standalone emulators, EmuDeck, RetroDECK, Bottles, Faugus, and Moonlight game launchers, Kodi media playback, web browser URLs, and shell scripts. Emulator launchers only appear when Core finds the emulator installed, so a missing launcher usually means the emulator is not installed yet.

## Steam

Scans Steam library for installed games and non-Steam shortcuts. Works with native Steam, Flatpak, and Snap installations.

| System ID | Scheme |
|-----------|--------|
| `PC` | `steam://` |

Auto-detected paths:
- `~/.steam/steam`
- `~/.local/share/Steam`
- `~/.var/app/com.valvesoftware.Steam/.steam/steam` (Flatpak)
- `~/snap/steam/common/.steam/steam` (Snap)

To specify a custom Steam installation directory:

```toml
[[launchers.default]]
launcher = "Steam"
install_dir = "/path/to/steam"
```

## Lutris

Core indexes games marked as installed in your Lutris library. It checks both native and Flatpak library locations, and the `lutris` command must be available in your `PATH`.

| System ID | Scheme |
|-----------|--------|
| `PC` | `lutris://` |

Auto-detected library databases:

- `~/.local/share/lutris/pga.db`
- `~/.var/app/net.lutris.Lutris/data/lutris/pga.db` (Flatpak)

Run Lutris and install a game before updating the media database. Core creates launchable entries from the installed games and opens them through Lutris by their game slug.

## Heroic

Core indexes installed Epic Games and GOG titles from Heroic Games Launcher. It checks both native and Flatpak library locations, and the `heroic` command must be available in your `PATH`.

| System ID | Scheme |
|-----------|--------|
| `PC` | `heroic://` |

Auto-detected library directories:

- `~/.config/heroic/store_cache`
- `~/.var/app/com.heroicgameslauncher.hgl/config/heroic/store_cache` (Flatpak)

Run Heroic and install a game before updating the media database. Core creates launchable entries from Heroic's Epic Games and GOG library files.

## RetroArch

Core registers RetroArch launchers for supported systems when it finds the `org.libretro.RetroArch` Flatpak. A launcher whose core file is missing is reported as unavailable, so Core does not select a launcher that cannot run the game.

Install the Flatpak from Flathub, then use RetroArch to install the cores for the systems you want to launch:

```bash
flatpak install flathub org.libretro.RetroArch
```

RetroArch launchers scan ES-DE-style system folders such as `nes`, `snes`, and `megadrive` under each configured [`launchers.index_root`](../../core/config.md#index_root). For example:

```toml
[launchers]
index_root = ["/home/user/ROMs"]
```

Core maps each supported system to a default RetroArch core. You can change a launcher's core with its [`load_path`](../../core/config.md#load_path) default.

Built-in controls include save state, load state, menu, pause, reset, fast forward, rewind, and stop. Core enables these through a small network-command overlay at `~/.config/zaparoo/retroarch-network.cfg`; it does not modify your primary RetroArch configuration.

## Standalone emulators

Core registers a launcher for each emulator below that it finds installed. It looks, in order, for the native executable on `PATH`, in `~/.local/bin`, as an AppImage in `~/Applications` whose file name starts with the emulator name, and finally as a Flatpak in the output of `flatpak list`. Flatpak launches run with read-only access to the game's folder and stop when Core stops them.

Emulators marked "launch by path" have no scanned folders. Core launches a file through them when a token or a [custom launcher](../../features/custom-launchers.md) names the file explicitly. The others scan ES-DE-style folders under each [`launchers.index_root`](../../core/config.md#index_root), with the folder name shown in the table.

| Launcher ID | Emulator | System | Detected as | Files and folder |
|-------------|----------|--------|-------------|------------------|
| `XeniaCanary` | Xenia Canary | `Xbox360` | `xenia_canary`, `xenia-canary`, `XeniaCanary` | `.iso`, `.xex`, `.xbox360`, `.zar` in `xbox360` |
| `Ryubing` | Ryubing | `Switch` | `io.github.ryubing.Ryujinx`, `Ryujinx`, `ryujinx`, `Ryubing` | `.xci`, `.nsp`, `.nro` in `switch` |
| `ShadPS4` | shadPS4 | `PS4` | `net.shadps4.shadPS4`, `shadps4` | `.ps4` pointer files in `ps4` |
| `PCSX2` | PCSX2 | `PS2` | `net.pcsx2.PCSX2`, `pcsx2-qt`, `pcsx2` | `.iso`, `.mdf`, `.nrg`, `.bin`, `.img`, `.dump`, `.gz`, `.cso`, `.chd`, `.m3u`, `.elf` in `ps2` |
| `Cemu` | Cemu | `WiiU` | `info.cemu.Cemu`, `cemu`, `Cemu` | `.wua`, `.wup`, `.wud`, `.wux`, `.rpx`, `.squashfs`, `.wuhb` in `wiiu` |
| `Azahar` | Azahar | `3DS` | `org.azahar_emu.Azahar`, `azahar` | `.3ds`, `.cci`, `.cxi`, `.squashfs`, `.zcci`, `.3dsx` in `3ds` |
| `Vita3K` | Vita3K | `Vita` | `Vita3K` | `.psvita` pointer files in `psvita` |
| `RPCS3` | RPCS3 | `PS3` | `net.rpcs3.RPCS3`, `rpcs3` | `.ps3` pointer files in `ps3` |
| `DuckStation` | DuckStation | `PSX` | `org.duckstation.DuckStation`, `duckstation-qt`, `duckstation` | Launch by path |
| `PPSSPP` | PPSSPP | `PSP` | `org.ppsspp.PPSSPP`, `PPSSPPSDL`, `PPSSPPQt`, `ppsspp-qt`, `ppsspp` | Launch by path |
| `DolphinGameCube` | Dolphin | `GameCube` | `org.DolphinEmu.dolphin-emu`, `dolphin-emu`, `dolphin-emu-qt` | `.gcm`, `.iso`, `.gcz`, `.ciso`, `.wbfs`, `.rvz`, `.elf`, `.dol`, `.m3u` in `gamecube` |
| `DolphinWii` | Dolphin | `Wii` | `org.DolphinEmu.dolphin-emu`, `dolphin-emu`, `dolphin-emu-qt` | `.gcm`, `.iso`, `.gcz`, `.ciso`, `.wbfs`, `.wad`, `.rvz`, `.elf`, `.dol`, `.m3u`, `.json` in `wii` |
| `MelonDS` | melonDS | `NDS` | `net.kuribo64.melonDS`, `melonDS` | Launch by path |
| `ScummVMStandalone` | ScummVM | `ScummVM` | `org.scummvm.ScummVM`, `scummvm` | `.scummvm` pointer files, launch by path |
| `Supermodel` | Supermodel | `Model3` | `com.supermodel3.Supermodel`, `supermodel`, `Supermodel` | `.zip` in `model3` |
| `Xemu` | xemu | `Xbox` | `app.xemu.xemu`, `xemu` | `.iso`, `.squashfs` in `xbox` |
| `MAME` | MAME | `Arcade` | `org.mamedev.MAME`, `mame` | `.zip`, `.7z` in `arcade`; the file name is the MAME machine name |
| `FlycastDreamcast` | Flycast | `Dreamcast` | `org.flycast.Flycast`, `flycast` | `.cdi`, `.cue`, `.gdi`, `.chd`, `.m3u` in `dreamcast` |
| `FlycastNaomi` | Flycast | `NAOMI` | `org.flycast.Flycast`, `flycast` | `.lst`, `.bin`, `.dat`, `.zip`, `.7z` in `naomi` |
| `FlycastAtomiswave` | Flycast | `Atomiswave` | `org.flycast.Flycast`, `flycast` | `.lst`, `.bin`, `.dat`, `.zip`, `.7z` in `atomiswave` |
| `RMG` | RMG | `Nintendo64` | `com.github.Rosalie241.RMG`, `RMG` | `.z64`, `.n64`, `.v64`, `.zip`, `.7z` in `n64` |
| `mGBAGBA` | mGBA | `GBA` | `io.mgba.mGBA`, `mgba-qt`, `mgba` | `.gba`, `.zip`, `.7z` in `gba` |
| `mGBAGB` | mGBA | `Gameboy` | `io.mgba.mGBA`, `mgba-qt`, `mgba` | `.gb`, `.zip`, `.7z` in `gb` |
| `mGBAGBC` | mGBA | `GameboyColor` | `io.mgba.mGBA`, `mgba-qt`, `mgba` | `.gbc`, `.zip`, `.7z` in `gbc` |
| `Ruffle` | Ruffle | `PC` | `rs.ruffle.Ruffle`, `ruffle`, `ruffle_desktop` | `.swf` in `flash` |
| `PrimeHackGameCube` | PrimeHack | `GameCube` | `io.github.shiiion.primehack`, `primehack` | Launch by path |
| `PrimeHackWii` | PrimeHack | `Wii` | `io.github.shiiion.primehack`, `primehack` | Launch by path |

### Pointer files

Some emulators take an installed game or a title ID rather than a ROM file. For those, put a small plain-text file in the scanned folder and name it after the game. The file holds one value, up to 4096 bytes, with surrounding whitespace ignored:

- `.ps4` and `.ps3` files hold the path to the installed game.
- `.psvita` files hold the game's title ID.
- `.scummvm` files hold the ScummVM game ID.

These launchers belong to the `Native` launcher group. When a system has several possible launchers, set the order with [`launchers.preference`](../../core/config.md#preference):

```toml
[launchers]
preference = ["Native", "EmuDeck", "RetroDECK"]
```

An explicit launcher on a token, a saved per-game override, and a system default all take priority over this list.

## EmuDeck

Core detects an [EmuDeck](https://www.emudeck.com/) installation and creates a launcher for each system folder present in the EmuDeck ROM directory. Launcher IDs are `EmuDeck` followed by the system, such as `EmuDeckPS2`, and they belong to the `EmuDeck` group.

- The ROM directory is `~/Emulation/roms`, or the `romsPath` value from `~/.config/EmuDeck/settings.sh` if you moved it.
- Gamelists are read from `~/ES-DE/gamelists`. When a system has a `gamelist.xml`, Core uses it instead of scanning the folder.
- A system is available when its EmuDeck launcher wrapper exists under `tools/launchers` next to the ROM directory, or the matching emulator Flatpak is installed.
- The `gc` folder maps to GameCube and `n3ds` to 3DS.

Standalone emulators launch PlayStation (DuckStation), PlayStation 2 (PCSX2), PlayStation 3 (RPCS3), PSP (PPSSPP), GameCube and Wii (Dolphin), Wii U (Cemu), Switch (Ryujinx), 3DS (Azahar), and ScummVM. Every other system uses the RetroArch Flatpak.

## RetroDECK

Core detects [RetroDECK](https://retrodeck.net/) when the `net.retrodeck.retrodeck` Flatpak is installed and creates a launcher for each recognized system folder in its ROM directory. Launcher IDs are `RetroDECK` followed by the system, and they belong to the `RetroDECK` group.

- The ROM directory is `~/retrodeck/roms`, or the `roms_path` value from `~/.var/app/net.retrodeck.retrodeck/config/retrodeck/retrodeck.json` if you moved it.
- Gamelists are read from the `ES-DE/gamelists` folder inside the RetroDECK home directory, and both the ROM directory and the gamelists folder must exist.
- Games launch through RetroDECK's own command, which picks the emulator.

## ES-DE gamelists

When `[launchers] index_root` is set and `~/ES-DE/gamelists` exists, Core uses the names and metadata from ES-DE's `gamelist.xml` files for games it has already indexed from those roots. This only improves entries Core found on its own; it does not add games.

## Bottles

Core lists the programs installed in your [Bottles](https://usebottles.com/) bottles during a media database update and launches them through Bottles.

| System ID | Scheme |
|-----------|--------|
| `PC` | `bottles://` |

Bottles is detected as the `com.usebottles.bottles` Flatpak or the `bottles-cli` command. Core reads the bottle and program list with `bottles-cli`, so open Bottles and add your programs before updating the media database. Bottles tokens encode the bottle and program together, so write them from the [Zaparoo App](../../app/index.md) rather than by hand.

## Faugus

Core indexes games added to [Faugus Launcher](https://github.com/Faugus/faugus-launcher) and launches them by their Faugus game ID.

| System ID | Scheme |
|-----------|--------|
| `PC` | `faugus://` |

Faugus is detected as the `io.github.Faugus.faugus-launcher` Flatpak or the `faugus-launcher` command. Core reads the library from `~/.local/share/faugus-launcher/games.json`, or the matching file under `~/.var/app/io.github.Faugus.faugus-launcher/` for the Flatpak. Tokens use `faugus://<gameid>/<title>`.

## Moonlight

Core streams apps from a [Moonlight](https://moonlight-stream.org/) host you describe in small text files.

| System ID | Folder | Extension |
|-----------|--------|-----------|
| `PC` | `moonlight` | `.moonlight` |

Moonlight is detected as the `com.moonlight_stream.Moonlight` Flatpak or the `moonlight` command. Create a `moonlight` folder under an [`index_root`](../../core/config.md#index_root) and add one `.moonlight` file per app, named after the app. Each file is either JSON or two lines, host then app:

```json
{"host": "gaming-pc.local", "app": "Steam"}
```

```text
gaming-pc.local
Steam
```

Core runs `moonlight stream <host> <app>`. Only files inside the scanned folder can be launched; the host must already be paired in Moonlight.

## Kodi

Media playback through Kodi is available when the Kodi JSON-RPC API is enabled.

### Local Files

These launchers play files directly from disk:

| System ID | Folders | Extensions |
|-----------|---------|------------|
| `Video` | `videos`, `tvshows` | `.avi`, `.mp4`, `.mkv`, `.iso`, `.bdmv`, `.ifo`, `.mpeg`, `.mpg`, `.mov`, `.wmv`, `.flv`, `.webm`, `.m4v`, `.3gp`, `.ts`, `.m2ts`, `.mts`, `.m3u`, `.m3u8` |
| `MusicTrack` | `music` | `.mp3`, `.flac`, `.ogg`, `.m4a`, `.wav`, `.wma`, `.aac`, `.opus` |

### Library Media

These launchers play media from Kodi's indexed library:

| System ID | Description |
|-----------|-------------|
| `Movie` | Movies from Kodi library |
| `TVEpisode` | Individual TV episodes |
| `TVShow` | Entire TV show (plays next unwatched episode) |
| `MusicTrack` | Songs from Kodi music library |
| `MusicAlbum` | Albums from Kodi music library |
| `MusicArtist` | Artists from Kodi music library (plays all songs) |

### Configuration

Configure the Kodi server URL in `config.toml`:

```toml
[[launchers.default]]
launcher = "Kodi"
server_url = "http://localhost:8080"
```

If Kodi requires authentication, add credentials to `auth.toml`:

```toml
["http://localhost:8080"]
username = "kodi"
password = "your_password"
```

See [LibreELEC](../libreelec.md) for detailed Kodi API setup instructions.

## Web Browser

Opens URLs in the default system browser using `xdg-open`.

| Scheme | Description |
|--------|-------------|
| `http://` | HTTP URLs |
| `https://` | HTTPS URLs |

## Shell scripts

Custom shell scripts (`.sh` files) can be launched directly. Scripts must be added to the `allow_file` list in `config.toml`.

```toml
[launchers]
allow_file = [
    "^/home/user/scripts/.*\\.sh$"
]
```

### Example Script

Create a launcher script for an emulator:

```bash
#!/bin/bash
# ~/scripts/launch_nes.sh

EMULATOR="/usr/bin/fceux"
GAME="$HOME/games/nes/SuperMarioBros.nes"

"$EMULATOR" "$GAME"
```

Make executable and add to allowlist:

```bash
chmod +x ~/scripts/launch_nes.sh
```

```toml
[launchers]
allow_file = [
    "^/home/user/scripts/launch_nes\\.sh$"
]
```

Restart Zaparoo after modifying the config for changes to take effect.
