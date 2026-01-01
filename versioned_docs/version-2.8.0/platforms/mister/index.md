# MiSTer FPGA

MiSTer is fully supported by Zaparoo and is where the project originally started. Zaparoo has several MiSTer-exclusive features because of this.

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

For manual installation, download from the [Downloads page](/downloads) and copy `zaparoo.sh` to the `Scripts` folder on your SD card.

## Readers

All [readers](../../readers/index.md) are supported. Platform notes:

- **ACR122U**: LED and beeper won't work. This is normal and indicates the correct driver is being used. Some clone variants are incompatible with MiSTer.

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
