# Launchers

A launcher is a program that can be used to launch a game or application.
Each [platform](/docs/platforms/) has its own set of launchers, which are used to launch the correct program for the given [system](/docs/core/systems) and file.

## Custom Launchers

Custom launchers are a type of user-defined launcher that can be created and configured using a [TOML](https://toml.io/) file, similar to the [Mapping Files](./mappings.md#mapping-files). For example, if a [platform](/docs/platforms/) you're using Zaparoo on does not support an emulator you use, you can most likely create a custom launcher for it and integrate it into [Zaparoo Core](/docs/core/) like an officially supported one.

Custom launchers aren't as configurable or advanced as official launchers, they're designed for simple cases where it's possible to launch media by giving a file path to the media player.

:::note Media Tracking Limitations
Custom launchers cannot accurately track what media is playing, which means:
- They won't automatically stop when a [token](/docs/tokens/) is removed in hold mode
- The stop command via the API won't work with custom launchers
- Core can't determine if media launched by a custom launcher is still running

Generally this isn't a big deal, and you can get a long way with just this feature.
:::

### Creating a custom launcher

To start, open up the `launchers` directory in the Core data folder. Check the page for your [platform](../platforms/index.md) to see where this folder will be if you're not sure.

Create a new file ending in `.toml`. We'll call our example `OpenEmuGB.toml`. The name isn't too important, though if there are multiple launchers defined with the same ID, the one that was read first will take precedence.

Open the file, and we'll add the following example data:

```toml
[[launchers.custom]]
id = "OpenEmuGB"
system = "Gameboy"
media_dirs = ["/Volumes/games/Gameboy"]
file_exts = [".gb"]
execute = "osascript -e 'tell application \"OpenEmu\" to open POSIX file \"[[media_path]]\"'"
```

The first line, `[[launchers.custom]]`, tells Core this is a custom launcher definition. It's required. Make sure to include the double square brackets.

The `id` line defines the internal ID of the launcher. Generally this won't matter, but you can reference it with the `?launcher=<launcher id>` advanced argument in [ZapScript](../zapscript/index.md). It's also possible to override an existing official launcher.

The `system` line specifies which system this launcher will belong to.

The `media_dirs` line specifies a list of directories where Core should search for media. It can also be a relative path, in which case during media indexing it will be appended to the platform's list of root folders. This definition is also used to match a file to the launcher during scans.

The `file_exts` line is a list of file extensions which will match to this launcher. Extensions are automatically normalized - you can write `".gb"` or `"gb"` and both will work (a `.` prefix is added if missing and extensions are converted to lowercase).

The `execute` line is the command which will be run when a token is scanned which matches to this launcher. This value will be run as is through the console or shell on the platform, with expression variables replaced by their values.

#### Available Expression Variables

You can use the following variables in your execute command:

- `[[media_path]]` - The resolved absolute path to the media file
- `[[platform]]` - The platform ID (e.g., "linux", "windows", "mister")
- `[[version]]` - The Zaparoo Core version
- `[[device.hostname]]` - The device's hostname
- `[[device.os]]` - The operating system ("linux", "windows", "darwin")
- `[[device.arch]]` - The system architecture ("amd64", "arm64", etc.)

Save this file, restart Zaparoo Core, and then run a media database update. You should see all the media detected for this launcher and launchable when scanned!

### More Examples

#### Windows Emulator

```toml
[[launchers.custom]]
id = "WindowsEmulator"
system = "Windows"
media_dirs = ["C:/Games"]
file_exts = [".exe"]
execute = "start \"\" \"[[media_path]]\""
```

#### Platform-Aware Launcher

This example uses expression variables to adapt behavior based on the platform:

```toml
[[launchers.custom]]
id = "PlatformAware"
system = "Multi"
media_dirs = ["games"]
file_exts = [".rom"]
execute = "/opt/launchers/[[platform]]/run.sh \"[[media_path]]\" --host [[device.hostname]]"
```

### Troubleshooting

#### Verifying Your Launcher Loaded

Check the Zaparoo Core logs when it starts up. You should see messages like:
- `found X custom launcher files`
- `loaded X files, Y custom launchers`

If your launcher isn't loading, check for TOML syntax errors in the logs.

#### Testing Commands

Before adding a command to your launcher config, test it manually in your terminal/command prompt. Replace `[[media_path]]` with an actual file path to verify it works.

#### Common Issues

- **Paths with spaces**: Make sure to properly quote paths in your execute command, especially on Windows
- **Launcher precedence**: If multiple launchers match the same files, the first one loaded takes precedence
- **File not found**: Ensure your `media_dirs` paths are absolute or correctly relative to the platform's root folders
- **Command not found**: Verify the programs you're calling in `execute` are installed and in your system's PATH

