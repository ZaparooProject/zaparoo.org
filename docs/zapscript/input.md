---
sidebar_position: 2
description: "ZapScript input commands: send keyboard shortcuts and controller button inputs from a Zaparoo token scan."
keywords: [zapscript input, zaparoo keyboard shortcut, zapscript button press, input automation zaparoo]
---

# Input

These commands simulate input devices like keyboards and gamepads. All input commands are blocked when the script comes from a remote source for security reasons.

The platform sets a default input mode, which you can configure with [`[zapscript.input]`](../core/config.md#zapscriptinput). On desktop platforms, single-character keys are blocked by default; only key combos and special keys like `{f1}` work. Embedded platforms like MiSTer allow all keys.

## input.keyboard

Simulates keyboard key presses.

:::note Platform Support
Supported on [MiSTer](../platforms/mister/index.md), [MiSTex](../platforms/mistex.md), and [Batocera](../platforms/batocera/index.md).
:::

### Syntax

```zapscript
**input.keyboard:<keys>
```

### Arguments

**`keys`** (required)
The keys to press. Regular characters are typed directly, with a 100ms delay between each key. Special keys are entered using curly braces.

**Special keys:** `{esc}`, `{backspace}`, `{tab}`, `{enter}`, `{lctrl}`, `{lshift}`, `{backslash}`, `{rshift}`, `{lalt}`, `{space}`, `{caps}`, `{num}`, `{scroll}`, `{f1}`-`{f12}`, `{home}`, `{up}`, `{pgup}`, `{left}`, `{right}`, `{end}`, `{down}`, `{pgdn}`, `{ins}`, `{del}`, `{volup}`, `{voldn}`

**Escaping:** Use `\{` and `\}` for literal curly braces, `\\` for a literal backslash.

**Key combos:** Use `+` between keys inside braces, e.g., `{shift+esc}`.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**input.keyboard:@
```

Types the `@` character.

```zapscript
**input.keyboard:qWeRty{enter}{up}aaa
```

Types "qWeRty", presses Enter, presses Up arrow, then types "aaa".

```zapscript
**input.keyboard:{shift+esc}
```

Presses Shift+Escape together.

```zapscript
**input.keyboard:{f12}
```

Opens the MiSTer OSD menu.

:::warning Remote Blocked
This command is blocked when the script comes from a remote source.
:::

---

## input.gamepad

Simulates gamepad button presses.

:::note Platform Support
Supported on [MiSTer](../platforms/mister/index.md), [MiSTex](../platforms/mistex.md), and [Batocera](../platforms/batocera/index.md). The gamepad device is disabled by default on Batocera and can be re-enabled in the [config file](../core/config.md#gamepad_enabled).
:::

This command uses a separate virtual gamepad device, not an existing connected controller, which gives it limited use. It must be mapped manually in game/emulator to work and it can't, for example, pretend to be player 1 if a real controller is already connected as player 1.

### Syntax

```zapscript
**input.gamepad:<buttons>
```

### Arguments

**`buttons`** (required)
The buttons to press in sequence. Supports both single characters and named buttons in curly braces.

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

```zapscript
**input.gamepad:^^VV<><>BA{start}{select}
```

Inputs the classic Konami code.

```zapscript
**input.gamepad:{start}
```

Presses the Start button.

```zapscript
**input.gamepad:AABB
```

Presses A, A, B, B in sequence.

:::warning Remote Blocked
This command is blocked when the script comes from a remote source.
:::

---

## input.coinp1 / input.coinp2

Inserts coins for player 1 or player 2 in arcade games.

:::note Platform Support
Supported on [MiSTer](../platforms/mister/index.md), [MiSTex](../platforms/mistex.md), and [Batocera](../platforms/batocera/index.md).
:::

### Syntax

```zapscript
**input.coinp1:<count>
**input.coinp2:<count>
```

### Arguments

**`count`** (optional, default: `1`)
The number of coins to insert.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**input.coinp1:1
```

Inserts 1 coin for player 1.

```zapscript
**input.coinp2:3
```

Inserts 3 coins for player 2.

```zapscript
**input.coinp1:2||**input.coinp2:2
```

Inserts 2 coins for each player.

:::info
These commands press the `5` key (player 1) or `6` key (player 2), which are the standard coin insert keys for MiSTer arcade cores and MAME. If it doesn't work, try mapping the coin insert keys manually.
:::
