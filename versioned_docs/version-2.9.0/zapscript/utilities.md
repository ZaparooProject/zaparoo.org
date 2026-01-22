---
sidebar_position: 5
---

# Utilities

These commands provide various utility functions for controlling script execution and system operations.

## stop

Stops the currently running media and returns to the menu.

### Syntax

```zapscript
**stop
```

### Arguments

None.

### Advanced Arguments

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `when` | expression | - | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**stop
```

Stops whatever is currently playing and returns to the menu.

```zapscript
**stop?when=[[media_playing]]
```

Only stops if media is currently playing.

---

## echo

Outputs a message to the Zaparoo Core log file.

### Syntax

```zapscript
**echo:<message>
```

### Arguments

**`message`** (required)
The text to output. Logged at "info" level.

### Advanced Arguments

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `when` | expression | - | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**echo:Token was scanned
```

Logs "Token was scanned" to the Core log file.

```zapscript
**echo:Platform is [[platform]]
```

Logs the current platform using an expression.

---

## execute

Runs a shell command on the host system.

### Syntax

```zapscript
**execute:<command>
```

### Arguments

**`command`** (required)
The shell command to run, including any arguments. The command has a 2-second timeout.

### Advanced Arguments

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `when` | expression | - | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**execute:reboot
```

Reboots the system.

```zapscript
**execute:notify-send "Game started"
```

Sends a desktop notification (on Linux systems with notify-send).

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
The number of milliseconds to pause. Must be a positive integer.

### Advanced Arguments

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `when` | expression | - | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**delay:500
```

Pauses for 500 milliseconds (half a second).

```zapscript
**delay:10000
```

Pauses for 10 seconds.

```zapscript
_Console/SNES||**delay:10000||**input.keyboard:{f12}
```

Launches SNES, waits 10 seconds, then presses F12.

:::info Blocking Command
This is a blocking command. The entire script pauses until the delay completes.
:::
