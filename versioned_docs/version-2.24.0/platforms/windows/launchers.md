---
description: "Zaparoo launcher configuration for Windows: Steam, LaunchBox, Big Box, Playnite, RetroArch, standalone emulators, and custom launchers with file path examples."
keywords: [zaparoo windows launchers, zaparoo steam windows, zaparoo launchbox, zaparoo big box, zaparoo playnite, windows emulators nfc, windows game launch nfc]
---

# Launchers

Detailed launcher configuration for Windows.

## Windows paths in TOML

Backslashes must be escaped inside double-quoted TOML strings. You can instead use a single-quoted literal string when you want to paste a Windows path unchanged:

```toml
# Double-quoted string
install_dir = "C:\\Games\\LaunchBox"

# Literal string
install_dir = 'C:\Games\LaunchBox'
```

An invalid TOML file can prevent Core from loading any configuration, not just the launcher with the incorrect path. See the [config file reference](../../core/config/index.md) for general syntax and reload behavior.

## Window focus

Core brings tracked applications to the foreground after launching them, including minimized windows. It waits up to five seconds for a window owned by the launched process or one of its descendants. This applies to built-in and [custom launchers](../../features/custom-launchers.md) that start a tracked process.

If an application still opens behind another window, check whether its launcher starts a detached process more than five seconds later. Core cannot focus a window it can no longer associate with the launched process tree.

## Steam

Launches games from your Steam library via the `steam://` URL scheme. Both official Steam games and non-Steam shortcuts are detected.

Steam is auto-detected via Windows registry. Games are indexed from your Steam library folders.

To manually launch a Steam game, write `steam://<app_id>` to a token. For example: `steam://1145360` for Hades. If the game is not installed, Core opens its Steam details page instead and leaves whatever is running alone.

```toml title="config.toml"
[[launchers.default]]
launcher = "Steam"
install_dir = "D:\\Steam"  # Optional custom Steam install directory
```

## LaunchBox

The Zaparoo LaunchBox integration works in both the desktop LaunchBox interface and Big Box. Both interfaces use the same plugin, indexed game library, and `launchbox://` token format.

