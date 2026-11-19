---
sidebar_position: 1
toc_max_heading_level: 5
description: "Zaparoo Core config.toml reference for the [audio], [input], [media], and [scraper] sections: volume, background music, input modes, media directories, and scraper defaults."
keywords: [zaparoo audio config, zaparoo input config, zaparoo media config, zaparoo scraper config, config.toml]
---

# Audio, Input, Media, and Scraper Config

Part of the [config file reference](./index.md). Keys are shown with their type and default, followed by what they do and an example.

## Audio

```toml
[audio]
scan_feedback = true
volume = 100
music_volume = 60
music_autoplay = true
normalize = true
midi_soundfont = "GeneralUser.sf2"
success_sound = "custom_success.wav"
fail_sound = "custom_fail.wav"
limit_sound = "custom_limit.wav"
pending_sound = "custom_pending.ogg"
ready_sound = "custom_ready.ogg"
```

### scan_feedback

| Key           | Type    | Default |
| ------------- | ------- | ------- |
| scan_feedback | boolean | true    |

`scan_feedback` enables or disables playing a sound from the host device when a scan is successful or results in an error.

### volume

| Key    | Type              | Default |
| ------ | ----------------- | ------- |
| volume | integer (0–200)   | 100     |

`volume` sets the playback volume for audio feedback sounds, and for [native audio playback](../../features/audio.md) when `music_volume` is not set. At the default `100`, sounds play at their original recorded level. Lower values quiet them down; higher values amplify, up to double at `200`.

```toml
[audio]
volume = 150  # 50% louder than the original sound
```

### music_volume

| Key          | Type            | Default         |
| ------------ | --------------- | --------------- |
| music_volume | integer (0–200) | (follows `volume`) |

`music_volume` sets the volume of [native audio playback](../../features/audio.md), such as music and background playlists, separately from scan feedback sounds. It uses the same scale as `volume`, and `0` mutes it. When it is not set, native audio plays at `volume`.

```toml
[audio]
volume = 100
music_volume = 60  # music quieter than scan sounds
```

### music_autoplay

| Key            | Type    | Default |
| -------------- | ------- | ------- |
| music_autoplay | boolean | true    |

