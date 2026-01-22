---
sidebar_position: 4
---

# Playlist

Zaparoo supports keeping a playlist of media in memory and tracking the current position. You can load playlists from files, folders, or define them inline.

## Playlist Formats

### Folder

Load all files from a folder as a playlist:

```zapscript
**playlist.play:/media/fat/games/Genesis
```

Only immediate contents are loaded (no subfolders). Zip file contents are not supported with this method.

### .pls File

A `.pls` file lists media files, one per line:

```
[playlist]
File1=/media/fat/games/Genesis/Some Game (USA).md
Title1=Some Game
File2=/media/fat/games/Genesis/Another Game (USA).md
Title2=Another Game
```

The `Title` line is optional. Items are sorted by the ID numbers (`File1`, `File2`, etc.), not by order in the file.

File paths are ZapScript commands, they can either be literal paths or use any supported command(s).

```
[playlist]
File1=Some Game (USA).md
Title1=A different name
File2=Another Game (USA).md?launcher=LLAPIMegaDrive
```

### Inline JSON

Define a playlist directly in the command using JSON:

```zapscript
**playlist.play:{"id":"my-list","name":"My Playlist","items":[{"name":"Game 1","zapscript":"Genesis/Game.md"},{"name":"Game 2","zapscript":"SNES/Game.sfc"}]}
```

Fields:

- `id` - Unique identifier (used to detect if the same playlist is reloaded)
- `name` - Display name for the playlist (optional)
- `items` - Array of playlist items:
  - `name` - Display name for the item (optional, auto-generated if missing)
  - `zapscript` - The ZapScript to run (can be any command, not just paths)

---

## playlist.play

Loads a playlist and immediately launches the first item.

### Syntax

```zapscript
**playlist.play:[<source>]
```

### Arguments

**`source`** (optional)
Path to a folder, `.pls` file, or inline JSON playlist. If omitted, resumes the current paused playlist.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `mode`   | string     | -       | Set to `shuffle` for random order                                  |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**playlist.play:/media/fat/_@Favorites
```

Loads the Favorites folder as a playlist and launches the first item.

```zapscript
**playlist.play:/media/fat/playlist.pls?mode=shuffle
```

Loads a playlist file in shuffled order.

```zapscript
**playlist.play
```

Resumes a paused playlist.

---

## playlist.load

Loads a playlist into memory without launching anything.

### Syntax

```zapscript
**playlist.load:<source>
```

### Arguments

**`source`** (required)
Path to a folder, `.pls` file, or inline JSON playlist.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `mode`   | string     | -       | Set to `shuffle` for random order                                  |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**playlist.load:/media/fat/playlist.pls
```

Loads a playlist file.

```zapscript
**playlist.load:/media/fat/games/Genesis?mode=shuffle
```

Loads a folder in shuffled order.

---

## playlist.open

Loads a playlist and opens an interactive picker menu to select an item.

### Syntax

```zapscript
**playlist.open:[<source>]
```

### Arguments

**`source`** (optional)
Path to a folder, `.pls` file, or inline JSON playlist. If omitted, reopens the picker for the current playlist.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `mode`   | string     | -       | Set to `shuffle` for random order                                  |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**playlist.open:/media/fat/playlist.pls
```

Opens a picker menu for the playlist.

```zapscript
**playlist.open
```

Reopens the picker for the currently active playlist, showing the current position.

---

## playlist.stop

Stops the current media and clears the playlist from memory.

### Syntax

```zapscript
**playlist.stop
```

### Arguments

None.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**playlist.stop
```

Stops playback and clears the playlist.

---

## playlist.pause

Pauses the current playlist without clearing it.

### Syntax

```zapscript
**playlist.pause
```

### Arguments

None.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**playlist.pause
```

Pauses the playlist. Use `playlist.play` without arguments to resume.

---

## playlist.next

Launches the next item in the playlist.

### Syntax

```zapscript
**playlist.next
```

### Arguments

None.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**playlist.next
```

Advances to the next item.

---

## playlist.previous

Launches the previous item in the playlist.

### Syntax

```zapscript
**playlist.previous
```

### Arguments

None.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**playlist.previous
```

Goes back to the previous item.

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

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**playlist.goto:1
```

Jumps to the first item.

```zapscript
**playlist.goto:5
```

Jumps to the fifth item.
