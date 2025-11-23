# Playtime Limits

Playtime limits provide parental controls and time management for gaming sessions. Set daily time limits, track gaming sessions, and automatically enforce limits with grace period notifications.

## Features

- **Daily limits**: Cap total playtime per day
- **Session limits**: Cap playtime per gaming session
- **Configurable warnings**: Get notified before hitting limits
- **Grace period**: Notifications before games are automatically stopped
- **Session tracking**: Automatic session detection with configurable reset timeout
- **Runtime control**: Enable/disable limits on the fly
- **History tracking**: View playtime history and statistics

## Setup

:::note Web UI Only
Playtime limit configuration is currently only available in the bundled Web UI. You can also manually configure limits in the config file as shown below.
:::

### Quick Setup (Web UI)

1. Open the Web UI (default: `http://your-device:7497`)
2. Go to Settings → Playtime Limits
3. Enable limits and set your desired daily/session times
4. Configure warnings if desired
5. Save settings

### Manual Configuration

Add this to your `config.toml`:

```toml
[playtime.limits]
enabled = true
daily = "2h"           # 2 hours per day
session = "45m"        # 45 minutes per session
session_reset = "20m"  # Session resets after 20 minutes idle
warnings = ["10m", "5m", "2m", "1m"]  # Warning intervals
```

## Configuration Options

### enabled

| Key     | Type    | Default |
| ------- | ------- | ------- |
| enabled | boolean | false   |

Enable or disable playtime limit enforcement.

```toml
[playtime.limits]
enabled = true
```

### daily

| Key   | Type     | Default |
| ----- | -------- | ------- |
| daily | duration | none    |

Maximum total playtime per calendar day. Uses Go duration format.

Examples:

```toml
daily = "1h30m"    # 1 hour 30 minutes
daily = "2h"       # 2 hours
daily = "90m"      # 90 minutes (same as 1h30m)
```

Leave empty or omit to disable daily limits.

### session

| Key     | Type     | Default |
| ------- | -------- | ------- |
| session | duration | none    |

Maximum playtime per gaming session.

Examples:

```toml
session = "45m"    # 45 minutes per session
session = "1h"     # 1 hour per session
```

Leave empty or omit to disable session limits.

### session_reset

| Key           | Type     | Default     |
| ------------- | -------- | ----------- |
| session_reset | duration | `"20m"`     |

How long to wait after a game stops before the session resets. If another game is launched within this timeout, the session continues and cumulative time carries over.

Examples:

```toml
session_reset = "20m"  # Reset after 20 minutes idle (default)
session_reset = "1h"   # Reset after 1 hour idle
session_reset = "0"    # Never reset (session persists all day)
```

### warnings

| Key      | Type       | Default                |
| -------- | ---------- | ---------------------- |
| warnings | []duration | `["5m", "2m", "1m"]`   |

Time-remaining intervals when warnings should be displayed. Warnings are shown both as on-screen notifications (on platforms that support them) and via audio feedback.

Examples:

```toml
warnings = ["10m", "5m", "2m", "1m"]  # Warn at 10, 5, 2, and 1 minute remaining
warnings = ["5m"]                     # Only warn at 5 minutes
warnings = []                         # Disable warnings
```

Warnings are sorted automatically from longest to shortest.

## How It Works

### Sessions

A **session** is a continuous period of gaming. Here's how sessions work:

1. **Session starts**: You launch a game
2. **Session continues**: You launch another game within the `session_reset` timeout
3. **Session ends**: No game is launched for longer than `session_reset` timeout

Example timeline with `session_reset = "20m"`:

```
12:00 - Launch Mario Kart (session starts)
12:30 - Stop Mario Kart (session in cooldown)
12:35 - Launch Sonic (session continues, 5 min < 20 min timeout)
13:00 - Stop Sonic (session in cooldown)
13:25 - Timeout reached, session resets (25 min > 20 min timeout)
13:30 - Launch Zelda (new session starts)
```

### Daily Limits

