---
sidebar_position: 3
toc_max_heading_level: 4
description: "Complete configuration reference for Zaparoo Core: every setting, option, and value in config.toml explained with examples."
keywords: [zaparoo config, zaparoo core config, config.toml zaparoo, zaparoo configuration reference]
---

# Config File

The config file is the main configuration file of the [Zaparoo Core](./index.md) software service.

Its location depends on the [platform](../../platforms/index.mdx) where the service is running. On [MiSTer](../../platforms/mister/index.md), it's located in the `/media/fat/zaparoo` folder (i.e. `zaparoo` folder in the root of the SD card).

The file is always called `config.toml` on every platform.

The config file is written in [TOML](https://toml.io/en/).

:::tip Windows paths
Backslashes must be escaped inside double-quoted TOML strings. You can instead use a single-quoted literal string, which preserves backslashes:

```toml
# Double-quoted string
install_dir = "C:\\Games\\LaunchBox"

# Literal string
install_dir = 'C:\Games\LaunchBox'
```

An invalid TOML file can prevent Core from loading any configuration, not just the affected launcher. If Core stops loading configuration after a manual edit, check the whole file for syntax errors.
:::

:::warning
Although comments are supported in TOML, _they will be lost if Core updates this file_ (e.g. when adjusting settings via the Zaparoo App). Manual edits to values are preserved on save.
:::

Any changes made to the config file while the Core service is running require the service to be restarted before changes will take effect, or the `-reload` [CLI command](../cli.md) to be run.

:::tip Portable Mode
Optionally, Zaparoo Core can run in portable mode, where the config and all other data are stored in a single folder alongside the executable. To enable this, create an empty folder called `user` in the same folder as the Core executable, then start Core normally.
:::

## A minimal config

Most setups never need more than a few lines. This is a complete, working `config.toml` that turns on debug logging and adds one custom launcher for shell scripts:

```toml
config_schema = 1
debug_logging = true

[launchers]
allow_file = [
    "^/home/pi/scripts/.*\\.sh$"
]
```

Everything else falls back to its default. The [complete example](#complete-example) at the bottom of this page shows every section together.

## Sections

The options are split across these pages by the TOML table they live in:

| Page | Tables |
| ---- | ------ |
| This page | Global settings, `[updates]`, `[backup]`, `[library]` |
| [Audio, input, media, and scraper](./media.md) | `[audio]`, `[input]`, `[media]`, `[scraper]` |
| [Readers](./readers.md) | `[readers]`, `[readers.scan]`, `[[readers.connect]]`, `[readers.drivers]` |
| [Systems and launchers](./launchers.md) | `[[systems.default]]`, `[[systems.category]]`, `[launchers]`, `[[launchers.default]]`, `[[launchers.custom]]`, `[groovy]` |
| [ZapScript](./zapscript.md) | `[zapscript]`, `[zapscript.input]` |
| [Service and auth file](./service.md) | `[service]`, `[service.discovery]`, `[service.remote_control]`, `[[service.publishers]]`, `auth.toml` |
| [Profiles and playtime](./profiles.md) | `[profiles]`, `[playtime]`, `[playtime.limits]` |

The global settings section does not start with a section header and is the only section that behaves this way. It's reserved for certain options that affect all parts of Core or the config file itself.

## Global Settings

```toml
config_schema = 1
debug_logging = true
```

### config_schema

| Key           | Type    | Default |
| ------------- | ------- | ------- |
| config_schema | integer | 1       |

**This option should not be changed or removed.**

`config_schema` is used internally by Core to track what version of itself last wrote to the file. This makes it possible to perform migrations between versions if the layout of the config file must be changed.

### debug_logging

| Key           | Type    | Default |
| ------------- | ------- | ------- |
| debug_logging | boolean | false   |

`debug_logging` enables or disables logging debug messages to Core log files. It's useful for troubleshooting issues but can make log files noisy.

This option should be enabled when attempting to reproduce issues for reporting.

### error_reporting

| Key             | Type    | Default |
| --------------- | ------- | ------- |
| error_reporting | boolean | false   |

`error_reporting` enables or disables opt-in error reporting. When enabled, anonymous error reports are sent to help improve Zaparoo.

See the [Privacy Policy](/privacy) for details on what data is collected.


## Updates

```toml
[updates]
check = true
install = false
channel = "stable"
```

The `[updates]` section controls how Core checks for and installs new releases. See [Core updates](../updates.md) for how checks, automatic installs, and rollback work.

Checking is on by default on every platform. On installs owned by a package manager, such as MiSTer installs from Update All and Batocera installs from the Content Downloader, Core still checks but never installs itself.

### check {#updates-check}

| Key   | Type    | Default |
| ----- | ------- | ------- |
| check | boolean | true    |

`check` enables update checks and the Inbox message that announces a new release.

### install {#updates-install}

| Key     | Type    | Default |
| ------- | ------- | ------- |
| install | boolean | false   |

`install` lets Core install new releases automatically. It is treated as `false` while `check` is off, and Core refuses to install itself on package-managed installs.

### channel {#updates-channel}

| Key     | Type                          | Default    |
| ------- | ----------------------------- | ---------- |
| channel | string (`"stable"`, `"beta"`) | `"stable"` |

`channel` selects which releases Core considers. Use `"beta"` to include beta and release candidate builds.


## Backup

```toml
[backup]
local_dir = "/path/to/backups"
scope = "platform"

[backup.remote]
enabled = false
schedule = "daily"
```

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `local_dir` | string | `<data directory>/backups/files` | Directory for local backup ZIP files. |
| `scope` | string | `"platform"` | `"platform"` includes supported device settings and save data; `"zaparoo"` includes only Zaparoo-owned data. |
| `remote.enabled` | boolean | `false` | Enables automatic cloud backup scheduling. Manual uploads remain available while disabled. |
| `remote.schedule` | string | `"daily"` | Cloud schedule: `"daily"`, `"weekly"`, or `"manual"`. |

Full platform backups are currently supported on MiSTer and SteamOS. See [Device Backups](../../features/backups.md) for included data and restore behavior.

To back up to your own server instead of Zaparoo Online, set [`online_base_url`](./service.md#online_base_url).

## Library

```toml
[library]
sync = false
```

### sync {#library-sync}

| Key  | Type    | Default |
| ---- | ------- | ------- |
| sync | boolean | false   |

`sync` turns on [Library sync](../../online/index.md#library-sync) with a linked Zaparoo Online account. It keeps favorites, likes, dislikes, play later, and decks in step with the account, and uploads the list of games on this device so remote control and deck building in Online know what it can play. Linking an account does not enable it, and linking or unlinking turns it back off. Turning it off removes this device's game list from the account and keeps local favorites and decks.

You can also change it under **Settings > Online** in the [terminal UI](../tui.md#backups-and-zaparoo-online).

## Complete example {#complete-example}

<details>
  <summary>Click to view a complete example config.toml file</summary>

An example `config.toml` file with all fields filled, using the example sections shown above.

```toml title="config.toml"
config_schema = 1
debug_logging = true
error_reporting = false

[updates]
check = true
install = false
channel = "stable"

[backup]
local_dir = "/path/to/backups"
scope = "platform"

[backup.remote]
enabled = false
schedule = "daily"

[library]
sync = false

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

[scraper.gamelist_xml]
custom_path = "/path/to/gamelists"

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
allow_relaunch = false

[readers.scan.launch_guard]
enabled = true
timeout = 30
delay = 5
require_confirm = false

[[readers.connect]]
driver = 'acr122pcsc'
path = 'ACS ACR122 0'

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

[[systems.category]]
name = 'Kids'
systems = ['NES', 'SNES', 'Genesis']

[launchers]
index_root = [
    '/media/alt_mount/games'
]
preference = [
    'Native',
    'EmuDeck',
    'RetroDECK'
]
allow_file = [
    '^/media/fat/something.mgl$'
]
on_media_start = '**echo:media started'
before_exit = '**input.keyboard:{f12}'

[[launchers.default]]
launcher = 'KodiTV'
server_url = 'http://localhost:5678'

[[launchers.default]]
launcher = 'RetroAchievements'
before_exit = '**input.keyboard:{f2}'

[[launchers.default]]
launcher = 'Arcade'
scan_duplicates = true

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

[profiles]
require_for_launch = false
swap_data = true

[playtime]
retention = 365
sync = false

[playtime.limits]
enabled = true
daily = "2h"
session = "45m"
session_reset = "20m"
warnings = ["10m", "5m", "2m", "1m"]

[service]
api_port = 7497
api_listen = "0.0.0.0"
online_base_url = "https://api.zaparoo.com"
allowed_ips = [
    "192.168.1.100",
    "192.168.1.0/24"
]
encryption = false
device_id = '4d01c19f-09ba-4871-a58a-82fb49f5b518'
allowed_origins = [
    'zaparoo.example.lan'
]
allow_run = [
    '\*\*launch\.random:.+'
]

[service.discovery]
enabled = true
instance_name = "Living Room MiSTer"

[service.remote_control]
enabled = false

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
