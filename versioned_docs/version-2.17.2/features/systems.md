---
sidebar_position: 9
description: "Zaparoo system identifiers: how platforms, emulators, and media types are categorized to match tokens to the right launcher."
keywords: [zaparoo systems, zaparoo emulator systems, system identifier zaparoo, launcher systems]
---

# Systems

A system is a category [Zaparoo Core](../core/index.md) uses to group scanned media. Systems help Core match media to [launchers](./launchers.md), and you can use them in [ZapScript](../zapscript/index.md) commands.

Most systems refer to a console, handheld, computer, or arcade platform, but systems can also describe other media types like movies, music, and images. Each [platform](../platforms/index.mdx) supports the systems its launchers can handle.

System IDs are case-insensitive in [configuration files](../core/config.md) and ZapScript commands. This page lists the user-facing system IDs, explicit aliases, and fallback systems built into Core.

Not every system here can be launched. Some, such as mobile phones or VR headsets, exist so media can be classified and tagged correctly. Whether a system launches depends on the [launchers](./launchers.md) your platform provides.

## Game consoles

| System ID | Name | Aliases | Fallbacks |
|-----------|------|---------|-----------|
| `1292APVS` | 1292 Advanced Programmable Video System | `1292 Advanced Programmable Video System`, `1292 APVS` | |
| `3DO` | 3DO | | |
| `3DS` | Nintendo 3DS | | |
| `AdvancedPICOBeena` | Advanced PICO Beena | `Advanced PICO Beena`, `Beena` | |
| `AdventureVision` | Entex Adventure Vision | `AVision` | |
| `AmstradGX4000` | Amstrad GX4000 | `Amstrad GX4000`, `GX4000` | |
| `ApplePippin` | Apple Pippin | `Apple Pippin`, `Pippin` | |
| `Arcadia` | Emerson Arcadia 2001 | | |
| `Astrocade` | Bally Astrocade | | |
| `Atari2600` | Atari 2600 | | `Atari7800` |
| `Atari5200` | Atari 5200 | | |
| `Atari7800` | Atari 7800 | | `Atari2600` |
| `AtariXEGS` | Atari XEGS | | |
| `CasioLoopy` | Casio Loopy | `Casio Loopy` | |
| `CasioPV1000` | Casio PV-1000 | `Casio_PV-1000` | |
| `CassetteVision` | Cassette Vision | `Epoch Cassette Vision` | |
| `ChannelF` | Fairchild Channel F | | |
| `ColecoVision` | ColecoVision | `Coleco` | `SG1000` |
| `CommodoreCDTV` | Commodore CDTV | `Commodore CDTV`, `Amiga CDTV`, `CDTV` | |
| `CreatiVision` | CreatiVision | | |
| `Dreamcast` | Sega Dreamcast | | |
| `FDS` | Famicom Disk System | `FamicomDiskSystem` | |
| `GameCube` | Nintendo GameCube | | |
| `Genesis` | Sega Genesis/Mega Drive | `MegaDrive` | |
| `GenesisMSU` | Genesis/Mega Drive MSU-MD | `MegaDriveMSU`, `MSU-MD` | `Genesis` |
| `GearVR` | Gear VR | `Gear VR`, `Samsung Gear VR` | |
| `HyperScan` | HyperScan | `Mattel HyperScan` | |
| `Intellivision` | Intellivision | | |
| `IntellivisionAmico` | Intellivision Amico | `Intellivision Amico`, `Amico` | |
| `Jaguar` | Atari Jaguar | | |
| `JaguarCD` | Atari Jaguar CD | | `Jaguar` |
| `LeapTV` | LeapTV | `LeapFrog LeapTV` | |
| `MagnavoxOdyssey` | Magnavox Odyssey | `Magnavox Odyssey`, `Odyssey` | |
| `MasterSystem` | Sega Master System | `SMS` | |
| `MegaCD` | Sega CD/Mega CD | `SegaCD` | `Genesis` |
| `MetaQuest2` | Meta Quest 2 | `Meta Quest 2`, `Oculus Quest 2`, `Quest 2` | |
| `MetaQuest3` | Meta Quest 3 | `Meta Quest 3`, `Quest 3` | |
| `Multivision` | Magnavox/Philips Odyssey² Multivision | | |
| `NES` | Nintendo NES | | |
| `NESMusic` | NES Music | | `NES` |
| `NGage` | Nokia N-Gage | `N-Gage` | |
| `Nintendo64` | Nintendo 64 | `N64` | |
| `NintendoSwitch2` | Nintendo Switch 2 | `Nintendo Switch 2`, `Switch 2` | |
| `Nuon` | NUON | | |
| `OculusGo` | Oculus Go | `Oculus Go` | |
| `OculusQuest` | Oculus Quest | `Oculus Quest`, `Quest 1` | |
| `OculusRift` | Oculus Rift | `Oculus Rift`, `Rift CV1` | |
| `Odyssey2` | Magnavox Odyssey² | | |
| `Ouya` | Ouya | | |
| `PanasonicM2` | Panasonic M2 | `Panasonic M2`, `3DO M2`, `M2` | |
| `PC50XFamily` | PC-50X Family | `PC-50X Family`, `PC-50X` | |
| `PCFX` | PC-FX | | |
| `Playdia` | Playdia | `Bandai Playdia` | |
| `PlayStationVR` | PlayStation VR | `PlayStation VR`, `PS VR`, `PSVR` | |
| `PlayStationVR2` | PlayStation VR2 | `PlayStation VR2`, `PS VR2`, `PSVR2` | |
| `Polymega` | Polymega | | |
| `PS2` | PlayStation 2 | `Playstation2` | |
| `PS3` | PlayStation 3 | `Playstation3` | |
| `PS4` | PlayStation 4 | `Playstation4` | |
| `PS5` | PlayStation 5 | `Playstation5` | |
| `PSX` | Sony PlayStation | `Playstation`, `PS1` | |
| `Saturn` | Sega Saturn | | |
| `Sega32X` | Sega 32X | `S32X`, `32X` | |
| `SegaCD32X` | Sega CD 32X | `Sega CD 32X`, `Mega-CD 32X`, `32X CD` | |
| `SegaPico` | SEGA PICO | `SEGA PICO`, `Sega Pico`, `Pico` | |
| `SeriesXS` | Xbox Series X/S | `SeriesX`, `SeriesS` | |
| `SG1000` | Sega SG-1000 | | `ColecoVision` |
| `SNES` | Super Nintendo | `SuperNintendo` | |
| `SNESMSU1` | SNES MSU-1 | `MSU1`, `MSU-1` | `SNES` |
| `SNESMusic` | SNES Music | | `SNES` |
| `Socrates` | VTech Socrates | | |
| `Sufami` | Sufami Turbo | | |
| `SuperACan` | Funtech Super A'Can | | |
| `SuperCassetteVision` | Super Cassette Vision | `Epoch Super Cassette Vision`, `SCV` | |
| `SuperGrafx` | SuperGrafx | | `TurboGrafx16` |
| `Switch` | Nintendo Switch | `NintendoSwitch` | |
| `Terebikko` | Terebikko | `Bandai Terebikko` | |
| `TurboGrafx16` | TurboGrafx-16/PC Engine | `TGFX16`, `PCEngine` | `SuperGrafx` |
| `TurboGrafx16CD` | TurboGrafx-16 CD/PC Engine CD | `TGFX16-CD`, `PCEngineCD` | `TurboGrafx16` |
| `Uzebox` | Uzebox | | |
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
| `Zeebo` | Zeebo | | |

