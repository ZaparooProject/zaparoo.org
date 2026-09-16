---
sidebar_position: 2
toc_max_heading_level: 5
description: "Zaparoo Core config.toml reference for [readers]: auto-detect, scan mode, hold mode, launch guard, allow_relaunch, on_scan hooks, reader connections, and driver settings."
keywords: [zaparoo readers config, readers.connect, readers.scan, scan mode, launch guard config, reader drivers config]
---

# Readers Config

Part of the [config file reference](./index.md). Keys are shown with their type and default, followed by what they do and an example.

## Readers

```toml
[readers]
auto_detect = true
scan_history = 30
```

### auto_detect {#readers-auto-detect}

| Key         | Type    | Default |
| ----------- | ------- | ------- |
| auto_detect | boolean | true    |

`auto_detect` enables or disables automatically searching for and probing possible connected readers on the host device.

It may be required to disable this option if auto-detection is causing problems with unrelated connected devices.

### scan_history

| Key          | Type    | Default |
| ------------ | ------- | ------- |
| scan_history | integer | 30      |

`scan_history` specifies how many days of scan history to keep for the recent scans list. Old scan records are automatically cleaned up.

```toml
[readers]
scan_history = 30
```

Set to `0` to keep all scan history forever (disables cleanup).

### readers.scan

`readers.scan` is a sub-section of `readers` and must be defined with the header: `[readers.scan]`

```toml
[readers.scan]
mode = 'hold'
exit_delay = 3.0
ignore_system = [ 'PC', 'MSX' ]
on_scan = '**echo:card was scanned'
on_remove = '**echo:card was removed'
ignore_on_connect = true
allow_relaunch = false
```

#### mode {#scan-mode}

| Key  | Type                     | Default |
| ---- | ------------------------ | ------- |
| mode | string ("tap" \| "hold") | tap     |

`mode` defines the behavior of scans. It has two options:

