---
sidebar_position: 1
---

# Launch

These commands launch games, systems, and other media.

## launch

Launches media from a path or identifier.

### Syntax

```zapscript
**launch:<path>
```

### Arguments

**`path`** (required)
The media to launch. Accepts multiple formats - see [Path Formats](#path-formats) below.

### Advanced Arguments

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `launcher` | string | - | Override the default launcher |
| `system` | string | - | Apply system defaults to a local file path |
| `action` | string | `run` | `run` to launch, `details` to show info (Steam only) |
| `name` | string | - | Custom display name for remote downloads |
| `pre_notice` | string | - | Message to show before downloading |
| `when` | expression | - | Conditional execution |

### Examples

```zapscript
Genesis/Sonic the Hedgehog (USA).md
```

Launches a game using system lookup (Auto Launch mode - no `**launch:` prefix needed).

```zapscript
**launch:/media/fat/games/Genesis/Sonic.md
```

Launches from an absolute path.

```zapscript
**launch:Genesis/Sonic.md?launcher=LLAPIMegaDrive
```

Launches with a specific launcher override.

```zapscript
**launch:steam://1145360?action=details
```

Opens a Steam game's details page instead of launching.

### Path Formats

The `launch` command supports several path formats, tried in this order:

1. **Remote URLs** (http://, https://, smb://) - if `system` argument provided
2. **Absolute paths** (starting with `/`)
3. **URI schemes** (steam://, etc.)
4. **Relative paths** - searched in game folders
5. **Title ID** - `System/Title` without file extension
6. **System lookup** - `System/path/to/file.ext`
7. **Glob patterns** - if path contains `*`

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
@N64/Zelda (~region:us)(~region:eu)
```

Tag operators:
- `(tag:value)` or `(+tag:value)` - must have this tag (AND)
- `(-tag:value)` - must not have this tag (NOT)
- `(~tag:value)` - at least one of these must match (OR)

See the [Tags documentation](../core/tags.md) for available filters.

#### System Lookup

Uses the system ID as a virtual folder:

```zapscript
N64/1 US - A-M/Game.z64
TurboGrafx16/Game.pce
PCEngine/Game.pce
```

Works across devices with different folder structures. System aliases are supported.

#### Absolute Path

Direct path starting with `/`:

```zapscript
/media/fat/games/Genesis/Game.md
```

Only works on the specific device.

#### Relative Path

Path relative to game folders:

```zapscript
Genesis/1 US - Q-Z/Game.md
_Arcade/Game.mra
```

Works across different storage locations (USB, SD card, network).

#### Glob Patterns

Paths containing `*` wildcards are automatically handled as search patterns:

```zapscript
Genesis/*sonic*
SNES/*mario world*
```

This delegates to [`launch.search`](#launchsearch) internally, launching the first match.

#### Zip File Paths

On MiSTer, paths can reference files inside zip archives:

```zapscript
_Arcade/@Arcade - Konami.zip/Pong.mra
Genesis/@Genesis - 2022-05-18.zip/Sonic.md
```

The platform launcher handles extracting and launching from the archive.

#### URI Schemes

URIs are passed directly to the platform launcher:

```zapscript
steam://1145360
```

Steam URLs launch or show details for the specified app ID. Use `action=details` to open the Steam library page instead of launching.

### Remote Install

Download and install media from SMB or HTTP URLs:

```zapscript
smb://10.0.0.123/Games/path/to/file.bin?system=Genesis
http://10.0.0.123/path/to/file.bin?system=Genesis
```

The `system` argument is required for remote URLs. Files are cached locally after first download. Authentication can be configured in [auth.toml](../core/config.md#auth-file).

---

## launch.title

Launches media by title ID with explicit syntax.

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

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `launcher` | string | - | Override the default launcher |
| `tags` | string | - | Tag filters (alternative to inline format) |
| `action` | string | `run` | `run` to launch, `details` to show info |
| `when` | expression | - | Conditional execution |

### Examples

```zapscript
**launch.title:Genesis/Sonic the Hedgehog
```

Launches Sonic using title matching.

```zapscript
**launch.title:SNES/Super Mario World (region:us)
```

Launches the US version of Super Mario World.

```zapscript
**launch.title:Genesis/Sonic?tags=region:us,lang:en
```

Uses the `tags` argument instead of inline format.

:::tip
The `@` prefix (e.g., `@Genesis/Sonic`) is shorthand for `**launch.title:Genesis/Sonic`. Both forms are equivalent.
:::

---

## launch.system

Launches a system/emulator without loading specific media.

### Syntax

```zapscript
**launch.system:<system>
```

### Arguments

**`system`** (required)
The [system ID](../systems.md) to launch. Use `menu` to return to the main menu.

### Examples

```zapscript
**launch.system:Atari2600
```

Launches the Atari 2600 system.

```zapscript
**launch.system:WonderSwanColor
```

Launches WonderSwan Color (useful for meta-systems without their own core).

```zapscript
**launch.system:menu
```

Returns to the main menu.

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

| Format | Description |
|--------|-------------|
| `<system>` | Random game from one system |
| `<system1>,<system2>,...` | Random from multiple systems |
| `all` | Random from any system |
| `/path/to/folder` | Random file from a folder |
| `<system>/*pattern*` | Random matching a glob pattern |

### Advanced Arguments

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `launcher` | string | - | Override the default launcher |
| `tags` | string | - | Tag filters to narrow results |
| `action` | string | `run` | `run` to launch, `details` to show info |
| `when` | expression | - | Conditional execution |

### Examples

```zapscript
**launch.random:snes
```

Launches a random SNES game.

```zapscript
**launch.random:snes,nes,genesis
```

Launches a random game from SNES, NES, or Genesis.

```zapscript
**launch.random:all
```

Launches a random game from any system.

```zapscript
**launch.random:/media/fat/_#Favorites
```

Launches a random file from a folder (useful for MGL collections).

```zapscript
**launch.random:Genesis/*sonic*
```

Launches a random game with "sonic" in the filename.

```zapscript
**launch.random:all/*mario*
```

Launches a random Mario game from any system.

---

## launch.search

Searches for a game by filename pattern and launches the first result.

### Syntax

```zapscript
**launch.search:<pattern>
**launch.search:<system>/<pattern>
```

### Arguments

**`pattern`** (required)
A glob pattern to match filenames. Use `*` as a wildcard.

**`system`** (optional)
The system ID to search within. If omitted, searches all systems.

### Advanced Arguments

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `launcher` | string | - | Override the default launcher |
| `tags` | string | - | Tag filters to narrow results |
| `action` | string | `run` | `run` to launch, `details` to show info |
| `when` | expression | - | Conditional execution |

### Examples

```zapscript
**launch.search:*mario*
```

Finds and launches the first game with "mario" in the filename from any system.

```zapscript
**launch.search:SNES/*mario*
```

Finds and launches the first SNES game with "mario" in the filename.

```zapscript
**launch.search:SNES/super mario*(*usa*
```

Finds a more specific match (US version of Super Mario games).

:::info
Search queries are case insensitive.
:::
