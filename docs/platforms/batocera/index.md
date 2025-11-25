# Batocera

[Batocera](https://batocera.org/) is a software emulation distribution based around EmulationStation, with support for a huge number of systems and devices.

## File Paths

| Item               | Path                                             |
| ------------------ | ------------------------------------------------ |
| Config file        | `/userdata/system/.config/zaparoo/config.toml`   |
| Data directory     | `/userdata/system/.local/share/zaparoo`          |
| Log file           | `/userdata/system/.local/share/zaparoo/logs/core.log` |
| Mappings directory | `/userdata/system/.local/share/zaparoo/mappings` |

Network share paths use `\\BATOCERA\share\system\` prefix instead of `/userdata/system/`.

## Install

The easiest way to install is via SSH or in the Batocera terminal (press F1 to open the file manager, then F4 to open a terminal):

```bash
curl -fsSL https://zaparoo.org/install.sh | bash
```

This installs Zaparoo via the pacman package manager, sets up the startup service, and adds a Zaparoo entry to the Ports system.

After installation, launch Zaparoo from the Ports system in EmulationStation to access the TUI.

For manual installation methods (Network Share, USB, or SSH), see [Manual Install](./install.md).

## Readers

All [readers](../../readers/index.md) are supported.

## Supported Launchers

| Launcher         | Notes                                    |
| ---------------- | ---------------------------------------- |
| EmulationStation | 150+ systems via Batocera's emulators    |
| Kodi             | Movies, TV, Music (Kodi mode only)       |
| Shell Scripts    | Custom `.sh` file execution              |

Kodi integration only works when Batocera is in Kodi mode with the API enabled. See [LibreELEC](../libreelec.md) for API configuration details.

See [Launchers](./launchers.md) for the full list of supported systems and launcher details.