:::tip Required Plugin
LaunchBox integration requires the Zaparoo plugin. Download [Zaparoo LaunchBox Integration v1.3.0.zip](https://zaparoo.org/files/Zaparoo%20LaunchBox%20Integration%20v1.3.0.zip) and follow the installation steps below.
:::

### Plugin Installation

1. Download the [Zaparoo LaunchBox Integration v1.3.0.zip](https://zaparoo.org/files/Zaparoo%20LaunchBox%20Integration%20v1.3.0.zip) file
2. Extract the zip file
3. Copy the `Zaparoo LaunchBox Integration` folder to the `Plugins` directory under your LaunchBox installation
4. Restart LaunchBox

To verify the plugin loaded correctly, right-click any game in the desktop LaunchBox interface. You should see **Write to tag** in the context menu.

Once installed, Zaparoo automatically detects the LaunchBox library and adds its games to the media database. When Big Box is running, the plugin launches the selected game through the Big Box interface. The plugin shows the game in Big Box before starting it, so marquee and lighting tools such as LEDBlinky react to the right game, and it returns Big Box to its previous view and brings it back to the foreground when the game exits.

To manually create a LaunchBox or Big Box game token, write `launchbox://<game_id>` to a token.

```toml title="config.toml"
[[launchers.default]]
launcher = "LaunchBox"
install_dir = "D:\\LaunchBox"  # Optional custom install directory
```

## PinUP Popper

Launches virtual pinball tables through [PinUP Popper](https://www.nailbuster.com/wikipinup/doku.php). Popper is auto-detected from the registry, and tables from every Popper emulator (Visual Pinball, Future Pinball, Pinball FX, and others) are indexed under the `Pinball` system. Popper's own metadata and images are imported after a media database update; see [pinup-popper](../../features/scraping.md#pinup-popper).

To manually launch a table, write `popper://<game_id>` to a token, using the table's GameID from Popper's database.

## RetroBat

RetroBat integration uses the EmulationStation API. RetroBat must be running for games to launch.

Games are automatically detected from your RetroBat `roms` folder based on `gamelist.xml` files.

```toml title="config.toml"
[[launchers.default]]
launcher = "RetroBat"
install_dir = "D:\\RetroBat"  # Optional custom install directory
```

### Web API access

Core launches games and detects the running game through RetroBat's EmulationStation web API, which it reaches at `http://localhost:1234` on the same PC. If RetroBat is running but games won't launch, check its web access setting and Windows `localhost` resolution.

First, enable EmulationStation's web access. In RetroBat's EmulationStation menu this sits under the system settings, typically **Main Menu** > **System Settings** > **Frontend Developer Options** > **Enable public web access**. Restart RetroBat after changing it. If the option has moved, check the RetroBat wiki or Discord; the menu layout changes between versions.

Second, make sure `localhost` resolves to `127.0.0.1`. Core connects to `localhost`, and on some Windows setups that name resolves only to IPv6 (`::1`) or fails to resolve, which stops Core from reaching the web server. Editing the Windows hosts file at `C:\Windows\System32\drivers\etc\hosts` as administrator to include this line forces an IPv4 match:

```text
127.0.0.1 localhost
```

### Supported systems

| System ID | RetroBat Folder |
|-----------|-----------------|
| `Arcade` | `mame`, `fbneo` |
| `Atomiswave` | `atomiswave` |
| `NAOMI` | `naomi` |
| `NAOMI2` | `naomi2` |
| `Model2` | `model2` |
| `Model3` | `model3` |
| `Triforce` | `triforce` |
| `Chihiro` | `chihiro` |
| `Hikaru` | `hikaru` |
| `CPS1` | `cps1` |
| `CPS2` | `cps2` |
| `CPS3` | `cps3` |
| `DAPHNE` | `daphne` |
| `Singe` | `singe` |
| `SG1000` | `sg1000` |
| `MasterSystem` | `mastersystem` |
| `Genesis` | `megadrive` |
| `MegaCD` | `megacd` |
| `Sega32X` | `sega32x` |
| `Saturn` | `saturn` |
| `Dreamcast` | `dreamcast` |
| `GameGear` | `gamegear` |
| `NES` | `nes` |
| `FDS` | `fds` |
| `SNES` | `snes` |
| `SNESMSU1` | `snes-msu1` |
| `Sufami` | `sufami` |
| `Nintendo64` | `n64` |
| `GameCube` | `gamecube` |
| `Wii` | `wii` |
| `WiiU` | `wiiu` |
| `Switch` | `switch` |
| `VirtualBoy` | `virtualboy` |
| `Gameboy` | `gb` |
| `Gameboy2P` | `gb2players` |
| `SGBMSU1` | `gb-msu` |
| `GameboyColor` | `gbc` |
| `GBA` | `gba` |
| `GBA2P` | `gba2players` |
| `NDS` | `nds` |
| `PokemonMini` | `pokemini` |
| `GameNWatch` | `gw` |
| `PSX` | `psx` |
| `PS2` | `ps2` |
| `PS3` | `ps3` |
| `PS4` | `ps4` |
| `Xbox` | `xbox` |
| `Xbox360` | `xbox360` |
| `TurboGrafx16` | `pcengine` |
| `TurboGrafx16CD` | `pcenginecd` |
| `SuperGrafx` | `supergrafx` |
| `PCFX` | `pcfx` |
| `NeoGeo` | `neogeo` |
| `NeoGeoCD` | `neogeocd` |
| `Atari2600` | `atari2600` |
| `Atari5200` | `atari5200` |
| `Atari7800` | `atari7800` |
| `AtariLynx` | `lynx` |
| `Jaguar` | `jaguar` |
| `JaguarCD` | `jaguarcd` |
| `3DO` | `3do` |
| `ColecoVision` | `colecovision` |
| `Intellivision` | `intellivision` |
| `ChannelF` | `channelf` |
| `Vectrex` | `vectrex` |
| `Odyssey2` | `odyssey2` |
| `Amiga500` | `amiga500` |
| `Amiga1200` | `amiga1200` |
| `AmigaCD32` | `amigacd32` |
| `Amstrad` | `amstradcpc` |
| `Atari800` | `atari800` |
| `AtariST` | `atarist` |
| `AtariXEGS` | `xegs` |
| `C64` | `c64` |
| `MSX1` | `msx1` |
| `MSX2` | `msx2` |
| `MSX2Plus` | `msx2+` |
| `ZXSpectrum` | `zxspectrum` |
| `ZX81` | `zx81` |
| `X68000` | `x68000` |
| `X1` | `x1` |
| `PC88` | `pc88` |
| `PC98` | `pc98` |
| `Aquarius` | `aquarius` |
| `SAMCoupe` | `samcoupe` |
| `Thomson` | `thomson` |
| `Spectravideo` | `spectravideo` |
| `Oric` | `oricatmos` |

## Playnite

Launches games from your [Playnite](https://playnite.link/) library through Playnite, so Playnite's own play actions, emulator setups, and time tracking apply. Core finds Playnite in the folder set with `install_dir`, then through its installer's registry entry, then in `%LOCALAPPDATA%\Playnite`.

Playnite needs the Zaparoo extension. Download [Zaparoo Playnite Integration v1.0.0.pext](https://zaparoo.org/files/Zaparoo%20Playnite%20Integration%20v1.0.0.pext) and open it, or drag it onto the Playnite window, to install it. With the extension installed, right-click a game in Playnite and choose **Write to Zaparoo tag** to write a token for it.

Playnite must be running with the extension loaded when you update the media database, because Core reads the library through it. Hidden and uninstalled games are left out, and so are Steam games when Core already indexes them through the [Steam launcher](#steam). Games are filed under the matching Zaparoo system, and games with no platform go under `PC`. Games on a platform Core does not recognize are left out.

To manually create a Playnite game token, write `playnite://<game_id>` to a token, using the game's ID from Playnite. Playnite does not need to be running to launch a game; Core starts it. Games started from Playnite itself also show as playing in Zaparoo.

After a media database update, the `playnite` [scraper](../../features/scraping.md#playnite) imports Playnite's own metadata and cover images.

```toml title="config.toml"
[[launchers.default]]
launcher = "Playnite"
install_dir = "D:\\Playnite"  # Optional custom install directory
```

## RetroArch

Core registers RetroArch launchers for supported systems when it finds RetroArch, using the same search as [standalone emulators](#standalone-emulators), or the Steam version of RetroArch. Use RetroArch to install the cores for the systems you want to launch. A launcher whose core file is missing from RetroArch's `cores` folder is reported as unavailable.

RetroArch launchers scan ES-DE-style system folders such as `nes`, `snes`, and `megadrive` under each configured [`launchers.index_root`](../../core/config/launchers.md#index_root). Games start in fullscreen.

Built-in controls include save state, load state, menu, pause, reset, fast forward, rewind, and stop, plus disc tray, next disc, and previous disc for multi-disc games. Core enables these through a small network-command overlay at `%localappdata%\zaparoo\retroarch-network.cfg`; it does not modify your primary RetroArch configuration.

## Standalone emulators

Core registers a launcher for each emulator below that it finds installed. For each emulator it checks, in order:

1. An `install_dir` set for one of the emulator's launcher IDs or for the emulator name, pointing at the executable or its folder.
2. The emulator's Windows App Paths and uninstall registry entries.
3. Scoop and winget installs, and `PATH`.
4. Folders named after the emulator inside common locations: `%USERPROFILE%\Emulators`, the EmuDeck and ES-DE `Emulators` folders, `Emulators` or `Emulation\Emulators` at the root of each local drive, the folder that holds each `index_root`, Program Files, `%LOCALAPPDATA%`, `Games` folders, the root of each local drive, and your home, Desktop, Downloads, and Documents folders.

```toml title="config.toml"
[[launchers.default]]
launcher = "Dolphin"
install_dir = 'D:\Emus\Dolphin-x64'
```

Emulators scan ES-DE-style folders under each configured [`launchers.index_root`](../../core/config/launchers.md#index_root), so set it to the folder that holds your system folders. Core does not scan for standalone emulator games without it. Each launcher also scans the folder named after its Zaparoo system ID. Launchers marked "launch by path" have no scanned folders; Core launches a file through them when a token or a [custom launcher](../../features/custom-launchers.md) names the file explicitly.

```toml title="config.toml"
[launchers]
index_root = ['D:\ROMs']
```

When two emulators can open the same file, the one listed first in the table is used. To pick another, set a [launcher default](../../core/config/launchers.md) or use a [custom launcher](../../features/custom-launchers.md). A custom launcher with the same ID as a built-in one replaces it.

| Emulator | Launcher IDs | Folders |
|----------|--------------|---------|
| GroovyMAME | `GroovyMAME` | `arcade`, `mame` |
| MAME | `MAME` | `arcade`, `mame` |
| FinalBurnNeo | `FinalBurnNeo`, `FinalBurnNeoNeoGeo` | `fbneo`, `arcade`, `neogeo` |
| Supermodel | `Supermodel` | `model3` |
| Flycast | `FlycastDreamcast`, `FlycastNaomi`, `FlycastAtomiswave` | `dreamcast`, `dc`, `naomi`, `atomiswave` |
| Demul | `DemulDreamcast`, `DemulNaomi`, `DemulAtomiswave` | `dreamcast`, `dc`, `naomi`, `atomiswave` |
| Dolphin | `DolphinGameCube`, `DolphinWii` | `gamecube`, `gc`, `wii` |
| PrimeHack | `PrimeHackGameCube`, `PrimeHackWii` | Launch by path |
| Cemu | `Cemu` | `wiiu` |
| Ryujinx | `Ryubing` | `switch` |
| Eden | `Eden` | `switch` |
| Azahar | `Azahar` | `3ds`, `n3ds` |
| melonDS | `MelonDS` | `nds` |
| DeSmuME | `DeSmuME` | `nds` |
| NO$GBA | `NoGBA` | `nds` |
| mGBA | `mGBAGBA`, `mGBAGB`, `mGBAGBC` | `gba`, `gb`, `gbc` |
| SameBoy | `SameBoyGB`, `SameBoyGBC` | `gb`, `gbc` |
| VisualBoyAdvance-M | `VBAMGBA`, `VBAMGB`, `VBAMGBC` | `gba`, `gb`, `gbc` |
| Mesen | `MesenNES`, `MesenFDS`, `MesenSNES`, `MesenGB`, `MesenGBC`, `MesenGBA`, `MesenPCEngine`, `MesenMasterSystem`, `MesenGameGear`, `MesenWonderSwan`, `MesenWonderSwanColor` | `nes`, `fds`, `snes`, `gb`, `gbc`, `gba`, `pcengine`, `tg16`, `mastersystem`, `gamegear`, `wswan`, `wonderswan`, `wswanc`, `wonderswancolor` |
| Snes9x | `Snes9x` | `snes` |
| bsnes | `BSNESStandalone` | `snes` |
| Project64 | `Project64` | `n64` |
| RMG | `RMG` | `n64` |
| Gopher64 | `Gopher64` | `n64` |
| Nestopia | `Nestopia` | `nes` |
| puNES | `PuNES` | `nes` |
| DuckStation | `DuckStation` | `psx` |
| PCSX2 | `PCSX2` | `ps2` |
| Play! | `PlayPS2` | `ps2` |
| PPSSPP | `PPSSPP` | `psp` |
| RPCS3 | `RPCS3` | `ps3` |
| Vita3K | `Vita3K` | `psvita`, `vita` |
| shadPS4 | `ShadPS4` | `ps4` |
| Mednafen | `MednafenPSX`, `MednafenSaturn`, `MednafenPCEngine`, `MednafenPCEngineCD`, `MednafenSuperGrafx`, `MednafenPCFX`, `MednafenLynx`, `MednafenNeoGeoPocket`, `MednafenNeoGeoPocketColor`, `MednafenWonderSwan`, `MednafenWonderSwanColor`, `MednafenVirtualBoy` | `psx`, `saturn`, `pcengine`, `tg16`, `pcenginecd`, `tg-cd`, `supergrafx`, `pcfx`, `lynx`, `atarilynx`, `ngp`, `ngpc`, `wswan`, `wonderswan`, `wswanc`, `wonderswancolor`, `virtualboy` |
| Kega Fusion | `KegaFusionGenesis`, `KegaFusionMasterSystem`, `KegaFusionGameGear`, `KegaFusion32X`, `KegaFusionMegaCD` | `megadrive`, `genesis`, `mastersystem`, `gamegear`, `sega32x`, `megacd`, `segacd` |
| BlastEm | `BlastEm` | `megadrive`, `genesis` |
| jgenesis | `JgenesisGenesis`, `JgenesisMasterSystem`, `JgenesisGameGear`, `JgenesisMegaCD`, `Jgenesis32X` | `megadrive`, `genesis`, `mastersystem`, `gamegear`, `megacd`, `segacd`, `sega32x` |
| Redream | `Redream` | `dreamcast`, `dc` |
| Kronos | `Kronos` | `saturn` |
| Ymir | `Ymir` | `saturn` |
| xemu | `Xemu` | `xbox` |
| Xenia Canary | `XeniaCanary` | `xbox360` |
| Xenia Edge | `XeniaEdge` | `xbox360` |
| ares | `AresNES`, `AresSNES`, `AresN64`, `AresGB`, `AresGBC`, `AresGBA`, `AresGenesis`, `AresMegaCD`, `Ares32X`, `AresMasterSystem`, `AresGameGear`, `AresSG1000`, `AresPCEngine`, `AresSuperGrafx`, `AresNeoGeoPocket`, `AresNeoGeoPocketColor`, `AresWonderSwan`, `AresWonderSwanColor`, `AresColecoVision`, `AresMSX` | `nes`, `snes`, `n64`, `gb`, `gbc`, `gba`, `megadrive`, `genesis`, `megacd`, `segacd`, `sega32x`, `mastersystem`, `gamegear`, `sg1000`, `pcengine`, `tg16`, `supergrafx`, `ngp`, `ngpc`, `wswan`, `wonderswan`, `wswanc`, `wonderswancolor`, `colecovision`, `msx1`, `msx` |
| BizHawk | `BizHawkNES`, `BizHawkSNES`, `BizHawkN64`, `BizHawkGB`, `BizHawkGBC`, `BizHawkGBA`, `BizHawkGenesis`, `BizHawkMasterSystem`, `BizHawkGameGear`, `BizHawkPCEngine`, `BizHawkPSX`, `BizHawkAtari2600`, `BizHawkAtari7800`, `BizHawkLynx`, `BizHawkColecoVision`, `BizHawkIntellivision`, `BizHawkVirtualBoy`, `BizHawkWonderSwan`, `BizHawkWonderSwanColor`, `BizHawkNeoGeoPocket`, `BizHawkNeoGeoPocketColor` | `nes`, `snes`, `n64`, `gb`, `gbc`, `gba`, `megadrive`, `genesis`, `mastersystem`, `gamegear`, `pcengine`, `tg16`, `psx`, `atari2600`, `atari7800`, `lynx`, `atarilynx`, `colecovision`, `intellivision`, `virtualboy`, `wswan`, `wonderswan`, `wswanc`, `wonderswancolor`, `ngp`, `ngpc` |
| Stella | `StellaStandalone` | `atari2600` |
| Altirra | `Altirra`, `Altirra5200`, `AltirraXEGS` | `atari800`, `atari5200`, `xegs` |
| Atari800 | `Atari800` | `atari800` |
| A7800 | `A7800` | `atari7800` |
| BigPEmu | `BigPEmu`, `BigPEmuCD` | `jaguar`, `jaguarcd` |
| Hatari | `Hatari` | `atarist` |
| VICE C64 | `ViceC64` | `c64` |
| VICE C128 | `ViceC128` | `c128` |
| VICE VIC-20 | `ViceVIC20` | `c20`, `vic20` |
| VICE Plus/4 | `VicePlus4` | `cplus4`, `plus4`, `c16` |
| WinUAE | `WinUAE` | `amiga` |
| openMSX | `OpenMSX` | `msx`, `msx1`, `msx2` |
| ZEsarUX | `ZEsarUX` | `zxspectrum` |
| DOSBox Staging | `DOSBoxStaging` | `dos` |
| DOSBox-X | `DOSBoxX` | `dos` |
| ScummVM | `ScummVMStandalone` | Launch by path |
| Ruffle | `Ruffle` | `flash` |

## Flashpoint

Launches games from [Flashpoint Archive](https://flashpointarchive.org/). Games won't appear in the media database, but you can manually create tokens by writing `flashpoint://<game_id>` or copying the URL from the Flashpoint launcher.

## Kodi

Plays media via Kodi's JSON-RPC API. Kodi must be running with remote control enabled.

### Local Files

| System ID | Extensions |
|-----------|------------|
| `Video` | `.avi`, `.mp4`, `.mkv`, `.iso`, `.bdmv`, `.ifo`, `.mpeg`, `.mpg`, `.mov`, `.wmv`, `.flv`, `.webm`, `.m4v`, `.3gp`, `.ts`, `.m2ts`, `.mts`, `.m3u`, `.m3u8` |
| `MusicTrack` | `.mp3`, `.flac`, `.ogg`, `.m4a`, `.wav`, `.wma`, `.aac`, `.opus` |

### Library Media

| System ID | Description |
|-----------|-------------|
| `Movie` | Movies from Kodi library |
| `TVEpisode` | TV episodes from Kodi library |
| `TVShow` | TV shows (plays every episode from the first) |
| `MusicTrack` | Songs from Kodi library |
| `MusicAlbum` | Albums from Kodi library |
| `MusicArtist` | Artists from Kodi library (plays all songs) |

### Configuration

Configure the Kodi server URL in `config.toml`:

```toml title="config.toml"
[[launchers.default]]
launcher = "Kodi"
server_url = "http://192.168.1.100:8080"
```

Kodi 19 and later require a username and password for the web server. Set both in Kodi under **Settings > Services > Control**, then add them to `auth.toml` under the same URL and restart Core:

```toml title="auth.toml"
["http://192.168.1.100:8080"]
username = "kodi"
password = "your_password"
```

## Media servers

Plex and Jellyfin launchers play on a TV or other player, and the RomM launcher downloads games from a RomM server, then launches them with the launchers on this page. See [Media Servers](../../features/media-servers.md) for setup.

## Web Browser

Opens URLs in the default web browser. Supports `http://` and `https://` schemes.

## Executables

:::danger Security Risk
Be extremely careful! Executables can do anything, including deleting files and installing malware. Only use this feature if you trust the executable.
:::

| System ID | Extensions |
|-----------|------------|
| Any | `.exe` |

Executables must be explicitly allowed in `config.toml`:

```toml title="config.toml"
[launchers]
allow_file = [
    '^C:\\Games\\.*\\.exe$',
    '^D:\\Emulators\\.*\\.exe$'
]
```

## Scripts

:::danger Security Risk
Scripts can execute arbitrary code. Only allow scripts you trust.
:::

| System ID | Extensions |
|-----------|------------|
| Any | `.bat`, `.cmd`, `.lnk`, `.a3x`, `.ahk` |

Scripts must be explicitly allowed in `config.toml`:

```toml title="config.toml"
[launchers]
allow_file = [
    '^C:\\Scripts\\.*\\.bat$',
    '^C:\\Scripts\\.*\\.ahk$'
]
```

## Custom Launchers

Custom launchers allow you to start ROMs with a specified emulator. They are TOML files placed in the launcher directory (`%localappdata%\zaparoo\launchers`).

Example for PCSX2:

```toml title="PCSX2PS2_zaparoo_launcher.toml"
[[launchers.custom]]
id = "PCSX2PS2"
system = "PS2"
media_dirs = ["D:\\Emulation\\Roms\\PS2"]
file_exts = [".iso", ".bin", ".img", ".nrg", ".mdf", ".chd"]
execute = "\"D:\\Emulation\\Emulators\\PCSX2-Nightly\\pcsx2-qt.exe\" \"[[media_path]]\""
```

### Quoting paths and PowerShell

Core runs the `execute` command directly, without a shell. It splits the string into a program and arguments itself (respecting single and double quotes), then starts the program. This stops characters in a ROM path from being treated as shell commands.

Launch the emulator executable directly whenever you can, as in the example above. Quote the program path and `[[media_path]]` separately so paths with spaces (like `D:\Roms\Sony - PlayStation 2\`) stay intact. Running the executable directly also lets Core track the process for [media tracking](../../features/custom-launchers.md).

:::warning Avoid wrapping the command in PowerShell
Wrapping the launch in PowerShell with `Start-Process -ArgumentList '"[[media_path]]"'` makes PowerShell parse the arguments a second time. It can strip your quotes and split the path on its spaces. A folder name with a space or hyphen like `Sony - PlayStation 2` then breaks, giving errors such as `Unknown parameter: '-'` and launching the emulator with no game. Use a PowerShell wrapper only when you need PowerShell-specific behavior.
:::

If you do need PowerShell, such as to set an environment variable before launching, put the whole script in one `-Command "..."` argument and use the call operator `&` with single-quoted paths:

```toml
execute = "powershell -WindowStyle Hidden -NoProfile -ExecutionPolicy Bypass -Command \"& 'D:\\Emulation\\Emulators\\PCSX2-Nightly\\pcsx2-qt.exe' '[[media_path]]'\""
```

The whole `& '...' '...'` script is a single argument to `-Command`, so Core passes it to PowerShell untouched, and PowerShell's single quotes keep the paths intact.

<details>
  <summary>PowerShell script for automatic launcher creation</summary>

```powershell title="launcher-generator.ps1"
Write-Host "=== Zaparoo Launcher TOML Generator ==="

$system = Read-Host "Enter system name (e.g., CPS2, PS1, NES)"
$rompath = Read-Host "Enter full path to ROM folder"
$emupath = Read-Host "Enter full path to emulator executable"

$coreMap = @{
    "PS1"     = "mednafen_psx_hw_libretro.dll"
    "PS2"     = ""
    "NES"     = "mesen_libretro.dll"
    "SNES"    = "snes9x_libretro.dll"
    "N64"     = "mupen64plus_next_libretro.dll"
    "GBA"     = "mgba_libretro.dll"
    "CPS1"    = "fbalpha2012_cps1_libretro.dll"
    "CPS2"    = "fbalpha2012_cps2_libretro.dll"
    "CPS3"    = "fbalpha2012_cps3_libretro.dll"
    "NeoGeo"  = "fbalpha2012_neogeo_libretro.dll"
    "Arcade"  = "fbneo_libretro.dll"
    "Genesis" = "genesis_plus_gx_libretro.dll"
    "TG16"    = "mednafen_pce_fast_libretro.dll"
    "GB"      = "gambatte_libretro.dll"
    "GBC"     = "gambatte_libretro.dll"
    "DS"      = "melonds_libretro.dll"
    "PSP"     = "ppsspp_libretro.dll"
    "Saturn"  = "mednafen_saturn_libretro.dll"
    "Dreamcast" = "flycast_libretro.dll"
    "3DO"     = "opera_libretro.dll"
    "MSX"     = "bluemsx_libretro.dll"
    "DOS"     = "dosbox_pure_libretro.dll"
    "ScummVM" = "scummvm_libretro.dll"
    "Amiga"   = "puae_libretro.dll"
}

$extMap = @{
    "PS1"     = '".cue", ".bin", ".iso", ".chd"'
    "NES"     = '".nes"'
    "SNES"    = '".sfc", ".smc"'
    "N64"     = '".z64", ".n64", ".v64"'
    "GBA"     = '".gba"'
    "CPS1"    = '".zip"'
    "CPS2"    = '".zip"'
    "CPS3"    = '".zip"'
    "NeoGeo"  = '".zip"'
    "Arcade"  = '".zip"'
    "Genesis" = '".md", ".bin"'
    "TG16"    = '".pce"'
    "GB"      = '".gb"'
    "GBC"     = '".gbc"'
    "DS"      = '".nds"'
    "PSP"     = '".iso", ".cso"'
    "Saturn"  = '".cue", ".bin"'
    "Dreamcast" = '".cdi", ".gdi"'
    "3DO"     = '".iso"'
    "MSX"     = '".rom", ".dsk"'
    "DOS"     = '".zip"'
    "ScummVM" = '".svm"'
    "Amiga"   = '".adf"'
}

$corepath = $null
if ($coreMap.ContainsKey($system)) {
    $core = $coreMap[$system]
    if ($core -ne "") {
        $corepath = Join-Path (Split-Path $emupath) "cores\$core"
    }
}

$rompath = $rompath -replace '\\', '\\'
$emupath = $emupath -replace '\\', '\\'
if ($corepath) { $corepath = $corepath -replace '\\', '\\' }

# Launch the executable directly. Single quotes keep paths with spaces intact
# through Core's command split, and avoid a second round of PowerShell parsing.
if ($corepath) {
    $exec = "'$emupath' -L '$corepath' '[[media_path]]'"
} else {
    $exec = "'$emupath' '[[media_path]]'"
}

$exts = if ($extMap.ContainsKey($system)) { $extMap[$system] } else { '".zip"' }

$outfile = "${system}_zaparoo_launcher.toml"
@"
[[launchers.custom]]
id = "$system"
system = "$system"
media_dirs = ["$rompath"]
file_exts = [$exts]
execute = "$exec"
"@ | Set-Content -Encoding UTF8 $outfile

Write-Host "`nTOML launcher created: $outfile"
Read-Host -Prompt "`nPress Enter to exit"
```

</details>
