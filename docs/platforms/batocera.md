# Batocera

[Batocera](https://batocera.org/) is a software emulation distribution based around EmulationStation, with support for a huge number of systems and devices.

| Location | Path                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| Config   | `/userdata/system/.config/zaparoo/config.toml` <br/> `\\BATOCERA\SHARE\system\.config\zaparoo\config.toml`               |
| Log      | `/userdata/system/.local/share/zaparoo/logs/core.log` <br/> `\\BATOCERA\SHARE\system\.local\share\zaparoo\logs\core.log` |
| Mappings | `/userdata/system/.local/share/zaparoo/mappings` <br/> `\\BATOCERA\SHARE\system\.local\share\zaparoo\mappings`           |

## Install

### Install Script

The easiest way to install Zaparoo on Batocera is using the automated install script. This can be run either via SSH or directly in the Batocera terminal.

:::tip
Not familiar with SSH? Batocera has an [SSH guide](https://wiki.batocera.org/access_the_batocera_via_ssh) that explains how to connect and use it. The default username is `root` and the password is `linux`.
:::

Run the following command via SSH or in the Batocera terminal (press F4 to access the terminal):

```bash
curl -fsSL https://zaparoo.org/install.sh | bash
```

This will automatically:

- Install Zaparoo via the pacman package manager
- Set up the service to run on startup
- Add a Zaparoo entry to the Ports system

After installation, you can access the Zaparoo TUI by launching the Zaparoo entry from the Ports system in EmulationStation.

From this point, the service is running and you can follow all other guides as normal. The [Zaparoo App](../app/index.md) will connect using the Batocera device's IP address, which you can find in the Batocera main menu under `Network Settings`.

### Manual Install

Alternatively, you can manually install Zaparoo by downloading the files and setting them up yourself.

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

#### Network Share

1. Copy the `zaparoo` file into the `system` directory of your Batocera share. This is usually accessible at `\\BATOCERA\share\system` on Windows.
2. If it doesn't exist, create a new directory in the `system` directory called `services`.
3. Copy the `zaparoo_services` file into the `services` directory.
4. Enable the service:
   1. Press `Start` to open the main menu.
   2. Navigate to `System Settings` > `Services` (at the bottom in the _Advanced_ section).
   3. Find `zaparoo_service` in the list and enable it.
5. Restart Batocera to start the Zaparoo service.

#### USB

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

#### SSH

1. Copy the `zaparoo` file into `/userdata/system` using a program like `scp` or [WinSCP](https://winscp.net/eng/download.php).
2. SSH into your device and make sure you're in the `/userdata/system` directory:

```bash
cd /userdata/system
```

3. Run the install command, to copy and setup the service script automatically:

```bash
./zaparoo -install
```

If you get a `-bash: ./zaparoo: Permission denied` message, fix the permissions as shown below and try step 3 again.

```bash
chmod +x ./zaparoo
```

4. Enable the Zaparoo service:

```bash
batocera-services enable zaparoo_service
```

5. Start the Zaparoo service:

```bash
batocera-services start zaparoo_service
```

## Supported Readers

| Reader                                         | Status |
| ---------------------------------------------- | ------ |
| [PN532 USB](../readers/nfc/pn532-usb.md)       | ✅     |
| [PN532 Module](../readers/nfc/pn532-module.md) | ✅     |
| [ACR122U (PCSC)](../readers/nfc/acr122u.md)    | ✅     |
| [File Reader](../readers/file.md)              | ✅     |
| [Simple Serial](../readers/simple-serial.md)   | ✅     |
| [RS232 Barcode](../readers/barcode/rs232.md)   | ✅     |
| [Optical Drive](../readers/optical-drive.md)   | ✅     |
| [TTY2OLED](../readers/tty2oled.md)             | ✅     |
| [MQTT](../readers/mqtt.md)                     | ✅     |
| [External Drive](../readers/external-drive.md) | ✅     |

## Supported Launchers

| Launcher         | Systems/Extensions                   | Notes                                    |
| ---------------- | ------------------------------------ | ---------------------------------------- |
| Kodi             | Movies, TV Shows, Music, Collections | Only works in Kodi mode with API enabled |
| EmulationStation | 150+ retro systems                   | Via Batocera's built-in emulators        |
| Custom Scripts   | `.sh` files                          | Shell script execution                   |

:::info Kodi Integration
Kodi integration only works when Batocera is in Kodi mode. Launches will only work with Kodi open and active, and scanning Kodi media only works while Kodi is running. You'll also need to enable the Kodi API - see the [LibreELEC instructions](./libreelec.md) for details on configuring the API settings.
:::

### EmulationStation Systems

Batocera supports over 150 systems through EmulationStation. The complete list includes:

| System               | Batocera Name       | Extensions                                                                                    |
| -------------------- | ------------------- | --------------------------------------------------------------------------------------------- |
| **Nintendo Systems** |
| NES                  | nes                 | `.nes`, `.unif`, `.unf`, `.zip`, `.7z`                                                        |
| Famicom Disk System  | fds                 | `.fds`, `.zip`, `.7z`                                                                         |
| SNES                 | snes                | `.smc`, `.fig`, `.sfc`, `.gd3`, `.gd7`, `.dx2`, `.bsx`, `.swc`, `.zip`, `.7z`                 |
| Nintendo 64          | n64                 | `.z64`, `.n64`, `.v64`, `.zip`, `.7z`                                                         |
| GameCube             | gamecube            | `.gcm`, `.iso`, `.gcz`, `.ciso`, `.wbfs`, `.rvz`, `.elf`, `.dol`, `.m3u`                      |
| Wii                  | wii                 | `.gcm`, `.iso`, `.gcz`, `.ciso`, `.wbfs`, `.wad`, `.rvz`, `.elf`, `.dol`, `.m3u`, `.json`     |
| Game Boy             | gb                  | `.gb`, `.zip`, `.7z`                                                                          |
| Game Boy Color       | gbc                 | `.gbc`, `.zip`, `.7z`                                                                         |
| Game Boy Advance     | gba                 | `.gba`, `.zip`, `.7z`                                                                         |
| Nintendo DS          | nds                 | `.nds`, `.bin`, `.zip`, `.7z`                                                                 |
| Nintendo 3DS         | n3ds                | `.3ds`, `.cci`, `.cxi`                                                                        |
| Virtual Boy          | virtualboy          | `.vb`, `.zip`, `.7z`                                                                          |
| **Sega Systems**     |
| Master System        | mastersystem        | `.bin`, `.sms`, `.zip`, `.7z`                                                                 |
| Game Gear            | gamegear            | `.bin`, `.gg`, `.zip`, `.7z`                                                                  |
| Genesis/Mega Drive   | megadrive           | `.bin`, `.gen`, `.md`, `.sg`, `.smd`, `.zip`, `.7z`                                           |
| Sega CD              | megacd              | `.cue`, `.iso`, `.chd`, `.m3u`                                                                |
| Sega 32X             | sega32x             | `.32x`, `.chd`, `.smd`, `.bin`, `.md`, `.zip`, `.7z`                                          |
| Saturn               | saturn              | `.cue`, `.ccd`, `.m3u`, `.chd`, `.iso`, `.zip`                                                |
| Dreamcast            | dreamcast           | `.cdi`, `.cue`, `.gdi`, `.chd`, `.m3u`                                                        |
| SG-1000              | sg1000              | `.bin`, `.sg`, `.zip`, `.7z`                                                                  |
| **Sony Systems**     |
| PlayStation          | psx                 | `.cue`, `.img`, `.mdf`, `.pbp`, `.toc`, `.cbn`, `.m3u`, `.ccd`, `.chd`, `.iso`                |
| PlayStation 2        | ps2                 | `.iso`, `.mdf`, `.nrg`, `.bin`, `.img`, `.dump`, `.gz`, `.cso`, `.chd`, `.m3u`                |
| PlayStation 3        | ps3                 | `.ps3`, `.psn`, `.squashfs`                                                                   |
| PlayStation Portable | psp                 | `.iso`, `.cso`, `.pbp`, `.chd`                                                                |
| **Arcade Systems**   |
| MAME                 | mame                | `.zip`, `.7z`                                                                                 |
| FinalBurn Neo        | fbneo               | `.zip`, `.7z`                                                                                 |
| Neo Geo              | neogeo              | `.7z`, `.zip`                                                                                 |
| Neo Geo CD           | neogeocd            | `.cue`, `.iso`, `.chd`                                                                        |
| **Computer Systems** |
| Amiga                | amiga500, amiga1200 | `.adf`, `.uae`, `.ipf`, `.dms`, `.dmz`, `.adz`, `.lha`, `.hdf`, `.exe`, `.m3u`, `.zip`        |
| Amstrad CPC          | amstradcpc          | `.dsk`, `.sna`, `.tap`, `.cdt`, `.voc`, `.m3u`, `.zip`, `.7z`                                 |
| Apple II             | apple2              | `.nib`, `.do`, `.po`, `.dsk`, `.mfi`, `.dfi`, `.rti`, `.edd`, `.woz`, `.wav`, `.zip`, `.7z`   |
| Atari ST             | atarist             | `.st`, `.msa`, `.stx`, `.dim`, `.ipf`, `.m3u`, `.zip`, `.7z`                                  |
| Commodore 64         | c64                 | `.d64`, `.d81`, `.crt`, `.prg`, `.tap`, `.t64`, `.m3u`, `.zip`, `.7z`                         |
| DOS                  | dos                 | `.pc`, `.dos`, `.zip`, `.squashfs`, `.dosz`, `.m3u`, `.iso`, `.cue`                           |
| MSX                  | msx1, msx2          | `.dsk`, `.mx1`, `.mx2`, `.rom`, `.zip`, `.7z`, `.cas`, `.m3u`                                 |
| ScummVM              | scummvm             | `.scummvm`, `.squashfs`                                                                       |
| **Atari Systems**    |
| Atari 2600           | atari2600           | `.a26`, `.bin`, `.zip`, `.7z`                                                                 |
| Atari 5200           | atari5200           | `.rom`, `.xfd`, `.atr`, `.atx`, `.cdm`, `.cas`, `.car`, `.bin`, `.a52`, `.xex`, `.zip`, `.7z` |
| Atari 7800           | atari7800           | `.a78`, `.bin`, `.zip`, `.7z`                                                                 |
| Atari Lynx           | lynx                | `.lnx`, `.zip`, `.7z`                                                                         |
| Atari Jaguar         | jaguar              | `.cue`, `.j64`, `.jag`, `.cof`, `.abs`, `.cdi`, `.rom`, `.zip`, `.7z`                         |
| **Other Consoles**   |
| 3DO                  | 3do                 | `.iso`, `.chd`, `.cue`                                                                        |
| ColecoVision         | colecovision        | `.bin`, `.col`, `.rom`, `.zip`, `.7z`                                                         |
| Intellivision        | intellivision       | `.int`, `.bin`, `.rom`, `.zip`, `.7z`                                                         |
| Neo Geo Pocket       | ngp                 | `.ngp`, `.zip`, `.7z`                                                                         |
| PC Engine            | pcengine            | `.pce`, `.bin`, `.zip`, `.7z`                                                                 |
| PC-FX                | pcfx                | `.cue`, `.ccd`, `.toc`, `.chd`, `.zip`, `.7z`                                                 |
| Vectrex              | vectrex             | `.bin`, `.gam`, `.vec`, `.zip`, `.7z`                                                         |
| WonderSwan           | wonderswan, wswanc  | `.ws`, `.wsc`, `.zip`, `.7z`                                                                  |
| **Handheld Systems** |
| Game & Watch         | gameandwatch        | `.mgw`, `.zip`, `.7z`                                                                         |
| Supervision          | supervision         | `.sv`, `.zip`, `.7z`                                                                          |
| **Modern Systems**   |
| OpenBOR              | openbor             | `.pak`                                                                                        |
| Pico-8               | pico8               | `.p8`, `.png`, `.m3u`                                                                         |
| TIC-80               | tic80               | `.tic`                                                                                        |

Either use the [Zaparoo App](../app/index.md) to search for games and write them to cards, or write the absolute path to the game on the card.

Zaparoo also supports launching custom shell scripts. See the [Linux page](./linux.md#supported-launchers) for more information on how to set up launchers this way.
