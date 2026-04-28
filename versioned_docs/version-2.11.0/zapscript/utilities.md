---
sidebar_position: 5
description: "ZapScript utility commands: stop playback, add delays, display messages, and other helper functions for Zaparoo tokens."
keywords: [zapscript utilities, zaparoo stop command, zapscript delay, zapscript message, zaparoo helper commands]
---

# Utilities

These commands stop media, log messages, run host commands, add delays, send launcher controls, and take screenshots.

## stop

Stops the currently running media and returns to the menu.

### Syntax

```zapscript
**stop
```

### Arguments

None.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Stop whatever is currently playing and return to the menu:

```zapscript
**stop
```

Only stop if media is currently playing:

```zapscript
**stop?when=[[media_playing]]
```

---

## echo

Outputs a message to the Zaparoo Core log file.

### Syntax

```zapscript
**echo:<message>
```

### Arguments

**`message`** (required)
The text to output. Multiple arguments are joined with `, ` and logged at "info" level.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Log "Token was scanned" to the Core log file:

```zapscript
**echo:Token was scanned
```

Log the current platform using an expression:

```zapscript
**echo:Platform is [[platform]]
```

---

## execute

Runs a command on the host system.

### Syntax

```zapscript
**execute:<command>
```

### Arguments

**`command`** (required)
The command to run, including any arguments. Arguments are split while respecting double and single quoted strings. The command is executed directly without a shell interpreter, so shell features like pipes, redirection, or command substitution are not supported. The command has a 2-second timeout.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Reboot the system:

```zapscript
**execute:reboot
```

Send a desktop notification on Linux systems with `notify-send`:

```zapscript
**execute:notify-send "Game started"
```

:::caution Security Requirement
This command requires explicitly enabling the arguments in the [`allow_execute`](../core/config.md#allow_execute) config option. Commands from remote sources are always blocked.
:::

---

## delay

Pauses script execution for a specified duration.

### Syntax

```zapscript
**delay:<milliseconds>
```

### Arguments

**`milliseconds`** (required)
The number of milliseconds to pause. Must be an integer.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Pause for 500 milliseconds, or half a second:

```zapscript
**delay:500
```

Pause for 10 seconds:

```zapscript
**delay:10000
```

Launch SNES, wait 10 seconds, then press F12:

```zapscript
_Console/SNES||**delay:10000||**input.keyboard:{f12}
```

:::info Blocking Command
This is a blocking command. The entire script pauses until the delay completes.
:::

---

## control

Dispatches a [launcher control](../features/launcher-controls.md) action to the active media's launcher. This allows you to send commands to whatever is currently playing, such as pausing, saving state, or skipping tracks.

### Syntax

```zapscript
**control:<action>
```

### Arguments

**`action`** (required)
The control action to dispatch. Available actions depend on the launcher handling the currently active media.

Defined action names include:
- `toggle_pause` - Pause or unpause
- `save_state` - Save the current state
- `load_state` - Load a saved state
- `save_ram` - Save RAM data
- `toggle_menu` - Toggle an in-game menu
- `reset` - Reset the active media
- `stop` - Stop the active media
- `fast_forward` - Fast forward
- `rewind` - Rewind
- `next` - Skip to next
- `previous` - Go to previous

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Pause or unpause the currently playing media:

```zapscript
**control:toggle_pause
```

Save the current state, such as a save state in an emulator:

```zapscript
**control:save_state
```

:::info
Media must be actively playing for this command to work. If no media is active, the command will return an error. The available actions depend on the launcher, and not all launchers support all actions.
:::

---

## screenshot

Captures the current platform display and saves the screenshot to disk.

:::note Platform Support
Currently supported on [MiSTer](../platforms/mister/index.md) and [RePlayOS](../platforms/replayos.md).
:::

### Syntax

```zapscript
**screenshot
```

### Arguments

None.

### Advanced Arguments

| Argument | Type       | Default | Description                                                        |
| -------- | ---------- | ------- | ------------------------------------------------------------------ |
| `when`   | expression | -       | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

Capture a screenshot of the current display:

```zapscript
**screenshot
```
