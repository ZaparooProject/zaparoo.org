---
sidebar_position: 6
---

# MiSTer

These commands are only available on the MiSTer platform. They will be ignored on other platforms.

## mister.ini

Loads a MiSTer.ini configuration file.

### Syntax

```zapscript
**mister.ini:<index>
```

### Arguments

**`index`** (required)
The ini file index (`1` to `4`) as shown in the MiSTer menu.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**mister.ini:1
```

Loads the first ini file.

```zapscript
**mister.ini:2
```

Loads the second ini file.

:::info
The ini switch does not persist after a reboot, same as loading through the OSD. The menu core will be relaunched if currently open.
:::

---

## mister.core

Launches a MiSTer core .rbf file directly.

### Syntax

```zapscript
**mister.core:<path>
```

### Arguments

**`path`** (required)
Path to the core, relative to the SD card root. Uses the same format as the `rbf` tag in MGL files - the filename ending can be omitted.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**mister.core:_Console/SNES
```

Launches the SNES core (any version).

```zapscript
**mister.core:_Console/PSX_20220518
```

Launches a specific PSX core version.

```zapscript
**mister.core:_Computer/ao486
```

Launches the ao486 core.

---

## mister.script

Launches a MiSTer script from the Scripts folder.

### Syntax

```zapscript
**mister.script:<script>
```

### Arguments

**`script`** (required)
The script filename (must exist in `/media/fat/Scripts`). Arguments can be included after the filename.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `hidden` | boolean    | `false` | Run the script in the background without displaying on screen      |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**mister.script:update_all.sh
```

Runs the Update All script on screen.

```zapscript
**mister.script:update_all.sh?hidden=yes
```

Runs the script in the background without interrupting the current game.

```zapscript
**mister.script:my_script.sh arg1 arg2
```

Runs a script with arguments.

:::info
When not using `hidden`, the currently running game will be closed and the script runs on screen as if launched from the Scripts menu.
:::

---

## mister.mgl

Executes MGL (MiSTer Game Library) content directly without a file.

### Syntax

```zapscript
**mister.mgl:<content>
```

### Arguments

**`content`** (required)
The MGL XML content as a string. A temporary MGL file is created and launched.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**mister.mgl:<setname>Genesis</setname><rbf>_Console/Genesis</rbf><file delay="1" type="f" index="0" path="../games/Genesis/Sonic.md"/>
```

Creates and launches an MGL to run Sonic on the Genesis core.

:::info
This allows programmatically creating MGL content without storing files on disk.
:::

---

## mister.wallpaper

Sets or unsets the MiSTer main menu wallpaper. When setting a wallpaper, the image is loaded from `/media/fat/wallpapers/`. If the MiSTer is currently on the main menu, the wallpaper is refreshed immediately.

### Syntax

```zapscript
**mister.wallpaper:<filename>
```

```zapscript
**mister.wallpaper
```

### Arguments

**`filename`** (optional)
The wallpaper image filename (e.g., `background.png`). Supports `.png` and `.jpg` files. The file must exist in `/media/fat/wallpapers/`. If omitted, the current wallpaper is unset.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**mister.wallpaper:retro_bg.png
```

Sets the menu wallpaper to `retro_bg.png`.

```zapscript
**mister.wallpaper
```

Removes the current wallpaper and reverts to random selection.

:::info
This command also works on MiSTeX.
:::
