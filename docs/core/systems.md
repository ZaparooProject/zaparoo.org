# Systems

A system is a category used by [Core](./index.md) to group scanned media together, which is used to help matching with [launchers](./launchers.md) and when writing [ZapScript](../zapscript/index.md) commands.

Generally, a system will refer to a console or computer system, but can be used for any media type. Each [platform](../platforms/index.md) has its own set of supported systems, based on the [launchers](./launchers.md) it has available.

System IDs are case-insensitive and are used in [configuration files](./config.md) and [ZapScript](../zapscript/index.md) commands. Below is a complete reference of all available systems organized by category.

## Game Consoles

| System ID | Name | Aliases | Fallbacks |
|-----------|------|---------|-----------|
| `3DO` | 3DO | | |
| `3DS` | Nintendo 3DS | | |
| `AdventureVision` | Entex Adventure Vision | `AVision` | |
| `Arcadia` | Emerson Arcadia 2001 | | |
| `Astrocade` | Bally Astrocade | | |
| `Atari2600` | Atari 2600 | | `Atari7800` |
| `Atari5200` | Atari 5200 | | |
| `Atari7800` | Atari 7800 | | `Atari2600` |
| `AtariXEGS` | Atari XEGS | | |
| `CasioPV1000` | Casio PV-1000 | `Casio_PV-1000` | |
| `ChannelF` | Fairchild Channel F | | |
| `ColecoVision` | ColecoVision | `Coleco` | `SG1000` |
| `CreatiVision` | CreatiVision | | |
| `Dreamcast` | Sega Dreamcast | | |
| `FDS` | Famicom Disk System | `FamicomDiskSystem` | |
| `GameCube` | Nintendo GameCube | | |
| `Genesis` | Sega Genesis/Mega Drive | `MegaDrive` | |
| `GenesisMSU` | Genesis/Mega Drive MSU-MD | `MegaDriveMSU`, `MSU-MD` | `Genesis` |
| `Intellivision` | Intellivision | | |
| `Jaguar` | Atari Jaguar | | |
| `JaguarCD` | Atari Jaguar CD | | `Jaguar` |
| `MasterSystem` | Sega Master System | `SMS` | |
| `MegaCD` | Sega CD/Mega CD | `SegaCD` | `Genesis` |
| `Multivision` | Magnavox/Philips Odyssey² Multivision | | |
| `NES` | Nintendo NES | | |
| `NESMusic` | NES Music | | `NES` |
| `NGage` | Nokia N-Gage | `N-Gage` | |
| `Nintendo64` | Nintendo 64 | `N64` | |
| `Odyssey2` | Magnavox Odyssey² | | |
| `Ouya` | Ouya | | |
| `PCFX` | PC-FX | | |
| `PS2` | PlayStation 2 | `Playstation2` | |
| `PS3` | PlayStation 3 | `Playstation3` | |
| `PS4` | PlayStation 4 | `Playstation4` | |
| `PS5` | PlayStation 5 | `Playstation5` | |
| `PSX` | Sony PlayStation | `Playstation`, `PS1` | |
| `Saturn` | Sega Saturn | | |
| `Sega32X` | Sega 32X | `S32X`, `32X` | |
| `SeriesXS` | Xbox Series X/S | `SeriesX`, `SeriesS` | |
| `SG1000` | Sega SG-1000 | | `ColecoVision` |
| `SNES` | Super Nintendo | `SuperNintendo` | |
| `SNESMSU1` | SNES MSU-1 | `MSU1`, `MSU-1` | `SNES` |
| `SNESMusic` | SNES Music | | `SNES` |
| `Socrates` | VTech Socrates | | |
| `Sufami` | Sufami Turbo | | |
| `SuperACan` | Funtech Super A'Can | | |
| `SuperGrafx` | SuperGrafx | | `TurboGrafx16` |
| `Switch` | Nintendo Switch | `NintendoSwitch` | |
| `TurboGrafx16` | TurboGrafx-16/PC Engine | `TGFX16`, `PCEngine` | `SuperGrafx` |
| `TurboGrafx16CD` | TurboGrafx-16 CD/PC Engine CD | `TGFX16-CD`, `PCEngineCD` | `TurboGrafx16` |
| `VC4000` | Interton VC 4000 | | |
| `Vectrex` | Vectrex | | |
| `VideopacPlus` | Philips Videopac Plus G7400 | | |
| `VirtualBoy` | Virtual Boy | | |
| `VSmile` | VTech V.Smile | | |
| `Wii` | Nintendo Wii | `NintendoWii` | |
| `WiiU` | Nintendo Wii U | `NintendoWiiU` | |
| `Xbox` | Xbox | | |
| `Xbox360` | Xbox 360 | | |
| `XboxOne` | Xbox One | | |

## Handheld Systems

