---
description: "Use Zaparoo play controls to protect active sessions, stage disruptive scans, and enforce playtime limits."
keywords: [zaparoo play controls, zaparoo launch guard, zaparoo playtime limits, game time limit, staged token]
---

# Play Controls

Play controls help manage what happens while media is active. Use them to prevent accidental game switches, require confirmation before changing games, or limit how long games can be played.

Use these for parental limits, shared arcade cabinets, events, kiosks, or any setup where scans should be more deliberate.

## Setup in the Zaparoo App

Open the [Zaparoo App](../app/index.md) or [Web UI](../app/web.md), then go to **Settings > Play Controls**.

From there you can configure:

- **Launch guard**: stage disruptive scans instead of launching them immediately.
- **Playtime limits**: set daily and per-session play limits.

Changes made through the App apply without restarting Core.

## Launch guard

Launch guard protects the active game session from accidental token scans. When enabled, tokens scanned while media is playing are staged first. A second deliberate action is required before Zaparoo switches games.

Launch guard only activates when media is currently playing. If nothing is playing, tokens launch as normal.

Not every token is staged. Launch guard checks the token's [ZapScript](../zapscript/index.md), including any mapped script, and only stages scans that would disrupt the active session. Media launches, `playlist.*`, and `stop` are staged. Utility commands like `input.keyboard`, `http.get`, and `input.coinp1` pass through immediately. If Core can't parse the script, it stages the scan instead of passing it through.

### Staging flow

When a disrupting token is staged:

1. A pending sound plays and a [`tokens.staged`](../core/api/notifications.md#tokensstaged) notification is sent with the token details.
2. The timeout timer starts. If no confirmation arrives before it expires, the staged token is dropped.
3. If a delay is configured, re-tap confirmation is blocked until the delay expires. When the delay expires, a ready sound plays and a [`tokens.staged.ready`](../core/api/notifications.md#tokensstagedready) notification is sent.

If a different disrupting token is scanned while one is already staged, it replaces the staged token and the timers restart.

### Confirming a staged token

Once the delay has passed, re-tap the same card to confirm and launch it. Tapping a different card replaces the staged token instead.

The API [`confirm`](../core/api/methods.md#confirm) method also confirms and launches the staged token. It bypasses the delay for physical buttons and automation.

Setting `require_confirm = true` disables re-tap confirmation. The staged token can only be launched through the API `confirm` method.

## Playtime limits

Playtime limits track how long games are played and can enforce a daily limit, a per-session limit, or both. Core sends warnings before time runs out, stops active media when a limit is reached, and blocks new launches until the limit resets.

### Sessions

A session is a continuous period of gaming. Playtime accumulates across multiple games within the same session.

A session has three states:

1. **Active**: A game is running and time is being tracked.
2. **Cooldown**: The game stopped, but cumulative time is preserved for the `session_reset` duration. Starting another game continues the same session.
3. **Reset**: The cooldown expired and cumulative time is cleared. The next game starts a new session.

Example session under the limit:

```text
12:00 - Launch Mario Kart (session starts, Active)
12:30 - Stop Mario Kart (Cooldown begins, cumulative: 30m)
12:35 - Launch Sonic (session continues, cumulative: 30m)
13:00 - Stop Sonic (Cooldown begins, cumulative: 55m)
13:25 - Cooldown expires (session resets to 0)
13:30 - Launch Zelda (new session starts)
```

When a session limit is reached, the cooldown becomes the enforced break before the next session.

```text
12:00 - Launch game (session starts)
13:00 - Session limit reached, game stopped (cumulative: 1h)
13:05 - Try to launch another game: blocked
13:20 - Cooldown expires (session resets to 0)
13:21 - Launch game: allowed
```

Daily limits reset at midnight in the local timezone. The total includes all sessions from the current calendar day.

If less than 1 minute remains, the launch is blocked entirely.

## Manual configuration

### Launch guard

```toml
[readers.scan.launch_guard]
enabled = true
timeout = 15
delay = 0
require_confirm = false
```

Common examples:

```toml
# Re-tap to confirm, using default timeout
[readers.scan.launch_guard]
enabled = true
```

```toml
# Wait up to 30 seconds and require a 5-second cool-down before re-tap
[readers.scan.launch_guard]
enabled = true
timeout = 30
delay = 5
```

```toml
# Only confirm through the API
[readers.scan.launch_guard]
enabled = true
require_confirm = true
```

```toml
# Stage indefinitely until confirmed, replaced, or media stops
[readers.scan.launch_guard]
enabled = true
timeout = -1
```

See the [launch guard config reference](../core/config.md#launch-guard-config) for all options.

### Playtime limits

```toml
[playtime.limits]
enabled = true
daily = "2h"
session = "45m"
session_reset = "20m"
warnings = ["10m", "5m", "2m", "1m"]
```

Limit play to 1 hour per day:

```toml
[playtime.limits]
enabled = true
daily = "1h"
```

Allow 45-minute gaming sessions with 30-minute breaks:

```toml
[playtime.limits]
enabled = true
session = "45m"
session_reset = "30m"
```

See the [playtime config reference](../core/config.md#playtime) for all options.

## API and notifications

- [`confirm`](../core/api/methods.md#confirm) launches the currently staged token and bypasses launch guard delay.
- [`settings.playtime.limits.update`](../core/api/methods.md#settingsplaytimelimitsupdate) changes playtime limits at runtime.
- [`tokens.staged`](../core/api/notifications.md#tokensstaged) reports a staged token.
- [`tokens.staged.ready`](../core/api/notifications.md#tokensstagedready) reports that re-tap confirmation is ready.

Disabling playtime limits resets the current session and clears cooldown timers. Daily usage history is kept. Re-enabling starts a fresh session, but daily usage from history still counts toward the daily limit.

Playtime history is kept for 365 days by default. Change [`playtime.retention`](../core/config.md#retention) to keep fewer days or set it to `0` to keep all history.

## Platform support

Playtime tracking works on supported platforms, but accuracy depends on how well Core can detect when media starts and stops. MiSTer and Batocera currently have the most accurate game detection. Other platforms are still improving.

On MiSTer, game tracking requires `recents=1` in `MiSTer.ini`. Without it, games launched from the MiSTer menu are not detected. See [MiSTer game tracking](../platforms/mister/index.md#game-tracking).

## Troubleshooting

### Launch guard does not stage scans

1. Check that `[readers.scan.launch_guard] enabled = true` is set.
2. Check that media is already playing. Launch guard does not stage scans from the menu.
3. Check whether the scanned token only runs utility commands. Utility commands pass through by design.

### Playtime limits not enforcing

1. Check that `[playtime.limits] enabled = true` is set.
2. Check that daily/session values are valid duration strings.
3. Restart Core after manual config edits, or use the App to apply changes immediately.
4. Enable debug logging to see limit check messages.

### Warnings not appearing

1. Check the [`warnings`](../core/config.md#warnings) array.
2. Make sure [audio feedback](../core/config.md#scan_feedback) is enabled.
3. Check the Zaparoo App is connected to receive notifications.

### Session not resetting

Check [`session_reset`](../core/config.md#session_reset). If it is set to `"0"`, sessions never reset automatically.
