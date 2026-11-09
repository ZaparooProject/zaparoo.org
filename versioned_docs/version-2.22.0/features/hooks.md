---
sidebar_position: 12
description: "Use Zaparoo hooks to run ZapScript when tokens are scanned, media starts, media exits, or Core becomes ready."
keywords: [zaparoo hooks, zapscript hooks, zaparoo on_scan, zaparoo on_ready, zaparoo automation]
---

# Hooks

Hooks run [ZapScript](../zapscript/index.md) at specific points in Core's lifecycle. Use them for local automation, webhooks, save workflows, startup actions, lighting, buttons, or scripts that need context from Core.

For example, `on_media_start` can flash a lamp or update an LED marquee whenever a game starts, and `on_scan` can log every card that gets tapped or veto a launch. Hooks are configured in `config.toml`. Manual config edits require a Core restart or config reload where supported.

## Hook reference

| Hook | Config location | When it runs | Can block? | Extra context |
| --- | --- | --- | --- | --- |
| `on_scan` | `[readers.scan]` | After a token is scanned, before the token or mapping script runs | Yes, blocks token processing | `scanned` |
| `on_remove` | `[readers.scan]` | After a token is removed in hold mode | Yes, blocks remove processing and keeps media running | none |
| `before_exit` | `[[launchers.default]]`, `[[systems.default]]`, `[launchers]` | Before matching media stops or is replaced | No, errors are logged; capped at 30 seconds | none |
| `before_media_start` | `[launchers]` | Before a media-launching command runs | Yes, blocks launch | `launching` |
| `on_media_start` | `[launchers]` | After active media is set | No, errors are logged | active media |
| `on_boot` | `[service]` | First Core start after the device boots | No, errors are logged | `hook` |
| `on_ready` | `[service]` | Every time Core starts and is ready | No, errors are logged | `hook` |

## Reader hooks

Reader hooks live under `[readers.scan]`.

```toml
[readers.scan]
on_scan = "**http.post:https://example.com/scan,text/plain,Token scanned"
on_remove = "**echo:card was removed"
```

`on_scan` runs before the scanned token is processed. If the hook fails, the scan is blocked.

`on_remove` only runs in hold mode. If the hook fails, remove processing is blocked, so media keeps running.

When ZapScript execution is turned off, for example while the command line or a client is waiting to read or write a token, a scanned token is ignored quietly: no failure sound plays, no failed scan is recorded in history, and reader hooks are not treated as blocked.

## Media launch hooks

Media launch hooks live under `[launchers]`.

```toml
[launchers]
before_media_start = "**http.get:https://example.com/before-launch"
on_media_start = "**http.get:https://example.com/media-started"
```

`before_media_start` runs before launch commands such as `**launch`, `**launch.random`, `**launch.title`, and MiSTer MGL launches. If it fails, the launch is blocked.

`on_media_start` runs after Core starts media. It is useful for notifications or follow-up actions. If it fails, the launched media keeps running.

## Exit hooks

`before_exit` runs a script just before media stops or is replaced. It runs when another token launches over the running game, on `stop`, `playlist.stop`, and the `media.stop` API method, when a [playtime limit](./play-controls.md#playtime-limits) stops the game, and on a hold-mode card removal after `on_remove` and `exit_delay`. It does not run when a game is quit from the emulator or frontend itself, because the media is already gone by the time Core notices.

It can be set at three scopes: a [system](../core/config/launchers.md#before_exit), a [launcher or launcher group](../core/config/launchers.md#launchers-default-before-exit), or [globally](../core/config/launchers.md#launchers-before-exit) for everything else.

```toml
[launchers]
before_exit = "**input.keyboard:{f12}"

[[launchers.default]]
launcher = "RetroAchievements"
before_exit = "**input.keyboard:{f2}"

[[systems.default]]
system = "SNES"
before_exit = "**input.keyboard:{f4}||**delay:2000"
```

A group entry covers every launcher in that group across every system, so one line handles a whole family like the MiSTer RetroAchievements cores or every Kodi launcher. When more than one scope matches, the narrowest wins and an unset one falls through to the next:

1. A `[[launchers.default]]` entry naming the launcher that started the media
2. A `[[systems.default]]` entry for the media's system
3. A `[[launchers.default]]` entry naming one of that launcher's groups
4. The global `[launchers]` `before_exit`

This can be useful for opening an emulator menu, saving, or giving the platform time to settle before the media exits.

Core waits for the script, up to 30 seconds. A failure is logged and never stops the exit.

## Service startup hooks

Service hooks live under `[service]`.

```toml
[service]
on_boot = "**execute:/media/fat/zaparoo/scripts/on-boot.sh"
on_ready = "**execute:/media/fat/zaparoo/scripts/on-ready.sh"
```

`on_boot` runs once after the device boots. If Core restarts without rebooting the device, `on_boot` is skipped.

`on_ready` runs every time Core starts and is ready.

## Expression environment

Hook scripts can use the normal [ZapScript expression environment](../zapscript/syntax.md#expression-environment). Hook-related fields include:

- `hook.name`: current hook name, such as `on_boot` or `on_ready`.
- `hook.first_boot_start`: `true` when this Core start is the first start for the current OS boot.
- `scanned`: available in `on_scan`.
- `launching`: available in `before_media_start`.

The normal environment also includes `media_ready`, which is `true` when active media is considered ready.

Example:

```toml
[service]
on_ready = "**echo:Hook [[hook.name]] started, first boot: [[hook.first_boot_start]]"
```

## External scripts

The `**execute` command receives a `ZAPAROO_ENVIRONMENT` environment variable containing the expression environment as JSON.

```toml
[zapscript]
allow_execute = ["/media/fat/zaparoo/scripts/.*"]

[service]
on_ready = "**execute:/media/fat/zaparoo/scripts/on-ready.sh"
```

`execute` still requires a matching [`allow_execute`](../core/config/zapscript.md#allow_execute) entry. Input commands still follow the configured [`[zapscript.input]`](../core/config/zapscript.md#zapscriptinput) rules.

## Examples

Send a webhook when a token is scanned:

```toml
[readers.scan]
on_scan = "**http.post:https://hooks.example.com/zaparoo,text/plain,[[scanned.id]]"
```

Block launches when an external script returns an error:

```toml
[launchers]
before_media_start = "**execute:/media/fat/zaparoo/scripts/check-launch.sh"
```
