---
sidebar_position: 1
description: "ZapScript launch commands: launch games and media by file path, system identifier, or title ID using Zaparoo tokens."
keywords: [zapscript launch, zaparoo launch command, launch game zapscript, title id zaparoo]
---

# Launch

These commands launch games, systems, and other media.

## launch

Launches media from a path or identifier.

The `launch` command is implied when no command prefix is used (Auto Launch mode). For example, simply writing `Genesis/Sonic the Hedgehog.md` will launch that game.

### Syntax

```zapscript
**launch:<path>
```

### Arguments

**`path`** (required)
The media to launch. Accepts multiple formats - see [Path Formats](#path-formats) below.

### Advanced Arguments

| Argument     | Type       | Default | Description                                          |
| ------------ | ---------- | ------- | ---------------------------------------------------- |
| `launcher`   | string     | -       | Override the default launcher                        |
| `system`     | string     | -       | Apply system defaults to a local file path           |
| `action`     | string     | `run`   | `run` to launch, `details` to show info (launcher support varies) |
| `name`       | string     | -       | Custom display name for remote downloads             |
| `pre_notice` | string     | -       | Message to show before launching                     |
| `when`       | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Launch a game using system lookup (Auto Launch mode - no `**launch:` prefix needed):

```zapscript
Genesis/Sonic the Hedgehog (USA).md
```

Launch from an absolute path:

```zapscript
**launch:/media/fat/games/Genesis/Sonic.md
```

Launch with a specific launcher override:

```zapscript
**launch:Genesis/Sonic.md?launcher=LLAPIMegaDrive
```

Open a Steam game's details page instead of launching:

```zapscript
**launch:steam://1145360?action=details
```

### Path Formats

The `launch` command supports several path formats, tried in this order:

1. **Remote URLs** (http://, https://, smb://) - if `system` argument provided
2. **Absolute paths** (starting with `/`)
3. **URI schemes** (steam://, etc.)
4. **Relative paths** - searched in game folders
5. **Title ID** - `System/Title` without file extension
6. **System lookup** - `System/path/to/file.ext`
7. **Search queries** - if path contains `*`

#### Title ID

The portable format for tokens that work across devices. Paths in `System/Title` format (no file extension) are detected as title lookups and use fuzzy matching:

```zapscript
Genesis/Sonic the Hedgehog
SNES/Super Mario World
N64/Legend of Zelda Ocarina of Time
```

The `@` prefix can also be used, which explicitly invokes [`launch.title`](#launchtitle):

```zapscript
@Genesis/Sonic the Hedgehog
```

Both forms use fuzzy matching to find games regardless of filename differences between devices.

**With tags** to filter specific versions:

```zapscript
@SNES/Super Mario World (region:us)
@Genesis/Sonic (-unfinished:demo)
@N64/Zelda (~region:us) (~region:eu)
```

Tag operators:

- `(tag:value)` or `(+tag:value)` - must have this tag (AND)
- `(-tag:value)` - must not have this tag (NOT)
- `(~tag:value)` - at least one of these must match (OR)

See the [Tags documentation](../features/tags.md) for available filters.

#### System Lookup

Uses the system ID as a virtual folder:

```zapscript
N64/1 US - A-M/Game.z64
TurboGrafx16/Game.pce
PCEngine/Game.pce
```

Works across different devices with the same internal folder structure. System aliases are supported.

#### Absolute Path

Direct path starting with `/`:

```zapscript
/media/fat/games/Genesis/Game.md
```

#### Relative Path

Path relative to game folders:

```zapscript
Genesis/1 US - Q-Z/Game.md
_Arcade/Game.mra
```

Similar to system lookup but uses the exact system games folder name.

#### Search queries

Paths containing `*` are automatically handled as media database search queries:

```zapscript
Genesis/*sonic*
SNES/*mario world*
```

This delegates to [`launch.search`](#launchsearch) internally, launching the first indexed match.

#### Zip File Paths

On MiSTer, paths can reference files inside zip archives:

```zapscript
_Arcade/@Arcade - Konami.zip/Pong.mra
Genesis/@Genesis - 2022-05-18.zip/Sonic.md
```

#### URI Schemes

URIs are passed directly to the appropriate platform launcher:

```zapscript
steam://1145360
```

### Remote Install

Download and install media from SMB or HTTP URLs:

```zapscript
smb://10.0.0.123/Games/path/to/file.bin?system=Genesis
http://10.0.0.123/path/to/file.bin?system=Genesis
```

The `system` argument is required for remote URLs. Files are cached locally after first download. Authentication can be configured in [auth.toml](../core/config.md#auth-file).

---

## launch.title

Launches media by title ID.

### Syntax

```zapscript
**launch.title:<system>/<title>
```

### Arguments

**`system`** (required)
The system ID (e.g., `Genesis`, `SNES`, `N64`).

**`title`** (required)
The game title to search for. Supports fuzzy matching.

**Inline tags** can be added after the title:

```zapscript
**launch.title:SNES/Super Mario World (region:us)
**launch.title:Genesis/Sonic (-unfinished:demo)
```

### Advanced Arguments

| Argument   | Type       | Default | Description                                |
| ---------- | ---------- | ------- | ------------------------------------------ |
| `launcher` | string     | -       | Override the default launcher              |
| `tags`     | string     | -       | Tag filters (alternative to inline format) |
| `action`   | string     | `run`   | `run` to launch, `details` to show info    |
| `when`     | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Launch Sonic using title matching:

```zapscript
**launch.title:Genesis/Sonic the Hedgehog
```

Launch the US version of Super Mario World:

```zapscript
**launch.title:SNES/Super Mario World (region:us)
```

Use the `tags` argument instead of inline format:

```zapscript
**launch.title:Genesis/Sonic?tags=region:us,lang:en
```

:::tip
The `@` prefix (e.g., `@Genesis/Sonic`) is shorthand for `**launch.title:Genesis/Sonic`. Both forms are equivalent.
:::

---

## launch.system

Launches a system/emulator without loading specific media.

:::note Platform Support
Launching a system by ID is supported on [MiSTer](../platforms/mister/index.md) and [MiSTeX](../platforms/mistex.md). The `menu` argument returns to the platform's menu or frontend where supported, including [Batocera](../platforms/batocera/index.md).
:::

### Syntax

```zapscript
**launch.system:<system>
```

### Arguments

**`system`** (required)
The [system ID](../features/systems.md) to launch. Use `menu` to return to the main menu.

### Advanced Arguments

| Argument | Type       | Default | Description           |
| -------- | ---------- | ------- | --------------------- |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Launch the Atari 2600 system:

```zapscript
**launch.system:Atari2600
```

Launch WonderSwan Color, useful for meta-systems without their own core:

```zapscript
**launch.system:WonderSwanColor
```

Return to the main menu:

```zapscript
**launch.system:menu
```

---

## launch.random

Launches a random game from specified systems or search criteria.

### Syntax

```zapscript
**launch.random:<query>
```

### Arguments

**`query`** (required)
One of the following formats:

| Format                    | Description                    |
| ------------------------- | ------------------------------ |
| `<system>`                | Random game from one system    |
| `<system1>,<system2>,...` | Random from multiple systems   |
| `all`                     | Random from any system         |
| `/path/to/folder`         | Random file from a folder      |
| `<system>/*pattern*`      | Random indexed media matching a search query |

### Advanced Arguments

| Argument   | Type       | Default | Description                             |
| ---------- | ---------- | ------- | --------------------------------------- |
| `launcher` | string     | -       | Override the default launcher           |
| `tags`     | string     | -       | Tag filters to narrow results           |
| `action`   | string     | `run`   | `run` to launch, `details` to show info |
| `when`     | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Launch a random SNES game:

```zapscript
**launch.random:snes
```

Launch a random game from SNES, NES, or Genesis:

```zapscript
**launch.random:snes,nes,genesis
```

Launch a random game from any system:

```zapscript
**launch.random:all
```

Launch a random file from a folder, useful for MGL collections:

```zapscript
**launch.random:/media/fat/_#Favorites
```

Launch a random Genesis game matching "sonic" in the media database:

```zapscript
**launch.random:Genesis/*sonic*
```

Launch a random Mario game from any system:

```zapscript
**launch.random:all/*mario*
```

:::info System Weighting
When multiple systems are specified, a system is picked at random first (with equal weight per system), then a random game is selected from that system. This prevents systems with larger libraries from dominating random picks.
:::

---

## launch.search

Searches indexed media and launches the first result.

### Syntax

```zapscript
**launch.search:<query>
**launch.search:<system>/<query>
```

### Arguments

**`query`** (required)
A media database search query. `*` can be used for broad partial matches.

**`system`** (optional)
The system ID to search within. If omitted, searches all systems.

### Advanced Arguments

| Argument   | Type       | Default | Description                             |
| ---------- | ---------- | ------- | --------------------------------------- |
| `launcher` | string     | -       | Override the default launcher           |
| `tags`     | string     | -       | Tag filters to narrow results           |
| `action`   | string     | `run`   | `run` to launch, `details` to show info |
| `when`     | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Find and launch the first indexed game matching "mario" from any system:

```zapscript
**launch.search:*mario*
```

Find and launch the first indexed SNES game matching "mario":

```zapscript
**launch.search:SNES/*mario*
```

Find a more specific match, such as a US version of a Super Mario game:

```zapscript
**launch.search:SNES/super mario*(*usa*
```

:::info
Search queries are case insensitive and use the indexed media database, not direct filesystem globbing.
:::

---

## launch.last

Launches a recently played game from playtime history.

### Syntax

```zapscript
**launch.last
**launch.last:<offset>
```

### Arguments

**`offset`** (optional)
Which recent game to launch, where `1` is the most recently played.
Defaults to `1`. Duplicate plays of the same game are collapsed, so
`2` is the previous *different* game, `3` the one before that, and so on.

### Advanced Arguments

| Argument   | Type       | Default | Description                                |
| ---------- | ---------- | ------- | ------------------------------------------ |
| `launcher` | string     | -       | Override the default launcher              |
| `action`   | string     | `run`   | `run` to launch, `details` to show info    |
| `when`     | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Relaunch the most recently played game:

```zapscript
**launch.last
```

Launch the previously played game, skipping the most recent one:

```zapscript
**launch.last:2
```

Cycle back to the third most recently played unique game:

```zapscript
**launch.last:3
```

:::info
Requires [playtime tracking](../features/playtime.md) to have recorded history. If not enough unique games are in history to satisfy the offset, the command logs a warning and does nothing.
:::
