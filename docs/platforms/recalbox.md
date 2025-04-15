# Recalbox

:::warning

Recalbox support is still in beta. The Zaparoo App and most hardware is supported, but launching media is done via shell scripts until proper launcher support is added.

:::

| Item               | Path                                                 |
| ------------------ | ---------------------------------------------------- |
| Data directory     | `/recalbox/share/zaparoo`                            |
| Mappings directory | `/recalbox/share/zaparoo/mappings`                   |
| Config file        | `/recalbox/share/system/configs/zaparoo/config.toml` |
| Log file           | `/tmp/<session_id>-zaparoo/core.log`                 |

## Install

Download Zaparoo Core for Linux from the [Downloads page](/downloads/), unzip it and copy
the `zaparoo` file to `/recalbox/share/system/bin`. This guide assumes you copied it to this location.

:::tip

Recalbox is a console-focused Linux distribution, so you'll need to use SSH for installation. You can enable SSH in the Recalbox settings menu under Network > SSH Server. The default credentials are (username: `root`, password: `recalboxroot`).

:::

SSH into your device and go to the directory where you copied the `zaparoo` file:

```bash
cd /recalbox/share/system/bin
```

Run the install command in Zaparoo:

```bash
./zaparoo -install
```

:::info

This command does the following:

- Creates a udev rule allowing users to read NFC reader serial devices.
- Creates a modprobe blacklist entry to fix a bug stopping ACR122U readers from working.
- Creates a user systemd service to run Zaparoo in the background.

:::

Start the Zaparoo service by either using the systemd service:

```bash
systemctl --user enable zaparoo.service
systemctl --user start zaparoo.service
```

Or just by adding the `zaparoo` file to your startup applications.

From this point, Zaparoo should be running and the App should connect to your device. You can now connect a reader and set up cards using the Zaparoo App.

If you want to undo the changes performed by the install command, you can run the uninstall command:

```bash
./zaparoo -uninstall
```

## Launchers

Currently, you must use shell scripts to launch media on Linux. See the [Linux page](/platforms/linux/#launchers) for more information on how to set up launchers this way.
