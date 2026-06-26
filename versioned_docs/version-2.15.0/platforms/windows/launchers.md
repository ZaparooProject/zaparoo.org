---
description: "Zaparoo launcher configuration for Windows: Steam, LaunchBox, and custom launcher setup with file path examples."
keywords: [zaparoo windows launchers, zaparoo steam windows, zaparoo launchbox, windows game launch nfc]
---

# Launchers

Detailed launcher configuration for Windows.

## Steam

Launches games from your Steam library via the `steam://` URL scheme. Both official Steam games and non-Steam shortcuts are detected.

Steam is auto-detected via Windows registry. Games are indexed from your Steam library folders.

To manually launch a Steam game, write `steam://<app_id>` to a token. For example: `steam://1145360` for Hades.

```toml title="config.toml"
[[launchers.default]]
launcher = "Steam"
install_dir = "D:\\Steam"  # Optional custom Steam install directory
```

## LaunchBox

:::tip Required Plugin
LaunchBox integration requires the Zaparoo plugin. Download [Zaparoo LaunchBox Integration v1.0.0.zip](https://zaparoo.org/files/Zaparoo%20LaunchBox%20Integration%20v1.0.0.zip) and follow the installation steps below.
:::

### Plugin Installation

1. Download the [Zaparoo LaunchBox Integration v1.0.0.zip](https://zaparoo.org/files/Zaparoo%20LaunchBox%20Integration%20v1.0.0.zip) file
2. Extract the zip file
3. Copy the `Zaparoo LaunchBox Integration` folder to your LaunchBox `Plugins` directory (usually `<LaunchBox>/Plugins/`)
4. Restart LaunchBox

To verify the plugin loaded correctly, right-click any game in LaunchBox - you should see "Write to tag" in the context menu.

Once installed, Zaparoo will automatically detect LaunchBox and add all games to the media database.

To manually create a LaunchBox game token, write `launchbox://<game_id>` to a token.

```toml title="config.toml"
[[launchers.default]]
launcher = "LaunchBox"
install_dir = "D:\\LaunchBox"  # Optional custom install directory
```

## RetroBat

RetroBat integration uses the EmulationStation API. RetroBat must be running for games to launch.

Games are automatically detected from your RetroBat `roms` folder based on `gamelist.xml` files.

```toml title="config.toml"
[[launchers.default]]
launcher = "RetroBat"
install_dir = "D:\\RetroBat"  # Optional custom install directory
```

### Web API access

Core launches games and detects the running game through RetroBat's EmulationStation web API, which it reaches at `http://localhost:1234` on the same PC. If RetroBat is running but games won't launch, two things on the RetroBat side usually need attention.

First, enable EmulationStation's web access. In RetroBat's EmulationStation menu this sits under the system settings, typically **Main Menu** > **System Settings** > **Frontend Developer Options** > **Enable public web access**. Restart RetroBat after changing it. If you can't find the option, the RetroBat Discord and wiki are the best places to check, since the menu layout changes between versions.

Second, make sure `localhost` resolves to `127.0.0.1`. Core connects to `localhost`, and on some Windows setups that name resolves only to IPv6 (`::1`) or fails to resolve, which stops Core from reaching the web server. Editing the Windows hosts file at `C:\Windows\System32\drivers\etc\hosts` as administrator to include this line forces an IPv4 match:

```text
127.0.0.1 localhost
```

### Supported Systems

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

## Flashpoint

Launches games from [Flashpoint Archive](https://flashpointarchive.org/). Games won't appear in the media database, but you can manually create tokens by writing `flashpoint://<game_id>` or copying the URL from the Flashpoint launcher.

## Kodi

Plays media via Kodi's JSON-RPC API. Kodi must be running with remote control enabled.

### Local Files

| System ID | Extensions |
|-----------|------------|
| `Video` | `.mp4`, `.mkv`, `.avi`, `.mov`, `.webm`, `.m4v`, `.wmv`, `.flv` |
| `MusicTrack` | `.mp3`, `.flac`, `.ogg`, `.wav`, `.m4a`, `.wma`, `.aac` |

### Library Media

| System ID | Description |
|-----------|-------------|
| `Movie` | Movies from Kodi library |
| `TVEpisode` | TV episodes from Kodi library |
| `TVShow` | TV shows (plays next unwatched episode) |
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

If Kodi requires authentication, add credentials to `auth.toml`:

```toml title="auth.toml"
["http://192.168.1.100:8080"]
username = "kodi"
password = "your_password"
```

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

Launch the emulator executable directly whenever you can, as in the example above. Quote the program path and `[[media_path]]` separately so paths with spaces (like `D:\Roms\Sony - PlayStation 2\`) stay intact. Running the executable directly also lets Core track the process for [media tracking](../../features/launchers.md#custom-launchers).

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
