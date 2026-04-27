---
toc_max_heading_level: 4
description: "Complete configuration reference for Zaparoo Core: every setting, option, and value in config.toml explained with examples."
keywords: [zaparoo config, zaparoo core config, config.toml zaparoo, zaparoo configuration reference]
---

# Config File

The config file is the main configuration file of the [Zaparoo Core](./index.md) software service.

Its location depends on the [platform](../platforms/index.mdx) where the service is running. On [MiSTer](../platforms/mister/index.md), it's located in the `/media/fat/zaparoo` folder (i.e. `zaparoo` folder in the root of the SD card).

The file is always called `config.toml` on every platform.

The config file is written in [TOML](https://toml.io/en/).

:::warning
Although comments are supported in TOML, _they will be lost if Core updates this file_ (e.g. when adjusting settings via the Zaparoo App). Manual edits to values are preserved on save.
:::

Any changes made to the config file while the Core service is running require the service to be restarted before changes will take effect, or the `-reload` [CLI command](./cli.md) to be run.

:::tip Portable Mode
Optionally, Zaparoo Core can run in portable mode, where the config and all other data are stored in a single folder alongside the executable. To enable this, create an empty folder called `user` in the same folder as the Core executable, then start Core normally.
:::

## Options

Options in the config file are grouped by sections which start with a header. For example, the [audio](#audio) section begins with `[audio]` and continues until the next header is encountered.

### Global Settings

The global settings section does not start with a section header and is the only section that behaves this way. It's reserved for certain options that affect all parts of Core or the config file itself.

```toml
config_schema = 1
debug_logging = true
auto_update = false
```

#### config_schema

| Key           | Type    | Default |
| ------------- | ------- | ------- |
| config_schema | integer | 1       |

**This option should not be changed or removed.**

`config_schema` is used internally by Core to track what version of itself last wrote to the file. This makes it possible to perform migrations between versions if the layout of the config file must be changed.

#### debug_logging

| Key           | Type    | Default |
| ------------- | ------- | ------- |
| debug_logging | boolean | false   |

`debug_logging` enables or disables logging debug messages to Core log files. It's useful for troubleshooting issues but can make log files noisy.

This option should be enabled when attempting to reproduce issues for reporting.

#### error_reporting

| Key             | Type    | Default |
| --------------- | ------- | ------- |
| error_reporting | boolean | false   |

`error_reporting` enables or disables opt-in error reporting. When enabled, anonymous error reports are sent to help improve Zaparoo.

See the [Privacy Policy](/privacy) for details on what data is collected.

#### auto_update

| Key         | Type    | Default              |
| ----------- | ------- | -------------------- |
| auto_update | boolean | _varies by platform_ |

`auto_update` controls whether Zaparoo checks for and notifies about available updates.

```toml
auto_update = false
```

Platform defaults:
- **Most platforms**: Enabled by default
- **MiSTer (Downloader)**: Disabled by default (updates managed by MiSTer Downloader)
- **Batocera (pacman)**: Disabled by default (updates managed by Batocera's package manager)

When disabled, Zaparoo will not check for new versions or display update notifications.

### Audio

```toml
[audio]
scan_feedback = true
volume = 100
success_sound = "custom_success.wav"
fail_sound = "custom_fail.wav"
limit_sound = "custom_limit.wav"
pending_sound = "custom_pending.ogg"
ready_sound = "custom_ready.ogg"
```

#### scan_feedback

| Key           | Type    | Default |
| ------------- | ------- | ------- |
| scan_feedback | boolean | true    |

`scan_feedback` enables or disables playing a sound from the host device when a scan is successful or results in an error.

#### volume

| Key    | Type              | Default |
| ------ | ----------------- | ------- |
| volume | integer (0–200)   | 100     |

`volume` sets the playback volume for audio feedback sounds. At the default `100`, sounds play at their original recorded level. Lower values quiet them down; higher values amplify, up to double at `200`.

```toml
[audio]
volume = 150  # 50% louder than the original sound
```

#### success_sound

| Key           | Type   | Default            |
| ------------- | ------ | ------------------ |
| success_sound | string | (embedded default) |

`success_sound` specifies a custom audio file to play when a token scan is successful. Supports WAV, MP3, OGG, and FLAC formats.

```toml
[audio]
success_sound = "custom_success.wav"
```

- **Omit or comment out**: Use embedded default success sound
- **Empty string `""`**: Disable success sound completely
- **Relative path**: Resolved to `<data_dir>/assets/` (e.g., `"success.mp3"` → `/media/fat/zaparoo/assets/success.mp3`)
- **Absolute path**: Used as-is (e.g., `"/path/to/sound.wav"`)

#### fail_sound

| Key        | Type   | Default            |
| ---------- | ------ | ------------------ |
| fail_sound | string | (embedded default) |

`fail_sound` specifies a custom audio file to play when a token scan fails or ZapScript execution errors occur. Supports WAV, MP3, OGG, and FLAC formats.

```toml
[audio]
fail_sound = "custom_fail.wav"
```

Configuration works the same as [`success_sound`](#success_sound):

- **Omit or comment out**: Use embedded default fail sound
- **Empty string `""`**: Disable fail sound completely
- **Relative path**: Resolved to `<data_dir>/assets/`
- **Absolute path**: Used as-is

#### limit_sound

| Key         | Type   | Default            |
| ----------- | ------ | ------------------ |
| limit_sound | string | (embedded default) |

`limit_sound` specifies a custom audio file to play when playtime limit warnings occur. Supports WAV, MP3, OGG, and FLAC formats.

```toml
[audio]
limit_sound = "custom_limit.wav"
```

Configuration works the same as [`success_sound`](#success_sound):

- **Omit or comment out**: Use embedded default limit sound
- **Empty string `""`**: Disable limit sound completely
- **Relative path**: Resolved to `<data_dir>/assets/`
- **Absolute path**: Used as-is

#### pending_sound

| Key           | Type   | Default            |
| ------------- | ------ | ------------------ |
| pending_sound | string | (embedded default) |

`pending_sound` specifies a custom audio file to play when a token is staged by [launch guard](../features/launch-guard.md). Supports WAV, MP3, OGG, and FLAC formats.

```toml
[audio]
pending_sound = "custom_pending.ogg"
```

Configuration works the same as [`success_sound`](#success_sound):

- **Omit or comment out**: Use embedded default pending sound
- **Empty string `""`**: Disable pending sound completely
- **Relative path**: Resolved to `<data_dir>/assets/`
- **Absolute path**: Used as-is

#### ready_sound

| Key         | Type   | Default            |
| ----------- | ------ | ------------------ |
| ready_sound | string | (embedded default) |

`ready_sound` specifies a custom audio file to play when the launch guard delay period expires and a staged token is ready for confirmation. Supports WAV, MP3, OGG, and FLAC formats.

```toml
[audio]
ready_sound = "custom_ready.ogg"
```

Configuration works the same as [`success_sound`](#success_sound):

- **Omit or comment out**: Use embedded default ready sound
- **Empty string `""`**: Disable ready sound completely
- **Relative path**: Resolved to `<data_dir>/assets/`
- **Absolute path**: Used as-is

### Input

```toml
[input]
gamepad_enabled = true
```

The `input` section configures input device emulation features.

#### gamepad_enabled

| Key             | Type    | Default              |
| --------------- | ------- | -------------------- |
| gamepad_enabled | boolean | _varies by platform_ |

`gamepad_enabled` enables or disables the virtual gamepad device used by the [`**input.gamepad`](../zapscript/input.md#inputgamepad) ZapScript command.

```toml
[input]
gamepad_enabled = true
```

Platform defaults:
- **MiSTer/MiSTeX**: Enabled by default
- **Batocera**: Disabled by default (may conflict with some emulators)
- **Other platforms**: Enabled by default

When disabled, the `**input.gamepad` command will return an error.

### Media

```toml
[media]
filename_tags = true
default_regions = ["us", "world"]
default_langs = ["en"]
```

The `media` section configures how Core processes and matches media files, including tag parsing and region/language preferences.

#### filename_tags

| Key           | Type    | Default |
| ------------- | ------- | ------- |
| filename_tags | boolean | true    |

`filename_tags` enables or disables automatic parsing of tags from media filenames (e.g., region codes, languages, revision numbers).

```toml
[media]
filename_tags = true
```

When enabled, Core extracts metadata tags from filenames like `(USA)`, `(En)`, `(Rev 1)` to help with conflict resolution and media matching.

See the [Tags documentation](../features/tags.md) for detailed information about tag parsing and usage.

#### default_regions

| Key             | Type     | Default            |
| --------------- | -------- | ------------------ |
| default_regions | string[] | `["us", "world"]` |

`default_regions` specifies which region tags to prefer when multiple versions of the same game exist.

```toml
[media]
default_regions = ["us", "eu", "world"]
```

Regions are checked in order. If a game has both `(USA)` and `(Europe)` versions, the USA version will be preferred with the default settings.

Common region codes: `us`, `eu`, `jp`, `world`, `uk`, `de`, `fr`, `es`, `it`

#### default_langs

| Key           | Type     | Default  |
| ------------- | -------- | -------- |
| default_langs | string[] | `["en"]` |

`default_langs` specifies which language tags to prefer when multiple language versions exist.

```toml
[media]
default_langs = ["en", "es"]
```

Languages are checked in order. Common language codes: `en`, `es`, `fr`, `de`, `it`, `ja`, `pt`

### Readers

```toml
[readers]
auto_detect = true
scan_history = 30
```

#### auto_detect {#readers-auto-detect}

| Key         | Type    | Default |
| ----------- | ------- | ------- |
| auto_detect | boolean | true    |

`auto_detect` enables or disables automatically searching for and probing possible connected readers on the host device.

It may be required to disable this option if auto-detection is causing problems with unrelated connected devices.

#### scan_history

| Key          | Type    | Default |
| ------------ | ------- | ------- |
| scan_history | integer | 30      |

`scan_history` specifies how many days of scan history to keep for the recent scans list. Old scan records are automatically cleaned up.

```toml
[readers]
scan_history = 30
```

Set to `0` to keep all scan history forever (disables cleanup).

#### readers.scan

`readers.scan` is a sub-section of `readers` and must be defined with the header: `[readers.scan]`

```toml
[readers.scan]
mode = 'hold'
exit_delay = 3.0
ignore_system = [ 'PC', 'MSX' ]
on_scan = '**echo:card was scanned'
on_remove = '**echo:card was removed'
ignore_on_connect = true
```

##### mode {#scan-mode}

| Key  | Type                     | Default |
| ---- | ------------------------ | ------- |
| mode | string ("tap" \| "hold") | tap     |

`mode` defines the behavior of scans. It has two options:

- `tap` is the default mode and means when a token is used with a reader it can be removed again without affecting the playing media. If a token is tapped, removed and then tapped again it will relaunch the already playing media.
- `hold` mode makes it so a token must be held to the reader for as long as any launched media will play. That is, after a token is removed from the reader, it will exit the media. This makes a token act more like real physical media. **Core does not currently make any attempt to save before exiting media.** See [`exit_delay`](#exit_delay), [`ignore_system`](#ignore_system), and [`on_remove`](#on_remove) for related options.

##### exit_delay

| Key        | Type         | Default |
| ---------- | ------------ | ------- |
| exit_delay | float (≥0.0) | 0.0     |

`exit_delay` adds a delay, in seconds, before media is exited after a token is removed from a reader. It's only active if `hold` [mode](#scan-mode) is also active.

For example, if `exit_delay` was set to `2.3`, it would mean when a token is removed from a reader, instead of immediately exiting the media, a timer is started for 2.3 seconds first. If the same token is placed back on the reader before the timer is complete, the timer will be cleared and the media won't exit.

This feature can be useful if you want to, using a single reader, scan other tokens such as adding credit without exiting the current game.

##### ignore_system

| Key           | Type     | Default |
| ------------- | -------- | ------- |
| ignore_system | string[] | []      |

`ignore_system` is a list of systems which will not exit playing media on token removal. It's only active in `hold` [`mode`](#scan-mode).

##### on_scan

| Key     | Type   | Default |
| ------- | ------ | ------- |
| on_scan | string |         |

`on_scan` is a snippet of [ZapScript](../zapscript/index.md) which is run immediately after a token is scanned but before ZapScript on the token itself (or a mapping) is run. It is always active if enabled.

This hook can block the scan by returning an error. If the ZapScript command fails or a script executed via `**execute:` returns a non-zero exit code, the token processing is blocked.

Scripts executed via `**execute:` receive a `ZAPAROO_ENVIRONMENT` environment variable containing a JSON object with the current system state.

##### on_remove

| Key       | Type   | Default |
| --------- | ------ | ------- |
| on_remove | string |         |

`on_remove` is a snippet of [ZapScript](../zapscript/index.md) which is run immediately after a token is removed from the reader. It's only active in `hold` [`mode`](#scan-mode).

Note that this will _always_ run in `hold` mode when a token is removed from the reader, no matter if any media was launched or is active. It also does not respect the [`exit_delay`](#exit_delay) setting and runs before any media exit logic happens.

This hook can block the remove action by returning an error. If the ZapScript command fails or a script executed via `**execute:` returns a non-zero exit code, the remove processing is blocked.

Scripts executed via `**execute:` receive a `ZAPAROO_ENVIRONMENT` environment variable containing a JSON object with the current system state.

##### ignore_on_connect

| Key                | Type    | Default |
| ------------------ | ------- | ------- |
| ignore_on_connect  | boolean | false   |

`ignore_on_connect` suppresses the first token scan from each newly-connected reader, preventing accidental launches from cards left on readers at startup.

```toml
[readers.scan]
ignore_on_connect = true
```

When enabled, if a token is already present on a reader when it connects (e.g., a card left on the reader when Zaparoo starts), that initial scan will be silently ignored. Subsequent scans from the same reader will work normally.

#### readers.scan.launch_guard {#launch-guard-config}

`readers.scan.launch_guard` is a sub-section of `readers.scan` and must be defined with the header: `[readers.scan.launch_guard]`

```toml
[readers.scan.launch_guard]
enabled = true
timeout = 15
delay = 0
require_confirm = false
```

##### enabled {#launch-guard-enabled}

| Key     | Type    | Default |
| ------- | ------- | ------- |
| enabled | boolean | false   |

`enabled` turns launch guard on or off. When enabled, tokens scanned while media is playing are staged rather than launched immediately. All scans are unaffected when nothing is playing.

```toml
[readers.scan.launch_guard]
enabled = true
```

##### timeout {#launch-guard-timeout}

| Key     | Type          | Default |
| ------- | ------------- | ------- |
| timeout | float (≥-1.0) | 15.0    |

`timeout` sets how long, in seconds, a staged token waits for confirmation before being silently dropped.

Setting `timeout` to `0` uses the default of 15 seconds. Setting it to a negative value (e.g., `-1`) disables the timeout entirely — the staged token persists until it's confirmed, replaced by another scan, or cleared when media stops.

```toml
[readers.scan.launch_guard]
timeout = 30     # wait up to 30 seconds
timeout = -1     # wait indefinitely
```

##### delay {#launch-guard-delay}

| Key   | Type         | Default |
| ----- | ------------ | ------- |
| delay | float (≥0.0) | 0.0     |

`delay` sets a mandatory cool-down period, in seconds, before re-tap confirmation is accepted. During this window, re-tapping the same card resets both the delay and the timeout — confirmation is not accepted until the full delay has elapsed.

When the delay expires, a ready sound plays and a `tokens.staged.ready` notification is sent.

`delay` is clamped to half of `timeout` if it would equal or exceed it. It is forced to `0` when `timeout` is negative.

```toml
[readers.scan.launch_guard]
timeout = 30
delay = 5   # block re-tap for the first 5 seconds
```

Setting `delay` to `0` (the default) disables the cool-down and re-tap confirmation is accepted immediately after staging.

##### require_confirm {#launch-guard-require-confirm}

| Key             | Type    | Default |
| --------------- | ------- | ------- |
| require_confirm | boolean | false   |

`require_confirm` disables re-tap confirmation. When set to `true`, re-tapping the staged card does nothing — the only way to launch a staged token is via the `confirm` API method.

```toml
[readers.scan.launch_guard]
enabled = true
require_confirm = true
```

This is useful when you want an external device (a physical button, a companion app, or an automation script) to be the sole confirmation path.

#### readers.connect

`readers.connect` manually defines a reader which is physically connected to the host device and is not auto-detected. It's a sub-section that can be defined multiple times, and must have this header: `[[readers.connect]]`

Pay attention to the double pairs of square brackets. Each defined `readers.connect` section must have its own header.

```toml
[[readers.connect]]
driver = 'pn532uart'
path = '/dev/ttyUSB0'

[[readers.connect]]
driver = 'file'
path = '/tmp/some_file'
```

##### driver

| Key    | Type   | Default |
| ------ | ------ | ------- |
| driver | string |         |

`driver` specifies which reader driver should be used to attempt connection to the reader device. See [reader drivers](../readers/drivers.md) for a list of available drivers.

##### path

| Key  | Type   | Default |
| ---- | ------ | ------- |
| path | string |         |

`path` is an argument for the specified reader driver for how the device should be found. See the documentation for your specific reader hardware for configuration examples.

##### id_source

| Key       | Type   | Default |
| --------- | ------ | ------- |
| id_source | string |         |

`id_source` specifies which identifier source to use for token identification. This is only supported by certain reader drivers:

- `opticaldrive`: Can use `uuid` (disc UUID) or `label` (disc label)

Other reader drivers ignore this setting.

##### enabled {#readers-connect-enabled}

| Key     | Type    | Default |
| ------- | ------- | ------- |
| enabled | boolean |         |

`enabled` temporarily disables a reader connection without removing it from the config. When not set, the connection is enabled by default.

```toml
[[readers.connect]]
driver = 'pn532uart'
path = '/dev/ttyUSB0'
enabled = false
```

This is useful for keeping a connection definition in the config while not actively using it, without having to delete and re-add it later.

#### readers.drivers

`readers.drivers` configures driver-specific settings. It's a sub-section that uses driver IDs as keys, and must have this header format: `[readers.drivers.DRIVER_ID]`

```toml
[readers.drivers.acr122pcsc]
auto_detect = false

[readers.drivers.simpleserial]
enabled = false
```

##### enabled {#readers-drivers-enabled}

| Key     | Type    | Default            |
| ------- | ------- | ------------------ |
| enabled | boolean | _varies by driver_ |

`enabled` allows you to explicitly enable or disable a specific reader driver. When not specified, the driver uses its default enabled state.

##### auto_detect {#readers-drivers-auto-detect}

| Key         | Type    | Default |
| ----------- | ------- | ------- |
| auto_detect | boolean | true    |

`auto_detect` controls whether this specific driver should participate in automatic reader detection, overriding the global `auto_detect` setting for this driver only.

### Systems

#### systems.default

`systems.default` overrides the default behavior of the specified system. It's a sub-section that can be defined multiple times, and must have this header: `[[systems.default]]`. See also [`launchers.default`](#launchersdefault) for launcher-specific settings.

Pay attention to the double pairs of square brackets. Each defined `systems.default` section must have its own header.

```toml
[[systems.default]]
system = 'SNES'
launcher = 'SindenSNES'
before_exit = '**input.keyboard:{f12}||**delay:2000'
```

##### system

| Key    | Type   | Default |
| ------ | ------ | ------- |
| system | string |         |

ID of the [system](../features/systems.md) this default override entry applies to.

##### launcher {#systems-default-launcher}

| Key      | Type   | Default |
| -------- | ------ | ------- |
| launcher | string |         |

ID of the [launcher](../features/launchers.md) that should be used by default when media in this system is launched.

##### before_exit

| Key         | Type   | Default |
| ----------- | ------ | ------- |
| before_exit | string |         |

A snippet of [ZapScript](../zapscript/index.md) to be run before media exits if [hold mode](#scan-mode) is enabled. Blocks before moving onto exit so commands like [delay](../zapscript/utilities.md) can be used.

### Launchers

```toml
[launchers]
index_root = [
    '/media/alt_mount/games'
]
allow_file = [
    '^/media/fat/something.mgl$'
]
on_media_start = '**echo:media started'
```

#### index_root

| Key        | Type     | Default |
| ---------- | -------- | ------- |
| index_root | string[] | []      |

`index_root` is a list of paths on the host device that should _also_ be searched when indexing media during a media database update.

For example, if `index_root` was set to `[ '/media/fat/other_place' ]`, a database update will search all standard locations like normal but then also attempt to search _/media/fat/other_place/SNES_, _/media/fat/other_place/Genesis_, etc. for potential media.

To exclude specific directories from being scanned, create an empty file named `.zaparooignore` in that directory. The directory and all subdirectories will be skipped during media database updates.

#### allow_file

| Key        | Type                      | Default |
| ---------- | ------------------------- | ------- |
| allow_file | string[] (regex patterns) | []      |

`allow_file` allows certain files to be launched if their assigned launcher requires it.

This is used on platforms like [Windows](../platforms/windows/index.md) to allow executable files to be launched with tokens, where this ability is useful but would be a security issue if allowed globally.

Each entry in this option is a [Regular Expression](https://github.com/google/re2/wiki/Syntax). Notes on usage here:

- Patterns are automatically anchored and must match the full file path. Use `.*pattern.*` for substring matching.
- On Windows, file path separators must be escaped: `C:\\Test\\Thing.exe`
- On Windows, patterns are automatically made case-insensitive. On other platforms, add `(?i)` at the beginning of a pattern for case-insensitive matching.

#### media_dir

| Key       | Type   | Default            |
| --------- | ------ | ------------------ |
| media_dir | string | \<data dir\>/media |

`media_dir` overrides the default location on disk where remote media downloads will be stored. By default, it will use the `media` directory in the Core data folder.

#### on_media_start

| Key            | Type   | Default |
| -------------- | ------ | ------- |
| on_media_start | string |         |

`on_media_start` is a snippet of [ZapScript](../zapscript/index.md) which is run immediately after media starts launching, regardless of the scan mode. See also [`on_scan`](#on_scan) and [`on_remove`](#on_remove) for related scan events.

#### before_media_start

| Key                | Type   | Default |
| ------------------ | ------ | ------- |
| before_media_start | string |         |

`before_media_start` is a snippet of [ZapScript](../zapscript/index.md) which is run immediately before media launches.

```toml
[launchers]
before_media_start = "**execute:/path/to/script.sh"
```

This hook can block the launch by returning an error. If the ZapScript command fails or a script executed via `**execute:` returns a non-zero exit code, the media launch is blocked and an error is shown.

Scripts executed via `**execute:` receive a `ZAPAROO_ENVIRONMENT` environment variable containing a JSON object with the current system state:

```json
{
  "platform": "mister",
  "version": "2.9.0",
  "scan_mode": "tap",
  "media_playing": false,
  "device": {
    "hostname": "mister",
    "os": "linux",
    "arch": "arm"
  },
  "active_media": {
    "launcher_id": "",
    "system_id": "",
    "system_name": "",
    "path": "",
    "name": ""
  },
  "last_scanned": {
    "id": "04:AB:CD:EF:12:34:56",
    "value": "**launch:Genesis/Sonic.bin",
    "data": ""
  },
  "scanned": {
    "id": "04:AB:CD:EF:12:34:56",
    "value": "**launch:Genesis/Sonic.bin",
    "data": ""
  },
  "launching": {
    "path": "/media/fat/games/Genesis/Sonic.bin",
    "system_id": "Genesis",
    "launcher_id": "MiSTer"
  }
}
```

The `launching` object contains information about the media that is about to launch, which is only available in this hook.

#### launchers.default

`launchers.default` overrides default settings for specific launchers. It's a sub-section that can be defined multiple times, and must have this header: `[[launchers.default]]`. See also [`systems.default`](#systemsdefault) for system-specific settings.

Pay attention to the double pairs of square brackets. Each defined `launchers.default` section must have its own header.

```toml
[[launchers.default]]
launcher = 'KodiTV'
server_url = 'http://localhost:5678'
```

##### launcher {#launchers-default-launcher}

| Key      | Type   | Default |
| -------- | ------ | ------- |
| launcher | string |         |

ID of the [launcher](../features/launchers.md) this default override entry applies to.

##### install_dir

| Key         | Type   | Default |
| ----------- | ------ | ------- |
| install_dir | string |         |

Override the default installation directory for this launcher. Only supported by some launchers and usually refers to the parent directory of the executable which does the launching.

##### server_url

| Key        | Type   | Default |
| ---------- | ------ | ------- |
| server_url | string |         |

Override the default server URL for this launcher. Only supported by some launchers and refers to an API base address.

##### action

| Key    | Type   | Default |
| ------ | ------ | ------- |
| action | string |         |

Set the default action for this launcher. Currently only supported by the Steam launcher.

```toml
[[launchers.default]]
launcher = "Steam"
action = "details"
```

Available values for Steam:
- `run` (default): Launch the game
- `details`: Open the game's details page in the Steam library

This can be overridden per-token using the `?action=` advanced argument in ZapScript.

##### load_path

| Key       | Type   | Default |
| --------- | ------ | ------- |
| load_path | string |         |

Override the implementation file the launcher loads. Only supported by some launchers. For MiSTer, this is an MGL-form RBF path relative to `/media/fat`, without extension. This is useful when multiple versions of a core share the same short name and you want to set a specific one as the default.

```toml
[[launchers.default]]
launcher = "Nintendo64"
load_path = "_LLAPI/N64_LLAPI"
```

### ZapScript

```toml
[zapscript]
allow_execute = [
    'touch /tmp/tap_time',
    '/media/fat/linux/mplayer .+'
]
allow_http = [
    'https://example\.com/.*'
]
block_commands = [
    'execute'
]

[zapscript.input]
mode = 'combos'
block = ['{alt+f4}']
```

#### allow_execute

| Key           | Type                      | Default |
| ------------- | ------------------------- | ------- |
| allow_execute | string[] (regex patterns) | []      |

:::danger Security Warning
`allow_execute` allows specific executables and arguments to be run using the `**execute` [ZapScript](../zapscript/index.md) command. By default, the command does not allow anything to be run. Be extremely careful with this setting as it can execute arbitrary commands on your system.
:::

Each entry in this option is a [Regular Expression](https://github.com/google/re2/wiki/Syntax). Notes on usage here:

- Patterns are automatically anchored and must match the full command string. `echo` matches only `echo`, not `echo && rm -rf /`. Use `echo.*` or `.*pattern.*` for broader matching.
- On Windows, file path separators must be escaped: `C:\\Test\\Thing.exe`

#### allow_http

| Key        | Type                      | Default |
| ---------- | ------------------------- | ------- |
| allow_http | string[] (regex patterns) | []      |

`allow_http` restricts which URLs the [`**http.get`](../zapscript/http.md#httpget) and [`**http.post`](../zapscript/http.md#httppost) ZapScript commands can access. When empty (the default), all URLs are allowed. When configured, only matching URLs are permitted.

Each entry is a [Regular Expression](https://github.com/google/re2/wiki/Syntax). Patterns are automatically anchored to match the full URL.

```toml
[zapscript]
allow_http = [
    'https://example\.com/.*',
    'http://localhost:8080/.*'
]
```

#### block_commands

| Key            | Type     | Default |
| -------------- | -------- | ------- |
| block_commands | string[] | []      |

`block_commands` disables specific ZapScript commands by name. Any listed command will always fail, regardless of any other allowlists.

```toml
[zapscript]
block_commands = [
    'execute',
    'http.post'
]
```

Command names match the ZapScript command identifier (e.g., `execute`, `http.get`, `http.post`, `input.keyboard`).

#### zapscript.input

`zapscript.input` is a sub-section of `zapscript` that controls which keys the [`**input.keyboard`](../zapscript/input.md#inputkeyboard) and [`**input.gamepad`](../zapscript/input.md#inputgamepad) commands can send.

```toml
[zapscript.input]
mode = 'combos'
allow = ['{f1}', '{f2}', '{enter}', '{esc}']
block = ['{alt+f4}']
```

##### mode {#zapscript-input-mode}

| Key  | Type                                | Default              |
| ---- | ----------------------------------- | -------------------- |
| mode | string (`"combos"`, `"unrestricted"`) | _varies by platform_ |

Controls how input keys are filtered when no `allow` list is configured.

- `combos` — only key combos and named special keys (e.g., `{f1}`, `{ctrl+q}`) are allowed. Single characters (e.g., `a`, `5`) are blocked. This is the default on desktop platforms.
- `unrestricted` — all keys are allowed (subject to the `block` list). This is the default on embedded platforms like MiSTer.

Platform defaults:
- **Desktop** (Linux, Windows, macOS, SteamOS, ChimeraOS, Bazzite): `combos`
- **Embedded** (MiSTer, MiSTex, Batocera, Recalbox, LibreELEC, RetroPie): `unrestricted`

##### allow {#zapscript-input-allow}

| Key   | Type     | Default |
| ----- | -------- | ------- |
| allow | string[] | []      |

When set, only the listed keys are permitted. All others are blocked regardless of `mode` or `block`. Matching is case-insensitive.

```toml
[zapscript.input]
allow = ['{f1}', '{f2}', '{enter}', '{esc}']
```

##### block {#zapscript-input-block}

| Key   | Type     | Default                      |
| ----- | -------- | ---------------------------- |
| block | string[] | _platform default (desktop)_ |

A list of keys to always block. On desktop platforms, a built-in block list applies by default; setting `block` to any value, even an empty list, replaces it entirely.

The default desktop block list covers TTY switching (`{ctrl+alt+f1}`–`{ctrl+alt+f7}`), `{ctrl+alt+t}`, `{ctrl+alt+delete}`, `{super}`, `{meta}`, `{alt+f4}`, and `{cmd+space}`.

```toml
[zapscript.input]
block = ['{alt+f4}', '{ctrl+alt+t}']  # custom block list, replaces defaults
```

The `block` list is ignored when `allow` is configured.

### Service

```toml
[service]
api_port = 7497
api_listen = "0.0.0.0"
allowed_ips = [
    "192.168.1.100",
    "192.168.1.0/24"
]
device_id = '4d01c19f-09ba-4871-a58a-82fb49f5b518'
allowed_origins = [
    'https://app.zaparoo.org'
]
allow_run = [
    '\*\*launch\.random:.+'
]

[[service.publishers.mqtt]]
enabled = true
broker = "mqtt://localhost:1883"
topic = "zaparoo/events"
filter = [
    "media.started",
    "media.stopped",
    "tokens.added"
]
```

#### api_port

| Key      | Type              | Default |
| -------- | ----------------- | ------- |
| api_port | integer (1-65535) | 7497    |

`api_port` specifies which port the [API](./api/index.md) of Core should be accessible from.

**Don't change this unless you know what you're doing. It will currently break external tools that rely on it being the default value.**

#### api_listen

| Key        | Type   | Default     |
| ---------- | ------ | ----------- |
| api_listen | string | `"0.0.0.0"` |

`api_listen` specifies which network interface the API server should bind to.

```toml
[service]
api_listen = "127.0.0.1"  # Localhost only
```

Common values:

- `"0.0.0.0"` - Listen on all network interfaces (default, allows remote connections)
- `"127.0.0.1"` - Localhost only (blocks all remote connections)
- Specific IP address - Bind to a specific network interface

Use `"127.0.0.1"` if you only want local access to the API and Web UI.

#### allowed_ips

| Key         | Type     | Default |
| ----------- | -------- | ------- |
| allowed_ips | string[] | []      |

`allowed_ips` creates an IP allowlist for API access. Only requests from listed IPs will be accepted.

```toml
[service]
allowed_ips = [
    "192.168.1.100",           # Single IP
    "192.168.1.0/24",          # CIDR range (entire subnet)
    "10.0.0.0/8",              # Large CIDR range
    "2001:db8::1",             # IPv6 address
    "2001:db8::/32"            # IPv6 CIDR range
]
```

Supports:

- Individual IPv4 addresses (e.g., `"192.168.1.100"`)
- Individual IPv6 addresses (e.g., `"2001:db8::1"`)
- CIDR ranges for IPv4 (e.g., `"192.168.1.0/24"`)
- CIDR ranges for IPv6 (e.g., `"2001:db8::/32"`)

**Empty list (default)**: No IP filtering, all IPs allowed

Port numbers in IP addresses are automatically stripped during matching.

:::warning Important
If you configure `allowed_ips`, you **must explicitly include `"127.0.0.1"`** to allow localhost connections. Without it, local tools like the TUI interface and CLI commands will be blocked.
:::

#### device_id

| Key       | Type          | Default                    |
| --------- | ------------- | -------------------------- |
| device_id | string (UUID) | _generated at first start_ |

`device_id` is a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) that is used to uniquely identify the instance of the Core service running on a host device.

It's currently reserved for future use when devices can communicate with each other and external services. **It should not be changed once set.**

#### allowed_origins

| Key             | Type     | Default |
| --------------- | -------- | ------- |
| allowed_origins | string[] | []      |

`allowed_origins` specifies which origins are allowed to access the Core API via CORS (Cross-Origin Resource Sharing). By default, localhost and the active device IP address are allowed.

#### allow_run

| Key       | Type                      | Default |
| --------- | ------------------------- | ------- |
| allow_run | string[] (regex patterns) | []      |

`allow_run` explicitly allows [ZapScript](../zapscript/index.md) to be run using the [run endpoint](./api/methods.md) of the [Core API](./api/index.md). By default, nothing is allowed.

Each entry is a [Regular Expression](https://github.com/google/re2/wiki/Syntax). Notes on usage here:

- Patterns are automatically anchored and must match the full command string. Characters `*` and `.` common in ZapScript must be escaped (e.g., `\*\*launch\.random:.*`).
- The input is parsed as ZapScript and each command is checked individually. All commands in a chained script must match, so a pattern like `\*\*launch\.random:.*` covers both `**launch.random:SNES` alone and `**launch.random:SNES||**launch.random:NES`.
- Plain file paths are normalized to a launch command before checking.
- When `allow_run` is configured, remote IPs can access run endpoints regardless of `allowed_ips`. The allow list itself is the restriction.

#### service.discovery

`service.discovery` is a sub-section of `service` that configures mDNS network discovery.

```toml
[service.discovery]
enabled = true
instance_name = "Living Room MiSTer"
```

When enabled, Zaparoo advertises itself on your local network using mDNS/DNS-SD. Mobile apps and other clients can automatically find and connect to your Zaparoo instance without needing to enter IP addresses manually. Access Zaparoo using friendly `.local` addresses like `http://mister.local:7497`.

##### enabled {#service-discovery-enabled}

| Key     | Type    | Default |
| ------- | ------- | ------- |
| enabled | boolean | true    |

`enabled` enables or disables mDNS network discovery. When enabled, Zaparoo advertises a `_zaparoo._tcp` service with TXT records containing the device ID, version, and platform.

##### instance_name

| Key           | Type   | Default              |
| ------------- | ------ | -------------------- |
| instance_name | string | _system hostname_    |

`instance_name` specifies a custom display name for this Zaparoo instance on the network. If not set, defaults to the system hostname.

#### service.publishers

`service.publishers` is a sub-section of `service` that configures publishing Core events to external services.

##### service.publishers.mqtt

`service.publishers.mqtt` configures MQTT publishers for broadcasting Core events. See the [Publishers](../features/publishers.md#mqtt) feature page for an overview. It's a sub-section that can be defined multiple times, and must have this header: `[[service.publishers.mqtt]]`

Pay attention to the double pairs of square brackets. Each defined MQTT publisher section must have its own header.

```toml
[[service.publishers.mqtt]]
enabled = true
broker = "mqtt://localhost:1883"
topic = "zaparoo/events"
filter = [
    "media.started",
    "media.stopped",
    "tokens.added"
]
```

###### enabled {#mqtt-publisher-enabled}

| Key     | Type    | Default |
| ------- | ------- | ------- |
| enabled | boolean | true    |

`enabled` turns this MQTT publisher on or off.

```toml
[[service.publishers.mqtt]]
enabled = false
```

###### broker {#mqtt-publisher-broker}

| Key    | Type   | Default |
| ------ | ------ | ------- |
| broker | string |         |

`broker` specifies the MQTT broker connection URL.

```toml
[[service.publishers.mqtt]]
broker = "mqtt://192.168.1.100:1883"
```

Supported URL schemes:
- `mqtt://` - Standard MQTT connection
- `mqtts://` or `ssl://` - MQTT over TLS/SSL

For TLS connections and authentication, see the MQTT reader's [auth.toml configuration](../readers/mqtt.md#add-broker-credentials).

###### topic {#mqtt-publisher-topic}

| Key   | Type   | Default |
| ----- | ------ | ------- |
| topic | string |         |

`topic` specifies the MQTT topic to publish events to.

```toml
[[service.publishers.mqtt]]
topic = "home/zaparoo/events"
```

###### filter {#mqtt-publisher-filter}

| Key    | Type     | Default                  |
| ------ | -------- | ------------------------ |
| filter | string[] | [] (publish all events) |

`filter` limits which event types are published. When empty, all events are published.

```toml
[[service.publishers.mqtt]]
filter = [
    "media.started",
    "media.stopped",
    "tokens.added",
    "readers.added"
]
```

Available event types match the [Core API notification types](./api/notifications.md).

##### service.publishers.pixelcade

`service.publishers.pixelcade` configures [PixelCade](https://pixelcade.org) publishers that display game marquee artwork on PixelCade LED displays. See the [Publishers](../features/publishers.md#pixelcade) feature page for an overview. It can be defined multiple times and must use this header: `[[service.publishers.pixelcade]]`

On `media.started`, the publisher sends a GET request to the PixelCade arcade endpoint, mapping the Zaparoo system ID to the matching PixelCade console folder. On `media.stopped`, behaviour is controlled by the `on_stop` option.

```toml
[[service.publishers.pixelcade]]
enabled = true
host = "192.168.1.50"
port = 8080
mode = "stream"
on_stop = "blank"
filter = [
    "media.started",
    "media.stopped"
]
```

###### enabled {#pixelcade-publisher-enabled}

| Key     | Type    | Default |
| ------- | ------- | ------- |
| enabled | boolean | true    |

`enabled` turns this PixelCade publisher on or off.

```toml
[[service.publishers.pixelcade]]
enabled = false
```

###### host {#pixelcade-publisher-host}

| Key  | Type   | Default |
| ---- | ------ | ------- |
| host | string |         |

`host` is the hostname or IP address of the PixelCade device. This field is required.

```toml
[[service.publishers.pixelcade]]
host = "192.168.1.50"
```

###### port {#pixelcade-publisher-port}

| Key  | Type    | Default |
| ---- | ------- | ------- |
| port | integer | 8080    |

`port` is the PixelCade HTTP API port.

###### mode {#pixelcade-publisher-mode}

| Key  | Type   | Default    |
| ---- | ------ | ---------- |
| mode | string | `"stream"` |

`mode` controls which PixelCade arcade endpoint is used when displaying marquee art on `media.started`. Accepted values:

- `"stream"` — uses the streaming endpoint (default)
- `"write"` — uses the write endpoint

###### on_stop {#pixelcade-publisher-on-stop}

| Key     | Type   | Default    |
| ------- | ------ | ---------- |
| on_stop | string | `"blank"`  |

`on_stop` controls what happens to the display when `media.stopped` is received. Accepted values:

- `"blank"` — clears the display (default)
- `"marquee"` — shows the default PixelCade marquee image
- `"none"` — leaves the last image on the display

###### filter {#pixelcade-publisher-filter}

| Key    | Type     | Default                  |
| ------ | -------- | ------------------------ |
| filter | string[] | [] (publish all events) |

`filter` limits which event types trigger requests to PixelCade. When empty, all events are forwarded. Note that only `media.started` and `media.stopped` ever produce requests regardless of this setting; all other notification types are ignored.

```toml
[[service.publishers.pixelcade]]
filter = [
    "media.started",
    "media.stopped"
]
```

Available event types match the [Core API notification types](./api/notifications.md).

### Groovy

```toml
[groovy]
gmc_proxy_enabled = true
gmc_proxy_port = 32106
gmc_proxy_beacon_interval = '2s'
```

#### gmc_proxy_enabled

| Key               | Type    | Default |
| ----------------- | ------- | ------- |
| gmc_proxy_enabled | boolean | false   |

`gmc_proxy_enabled` enables or disables the GMC proxy service for Groovy MiSTer Control integration.

#### gmc_proxy_port

| Key            | Type              | Default |
| -------------- | ----------------- | ------- |
| gmc_proxy_port | integer (1-65535) | 32106   |

`gmc_proxy_port` specifies which port the GMC proxy service should listen on.

#### gmc_proxy_beacon_interval

| Key                       | Type   | Default |
| ------------------------- | ------ | ------- |
| gmc_proxy_beacon_interval | string | 2s      |

`gmc_proxy_beacon_interval` sets the interval for GMC proxy beacon broadcasts.

### Playtime

```toml
[playtime]
retention = 365

[playtime.limits]
enabled = true
daily = "2h"
session = "45m"
session_reset = "20m"
warnings = ["10m", "5m", "2m", "1m"]
```

The `playtime` section configures playtime tracking, limits, and parental controls.

See the [Playtime documentation](../features/playtime.md) for detailed information and examples.

#### retention

| Key       | Type    | Default |
| --------- | ------- | ------- |
| retention | integer | 365     |

`retention` specifies how many days of playtime history to keep. Old records are automatically cleaned up.

```toml
[playtime]
retention = 90  # Keep 90 days
```

Set to `0` to keep all history forever (disables cleanup).

#### playtime.limits

`playtime.limits` is a sub-section of `playtime` and must be defined with the header: `[playtime.limits]`

##### enabled {#playtime-limits-enabled}

| Key     | Type    | Default |
| ------- | ------- | ------- |
| enabled | boolean | false   |

`enabled` turns playtime limit enforcement on or off.

```toml
[playtime.limits]
enabled = true
```

##### daily

| Key   | Type     | Default |
| ----- | -------- | ------- |
| daily | duration | none    |

`daily` sets the maximum total playtime per calendar day (resets at midnight).

```toml
[playtime.limits]
daily = "2h"      # 2 hours per day
daily = "1h30m"   # 1 hour 30 minutes
```

Omit or leave empty to disable daily limits.

##### session

| Key     | Type     | Default |
| ------- | -------- | ------- |
| session | duration | none    |

`session` sets the maximum playtime per gaming session.

```toml
[playtime.limits]
session = "45m"   # 45 minutes per session
session = "1h"    # 1 hour per session
```

Omit or leave empty to disable session limits.

##### session_reset

| Key           | Type     | Default |
| ------------- | -------- | ------- |
| session_reset | duration | `"20m"` |

`session_reset` sets the enforced break time between sessions. After a game stops, cumulative playtime is preserved during this period. If another game launches within this timeout and the session limit hasn't been reached, the session continues. However, if the session limit was reached, new launches are blocked until this timeout expires and the session fully resets.

```toml
[playtime.limits]
session_reset = "20m"  # 20-minute break before new session (default)
session_reset = "1h"   # 1-hour break before new session
session_reset = "0"    # Never reset sessions automatically
```

This creates a mandatory cooldown period between sessions when limits are enforced.

##### warnings

| Key      | Type       | Default              |
| -------- | ---------- | -------------------- |
| warnings | duration[] | `["5m", "2m", "1m"]` |

`warnings` sets the time-remaining intervals when warnings should be triggered.

```toml
[playtime.limits]
warnings = ["10m", "5m", "2m", "1m"]
```

Warnings are sent as notifications to the Zaparoo App and played as audio feedback.

## Auth File

A separate TOML file called `auth.toml`, alongside the config file, can be created which defines credentials for remote connections.

### API Keys

:::warning
API key authentication is a basic access control measure, not a security feature. Connections are unencrypted and keys can be intercepted by anyone on your network.
:::

API key authentication restricts remote access to the Zaparoo API:

```toml
api_keys = ["your-secret-key-here"]
```

Authenticate using either a Bearer token header or query parameter:

```
Authorization: Bearer your-secret-key-here
```

```
http://zaparoo:7497/api/v1/launch?key=your-secret-key-here
```

Localhost connections are always allowed without authentication, so the CLI and TUI continue to work without configuration.

### Remote Credentials

Define credentials used when Core connects to remote endpoints:

```toml
["smb://10.0.0.123/Games"]
username = "myaccount"
password = "Password123"
```

### URL Matching

When a remote endpoint matches against the URL key, the credential set will be attached to the request. Matching uses a 3-step fallback:

1. **Exact scheme match** - scheme, host, and path prefix must match exactly
2. **Canonical scheme match** - equivalent schemes match (e.g., `tcp://` matches `mqtt://`)
3. **Schemeless match** - entries without a scheme match any connection to that host:port

```toml
# Matches only mqtt:// connections
["mqtt://192.168.1.100:1883"]
username = "mqtt_only"
password = "pass"

# Matches any connection to this host:port (mqtt, mqtts, tcp, etc.)
["192.168.1.100:1883"]
username = "any_scheme"
password = "pass"
```

### Scheme Aliases

These scheme aliases are recognized:

| Alias | Canonical |
|-------|-----------|
| `tcp://` | `mqtt://` |
| `ssl://` | `mqtts://` |
| `ws://` | `http://` |
| `wss://` | `https://` |

Multiple credentials may be defined for the same server but on different paths.

## TUI Config File

A separate TOML file called `tui.toml`, alongside the config file, stores settings for the terminal UI.

```toml
theme = "default"
write_format = "zapscript"
mouse = true
crt_mode = false
on_screen_keyboard = false
```

### theme

Visual theme for the TUI. Available themes can be cycled through in the TUI settings menu.

### write_format

Format used when writing tokens from the search media screen. Options are `zapscript` (default) or `path`.

### mouse

Enable mouse input in the TUI. Defaults to `true`.

### crt_mode

Fixed 75x15 window size for better display on CRT monitors. Requires a restart to take effect. Defaults to `false`, but `true` on MiSTer and MiSTeX.

### on_screen_keyboard

Show a virtual keyboard when pressing Enter on text fields, for controller/gamepad input. Defaults to `false`, but `true` on MiSTer and MiSTeX.

## Example File

<details>
  <summary>Click to view a complete example config.toml file</summary>

An example `config.toml` file with all fields filled, using the example sections shown above.

```toml title="config.toml"
config_schema = 1
debug_logging = true
error_reporting = false
auto_update = false

[audio]
scan_feedback = true
volume = 100
success_sound = "custom_success.wav"
fail_sound = "custom_fail.wav"
limit_sound = "custom_limit.wav"
pending_sound = "custom_pending.ogg"
ready_sound = "custom_ready.ogg"

[input]
gamepad_enabled = true

[media]
filename_tags = true
default_regions = ["us", "world"]
default_langs = ["en"]

[readers]
auto_detect = true
scan_history = 30

[readers.scan]
mode = 'hold'
exit_delay = 3.0
ignore_system = [ 'PC', 'MSX' ]
on_scan = '**echo:card was scanned'
on_remove = '**echo:card was removed'
ignore_on_connect = true

[readers.scan.launch_guard]
enabled = true
timeout = 30
delay = 5

[[readers.connect]]
driver = 'acr122pcsc'
path = '/dev/ttyUSB0'

[[readers.connect]]
driver = 'opticaldrive'
path = '/dev/sr0'
id_source = 'uuid'

[readers.drivers.simpleserial]
enabled = false

[[systems.default]]
system = 'SNES'
launcher = 'SindenSNES'
before_exit = '**input.keyboard:{f12}||**delay:2000'

[launchers]
index_root = [
    '/media/alt_mount/games'
]
allow_file = [
    '^/media/fat/something.mgl$'
]
on_media_start = '**echo:media started'

[[launchers.default]]
launcher = 'KodiTV'
server_url = 'http://localhost:5678'

[zapscript]
allow_execute = [
    'touch /tmp/tap_time',
    '/media/fat/linux/mplayer .+'
]
allow_http = [
    'https://example\.com/.*'
]
block_commands = []

[zapscript.input]
mode = 'combos'
block = []

[playtime]
retention = 365

[playtime.limits]
enabled = true
daily = "2h"
session = "45m"
session_reset = "20m"
warnings = ["10m", "5m", "2m", "1m"]

[service]
api_port = 7497
api_listen = "0.0.0.0"
allowed_ips = [
    "192.168.1.100",
    "192.168.1.0/24"
]
device_id = '4d01c19f-09ba-4871-a58a-82fb49f5b518'
allowed_origins = [
    'https://app.zaparoo.org'
]
allow_run = [
    '\*\*launch\.random:.+'
]

[service.discovery]
enabled = true
instance_name = "Living Room MiSTer"

[[service.publishers.mqtt]]
enabled = true
broker = "mqtt://localhost:1883"
topic = "zaparoo/events"
filter = [
    "media.started",
    "media.stopped",
    "tokens.added"
]

[groovy]
gmc_proxy_enabled = true
gmc_proxy_port = 32106
gmc_proxy_beacon_interval = '2s'
```

</details>