| System ID | Name | Aliases | Fallbacks |
|-----------|------|---------|-----------|
| `AtariLynx` | Atari Lynx | | |
| `Gamate` | Gamate | | |
| `Gameboy` | Nintendo Game Boy | `GB` | |
| `Gameboy2P` | Game Boy (2 Player) | | |
| `GameboyColor` | Game Boy Color | `GBC` | `Gameboy` |
| `GameCom` | Tiger Game.com | | |
| `GameGear` | Sega Game Gear | `GG` | |
| `GameNWatch` | Game & Watch | | |
| `GBA` | Game Boy Advance | `GameboyAdvance` | |
| `GBA2P` | Game Boy Advance (2 Player) | | |
| `MegaDuck` | Mega Duck | | |
| `NDS` | Nintendo DS | `NintendoDS` | |
| `NeoGeoPocket` | Neo Geo Pocket | | |
| `NeoGeoPocketColor` | Neo Geo Pocket Color | | `NeoGeoPocket` |
| `PocketChallengeV2` | WonderSwan Pocket Challenge V2 | | |
| `PokemonMini` | Pokémon Mini | | |
| `PSP` | PlayStation Portable | `PlaystationPortable` | |
| `SGBMSU1` | Super Game Boy MSU-1 | | `SuperGameboy` |
| `SuperGameboy` | Super Game Boy | `SGB` | `Gameboy` |
| `SuperVision` | Watara SuperVision | | |
| `Vita` | PlayStation Vita | `PSVita` | |
| `WonderSwan` | WonderSwan | | |
| `WonderSwanColor` | WonderSwan Color | | `WonderSwan` |

## Computer Systems

| System ID | Name | Aliases | Fallbacks |
|-----------|------|---------|-----------|
| `AcornAtom` | Acorn Atom | | |
| `AcornElectron` | Acorn Electron | | |
| `AliceMC10` | Alice MC-10 | | |
| `Amiga` | Commodore Amiga | `Minimig` | `Amiga500`, `Amiga1200` |
| `Amiga500` | Amiga 500 | `A500` | `Amiga` |
| `Amiga1200` | Amiga 1200 | `A1200` | `Amiga` |
| `AmigaCD32` | Amiga CD32 | | `Amiga` |
| `Amstrad` | Amstrad CPC | | |
| `AmstradPCW` | Amstrad PCW | `Amstrad-PCW` | |
| `Apogee` | Apogee BK-01 | | |
| `AppleI` | Apple I | `Apple-I` | |
| `AppleII` | Apple II | `Apple-II` | |
| `Aquarius` | Mattel Aquarius | | |
| `Archimedes` | Acorn Archimedes | | |
| `Atari800` | Atari 8-bit computers | | |
| `AtariST` | Atari ST | | |
| `BBCMicro` | BBC Micro | | |
| `BK0011M` | Elektronika BK-0011M | | |
| `C16` | Commodore 16 | | |
| `C64` | Commodore 64 | | |
| `CasioPV2000` | Casio PV-2000 | `Casio_PV-2000` | |
| `CDI` | Philips CD-i | `CD-i` | |
| `CoCo2` | TRS-80 Color Computer 2 | | |
| `ColecoAdam` | Coleco Adam | | |
| `CommanderX16` | Commander X16 | | |
| `DOS` | MS-DOS | `ao486`, `MS-DOS` | `PC` |
| `EDSAC` | EDSAC | | |
| `FM7` | Fujitsu FM-7 | | |
| `FMTowns` | FM Towns | | |
| `Galaksija` | Galaksija | | |
| `Interact` | Interact Home Computer | | |
| `Jupiter` | Jupiter Ace | | |
| `Laser` | Laser 310 | `Laser310` | |
| `Lynx48` | Camputers Lynx | | |
| `MacOS` | macOS | | |
| `MacPlus` | Macintosh Plus | | |
| `MSX` | MSX | | `MSX1`, `MSX2` |
| `MSX1` | MSX1 | | `MSX` |
| `MSX2` | MSX2 | | `MSX` |
| `MSX2Plus` | MSX2+ | | `MSX2`, `MSX` |
| `MultiComp` | MultiComp | | |
| `Orao` | Orao | | |
| `Oric` | Oric | | |
| `PC` | PC | | `DOS`, `Windows` |
| `PC88` | NEC PC-8801 | | |
| `PC98` | NEC PC-9801 | | |
| `PCXT` | IBM PC XT | | |
| `PDP1` | PDP-1 | | |
| `PET2001` | Commodore PET | | |
| `PMD85` | PMD 85 | | |
| `QL` | Sinclair QL | | |
| `RX78` | Bandai RX-78 | | |
| `SAMCoupe` | SAM Coupé | | |
| `ScummVM` | ScummVM | | |
| `SordM5` | Sord M5 | `Sord M5` | |
| `Specialist` | Specialist MX | `SPMX` | |
| `Spectravideo` | Spectravideo SVI-318/328 | | |
| `SVI328` | Spectravideo SVI-328 | | |
| `TatungEinstein` | Tatung Einstein | | |
| `Thomson` | Thomson computers | | |
| `TI994A` | TI-99/4A | `TI-99_4A` | |
| `TomyTutor` | Tomy Tutor | | |
| `TRS80` | TRS-80 | | |
| `TSConf` | TS-Configuration | | |
| `UK101` | UK101 | | |
| `Vector06C` | Vector-06C | `Vector06` | |
| `VIC20` | Commodore VIC-20 | | |
| `Windows` | Windows | `Win32`, `Win16` | `PC` |
| `X1` | Sharp X1 | | |
| `X68000` | Sharp X68000 | | |
| `ZX81` | Sinclair ZX81 | | |
| `ZXNext` | ZX Spectrum Next | | |
| `ZXSpectrum` | ZX Spectrum | `Spectrum` | |

