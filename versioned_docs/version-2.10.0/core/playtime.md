# Playtime

Zaparoo can track how long games are played and enforce time limits. You can set daily caps, per-session caps, or both, and get warnings before limits are reached.

## Setup

### Quick setup (Web UI)

1. Open the Web UI (default: `http://your-device:7497/app/`)
2. Go to Settings → Playtime Limits
3. Enable limits and set your desired daily/session times
4. Save settings

### Manual configuration

See the [Config File Reference](./config.md#playtime) for detailed configuration options including:

- [`enabled`](./config.md#enabled-1) - Turn limits on/off
- [`daily`](./config.md#daily) - Daily time limit
- [`session`](./config.md#session) - Session time limit
- [`session_reset`](./config.md#session_reset) - Cooldown period between sessions
- [`warnings`](./config.md#warnings) - Warning intervals
- [`retention`](./config.md#retention) - History retention period

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

Here's a typical flow (under limit):

```
12:00 - Launch Mario Kart (session starts, Active)
12:30 - Stop Mario Kart (Cooldown begins, cumulative: 30m)
12:35 - Launch Sonic (session continues, still Cooldown → Active, cumulative: 30m)
13:00 - Stop Sonic (Cooldown begins, cumulative: 55m)
13:25 - Cooldown expires (25 min > 20 min timeout, session resets to 0)
13:30 - Launch Zelda (new session starts)
```

And when a session limit is reached (e.g., `session = "1h"`):

```
12:00 - Launch game (session starts)
13:00 - Session limit reached, game stopped (cumulative: 1h)
13:05 - Try to launch another game → BLOCKED (still in cooldown, limit reached)
13:20 - Cooldown expires (session resets to 0)
13:21 - Launch game → ALLOWED (new session starts)
```

The `session_reset` value controls the break between sessions. After hitting the limit, you have to wait for the cooldown to expire before starting a new session.

### Daily limits

Daily limits reset at midnight (00:00) in your local timezone. The total includes all sessions from the current calendar day.

### When limits are reached

When a limit is hit, warnings are sent to the Zaparoo App and played as audio at the configured intervals. Then the game is stopped and new launches are blocked until limits reset.

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

45-minute gaming sessions with 30-minute breaks:

```toml
[playtime.limits]
enabled = true
session = "45m"
session_reset = "30m"
```

### Combined daily and session

2 hours per day, 1 hour max per session, with custom warnings:

```toml
[playtime.limits]
enabled = true
daily = "2h"
session = "1h"
warnings = ["15m", "10m", "5m", "2m", "1m"]  # Optional: defaults are ["5m", "2m", "1m"]
```

## Runtime control

Limits can be toggled on and off through the Web UI or API without restarting Core.

Disabling limits resets the current session and clears cooldown timers. Daily usage history is kept. Re-enabling starts a fresh session, but daily usage from history is still enforced.

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

Playtime tracking works on all platforms, but accuracy depends on game tracking support. MiSTer and Batocera have the most accurate game detection. Other platforms are being improved.

Warnings are sent to the Zaparoo App and played as audio on all platforms.

## Troubleshooting

### Limits not enforcing

1. Check `enabled = true` is set in config
2. Check that daily/session values are valid duration strings
3. Restart Core after changing config (or use the Web UI, which applies changes immediately)
4. Enable debug logging to see limit check messages

### Warnings not appearing

1. Check `warnings` array is configured in [config.toml](./config.md#warnings)
2. Make sure [audio feedback](./config.md#scan_feedback) is enabled
3. Check the Zaparoo App is connected to receive notifications

### Time tracking inaccurate

1. If your device goes to sleep during gameplay, sleep time may be counted as playtime since tracking is wall-clock based.
2. Changing the system clock backward can bypass limits.
3. On MiSTer, game tracking requires `recents=1` in `MiSTer.ini`. Without it, games launched from the MiSTer menu are not detected. See [MiSTer Game Tracking](../platforms/mister/index.md#game-tracking) for setup instructions.

### Session not resetting

Check your [`session_reset`](./config.md#session_reset) timeout value. If set to `"0"`, sessions never reset automatically.
