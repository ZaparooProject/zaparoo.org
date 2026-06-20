---
title: Launchers
description: Create custom launchers and use launcher controls in Zaparoo to integrate emulators and media applications.
keywords: [zaparoo launchers, zaparoo custom launchers, zaparoo launcher controls, zaparoo emulator integration, custom launcher toml]
---

A launcher tells Zaparoo Core how to open a game, video, app, or other media file.
Each [platform](../platforms/index.mdx) has its own launchers for matching a [system](./systems.md) and file to the right program.

## Launchables

Some things can be launched but don't map cleanly to a file on disk or a normal [system](./systems.md), like a ROM-less FPGA core. Launchables are how Core handles these. Core defines them in code and exposes them as virtual versions of the things you already use: a virtual system or a virtual media entry, whichever fits.

You don't deal with launchables as a separate concept. They show up in the [Zaparoo App](../app/index.md) as ordinary systems or media that you can browse, pick, and write to a token like anything else. The only difference is that there is no real file or system behind them.

MiSTer's ROM-less [Other cores](../platforms/mister/launchers.md#other-cores), like Chess or Flappy Bird, are the first example. They have no game file and no system of their own, so Core exposes each one as a virtual system and indexes the ones you have installed.

The one place this shows through is the token value. A launchable is identified by a compact `zaparoo://` URI instead of a file path, so a token that launches one holds a value like `zaparoo://gezdgnbvgy3tqojqgezdgnbvgy` rather than a normal path. You don't write this by hand; the App fills it in when you save a launchable.

## Launcher controls

Launcher controls send actions to the launcher handling the currently active media. Use them for actions like pause, stop, save state, load state, fast forward, rewind, or next and previous track.

Control support depends on the active launcher. If no media is active, or the launcher does not support the requested action, the command returns an error.

:::note Control support varies
Each launcher supports its own set of actions. Check the active media response to see which controls are available.
:::

### How control actions work

