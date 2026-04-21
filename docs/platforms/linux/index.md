---
description: "Install Zaparoo on Linux: desktop integration with Steam game launching support. Foundation for SteamOS, Bazzite, ChimeraOS, and other Linux platforms."
keywords: [zaparoo linux, linux nfc game launcher, zaparoo raspberry pi, zaparoo ubuntu, linux nfc reader]
---

# Linux

Zaparoo Core on Linux provides desktop integration with support for Steam game launching. This platform serves as the foundation for other Linux-based platforms.

## File Paths

| Item               | Path                                   |
| ------------------ | -------------------------------------- |
| Config file        | `~/.config/zaparoo/config.toml`        |
| Data directory     | `~/.local/share/zaparoo`               |
| Log file           | `~/.local/share/zaparoo/logs/core.log` |
| Mappings directory | `~/.local/share/zaparoo/mappings`      |

Where `~` is the home directory of the current user.

## Install

Open a terminal and run:

```bash
curl -fsSL https://zaparoo.org/install.sh | bash
```

This installs all necessary components and sets up the service to run on startup. Once running, use the [Zaparoo App](/docs/app/) on your phone or the built-in web UI to manage your setup and write tokens.

For manual component-based installation, see [Manual Install](./install.md).

## Readers

All [readers](../../readers/index.md) are supported.

## Launchers

| Launcher | Description |
|----------|-------------|
| Steam | Steam games and non-Steam shortcuts |
| Kodi | Movies, TV, Music (requires Kodi API) |
| Web Browser | Opens URLs in default browser |
| Shell Scripts | Custom `.sh` execution (allowlist required) |

See [Launchers](./launchers.md) for full details and configuration.
