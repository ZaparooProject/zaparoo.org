# MiSTeX

MiSTeX is fully supported by Zaparoo as a platform, and is identical to [MiSTer](mister.md) in terms of functionality and features. The only difference is in how Zaparoo is installed.

| Item               | Path                             |
| ------------------ | -------------------------------- |
| Data directory     | `/media/fat/zaparoo`             |
| Mappings directory | `/media/fat/zaparoo/mappings`    |
| Config file        | `/media/fat/zaparoo/config.toml` |
| Log file           | `/tmp/zaparoo/core.log`          |

<small>_The `/media/fat` directory is the top level of the SD card._</small><br />
<small>_The `/tmp` directory is not accessible from the SD card and is deleted when MiSTeX is powered off._</small>

## Install

Unlike MiSTer, MiSTeX does not have Update All or download scripts available. You must install Zaparoo manually:

1. Download Zaparoo Core for MiSTeX from the [Downloads page](/downloads/)
2. Copy the `zaparoo.sh` file to the `Scripts` folder on your MiSTeX's SD card
3. Run `zaparoo` from the MiSTeX `Scripts` menu
4. A prompt will offer to enable Zaparoo as a startup service
5. The service will be started in the background

After the initial setup is complete, a status display will be shown. It's OK to exit this screen, the service will continue to run in the background.

From this point, Zaparoo is now set up! You should be able to connect a reader and set up cards using the Zaparoo App.

:::warning

Using FileZilla to transfer the file? Make sure _binary transfer mode_ is enabled by following [these steps](https://oryon.net/knowledge-base/article/how-to-change-filezilla-ftp-program-to-binary-transfer/). FileZilla incorrectly detects `zaparoo.sh` as a text file and will corrupt it, resulting in confusing errors.

:::

## Launchers

All launchers supported by MiSTer are also supported by MiSTeX. See the [MiSTer launchers section](mister.md#launchers) for more information.