Zaparoo Core asks the active launcher to run a named control action. Official launchers can implement controls directly. [Custom launchers](#controls) can define controls as ZapScript snippets in their launcher configuration.

When Core can tell that media is still starting, the `control` command waits before sending the action.

Built-in action names include:

| Action | Typical use |
| ------ | ----------- |
| `toggle_pause` | Pause or unpause active media |
| `pause` | Pause active media |
| `resume` | Resume active media |
| `save_state` | Save emulator state |
| `load_state` | Load emulator state |
| `save_ram` | Save RAM data |
| `toggle_menu` | Open or close an in-game menu |
| `reset` | Reset active media |
| `stop` | Stop active media |
| `fast_forward` | Fast forward |
| `rewind` | Rewind |
| `next` | Move to the next item |
| `previous` | Move to the previous item |

Not every launcher supports every action. Use the [`media`](../core/api/methods.md#media) or [`media.active`](../core/api/methods.md#mediaactive) API response to check the `launcherControls` available for the current media.

### Current support

Built-in launcher support currently includes:

| Launcher | Supported actions |
| -------- | ----------------- |
| Kodi launchers: `KodiLocalVideo`, `KodiMovie`, `KodiTVEpisode`, `KodiLocalAudio`, `KodiAlbum`, `KodiArtist`, `KodiTVShow`, `KodiSong` | `toggle_pause`, `stop`, `fast_forward`, `rewind`, `next`, `previous` |
| EmuDeck RetroArch-based launchers on SteamOS | `save_state`, `load_state`, `toggle_menu`, `toggle_pause`, `reset`, `fast_forward`, `stop` |
| Native audio launcher (`Audio` system, see [Audio Playback](./audio.md)) | `toggle_pause`, `pause`, `resume`, `stop`, `fast_forward`, `rewind` |
| Custom launchers | Whatever is defined in the launcher's `controls` table |

EmuDeck standalone emulator launchers and RetroDECK launchers do not currently define built-in launcher controls.

To control [background audio](./audio.md) instead of the active game, add `?slot=background` to the control action.

### ZapScript control

Use the `control` command to send a control action from a token:

```zapscript
**control:toggle_pause
```

Save state for the active media, if the launcher supports it:

```zapscript
**control:save_state
```

See the [ZapScript utility command reference](../zapscript/utilities.md#control) for exact syntax and examples.

### API control

Apps and integrations can use the [`media.control`](../core/api/methods.md#mediacontrol) API method to send launcher control actions. The active media response includes `launcherControls` when controls are available.

## Custom launchers

Custom launchers are user-defined launchers configured with [TOML](https://toml.io/) files, similar to [mapping files](./mappings.md#mapping-files). Use them when your [platform](../platforms/index.mdx) does not include a launcher for an emulator or media app you want to use.

Custom launchers are less configurable than official launchers. They work best when the app can launch media from a file path or URL.

:::note Media tracking limitations
Custom launcher tracking depends on how the launcher starts the app:
- With the default `blocking` lifecycle, Core tracks the direct process started by the launcher
- With `background`, Core starts the command and does not track the process afterward
- If the command hands off to another app and exits, Core may lose track of the media even with `blocking`

When Core cannot track the launched process, features that depend on active media state, such as [hold mode](../core/config.md#scan-mode) exit handling or API stop commands, may not work for that launcher.
:::

### Creating a custom launcher

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

#### Available expression variables

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

#### Environment variable

Custom launcher commands also receive a `ZAPAROO_ENVIRONMENT` environment variable containing a JSON object with the same data as the expression variables. This allows shell scripts to access the full context.

Save the file, restart Zaparoo Core, and run a media database update. Core should detect matching media for the launcher and make it launchable from scans.

### Advanced options

#### groups

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

#### schemes

Define URL schemes the launcher handles, without the trailing `://`. This allows the launcher to be matched when launching URLs with that scheme.

```toml
[[launchers.custom]]
id = "MyPlayer"
schemes = ["myplayer"]
# ...
```

#### lifecycle

Control how the launcher process is managed:

- `"blocking"` (default) - Core waits for the process and tracks it
- `"background"` - Fire and forget, Core doesn't track the process

```toml
[[launchers.custom]]
id = "BackgroundPlayer"
lifecycle = "background"
# ...
```

#### controls

Define control actions that can be triggered on active media via [launcher controls](#launcher-controls). Values are [ZapScript](../zapscript/index.md) strings that run in a restricted control runtime. Media-launching, playlist, and nested `control` commands are blocked, but utility commands like `input.keyboard`, `execute`, `delay`, and `echo` are allowed.

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

#### restricted

When set to `true`, only files matching the [`allow_file`](../core/config.md#allow_file) patterns in `config.toml` can be launched. Use this for security-sensitive launchers.

```toml
[[launchers.custom]]
id = "ScriptRunner"
restricted = true
# ...
```

### More examples

#### Windows emulator

```toml
[[launchers.custom]]
id = "WindowsEmulator"
system = "PS2"
media_dirs = ["C:/Games/PS2"]
file_exts = [".iso", ".chd"]
execute = "C:/Emulators/PCSX2/pcsx2.exe \"[[media_path]]\""
```

#### Platform-aware launcher

This example uses expression variables to change the command by platform:

```toml
[[launchers.custom]]
id = "PlatformAware"
system = "Multi"
media_dirs = ["games"]
file_exts = [".rom"]
execute = "/opt/launchers/[[platform]]/run.sh \"[[media_path]]\" --host [[device.hostname]]"
```

## Default launchers

Use [`[[systems.default]]`](../core/config.md#systemsdefault) to choose the default launcher for a system. Core applies this to title/search launches and direct path launches when it can infer the system from the path.

API clients can also save a per-media launcher override through [`media.meta.update`](../core/api/methods.md#mediametaupdate). Use this when one game should always use a different launcher from the rest of its system. Explicit ZapScript `?launcher=` arguments still win for one-off launches, then Core checks the per-media override, then system defaults.

Use [`[[launchers.default]]`](../core/config.md#launchersdefault) to set launcher-specific defaults such as `action` or `load_path`.

### Troubleshooting

#### Verifying your launcher loaded

Check the Zaparoo Core logs when it starts up. Look for messages about custom launchers, such as:
- `parsed custom launcher from TOML`
- `registered custom launcher`
- `loaded custom launchers`

If your launcher isn't loading, check for TOML syntax errors in the logs.

#### Testing commands

Before adding a command to your launcher config, test it manually in your terminal or command prompt. Replace `[[media_path]]` with an actual file path to verify it works.

#### Common issues

- **Paths with spaces**: Quote the program path and `[[media_path]]` separately in your `execute` command, especially on Windows. If you wrap the command in another shell like PowerShell, that shell can split the path on its spaces. Launch the program directly instead when you can. See [Windows custom launchers](../platforms/windows/launchers.md#quoting-paths-and-powershell)
- **Launcher selection**: If several launchers match the same file, Core prefers more specific matches. Duplicate IDs or equally specific matches can be order-dependent
- **File not found**: Ensure your `media_dirs` paths are absolute or correctly relative to the Core executable directory
- **Command not found**: Verify the programs you're calling in `execute` are installed and in your system's PATH
