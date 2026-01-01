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

In Desktop Mode, download Zaparoo Core for SteamOS from the [Downloads page](/downloads/), unzip and copy the `zaparoo` file to your home directory.

Open Konsole and run:

```bash
cd /home/deck
sudo ./zaparoo -install
sudo systemctl enable zaparoo.service
sudo systemctl start zaparoo.service
```

If you've never used sudo, first run `passwd` to set an account password.

To uninstall:

```bash
sudo ./zaparoo -uninstall
```

## Readers

All [readers](../readers/index.md) are supported.

## Launchers

| Launcher   | Systems | Notes                                 |
| ---------- | ------- | ------------------------------------- |
| Steam      | PC      | Games and non-Steam shortcuts         |
| EmuDeck    | 56+     | RetroArch and standalone emulators    |
| RetroDECK  | 200+    | Unified emulator frontend             |
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