## Handheld systems

| System ID | Name | Aliases | Fallbacks |
|-----------|------|---------|-----------|
| `AtariLynx` | Atari Lynx | | |
| `DigiBlast` | digiBLAST | `digiBLAST`, `Digiblast` | |
| `Evercade` | Evercade | | |
| `Gamate` | Gamate | | |
| `Gameboy` | Nintendo Game Boy | `GB` | |
| `Gameboy2P` | Game Boy (2 Player) | | |
| `GameboyColor` | Game Boy Color | `GBC` | `Gameboy` |
| `GameCom` | Tiger Game.com | | |
| `GameGear` | Sega Game Gear | `GG` | |
| `GameGear2P` | Game Gear (2 Player) | | |
| `GameNWatch` | Game & Watch | | |
| `GBA` | Game Boy Advance | `GameboyAdvance` | |
| `GBA2P` | Game Boy Advance (2 Player) | | |
| `HandheldElectronicLCD` | Handheld Electronic LCD | `Handheld Electronic LCD`, `LCD Handheld` | |
| `Leapster` | Leapster | `LeapFrog Leapster` | |
| `LeapsterExplorer` | Leapster Explorer / LeapPad Explorer | `Leapster Explorer`, `LeapPad Explorer`, `Leapster Explorer/LeapPad Explorer` | |
| `LegacyMobileDevice` | Legacy Mobile Device | `Legacy Mobile Device`, `Feature Phone` | |
| `MegaDuck` | Mega Duck | | |
| `Microvision` | Microvision | `Milton Bradley Microvision` | |
| `NDS` | Nintendo DS | `NintendoDS` | |
| `NeoGeoPocket` | Neo Geo Pocket | | |
| `NeoGeoPocketColor` | Neo Geo Pocket Color | | `NeoGeoPocket` |
| `NintendoEReader` | e-Reader / Card-e Reader | `e-Reader / Card-e Reader`, `Nintendo e-Reader`, `Card-e Reader` | |
| `PanasonicJungle` | Panasonic Jungle | `Panasonic Jungle` | |
| `Playdate` | Playdate | | |
| `PocketChallengeV2` | WonderSwan Pocket Challenge V2 | | |
| `PocketStation` | PocketStation | `Sony PocketStation` | |
| `PokemonMini` | Pokémon Mini | | |
| `PSP` | PlayStation Portable | `PlaystationPortable` | |
| `RZone` | R-Zone | `R-Zone`, `Tiger R-Zone` | |
| `SGBMSU1` | Super Game Boy MSU-1 | | `SuperGameboy` |
| `SuperGameboy` | Super Game Boy | `SGB` | `Gameboy` |
| `SuperVision` | Watara SuperVision | | |
| `TapwaveZodiac` | Tapwave Zodiac | `Tapwave Zodiac`, `Zodiac` | |
| `Vita` | PlayStation Vita | `PSVita` | |
| `VMU` | Visual Memory Unit | `Visual Memory Unit`, `Visual Memory System`, `VMS`, `Dreamcast VMU` | |
| `WonderSwan` | WonderSwan | | |
| `WonderSwanColor` | WonderSwan Color | | `WonderSwan` |

