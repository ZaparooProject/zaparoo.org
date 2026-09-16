---
sidebar_position: 3
toc_max_heading_level: 5
description: "Zaparoo Core config.toml reference for [[systems.default]], [[systems.category]], [launchers], [[launchers.default]], custom launchers, allow lists, and the [groovy] section."
keywords: [zaparoo launchers config, systems.default, systems.category, launchers.default, allow_file, allow_execute, launcher preference]
---

# Systems and Launchers Config

Part of the [config file reference](./index.md). Keys are shown with their type and default, followed by what they do and an example.

## Systems

### systems.default

`systems.default` overrides the default behavior of the specified system. It's a sub-section that can be defined multiple times, and must have this header: `[[systems.default]]`. See also [`launchers.default`](#launchersdefault) for launcher-specific settings.

Pay attention to the double pairs of square brackets. Each defined `systems.default` section must have its own header.

```toml
[[systems.default]]
system = 'SNES'
launcher = 'SindenSNES'
before_exit = '**input.keyboard:{f12}||**delay:2000'
```

#### system

| Key    | Type   | Default |
| ------ | ------ | ------- |
| system | string |         |

ID of the [system](../../features/systems.md) this default override entry applies to.

#### launcher {#systems-default-launcher}

| Key      | Type   | Default |
| -------- | ------ | ------- |
| launcher | string |         |

