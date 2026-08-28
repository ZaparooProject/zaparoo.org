---
description: "Install Zaparoo on Windows: system tray app with support for Steam, LaunchBox, Big Box, and custom game launchers."
keywords: [zaparoo windows, nfc game launcher windows, zaparoo launchbox, zaparoo big box, zaparoo steam windows]
---

# Windows

:::warning[Beta]
Windows support is currently in beta. Some features may not work as expected.
:::

Zaparoo Core on Windows runs in the system tray and supports Steam, LaunchBox, Big Box, and custom launcher configurations.

## File paths

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

Once running, use the [Zaparoo App](/docs/app/) on your phone or the built-in web UI to manage your setup and write tokens.

## Uninstall

Open **Windows Settings > Apps > Installed apps**, find **Zaparoo Core**, and select **Uninstall**. This removes the installed application but leaves your Core configuration and user data under `%localappdata%\zaparoo`.

## Updates

Core checks for new releases on its own and can install them in place when it is able to write to its install folder; when it cannot, the notice says to run the Windows installer again. See [Core updates](../../core/updates.md).

## System tray

Right-click the Zaparoo icon in the system tray to access the following options:

| Menu Item | Description |
|-----------|-------------|
| Open | Opens the Zaparoo web UI in your browser |
| Address | Shows the local IP address and copies it to clipboard |
| Edit Config | Opens `config.toml` in your default text editor |
| Mappings | Opens the mappings directory in Explorer |
| Launchers | Opens the custom launchers directory in Explorer |
| Reload | Reloads Core settings and files without restarting |
| View Log | Opens the log file for troubleshooting |
| Quit | Stops the Zaparoo service and exits |

## Readers

| Type | Reader | Support | Setup | Notes |
| ---- | ------ | ------- | ----- | ----- |
| NFC/RFID | [PN532 USB](../../readers/nfc/pn532-usb.md) | Supported | Auto-detected |  |
| NFC/RFID | [PN532 Module](../../readers/nfc/pn532-module.md) | Supported | Depends on wiring | UART can auto-detect. I2C is supported. |
| NFC/RFID | [ACR122U](../../readers/nfc/acr122u.md) | Limited | Auto-detected | Can scan tags, but cannot write them through PCSC. |
| NFC/RFID | [RC522](../../readers/nfc/rc522.md) | Limited | Via Simple Serial | Requires a microcontroller; not a direct USB reader. |
| Barcode and QR | [Zaparoo App camera](../../app/index.md) | Supported | Via Zaparoo App |  |
| Barcode and QR | [RS-232 scanner](../../readers/barcode/rs232.md) | Supported | Manual config |  |
| Optical and Media | [Optical Drive](../../readers/optical-drive.md) | Not supported |  | Linux only |
| Optical and Media | [External Drive](../../readers/external-drive.md) | Supported | Manual enable |  |
| Custom and Virtual | [MQTT Reader](../../readers/mqtt.md) | Supported | Manual config |  |
| Custom and Virtual | [Simple Serial](../../readers/simple-serial.md) | Supported | Manual config |  |
| Custom and Virtual | [File Reader](../../readers/file.md) | Supported | Manual config |  |
| Displays and Integrations | [TTY2OLED](../../readers/tty2oled.md) | Supported | Manual enable |  |

Each reader's page has setup steps and troubleshooting. See [readers](../../readers/index.md) to compare them, or the [setup guide](/start/) to pick one for your setup.

## Launchers

| Launcher | Systems | Notes |
|----------|---------|-------|
| Steam | PC | Auto-detected from registry |
| LaunchBox / Big Box | 100+ | Both interfaces use the same required plugin |
| RetroBat | 80+ | Auto-detected, requires running with web API enabled |
| Flashpoint | PC | Manual token creation |
| Kodi | Video, Music | Local files and library media |
| Web Browser | Any | Opens URLs in default browser |
| Executables | Any | `.exe` files (requires allow list) |
| Scripts | Any | `.bat`, `.cmd`, `.lnk`, `.a3x`, `.ahk` (requires allow list) |

Executables and Scripts require an `allow_file` configuration in your `config.toml` before they can be launched. See [Launchers](./launchers.md) for setup instructions and configuration.

## Troubleshooting

**Core stops applying settings after you edit `config.toml`.** One syntax error makes Core ignore the whole file. Open it from the tray menu (**Edit Config**), check it against the [config reference](../../core/config.md), and remember that backslashes in Windows paths must be escaped or written in single-quoted strings.

**Core is not running.** Start `Zaparoo.exe`; it lives in the system tray. Use **View Log** in the tray menu to see why it stopped.

**A reader is not detected.** Some PN532 USB readers need a USB serial driver on Windows. See the [PN532 USB](../../readers/nfc/pn532-usb.md) page.

**Steam or LaunchBox games do not launch.** See [Windows launchers](./launchers.md) for the required setup for each launcher.
