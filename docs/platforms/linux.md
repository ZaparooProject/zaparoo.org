# Linux

Zaparoo Core on Linux provides desktop integration with support for Steam game launching. This platform serves as the foundation for other Linux-based platforms like [SteamOS](./steamos.md), with support for additional gaming distributions coming in future releases.

:::tip
This is the base of most other Linux platforms that Zaparoo supports. If you don't see your specific Linux gaming distribution listed already, there's a good chance Zaparoo will work using this version.
:::

| Item               | Path                                        |
| ------------------ | ------------------------------------------- |
| Data directory     | `~/.local/share/zaparoo`                    |
| Mappings directory | `~/.local/share/zaparoo/mappings`           |
| Config file        | `~/.config/zaparoo/config.toml`             |
| Log file           | `~/.local/share/zaparoo/logs/core.log`      |

<small>_Where `~` is the home directory of the current user._</small>

## Install

### Install Script

The easiest way to install Zaparoo on Linux is using the automated install script.

Open a terminal and run:

```bash
curl -sSL https://zaparoo.org/install.sh | sh
```

This will automatically install all necessary components and set up the service to run on startup.

From this point, Zaparoo should be running and the App should connect to your device. You can now connect a reader and set up cards using the Zaparoo App.

### Manual Install

Alternatively, you can manually install Zaparoo using component-based installation.

Download Zaparoo Core for Linux from the [Downloads page](/downloads/), unzip it and copy
the `zaparoo` file somewhere like the home directory, desktop or a bin directory like `/usr/local/bin`.

We'll assume you copied the `zaparoo` file to your home directory. Replace paths in the examples if that's not the case.

Open terminal and go to the directory where you copied the `zaparoo` file:

```bash
cd $HOME
```

Zaparoo supports component-based installation. You can install individual components or all of them:

```bash
./zaparoo -install application  # Installs the application binary
./zaparoo -install desktop      # Installs desktop integration
./zaparoo -install service      # Installs systemd service
./zaparoo -install hardware     # Installs udev rules and hardware support
```

For a complete installation, run all four install commands. The `hardware` component creates:
- A udev rule allowing users to read NFC reader serial devices
- A modprobe blacklist entry to fix a bug stopping ACR122U readers from working

Start the Zaparoo service:

```bash
systemctl --user enable zaparoo.service
systemctl --user start zaparoo.service
```

From this point, Zaparoo should be running and the App should connect to your device. You can now connect a reader and set up cards using the Zaparoo App.

To uninstall components, use the same component names:

```bash
./zaparoo -uninstall application
./zaparoo -uninstall desktop
./zaparoo -uninstall service
./zaparoo -uninstall hardware
```

## Supported Readers

| Reader                                          | Status |
|-------------------------------------------------|--------|
| [PN532 USB](../readers/nfc/pn532-usb.md)        | ✅      |
| [PN532 Module](../readers/nfc/pn532-module.md)  | ✅      |
| [ACR122U (PCSC)](../readers/nfc/acr122u.md)     | ✅      |
| [File Reader](../readers/file.md)               | ✅      |
| [Simple Serial](../readers/simple-serial.md)    | ✅      |
| [RS232 Barcode](../readers/barcode/rs232.md)    | ✅      |
| [Optical Drive](../readers/optical-drive.md)    | ✅      |
| [TTY2OLED](../readers/tty2oled.md)              | ✅      |
| [MQTT](../readers/mqtt.md)                      | ✅      |
| [External Drive](../readers/external-drive.md)  | ✅      |

## Supported Launchers

| Launcher     | Type/Extensions              | Notes                                        |
| ------------ | ---------------------------- | -------------------------------------------- |
| Steam        | Steam games                  | Launches games from Steam library            |
| Kodi Local   | Local video files            | Launches local media through Kodi            |
| Kodi Movie   | Movies from Kodi             | Launches movies indexed in Kodi              |
| Kodi TV      | TV episodes from Kodi        | Launches TV episodes indexed in Kodi         |
| Kodi Music   | Music from Kodi              | Plays music indexed in Kodi                  |
| Kodi Song    | Individual songs             | Plays specific songs from Kodi               |
| Kodi Album   | Music albums                 | Plays complete albums from Kodi              |
| Kodi Artist  | Artist collections           | Plays all songs by an artist                 |
| Kodi TVShow  | TV show series               | Launches TV show series from Kodi            |
| Web Browser  | URLs (`http://`, `https://`) | Opens URLs in default browser                |
| Generic      | `.sh`                        | Shell script execution (requires allowlist)  |

Kodi launchers require Kodi to be installed and configured. All other launchers work out of the box when the respective software is installed.

## Example: Creating a Launcher Script for an Emulator

Suppose you want to use Zaparoo to launch a game in an emulator (for example, running a NES game with the `fceux` emulator). Here’s how you can do it:

1. **Create a Shell Script**

Open your text editor and paste the following example, replacing the paths with your emulator and game:

```bash
#!/bin/bash
# Example: ~/launch_nes.sh

# Path to your emulator
EMULATOR="/usr/bin/fceux"

# Path to your game ROM
GAME="$HOME/games/nes/SuperMarioBros.nes"

# Run the emulator with the game
"$EMULATOR" "$GAME"
```

:::tip

If you’re not familiar with editing files in the terminal, you can use a graphical text editor like "Text Editor", "Gedit", or "Kate" to open and edit `~/.config/zaparoo/config.toml`.

:::

Save this as `launch_nes.sh` in your home directory.

2. **Make the Script Executable**

Open a terminal and run:

```bash
chmod +x ~/launch_nes.sh
```

3. **Add the Script to the `allow_file` Config Entry**

Open your Zaparoo config file at `~/.config/zaparoo/config.toml` in a text editor. Find or add the `allow_file` entry under the `[launchers]` section. For example:

```toml
[launchers]
allow_file = [
  "^/home/yourusername/launch_nes.sh$"
]
```

Replace `/home/yourusername/launch_nes.sh` with the full path to your script.
If you want to allow multiple scripts, add them as separate lines:

```toml
[launchers]
allow_file = [
  "^/home/yourusername/launch_nes.sh$",
  "^/home/yourusername/launch_snes.sh$",
  "^/home/yourusername/launch_psx.sh$"
]
```

4. **Restart Zaparoo**

To apply the changes, restart the Zaparoo service. In your terminal, run:

```bash
systemctl --user restart zaparoo.service
```

5. **Write the Script Path to a Card**

Now, Zaparoo can use your launcher script(s) to run games or other media!

You can write the full path to the new script to a card: `/home/yourusername/launch_nes.sh`.
