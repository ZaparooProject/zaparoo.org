---
sidebar_position: 9
description: "Install Zaparoo on LibreELEC (beta): manual setup for NFC card media launching on Kodi-based LibreELEC devices."
keywords: [zaparoo libreelec, libreelec nfc, kodi nfc launcher zaparoo, libreelec game launch]
---

# LibreELEC

:::warning
LibreELEC support is in beta. Launching and readers are supported, but requires manual setup.
:::

Zaparoo Core on LibreELEC provides Kodi integration for movies, TV shows, and music. Also works on [CoreELEC](https://coreelec.org/) and other Kodi-based systems.

## File paths

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

## Uninstall

1. Stop the service: `/storage/zaparoo -service stop`
2. Remove the line you added to `/storage/.config/autostart.sh`.
3. Delete `/storage/zaparoo`, and `/storage/.local/share/zaparoo` if you also want to remove your configuration and data.

## Readers

| Type | Reader | Support | Setup | Notes |
| ---- | ------ | ------- | ----- | ----- |
| NFC/RFID | [PN532 USB](../readers/nfc/pn532-usb.md) | Supported | Auto-detected |  |
| NFC/RFID | [PN532 Module](../readers/nfc/pn532-module.md) | Supported | Depends on wiring | UART can auto-detect. I2C is supported. |
| NFC/RFID | [ACR122U](../readers/nfc/acr122u.md) | Supported | Auto-detected | Uses libnfc: LED and beeper do not work, and some clone variants are incompatible. |
| NFC/RFID | [RC522](../readers/nfc/rc522.md) | Limited | Via Simple Serial | Requires a microcontroller; not a direct USB reader. |
| Barcode and QR | [Zaparoo App camera](../app/index.md) | Supported | Via Zaparoo App |  |
| Barcode and QR | [RS-232 scanner](../readers/barcode/rs232.md) | Supported | Manual config |  |
| Optical and Media | [Optical Drive](../readers/optical-drive.md) | Supported | Manual config |  |
| Optical and Media | [External Drive](../readers/external-drive.md) | Supported | Manual enable |  |
| Custom and Virtual | [MQTT Reader](../readers/mqtt.md) | Supported | Manual config |  |
| Custom and Virtual | [Simple Serial](../readers/simple-serial.md) | Supported | Manual config |  |
| Custom and Virtual | [File Reader](../readers/file.md) | Supported | Manual config |  |
| Displays and Integrations | [TTY2OLED](../readers/tty2oled.md) | Supported | Manual enable |  |

Each reader's page has setup steps and troubleshooting. See [readers](../readers/index.md) to compare them, or the [setup guide](/start/) to pick one for your setup.

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

### Shell scripts

Custom shell scripts (`.sh` files) can be launched directly. Scripts must be added to the `allow_file` list in `config.toml`.

```toml
[launchers]
allow_file = [
    "^/storage/.*\\.sh$"
]
```

Restart Zaparoo after modifying the config for changes to take effect.
