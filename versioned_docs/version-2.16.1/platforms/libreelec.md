---
description: "Install Zaparoo on LibreELEC (beta): manual setup for NFC card media launching on Kodi-based LibreELEC devices."
keywords: [zaparoo libreelec, libreelec nfc, kodi nfc launcher zaparoo, libreelec game launch]
---

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

<ReaderSupport
  groups={[
    {
      name: "NFC/RFID",
      readers: [
        { name: "PN532 USB", href: "../readers/nfc/pn532-usb", support: "supported", setup: "Auto-detected" },
        { name: "PN532 Module", href: "../readers/nfc/pn532-module", support: "supported", setup: "Depends on wiring", note: "UART can auto-detect. I2C is supported." },
        { name: "ACR122U", href: "../readers/nfc/acr122u", support: "supported", setup: "Auto-detected", note: "Uses libnfc: LED and beeper do not work, and some clone variants are incompatible." },
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