Daily limits reset at midnight (00:00) in your local timezone. The total time includes all gaming sessions from the current calendar day.

### When Limits Are Reached

When a limit is hit:

1. **Warning notifications**: Displayed at configured intervals before the limit
2. **Grace period**: One final warning when the limit is reached
3. **Automatic stop**: Game is stopped if still running after grace period
4. **Launch blocking**: New games cannot be launched until limits reset

If you try to launch a game with less than 1 minute remaining, the launch will be blocked entirely (minimum viable session protection).

## Example Configurations

### Basic Parental Control

Limit kids to 1 hour per day:

```toml
[playtime.limits]
enabled = true
daily = "1h"
warnings = ["10m", "5m", "1m"]
```

### Session-Based Limits

Enforce 45-minute gaming sessions with 30-minute breaks:

```toml
[playtime.limits]
enabled = true
session = "45m"
session_reset = "30m"
warnings = ["10m", "5m"]
```

### Combined Daily and Session

2 hours per day, 1 hour max per session:

```toml
[playtime.limits]
enabled = true
daily = "2h"
session = "1h"
session_reset = "20m"
warnings = ["15m", "10m", "5m", "2m", "1m"]
```

### Gentle Reminders (No Enforcement)

Track time but don't enforce limits (warnings only):

```toml
[playtime.limits]
enabled = true
# No daily or session limits set
warnings = ["2h", "1h", "30m"]  # Just friendly reminders
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

## Viewing Playtime History

:::note Web UI Only
Playtime history viewing is currently only available in the bundled Web UI.
:::

The Web UI provides:

- Total playtime today
- Current session time
- Remaining time (daily and session)
- Playtime history graphs and statistics
- Per-game playtime breakdown

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

Playtime limits work on all platforms:

| Platform  | Supported | Notifications     | Auto-stop |
| --------- | --------- | ----------------- | --------- |
| MiSTer    | ✅        | On-screen + Audio | ✅        |
| Windows   | ✅        | Audio only        | ✅        |
| Linux     | ✅        | Audio only        | ✅        |
| macOS     | ✅        | Audio only        | ✅        |
| Batocera  | ✅        | Audio only        | ✅        |
| SteamOS   | ✅        | Audio only        | ✅        |

On-screen notifications are currently MiSTer-only, but all platforms support audio feedback warnings.

## Troubleshooting

### Limits Not Enforcing

1. Verify `enabled = true` is set in config
2. Check that daily/session values are valid duration strings
3. Restart Core after changing config (or use Web UI which applies changes immediately)
4. Enable debug logging to see limit check messages

### Warnings Not Appearing

1. Check `warnings` array is configured
2. Ensure [audio feedback](/docs/core/config#scan_feedback) is enabled
3. On MiSTer, verify on-screen display (OSD) is working

### Time Tracking Inaccurate

**Known limitations**:

1. **System sleep/hibernate**: If your device goes to sleep during gameplay, sleep time may be counted as playtime (wall-clock based)
2. **Manual clock changes**: Changing the system clock backward can bypass limits

These are known edge cases that may be addressed in future releases.

### Session Not Resetting

Check your `session_reset` timeout value:

```toml
session_reset = "20m"  # 20 minutes (default)
```

If set to `"0"`, sessions never reset automatically.

## API Methods

The playtime limits system exposes these API methods:

- `playtime.getStatus` - Get current session state and limits
- `playtime.setEnabled` - Enable/disable limits at runtime
- `playtime.getHistory` - Retrieve playtime history

See the [API documentation](/docs/core/api/) for details.

## Privacy Note

Playtime history is stored locally in the Zaparoo Core database on your device. No playtime data is ever sent to external services or the internet. History can be cleared by deleting the user database or adjusting the retention period.

## See Also

- [Config File Reference](/docs/core/config) - Full configuration options
- [Web UI Documentation](/docs/core/web-ui) - Managing limits via Web UI
- [API Methods](/docs/core/api/methods) - Programmatic control of limits