## Computer systems

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
| `AppleIIGS` | Apple IIGS | `Apple-IIGS`, `Apple IIGS` | |
| `AppleLisa` | Apple Lisa | `Apple-Lisa` | |
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
| `CommodorePlus4` | Commodore Plus/4 | `Commodore Plus/4`, `Plus/4`, `Plus4`, `CPlus4`, `C+4` | |
| `DOS` | MS-DOS | `ao486`, `MS-DOS` | `PC` |
| `Dragon32` | Dragon 32/64 | `Dragon 32/64`, `Dragon 32`, `Dragon 64` | |
| `EDSAC` | EDSAC | | |
| `ElektorTVGamesComputer` | Elektor TV Games Computer | `Elektor TV Games Computer`, `TV Games Computer`, `TVGC` | |
| `FM7` | Fujitsu FM-7 | | |
| `FMTowns` | FM Towns | | |
| `Galaksija` | Galaksija | | |
| `Interact` | Interact Home Computer | | |
| `Jupiter` | Jupiter Ace | | |
| `Laser` | Laser 310 | `Laser310` | |
| `LegacyComputer` | Legacy Computer | `Legacy Computer` | |
| `Linux` | Linux | `GNU/Linux` | |
| `Lynx48` | Camputers Lynx | | |
| `MacOS` | macOS | | |
| `MacPlus` | Macintosh Plus | | |
| `MSX` | MSX | | `MSX1`, `MSX2` |
| `MSX1` | MSX1 | | `MSX` |
| `MSX2` | MSX2 | | `MSX` |
| `MSX2Plus` | MSX2+ | | `MSX2`, `MSX` |
| `MultiComp` | MultiComp | | |
| `MZ2200` | Sharp MZ-2200 | `Sharp MZ-2200`, `MZ-2200` | |
| `Orao` | Orao | | |
| `Oric` | Oric | | |
| `PC` | PC | | `DOS`, `Windows` |
| `PC6000` | NEC PC-6000 Series | `NEC PC-6000 Series`, `PC-6000`, `PC-6001` | |
| `PC88` | NEC PC-8801 | | |
| `PC98` | NEC PC-9801 | | |
| `PCXT` | IBM PC XT | | |
| `PDP1` | PDP-1 | | |
| `PDP10` | PDP-10 | `PDP-10`, `DEC PDP-10`, `DECsystem-10` | |
| `PET2001` | Commodore PET | | |
| `PLATO` | PLATO | `Project PLATO` | |
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

