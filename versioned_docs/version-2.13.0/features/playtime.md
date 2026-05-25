---
description: "Track and limit game playtime in Zaparoo with daily caps, per-session limits, and warnings before time runs out."
keywords: [zaparoo playtime, game time limit, parental controls zaparoo, playtime tracking]
---

# Playtime

Zaparoo can track how long games are played and enforce time limits. You can set a daily limit, a per-session limit, or both, with warnings before time runs out.

## Setup

### Quick setup in the Web UI

1. Open the Web UI (default: `http://your-device:7497/app/`)
2. Go to **Settings**, then **Playtime Limits**
3. Enable limits and set your daily or session times
4. Save your changes

### Manual configuration

See the [Config File Reference](../core/config.md#playtime) for the full set of options:

- [`enabled`](../core/config.md#playtime-limits-enabled) - Turn limit enforcement on or off
- [`daily`](../core/config.md#daily) - Daily time limit
- [`session`](../core/config.md#session) - Session time limit
- [`session_reset`](../core/config.md#session_reset) - Cooldown period between sessions
- [`warnings`](../core/config.md#warnings) - Warning intervals
- [`retention`](../core/config.md#retention) - History retention period

Example configuration:

```toml
[playtime.limits]
enabled = true
daily = "2h"
session = "45m"
session_reset = "20m"
warnings = ["10m", "5m", "2m", "1m"]
```

## How it works

### Sessions

A session is a continuous period of gaming. Playtime accumulates across multiple games within the same session.

A session has three states:

1. **Active** - A game is running and time is being tracked.
2. **Cooldown** - The game was stopped, but cumulative time is preserved for the `session_reset` duration. Starting another game continues the same session.
3. **Reset** - The cooldown expired and cumulative time is cleared to 0. The next game starts a new session.

Here is a typical session that stays under the limit:

```text
12:00 - Launch Mario Kart (session starts, Active)
12:30 - Stop Mario Kart (Cooldown begins, cumulative: 30m)
12:35 - Launch Sonic (session continues, Cooldown becomes Active, cumulative: 30m)
13:00 - Stop Sonic (Cooldown begins, cumulative: 55m)
13:25 - Cooldown expires (25 min > 20 min timeout, session resets to 0)
13:30 - Launch Zelda (new session starts)
```

When a session limit is reached, the cooldown becomes the enforced break before the next session. With `session = "1h"` and the default `session_reset = "20m"`, that looks like this:

```text
12:00 - Launch game (session starts)
13:00 - Session limit reached, game stopped (cumulative: 1h)
13:05 - Try to launch another game: blocked (still in cooldown, limit reached)
13:20 - Cooldown expires (session resets to 0)
13:21 - Launch game: allowed (new session starts)
```

The `session_reset` value controls the break between sessions. After hitting the limit, you have to wait for the cooldown to expire before starting another session. Setting `session_reset = "0"` disables the automatic reset, so the same session remains in cooldown until limits are changed, disabled, or Core restarts.

### Daily limits

Daily limits reset at midnight in your local timezone. The total includes all sessions from the current calendar day.

### When limits are reached

When a limit is getting close, warnings are sent to the [Zaparoo App](../app/index.md) and played through Core's limit warning sound at the configured intervals. When the limit is reached, Core stops the active game and blocks new media launches until the limit resets.

If less than 1 minute remains, the launch is blocked entirely.

## Example configurations

### Basic parental control

Limit kids to 1 hour per day:

```toml
[playtime.limits]
enabled = true
daily = "1h"
```

### Session-based limits

Allow 45-minute gaming sessions with 30-minute breaks:

```toml
[playtime.limits]
enabled = true
session = "45m"
session_reset = "30m"
```

### Combined daily and session

Set 2 hours per day, 1 hour per session, with custom warnings:

```toml
[playtime.limits]
enabled = true
daily = "2h"
session = "1h"
warnings = ["15m", "10m", "5m", "2m", "1m"]  # Optional: defaults are ["5m", "2m", "1m"]
```

## Runtime control

Limits can be toggled on and off through the Web UI or [API](../core/api/methods.md#settingsplaytimelimitsupdate) without restarting Core.

Disabling limits resets the current session and clears cooldown timers. Daily usage history is kept. Re-enabling starts a fresh session, but daily usage from history still counts toward the daily limit.

## Data retention

Playtime history is kept for 365 days by default. Old records are cleaned up automatically.

To change retention:

```toml
[playtime]
retention = 90  # Keep 90 days of history
```

Set to `0` to keep all history forever:

```toml
[playtime]
retention = 0
```

## Platform support

Playtime tracking works on supported platforms, but accuracy depends on how well Core can detect when media starts and stops. MiSTer and Batocera currently have the most accurate game detection. Other platforms are still improving.

Warnings are sent to the Zaparoo App and played through Core's configured limit warning sound.

## Troubleshooting

### Limits not enforcing

1. Check that `enabled = true` is set in `config.toml`
2. Check that daily/session values are valid duration strings
3. Restart Core after changing config (or use the Web UI, which applies changes immediately)
4. Enable debug logging to see limit check messages

### Warnings not appearing

1. Check that the `warnings` array is configured in [`config.toml`](../core/config.md#warnings)
2. Make sure [audio feedback](../core/config.md#scan_feedback) is enabled
3. Check the Zaparoo App is connected to receive notifications

### Time tracking inaccurate

1. Playtime is tracked from media start and stop events. If Core cannot detect those events reliably on your platform, the recorded time may be wrong.
2. Changing the system clock can affect daily limits. Session limits are more reliable because they are based on elapsed session time.
3. On MiSTer, game tracking requires `recents=1` in `MiSTer.ini`. Without it, games launched from the MiSTer menu are not detected. See [MiSTer game tracking](../platforms/mister/index.md#game-tracking) for setup instructions.

### Session not resetting

Check your [`session_reset`](../core/config.md#session_reset) timeout value. If it is set to `"0"`, sessions never reset automatically.
