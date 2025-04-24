# Config File

The config file is the main configuration file of the [Zaparoo Core](/docs/core) software service.

Its location depends on the [platform](/docs/platforms/index.md) where the service is running. On [MiSTer](/docs/platforms/mister.md), it's located in the `/media/fat/zaparoo` folder (i.e. `zaparoo` folder in the root of the SD card).

The file is always called `config.toml` on every platform.

The config file is written in [TOML](https://toml.io/en/). Be aware that although comments are supported in TOML, _they will be lost if Core makes updates to this file_ (e.g. when adjusting settings using the Zaparoo App) and should be avoided for important information.

Any changes made to the config file while the Core service is running require the service to be restarted before changes will take effect, or the `-reload` [CLI command](./cli.md) to be run.

Optionally, Zaparoo Core can but run in portable mode, where the config and all other data are stored in a single folder alongside the executable. To enable this, create an empty folder called `user` in the same folder as the Core executable, then start Core normally.

## Options

Options in the config file are grouped by sections which start with a header. For example, the [audio](#audio) section begins with `[audio]` and continues until the next header is encountered.

### Root

The root section does not start with a section header and is the only section that behaves this way. It's reserved for certain options that affect all parts of Core or the config file itself.

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
```

#### scan_feedback

| Key           | Type    | Default |
| ------------- | ------- | ------- |
| scan_feedback | boolean | true    |

`scan_feedback` enables or disables playing a sound from the host device when a scan is successful or results in an error.

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
```

##### mode

| Key  | Type   | Default |
| ---- | ------ | ------- |
| mode | string | tap     |

`mode` defines the behavior of scans. It has two options:

- `tap` is the default mode and means when a token is used with a reader it can be removed again without affecting the playing media. If a token is tapped, removed and then tapped again it will relaunch the already playing media.
- `hold` mode makes it so a token must be held to the reader for as long as any launched media will play. That is, after a token is removed from the reader, it will exit the media. This makes a token act more like real physical media. **Core does not currently make any attempt to save before exiting media.**

##### exit_delay

| Key        | Type  | Default |
| ---------- | ----- | ------- |
| exit_delay | float | 0.0     |

`exit_delay` adds a delay, in seconds, before media is exited after a token is removed from a reader. It's only active if `hold` [mode](#mode) is also active.

For example, if `exit_delay` was set to `2.3`, it would mean when a token is removed from a reader, instead of immediately exiting the media, a timer is started for 2.3 seconds first. If the same token is placed back on the reader before the timer is complete, the timer will be cleared and the media won't exit.

This feature can be useful if you want to, using a single reader, scan other tokens such as adding credit without exiting the current game.

##### ignore_system

| Key           | Type     | Default |
| ------------- | -------- | ------- |
| ignore_system | string[] | []      |

`ignore_system` is a list of systems which will not exit playing media on token removal. It's only active in `hold` mode.

#### readers.connect

`readers.connect` manually defines a reader which is physically connected to the host device and is not auto-detected. It's a sub-section that can be defined multiple times, and must have this header: `[[readers.connect]]`

Pay attention to the double pairs of square brackets. Each defined `readers.connect` section must have its own header.

```toml
[[readers.connect]]
driver = 'pn532_uart'
path = '/dev/ttyUSB0'

[[readers.connect]]
driver = 'file'
path = '/tmp/some_file'
```

##### driver

| Key    | Type   | Default |
| ------ | ------ | ------- |
| driver | string |         |

`driver` specifies which reader driver should be used to attempt connection to the reader device. See [reader drivers](/docs/readers/index.md) for a list of possible options.

##### path

| Key  | Type   | Default |
| ---- | ------ | ------- |
| path | string |         |

`path` is an argument for the specified reader driver for how the device should be found. See [reader drivers](/docs/readers/index.md) for what this argument should look like for the driver.

### Systems

#### systems.default

`systems.default` overrides the default behavior of the specified system. It's a sub-section that can be defined multiple times, and must have this header: `[[systems.default]]`

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
```

#### index_root

| Key        | Type     | Default |
| ---------- | -------- | ------- |
| index_root | string[] | []      |

`index_root` is a list of paths on the host device that should _also_ be searched when indexing media during a media database update.

For example, if `index_root` was set to `[ '/media/fat/other_place' ]`, a database update will search all standard locations like normal but then also attempt to search _/media/fat/other_place/SNES_, _/media/fat/other_place/Genesis_, etc. for potential media.

#### allow_file

| Key        | Type     | Default |
| ---------- | -------- | ------- |
| allow_file | string[] | []      |

`allow_file` allows certain files to be launched if their assigned launcher requires it.

This is used on platforms like [Windows](../platforms/windows/index.md) to allow executable files to be launched with tokens, where this ability is useful but would be a security issue if allowed globally.

Each entry in this option is a [Regular Expression](https://github.com/google/re2/wiki/Syntax). Notes on usage here:

- An entry is considered a **partial match** unless it's surrounded by a `^` and `$`.
- On Windows, file path separators must be escaped: `C:\\Test\\Thing.exe`
- An entry can be made case-insensitive by putting `(?i)` at the beginning.

### ZapScript

```toml
[zapscript]
allow_execute = [
    '^touch /tmp/tap_time$',
    '^/media/fat/linux/mplayer .+'
]
```

#### allow_execute

| Key           | Type     | Default |
| ------------- | -------- | ------- |
| allow_execute | string[] | []      |

`allow_execute` allows specific executables and arguments to be run using the `**execute` [ZapScript](../zapscript/index.md) command. By default, the command does not allow anything to be run.

Each entry in this option is a [Regular Expression](https://github.com/google/re2/wiki/Syntax). Notes on usage here:

- An entry is considered a **partial match** unless it's surrounded by a `^` and `$`.
- On Windows, file path separators must be escaped: `C:\\Test\\Thing.exe`

### Service

```toml
[service]
api_port = 7497
device_id = '4d01c19f-09ba-4871-a58a-82fb49f5b518'
allow_run = [
    '^\*\*launch\.random:.+$'
]
```

#### api_port

| Key      | Type    | Default |
| -------- | ------- | ------- |
| api_port | integer | 7497    |

`api_port` specifies which port the [API](./api/index.md) of Core should be accessible from.

**Don't change this unless you know what you're doing. It will currently break external tools that rely on it being the default value.**

#### device_id

| Key       | Type          | Default                    |
| --------- | ------------- | -------------------------- |
| device_id | string (UUID) | _generated at first start_ |

`device_id` is a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) that is used to uniquely identify the instance of the Core service running on a host device.

It's currently reserved for future use when devices can communicate with each other and external services. **It should not be changed once set.**

#### allow_run

| Key       | Type     | Default |
| --------- | -------- | ------- |
| allow_run | string[] | []      |

`allow_run` explicitly allows [ZapScript](../zapscript/index.md) to be run using the [run endpoint](./api/methods.md) of the [Core API](./api/index.md). By default, nothing is allowed.

Each entry in this option is a [Regular Expression](https://github.com/google/re2/wiki/Syntax). Notes on usage here:

- An entry is considered a **partial match** unless it's surrounded by a `^` and `$`.
- Characters `*`, `|` and `.` common in both ZapScript and Regular Expressions must be escaped like in the example file below.

## Example File

An example `config.toml` file with all fields filled, using the example sections shown above.

```toml
config_schema = 1
debug_logging = true

[audio]
scan_feedback = true

[readers]
auto_detect = true

[readers.scan]
mode = 'hold'
exit_delay = 3.0
ignore_system = [ 'PC', 'MSX' ]

[[readers.connect]]
driver = 'pn532_uart'
path = '/dev/ttyUSB0'

[[readers.connect]]
driver = 'file'
path = '/tmp/some_file'

[[systems.default]]
system = 'SNES'
launcher = 'SindenSNES'

[launchers]
index_root = [
    '/media/alt_mount/games'
]
allow_file = [
    '^/media/fat/something.mgl$'
]

[zapscript]
allow_execute = [
    '^touch /tmp/tap_time$',
    '^/media/fat/linux/mplayer .+'
]

[service]
api_port = 7497
device_id = '4d01c19f-09ba-4871-a58a-82fb49f5b518'
allow_run = [
    '^\*\*launch\.random:.+$'
]
```