ID of the [launcher](../../features/launchers.md) that should be used by default when media in this system is launched. This applies to title/search launches and direct path launches when Core can infer the system. Explicit ZapScript `?launcher=` arguments and per-media launcher overrides saved through [`media.meta.update`](../api/methods.md#mediametaupdate) take priority over this default.

#### before_exit

| Key         | Type   | Default |
| ----------- | ------ | ------- |
| before_exit | string |         |

A [hook](../../features/hooks.md#exit-hooks) containing a snippet of [ZapScript](../../zapscript/index.md) to run just before media for this system stops or is replaced, whether by another token, `stop`, a playtime limit, or a [hold mode](./readers.md#scan-mode) card removal. Core waits for it, up to 30 seconds, so commands like [`delay`](../../zapscript/utilities.md#delay) can be used. A failure is logged and does not stop the exit.

#### pause_on_launch

| Key             | Type    | Default |
| --------------- | ------- | ------- |
| pause_on_launch | boolean | true    |

`pause_on_launch` controls whether [background audio](../../features/audio.md) for this system pauses when a game launches in the primary slot, then resumes when the game quits. It currently applies to the `Audio` system. Set it to `false` to keep background music playing through game launches.

```toml
[[systems.default]]
system = "Audio"
pause_on_launch = false
```

### systems.category

`systems.category` adds a category of your own, such as a favorites or kids shelf, that clients like the [Zaparoo App](../../app/index.md) and [Zaparoo Frontend](../../frontend/index.mdx) show alongside the built-in categories. It's a sub-section that can be defined multiple times, and must have this header: `[[systems.category]]`.

Pay attention to the double pairs of square brackets. Each defined `systems.category` section must have its own header.

```toml
[[systems.category]]
name = "Kids"
systems = ["NES", "SNES", "Genesis"]

[[systems.category]]
name = "Favorites"
systems = ["SNES", "PSX"]
```

A system stays in its built-in category and is also listed under every custom category that names it. A system can appear in more than one. Custom launchers that add a [virtual system](../../features/custom-launchers.md#kind-and-backend) can use custom category names in their `categories` list.

#### name

| Key  | Type   | Default |
| ---- | ------ | ------- |
| name | string |         |

The category name as clients display it. Names must be unique, and references to a category elsewhere in the config match it case-insensitively.

#### systems

| Key     | Type     | Default |
| ------- | -------- | ------- |
| systems | string[] |         |

IDs or aliases of the [systems](../../features/systems.md) in this category. An entry with an invalid name or an unknown system is logged and skipped without stopping Core from loading the rest of the config.

## Launchers

```toml
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
```

### index_root

| Key        | Type     | Default |
| ---------- | -------- | ------- |
| index_root | string[] | []      |

`index_root` is a list of paths on the host device that should _also_ be searched when indexing media during a media database update.

For example, if `index_root` was set to `[ '/media/fat/other_place' ]`, a database update will search all standard locations like normal but then also attempt to search _/media/fat/other_place/SNES_, _/media/fat/other_place/Genesis_, etc. for potential media.

To exclude specific directories from being scanned, create an empty file named `.zaparooignore` in that directory. The directory and all subdirectories will be skipped during media database updates.

### preference

| Key        | Type     | Default |
| ---------- | -------- | ------- |
| preference | string[] | []      |

`preference` sets an ordered list of launcher IDs or launcher groups for systems that do not have an explicit launcher choice. Core uses the first matching launcher whose runtime dependencies are available, then continues through the list when an emulator or other dependency is missing.

SteamOS, Linux, Bazzite, and ChimeraOS provide the `Native` group for built-in RetroArch and standalone emulator launchers, plus the `EmuDeck` and `RetroDECK` groups:

```toml
[launchers]
preference = ["Native", "EmuDeck", "RetroDECK"]
```

MiSTer provides the `RetroAchievements` group for every built-in RetroAchievements launcher. Use it to prefer an installed achievement-enabled core while retaining normal launcher fallback:

```toml
[launchers]
preference = ["RetroAchievements"]
```

The other MiSTer alternate core families are groups too: `DB9`, `LLAPI`, `DualRAM`, `Sinden`, `PWM`, and `Unstable` for nightly builds. See [MiSTer launcher groups](../../platforms/mister/alternate-launchers.md#launcher-groups).

An explicit ZapScript `?launcher=` argument takes priority, followed by a saved per-media override and [`systems.default`](#systemsdefault). Core only consults `preference` after those choices. If no preference matches, normal platform launcher detection applies.

### allow_file

| Key        | Type                      | Default |
| ---------- | ------------------------- | ------- |
| allow_file | string[] (regex patterns) | []      |

`allow_file` allows certain files to be launched if their assigned launcher requires it.

This is used on platforms like [Windows](../../platforms/windows/index.md) to allow executable files to be launched with tokens, where this ability is useful but would be a security issue if allowed globally.

Each entry in this option is a [Regular Expression](https://github.com/google/re2/wiki/Syntax). Notes on usage here:

- Patterns are automatically anchored and must match the full file path. Use `.*pattern.*` for substring matching.
- On Windows, file path separators must be escaped: `C:\\Test\\Thing.exe`
- On Windows, patterns are automatically made case-insensitive. On other platforms, add `(?i)` at the beginning of a pattern for case-insensitive matching.

An entry that is not a valid regular expression is skipped, and the log records which pattern failed and why. The same applies to `allow_execute`, `allow_http`, and `allow_run`.

### media_dir

| Key       | Type   | Default            |
| --------- | ------ | ------------------ |
| media_dir | string | \<data dir\>/media |

`media_dir` overrides the default location on disk where remote media downloads will be stored. By default, it will use the `media` directory in the Core data folder.

### on_media_start

| Key            | Type   | Default |
| -------------- | ------ | ------- |
| on_media_start | string |         |

`on_media_start` is a [hook](../../features/hooks.md#media-launch-hooks) containing a snippet of [ZapScript](../../zapscript/index.md). It runs after Core sets active media, regardless of the scan mode. See also [`on_scan`](./readers.md#on_scan) and [`on_remove`](./readers.md#on_remove) for related scan events.

### before_media_start

| Key                | Type   | Default |
| ------------------ | ------ | ------- |
| before_media_start | string |         |

`before_media_start` is a [hook](../../features/hooks.md#media-launch-hooks) containing a snippet of [ZapScript](../../zapscript/index.md). It runs immediately before media launches.

```toml
[launchers]
before_media_start = "**execute:/path/to/script.sh"
```

This hook can block the launch by returning an error. If the ZapScript command fails or a script executed via `**execute:` returns a non-zero exit code, the media launch is blocked and an error is shown.

Scripts executed via `**execute:` receive a `ZAPAROO_ENVIRONMENT` environment variable containing the [expression environment](../../zapscript/syntax.md#expression-environment) as JSON.

The `launching` object contains information about the media that is about to launch, which is only available in this hook. See [Hooks](../../features/hooks.md) for examples.

### launchers.default

`launchers.default` overrides default settings for specific launchers. It's a sub-section that can be defined multiple times, and must have this header: `[[launchers.default]]`. See also [`systems.default`](#systemsdefault) for system-specific settings.

Pay attention to the double pairs of square brackets. Each defined `launchers.default` section must have its own header.

```toml
[[launchers.default]]
launcher = 'KodiTV'
server_url = 'http://localhost:5678'
```

#### launcher {#launchers-default-launcher}

| Key      | Type   | Default |
| -------- | ------ | ------- |
| launcher | string |         |

ID of the [launcher](../../features/launchers.md) this default override entry applies to.

#### install_dir

| Key         | Type   | Default |
| ----------- | ------ | ------- |
| install_dir | string |         |

Override the default installation directory for this launcher. Only supported by some launchers and usually refers to the parent directory of the executable which does the launching.

#### server_url

| Key        | Type   | Default |
| ---------- | ------ | ------- |
| server_url | string |         |

Override the default server URL for this launcher. Only supported by some launchers and refers to an API base address.

#### action

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

#### load_path

| Key       | Type   | Default |
| --------- | ------ | ------- |
| load_path | string |         |

Override the implementation file the launcher loads. Only supported by some launchers. For MiSTer, this is an MGL-form RBF path relative to `/media/fat`, without extension. For built-in RetroArch launchers, use a core filename from the RetroArch cores directory, such as `bsnes_libretro.so`. This is useful when multiple versions of a core are available and you want to set a specific one as the default.

```toml
[[launchers.default]]
launcher = "Nintendo64"
load_path = "_LLAPI/N64_LLAPI"
```

#### render_scale

| Key          | Type    | Default |
| ------------ | ------- | ------- |
| render_scale | integer |         |

`render_scale` sets a launcher-specific internal rendering size as a percentage. On MiSTer, the `GenericVideo` and `ScummVM` console launchers support `25`, `33`, `50`, or `100`. This changes their framebuffer size without changing the physical display output mode.

```toml
[[launchers.default]]
launcher = "GenericVideo"
render_scale = 33
```

#### render_resolution

| Key               | Type   | Default |
| ----------------- | ------ | ------- |
| render_resolution | string |         |

`render_resolution` sets a launcher-specific internal rendering size in positive `WIDTHxHEIGHT` form. It cannot be combined with `render_scale` in the same launcher default.

```toml
[[launchers.default]]
launcher = "ScummVM"
render_resolution = "640x480"
```


## Groovy

```toml
[groovy]
gmc_proxy_enabled = true
gmc_proxy_port = 32106
gmc_proxy_beacon_interval = '2s'
```

### gmc_proxy_enabled

| Key               | Type    | Default |
| ----------------- | ------- | ------- |
| gmc_proxy_enabled | boolean | false   |

`gmc_proxy_enabled` enables or disables the GMC proxy service for Groovy MiSTer Control integration.

### gmc_proxy_port

| Key            | Type              | Default |
| -------------- | ----------------- | ------- |
| gmc_proxy_port | integer (1-65535) | 32106   |

`gmc_proxy_port` specifies which port the GMC proxy service should listen on.

### gmc_proxy_beacon_interval

| Key                       | Type   | Default |
| ------------------------- | ------ | ------- |
| gmc_proxy_beacon_interval | string | 2s      |

`gmc_proxy_beacon_interval` sets the interval for GMC proxy beacon broadcasts.
