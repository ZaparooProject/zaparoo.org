---
sidebar_position: 2
---

# Input

These commands simulate input devices like keyboards and gamepads. All input commands are blocked when the script comes from a remote source for security reasons. These commands currently aren't enabled on desktop platforms like Windows and Linux.

## input.keyboard

Simulates keyboard key presses.

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

This command uses a separate virtual gamepad device, not an existing connected controller, which gives it limited use. It must be mapped manually in game/emulator to work and it can't, for example, pretend to be player 1 if a real controller is already connected as player 1. This command is currently disabled on Batocera due to compatibility issues.

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
