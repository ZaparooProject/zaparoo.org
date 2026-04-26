---
description: "Install Zaparoo on SteamOS and Steam Deck: launch Steam games, EmuDeck, and RetroDECK by tapping an NFC card on your Steam Deck."
keywords: [zaparoo steamos, zaparoo steam deck, steam deck nfc, nfc steam deck game launcher, steamos nfc reader]
---

# SteamOS

Zaparoo Core on SteamOS supports launching Steam games, EmuDeck, and RetroDECK from your Steam Deck.

## File Paths

| Item               | Path                                       |
| ------------------ | ------------------------------------------ |
| Config file        | `/home/deck/.config/zaparoo/config.toml`   |
| Data directory     | `/home/deck/.local/share/zaparoo`          |
| Log file           | `/tmp/zaparoo/core.log`                    |
| Mappings directory | `/home/deck/.local/share/zaparoo/mappings` |

Assuming the default `deck` account.

## Install

In Desktop Mode, open Konsole and run:

```bash
curl -fsSL https://zaparoo.org/install.sh | bash
```

This installs all necessary components and sets up the service to run on startup. Since SteamOS has an immutable root filesystem, the installation is user-local (installed to `~/.local/bin`). Once running, use the [Zaparoo App](/docs/app/) or the built-in web UI to manage your setup and write tokens.

To uninstall:

```bash
~/.local/bin/zaparoo -uninstall application
~/.local/bin/zaparoo -uninstall service
~/.local/bin/zaparoo -uninstall desktop
sudo ~/.local/bin/zaparoo -uninstall hardware
```

## Readers

<ReaderSupport
  groups={[
    {
      name: "NFC/RFID",
      readers: [
        { name: "PN532 USB", href: "../readers/nfc/pn532-usb", support: "supported", setup: "Auto-detected" },
        { name: "PN532 Module", href: "../readers/nfc/pn532-module", support: "supported", setup: "Depends on wiring", note: "UART and I2C can auto-detect." },
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

| Launcher   | Systems | Notes                                 |
| ---------- | ------- | ------------------------------------- |
| Steam      | PC      | Games and non-Steam shortcuts         |
| EmuDeck    | 56+     | RetroArch and standalone emulators    |
| RetroDECK  | 200+    | Unified emulator frontend             |
| Kodi       | Media   | Videos, movies, TV shows, music       |
| Shell Scripts | Any  | Custom `.sh` file execution           |

### Steam

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

### EmuDeck

Zaparoo automatically detects [EmuDeck](https://www.emudeck.com/) installations and creates launchers for each system. Games are launched through Flatpak to individual emulators (RetroArch cores or standalone emulators like Dolphin, PCSX2, etc.).

EmuDeck is detected when `~/Emulation/roms/` exists.

**Default paths:**
- ROMs: `~/Emulation/roms/`
- Gamelists: `~/ES-DE/gamelists/`

Supported systems include: NES, SNES, Game Boy, GBA, N64, NDS, GameCube, Wii, Wii U, Switch, 3DS, Genesis, Saturn, Dreamcast, PSX, PS2, PS3, PSP, Neo Geo, Arcade, and many more.

Games are discovered using ES-DE's `gamelist.xml` files for proper display names.

### RetroDECK

Zaparoo automatically detects [RetroDECK](https://retrodeck.net/) and creates launchers for each system. All games are launched through RetroDECK's unified CLI (`flatpak run net.retrodeck.retrodeck <rom_path>`), which handles emulator selection internally.

RetroDECK is detected when the `net.retrodeck.retrodeck` Flatpak is installed.

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

### Gaming Mode

Both EmuDeck and RetroDECK work in Steam's Gaming Mode. Zaparoo manages window focus through gamescope to ensure the emulator window is properly displayed when launching games.

### Shell Scripts

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

## Known Issues

- Updates require stopping the service first: `sudo systemctl stop zaparoo.service`

## FAQ

**What NFC reader should I use with a Steam Deck?**

The [PN532 USB](../readers/nfc/pn532-usb.md) reader is the recommended choice. Plug it into the Steam Deck or a connected USB hub and it will be auto-detected by Zaparoo.

**Can Zaparoo launch non-Steam games on the Steam Deck?**

Zaparoo can launch any game that EmuDeck or RetroDECK has configured. It launches through Steam shortcuts, so anything added to Steam library is launchable.

**Does Zaparoo work in Game Mode?**

Yes. The service runs in the background and launches games from Game Mode. You do not need to switch to Desktop Mode for normal scanning to work.

**Does Zaparoo survive SteamOS updates?**

SteamOS updates can reset the system root, but Zaparoo is installed user-locally and the service should survive updates without needing reinstallation.
