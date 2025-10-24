# LibreELEC

:::warning

LibreELEC support is still in beta. Launching and readers are supported, but there's still manual setup to make it work.

:::

:::info

The LibreELEC version of Zaparoo Core also works on [CoreELEC](https://coreelec.org/) without changes and will probably also work on any other Linux OS based around [Kodi](https://kodi.tv/).

:::

| Item               | Path                                     |
|--------------------|------------------------------------------|
| Data directory     | `/storage/.local/share/zaparoo`          |
| Mappings directory | `/storage/.local/share/zaparoo/mappings` |
| Config file        | `/storage/.config/zaparoo/config.toml`   |
| Log file           | `/tmp/zaparoo/core.log`                  |

<small>The config file can be accessed through the SMB share in the `Configfile` folder.</small>

## Install

Download Zaparoo Core for LibreELEC from the [Downloads page](/downloads/), unzip it and copy
the `zaparoo` file to `/storage`. This guide assumes you copied it to this location but it can be run from anywhere.

:::tip

LibreELEC is a minimal Linux distribution, so you'll need to use SSH for installation. You can enable SSH in the LibreELEC settings menu under Services > SSH Server. The default credentials are (username: `root`, password: `libreelec`).

:::

SSH into your device and go to the directory where you copied the `zaparoo` file:

```bash
cd /storage
```

Start the Zaparoo service:

```bash
./zaparoo -service start
```

At this point Core will be running and can be accessed via the Zaparoo App, but you'll need to make one more change to give it access to control Kodi.

From the main Kodi UI:

1. Open the `Settings` page.
2. Open the `Services` page.
3. At the bottom of the menu, change the view setting to at least `Standard`.
4. Open the newly revealed `Control` page.
5. Enable `Allow remote control via HTTP`.
6. Set a blank password.
7. Make sure `Allow remote control from applications on this system` is enabled.

Now you should be able to update the media database in Core and launch media.

### Adding to Startup

To run Core automatically on device startup, you will need to add it to the `autostart.sh` file. See the [LibreELEC wiki](https://wiki.libreelec.tv/configuration/startup-shutdown) for details.

From the SSH shell, open the file for editing:

`nano /storage/.config/autostart.sh`

Add the following line:

`/storage/zaparoo -service start`

Press `Ctrl-X` and then `Y` to save and exit.

Now when your device starts, Zaparoo Core should also start automatically.

## Supported Readers

| Reader                                          | Status |
|-------------------------------------------------|--------|
| [PN532](/docs/readers/nfc/pn532-usb)               | ✅      |
| [ACR122U](/docs/readers/nfc/acr122u)       | ✅      |
| [File Reader](/docs/readers/file)          | ✅      |
| [Simple Serial](/docs/readers/simple-serial) | ✅      |
| [Optical Drive](/docs/readers/optical-drive) | ✅      |
| [TTY2OLED](/docs/readers/tty2oled)         | ✅      |

## Supported Launchers

| Launcher | Extensions/Types | Notes |
|----------|-----------------|-------|
| Kodi Local | Local video files | Launches local media files through Kodi |
| Kodi Movie | Movies from Kodi library | Launches movies indexed in Kodi |
| Kodi TV | TV shows from Kodi library | Launches TV shows indexed in Kodi |
| Kodi Music | Music from Kodi library | Plays music indexed in Kodi |
| Kodi Song | Individual songs | Plays specific songs from Kodi |
| Kodi Album | Music albums | Plays complete albums from Kodi |
| Kodi Artist | Artist collections | Plays all songs by an artist |
| Kodi TVShow | TV show series | Launches TV show series from Kodi |
| Generic | `.sh` | Shell script execution |

If setup was done correctly, Core will automatically pick up and support all movies and TV shows indexed in Kodi. Local files are also supported in the `/storage/videos` and `/storage/tvshows` folders.

Running shell scripts is also supported. See the [Linux page](./linux.mdx#supported-launchers) for more information on how to use this.
