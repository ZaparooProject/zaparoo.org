# Launchers

Linux supports multiple game launchers, Kodi media playback, web browser URLs, and shell scripts.

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

## Shell Scripts

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
