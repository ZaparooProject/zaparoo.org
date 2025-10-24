# MiSTer FPGA

MiSTer is fully supported by Zaparoo as a platform, and originally started as a project on MiSTer. Zaparoo has several
MiSTer-exclusive commands because of this.

| Item               | Path                             |
| ------------------ | -------------------------------- |
| Data directory     | `/media/fat/zaparoo`             |
| Mappings directory | `/media/fat/zaparoo/mappings`    |
| Config file        | `/media/fat/zaparoo/config.toml` |
| Log file           | `/tmp/zaparoo/core.log`          |

<small>_The `/media/fat` directory is the top level of the SD card._</small><br />
<small>_The `/tmp` directory is not accessible from the SD card and is deleted when MiSTer is powered off._</small>

## Install

Zaparoo Core is available in [Update All](https://github.com/theypsilon/Update_All_MiSTer) by enabling the
`MiSTer Extensions` repository in the `Tools & Scripts` menu.

If you only want Zaparoo Core or don't have Update All, add the following text to the `downloader.ini` file on your
MiSTer's SD card:

```ini
[mrext/tapto]
db_url = https://github.com/ZaparooProject/zaparoo-core/raw/main/scripts/mister/repo/tapto.json
```

This is supported by the `downloader` script which ships with the official MiSTer image.

Once installed, run `zaparoo` from the MiSTer `Scripts` menu, a prompt will offer to enable Zaparoo as a startup
service, then the service will be started in the background.

After the initial setup is complete, a status display will be shown. It's OK to exit this screen, the service will
continue to run in the background.

From this point, Zaparoo is now set up! You should be able to connect a reader and set up cards using the Zaparoo App.

### Manual Install

Download Zaparoo Core for MiSTer from the [Downloads page](/downloads) and copy the `zaparoo.sh` file to the `Scripts`
folder on your MiSTer's SD card.

:::warning

Using FileZilla to transfer the file? Make sure _binary transfer mode_ is enabled by
following [these steps](https://oryon.net/knowledge-base/article/how-to-change-filezilla-ftp-program-to-binary-transfer/).
FileZilla incorrectly detects `zaparoo.sh` as a text file and will corrupt it, resulting in confusing errors.

:::

## Supported Readers

| Reader                                            | Status |
| ------------------------------------------------- | ------ |
| [PN532](/docs/readers/nfc/pn532-usb)                 | ✅     |
| [ACR122U](/docs/readers/nfc/acr122u)         | ✅     |
| [File Reader](/docs/readers/file)            | ✅     |
| [Simple Serial](/docs/readers/simple-serial) | ✅     |
| [TTY2OLED](/docs/readers/tty2oled)           | ✅     |

## Supported Launchers

### Console Systems

| System              | Folders                       | Extensions                     | Notes                                     |
| ------------------- | ----------------------------- | ------------------------------ | ----------------------------------------- |
| Adventure Vision    | AVision                       | `.bin`                         | Entex Adventure Vision                    |
| Arcadia 2001        | Arcadia                       | `.bin`                         | Emerson Arcadia 2001                      |
| Amiga CD32          | AmigaCD32                     | `.cue`, `.chd`, `.iso`         | Commodore Amiga CD32                      |
| Astrocade           | Astrocade                     | `.bin`                         | Bally Astrocade                           |
| Atari 2600          | ATARI7800, Atari2600          | `.a26`                         | Also supports LLAPI variant               |
| Atari 5200          | ATARI5200                     | `.a52`                         |                                           |
| Atari 7800          | ATARI7800                     | `.a78`                         | Also supports LLAPI variant               |
| Atari Lynx          | AtariLynx                     | `.lnx`                         |                                           |
| Casio PV-1000       | Casio_PV-1000                 | `.bin`                         |                                           |
| CD-i                | CD-i                          | `.cue`, `.chd`                 | Philips CD-i                              |
| Channel F           | ChannelF                      | `.rom`, `.bin`                 | Fairchild Channel F                       |
| ColecoVision        | Coleco                        | `.col`, `.bin`, `.rom`         |                                           |
| CreatiVision        | CreatiVision                  | `.rom`, `.bin`, `.bas`         |                                           |
| Famicom Disk System | NES, FDS                      | `.fds`                         | Nintendo FDS                              |
| Gamate              | Gamate                        | `.bin`                         | Bit Corporation Gamate                    |
| Game Boy            | GAMEBOY                       | `.gb`                          | Also supports LLAPI variant               |
| Game Boy Color      | GAMEBOY, GBC                  | `.gbc`                         |                                           |
| Game Boy 2P         | GAMEBOY2P                     | `.gb`, `.gbc`                  | Two-player Game Boy                       |
| Game Gear           | SMS, GameGear                 | `.gg`                          |                                           |
| Game & Watch        | GameNWatch, Game and Watch    | `.bin`, `.gnw`                 | Nintendo handheld games                   |
| Game Boy Advance    | GBA                           | `.gba`                         | Also supports LLAPI and 2P variants       |
| Genesis/Mega Drive  | MegaDrive, Genesis            | `.gen`, `.bin`, `.md`          | Supports Sinden and LLAPI variants        |
| Intellivision       | Intellivision                 | `.int`, `.bin`                 |                                           |
| Jaguar              | Jaguar                        | `.jag`, `.j64`, `.rom`, `.bin` | Atari Jaguar                              |
| Master System       | SMS                           | `.sms`                         | Supports Sinden and LLAPI variants        |
| Mega CD             | MegaCD                        | `.cue`, `.chd`                 | Supports Sinden and LLAPI variants        |
| Mega Duck           | GAMEBOY, MegaDuck             | `.bin`                         |                                           |
| Neo Geo CD          | NeoGeo-CD, NEOGEO             | `.cue`, `.chd`                 | Also supports LLAPI for cart Neo Geo      |
| NES                 | NES                           | `.nes`                         | Supports Sinden and LLAPI variants        |
| NES Music           | NES                           | `.nsf`                         | Nintendo Sound Format player              |
| Nintendo 64         | N64                           | `.n64`, `.z64`                 | Multiple variants: LLAPI, 80MHz, PWM      |
| Odyssey²            | ODYSSEY2                      | `.bin`                         | Magnavox Odyssey²                         |
| Pocket Challenge V2 | WonderSwan, PocketChallengeV2 | `.pc2`                         |                                           |
| Pokemon Mini        | PokemonMini                   | `.min`                         |                                           |
| PlayStation         | PSX                           | `.cue`, `.chd`, `.exe`         | Multiple variants: LLAPI, Sinden, 2X, PWM |
| Sega 32X            | S32X                          | `.32x`                         | Also supports LLAPI variant               |
| SG-1000             | SG1000, Coleco, SMS           | `.sg`                          |                                           |
| Super Game Boy      | SGB                           | `.sgb`, `.gb`, `.gbc`          | Also supports LLAPI variant               |
| SuperVision         | SuperVision                   | `.bin`, `.sv`                  | Watara SuperVision                        |
| Saturn              | Saturn                        | `.cue`, `.chd`                 | Supports LLAPI and PWM variants           |
| SNES                | SNES                          | `.sfc`, `.smc`, `.bin`, `.bs`  | Supports LLAPI and Sinden variants        |
| SNES Music          | SNES                          | `.spc`                         | Super Nintendo Sound Format player        |
| SuperGrafx          | TGFX16                        | `.sgx`                         | NEC SuperGrafx                            |
| TurboGrafx-16       | TGFX16                        | `.pce`, `.bin`                 | Also supports LLAPI variant               |
| TurboGrafx-CD       | TGFX16-CD                     | `.cue`, `.chd`                 |                                           |
| VC 4000             | VC4000                        | `.bin`                         | Interton VC 4000                          |
| Vectrex             | VECTREX                       | `.vec`, `.bin`, `.rom`         |                                           |
| WonderSwan          | WonderSwan                    | `.ws`                          |                                           |
| WonderSwan Color    | WonderSwan, WonderSwanColor   | `.wsc`                         |                                           |

### Computer Systems

| System          | Folders                       | Extensions                                                             | Notes                                         |
| --------------- | ----------------------------- | ---------------------------------------------------------------------- | --------------------------------------------- |
| Acorn Atom      | AcornAtom                     | `.vhd`                                                                 |                                               |
| Acorn Electron  | AcornElectron                 | `.vhd`                                                                 |                                               |
| Alice MC-10     | AliceMC10                     | `.c10`                                                                 |                                               |
| Amstrad CPC     | Amstrad                       | `.dsk`, `.cdt`                                                         |                                               |
| Amstrad PCW     | Amstrad PCW                   | `.dsk`                                                                 |                                               |
| AO486 (DOS)     | AO486, /media/fat/\_DOS Games | `.img`, `.ima`, `.vhd`, `.vfd`, `.iso`, `.cue`, `.chd`, `.mgl`         | PC-compatible                                 |
| Apogee BK-01    | APOGEE                        | `.rka`, `.rkr`, `.gam`                                                 |                                               |
| Apple I         | Apple-I                       | `.txt`                                                                 |                                               |
| Apple II        | Apple-II                      | `.dsk`, `.do`, `.po`, `.nib`, `.hdv`                                   |                                               |
| Aquarius        | AQUARIUS                      | `.bin`, `.caq`                                                         | Mattel Aquarius                               |
| Atari 800       | ATARI800                      | `.atr`, `.xex`, `.xfd`, `.atx`, `.car`, `.rom`, `.bin`                 |                                               |
| BBC Micro       | BBCMicro                      | `.ssd`, `.dsd`, `.vhd`                                                 |                                               |
| BK0011M         | BK0011M                       | `.bin`, `.dsk`, `.vhd`                                                 |                                               |
| C16             | C16                           | `.d64`, `.g64`, `.prg`, `.tap`, `.bin`                                 | Commodore 16                                  |
| C64             | C64                           | `.d64`, `.g64`, `.t64`, `.d81`, `.prg`, `.crt`, `.reu`, `.tap`         | Commodore 64                                  |
| Casio PV-2000   | Casio_PV-2000                 | `.bin`                                                                 |                                               |
| CoCo2           | CoCo2                         | `.dsk`, `.cas`, `.ccc`, `.rom`                                         | TRS-80 Color Computer                         |
| EDSAC           | EDSAC                         | `.tap`                                                                 | Electronic Delay Storage Automatic Calculator |
| Galaksija       | Galaksija                     | `.tap`                                                                 |                                               |
| Interact        | Interact                      | `.cin`, `.k7`                                                          |                                               |
| Jupiter Ace     | Jupiter                       | `.ace`                                                                 |                                               |
| Laser 310       | Laser                         | `.vz`                                                                  | VTech Laser 310                               |
| Lynx 48         | Lynx48                        | `.tap`                                                                 | Camputers Lynx                                |
| Macintosh Plus  | MACPLUS                       | `.dsk`, `.img`, `.vhd`                                                 |                                               |
| MSX             | MSX                           | `.vhd`                                                                 |                                               |
| MSX1            | MSX1                          | `.dsk`, `.rom`                                                         |                                               |
| MultiComp       | MultiComp                     | `.img`                                                                 |                                               |
| Orao            | ORAO                          | `.tap`                                                                 |                                               |
| Oric            | Oric                          | `.dsk`                                                                 | Oric Atmos                                    |
| PC XT           | PCXT                          | `.img`, `.vhd`, `.ima`, `.vfd`                                         | IBM PC XT compatible                          |
| PDP-1           | PDP1                          | `.bin`, `.rim`, `.pdp`                                                 |                                               |
| PET 2001        | PET2001                       | `.prg`, `.tap`                                                         | Commodore PET                                 |
| PMD 85          | PMD85                         | `.rmm`                                                                 |                                               |
| QL              | QL                            | `.mdv`, `.win`                                                         | Sinclair QL                                   |
| RX-78           | RX78                          | `.bin`                                                                 | Bandai RX-78                                  |
| SAM Coupé       | SAMCOUPE                      | `.dsk`, `.mgt`, `.img`                                                 |                                               |
| Sord M5         | Sord M5                       | `.bin`, `.rom`, `.cas`                                                 |                                               |
| Specialist      | SPMX                          | `.rks`, `.odi`                                                         |                                               |
| SVI-328         | SVI328                        | `.cas`, `.bin`, `.rom`                                                 |                                               |
| Tatung Einstein | TatungEinstein                | `.dsk`                                                                 |                                               |
| TI-99/4A        | TI-99_4A                      | `.bin`, `.m99`                                                         | Texas Instruments                             |
| Tomy Tutor      | TomyTutor                     | `.bin`, `.cas`                                                         |                                               |
| TRS-80          | TRS-80                        | `.jvi`, `.dsk`, `.cas`                                                 |                                               |
| TSConf          | TSConf                        | `.vhf`                                                                 | ZX Spectrum clone                             |
| UK101           | UK101                         | `.txt`, `.bas`, `.lod`                                                 |                                               |
| Vector-06C      | VECTOR06                      | `.rom`, `.com`, `.c00`, `.edd`, `.fdd`                                 |                                               |
| VIC-20          | VIC20                         | `.d64`, `.g64`, `.prg`, `.tap`, `.crt`                                 | Commodore VIC-20                              |
| X68000          | X68000                        | `.d88`, `.hdf`, `.mgl`                                                 | Sharp X68000                                  |
| ZX81            | ZX81                          | `.p`, `.0`                                                             |                                               |
| ZX Spectrum     | Spectrum                      | `.tap`, `.csw`, `.tzx`, `.sna`, `.z80`, `.trd`, `.img`, `.dsk`, `.mgt` |                                               |
| ZX Next         | ZXNext                        | `.vhd`                                                                 |                                               |

### Arcade & Special Systems

| System        | Folders  | Extensions     | Notes                 |
| ------------- | -------- | -------------- | --------------------- |
| Arcade        | \_Arcade | `.mra`         | MAME ROM Archives     |
| Arduboy       | Arduboy  | `.hex`, `.bin` | Miniature game system |
| CHIP-8        | Chip8    | `.ch8`         | Virtual machine       |
| Groovy MiSTer | Groovy   | `.gmc`         | Custom platform       |

## Launcher Details

Many launchers are supported on MiSTer which link to official cores. Launchers will be automatically detected and used as long as you stick to the official games folders and core menu structure set by Downloader.

Below are some launchers with special features that are supported by Zaparoo.

### ao486

If a .vhd file is launched via Zaparoo, and this .vhd file is sitting in its own folder with an .iso or .chd file, that .iso or .chd file will also be automatically mounted alongside the .vhd file.

### AmigaVision (Amiga)

Launching games in the [AmigaVision](https://amiga.vision/) image on the Amiga core is supported via the `games.txt` files and `demos.txt` files located in the `Amiga/listings` folder on your SD card.

For example, to launch Beneath a Stell Sky in AmigaVision:

```
Amiga/listings/games.txt/Beneath a Steel Sky (OCS)[en]
```

The `games.txt` and `demos.txt` files contain a listing of all supported games and demos, generated by AmigaVision, and can be treated as a virtual folder for launching via Zaparoo. Other games can be launched using the same format of `Amiga/listings/games.txt/<Game Name>`.

Opening the `games.txt` and `demos.txt` files in a text editor will show the full list of supported games and demos.

### NeoGeo

NeoGeo also supports launching .zip files and folders directly with Zaparoo, as is supported with the MiSTer core itself.

For example, a .zip file:

```
NeoGeo/mslug.zip
```

Or a folder:

```
NeoGeo/mslug2
```

### Alternate Launchers

Some alternate or unofficial versions of cores are supported and can be used by explicitly setting a launcher in the
ZapScript on a token. Like the official cores, Zaparoo assumes they're installed in either the default location from
Update All or in the appropriate menu folder unless otherwise noted.

To use them, add the following to the end of the file path or launch command: `?launcher=<launcher ID>`. For example:
`N64/some/game.n64?launcher=80MHzNintendo64`

#### LLAPI

Bliss-Box LLAPI cores. Alternate Arcade cores can be referenced directly with their .mra files.

Launcher IDs: `LLAPIAtari2600`, `LLAPIAtari7800`, `LLAPIGameboy`, `LLAPIGBA`, `LLAPIMegaDrive`, `LLAPISMS`,
`LLAPIMegaCD`, `LLAPINeoGeo`, `LLAPINES`, `LLAPINintendo64`, `LLAPI80MHzNintendo64`, `LLAPIPSX`, `LLAPIS32X`,
`LLAPISuperGameboy`, `LLAPISaturn`, `LLAPISNES`, `LLAPITurboGrafx16`

#### PWM

24-bit video PWM cores.

Launcher IDs: `PWMNintendo64`, `PWM80MHzNintendo64`, `PWMPSX`, `PWM2XPSX`, `PWMSaturn`

#### Overclock

Robert Piep's experimental overclock cores.

Launcher IDs: `80MHzNintendo64`, `2XPSX`

#### Sinden Lightgun

Sinden Lightgun cores.

:::info

The Sinden cores must be installed in a custom `_Sinden` folder at the top of the SD card, or else Zaparoo won't see
them and they will conflict with official cores.

:::

Launcher IDs: `SindenGenesis`, `SindenMegaDrive`, `SindenSMS`, `SindenMegaCD`, `SindenNES`, `SindenPSX`, `SindenSNES`

## Main Forks

Some MiSTer Main forks are available with Zaparoo integration or features that work well with Zaparoo.

### spark2k06

An alternative version of MiSTer Main is available by [spark2k06](https://aitorgomez.net/), which adds many great
Zaparoo related features to MiSTer like:

- Show status of connected reader as icon in top bar.
- Zaparoo standby screen.
- Box art on game load.
- Many additional MGL features.

Please check [spark2k06's repository](https://github.com/spark2k06/Main_MiSTer) for more details.

### Insert-Coin

An alternative version of MiSTer Main is also available by [funkycochise](https://github.com/funkycochise) as part of
the [Insert-Coin project](https://github.com/funkycochise/Insert-Coin). This version includes a feature to hide the
loading screen before cores start games, which
works great with Zaparoo!

## Known Issues

- Zaparoo can have conflicts with other devices that use serial USB connections such as the tty2oled project and
  anything else using an Arduino board. The current workaround is to disable auto_detect in the config.toml file and
  manually set the reader path.
