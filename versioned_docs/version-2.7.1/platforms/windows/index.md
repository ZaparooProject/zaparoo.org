# Windows

Zaparoo Core on Windows runs in the system tray with support for Steam, LaunchBox, and custom launcher configurations.

## File Paths

| Item               | Path                                   |
| ------------------ | -------------------------------------- |
| Config file        | `%localappdata%\zaparoo\config.toml`   |
| Data directory     | `%localappdata%\zaparoo`               |
| Log file           | `%localappdata%\zaparoo\logs\core.log` |
| Mappings directory | `%localappdata%\zaparoo\mappings`      |
| Launcher directory | `%localappdata%\zaparoo\launchers`     |

Access these paths by pasting them in Explorer's address bar or in a Win+R dialog.

## Install

Download Zaparoo Core for Windows from the [Downloads page](/downloads/).

**Installer**: Run the setup executable and follow the wizard. Options include running on startup and creating a desktop icon.

**Manual**: Extract `Zaparoo.exe` from the zip and run it. It starts in the system tray.

Right-click the system tray icon to access the web UI, logs, and exit options.

## Readers

All [readers](../../readers/index.md) are supported except Optical Drive (Linux only).

## Launchers

| Launcher | Systems | Notes |
|----------|---------|-------|
| Steam | PC | Auto-detected from registry |
| LaunchBox | 100+ | Requires plugin installation |
| RetroBat | 80+ | Auto-detected, requires running |
| Flashpoint | PC | Manual token creation |
| Kodi | Video, Music | Local files and library media |
| Web Browser | Any | Opens URLs in default browser |
| Executables | Any | `.exe` files (requires allow list) |
| Scripts | Any | `.bat`, `.cmd`, `.lnk`, `.a3x`, `.ahk` (requires allow list) |

See [Launchers](./launchers.md) for setup instructions and configuration.
