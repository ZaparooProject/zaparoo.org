---
sidebar_position: 2
description: "ZapScript input commands: send keyboard shortcuts and controller button inputs from a Zaparoo token scan."
keywords: [zapscript input, zaparoo keyboard shortcut, zapscript button press, input automation zaparoo]
---

# Input

These commands simulate input devices like keyboards and gamepads. For security, Core blocks input commands from remote sources. Currently, [Zap Links](./syntax.md#zap-links) are the only remote source. Scripts sent through the [Zaparoo App](../app/index.md) are not remote.

The platform sets a default input mode, which you can configure with [`[zapscript.input]`](../core/config.md#zapscriptinput). On desktop platforms, single-character keys are blocked by default; only key combos and special keys like `{f1}` work. Embedded platforms like MiSTer allow all keys.

## input.keyboard

Simulates keyboard key presses.

:::note Platform Support
Supported on [MiSTer](../platforms/mister/index.md), [MiSTeX](../platforms/mistex.md), and [Batocera](../platforms/batocera/index.md).
:::

### Syntax

```zapscript
**input.keyboard:<keys>
```

### Arguments

**`keys`** (required)
The keys to press. Each parsed key is pressed with a 100ms delay between keys. Special keys are entered using curly braces.

**Special keys:** `{esc}`, `{backspace}`, `{tab}`, `{enter}`, `{lctrl}`, `{lshift}`, `{backslash}`, `{rshift}`, `{lalt}`, `{space}`, `{caps}`, `{num}`, `{scroll}`, `{f1}`-`{f12}`, `{home}`, `{up}`, `{pgup}`, `{left}`, `{right}`, `{end}`, `{down}`, `{pgdn}`, `{ins}`, `{del}`, `{volup}`, `{voldn}`

**Escaping:** Use `\{` and `\}` for literal curly braces, `\\` for a literal backslash.

**Key combos:** Use `+` between keys inside braces, e.g., `{shift+esc}`.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Type the `@` character:

```zapscript
**input.keyboard:@
```

Type "qWeRty", press Enter, press Up arrow, then type "aaa":

```zapscript
**input.keyboard:qWeRty{enter}{up}aaa
```

Press Shift+Escape together:

```zapscript
**input.keyboard:{shift+esc}
```

Open the MiSTer OSD menu:

```zapscript
**input.keyboard:{f12}
```

:::warning Remote Blocked
This command is blocked when the script comes from a remote source.
:::

---

## input.gamepad

Simulates gamepad button presses.

:::note Platform Support
Supported on [MiSTer](../platforms/mister/index.md), [MiSTeX](../platforms/mistex.md), and [Batocera](../platforms/batocera/index.md). The virtual gamepad can interfere with some emulators on Batocera, so it is disabled by default there. It can be re-enabled in the [config file](../core/config.md#gamepad_enabled).
:::

This command uses a separate virtual gamepad device, not an existing connected controller, which gives it limited use. It must be mapped manually in game or emulator settings, and it can't pretend to be player 1 if a real controller is already connected as player 1.

### Syntax

```zapscript
**input.gamepad:<buttons>
```

### Arguments

**`buttons`** (required)
The buttons to press in sequence. Supports both single characters and named buttons in curly braces. Each parsed button is pressed with a 100ms delay between buttons.

**Button mappings:**

| Input            | Button            |
| ---------------- | ----------------- |
| `^`, `{up}`      | D-pad up          |
| `V`, `{down}`    | D-pad down        |
| `<`, `{left}`    | D-pad left        |
| `>`, `{right}`   | D-pad right       |
| `A`, `a`         | East button       |
| `B`, `b`         | South button      |
| `X`, `x`         | North button      |
| `Y`, `y`         | West button       |
| `L`, `l`, `{l1}` | Left bumper       |
| `R`, `r`, `{r1}` | Right bumper      |
| `{l2}`           | Left trigger      |
| `{r2}`           | Right trigger     |
| `{start}`        | Start             |
| `{select}`       | Select            |
| `{menu}`         | Menu/Guide button |

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Input the classic Konami code:

```zapscript
**input.gamepad:^^VV<><>BA{start}{select}
```

Press the Start button:

```zapscript
**input.gamepad:{start}
```

Press A, A, B, B in sequence:

```zapscript
**input.gamepad:AABB
```

:::warning Remote Blocked
This command is blocked when the script comes from a remote source.
:::

---

## input.coinp1 / input.coinp2

Inserts coins for player 1 or player 2 in arcade games.

:::note Platform Support
Supported on [MiSTer](../platforms/mister/index.md), [MiSTeX](../platforms/mistex.md), and [Batocera](../platforms/batocera/index.md).
:::

### Syntax

```zapscript
**input.coinp1:<amount>
**input.coinp2:<amount>
```

### Arguments

**`amount`** (optional, default: `1`)
The number of coins to insert.

Omit the amount to insert one coin.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Insert 1 coin for player 1:

```zapscript
**input.coinp1:1
```

Insert 3 coins for player 2:

```zapscript
**input.coinp2:3
```

Insert 2 coins for each player:

```zapscript
**input.coinp1:2||**input.coinp2:2
```

:::info
These commands press the `5` key (player 1) or `6` key (player 2), which are the standard coin insert keys for MiSTer arcade cores and MAME. If it doesn't work, try mapping the coin insert keys manually.
:::
