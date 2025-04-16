# Support

Please [join the Discord](https://wizzo.dev/discord) if you're having any trouble with Zaparoo and need help, or just want to show everyone what you've made!

If you're comfortable using GitHub, please report bugs to the [Zaparoo GitHub Issues](https://github.com/wizzomafizzo/tapto/issues) instead.

## How to get a log file

A log file is critical to resolving bugs in Zaparoo. As soon as you encounter a bug, please follow these steps to capture relevant information in the log file before reporting it.

### MiSTer

:::warning
The Zaparoo log file on MiSTer is deleted every time the MiSTer is turned off. Make sure to follow these steps after a bug happens and before the MiSTer is turned off.
:::

1.  Open the `zaparoo` script from the [MiSTer](../platforms/mister.md) Scripts menu.
2.  Press left and select the `Export Log` button.
3.  Then either:
    - **Upload to termbin.com**: This option uploads a copy of the log file to the website [termbin.com](https://termbin.com) and then displays a short URL where the uploaded file can be viewed. Copy this URL to show other people the log. _Please note the project has no affiliation or control over this site, if you lose the URL it can't be retrieved by us._
    - **Copy to SD card**: Makes a copy of the log from the `/tmp/zaparoo` folder to the SD card, which makes it possible to plug the SD card into a computer and copy it off manually. The log file is called `core.log` in the top level of the SD card.

### Windows

Copy the `core.log` file from the `%LOCALAPPDATA%\zaparoo` folder.