## Arcade systems

| System ID | Name | Aliases | Fallbacks |
|-----------|------|---------|-----------|
| `Arcade` | Arcade/MAME | `MAME` | |
| `Atomiswave` | Atomiswave | | |
| `Cave68000` | CAVE 68000 | | `Arcade` |
| `Chihiro` | Sega Chihiro | | |
| `CPS1` | Capcom Play System 1 | | `Arcade` |
| `CPS2` | Capcom Play System 2 | | `Arcade` |
| `CPS3` | Capcom Play System 3 | | `Arcade` |
| `DAPHNE` | DAPHNE (Laserdisc) | `LaserDisc` | |
| `DICE` | Sega DICE | | |
| `Gaelco` | Gaelco arcade boards | | |
| `Hikaru` | Sega Hikaru | | |
| `HyperNeoGeo64` | Hyper Neo Geo 64 | `Hyper Neo Geo 64`, `HNG64` | `Arcade` |
| `IremM72` | Irem M72 | | `Arcade` |
| `IremM92` | Irem M92 | | `Arcade` |
| `JalecoMegaSystem1` | Jaleco Mega System 1 | | `Arcade` |
| `Lindbergh` | Sega Lindbergh | | |
| `Model1` | Sega Model 1 | | |
| `Model2` | Sega Model 2 | | |
| `Model3` | Sega Model 3 | | |
| `Namco22` | Namco System 22 | | |
| `Namco2X6` | Namco System 2 | | |
| `NamcoSystem1` | Namco System 1 | | `Arcade` |
| `NAOMI` | Sega NAOMI | | |
| `NAOMI2` | Sega NAOMI 2 | | |
| `NeoGeo` | SNK Neo Geo | | `NeoGeoAES`, `NeoGeoMVS` |
| `NeoGeoAES` | Neo Geo AES (home) | | `NeoGeo`, `NeoGeoMVS` |
| `NeoGeoCD` | Neo Geo CD | | `NeoGeo` |
| `NeoGeoMVS` | Neo Geo MVS (arcade) | | `NeoGeo`, `NeoGeoAES` |
| `PGM` | PolyGame Master | | `Arcade` |
| `Pinball` | Pinball | `Pinball Machine`, `Virtual Pinball` | `Arcade` |
| `SegaSTV` | Sega ST-V | | `Arcade` |
| `SegaSystem16` | Sega System 16 | | `Arcade` |
| `SegaSystem18` | Sega System 18 | | `Arcade` |
| `Singe` | Singe (Laserdisc) | | |
| `TaitoF2` | Taito F2 System | | `Arcade` |
| `Triforce` | Triforce | | |

