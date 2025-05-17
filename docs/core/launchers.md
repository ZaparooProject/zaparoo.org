# Launchers

A launcher is a program that can be used to launch a game or application.
Each platform has its own set of launchers, which are used to launch the correct program for the given system and file.

## Custom Launchers

Custom launchers are a type of user-defined launcher that can be created and configured using a TOML file, similar to the [Mapping Files](./mappings#mapping-files). For example, if a platform you're using Zaparoo on does not support an emulator you use, you can most likely create a custom launcher for it and integrate it into Zaparoo Core like an officially supported one.

Custom launchers aren’t as configurable or advanced as official launchers, they're designed for simple cases where it's possible to launch media but giving a file path to the media player. They also don't support accurately tracking what media is playing, which can affect features like hold mode. Generally though, this isn't a big deal and you can get a long way with this feature.

### Creating a custom launcher

To start, open up the `launchers` directory in the Core data folder. Check the page for your [platform](../platforms/index.md) to see where this folder will be if you're not sure.

Create a new file ending in `.toml`. We'll call our example `OpenEmuGB.toml`. The name isn't too important, though if there are multiple launchers defined with the same ID, the one that was read first will take precedence.

Open the file, and we'll add the following example data:

```toml
[[launchers.custom]]
id = "OpenEmuGB"
system = "Gameboy"
media_dirs = ["/Volumes/MiSTer/games/Gameboy"]
file_exts = [".gb"]
execute = "osascript -e 'tell application \"OpenEmu\" to open POSIX file \"{{.MediaPath}}\"'"
```

The first like `[[launchers.custom]]` tells Core this is a custom launcher definition. It's required to make sure to include the double square brackets.

The `id` line defines the internal ID of the launcher. Generally this won't matter, but you can reference it with the `?launcher=<launcher id>` advanced argument in [ZapScript](../zapscript). It's also possible to override an existing official launcher.

The `system` line specifies which system this launcher will belong to.

The `media_dirs` line specifies a list of directories where Core should search for media. It can also be a relative path, in which case during media indexing it will be appended to the platform's list of root folders. This definition is also used to match a file to the launcher during scans.

The `file_exts` line is a list of file extensions which will match to this launcher.

The `execute` line is the command which will be run when a token is scanned which matches to this launcher. This value will be run as is through the console or shell on the platform, with the field `{{.MediaPath}}` replaced with the resolved absolute path to the media scanned.

Save this file, restart Zaparoo Core, and then run a media database update. You should see all the media detected for this launcher and launchable when scanned!

