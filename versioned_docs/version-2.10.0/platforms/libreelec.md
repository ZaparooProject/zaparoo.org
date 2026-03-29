# LibreELEC

:::warning
LibreELEC support is in beta. Launching and readers are supported, but requires manual setup.
:::

Zaparoo Core on LibreELEC provides Kodi integration for movies, TV shows, and music. Also works on [CoreELEC](https://coreelec.org/) and other Kodi-based systems.

## File Paths

| Item               | Path                                     |
| ------------------ | ---------------------------------------- |
| Config file        | `/storage/.config/zaparoo/config.toml`   |
| Data directory     | `/storage/.local/share/zaparoo`          |
| Log file           | `/tmp/zaparoo/core.log`                  |
| Mappings directory | `/storage/.local/share/zaparoo/mappings` |

The config file can be accessed through the SMB share in the `Configfiles` folder.

## Install

Download Zaparoo Core for LibreELEC from the [Downloads page](/downloads/), unzip it and copy the `zaparoo` file to `/storage`.

Enable SSH in LibreELEC settings (Services > SSH Server). Default credentials: `root` / `libreelec`.

```bash
cd /storage
./zaparoo -service start
```

### Kodi API Setup

Enable Kodi remote control for Zaparoo to work:

1. Open Settings > Services
2. Change view setting to at least "Standard"
3. Open the Control page
4. Enable "Allow remote control via HTTP"
5. Set a blank password
6. Enable "Allow remote control from applications on this system"

### Adding to Startup

Add to `/storage/.config/autostart.sh`:

```bash
/storage/zaparoo -service start
```

## Readers

All [readers](../readers/index.md) are supported.

## Launchers

LibreELEC uses Kodi as its primary launcher. All media is played through the Kodi JSON-RPC API.

### Local Files

These launchers play files directly from disk in `/storage/`:

| System ID | Folders | Extensions |
|-----------|---------|------------|
| `Video` | `videos`, `tvshows` | `.avi`, `.mp4`, `.mkv`, `.iso`, `.bdmv`, `.ifo`, `.mpeg`, `.mpg`, `.mov`, `.wmv`, `.flv`, `.webm`, `.m4v`, `.3gp`, `.ts`, `.m2ts`, `.mts`, `.m3u`, `.m3u8` |
| `MusicTrack` | `music` | `.mp3`, `.flac`, `.ogg`, `.m4a`, `.wav`, `.wma`, `.aac`, `.opus` |

### Library Media

These launchers play media from Kodi's indexed library. They query Kodi's database during media indexing rather than scanning the filesystem.

| System ID | Description |
|-----------|-------------|
| `Movie` | Movies from Kodi library |
| `TVEpisode` | Individual TV episodes |
| `TVShow` | Entire TV show (plays next unwatched episode) |
| `MusicTrack` | Songs from Kodi music library |
| `MusicAlbum` | Albums from Kodi music library |
| `MusicArtist` | Artists from Kodi music library (plays all songs) |

### Shell Scripts

Custom shell scripts (`.sh` files) can be launched directly. Scripts must be added to the `allow_file` list in `config.toml`.

```toml
[launchers]
allow_file = [
    "^/storage/.*\\.sh$"
]
```

Restart Zaparoo after modifying the config for changes to take effect.
