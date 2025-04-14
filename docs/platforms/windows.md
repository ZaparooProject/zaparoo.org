# Windows

:::warning

Windows support is still in beta. It has minimal support for some launchers, but is still missing a lot of functionality and mostly relies on batch file launching.

:::

| Item               | Path                                 |
| ------------------ | ------------------------------------ |
| Data directory     | `%localappdata%/zaparoo`             |
| Mappings directory | `%localappdata%/zaparoo/mappings`    |
| Config file        | `%localappdata%/zaparoo/config.toml` |
| Log file           | `%temp%/zaparoo/core.log`            |

<small>_You can access these paths by pasting them in the Explorer address bar or in a Win+R dialog._</small>

## Installation

Download Zaparoo Core for Windows from the [Downloads page](/downloads/) and copy the `Zaparoo.exe` file anywhere you want.

## Setup

Run `Zaparoo.exe` and it will open minimized in the system tray. You can make Zaparoo run on startup by making a shortcut to the .exe in the standard Windows startup folder.

From this point, Zaparoo is now set up! You should be able to connect a reader and set up cards using the Zaparoo App.

## Launchers

There is support for a handful of launchers on Windows.

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
