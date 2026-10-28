---
sidebar_position: 4
description: "ZapScript playlist commands: sequence multiple launches or actions in a single Zaparoo token scan."
keywords: [zapscript playlist, zaparoo playlist, multi-action token zaparoo, sequence zapscript]
---

# Playlist

Zaparoo supports keeping a [playlist](../features/playlists.md) of media in memory and tracking the current position. You can load playlists from files, folders, or define them inline.

## Playlist sources

The `playlist.play`, `playlist.load`, and `playlist.open` commands take a source: a folder path, a `.pls` file path, an inline JSON playlist, a `deck://<id>` deck, or a [Kodi collection](../features/playlists.md#kodi-collection). The [playlists feature page](../features/playlists.md#playlist-source-formats) documents each format, including how `.pls` entries are treated as ZapScript and which fields inline JSON uses.

```zapscript
**playlist.play:/media/fat/games/Genesis
```

## Media slots

Playlists can play in the `primary` slot, the default that is shared with games, or the `background` slot, which plays alongside whatever is in the primary slot. Add `?slot=background` (or `?slot=bg`) to load a playlist into the background slot, typically for [background music](../features/audio.md).

```zapscript
**playlist.play:/media/fat/music/album?slot=background
```

All playlist commands accept the `slot` argument, so `playlist.next`, `playlist.pause`, and the rest can target a specific slot. When omitted, commands act on the active playlist's slot, or the primary slot when no playlist is running. Slots are explained on the [audio playback](../features/audio.md#media-slots) page.

## Repeat modes

The `playlist.play`, `playlist.load`, and `playlist.open` commands accept a `repeat` argument that sets how the playlist loops:

| Value | Behavior |
| ----- | -------- |
| `off` | Stop at the end of the playlist (default) |
| `all` | Loop back to the first item after the last |
| `one` | Repeat the current item |

```zapscript
**playlist.play:/media/fat/music/album?repeat=all
```

## Choosing the starting item

A playlist opens on the item where the active profile left it, or on the first item if it has not been played or played to its end. Add `start` to open it on a specific item instead, counted from 1. This works on the playlist that is already open too.

```zapscript
**playlist.play:/media/fat/games/Genesis?start=1
```

## Automatic switching

`advance` and `idle` switch to the next item while a game is still running, and `countdown` sets how long the countdown after a game exits runs. They take durations with a unit, such as `30s`, `10m`, or `1h`. See [moving to the next item on its own](../features/playlists.md#moving-to-the-next-item-on-its-own) for how each one behaves.

```zapscript
**playlist.play:/media/fat/games/Arcade?mode=shuffle&advance=10m&repeat=all
```

---

## playlist.play

Loads a playlist and immediately launches the item it [starts on](#choosing-the-starting-item). If the source names the playlist that is already active, it moves to the next item instead, wrapping after the last, or resumes a paused playlist at its position. With `start`, it plays that item instead.

### Syntax

```zapscript
**playlist.play:[<source>]
```

### Arguments

**`source`** (optional)
Path to a folder, `.pls` file, inline JSON playlist, `deck://<id>`, or Kodi collection. If omitted, resumes the current paused playlist.

### Advanced arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `mode`   | string     | -       | Set to `shuffle` for random order                                  |
| `repeat` | string     | `off`   | `off`, `all`, or `one` (see [Repeat modes](#repeat-modes))         |
| `slot`   | string     | `primary` | `primary` or `background` media [slot](#media-slots)             |
| `start`  | number     | -       | Item to open on, counted from 1 (see [Choosing the starting item](#choosing-the-starting-item)) |
| `advance` | duration  | -       | Switch to the next item after this much playing time              |
| `idle`   | duration   | -       | Switch to the next item after this long with no input             |
| `countdown` | duration | `10s`  | Countdown after a game exits. `0` skips it                        |

### Examples

Load the Favorites folder as a playlist and launch the first item:

```zapscript
**playlist.play:/media/fat/_@Favorites
```

Load a playlist file in shuffled order:

```zapscript
**playlist.play:/media/fat/playlist.pls?mode=shuffle
```

Resume a paused playlist:

```zapscript
**playlist.play
```

---

## playlist.load

Loads a playlist into memory without launching anything. With `idle`, the playlist waits and starts on its own once the device has been idle for that long. `playlist.open` does the same.

### Syntax

```zapscript
**playlist.load:<source>
```

### Arguments

**`source`** (required)
Path to a folder, `.pls` file, inline JSON playlist, `deck://<id>`, or Kodi collection.

### Advanced arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `mode`   | string     | -       | Set to `shuffle` for random order                                  |
| `repeat` | string     | `off`   | `off`, `all`, or `one` (see [Repeat modes](#repeat-modes))         |
| `slot`   | string     | `primary` | `primary` or `background` media [slot](#media-slots)             |
| `start`  | number     | -       | Item to open on, counted from 1 (see [Choosing the starting item](#choosing-the-starting-item)) |
| `advance` | duration  | -       | Switch to the next item after this much playing time              |
| `idle`   | duration   | -       | Switch to the next item after this long with no input             |
| `countdown` | duration | `10s`  | Countdown after a game exits. `0` skips it                        |

### Examples

Load a playlist file:

```zapscript
**playlist.load:/media/fat/playlist.pls
```

Load a folder in shuffled order:

```zapscript
**playlist.load:/media/fat/games/Genesis?mode=shuffle
```

---

## playlist.open

Loads a playlist and opens an interactive picker menu to select an item.

:::note Picker display
[MiSTer](../platforms/mister/index.md) displays the picker locally. On other platforms, a connected client that supports Core's global UI events can display and answer it. If no renderer is available, the playlist still loads and the picker expires after 30 seconds.
:::

### Syntax

```zapscript
**playlist.open:[<source>]
```

### Arguments

**`source`** (optional)
Path to a folder, `.pls` file, inline JSON playlist, `deck://<id>`, or Kodi collection. If omitted, reopens the picker for the current playlist.

### Advanced arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `mode`   | string     | -       | Set to `shuffle` for random order                                  |
| `repeat` | string     | `off`   | `off`, `all`, or `one` (see [Repeat modes](#repeat-modes))         |
| `slot`   | string     | `primary` | `primary` or `background` media [slot](#media-slots)             |
| `start`  | number     | -       | Item to open on, counted from 1 (see [Choosing the starting item](#choosing-the-starting-item)) |
| `advance` | duration  | -       | Switch to the next item after this much playing time              |
| `idle`   | duration   | -       | Switch to the next item after this long with no input             |
| `countdown` | duration | `10s`  | Countdown after a game exits. `0` skips it                        |

### Examples

Open a picker menu for the playlist:

```zapscript
**playlist.open:/media/fat/playlist.pls
```

Reopen the picker for the currently active playlist, showing the current position:

```zapscript
**playlist.open
```

---

## playlist.stop

Stops the current media and clears the playlist from memory.

### Syntax

```zapscript
**playlist.stop
```

### Arguments

None.

### Advanced arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `slot`   | string     | `primary` | `primary` or `background` media [slot](#media-slots)             |

### Examples

Stop playback and clear the playlist:

```zapscript
**playlist.stop
```

---

## playlist.pause

Pauses the current playlist without clearing it.

### Syntax

```zapscript
**playlist.pause
```

### Arguments

None.

### Advanced arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `slot`   | string     | `primary` | `primary` or `background` media [slot](#media-slots)             |

### Examples

Pause the playlist. Use `playlist.play` without arguments to resume:

```zapscript
**playlist.pause
```

---

## playlist.next

Launches the next item in the playlist.

### Syntax

```zapscript
**playlist.next
```

### Arguments

None.

### Advanced arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `slot`   | string     | `primary` | `primary` or `background` media [slot](#media-slots)             |

### Examples

Advance to the next item:

```zapscript
**playlist.next
```

---

## playlist.previous

Launches the previous item in the playlist.

### Syntax

```zapscript
**playlist.previous
```

### Arguments

None.

### Advanced arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `slot`   | string     | `primary` | `primary` or `background` media [slot](#media-slots)             |

### Examples

Go back to the previous item:

```zapscript
**playlist.previous
```

---

## playlist.goto

Jumps to a specific position in the playlist.

### Syntax

```zapscript
**playlist.goto:<index>
```

### Arguments

**`index`** (required)
The 1-based index of the item to launch.

### Advanced arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `slot`   | string     | `primary` | `primary` or `background` media [slot](#media-slots)             |

### Examples

Jump to the first item:

```zapscript
**playlist.goto:1
```

Jump to the fifth item:

```zapscript
**playlist.goto:5
```
