# SteamOS

:::warning

SteamOS support is still in beta. Steam launching works, but EmuDeck support is still in progress and Zaparoo must be installed manually. We are looking for help with Decky Loader support, so if you're interested in contributing, please [get in touch](https://zaparoo.org/discord)!

:::

| Item               | Path                                       |
| ------------------ | ------------------------------------------ |
| Data directory     | `/home/deck/.local/share/zaparoo`          |
| Mappings directory | `/home/deck/.local/share/zaparoo/mappings` |
| Config file        | `/home/deck/.config/zaparoo/config.toml`   |
| Log file           | `/tmp/zaparoo/core.log`                    |

<small>_Assuming the default `deck` account._</small>

## Install

In Desktop Mode, download Zaparoo Core for SteamOS from the [Downloads page](/downloads/), unzip and copy
the `zaparoo` file somewhere on your Steam Deck like the home directory or the desktop.

We'll assume you copied the `zaparoo` file to your home folder and you're using the default `deck` account. Replace paths in the examples if that's not the case.

Open the Konsole terminal application and go to the directory where you copied the `zaparoo` file:

```bash
cd /home/deck
```

:::warning

If you've never used sudo on your Deck before, you'll also need to set an account password first. Before running the install command, run `passwd` and set a password for your account. You can then use that password with sudo.

:::

Run the install command in Zaparoo:

```bash
sudo ./zaparoo -install
```

Start the Zaparoo service:

```bash
sudo systemctl start zaparoo.service
```

You can also enable the service to start automatically on boot:

```bash
sudo systemctl enable zaparoo.service
```

From this point, Zaparoo should be running and the App should connect to your Steam Deck. You can now connect a reader and set up cards using the Zaparoo App.

If you want to undo the changes performed by the install command, you can run the uninstall command:

```bash
sudo ./zaparoo -uninstall
```

## Supported Readers

| Reader                                          | Status |
|-------------------------------------------------|--------|
| [PN532](../readers/nfc/pn532-usb.md)               | ✅      |
| [ACR122U](../readers/nfc/acr122u.md)       | ✅      |
| [File Reader](../readers/file.md)          | ✅      |
| [Simple Serial](../readers/simple-serial.md) | ✅      |
| [Optical Drive](../readers/optical-drive.md) | ✅      |
| [TTY2OLED](../readers/tty2oled.md)         | ✅      |

## Supported Launchers

| Launcher | Systems/Extensions | Notes |
|----------|-------------------|-------|
| Steam | PC games | Automatic detection of Steam library |
| Custom Scripts | `.sh` files | Shell script execution |

## Launchers

Zaparoo supports the Steam launcher. Games installed through Steam will be automatically detected and added to the App. You can also manually add a Steam game by writing `steam://<game_id>` to a card, where `<game_id>` is the Steam ID of the game you want to launch.

## Known Issues

- Install an update requires the Zaparoo service to be stopped. If you try to update while the service is running, it will fail with a permission error. You can stop the service with `sudo systemctl stop zaparoo.service` and start it again after the update.
- Sometimes readers can stop working when waking from sleep mode. They should work again by unplugging and replugging the reader.
