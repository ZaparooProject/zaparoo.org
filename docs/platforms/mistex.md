# MiSTeX

MiSTeX is fully supported by Zaparoo and is identical to [MiSTer](./mister/index.md) in terms of functionality and features. The only difference is in how Zaparoo is installed.

## File Paths

| Item               | Path                             |
| ------------------ | -------------------------------- |
| Config file        | `/media/fat/zaparoo/config.toml` |
| Data directory     | `/media/fat/zaparoo`             |
| Log file           | `/tmp/zaparoo/core.log`          |
| Mappings directory | `/media/fat/zaparoo/mappings`    |

The `/media/fat` directory is the top level of the SD card. The `/tmp` directory is deleted when MiSTeX is powered off.

## Install

Download Zaparoo Core for MiSTeX from the [Downloads page](/downloads/) and copy the `zaparoo.sh` file to the `Scripts` folder on your SD card.

Run `zaparoo` from the MiSTeX `Scripts` menu. A prompt will offer to enable Zaparoo as a startup service.

:::warning
Using FileZilla? Enable binary transfer mode per [these steps](https://oryon.net/knowledge-base/article/how-to-change-filezilla-ftp-program-to-binary-transfer/). FileZilla incorrectly detects `zaparoo.sh` as text and will corrupt it.
:::

## Readers

All [readers](../readers/index.md) are supported. See [MiSTer](./mister/index.md) for platform-specific notes.

## Supported Launchers

All launchers supported by MiSTer are also supported by MiSTeX (as far as MiSTeX itself supports them):

| Launcher      | Notes                                   |
| ------------- | --------------------------------------- |
| FPGA Cores    | 100+ arcade, console, and computer systems |
| MGL Files     | MiSTer Game Loader format               |
| Shell Scripts | Custom `.sh` file execution             |

See [MiSTer Launchers](./mister/launchers.md) for the full list of supported systems.
