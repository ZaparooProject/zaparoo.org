---
sidebar_position: 6
toc_max_heading_level: 5
description: "Zaparoo Core config.toml reference for [profiles] and [playtime]: device profiles, switch cards, playtime limits, warnings, and session resets."
keywords: [zaparoo profiles config, zaparoo playtime limits config, playtime.limits, device profiles toml]
---

# Profiles and Playtime Config

Part of the [config file reference](./index.md). Keys are shown with their type and default, followed by what they do and an example.

## Profiles

```toml
[profiles]
require_for_launch = false
swap_data = true
```

The `profiles` section configures device-wide [profile behavior](../../features/profiles.md). Profile names, roles, PINs, and limit overrides are stored in Core's user database rather than this file.

### require_for_launch

| Key                | Type    | Default |
| ------------------ | ------- | ------- |
| require_for_launch | boolean | false   |

`require_for_launch` blocks media launches while the device is using the shared profile. Profile switching and non-launch ZapScript commands continue to work. A script that switches profiles before its launch command can still launch in one scan.

```toml
[profiles]
require_for_launch = true
```

### swap_data

| Key       | Type    | Default |
| --------- | ------- | ------- |
| swap_data | boolean | true    |

`swap_data` lets supported platforms activate profile-owned data when profiles change. MiSTer currently uses it to separate save files and save states. Other platforms ignore it. Set it to `false` to use shared data locations for every profile.

```toml
[profiles]
swap_data = false
```

Restart Core after changing `swap_data` manually to reconcile the active data mounts.

## Playtime

```toml
[playtime]
retention = 365
sync = false
base_url = "https://api.zaparoo.com"

[playtime.limits]
enabled = true
daily = "2h"
session = "45m"
session_reset = "20m"
warnings = ["10m", "5m", "2m", "1m"]
```

The `playtime` section configures playtime tracking, limits, and parental controls.

See the [Play Controls documentation](../../features/play-controls.md#playtime-limits) for detailed information and examples.

### retention

| Key       | Type    | Default |
| --------- | ------- | ------- |
| retention | integer | 365     |

`retention` specifies how many days of playtime history to keep. Old records are automatically cleaned up.

```toml
[playtime]
retention = 90  # Keep 90 days
```

Set to `0` to keep all history forever (disables cleanup).

When play history sync is enabled and the device is linked, cleanup preserves local sessions until the server acknowledges them.

### base_url

| Key      | Type   | Default                     |
| -------- | ------ | --------------------------- |
| base_url | string | `"https://api.zaparoo.com"` |

`base_url` selects the API service used for play history sync. It is independent of [`backup.remote.base_url`](./index.md#backup), so custom backup and play history services can use different endpoints.

Keep `base_url` at its default unless you use a custom service. Core uses the linked credential stored for the endpoint's scheme and host. Public services must use HTTPS; plain HTTP is accepted only for localhost, private IP addresses, and link-local development endpoints.

### sync

| Key  | Type    | Default |
| ---- | ------- | ------- |
| sync | boolean | false   |

`sync` records explicit consent to upload play history to a linked Zaparoo Online account. Linking an account does not enable it. The first sync includes retained local history.

```toml
[playtime]
sync = true
```

You can also change this setting under **Settings > Online** in the terminal UI. See [Play history sync](../../online/index.md#play-history-sync) for the data included and how disabling sync behaves.

### playtime.limits

`playtime.limits` is a sub-section of `playtime` and must be defined with the header: `[playtime.limits]`

#### enabled {#playtime-limits-enabled}

| Key     | Type    | Default |
| ------- | ------- | ------- |
| enabled | boolean | false   |

`enabled` turns playtime limit enforcement on or off.

```toml
[playtime.limits]
enabled = true
```

#### daily

| Key   | Type     | Default |
| ----- | -------- | ------- |
| daily | duration | none    |

`daily` sets the maximum total playtime per calendar day (resets at midnight).

```toml
[playtime.limits]
daily = "2h"      # 2 hours per day
daily = "1h30m"   # 1 hour 30 minutes
```

Omit or leave empty to disable daily limits.

#### session

| Key     | Type     | Default |
| ------- | -------- | ------- |
| session | duration | none    |

`session` sets the maximum playtime per gaming session.

```toml
[playtime.limits]
session = "45m"   # 45 minutes per session
session = "1h"    # 1 hour per session
```

Omit or leave empty to disable session limits.

#### session_reset

| Key           | Type     | Default |
| ------------- | -------- | ------- |
| session_reset | duration | `"20m"` |

`session_reset` sets the enforced break time between sessions. After a game stops, cumulative playtime is preserved during this period. If another game launches within this timeout and the session limit hasn't been reached, the session continues. However, if the session limit was reached, new launches are blocked until this timeout expires and the session fully resets.

```toml
[playtime.limits]
session_reset = "20m"  # 20-minute break before new session (default)
session_reset = "1h"   # 1-hour break before new session
session_reset = "0"    # Never reset sessions automatically
```

This creates a mandatory cooldown period between sessions when limits are enforced.

#### warnings

| Key      | Type       | Default              |
| -------- | ---------- | -------------------- |
| warnings | duration[] | `["5m", "2m", "1m"]` |

`warnings` sets the time-remaining intervals when warnings should be triggered.

```toml
[playtime.limits]
warnings = ["10m", "5m", "2m", "1m"]
```

Warnings are sent as notifications to the Zaparoo App and played as audio feedback.
