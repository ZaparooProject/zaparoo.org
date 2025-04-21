# Batocera

| Location | Path                                                                                                           |
| -------- | -------------------------------------------------------------------------------------------------------------- |
| Config   | `/userdata/system/.config/zaparoo/config.toml` <br/> `\\BATOCERA\SHARE\system\.config\zaparoo\config.toml`     |
| Log      | `/userdata/system/.local/share/core.log` <br/> `\\BATOCERA\SHARE\system\.local\share\core.log`                 |
| Mappings | `/userdata/system/.local/share/zaparoo/mappings` <br/> `\\BATOCERA\SHARE\system\.local\share\zaparoo\mappings` |

## Install

Download Zaparoo Core for Batocera from the [Downloads page](/downloads/) and unzip it. It comes with two important files:

- `zaparoo` - The main Zaparoo Core executable.
- `zaparoo_service` - A service script that runs Zaparoo Core on startup.

From here, there are a few ways to transfer files to your Batocera device.

:::tip
Batocera has a guide available on [copying files](https://wiki.batocera.org/add_games_bios#accessing_batocera_s_drive_to_add_files) if you're unsure about anything here.
:::

:::info
If you want to put the `zaparoo` file in a different location, you must also update the `zaparoo_service` file to reflect this. The default location is `/userdata/system/zaparoo`.
:::

### Network Share

1. Copy the `zaparoo` file into the `system` directory of your Batocera share. This is usually accessible at `\\BATOCERA\share\system` on Windows.
2. If it doesn't exist, create a new directory in the `system` directory called `services`.
3. Copy the `zaparoo_services` file into the `services` directory.
4. Enable the service:
   1. Press `Start` to open the main menu.
   2. Navigate to `System Settings` > `Services` (at the bottom in the _Advanced_ section).
   3. Find `zaparoo_service` in the list and enable it.
5. Restart Batocera to start the Zaparoo service.

### USB

1. Copy the `zaparoo` and `zaparoo_service` files to a USB drive and plug it into your Batocera device.
2. Press `F1` to open the file manager and navigate to the USB drive.
3. Copy the `zaparoo` file into the `/userdata/system` directory.
4. If it doesn't exist, create a new directory in the `system` directory called `services`.
5. Copy the `zaparoo_service` file into the `services` directory.
6. Enable the service:
   1. Press `Start` to open the main menu.
   2. Navigate to `System Settings` > `Services` (at the bottom in the _Advanced_ section).
   3. Find `zaparoo_service` in the list and enable it.
7. Restart Batocera to start the Zaparoo service.

### SSH

:::tip
Not familiar with SSH? Batocera also has an [SSH guide](https://wiki.batocera.org/access_the_batocera_via_ssh) that explains how to connect and use it. The default username is `root` and the password is `linux`.
:::

1. Copy the `zaparoo` file into `/userdata/system` using a program like `scp` or [WinSCP](https://winscp.net/eng/download.php).
2. SSH into your device and make sure you're in the `/userdata/system` directory:

```bash
cd /userdata/system
```

3. Run the install command, to copy and setup the service script automatically:

```bash
./zaparoo -install
```

4. Enable the Zaparoo service:

```bash
batocera-service enable zaparoo_service
```

5. Start the Zaparoo service:

```bash
batocera-service start zaparoo_service
```

### Finishing Up

From this point, the service should be running and you can follow all other guides as normal. The [Zaparoo App](/docs/app/) will connect using the Batocera device's IP address, which you can find in the Batocera main menu under `Network Settings`.

## Readers

| Reader                                          | Status |
| ----------------------------------------------- | ------ |
| [PN532 USB](/docs/readers/nfc/pn532-usb.md)     | ✅     |
| [PN532 I2C](/docs/readers/nfc/pn532-module.md)  | ✅     |
| [ACR122U](/docs/readers/nfc/acr122u.md)         | ✅     |
| [Optical drive](/docs/readers/optical-drive.md) | ✅     |

## Launchers

Most systems supported by Batocera are also supported by Zaparoo. Either use the [Zaparoo App](/docs/app/) to search for games and write them to cards, or write the absolute path to the game on the card.

Zaparoo also supports launching custom shell scripts. See the [Linux page](./linux.mdx#launchers) for more information on how to set up launchers this way.

## Known Issues

- Some launchers and systems are still missing supported and will be added in the future. These are mostly esoteric systems.
- The picker menu feature is not currently supported on this platform.
