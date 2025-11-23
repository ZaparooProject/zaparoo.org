# Config File

The config file is the main configuration file of the [Zaparoo Core](/docs/core) software service.

Its location depends on the [platform](/docs/platforms/index.md) where the service is running. On [MiSTer](/docs/platforms/mister.md), it's located in the `/media/fat/zaparoo` folder (i.e. `zaparoo` folder in the root of the SD card).

The file is always called `config.toml` on every platform.

The config file is written in [TOML](https://toml.io/en/).

:::warning
Although comments are supported in TOML, _they will be lost if Core makes updates to this file_ (e.g. when adjusting settings using the Zaparoo App) and should be avoided for important information.
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

### Audio

```toml
[audio]
scan_feedback = true
success_sound = "custom_success.wav"
fail_sound = "custom_fail.wav"
limit_sound = "custom_limit.wav"
```

#### scan_feedback

| Key           | Type    | Default |
| ------------- | ------- | ------- |
| scan_feedback | boolean | true    |

`scan_feedback` enables or disables playing a sound from the host device when a scan is successful or results in an error.

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

See the [Tags documentation](/docs/core/tags) for detailed information about tag parsing and usage.

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
```

#### auto_detect

| Key         | Type    | Default |
| ----------- | ------- | ------- |
| auto_detect | boolean | true    |

`auto_detect` enables or disables automatically searching for and probing possible connected readers on the host device.

It may be required to disable this option if auto-detection is causing problems with unrelated connected devices.

#### readers.scan

`readers.scan` is a sub-section of `readers` and must be defined with the header: `[readers.scan]`

```toml
[readers.scan]
mode = 'hold'
exit_delay = 3.0
ignore_system = [ 'PC', 'MSX' ]
on_scan = '**echo:card was scanned'
on_remove = '**echo:card was removed'
```

##### mode

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

`exit_delay` adds a delay, in seconds, before media is exited after a token is removed from a reader. It's only active if `hold` [mode](#mode) is also active.

For example, if `exit_delay` was set to `2.3`, it would mean when a token is removed from a reader, instead of immediately exiting the media, a timer is started for 2.3 seconds first. If the same token is placed back on the reader before the timer is complete, the timer will be cleared and the media won't exit.

This feature can be useful if you want to, using a single reader, scan other tokens such as adding credit without exiting the current game.

##### ignore_system

| Key           | Type     | Default |
| ------------- | -------- | ------- |
| ignore_system | string[] | []      |

`ignore_system` is a list of systems which will not exit playing media on token removal. It's only active in `hold` [`mode`](#mode).

##### on_scan

| Key     | Type   | Default |
| ------- | ------ | ------- |
| on_scan | string |         |

`on_scan` is a snippet of [ZapScript](../zapscript/index.md) which is run immediately after a token is scanned but before ZapScript on the token itself (or a mapping) is run. It is always active if enabled.

##### on_remove

| Key       | Type   | Default |
| --------- | ------ | ------- |
| on_remove | string |         |

`on_remove` is a snippet of [ZapScript](../zapscript/index.md) which is run immediately after a token is removed from the reader. It's only active in `hold` [`mode`](#mode).

Note that this will _always_ run in `hold` mode when a token is removed from the reader, no matter if any media was launched or is active. It also does not respect the [`exit_delay`](#exit_delay) setting and runs before any media exit logic happens.

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

`driver` specifies which reader driver should be used to attempt connection to the reader device. See [reader drivers](./drivers.md) for a list of available drivers.

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

#### readers.drivers

`readers.drivers` configures driver-specific settings. It's a sub-section that uses driver IDs as keys, and must have this header format: `[readers.drivers.DRIVER_ID]`

```toml
[readers.drivers.acr122pcsc]
enabled = true
auto_detect = false

[readers.drivers.simpleserial]
enabled = false
```

##### enabled

| Key     | Type    | Default            |
| ------- | ------- | ------------------ |
| enabled | boolean | _varies by driver_ |

`enabled` allows you to explicitly enable or disable a specific reader driver. When not specified, the driver uses its default enabled state.

##### auto_detect

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

ID of the [system](./systems.md) this default override entry applies to.

##### launcher

| Key      | Type   | Default |
| -------- | ------ | ------- |
| launcher | string |         |

ID of the [launcher](./launchers.md) that should be used by default when media in this system is launched.

##### before_exit

| Key         | Type   | Default |
| ----------- | ------ | ------- |
| before_exit | string |         |

A snippet of [ZapScript](../zapscript/index.md) to be run before media exits if [hold mode](#mode) is enabled. Blocks before moving onto exit so commands like [delay](../zapscript/utilities.md) can be used.

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

#### allow_file

| Key        | Type                      | Default |
| ---------- | ------------------------- | ------- |
| allow_file | string[] (regex patterns) | []      |

`allow_file` allows certain files to be launched if their assigned launcher requires it.

This is used on platforms like [Windows](../platforms/windows/index.md) to allow executable files to be launched with tokens, where this ability is useful but would be a security issue if allowed globally.

Each entry in this option is a [Regular Expression](https://github.com/google/re2/wiki/Syntax). Notes on usage here:

- An entry is considered a **partial match** unless it's surrounded by a `^` and `$`.
- On Windows, file path separators must be escaped: `C:\\Test\\Thing.exe`
- An entry can be made case-insensitive by putting `(?i)` at the beginning.

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

#### launchers.default

`launchers.default` overrides default settings for specific launchers. It's a sub-section that can be defined multiple times, and must have this header: `[[launchers.default]]`. See also [`systems.default`](#systemsdefault) for system-specific settings.

Pay attention to the double pairs of square brackets. Each defined `launchers.default` section must have its own header.

```toml
[[launchers.default]]
launcher = 'KodiTV'
server_url = 'http://localhost:5678'
```

##### launcher

| Key      | Type   | Default |
| -------- | ------ | ------- |
| launcher | string |         |

ID of the [launcher](./launchers.md) this default override entry applies to.

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

### ZapScript

```toml
[zapscript]
allow_execute = [
    '^touch /tmp/tap_time$',
    '^/media/fat/linux/mplayer .+'
]
```

#### allow_execute

| Key           | Type                      | Default |
| ------------- | ------------------------- | ------- |
| allow_execute | string[] (regex patterns) | []      |

:::danger Security Warning
`allow_execute` allows specific executables and arguments to be run using the `**execute` [ZapScript](../zapscript/index.md) command. By default, the command does not allow anything to be run. Be extremely careful with this setting as it can execute arbitrary commands on your system.
:::

Each entry in this option is a [Regular Expression](https://github.com/google/re2/wiki/Syntax). Notes on usage here:

- An entry is considered a **partial match** unless it's surrounded by a `^` and `$`.
- On Windows, file path separators must be escaped: `C:\\Test\\Thing.exe`

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
    '^\*\*launch\.random:.+$'
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

`api_port` specifies which port the [API](/docs/core/api/) of Core should be accessible from.

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

`allow_run` explicitly allows [ZapScript](../zapscript/index.md) to be run using the [run endpoint](/docs/core/api/methods/) of the [Core API](/docs/core/api/). By default, nothing is allowed.

Each entry in this option is a [Regular Expression](https://github.com/google/re2/wiki/Syntax). Notes on usage here:

- An entry is considered a **partial match** unless it's surrounded by a `^` and `$`.
- Characters `*`, `|` and `.` common in both ZapScript and Regular Expressions must be escaped like in the example file below.

#### service.publishers

`service.publishers` is a sub-section of `service` that configures publishing Core events to external services.

##### service.publishers.mqtt

`service.publishers.mqtt` configures MQTT publishers for broadcasting Core events. It's a sub-section that can be defined multiple times, and must have this header: `[[service.publishers.mqtt]]`

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

###### enabled

| Key     | Type    | Default |
| ------- | ------- | ------- |
| enabled | boolean | true    |

`enabled` turns this MQTT publisher on or off.

```toml
[[service.publishers.mqtt]]
enabled = false
```

###### broker

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

For TLS connections and authentication, see the MQTT reader's [auth.toml configuration](/docs/readers/mqtt#authentication).

###### topic

| Key   | Type   | Default |
| ----- | ------ | ------- |
| topic | string |         |

`topic` specifies the MQTT topic to publish events to.

```toml
[[service.publishers.mqtt]]
topic = "home/zaparoo/events"
```

###### filter

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

Available event types match the [Core API notification types](/docs/core/api/notifications).

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

See the [Playtime documentation](/docs/core/playtime) for detailed information and examples.

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

##### enabled

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
session_reset = "0"    # Reset immediately (no enforced break)
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

A separate TOML file called `auth.toml`, alongside the config file, can be created which defines credentials used when Core connects to remote endpoints:

```toml
[creds."smb://10.0.0.123/Games"]
username = 'myaccount'
password = 'Password123'
```

When a remote endpoint matches against the prefix URL after `creds.`, the credential set will be attached to the request. This can be used to authenticate with a NAS.

Multiple credentials may be defined for the same server but on different paths.

## Example File

<details>
  <summary>Click to view a complete example config.toml file</summary>

An example `config.toml` file with all fields filled, using the example sections shown above.

```toml title="config.toml"
config_schema = 1
debug_logging = true

[audio]
scan_feedback = true
success_sound = "custom_success.wav"
fail_sound = "custom_fail.wav"
limit_sound = "custom_limit.wav"

[media]
filename_tags = true
default_regions = ["us", "world"]
default_langs = ["en"]

[readers]
auto_detect = true

[readers.scan]
mode = 'hold'
exit_delay = 3.0
ignore_system = [ 'PC', 'MSX' ]
on_scan = '**echo:card was scanned'
on_remove = '**echo:card was removed'

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
    '^touch /tmp/tap_time$',
    '^/media/fat/linux/mplayer .+'
]

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
    '^\*\*launch\.random:.+$'
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

[groovy]
gmc_proxy_enabled = true
gmc_proxy_port = 32106
gmc_proxy_beacon_interval = '2s'
```

</details>