## Other systems

| System ID | Name | Aliases | Fallbacks |
|-----------|------|---------|-----------|
| `AirConsole` | AirConsole | `Air Console` | |
| `Android` | Android | | |
| `Application` | Applications | `App`, `Apps`, `Software` | |
| `Arduboy` | Arduboy | | |
| `Audio` | Audio Files | | |
| `Audiobook` | Audiobook | | `Audio` |
| `BlackBerryOS` | BlackBerry OS | `BlackBerry OS`, `BBOS` | |
| `BluRayPlayer` | Blu-ray Player | `Blu-ray Player`, `Blu-ray`, `BD Player` | |
| `Chip8` | CHIP-8 | | |
| `Daydream` | Daydream | `Google Daydream`, `Daydream VR` | |
| `DVDPlayer` | DVD Player | `DVD Player`, `DVD-Video Player` | |
| `FireTV` | Amazon Fire TV | `Amazon Fire TV`, `Fire TV` | |
| `GameMaster` | Game Master | | |
| `GamePocket` | Game Pocket | | |
| `GoogleStadia` | Google Stadia | `Google Stadia`, `Stadia` | |
| `GP32` | GP32 | | |
| `Groovy` | Groovy | | |
| `Image` | Image Files | | |
| `iOS` | iOS | | |
| `J2ME` | Java ME | | |
| `Movie` | Movie Files | | `Video` |
| `MusicAlbum` | Music Albums | | `Audio` |
| `MusicArtist` | Music Artists | | `Audio` |
| `MusicTrack` | Music Tracks | `Music` | `Audio` |
| `MusicVideo` | Music Video | | `Video` |
| `OculusVR` | Oculus VR | `Oculus VR` | |
| `OpenBOR` | OpenBOR | | |
| `PalmOS` | Palm OS | `Palm OS` | |
| `Pico8` | PICO-8 | | |
| `PodcastEpisode` | Podcast Episode | | `Audio` |
| `PodcastSeries` | Podcast Series | | `Audio` |
| `PlugNPlay` | Plug & Play TV Games | | |
| `SteamVR` | SteamVR | `Steam VR` | |
| `TIC80` | TIC-80 | | |
| `TVEpisode` | TV Episodes | `TV` | `Video` |
| `TVSeason` | TV Season | | `Video` |
| `TVShow` | TV Shows | | `Video` |
| `Video` | Video Files | | |
| `visionOS` | visionOS | `Apple visionOS` | |
| `WebBrowser` | Web browser | `Web browser`, `Browser` | |
| `WindowsMixedReality` | Windows Mixed Reality | `Windows Mixed Reality`, `Windows MR`, `WMR` | |
| `WindowsMobile` | Windows Mobile | `Windows Mobile`, `WinMo` | |
| `WindowsPhone` | Windows Phone | `Windows Phone`, `Windows Phone OS` | |

## Usage notes

- **System IDs are case-insensitive** when used in configuration files and ZapScript commands
- **Aliases** are explicit alternative names that Core treats as the same system, such as `MegaDrive` for `Genesis`, `GB` for `Gameboy`, or `N64` for `Nintendo64`
- **Fallbacks** let Core try related systems when resolving launchers, searches, or random selection. Core checks the requested system first and only tries each fallback tier when the previous tier has no result. For example, `GameboyColor` can fall back to `Gameboy`, and MiSTer's `CPS1` classification can fall back to `Arcade`
- Not all systems are supported on every platform - check your [platform's documentation](../platforms/index.mdx) for launcher-specific support
- System defaults can be configured in your [configuration file](../core/config.md#systems)
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
