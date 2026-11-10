---
sidebar_position: 4
toc_max_heading_level: 5
description: "Zaparoo Core config.toml reference for [zapscript]: allow lists for execute, HTTP, and shell commands, input modes, blocked keys, and remote script rules."
keywords: [zaparoo zapscript config, allow_execute, zapscript.input, block_commands, allow_http]
---

# ZapScript Config

Part of the [config file reference](./index.md). Keys are shown with their type and default, followed by what they do and an example.

## ZapScript

```toml
[zapscript]
allow_execute = [
    'touch /tmp/tap_time',
    '/media/fat/linux/mplayer .+'
]
allow_http = [
    'https://example\.com/.*'
]
block_commands = [
    'execute'
]

[zapscript.input]
mode = 'combos'
block = ['{alt+f4}']
```

### allow_execute

| Key           | Type                      | Default |
| ------------- | ------------------------- | ------- |
| allow_execute | string[] (regex patterns) | []      |

:::danger Security Warning
`allow_execute` allows specific executables and arguments to be run using the `**execute` [ZapScript](../../zapscript/index.md) command. By default, the command does not allow anything to be run. Be extremely careful with this setting as it can execute arbitrary commands on your system.
:::

Each entry in this option is a [Regular Expression](https://github.com/google/re2/wiki/Syntax). Notes on usage here:

- Patterns are automatically anchored and must match the full command string. `echo` matches only `echo`, not `echo && rm -rf /`. Use `echo.*` or `.*pattern.*` for broader matching.
- On Windows, file path separators must be escaped: `C:\\Test\\Thing.exe`

### allow_http

| Key        | Type                      | Default |
| ---------- | ------------------------- | ------- |
| allow_http | string[] (regex patterns) | []      |

`allow_http` restricts which URLs the [`**http.get`](../../zapscript/http.md#httpget) and [`**http.post`](../../zapscript/http.md#httppost) ZapScript commands can access. When empty (the default), all URLs are allowed. When configured, only matching URLs are permitted.

Each entry is a [Regular Expression](https://github.com/google/re2/wiki/Syntax). Patterns are automatically anchored to match the full URL.

```toml
[zapscript]
allow_http = [
    'https://example\.com/.*',
    'http://localhost:8080/.*'
]
```

### block_commands

| Key            | Type     | Default |
| -------------- | -------- | ------- |
| block_commands | string[] | []      |

`block_commands` disables specific ZapScript commands by name. Any listed command will always fail, regardless of any other allowlists.

```toml
[zapscript]
block_commands = [
    'execute',
    'http.post'
]
```

Command names match the ZapScript command identifier (e.g., `execute`, `http.get`, `http.post`, `input.keyboard`).

### zapscript.input

`zapscript.input` is a sub-section of `zapscript` that controls which keys the [`**input.keyboard`](../../zapscript/input.md#inputkeyboard) and [`**input.gamepad`](../../zapscript/input.md#inputgamepad) commands can send. The `allow` and `block` lists also apply to keyboard input that paired member clients send through the API, such as the App's remote keyboard. Localhost and admin clients are exempt.

```toml
[zapscript.input]
mode = 'combos'
allow = ['{f1}', '{f2}', '{enter}', '{esc}']
block = ['{alt+f4}']
```

#### mode {#zapscript-input-mode}

| Key  | Type                                | Default              |
| ---- | ----------------------------------- | -------------------- |
| mode | string (`"combos"`, `"unrestricted"`) | _varies by platform_ |

Controls how input keys are filtered when no `allow` list is configured.

- `combos`: only key combos and named special keys (e.g., `{f1}`, `{ctrl+q}`) are allowed. Single characters (e.g., `a`, `5`) are blocked. This is the default on desktop platforms.
- `unrestricted`: all keys are allowed (subject to the `block` list). This is the default on embedded platforms like MiSTer.

Platform defaults:
- **Desktop** (Linux, Windows, macOS, SteamOS, ChimeraOS, Bazzite): `combos`
- **Embedded** (MiSTer, Batocera, Recalbox, LibreELEC, RetroPie): `unrestricted`

#### allow {#zapscript-input-allow}

| Key   | Type     | Default |
| ----- | -------- | ------- |
| allow | string[] | []      |

When set, only the listed keys are permitted. All others are blocked regardless of `mode` or `block`. Matching is case-insensitive.

```toml
[zapscript.input]
allow = ['{f1}', '{f2}', '{enter}', '{esc}']
```

#### block {#zapscript-input-block}

| Key   | Type     | Default                      |
| ----- | -------- | ---------------------------- |
| block | string[] | _platform default (desktop)_ |

A list of keys to always block. On desktop platforms, a built-in block list applies by default; setting `block` to any value, even an empty list, replaces it entirely.

The default desktop block list covers TTY switching (`{ctrl+alt+f1}`–`{ctrl+alt+f7}`), `{ctrl+alt+t}`, `{ctrl+alt+delete}`, `{super}`, `{meta}`, `{alt+f4}`, and `{cmd+space}`.

```toml
[zapscript.input]
block = ['{alt+f4}', '{ctrl+alt+t}']  # custom block list, replaces defaults
```

The `block` list is ignored when `allow` is configured.