## Arcade Systems

| System ID | Name | Aliases | Fallbacks |
|-----------|------|---------|-----------|
| `Arcade` | Arcade/MAME | `MAME` | |
| `Atomiswave` | Atomiswave | | |
| `Chihiro` | Sega Chihiro | | |
| `CPS1` | Capcom Play System 1 | | |
| `CPS2` | Capcom Play System 2 | | |
| `CPS3` | Capcom Play System 3 | | |
| `DAPHNE` | DAPHNE (Laserdisc) | `LaserDisc` | |
| `DICE` | Sega DICE | | |
| `Gaelco` | Gaelco arcade boards | | |
| `Hikaru` | Sega Hikaru | | |
| `Lindbergh` | Sega Lindbergh | | |
| `Model1` | Sega Model 1 | | |
| `Model2` | Sega Model 2 | | |
| `Model3` | Sega Model 3 | | |
| `Namco22` | Namco System 22 | | |
| `Namco2X6` | Namco System 2 | | |
| `NAOMI` | Sega NAOMI | | |
| `NAOMI2` | Sega NAOMI 2 | | |
| `NeoGeo` | SNK Neo Geo | | `NeoGeoAES`, `NeoGeoMVS` |
| `NeoGeoAES` | Neo Geo AES (home) | | `NeoGeo`, `NeoGeoMVS` |
| `NeoGeoCD` | Neo Geo CD | | `NeoGeo` |
| `NeoGeoMVS` | Neo Geo MVS (arcade) | | `NeoGeo`, `NeoGeoAES` |
| `Singe` | Singe (Laserdisc) | | |
| `Triforce` | Triforce | | |

## Other Systems

| System ID | Name | Aliases | Fallbacks |
|-----------|------|---------|-----------|
| `Android` | Android | | |
| `Arduboy` | Arduboy | | |
| `Audio` | Audio Files | | |
| `Chip8` | CHIP-8 | | |
| `GameMaster` | Game Master | | |
| `GamePocket` | Game Pocket | | |
| `GP32` | GP32 | | |
| `Groovy` | Groovy | | |
| `Image` | Image Files | | |
| `iOS` | iOS | | |
| `J2ME` | Java ME | | |
| `Movie` | Movie Files | | |
| `MusicAlbum` | Music Albums | | |
| `MusicArtist` | Music Artists | | |
| `MusicTrack` | Music Tracks | `Music` | |
| `Pico8` | PICO-8 | | |
| `PlugNPlay` | Plug & Play TV Games | | |
| `TIC80` | TIC-80 | | |
| `TVEpisode` | TV Episodes | `TV` | |
| `TVShow` | TV Shows | | |
| `Video` | Video Files | | |

## Usage Notes

- **System IDs are case-insensitive** when used in configuration files and ZapScript commands
- **Aliases**: Many systems have alternative names that can be used interchangeably (e.g., `Genesis` and `MegaDrive`, `GB` for `Gameboy`, `N64` for `Nintendo64`, `Music` for `MusicTrack`, `TV` for `TVEpisode`)
- **Fallbacks**: Some systems can fall back to compatible systems when launchers aren't available (e.g., Game Boy Color games can fallback to Game Boy, Sega CD can fallback to Genesis)
- Not all systems are supported on every platform - check the [launchers documentation](launchers.md) for platform-specific support
- System defaults can be configured in your [configuration file](config.md#systems)
- Systems are used in [ZapScript](../zapscript/index.md) commands for launching specific system types

### Examples

```toml
# Using system IDs in configuration - case doesn't matter
[[systems.default]]
system = "SNES"        # Same as "snes" or "Snes"
launcher = "retroarch"

[[systems.default]]
system = "genesis"     # Can also use alias "megadrive"
launcher = "retroarch"
```
