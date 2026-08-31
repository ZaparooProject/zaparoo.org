---
description: "Install and configure Zaparoo on MiSTer FPGA: the platform where Zaparoo started. Includes NFC reader setup, file paths, and MiSTer-specific ZapScript commands."
keywords: [zaparoo mister fpga, mister nfc, mister fpga nfc reader, zaparoo mister install, nfc mister fpga]
---

# MiSTer FPGA

MiSTer is fully supported by Zaparoo and is where the project originally started. Zaparoo has several MiSTer-exclusive features because of this, including [MiSTer-specific ZapScript commands](../../zapscript/mister.md).

## File paths

| Item               | Path                             |
| ------------------ | -------------------------------- |
| Config file        | `/media/fat/zaparoo/config.toml` |
| Data directory     | `/media/fat/zaparoo`             |
| Log file           | `/tmp/zaparoo/core.log`          |
| Mappings directory | `/media/fat/zaparoo/mappings`    |

The `/media/fat` directory is the top level of the SD card. The `/tmp` directory is not accessible from the SD card and is deleted when MiSTer is powered off.

## Install

Zaparoo is available in [Update All](https://github.com/theypsilon/Update_All_MiSTer) as a dedicated item in **Tools & Scripts**. Update All can install Zaparoo Core and can also enable [Zaparoo Frontend](../../frontend/) in your `MiSTer.ini` file. Frontend is optional; Core can run in the background with the standard MiSTer menu.

Once Core is installed, run `zaparoo` from the MiSTer `Scripts` menu. A prompt will offer to enable Zaparoo as a startup service. That service starts at the end of MiSTer's boot; see [start Core earlier](#start-core-earlier) if you want it ready sooner after power on.

For manual Core installation, download from the [Downloads page](/downloads/) and copy `zaparoo.sh` to the `Scripts` folder on your SD card.

When Update All installed Core, it also updates it; a `zaparoo.sh` you copied by hand can update itself. See [Core updates](../../core/updates.md). Update All can also install artwork and game manual packs that Core imports with the [mister-docs scraper](../../features/scraping.md#mister-docs).

:::info Upgrading from TapTo?
If you previously had TapTo installed, make sure the old `tapto.sh` is removed from your Scripts folder and that `linux/user-startup.sh` no longer references it. Having both services running simultaneously can cause double-launches and detection conflicts. Zaparoo is a direct replacement. Your existing NFC cards will continue to work.
:::

### Game tracking

Zaparoo can detect games launched outside of Zaparoo, like games started directly from the MiSTer menu. This is needed for [playtime tracking](../../features/play-controls.md#playtime-limits) to work correctly. Enable the `recents` and `log_file_entry` settings in MiSTer's configuration for the most accurate tracking.

To enable them:

1. Open `MiSTer.ini` on your SD card (located at `/media/fat/MiSTer.ini`)
2. Look for a `recents=` line. If it exists, change it to `recents=1`. If there's no `recents` line, add `recents=1` to the file.
3. Look for a `log_file_entry=` line and set it to `log_file_entry=1`. Add the line if it isn't already present.
4. Save the file and reboot MiSTer

The `recents` setting records recently launched games. `log_file_entry` records the filename selected in MiSTer's file browser, which lets Zaparoo match a MiSTer launch to a specific game. MiSTer.ini warns about the extra SD card writes from `recents`, but it's not a real concern with modern SD cards.

### Start Core earlier

Core is started by `/media/fat/linux/user-startup.sh`, which MiSTer runs last during boot, after networking, Bluetooth and Samba. The menu appears before that finishes, so for a short while after power on a scanned token does nothing. Two ways to start Core sooner:

- Install [Zaparoo Frontend](../../frontend/setup.mdx). Frontend starts Core itself as soon as it launches, before the rest of the boot sequence finishes, and there is nothing extra to maintain.
- Add an init script. Over SSH, create `/etc/init.d/S11zaparoo` with the contents below, make it executable with `chmod +x /etc/init.d/S11zaparoo`, and reboot. It runs early in the init sequence instead of at the end. The file lives inside `linux/linux.img`, so a MiSTer Linux update removes it and you need to add it again. Leave the `mrext/zaparoo` line in `user-startup.sh` alone: starting the service twice is harmless, and that line is what keeps Core starting once the script is gone.

```sh
#!/bin/sh
# Start Zaparoo Core early in MiSTer's boot. Lives inside linux.img, so
# add it again after a MiSTer Linux update.
ZAPAROO=/media/fat/Scripts/zaparoo.sh
[ -x "$ZAPAROO" ] || exit 0
case "$1" in
  start|stop|restart|status) "$ZAPAROO" -service "$1" ;;
esac
```

## Uninstall

There is no uninstall command on MiSTer. To remove Zaparoo:

1. Delete `/media/fat/Scripts/zaparoo.sh`.
2. Remove the `mrext/zaparoo` line from `/media/fat/linux/user-startup.sh`.
3. Delete `/media/fat/zaparoo` if you also want to remove your configuration, mappings, and data.

## Device profile data

[Device profiles](../../features/profiles.md) automatically separate save files and save states on MiSTer. Existing saves remain under the shared profile, while each personal profile gets separate directories in the active storage location. When odelot's custom RetroAchievements Main is installed, Core can also switch account configuration with each profile.

## Device backups

MiSTer supports portable [device backups](../../features/backups.md) containing Zaparoo data, MiSTer settings, input mappings, saves, save states, profile-specific save directories, shared-profile saves and settings, `names.txt`, the legacy mappings file, and the profile name file. Create local backups from the Core terminal UI, or link Zaparoo Online for cloud snapshots and scheduling.

## Readers

| Type | Reader | Support | Setup | Notes |
| ---- | ------ | ------- | ----- | ----- |
| NFC/RFID | [PN532 USB](../../readers/nfc/pn532-usb.md) | Supported | Auto-detected |  |
| NFC/RFID | [PN532 Module](../../readers/nfc/pn532-module.md) | Supported | Depends on wiring | UART can auto-detect. I2C is supported. |
| NFC/RFID | [ACR122U](../../readers/nfc/acr122u.md) | Supported | Auto-detected | Uses libnfc: LED and beeper do not work, and some clone variants are incompatible. |
| NFC/RFID | [RC522](../../readers/nfc/rc522.md) | Limited | Via Simple Serial | Requires a microcontroller; not a direct USB reader. |
| Barcode and QR | [Zaparoo App camera](../../app/index.md) | Supported | Via Zaparoo App |  |
| Barcode and QR | [RS-232 scanner](../../readers/barcode/rs232.md) | Supported | Manual config |  |
| Optical and Media | [Optical Drive](../../readers/optical-drive.md) | Supported | Manual config |  |
| Optical and Media | [External Drive](../../readers/external-drive.md) | Supported | Manual enable |  |
| Custom and Virtual | [MQTT Reader](../../readers/mqtt.md) | Supported | Manual config |  |
| Custom and Virtual | [Simple Serial](../../readers/simple-serial.md) | Supported | Manual config |  |
| Custom and Virtual | [File Reader](../../readers/file.md) | Supported | Manual config |  |
| Displays and Integrations | [TTY2OLED](../../readers/tty2oled.md) | Supported | Manual enable |  |

Each reader's page has setup steps and troubleshooting. See [readers](../../readers/index.md) to compare them, or the [setup guide](/start/) to pick one for your setup.

## Launchers

MiSTer supports 100+ systems including consoles, computers, and arcade games. Games launch automatically using the official core folder structure from Downloader.

See [Launchers](./launchers.md) for the full list of supported systems, file extensions, special features, and alternate cores.

## Main forks

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

## Troubleshooting

**Zaparoo does not start at boot.** Run `zaparoo` from the MiSTer **Scripts** menu and accept the prompt to enable it as a startup service, or check that `/media/fat/linux/user-startup.sh` contains the `mrext/zaparoo` line.

**Tokens do nothing for a while after power on.** Core is started last in MiSTer's boot sequence, so it can lag behind the menu appearing. See [start Core earlier](#start-core-earlier).

**Games started from the MiSTer menu are not tracked.** Playtime tracking needs `recents=1` and `log_file_entry=1` in `MiSTer.ini`. See [game tracking](#game-tracking).

**A reader is detected by the wrong driver, or conflicts with another serial device.** Other USB serial devices, such as tty2oled or an Arduino, can confuse auto-detection. Disable `auto_detect` in `config.toml` and set the reader path manually; see [reader drivers](../../readers/drivers.md).

**Logs are empty after a reboot.** MiSTer keeps the log in `/tmp`, which is cleared at shutdown. Collect logs right after the problem happens; see the [help page](/support/).

## FAQ

**Which NFC reader should I use with MiSTer?**

The [PN532 USB](../../readers/nfc/pn532-usb.md) reader is the recommended choice. It works out of the box with no configuration required. The [ACR122U](../../readers/nfc/acr122u.md) is also supported on MiSTer but is more prone to clone compatibility issues.

**Do I need the app to use Zaparoo on MiSTer?**

No. Once Zaparoo Core is installed, you can write tokens using the built-in TUI from the Scripts menu or the Web UI. The Zaparoo App makes things easier but is not required.

**Do I have to use Zaparoo Frontend?**

No. Core runs as a background service and can scan tokens while you continue using the standard MiSTer menu. Frontend is an optional controller-friendly library interface. The App and Web UI are also optional ways to manage Core.

**Will Zaparoo work with SNAC or through a USB hub?**

Do not plug NFC readers into the SNAC/USER port on MiSTer. It looks like USB but it's not. Use a standard USB port or hub instead. USB hubs are fine!

**Do my existing TapTo NFC cards work after upgrading to Zaparoo?**

Yes. Zaparoo is a direct replacement for TapTo and all existing cards continue to work without being rewritten.
