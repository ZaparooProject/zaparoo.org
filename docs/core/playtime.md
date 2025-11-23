# Playtime

Playtime tracking and limits provide parental controls and time management for gaming sessions. Set daily time limits, track gaming sessions, and automatically enforce limits with grace period notifications.

## Features

- **Daily limits**: Cap total playtime per day
- **Session limits**: Cap playtime per gaming session
- **Configurable warnings**: Get notified before hitting limits
- **Session tracking**: Automatic session detection with configurable reset timeout
- **Runtime control**: Enable/disable limits on the fly

## Setup

:::note Web UI Only
Playtime limit configuration is currently only available in the bundled Web UI. You can also manually configure limits in the config file as shown below.
:::

### Quick Setup (Web UI)

1. Open the Web UI (default: `http://your-device:7497/app/`)
2. Go to Settings → Playtime Limits
3. Enable limits and set your desired daily/session times
4. Save settings

### Manual Configuration

See the [Config File Reference](/docs/core/config#playtime) for detailed configuration options including:

- [`enabled`](/docs/core/config#enabled-3) - Turn limits on/off
- [`daily`](/docs/core/config#daily) - Daily time limit
- [`session`](/docs/core/config#session) - Session time limit
- [`session_reset`](/docs/core/config#session_reset) - Cooldown period between sessions
- [`warnings`](/docs/core/config#warnings) - Warning intervals
- [`retention`](/docs/core/config#retention) - History retention period

Example configuration:

```toml
[playtime.limits]
enabled = true
daily = "2h"
session = "45m"
session_reset = "20m"
warnings = ["10m", "5m", "2m", "1m"]
```

## How It Works

### Sessions

A **session** is a continuous period of gaming. Sessions track cumulative playtime across multiple games and enforce mandatory breaks when limits are reached.

**Session States:**

1. **Active**: Game is running, time is being tracked
2. **Cooldown**: Game stopped, cumulative time preserved for `session_reset` duration
3. **Reset**: No active session, cumulative time cleared to 0

**Normal Session Flow** (under limit):

```
12:00 - Launch Mario Kart (session starts, Active)
12:30 - Stop Mario Kart (Cooldown begins, cumulative: 30m)
12:35 - Launch Sonic (session continues, still Cooldown → Active, cumulative: 30m)
13:00 - Stop Sonic (Cooldown begins, cumulative: 55m)
13:25 - Cooldown expires (25 min > 20 min timeout, session resets to 0)
13:30 - Launch Zelda (new session starts)
```

**When Session Limit is Reached** (e.g., `session = "1h"`):

```
12:00 - Launch game (session starts)
13:00 - Session limit reached, game stopped (cumulative: 1h)
13:05 - Try to launch another game → BLOCKED (still in cooldown, limit reached)
13:20 - Cooldown expires (session resets to 0)
13:21 - Launch game → ALLOWED (new session starts)
```

The `session_reset` timeout creates an **enforced break period** between sessions. After hitting the session limit, you must wait for the cooldown to expire before starting a new session.

### Daily Limits

Daily limits reset at midnight (00:00) in your local timezone. The total time includes all gaming sessions from the current calendar day.

### When Limits Are Reached

When a limit is hit:

1. **Warning notifications**: Sent to the Zaparoo App and played as audio at configured intervals before the limit
2. **Automatic stop**: Game is stopped when the limit is reached
3. **Launch blocking**: New games cannot be launched until limits reset

If you try to launch a game with less than 1 minute remaining, the launch will be blocked entirely (minimum viable session protection).

## Example Configurations

### Basic Parental Control

Limit kids to 1 hour per day:

```toml
[playtime.limits]
enabled = true
daily = "1h"
```

### Session-Based Limits

Enforce 45-minute gaming sessions with 30-minute breaks:

```toml
[playtime.limits]
enabled = true
session = "45m"
session_reset = "30m"
```

### Combined Daily and Session

2 hours per day, 1 hour max per session, with custom warnings:

```toml
[playtime.limits]
enabled = true
daily = "2h"
session = "1h"
warnings = ["15m", "10m", "5m", "2m", "1m"]  # Optional: defaults are ["5m", "2m", "1m"]
```

## Runtime Control

Playtime limits can be enabled or disabled at runtime via the Web UI or API without restarting Core.

**Disabling limits**:

- Resets the current session completely
- Clears cooldown timers
- Daily usage history is preserved

**Re-enabling limits**:

- Starts a fresh session
- Daily usage from history is still enforced
- Previous day's history remains intact

## Data Retention

By default, playtime history is kept for 365 days (1 year). Old records are automatically cleaned up.

To change retention:

```toml
[playtime]
retention = 90  # Keep 90 days of history
```

Set to `0` to disable cleanup (keep all history forever):

```toml
[playtime]
retention = 0
```

## Platform Support

Playtime limits are supported on all platforms, but accuracy depends on the platform's game tracking support. **MiSTer** and **Batocera** have the most accurate active game detection, while other platforms are being improved.

Warnings are sent as notifications to the Zaparoo App and played as audio feedback on all platforms.

## Troubleshooting

### Limits Not Enforcing

1. Verify `enabled = true` is set in config
2. Check that daily/session values are valid duration strings
3. Restart Core after changing config (or use Web UI which applies changes immediately)
4. Enable debug logging to see limit check messages

### Warnings Not Appearing

1. Check `warnings` array is configured in [config.toml](/docs/core/config#warnings)
2. Ensure [audio feedback](/docs/core/config#scan_feedback) is enabled
3. Verify the Zaparoo App is connected to receive notifications

### Time Tracking Inaccurate

**Known limitations**:

1. **System sleep/hibernate**: If your device goes to sleep during gameplay, sleep time may be counted as playtime (wall-clock based)
2. **Manual clock changes**: Changing the system clock backward can bypass limits

These are known edge cases that may be addressed in future releases.

### Session Not Resetting

Check your [`session_reset`](/docs/core/config#session_reset) timeout value. If set to `"0"`, sessions never reset automatically.
