# Windows

| Item               | Path                                 |
| ------------------ | ------------------------------------ |
| Data directory     | `%localappdata%/zaparoo`             |
| Mappings directory | `%localappdata%/zaparoo/mappings`    |
| Launcher directory | `%localappdata%/zaparoo/launchers`   |
| Config file        | `%localappdata%/zaparoo/config.toml` |
| Log file           | `%temp%/zaparoo/core.log`            |

<small>_You can access these paths by pasting them in the Explorer address bar or in a Win+R dialog._</small>

## Install

Download Zaparoo Core for Windows from the [Downloads page](/downloads/) and copy the `Zaparoo.exe` file anywhere you want.

Run `Zaparoo.exe` and it will open minimized in the system tray. You can make Zaparoo run on startup by making a shortcut to the .exe in the standard Windows startup folder.

From this point, Zaparoo is now set up! You should be able to connect a reader and set up cards using the Zaparoo App.

## Supported Readers

| Reader                                            | Status |
| ------------------------------------------------- | ------ |
| [PN532](/docs/core/drivers#pn532)                 | ✅     |
| [ACR122U (PCSC)](/docs/core/drivers#acr122u-pcsc) | ✅     |
| [File Reader](/docs/core/drivers#file)            | ✅     |
| [TTY2OLED](/docs/core/drivers#tty2oled)           | ✅     |

## Supported Launchers

| Launcher       | Systems/Extensions                   | Notes                                             |
| -------------- | ------------------------------------ | ------------------------------------------------- |
| Kodi           | Movies, TV Shows, Music, Collections | Media library integration with API enabled        |
| Steam          | PC games                             | Automatic detection of Steam library              |
| LaunchBox      | Retro games                          | Requires CLI_Launcher plugin                      |
| RetroBat       | 50+ retro systems                    | Via EmulationStation API when RetroBat is running |
| Custom Scripts | `.bat`, `.ps1` files                 | Batch/PowerShell script execution                 |

## Launcher Details

There is support for a handful of launchers on Windows. You can also add your own launchers (as of Zaparoo core 2.4.0)

### Steam

If Steam is installed, Zaparoo will pick up all Steam games during media database updates and show them in the App. You can also manually create a Steam card by writing `steam://<game_id>` to a card, where `<game_id>` is the Steam ID of the game you want to launch.

:::warning

Zaparoo will find game libraries in other locations and drives, but it will only detect Steam itself in the default folder `C:\Program Files (x86)\Steam`. This will be configurable in a future update.

:::

### LaunchBox

:::note

The LaunchBox plugin _CLI_Launcher_ must be installed for launching to work. Download it [from here](https://forums.launchbox-app.com/files/file/4587-cli-launcher-launchbox-command-line-interface-for-launching-games-directly-from-stream-deck/).

:::

Zaparoo will automatically detect LaunchBox and add all games to the App. Zaparoo supports most game systems included in LaunchBox.

To manually add a LaunchBox game, write `launchbox://<game_id>` on a card. Replace `<game_id>` with the game's LaunchBox ID.

#### LauncBox Install Location

Since LaunchBox doesn't have a standard install location, Zaparoo will do its best to find it, but you can set the location manually by adding the following to your `config.toml` file:

```toml
[[launchers.default]]
launcher = 'LaunchBox'
install_dir = 'C:\\Users\\wizzo\\CustomLBDir'
```

Replace the `install_dir` value with your own path to LaunchBox.

### Custom Launchers

Custom launchers allow you to start roms with a specified emulator and scan and write them with the Zaparoo app.
Custom launchers are toml files with launching criteria such as: System, Rom path, Emulator path and a powershell handeling to launch this.
Just copy the toml files to the launcher directory stated above.

Example for PCSX2:

```toml
[[launchers.custom]]
id = "PCSX2PS2"
system = "PS2"
media_dirs = ["D:\\Emulation\\Roms\\PS2"]
file_exts = [".iso", ".bin", ".img", ".nrg", ".mdf", ".chd"]
execute = "powershell -WindowStyle Hidden -NoProfile -ExecutionPolicy Bypass -Command Start-Process -FilePath 'D:\\Emulation\\Emulators\\PCSX2-Nightly\\pcsx2-qt.exe' -ArgumentList '\"[[media_path]]\"'"
```

#### Custom launcher creator

You can also use this powershell script to automatically create a launcher using a command gui:

```powershell
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

# Only double slashes (\\) for TOML
$rompath = $rompath -replace '\\', '\\'
$emupath = $emupath -replace '\\', '\\'
if ($corepath) { $corepath = $corepath -replace '\\', '\\' }

if ($corepath) {
    $exec = "powershell -WindowStyle Hidden -NoProfile -ExecutionPolicy Bypass -Command Start-Process -FilePath '$emupath' -ArgumentList '-L', '$corepath', '[[media_path]]'"
} else {
    $exec = "powershell -WindowStyle Hidden -NoProfile -ExecutionPolicy Bypass -Command Start-Process -FilePath '$emupath' -ArgumentList '[[media_path]]'"
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

### Flashpoint

If it's installed, Zaparoo supports launching [Flashpoint](https://flashpointarchive.org/) games, although it won't include them in the media database and display in the App. You can manually create a Flashpoint card by writing `flashpoint://<game_id>` to a card, where `<game_id>` is the ID of the game you want to launch, or you can copy the URL straight from the Flashpoint launcher.

### Executables

:::danger

Be careful with this feature! Executables can do anything, including deleting files and installing malware. Only use this feature if you trust the executable, and are ok with it potentially being run remotely within your local network.

:::

Launching several types of executable files is supported: `.exe`, `.bat`, `.cmd`, `.lnk`, `.a3x` and `.ahk`. You can just copy the full path of the executable to a card.

Executables _must_ be explicitly allowed in the `config.toml` file. You can do this by adding something like the following to your `config.toml` file:

```toml
[launchers]
allow_file = [
    '^C:\\some\\file.exe$',
    '^C:\\some\\other\\file.bat$',
    '^C:\\some\\other\\file.cmd$'
]
```

Make sure to restart Zaparoo after you add this to the config file. If there's already a `[launchers]` section, just add the `allow_file` line to it. You can also use wildcards in the path, but be careful with them as they can match a lot of files. For example, `C:\\some\\.*.exe` will match all `.exe` files in the `C:\some\` directory.

## Creating Batch Files

While the Windows platform is still in development, batch files can be used as a stand in for missing launcher support. Here are some examples of creating batch files for some common launchers.

When you create a batch file, it _must_ be added to the `allow_file` setting in the `config.toml` file, and then Zaparoo needs to be restarted. See the [Executables](#executables) section for more information.

### PCSX2 Example

This example will create a batch file to launch a single PS2 games using the PCSX2 emulator.

1. Open Notepad.
2. Locate the emulator executable and make note of the path. For example: `C:\Program Files\PCSX2 1.7.0\pcsx2.exe`.
3. Copy the following code into Notepad, replacing the path with your own, and making sure to include quotes:
   ```batch
   @echo off
   "C:\Program Files\PCSX2 1.7.0\pcsx2.exe"
   ```
4. Locate the path of the game you want to launch. For example: `C:\Games\PS2\Final Fantasy X.iso`.
5. Copy this path to the end of the batch file, making sure to include quotes:
   ```batch
   @echo off
   "C:\Program Files\PCSX2 1.7.0\pcsx2.exe" "C:\Games\PS2\Final Fantasy X.iso"
   ```
6. Save the file with a `.bat` extension. For example: `C:\Zaparoo\PCSX2_FFX.bat`.
7. Open Zaparoo's `config.toml` file and add `C:\\Zaparoo\\PCSX2_FFX.bat` to the `allow_file` setting:
   ```toml
   [launchers]
   allow_file = [
        '^C:\\some\\other\\existing\\entry.exe$',
        '^C:\\Zaparoo\\PCSX2_FFX.bat$'
   ]
   ```
8. Restart Zaparoo.
9. Write `C:\Zaparoo\PCSX2_FFX.bat` to a card.
10. Scan the card with your reader and it should launch the game.

Depending on the emulator, you can also include additional command line arguments. For example:

```batch
@echo off
"C:\Program Files\PCSX2 1.7.0\pcsx2.exe" "C:\Games\PS2\Final Fantasy X.iso" -fullscreen -nogui
```

This will launch the game in fullscreen mode.

### RetroArch Example

RetroArch is very similar to the above PCSX2 example, but it requires launching the `retroarch.exe` executable along with a core argument. For example:

```batch
@echo off
"C:\Program Files\RetroArch\retroarch.exe" -L "C:\Program Files\RetroArch\cores\pcsx2_libretro.dll" "C:\Games\PS2\Final Fantasy X.iso"
```

### VLC Example

Just like the above examples, you can create a batch file to launch VLC with a specific video file. For example:

```batch
@echo off
"C:\Program Files\VideoLAN\VLC\vlc.exe" "C:\Videos\movie.mp4"
```
