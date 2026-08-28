---
description: "Configure Steam, Lutris, Heroic, RetroArch, Kodi, browser, and script launchers in Zaparoo Core for Linux."
keywords: [zaparoo linux launchers, zaparoo steam linux, zaparoo lutris, zaparoo heroic, zaparoo retroarch, linux nfc game launch]
---

# Launchers

Linux supports Steam, Lutris, Heroic, and RetroArch game launchers, Kodi media playback, web browser URLs, and shell scripts.

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

Core includes launchers for supported systems when the `org.libretro.RetroArch` Flatpak and matching RetroArch core are installed. Missing Flatpaks or core files are reported as unavailable, so Core does not select a launcher that cannot run the game.

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
