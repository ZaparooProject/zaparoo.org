---
sidebar_position: 3
description: "ZapScript input commands: send keyboard shortcuts and controller button inputs from a Zaparoo token scan."
keywords: [zapscript input, zaparoo keyboard shortcut, zapscript button press, input automation zaparoo]
---

# Input

These commands simulate input devices like keyboards and gamepads. Core blocks all of them when the script comes from a remote source: a [Zap Link](./zap-links.md), a playlist it opened, or a copy of someone else's [deck](../features/playlists.md#deck). Scripts sent through the [Zaparoo App](../app/index.md) are not remote.

The platform sets a default input mode, which you can configure with [`[zapscript.input]`](../core/config/zapscript.md#zapscriptinput). On desktop platforms, single-character keys are blocked by default; only key combos and special keys like `{f1}` work. Embedded platforms like MiSTer allow all keys.

## Platform support

Input commands work on [MiSTer](../platforms/mister/index.md), [Batocera](../platforms/batocera/index.md), [RePlayOS](../platforms/replayos.md), and [Windows](../platforms/windows/index.md#input). Other platforms accept the command but nothing is typed.

| Command | Notes |
| ------- | ----- |
| `input.keyboard`, `input.text`, `input.coinp1` to `input.coinp4` | On Windows, keys cannot reach windows running as administrator or the lock screen. `input.text` types single characters, so on desktop platforms it needs the input mode set to `unrestricted`. |
| `input.gamepad` | Uses a virtual gamepad that games must map by hand. Off by default on Batocera, where it can interfere with some emulators, on RePlayOS, and on Windows, where it also needs the ViGEmBus driver. Turn it on with [`gamepad_enabled`](../core/config/media.md#gamepad_enabled). |

## input.keyboard

Simulates keyboard key presses.

### Syntax

```zapscript
**input.keyboard:<keys>
```

### Arguments

**`keys`** (required)
The keys to press. Each parsed key is pressed with a short delay between keys, 100ms by default and configurable with the `speed` advanced argument. Special keys are entered using curly braces.

**Special keys:** `{esc}`, `{backspace}`, `{tab}`, `{enter}`, `{lctrl}`, `{lshift}`, `{backslash}`, `{rshift}`, `{lalt}`, `{space}`, `{caps}`, `{num}`, `{scroll}`, `{f1}`-`{f12}`, `{home}`, `{up}`, `{pgup}`, `{left}`, `{right}`, `{end}`, `{down}`, `{pgdn}`, `{ins}`, `{del}`, `{volup}`, `{voldn}`

**Escaping:** Use `\{` and `\}` for literal curly braces, `\\` for a literal backslash.

**Key combos:** Use `+` between keys inside braces, e.g., `{shift+esc}`.

### Macros

Curly braces also support a small macro language for repeating keys, typing literal text, and holding keys down. These are expanded before the keys are pressed.

| Macro | Effect |
| ----- | ------ |
| `{key*N}` | Repeat a key, combo, or special key N times, e.g. `{down*10}` |
| `{"text"*N}` | Type literal text, optionally repeated N times. Escape inner quotes as `\"` |
| `{text:content*N}` | Verb form of the above. Types `content` literally, optionally repeated |
| `{delay:dur}` | Pause before the next key. `dur` is milliseconds (`500`) or a duration (`1s`, `250ms`) |
| `{press:key}` or `{_key}` | Press a key and hold it down without releasing |
| `{release:key}` or `{^key}` | Release a held key |
| `{hold:key:dur}` or `{~key:dur}` | Hold a key for a duration, then release it |

`key` in these three macros can be a plain key, a shifted character like `M` or `!`, or a combo like `ctrl+c`. A shifted character holds Shift with the key, and a release matches the press that named the same keys. Any keys still held at the end of the sequence are released automatically.

Press the Down arrow 10 times:

```zapscript
**input.keyboard:{down*10}
```

Type "ha" five times:

```zapscript
**input.keyboard:{"ha"*5}
```

Hold Shift while typing ABC, then release it:

```zapscript
**input.keyboard:{_shift}ABC{^shift}
```

Hold the A key for one second:

```zapscript
**input.keyboard:{hold:a:1s}
```

Hold Ctrl+A for half a second:

```zapscript
**input.keyboard:{hold:ctrl+a:500}
```

Type some keys with a pause in the middle:

```zapscript
**input.keyboard:abc{delay:1s}def
```

A single repeat can be at most 1000, and one command can expand to at most 5000 keys.

### Advanced arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `speed`  | duration   | `100ms` | Delay between key presses. Milliseconds (`50`) or a duration (`200ms`). Lower is faster |

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

---

## input.text

Types a string of literal text exactly as written. Unlike [`input.keyboard`](#inputkeyboard), it does not interpret `{}` macros, `*` repeats, or advanced arguments, so every character including `{`, `}`, `?`, and `*` is typed as-is. Use it for arbitrary text like search queries, URLs, or passwords.

### Syntax

```zapscript
**input.text:<text>
```

### Arguments

**`text`** (required)
The literal text to type. Newlines are sent as Enter and tabs as Tab. Up to 5000 characters.

### Examples

Type a search term:

```zapscript
**input.text:hello world
```

Type a URL exactly, including the `?` and `=`:

```zapscript
**input.text:https://example.com/search?q=zaparoo
```

---

## input.gamepad

Simulates gamepad button presses.

This command uses a separate virtual gamepad device, not an existing connected controller, which gives it limited use. It must be mapped manually in game or emulator settings, and it can't pretend to be player 1 if a real controller is already connected as player 1.

### Syntax

```zapscript
**input.gamepad:<buttons>
```

### Arguments

**`buttons`** (required)
The buttons to press in sequence. Supports both single characters and named buttons in curly braces. Each parsed button is pressed with a short delay between buttons, 100ms by default and configurable with the `speed` advanced argument. Repeat a button with `{button*N}`, for example `{start*3}`.

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

### Advanced arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `speed`  | duration   | `100ms` | Delay between button presses. Milliseconds (`50`) or a duration (`200ms`). Lower is faster |

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

---

## input.coinp1 / input.coinp2 / input.coinp3 / input.coinp4

Inserts coins for players 1 through 4 in arcade games.

### Syntax

```zapscript
**input.coinp1:<amount>
**input.coinp2:<amount>
**input.coinp3:<amount>
**input.coinp4:<amount>
```

### Arguments

**`amount`** (optional, default: `1`)
The number of coins to insert, from 0 to 99.

Omit the amount to insert one coin.

### Examples

Insert 1 coin for player 1:

```zapscript
**input.coinp1:1
```

Insert 3 coins for player 2:

```zapscript
**input.coinp2:3
```

Insert 1 coin for player 3:

```zapscript
**input.coinp3:1
```

Insert 1 coin for player 4:

```zapscript
**input.coinp4:1
```

Insert 2 coins for each player:

```zapscript
**input.coinp1:2||**input.coinp2:2||**input.coinp3:2||**input.coinp4:2
```

:::info
These commands press the `5`, `6`, `7`, or `8` key for players 1 through 4, which are standard coin insert keys for MiSTer arcade cores and MAME. If it doesn't work, try mapping the coin insert keys manually.
:::
