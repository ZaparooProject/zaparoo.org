---
description: "Zaparoo Launch Guard: prevent accidental game switches by requiring a deliberate second scan before switching from active media."
keywords: [zaparoo launch guard, accidental launch protection, zaparoo hold mode, token scan guard]
---

# Launch Guard

Launch guard protects your active game session from accidental token scans. When enabled, tokens scanned while media is playing are *staged* first. A second deliberate action is required before the game switches.

## Setup

Launch guard is configured in `config.toml`. There is no Web UI for this feature yet.

Add a `[readers.scan.launch_guard]` section with at minimum:

```toml
[readers.scan.launch_guard]
enabled = true
```

See the [Config File Reference](../core/config.md#launch-guard-config) for all options:

- [`enabled`](../core/config.md#launch-guard-enabled) — turn launch guard on or off
- [`timeout`](../core/config.md#launch-guard-timeout) — how long a staged token waits for confirmation (default: 15 seconds)
- [`delay`](../core/config.md#launch-guard-delay) — mandatory cool-down before re-tap confirmation is accepted
- [`require_confirm`](../core/config.md#launch-guard-require-confirm) — disable re-tap; require the API `confirm` method instead

## How it works

### What gets staged

Launch guard only activates when media is currently playing. If nothing is playing, all tokens launch as normal.

Not all tokens are staged, only those whose ZapScript would disrupt the active session. That includes any `launch`, `playlist.*`, or `stop` command. Utility commands like `input.keyboard`, `http.get`, `coin.insert`, and similar pass through immediately without staging. If a token's script can't be parsed, it's staged conservatively.

### The staging flow

When a disrupting token is staged:

1. A pending sound plays and a [`tokens.staged`](../core/api/notifications.md) notification is sent with the token's details.
2. A timeout timer starts (default 15 seconds). If no confirmation arrives before it expires, the staged token is silently dropped.
3. If a `delay` is configured, re-tap confirmation is blocked until the delay expires. Re-tapping the same card during this window resets both timers, so confirmation is not accepted until the full delay passes. When the delay expires, a ready sound plays and a [`tokens.staged.ready`](../core/api/notifications.md) notification is sent.

If a different disrupting token is scanned while one is already staged, it replaces the staged token and the timers restart from scratch.

### Confirming a staged token

Once the delay (if any) has passed, re-tap the same card to confirm and launch. Tapping a different card replaces the staged token instead.

The API [`confirm`](../core/api/methods.md#confirm) method also confirms and launches the staged token. It bypasses the delay, so it works well for physical buttons and automation.

### API-only mode

Setting `require_confirm = true` disables re-tap confirmation entirely. The staged token can only be launched via the API `confirm` method. This is useful if you want a physical button or custom app to be the sole confirmation path.

```toml
[readers.scan.launch_guard]
enabled = true
require_confirm = true
```

## Example configurations

### Default (re-tap to confirm)

```toml
[readers.scan.launch_guard]
enabled = true
```

15-second timeout, no delay, re-tap the same card to confirm.

### Cool-down before re-tap

```toml
[readers.scan.launch_guard]
enabled = true
timeout = 30
delay = 5
```

Token is staged for up to 30 seconds. Re-tap confirmation is blocked for the first 5 seconds; tapping during that window resets both timers.

### API/button-only confirmation

```toml
[readers.scan.launch_guard]
enabled = true
require_confirm = true
```

Re-tap does nothing; only the `confirm` API method can launch a staged token.

### Indefinite staging

```toml
[readers.scan.launch_guard]
enabled = true
timeout = -1
```

The staged token waits indefinitely until confirmed, replaced by another scan, or cleared when media stops.

## API and notifications

The [`confirm`](../core/api/methods.md#confirm) method launches the currently staged token and bypasses the delay. It returns an error if nothing is staged.

The [`tokens.staged`](../core/api/notifications.md) and [`tokens.staged.ready`](../core/api/notifications.md) notifications carry the staged token's details (type, UID, text, scan time) and can be used to drive external UI or automation.

A reference implementation using an LED and momentary switch on Raspberry Pi GPIO is available at [`scripts/examples/launch_guard_gpio.py`](https://github.com/ZaparooProject/zaparoo-core/blob/main/scripts/examples/launch_guard_gpio.py) in the zaparoo-core repo. It connects to Zaparoo over the network, listens for `tokens.staged` events, and calls `confirm` when the button is pressed.
