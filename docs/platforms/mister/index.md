---
description: "Install and configure Zaparoo on MiSTer FPGA: the platform where Zaparoo started. Includes NFC reader setup, file paths, and MiSTer-specific ZapScript commands."
keywords: [zaparoo mister fpga, mister nfc, mister fpga nfc reader, zaparoo mister install, nfc mister fpga]
---

# MiSTer FPGA

MiSTer is fully supported by Zaparoo and is where the project originally started. Zaparoo has several MiSTer-exclusive features because of this, including [MiSTer-specific ZapScript commands](../../zapscript/mister.md).

## File Paths

| Item               | Path                             |
| ------------------ | -------------------------------- |
| Config file        | `/media/fat/zaparoo/config.toml` |
| Data directory     | `/media/fat/zaparoo`             |
| Log file           | `/tmp/zaparoo/core.log`          |
| Mappings directory | `/media/fat/zaparoo/mappings`    |

The `/media/fat` directory is the top level of the SD card. The `/tmp` directory is not accessible from the SD card and is deleted when MiSTer is powered off.

## Install

Zaparoo Core is available in [Update All](https://github.com/theypsilon/Update_All_MiSTer) by enabling the `MiSTer Extensions` repository in the `Tools & Scripts` menu.

Alternatively, add this to your `downloader.ini`:

```ini
[mrext/tapto]
db_url = https://github.com/ZaparooProject/zaparoo-core/raw/main/scripts/mister/repo/tapto.json
```

Once installed, run `zaparoo` from the MiSTer `Scripts` menu. A prompt will offer to enable Zaparoo as a startup service.

For manual installation, download from the [Downloads page](/downloads/) and copy `zaparoo.sh` to the `Scripts` folder on your SD card.

:::info Upgrading from TapTo?
If you previously had TapTo installed, make sure the old `tapto.sh` is removed from your Scripts folder and that `linux/user-startup.sh` no longer references it. Having both services running simultaneously can cause double-launches and detection conflicts. Zaparoo is a direct replacement. Your existing NFC cards will continue to work.
:::

### Game Tracking

Zaparoo can detect games launched outside of Zaparoo, like games started directly from the MiSTer menu. This is needed for [playtime tracking](../../features/playtime.md) to work correctly. It requires the `recents` setting in MiSTer's configuration.

To enable it:

1. Open `MiSTer.ini` on your SD card (located at `/media/fat/MiSTer.ini`)
2. Look for a `recents=` line. If it exists, change it to `recents=1`. If there's no `recents` line, add `recents=1` to the file.
3. Save the file and reboot MiSTer

This setting makes MiSTer write recent game data to the SD card each time a game is loaded. MiSTer.ini warns about the extra SD card writes, but it's not a real concern with modern SD cards.

## Readers

<ReaderSupport
  groups={[
    {
      name: "NFC/RFID",
      readers: [
        { name: "PN532 USB", href: "../../readers/nfc/pn532-usb", support: "supported", setup: "Auto-detected" },
        { name: "PN532 Module", href: "../../readers/nfc/pn532-module", support: "supported", setup: "Depends on wiring", note: "UART and I2C can auto-detect." },
        { name: "ACR122U", href: "../../readers/nfc/acr122u", support: "supported", setup: "Auto-detected", note: "Uses libnfc: LED and beeper do not work, and some clone variants are incompatible." },
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
        { name: "Optical Drive", href: "../../readers/optical-drive", support: "supported", setup: "Manual config" },
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

MiSTer supports 100+ systems including consoles, computers, and arcade games. Games launch automatically using the official core folder structure from Downloader.

See [Launchers](./launchers.md) for the full list of supported systems, file extensions, special features, and alternate cores.

## Main Forks

Some MiSTer Main forks are available with Zaparoo integration or features that work well with Zaparoo.

### spark2k06

An alternative version of MiSTer Main by [spark2k06](https://aitorgomez.net/) adds many Zaparoo-related features:

- Show status of connected reader as icon in top bar
- Zaparoo standby screen
- Box art on game load
- Many additional MGL features

See [spark2k06's repository](https://github.com/spark2k06/Main_MiSTer) for more details.

### Insert-Coin

An alternative version of MiSTer Main by [funkycochise](https://github.com/funkycochise) as part of the [Insert-Coin project](https://github.com/funkycochise/Insert-Coin). This version hides the loading screen before cores start games, which works great with Zaparoo.

## Known Issues

- Zaparoo can have conflicts with other devices that use serial USB connections such as the tty2oled project and anything else using an Arduino board. The workaround is to disable auto_detect in the config.toml file and manually set the reader path.

## FAQ

**Which NFC reader should I use with MiSTer?**

The [PN532 USB](../../readers/nfc/pn532-usb.md) reader is the recommended choice. It works out of the box with no configuration required. The [ACR122U](../../readers/nfc/acr122u.md) is also supported on MiSTer but is more prone to clone compatibility issues.

**Do I need the app to use Zaparoo on MiSTer?**

No. Once Zaparoo Core is installed, you can write tokens using the built-in TUI from the Scripts menu or the Web UI. The Zaparoo App makes things easier but is not required.

**Will Zaparoo work with SNAC or through a USB hub?**

Do not plug NFC readers into the SNAC/USER port on MiSTer. It looks like USB but it's not. Use a standard USB port or hub instead. USB hubs are fine!

**Do my existing TapTo NFC cards work after upgrading to Zaparoo?**

Yes. Zaparoo is a direct replacement for TapTo and all existing cards continue to work without being rewritten.
