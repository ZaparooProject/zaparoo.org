---
sidebar_position: 11
description: "Write custom launchers for Zaparoo Core with TOML: run any emulator or media app from a token, with expression variables, lifecycle, controls, and groups."
keywords: [zaparoo custom launcher, custom launcher toml, zaparoo emulator integration, launcher expression variables]
---

# Custom Launchers

Custom launchers are user-defined launchers configured with [TOML](https://toml.io/) files, similar to [mapping files](./mappings.md#mapping-files). Use them when your [platform](../platforms/index.mdx) does not include a launcher for an emulator or media app you want to use.

Custom launchers provide fewer options than built-in launchers. Use one when the target app can open media from a file path or URL.

:::note Media tracking limitations
Custom launcher tracking depends on how the launcher starts the app:
- With the default `blocking` lifecycle, Core tracks the direct process started by the launcher
- With `background`, Core starts the command and does not track the process afterward
- If the command hands off to another app and exits, Core may lose track of the media even with `blocking`

When Core cannot track the launched process, features that depend on active media state, such as [hold mode](../core/config.md#scan-mode) exit handling or API stop commands, may not work for that launcher.
:::

## Creating a custom launcher

To start, open the `launchers` directory in the Core data folder. Check the page for your [platform](../platforms/index.mdx) if you're not sure where that folder is.

Create a new file ending in `.toml`. This example uses `OpenEmuGB.toml`. The filename is not important, but launcher IDs are, so use a unique ID unless you have a specific reason not to.

Open the file and add the launcher definition:

```toml
[[launchers.custom]]
id = "OpenEmuGB"
system = "Gameboy"
media_dirs = ["/Volumes/games/Gameboy"]
file_exts = [".gb"]
execute = "osascript -e 'tell application \"OpenEmu\" to open POSIX file \"[[media_path]]\"'"
```

The first line, `[[launchers.custom]]`, tells Core this is a custom launcher definition. It's required. Make sure to include the double square brackets.

The `id` line defines the internal ID of the launcher. Generally this won't matter, but you can reference it with the `?launcher=<launcher id>` advanced argument in [ZapScript](../zapscript/index.md).

The `system` line specifies which system this launcher will belong to.

The `media_dirs` line specifies a list of directories where Core should search for media. Relative paths resolve from the Core executable directory. This definition is also used to match a file to the launcher during scans.

The `file_exts` line is a list of file extensions which will match to this launcher. Extensions are automatically normalized - you can write `".gb"` or `"gb"` and both will work (a `.` prefix is added if missing and extensions are converted to lowercase).

The `execute` line is the command which will be run when a token is scanned which matches to this launcher. Expression variables are replaced by their values, then the resulting string is split into a program and arguments (respecting double and single quoted strings) and executed directly without a shell interpreter. If you need shell features like pipes or redirection, create a wrapper script and reference it here instead.

:::tip Avoid nesting another shell
Core runs your command directly, without a shell. If your `execute` command starts PowerShell or `cmd`, that shell parses your arguments again and can split quoted paths on their spaces. Run the target program directly when you can. See [Windows custom launchers](../platforms/windows/launchers.md#quoting-paths-and-powershell) for a worked example.
:::

### Available expression variables

You can use the following variables in your execute command:

| Variable | Description |
|----------|-------------|
| `[[media_path]]` | Resolved absolute path to the media file |
| `[[platform]]` | Platform ID (e.g., "linux", "windows", "mister") |
| `[[version]]` | Zaparoo Core version |
| `[[device.hostname]]` | Device hostname |
| `[[device.os]]` | Operating system ("linux", "windows", "darwin") |
| `[[device.arch]]` | System architecture ("amd64", "arm64", etc.) |
| `[[action]]` | Launch action from [launcher defaults](../core/config.md#launchersdefault) or ZapScript advanced args |
| `[[install_dir]]` | Install directory from [launcher defaults](../core/config.md#launchersdefault) |
| `[[server_url]]` | Server URL from [launcher defaults](../core/config.md#launchersdefault) |
| `[[system_id]]` | System ID the launcher belongs to |
| `[[launcher_id]]` | The launcher's ID |

### Environment variable

Custom launcher commands also receive a `ZAPAROO_ENVIRONMENT` environment variable containing a JSON object with the same data as the expression variables. This allows shell scripts to access the full context.

Save the file, restart Zaparoo Core, and run a media database update. Core should detect matching media for the launcher and make it launchable from scans.

## Advanced options

### kind and backend

Every custom launcher has a `kind` and a `backend`, both optional in most files:

- `kind` is `launcher` (the default) for an entry that launches media, or `virtual_system` for an entry that adds a [launchable](./launchers.md#launchables) system. Virtual systems can set `category` to `Other` (the default), `Console`, `Computer`, `Handheld`, or `Arcade`.
- `backend` is `command` for an entry that runs an `execute` line, or `mister_core` for a MiSTer core defined by `load_path`. When `execute` is set and `backend` is omitted, Core assumes `command`. A `command` launcher cannot also set `load_path`.

See [ROM-less MiSTer cores](../platforms/mister/launchers.md#other-cores) for `mister_core` examples.

### groups

Associate the launcher with one or more groups. Groups let you set defaults for multiple launchers at once using `[[launchers.default]]` in `config.toml`.

```toml
[[launchers.custom]]
id = "MyKodiVideo"
system = "Video"
groups = ["Kodi"]
# ...
```

```toml title="config.toml"
[[launchers.default]]
launcher = "Kodi"
server_url = "http://kodi:8080"
```

The defaults lookup checks both the launcher ID and any groups it belongs to.

### schemes

Define URL schemes the launcher handles, without the trailing `://`. This allows the launcher to be matched when launching URLs with that scheme.

```toml
[[launchers.custom]]
id = "MyPlayer"
schemes = ["myplayer"]
# ...
```

### lifecycle

Control how the launcher process is managed:

- `"blocking"` (default) - Core waits for the process and tracks it
- `"background"` - Fire and forget, Core doesn't track the process

```toml
[[launchers.custom]]
id = "BackgroundPlayer"
lifecycle = "background"
# ...
```

### controls

Define control actions that can be triggered on active media via [launcher controls](./launchers.md#launcher-controls). Values are [ZapScript](../zapscript/index.md) strings that run in a restricted control runtime. Media-launching, playlist, and nested `control` commands are blocked, but utility commands like `input.keyboard`, `execute`, `delay`, and `echo` are allowed.

The `execute` command in control scripts still requires a matching [`allow_execute`](../core/config.md#allow_execute) entry.

```toml
[[launchers.custom]]
id = "RetroArchSNES"
system = "SNES"
execute = "retroarch -L snes \"[[media_path]]\""
media_dirs = ["/games/snes"]
file_exts = [".sfc", ".smc"]

[launchers.custom.controls]
save_state = "**input.keyboard:{f2}"
load_state = "**input.keyboard:{f4}"
toggle_menu = "**input.keyboard:{f1}"
toggle_pause = "**input.keyboard:{p}"
```

Available control actions are reported in the `launcherControls` field of the active media object. Scripts are validated when the launcher loads; entries with invalid ZapScript syntax are skipped with a warning in the logs.

### restricted

When set to `true`, only files matching the [`allow_file`](../core/config.md#allow_file) patterns in `config.toml` can be launched. Use this for security-sensitive launchers. An `allow_file` entry that is not a valid regular expression is skipped and logged with the reason.

```toml
[[launchers.custom]]
id = "ScriptRunner"
restricted = true
# ...
```

## More examples

### Windows emulator

```toml
[[launchers.custom]]
id = "WindowsEmulator"
system = "PS2"
media_dirs = ["C:/Games/PS2"]
file_exts = [".iso", ".chd"]
execute = "C:/Emulators/PCSX2/pcsx2.exe \"[[media_path]]\""
```

### Platform-aware launcher

This example uses expression variables to change the command by platform:

```toml
[[launchers.custom]]
id = "PlatformAware"
system = "Multi"
media_dirs = ["games"]
file_exts = [".rom"]
execute = "/opt/launchers/[[platform]]/run.sh \"[[media_path]]\" --host [[device.hostname]]"
```
