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

If Steam is installed, Zaparoo will pick up all Steam games during index and show them in the App. You can also manually create a Steam token by writing `steam://<game_id>` to a card, where `<game_id>` is the ID of the game you want to launch.

:::warning

Zaparoo will find game libraries in other locations and drives, but it will only detect Steam itself in the default folder `C:\Program Files (x86)\Steam`. This will be configurable in the future.

:::

### LaunchBox

**The LaunchBox plugin CLI_Launcher must be installed for launching to work. Install it from [here](https://forums.launchbox-app.com/files/file/4587-cli-launcher-launchbox-command-line-interface-for-launching-games-directly-from-stream-deck/).**

Zaparoo will automatically detect LaunchBox and add all games to the App. You can also manually create a LaunchBox token by writing `launchbox://<game_id>` to a card, where `<game_id>` is the ID of the game you want to launch. Zaparoo supports most game systems included in LaunchBox.

Since LaunchBox doesn't have a standard install location, Zaparoo will to its best to find it, but you can set the location manually by adding the following to your `config.toml` file:

```toml
[[launchers.default]]
launcher = 'LaunchBox'
install_dir = 'C:\\Users\\wizzo\\CustomLBDir'
```

Replace the `install_dir` option with your own path to LaunchBox.

### Flashpoint

If it's installed, Zaparoo support launching Flashpoint games although it won't index them to display in the App. You can manually create a Flashpoint token by writing `flashpoint://<game_id>` to a card, where `<game_id>` is the ID of the game you want to launch, or you can copy the URL straight from the Flashpoint launcher.

### Executables

Launching several types of executable files is supported: `.exe`, `.bat`, `.cmd`, `.cmd`, `.lnk`, `.a3x` and `.ahk`. You can just copy the full path to the executable to a card.

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
