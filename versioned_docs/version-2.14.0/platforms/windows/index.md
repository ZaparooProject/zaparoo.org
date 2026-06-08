---
description: "Install Zaparoo on Windows: system tray app with support for Steam, LaunchBox, and custom game launchers. NFC card game launching on PC."
keywords: [zaparoo windows, nfc game launcher windows, zaparoo pc, zaparoo steam windows, windows nfc reader]
---

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

Once running, use the [Zaparoo App](/docs/app/) on your phone or the built-in web UI to manage your setup and write tokens.

## System Tray

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

<ReaderSupport
  groups={[
    {
      name: "NFC/RFID",
      readers: [
        { name: "PN532 USB", href: "../../readers/nfc/pn532-usb", support: "supported", setup: "Auto-detected" },
        { name: "PN532 Module", href: "../../readers/nfc/pn532-module", support: "supported", setup: "Depends on wiring", note: "UART can auto-detect. I2C is supported." },
        { name: "ACR122U", href: "../../readers/nfc/acr122u", support: "limited", setup: "Auto-detected", note: "Can scan tags, but cannot write them through PCSC." },
        { name: "RC522", href: "../../readers/nfc/rc522", support: "limited", setup: "Via Simple Serial", note: "Requires a microcontroller; not a direct USB reader." },
      ],
    },
    {
      name: "Barcode and QR",
      readers: [
        { name: "App/Camera Scanner", href: "../../app/", support: "supported", setup: "Via Zaparoo App" },
        { name: "RS232 Scanner", href: "../../readers/barcode/rs232", support: "supported", setup: "Manual config" },
      ],
    },
    {
      name: "Optical and Media",
      readers: [
        { name: "Optical Drive", href: "../../readers/optical-drive", support: "unsupported", note: "Linux only" },
        { name: "External Drive", href: "../../readers/external-drive", support: "supported", setup: "Manual enable" },
      ],
    },
    {
      name: "Custom and Virtual",
      readers: [
        { name: "MQTT Reader", href: "../../readers/mqtt", support: "supported", setup: "Manual config" },
        { name: "Simple Serial", href: "../../readers/simple-serial", support: "supported", setup: "Manual config" },
        { name: "File Reader", href: "../../readers/file", support: "supported", setup: "Manual config" },
      ],
    },
    {
      name: "Displays and Integrations",
      readers: [
        { name: "TTY2OLED", href: "../../readers/tty2oled", support: "supported", setup: "Manual enable" },
      ],
    },
  ]}
/>

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

Executables and Scripts require an `allow_file` configuration in your `config.toml` before they can be launched. See [Launchers](./launchers.md) for setup instructions and configuration.
