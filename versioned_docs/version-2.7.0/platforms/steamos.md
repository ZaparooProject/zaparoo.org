# SteamOS

:::warning
SteamOS support is in beta. Steam launching works, but EmuDeck support is in progress. Manual installation required.
:::

Zaparoo Core on SteamOS supports Steam game launching from your Steam Deck library.

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

All [readers](../readers/index.md) are supported. Platform notes:

- Readers may stop working after waking from sleep. Unplug and replug the reader to fix.

## Launchers

| Launcher | Systems | Notes |
|----------|---------|-------|
| Steam | PC | Games and non-Steam shortcuts |
| Shell Scripts | Any | Custom `.sh` file execution |

### Steam

Launches games from your Steam library via the `steam://` URL scheme. Both official Steam games and non-Steam shortcuts added to your library are detected.

Games are indexed from:

- `~/.steam/steam/steamapps/`
- `~/.local/share/Steam/`

To manually launch a Steam game, write `steam://<app_id>` to a token. For example: `steam://1145360` for Hades.

```toml title="config.toml"
[[launchers.default]]
launcher = "Steam"
install_dir = "/custom/steam/path"  # Optional custom Steam install directory
```

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