- `tap` is the default mode and means when a token is used with a reader it can be removed again without affecting the playing media. Tapping a token that resolves to the media already playing leaves it running, unless [`allow_relaunch`](#allow_relaunch) is on.
- `hold` mode makes it so a token must be held to the reader for as long as any launched media will play. That is, after a token is removed from the reader, it will exit the media. This makes a token act more like real physical media. **Core does not currently make any attempt to save before exiting media.** See [`exit_delay`](#exit_delay), [`ignore_system`](#ignore_system), and [`on_remove`](#on_remove) for related options.

`mode` is the device-wide default. One reader can override it with [`scan_mode`](#readers-connect-scan-mode) on its `[[readers.connect]]` entry or on its [driver](#readers-drivers-scan-mode), and one token can override its reader with the [`#tap` and `#hold` traits](../../zapscript/syntax.md#traits).

#### exit_delay

| Key        | Type         | Default |
| ---------- | ------------ | ------- |
| exit_delay | float (≥0.0) | 0.0     |

`exit_delay` adds a delay, in seconds, before media is exited after a token is removed from a reader. It's only active if `hold` [mode](#scan-mode) is also active.

For example, if `exit_delay` was set to `2.3`, it would mean when a token is removed from a reader, instead of immediately exiting the media, a timer is started for 2.3 seconds first. If the same token is placed back on the reader before the timer is complete, the timer will be cleared and the media won't exit.

This feature can be useful if you want to, using a single reader, scan other tokens such as adding credit without exiting the current game.

#### ignore_system

| Key           | Type     | Default |
| ------------- | -------- | ------- |
| ignore_system | string[] | []      |

`ignore_system` is a list of systems which will not exit playing media on token removal. It's only active in `hold` [`mode`](#scan-mode).

#### on_scan

| Key     | Type   | Default |
| ------- | ------ | ------- |
| on_scan | string |         |

`on_scan` is a [hook](../../features/hooks.md) containing a snippet of [ZapScript](../../zapscript/index.md). It runs immediately after a token is scanned but before ZapScript on the token itself (or a mapping) is run. It is always active if enabled.

This hook can block the scan by returning an error. If the ZapScript command fails or a script executed via `**execute:` returns a non-zero exit code, the token processing is blocked.

Scripts executed via `**execute:` receive a `ZAPAROO_ENVIRONMENT` environment variable containing the [expression environment](../../zapscript/syntax.md#expression-environment) as JSON.

#### on_remove

| Key       | Type   | Default |
| --------- | ------ | ------- |
| on_remove | string |         |

`on_remove` is a [hook](../../features/hooks.md) containing a snippet of [ZapScript](../../zapscript/index.md). It runs immediately after a token is removed from the reader. It's only active in `hold` [`mode`](#scan-mode).

Note that this will _always_ run in `hold` mode when a token is removed from the reader, no matter if any media was launched or is active. It also does not respect the [`exit_delay`](#exit_delay) setting and runs before any media exit logic happens.

This hook can block the remove action by returning an error. If the ZapScript command fails or a script executed via `**execute:` returns a non-zero exit code, the remove processing is blocked.

Scripts executed via `**execute:` receive a `ZAPAROO_ENVIRONMENT` environment variable containing the [expression environment](../../zapscript/syntax.md#expression-environment) as JSON.

#### ignore_on_connect

| Key                | Type    | Default |
| ------------------ | ------- | ------- |
| ignore_on_connect  | boolean | false   |

`ignore_on_connect` suppresses the first token scan from each newly-connected reader, preventing accidental launches from cards left on readers at startup.

```toml
[readers.scan]
ignore_on_connect = true
```

When enabled, if a token is already present on a reader when it connects (e.g., a card left on the reader when Zaparoo starts), that initial scan will be silently ignored. Subsequent scans from the same reader will work normally.

#### allow_relaunch

| Key            | Type    | Default |
| -------------- | ------- | ------- |
| allow_relaunch | boolean | false   |

In [tap mode](#scan-mode), a scan that resolves to the media already playing is skipped and the game keeps running. This covers any token that lands on the same file, not only a repeat scan of the same card. Other commands on the token still run, and no launch or exit [hooks](../../features/hooks.md) fire. Set `allow_relaunch` to `true` to make a repeat scan restart the game from the beginning instead. Hold mode and API launches are not affected.

```toml
[readers.scan]
allow_relaunch = true
```

### readers.scan.launch_guard {#launch-guard-config}

`readers.scan.launch_guard` is a sub-section of `readers.scan` and must be defined with the header: `[readers.scan.launch_guard]`

```toml
[readers.scan.launch_guard]
enabled = true
timeout = 15
delay = 0
require_confirm = false
```

#### enabled {#launch-guard-enabled}

| Key     | Type    | Default |
| ------- | ------- | ------- |
| enabled | boolean | false   |

`enabled` turns launch guard on or off. When enabled, tokens scanned while media is playing are staged rather than launched immediately. All scans are unaffected when nothing is playing.

```toml
[readers.scan.launch_guard]
enabled = true
```

#### timeout {#launch-guard-timeout}

| Key     | Type          | Default |
| ------- | ------------- | ------- |
| timeout | float (≥-1.0) | 15.0    |

`timeout` sets how long, in seconds, a staged token waits for confirmation before being silently dropped.

Setting `timeout` to `0` uses the default of 15 seconds. Setting it to a negative value (e.g., `-1`) disables the timeout entirely. The staged token persists until it's confirmed, replaced by another scan, or cleared when media stops.

```toml
[readers.scan.launch_guard]
timeout = 30     # wait up to 30 seconds
timeout = -1     # wait indefinitely
```

#### delay {#launch-guard-delay}

| Key   | Type         | Default |
| ----- | ------------ | ------- |
| delay | float (≥0.0) | 0.0     |

`delay` sets a mandatory cool-down period, in seconds, before re-tap confirmation is accepted. During this window, re-tapping the same card resets both the delay and the timeout. Confirmation is not accepted until the full delay has elapsed.

When the delay expires, a ready sound plays and a `tokens.staged.ready` notification is sent.

`delay` is clamped to half of `timeout` if it would equal or exceed it. It is forced to `0` when `timeout` is negative.

```toml
[readers.scan.launch_guard]
timeout = 30
delay = 5   # block re-tap for the first 5 seconds
```

Setting `delay` to `0` (the default) disables the cool-down and re-tap confirmation is accepted immediately after staging.

#### require_confirm {#launch-guard-require-confirm}

| Key             | Type    | Default |
| --------------- | ------- | ------- |
| require_confirm | boolean | false   |

`require_confirm` disables re-tap confirmation. When set to `true`, re-tapping the staged card does nothing. The only way to launch a staged token is via the `confirm` API method.

```toml
[readers.scan.launch_guard]
enabled = true
require_confirm = true
```

This is useful when you want an external device (a physical button, a companion app, or an automation script) to be the sole confirmation path.

### readers.connect

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

#### driver

| Key    | Type   | Default |
| ------ | ------ | ------- |
| driver | string |         |

`driver` specifies which reader driver should be used to attempt connection to the reader device. See [reader drivers](../../readers/drivers.md) for a list of available drivers.

#### path

| Key  | Type   | Default |
| ---- | ------ | ------- |
| path | string |         |

`path` is an argument for the specified reader driver for how the device should be found. See the documentation for your specific reader hardware for configuration examples.

#### id_source

| Key       | Type   | Default |
| --------- | ------ | ------- |
| id_source | string |         |

`id_source` specifies which identifier source to use for token identification. This is only supported by certain reader drivers:

- `opticaldrive`: `uuid` (disc UUID), `label` (disc label), or `merged` (UUID and label together). Unset behaves like `merged`.

Other reader drivers ignore this setting.

#### enabled {#readers-connect-enabled}

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

#### scan_mode {#readers-connect-scan-mode}

| Key       | Type                     | Default |
| --------- | ------------------------ | ------- |
| scan_mode | string ("tap" \| "hold") |         |

`scan_mode` sets the [scan mode](#scan-mode) for this one reader, so a cartridge slot can hold while an NFC antenna on the same device taps. It takes priority over the driver's [`scan_mode`](#readers-drivers-scan-mode) and the global `mode`.

```toml
[readers.scan]
mode = 'tap'

[[readers.connect]]
driver = 'pn532'
path = '/dev/ttyUSB1'
scan_mode = 'hold'
```

### readers.drivers

`readers.drivers` configures driver-specific settings. It's a sub-section that uses driver IDs as keys, and must have this header format: `[readers.drivers.DRIVER_ID]`

```toml
[readers.drivers.acr122pcsc]
auto_detect = false

[readers.drivers.simpleserial]
enabled = false

[readers.drivers.opticaldrive]
scan_mode = 'hold'
```

#### enabled {#readers-drivers-enabled}

| Key     | Type    | Default            |
| ------- | ------- | ------------------ |
| enabled | boolean | _varies by driver_ |

`enabled` allows you to explicitly enable or disable a specific reader driver. When not specified, the driver uses its default enabled state.

#### auto_detect {#readers-drivers-auto-detect}

| Key         | Type    | Default |
| ----------- | ------- | ------- |
| auto_detect | boolean | _varies by driver_ |

`auto_detect` controls whether this specific driver should participate in automatic reader detection, overriding the global `auto_detect` setting for this driver only. Some drivers, such as `libnfcacr122`, are enabled but not auto-detected until this is set to `true`.

#### scan_mode {#readers-drivers-scan-mode}

| Key       | Type                     | Default |
| --------- | ------------------------ | ------- |
| scan_mode | string ("tap" \| "hold") |         |

`scan_mode` sets the [scan mode](#scan-mode) for every reader that uses this driver. A `[[readers.connect]]` entry's own [`scan_mode`](#readers-connect-scan-mode) takes priority over it, and it takes priority over the global `mode`.

```toml
[readers.drivers.opticaldrive]
scan_mode = 'hold'
```
