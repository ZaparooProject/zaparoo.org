# Batocera

:::warning

Batocera support is still in beta. The Zaparoo App and most hardware is supported, but launching media is done via shell scripts until proper launcher support is added.

:::

| Item               | Path                                             |
| ------------------ | ------------------------------------------------ |
| Data directory     | `/userdata/system/.local/share/zaparoo`          |
| Mappings directory | `/userdata/system/.local/share/zaparoo/mappings` |
| Config file        | `/userdata/system/.config/zaparoo/config.toml`   |
| Log file           | `/tmp/<session_id>-zaparoo/core.log`             |

## Install

Download Zaparoo Core for Batocera from the [Downloads page](/downloads/), unzip it and copy
the `zaparoo` file somewhere like the home directory. This guide assumes you copied it to the home directory, replace paths in the examples if that's not the case.

:::tip

Not familiar with SSH? Batocera has an [SSH guide](https://wiki.batocera.org/access_the_batocera_via_ssh) that explains how to enable SSH and connect to it.

:::

SSH into your device and go to the directory where you copied the `zaparoo` file:

```bash
cd $HOME
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

Or just by adding the `zaparoo` file to your startup applications, depending on your desktop environment.

From this point, Zaparoo should be running and the App should connect to your device. You can now connect a reader and set up cards using the Zaparoo App.

If you want to undo the changes performed by the install command, you can run the uninstall command:

```bash
./zaparoo -uninstall
```

## Launchers

Currently, you must use shell scripts to launch media on Linux. See the [Linux page](/platforms/linux/#launchers) for more information on how to set up launchers this way.
