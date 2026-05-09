---
sidebar_position: 6
description: "ZapScript MiSTer-specific commands: load cores, control the OSD, and trigger MiSTer FPGA platform actions from Zaparoo tokens."
keywords: [zapscript mister, mister fpga zaparoo, zapscript core load, mister osd zaparoo]
---

# MiSTer

These commands target [MiSTer](../platforms/mister/index.md), with some support on [MiSTeX](../platforms/mistex.md). `mister.ini`, `mister.core`, `mister.mgl`, and `mister.wallpaper` work on both platforms. `mister.script` is MiSTer only. On unsupported platforms, the command returns an error and the rest of the script stops.

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

Load the first ini file:

```zapscript
**mister.ini:1
```

Load the second ini file:

```zapscript
**mister.ini:2
```

:::info
The ini switch does not persist after a reboot, matching MiSTer's OSD behavior. If the menu core is open, it will be relaunched after the switch.
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
Path to the core, relative to the SD card root. Uses the same format as the `rbf` tag in MGL files. The end of the filename, such as a date suffix, can be omitted.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Launch the SNES core:

```zapscript
**mister.core:_Console/SNES
```

Launch a specific PSX core version:

```zapscript
**mister.core:_Console/PSX_20220518
```

Launch the ao486 core:

```zapscript
**mister.core:_Computer/ao486
```

---

## mister.script

Launches a MiSTer script from the Scripts folder.

:::note Platform Support
This command is supported on [MiSTer](../platforms/mister/index.md) only.
:::

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

Run the Update All script on screen:

```zapscript
**mister.script:update_all.sh
```

Run the script in the background:

```zapscript
**mister.script:update_all.sh?hidden=yes
```

Run a script with arguments:

```zapscript
**mister.script:my_script.sh arg1 arg2
```

:::info
Without `hidden`, the current game closes and the script runs on screen as if launched from the Scripts menu.
:::

---

## mister.mgl

Launches MGL (MiSTer Game Library) content from inline XML.

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

Create and launch an MGL to run Sonic on the Genesis core:

```zapscript
**mister.mgl:<setname>Genesis</setname><rbf>_Console/Genesis</rbf><file delay="1" type="f" index="0" path="../games/Genesis/Sonic.md"/>
```

:::info
Use this when you need to build MGL content in ZapScript instead of keeping a separate `.mgl` file on disk.
:::

---

## mister.wallpaper

Sets or unsets the MiSTer main menu wallpaper. When setting a wallpaper, the image is loaded from `/media/fat/wallpapers/`. If MiSTer is on the main menu, the wallpaper is refreshed immediately.

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

Set the menu wallpaper to `retro_bg.png`:

```zapscript
**mister.wallpaper:retro_bg.png
```

Remove the current wallpaper and revert to random selection:

```zapscript
**mister.wallpaper
```