`music_autoplay` starts the [background music](../../features/audio.md#background-music) playlist that was open when Core last stopped, the first time Core starts after the device boots. A playlist you stopped yourself stays stopped. Set it to `false` to have the playlist come back paused instead.

```toml
[audio]
music_autoplay = false
```

### normalize

| Key       | Type    | Default |
| --------- | ------- | ------- |
| normalize | boolean | true    |

`normalize` levels [native audio playback](../../features/audio.md), including [internet radio](../../features/audio.md#internet-radio), to a common loudness so tracks and stations play at a similar volume. It uses a file's ReplayGain tags when it has them. Set it to `false` to play everything at its original level.

```toml
[audio]
normalize = false
```

### midi_soundfont

| Key            | Type   | Default            |
| -------------- | ------ | ------------------ |
| midi_soundfont | string | (built-in FM synth) |

`midi_soundfont` sets a SoundFont (`.sf2`) file for [MIDI playback](../../features/audio.md#supported-files). A relative path resolves to `<data_dir>/assets/`. When it is not set, or the SoundFont fails to load, MIDI files play through a built-in FM synthesizer.

```toml
[audio]
midi_soundfont = "GeneralUser.sf2"
```

### success_sound

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

### fail_sound

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

### limit_sound

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

### pending_sound

| Key           | Type   | Default            |
| ------------- | ------ | ------------------ |
| pending_sound | string | (embedded default) |

`pending_sound` specifies a custom audio file to play when a token is staged by [launch guard](../../features/play-controls.md#launch-guard). Supports WAV, MP3, OGG, and FLAC formats.

```toml
[audio]
pending_sound = "custom_pending.ogg"
```

Configuration works the same as [`success_sound`](#success_sound):

- **Omit or comment out**: Use embedded default pending sound
- **Empty string `""`**: Disable pending sound completely
- **Relative path**: Resolved to `<data_dir>/assets/`
- **Absolute path**: Used as-is

### ready_sound

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

## Input

```toml
[input]
gamepad_enabled = true
```

The `input` section configures input device emulation features.

### gamepad_enabled

| Key             | Type    | Default              |
| --------------- | ------- | -------------------- |
| gamepad_enabled | boolean | _varies by platform_ |

`gamepad_enabled` enables or disables the virtual gamepad device used by the [`**input.gamepad`](../../zapscript/input.md#inputgamepad) ZapScript command.

```toml
[input]
gamepad_enabled = true
```

Platform defaults:
- **MiSTer**: Enabled by default
- **Batocera**: Disabled by default (may conflict with some emulators)
- **Windows**: Disabled by default, and needs the ViGEmBus driver offered by the [installer](../../platforms/windows/index.md#input)
- **Other platforms**: Enabled by default

When disabled, the `**input.gamepad` command will return an error.

## Media

```toml
[media]
filename_tags = true
default_regions = ["us", "world"]
default_langs = ["en"]
```

The `media` section configures how Core processes and matches media files, including tag parsing and region/language preferences.

### filename_tags

| Key           | Type    | Default |
| ------------- | ------- | ------- |
| filename_tags | boolean | true    |

`filename_tags` enables or disables automatic parsing of tags from media filenames (e.g., region codes, languages, revision numbers).

```toml
[media]
filename_tags = true
```

When enabled, Core extracts metadata tags from filenames like `(USA)`, `(En)`, `(Rev 1)` to help with conflict resolution and media matching.

See the [Tags documentation](../../features/tags.md) for detailed information about tag parsing and usage.

### default_regions

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

### default_langs

| Key           | Type     | Default  |
| ------------- | -------- | -------- |
| default_langs | string[] | `["en"]` |

`default_langs` specifies which language tags to prefer when multiple language versions exist.

```toml
[media]
default_langs = ["en", "es"]
```

Languages are checked in order. Common language codes: `en`, `es`, `fr`, `de`, `it`, `ja`, `pt`

### image_dir

| Key       | Type   | Default  |
| --------- | ------ | -------- |
| image_dir | string | `images` in Core's data folder |

`image_dir` is the folder for images downloaded by the `libretro-thumbnails` [scraper](../../features/scraping.md#libretro-thumbnails) and for Core's generated thumbnail cache. Use an absolute path, since a relative one resolves against the folder holding the Core executable.

```toml
[media]
image_dir = "/media/usb0/zaparoo-images"
```

Core doesn't copy anything when this changes, so move the folder's contents yourself to keep existing images. Covers keep working after the move.

### thumb_cache_max_mb

| Key                | Type | Default |
| ------------------ | ---- | ------- |
| thumb_cache_max_mb | int  | `1024`  |

`thumb_cache_max_mb` caps the generated thumbnail cache in MiB, up to `1048576`. Downloaded images don't count toward it.

```toml
[media]
thumb_cache_max_mb = 2048
```

## Scraper

```toml
[scraper.gamelist_xml]
custom_path = "/path/to/gamelists"
```

The `scraper` section configures metadata sources used by Core's [local scrapers](../../features/scraping.md).

### custom_path {#scraper-gamelist-xml-custom-path}

| Key         | Type   | Default |
| ----------- | ------ | ------- |
| custom_path | string | none    |

`custom_path` specifies a directory containing separate per-system `gamelist.xml` bundles. Core checks `<custom_path>/<system ID>/gamelist.xml` for each indexed system. Metadata and artwork stay outside the ROM directories.

Use the exact [system ID](../../features/systems.md) for each subdirectory. Game paths in a custom gamelist resolve against the system's first ROM root, while artwork and other asset paths resolve against that system's custom bundle directory.

See [custom gamelist bundles](../../features/scraping.md#custom-gamelist-bundles) for the directory layout, source precedence, and artwork fallback behavior.
