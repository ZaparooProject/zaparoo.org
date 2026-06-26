---
description: "Use Zaparoo hooks to run ZapScript when tokens are scanned, media starts, media exits, or Core becomes ready."
keywords: [zaparoo hooks, zapscript hooks, zaparoo on_scan, zaparoo on_ready, zaparoo automation]
---

# Hooks

Hooks run [ZapScript](../zapscript/index.md) at specific points in Core's lifecycle. Use them for local automation, webhooks, save workflows, startup actions, lighting, buttons, or scripts that need context from Core.

Hooks are configured in `config.toml`. Manual config edits require a Core restart or config reload where supported.

## Hook reference

| Hook | Config location | When it runs | Can block? | Extra context |
| --- | --- | --- | --- | --- |
| `on_scan` | `[readers.scan]` | After a token is scanned, before the token or mapping script runs | Yes, blocks token processing | `scanned` |
| `on_remove` | `[readers.scan]` | After a token is removed in hold mode | Yes, blocks remove processing and keeps media running | none |
| `before_exit` | `[[systems.default]]` | Before hold mode exits media for the matching system | Waits for script; errors are logged | none |
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

Use `before_exit` on a system default when hold mode should run a script before exiting media.

```toml
[[systems.default]]
system = "SNES"
before_exit = "**input.keyboard:{f12}||**delay:2000"
```

This can be useful for opening an emulator menu, saving, or giving the platform time to settle before hold mode exits media.

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

`execute` still requires a matching [`allow_execute`](../core/config.md#allow_execute) entry. Input commands still follow the configured [`[zapscript.input]`](../core/config.md#zapscriptinput) rules.

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
