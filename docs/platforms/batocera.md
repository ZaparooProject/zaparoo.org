# Batocera

[Batocera](https://batocera.org/) is a software emulation distribution based around EmulationStation, with support for a huge number of systems and devices.

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

### Finishing Up

From this point, the service should be running and you can follow all other guides as normal. The [Zaparoo App](/docs/app/) will connect using the Batocera device's IP address, which you can find in the Batocera main menu under `Network Settings`.

## Supported Readers

| Reader                                            | Status |
| ------------------------------------------------- | ------ |
| [PN532](/docs/readers/nfc/pn532-usb)                 | ✅     |
| [ACR122U](/docs/readers/nfc/acr122u)         | ✅     |
| [File Reader](/docs/readers/file)            | ✅     |
| [Simple Serial](/docs/readers/simple-serial) | ✅     |
| [Optical Drive](/docs/readers/optical-drive) | ✅     |
| [TTY2OLED](/docs/readers/tty2oled)           | ✅     |

## Supported Launchers

| Launcher         | Systems/Extensions                   | Notes                                    |
| ---------------- | ------------------------------------ | ---------------------------------------- |
| Kodi             | Movies, TV Shows, Music, Collections | Only works in Kodi mode with API enabled |
| EmulationStation | 150+ retro systems                   | Via Batocera's built-in emulators        |
| Custom Scripts   | `.sh` files                          | Shell script execution                   |

:::info Kodi Integration
Kodi integration only works when Batocera is in Kodi mode. Launches will only work with Kodi open and active, and scanning Kodi media only works while Kodi is running. You'll also need to enable the Kodi API - see the [LibreELEC instructions](/docs/platforms/libreelec) for details on configuring the API settings.
:::

### EmulationStation Systems

Batocera supports over 150 systems through EmulationStation. The complete list includes:

| System               | Batocera Name       | Extensions                              |
| -------------------- | ------------------- | --------------------------------------- |
| **Nintendo Systems** |
| NES                  | nes                 | `.nes`, `.unf`, `.unif`                 |
| Famicom Disk System  | fds                 | `.fds`, `.qd`                           |
| SNES                 | snes                | `.sfc`, `.smc`, `.swc`, `.fig`, `.bs`   |
| Nintendo 64          | n64                 | `.z64`, `.n64`, `.v64`, `.rom`          |
| GameCube             | gamecube            | `.iso`, `.gcm`, `.gcz`, `.cso`, `.wbfs` |
| Wii                  | wii                 | `.iso`, `.wbfs`, `.cso`, `.gcz`         |
| Game Boy             | gb                  | `.gb`, `.gbc`, `.sgb`                   |
| Game Boy Color       | gbc                 | `.gb`, `.gbc`, `.sgb`                   |
| Game Boy Advance     | gba                 | `.gba`, `.agb`, `.bin`                  |
| Nintendo DS          | nds                 | `.nds`                                  |
| Nintendo 3DS         | n3ds                | `.3ds`, `.cia`                          |
| Virtual Boy          | virtualboy          | `.vb`, `.vboy`                          |
| **Sega Systems**     |
| Master System        | mastersystem        | `.sms`, `.sg`                           |
| Game Gear            | gamegear            | `.gg`                                   |
| Genesis/Mega Drive   | megadrive           | `.md`, `.gen`, `.smd`, `.bin`           |
| Sega CD              | segacd              | `.cue`, `.iso`, `.chd`                  |
| Sega 32X             | sega32x             | `.32x`, `.smd`, `.bin`, `.md`           |
| Saturn               | saturn              | `.cue`, `.iso`, `.chd`, `.mds`          |
| Dreamcast            | dreamcast           | `.cdi`, `.gdi`, `.iso`, `.chd`          |
| SG-1000              | sg1000              | `.sg`, `.sc`                            |
| **Sony Systems**     |
| PlayStation          | psx                 | `.cue`, `.iso`, `.chd`, `.pbp`, `.ecm`  |
| PlayStation 2        | ps2                 | `.iso`, `.chd`, `.cso`, `.gz`           |
| PlayStation 3        | ps3                 | `.iso`, `.pkg`                          |
| PlayStation Portable | psp                 | `.iso`, `.cso`, `.pbp`                  |
| **Arcade Systems**   |
| MAME                 | mame                | `.zip`, `.7z`                           |
| FinalBurn Neo        | fbneo               | `.zip`, `.7z`                           |
| FinalBurn Alpha      | fba                 | `.zip`, `.7z`                           |
| Capcom Play System 1 | cps1                | `.zip`, `.7z`                           |
| Capcom Play System 2 | cps2                | `.zip`, `.7z`                           |
| Capcom Play System 3 | cps3                | `.zip`, `.7z`                           |
| Neo Geo              | neogeo              | `.zip`, `.7z`                           |
| Neo Geo CD           | neogeocd            | `.cue`, `.iso`, `.chd`                  |
| **Computer Systems** |
| Amiga                | amiga500, amiga1200 | `.adf`, `.adz`, `.ipf`, `.lha`          |
| Amstrad CPC          | amstradcpc          | `.dsk`, `.cdt`, `.cpr`, `.tap`          |
| Apple II             | apple2              | `.dsk`, `.do`, `.po`, `.nib`            |
| Atari ST             | atarist             | `.st`, `.msa`, `.stx`, `.dim`           |
| Commodore 64         | c64                 | `.d64`, `.t64`, `.prg`, `.p00`          |
| DOS                  | dos                 | `.exe`, `.com`, `.bat`                  |
| MSX                  | msx, msx2           | `.rom`, `.mx1`, `.mx2`, `.cas`          |
| ScummVM              | scummvm             | Game folders                            |
| **Atari Systems**    |
| Atari 2600           | atari2600           | `.a26`, `.bin`, `.rom`                  |
| Atari 5200           | atari5200           | `.a52`, `.rom`, `.bin`                  |
| Atari 7800           | atari7800           | `.a78`, `.rom`, `.bin`                  |
| Atari Lynx           | lynx                | `.lnx`, `.o`                            |
| Atari Jaguar         | jaguar              | `.j64`, `.jag`, `.rom`                  |
| **Other Consoles**   |
| 3DO                  | 3do                 | `.iso`, `.cue`, `.chd`                  |
| ColecoVision         | colecovision        | `.col`, `.cv`, `.bin`, `.rom`           |
| Intellivision        | intellivision       | `.int`, `.bin`, `.rom`                  |
| Neo Geo Pocket       | ngp                 | `.ngp`, `.ngc`                          |
| PC Engine            | pcengine            | `.pce`, `.sgx`, `.cue`, `.iso`          |
| PC-FX                | pcfx                | `.cue`, `.iso`, `.chd`                  |
| Vectrex              | vectrex             | `.vec`, `.gam`, `.bin`                  |
| WonderSwan           | wonderswan          | `.ws`, `.wsc`                           |
| **Handheld Systems** |
| Game & Watch         | gameandwatch        | `.mgw`                                  |
| Supervision          | supervision         | `.sv`, `.bin`                           |
| **Modern Systems**   |
| OpenBOR              | openbor             | Game folders                            |
| Pico-8               | pico8               | `.p8`, `.png`                           |
| TIC-80               | tic80               | `.tic`                                  |

Either use the [Zaparoo App](/docs/app/) to search for games and write them to cards, or write the absolute path to the game on the card.

Zaparoo also supports launching custom shell scripts. See the [Linux page](./linux.mdx#supported-launchers) for more information on how to set up launchers this way.
