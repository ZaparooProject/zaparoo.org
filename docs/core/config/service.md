---
sidebar_position: 5
toc_max_heading_level: 5
description: "Zaparoo Core config.toml reference for [service]: API port, encryption and pairing, allowed origins, discovery, device ID, online_base_url, remote control, publishers, and the auth.toml credentials file."
keywords: [zaparoo service config, zaparoo encryption, allowed_origins, zaparoo api port, auth.toml, zaparoo publishers config, remote_control, online_base_url]
---

# Service Config and Auth File

Part of the [config file reference](./index.md). Keys are shown with their type and default, followed by what they do and an example.

## Service

```toml
[service]
api_port = 7497
api_listen = "0.0.0.0"
on_boot = "**execute:/media/fat/zaparoo/scripts/on-boot.sh"
on_ready = "**execute:/media/fat/zaparoo/scripts/on-ready.sh"
allowed_ips = [
    "192.168.1.100",
    "192.168.1.0/24"
]
encryption = false
device_id = '4d01c19f-09ba-4871-a58a-82fb49f5b518'
allowed_origins = [
    'zaparoo.example.lan'
]
allow_run = [
    '\*\*launch\.random:.+'
]
online_base_url = "https://api.zaparoo.com"

[service.remote_control]
enabled = false

[[service.publishers.mqtt]]
enabled = true
broker = "mqtt://localhost:1883"
topic = "zaparoo/events"
filter = [
    "media.started",
    "media.stopped",
    "tokens.added"
]
```

### api_port

| Key      | Type                 | Default |
| -------- | -------------------- | ------- |
| api_port | integer (1024-65535) | 7497    |

`api_port` specifies which port the [API](../api/index.md) of Core should be accessible from.

**Don't change this unless you know what you're doing. It will currently break external tools that rely on it being the default value.**

### on_boot

| Key     | Type   | Default |
| ------- | ------ | ------- |
| on_boot | string |         |

`on_boot` is a [hook](../../features/hooks.md#service-startup-hooks) containing a snippet of [ZapScript](../../zapscript/index.md). It runs after Core initializes, only on the first Core start for the current operating system boot.

```toml
[service]
on_boot = "**execute:/media/fat/zaparoo/scripts/on-boot.sh"
```

If Core cannot detect boot state, `on_boot` is skipped and a warning is logged.

### on_ready

| Key      | Type   | Default |
| -------- | ------ | ------- |
| on_ready | string |         |

`on_ready` is a [hook](../../features/hooks.md#service-startup-hooks) containing a snippet of [ZapScript](../../zapscript/index.md). It runs after Core initializes on every service start. On platforms that report service readiness, Core waits for that readiness signal first.

```toml
[service]
on_ready = "**execute:/media/fat/zaparoo/scripts/on-ready.sh"
```

### api_listen

| Key        | Type   | Default     |
| ---------- | ------ | ----------- |
| api_listen | string | `"0.0.0.0"` |

`api_listen` specifies which network interface the API server should bind to.

```toml
[service]
api_listen = "127.0.0.1"  # Localhost only
```

Common values:

- `"0.0.0.0"` - Listen on all network interfaces (default, allows remote connections)
- `"127.0.0.1"` - Localhost only (blocks all remote connections)
- Specific IP address - Bind to a specific network interface

Use `"127.0.0.1"` if you only want local access to the API and Web UI.

### allowed_ips

| Key         | Type     | Default |
| ----------- | -------- | ------- |
| allowed_ips | string[] | []      |

`allowed_ips` creates an IP allowlist for remote HTTP API access. Localhost is always allowed. When this list is empty, remote HTTP and REST API requests are blocked by default.

WebSocket API routes are not controlled by `allowed_ips`. They use API key authentication when API keys are configured, or [paired-client encryption](../api/encryption.md) when [`encryption`](#encryption) is enabled.

```toml
[service]
allowed_ips = [
    "192.168.1.100",           # Single IP
    "192.168.1.0/24",          # CIDR range (entire subnet)
    "10.0.0.0/8",              # Large CIDR range
    "2001:db8::1",             # IPv6 address
    "2001:db8::/32"            # IPv6 CIDR range
]
```

Supports:

- Individual IPv4 addresses (e.g., `"192.168.1.100"`)
- Individual IPv6 addresses (e.g., `"2001:db8::1"`)
- CIDR ranges for IPv4 (e.g., `"192.168.1.0/24"`)
- CIDR ranges for IPv6 (e.g., `"2001:db8::/32"`)

**Empty list (default)**: Localhost only for HTTP and REST API requests

Port numbers in IP addresses are automatically stripped during matching.

### device_id

| Key       | Type          | Default                    |
| --------- | ------------- | -------------------------- |
| device_id | string (UUID) | _generated at first start_ |

`device_id` is a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) that is used to uniquely identify the instance of the Core service running on a host device.

Core uses it to link the device to a [Zaparoo Online](../../online/index.md) account, to spread update checks across devices, to name the device in discovery when it has no instance name and no hostname, and as the device identifier in cloud backups and error reports. **It should not be changed once set.** A restored backup keeps the original value.

### allowed_origins

| Key             | Type     | Default |
| --------------- | -------- | ------- |
| allowed_origins | string[] | []      |

`allowed_origins` adds browser origins that are allowed to reach the Core API. An origin is the scheme, host and port a page was loaded from, like `http://zaparoo.example.lan:7497`. Browsers attach it to cross-origin API requests and to every WebSocket connection, and Core rejects any origin it doesn't recognize.

You need this when you reach the [Web UI](../../app/web.md) or the API through a name Core doesn't already know about, such as a hostname from your router or DNS server, a VPN address, or a reverse proxy.

#### What Core allows on its own

- `http://localhost` and `https://localhost`, with and without the API port
- `http://127.0.0.1` and `https://127.0.0.1` on the API port
- Every private IPv4 address currently assigned to the device, on the API port. This is rechecked on each request, so an address that only appears after Core starts still works.
- The device's own hostname and its mDNS `.local` name, over HTTP and HTTPS, with and without the API port. A device called `mister` covers `http://mister:7497` and `http://mister.local:7497`.
- The [Zaparoo App](../../app/index.md) origins: `https://zaparoo.app` for the hosted web app, plus `capacitor://localhost` and `ionic://localhost` for the mobile builds

Everything else needs an entry. That includes IPv6 addresses, public IPv4 addresses, addresses outside the private ranges such as Tailscale's `100.64.0.0/10`, and any hostname you point at the device yourself.

Core won't trust a name just because it resolves to the device. If it did, any site you visited could publish a DNS record aimed at your device and drive Core from a browser tab, an attack called [DNS rebinding](https://en.wikipedia.org/wiki/DNS_rebinding). The allowlist is what stops it, so it stays explicit.

#### Entry formats

A bare hostname is the most forgiving form. It expands to four origins, covering HTTP and HTTPS with and without the API port:

```toml
[service]
allowed_origins = [
    'zaparoo.example.lan'
]
```

That one entry allows `http://zaparoo.example.lan`, `https://zaparoo.example.lan`, `http://zaparoo.example.lan:7497` and `https://zaparoo.example.lan:7497`.

Include a scheme and Core matches more narrowly:

| Entry                              | What it allows                                                     |
| ---------------------------------- | ------------------------------------------------------------------ |
| `zaparoo.example.lan`              | HTTP and HTTPS, with and without the API port                       |
| `http://zaparoo.example.lan`       | `http://zaparoo.example.lan` and `http://zaparoo.example.lan:7497`  |
| `https://zaparoo.example.lan:8443` | `https://zaparoo.example.lan:8443` and nothing else                 |
| `capacitor://localhost`            | Exactly as written, with no port variant added                      |

The port that matters is the one in the browser's address bar, not the one Core listens on. A reverse proxy serving `https://zaparoo.example.lan` on the default HTTPS port sends an origin with no port, so a bare hostname or `https://zaparoo.example.lan` covers it. If the proxy listens somewhere else, add that port explicitly.

Matching ignores case, and surrounding whitespace and a trailing `/` are trimmed from each entry. IPv6 literals need a scheme and square brackets, like `http://[fd12:3456::1]:7497`.

If the Web UI loads but never connects, see [Web UI troubleshooting](../../app/web.md#troubleshooting).

### encryption

| Key        | Type    | Default              |
| ---------- | ------- | -------------------- |
| encryption | boolean | _varies by platform_ |

`encryption` requires remote WebSocket API clients to use the [paired-client encryption flow](../api/encryption.md). Localhost connections are always allowed without encryption.

When the key is not set, Core uses the platform default: `true` on Linux, SteamOS, and Windows, `false` everywhere else. A value you set yourself is kept, including through a backup restore.

```toml
[service]
encryption = true
```

Paired clients can have admin or member permissions. Requiring encryption makes these restrictions enforceable because every remote client must identify itself through pairing. When encryption is off, MiSTer, Batocera, LibreELEC, and RePlayOS still let unpaired remote clients use the API; every other platform requires remote clients to pair or send an [API key](#api-keys) regardless. Manage pairing, roles, and this setting under **Settings > Clients** in the [terminal UI](../tui.md#managing-profiles).

### allow_run

| Key       | Type                      | Default |
| --------- | ------------------------- | ------- |
| allow_run | string[] (regex patterns) | []      |

`allow_run` explicitly allows [ZapScript](../../zapscript/index.md) to be run using the [run endpoint](../api/methods.md) of the [Core API](../api/index.md). By default, nothing is allowed.

Each entry is a [Regular Expression](https://github.com/google/re2/wiki/Syntax). Notes on usage here:

- Patterns are automatically anchored and must match the full command string. Characters `*` and `.` common in ZapScript must be escaped (e.g., `\*\*launch\.random:.*`).
- The input is parsed as ZapScript and each command is checked individually. All commands in a chained script must match, so a pattern like `\*\*launch\.random:.*` covers both `**launch.random:SNES` alone and `**launch.random:SNES||**launch.random:NES`.
- Plain file paths are normalized to a launch command before checking.
- When `allow_run` is configured, remote IPs can access run endpoints regardless of `allowed_ips`. The `allow_run` patterns still restrict which ZapScript can run.

### online_base_url

| Key             | Type   | Default                     |
| --------------- | ------ | --------------------------- |
| online_base_url | string | `"https://api.zaparoo.com"` |

`online_base_url` is the [Zaparoo Online](../../online/index.md) service Core talks to for account linking, cloud backup, play history sync, Library sync, and remote control. Leave it unset unless you run your own compatible server. A custom public server must use HTTPS; plain HTTP is accepted only for localhost, private IP addresses, and link-local development endpoints. An invalid value falls back to the official service.

```toml
[service]
online_base_url = "https://zaparoo.example.lan"
```

### service.discovery

`service.discovery` is a sub-section of `service` that configures mDNS network discovery.

```toml
[service.discovery]
enabled = true
instance_name = "Living Room MiSTer"
```

When enabled, Zaparoo advertises itself on your local network using mDNS/DNS-SD. Mobile apps and other clients can automatically find and connect to your Zaparoo instance without needing to enter IP addresses manually. Access Zaparoo using friendly `.local` addresses like `http://mister.local:7497`.

#### enabled {#service-discovery-enabled}

| Key     | Type    | Default |
| ------- | ------- | ------- |
| enabled | boolean | true    |

`enabled` enables or disables mDNS network discovery. When enabled, Zaparoo advertises a `_zaparoo._tcp` service on each active network interface.

#### instance_name

| Key           | Type   | Default              |
| ------------- | ------ | -------------------- |
| instance_name | string | _system hostname_    |

`instance_name` specifies a custom display name for this Zaparoo instance on the network. If not set, defaults to the system hostname.

### service.remote_control

`service.remote_control` is a sub-section of `service` that lets apps you authorize through the [Zaparoo Online User API](../../online/index.md#remote-control) send approved commands to this device. It is off by default, and linking a Zaparoo Online account does not turn it on.

```toml
[service.remote_control]
enabled = true
```

#### enabled {#service-remote-control-enabled}

| Key     | Type    | Default |
| ------- | ------- | ------- |
| enabled | boolean | false   |

`enabled` turns remote control on. Unlinking the device turns it off again. You can also change it under **Settings > Online** in the [terminal UI](../tui.md#backups-and-zaparoo-online).

### service.publishers

`service.publishers` is a sub-section of `service` that configures publishing Core events to external services.

#### service.publishers.mqtt

`service.publishers.mqtt` configures MQTT publishers for broadcasting Core events. See the [Publishers](../../features/publishers.md#mqtt) feature page for an overview. It's a sub-section that can be defined multiple times, and must have this header: `[[service.publishers.mqtt]]`

Pay attention to the double pairs of square brackets. Each defined MQTT publisher section must have its own header.

```toml
[[service.publishers.mqtt]]
enabled = true
broker = "mqtt://localhost:1883"
topic = "zaparoo/events"
filter = [
    "media.started",
    "media.stopped",
    "tokens.added"
]
```

##### enabled {#mqtt-publisher-enabled}

| Key     | Type    | Default |
| ------- | ------- | ------- |
| enabled | boolean | true    |

`enabled` turns this MQTT publisher on or off.

```toml
[[service.publishers.mqtt]]
enabled = false
```

##### broker {#mqtt-publisher-broker}

| Key    | Type   | Default |
| ------ | ------ | ------- |
| broker | string |         |

`broker` specifies the MQTT broker connection URL.

```toml
[[service.publishers.mqtt]]
broker = "mqtt://192.168.1.100:1883"
```

Supported URL schemes:
- `mqtt://` - Standard MQTT connection
- `mqtts://` or `ssl://` - MQTT over TLS/SSL

For TLS connections and authentication, see the MQTT reader's [auth.toml configuration](../../readers/mqtt.md#add-broker-credentials).

##### topic {#mqtt-publisher-topic}

| Key   | Type   | Default |
| ----- | ------ | ------- |
| topic | string |         |

`topic` specifies the MQTT topic to publish events to.

```toml
[[service.publishers.mqtt]]
topic = "home/zaparoo/events"
```

##### filter {#mqtt-publisher-filter}

| Key    | Type     | Default                  |
| ------ | -------- | ------------------------ |
| filter | string[] | [] (publish all events) |

`filter` limits which event types are published. When empty, all events are published.

```toml
[[service.publishers.mqtt]]
filter = [
    "media.started",
    "media.stopped",
    "tokens.added",
    "readers.added"
]
```

Available event types match the [Core API notification types](../api/notifications.md).

#### service.publishers.pixelcade

`service.publishers.pixelcade` configures [PixelCade](https://pixelcade.org) publishers that display game marquee artwork on PixelCade LED displays. See the [Publishers](../../features/publishers.md#pixelcade) feature page for an overview. It can be defined multiple times and must use this header: `[[service.publishers.pixelcade]]`

On `media.started`, the publisher sends a GET request to the PixelCade arcade endpoint, mapping the Zaparoo system ID to the matching PixelCade console folder.

```toml
[[service.publishers.pixelcade]]
enabled = true
host = "192.168.1.50"
port = 8080
mode = "stream"
filter = [
    "media.started"
]
```

##### enabled {#pixelcade-publisher-enabled}

| Key     | Type    | Default |
| ------- | ------- | ------- |
| enabled | boolean | true    |

`enabled` turns this PixelCade publisher on or off.

```toml
[[service.publishers.pixelcade]]
enabled = false
```

##### host {#pixelcade-publisher-host}

| Key  | Type   | Default |
| ---- | ------ | ------- |
| host | string |         |

`host` is the hostname or IP address of the PixelCade device. This field is required.

```toml
[[service.publishers.pixelcade]]
host = "192.168.1.50"
```

##### port {#pixelcade-publisher-port}

| Key  | Type    | Default |
| ---- | ------- | ------- |
| port | integer | 8080    |

`port` is the PixelCade HTTP API port.

##### mode {#pixelcade-publisher-mode}

| Key  | Type   | Default    |
| ---- | ------ | ---------- |
| mode | string | `"stream"` |

`mode` controls which PixelCade arcade endpoint is used when displaying marquee art on `media.started`. Accepted values:

- `"stream"`: uses the streaming endpoint (default)
- `"write"`: uses the write endpoint

##### filter {#pixelcade-publisher-filter}

| Key    | Type     | Default                  |
| ------ | -------- | ------------------------ |
| filter | string[] | [] (publish all events) |

`filter` limits which event types trigger requests to PixelCade. When empty, all events are forwarded to the publisher. Only `media.started` produces PixelCade requests; all other notification types are ignored.

```toml
[[service.publishers.pixelcade]]
filter = [
    "media.started"
]
```

Available event types match the [Core API notification types](../api/notifications.md).


## Auth File

A separate TOML file called `auth.toml`, alongside the config file, can be created which defines credentials for remote connections.

### API Keys

:::warning
API key authentication is a basic access control measure, not a security feature. Connections are unencrypted and keys can be intercepted by anyone on your network.
:::

API key authentication restricts remote access to the Zaparoo API:

```toml
api_keys = ["your-secret-key-here"]
```

Authenticate using either a Bearer token header or query parameter:

```
Authorization: Bearer your-secret-key-here
```

```
http://zaparoo:7497/api/v1/launch?key=your-secret-key-here
```

Localhost connections are always allowed without authentication, so the CLI and TUI continue to work without configuration.

### Remote Credentials

Define credentials used when Core connects to remote endpoints:

```toml
["smb://10.0.0.123/Games"]
username = "myaccount"
password = "Password123"
```

### URL Matching

When a remote endpoint matches against the URL key, the credential set will be attached to the request. Matching uses a 3-step fallback:

1. **Exact scheme match** - scheme, host, and path prefix must match exactly
2. **Canonical scheme match** - equivalent schemes match (e.g., `tcp://` matches `mqtt://`)
3. **Schemeless match** - entries without a scheme match any connection to that host:port

```toml
# Matches only mqtt:// connections
["mqtt://192.168.1.100:1883"]
username = "mqtt_only"
password = "pass"

# Matches any connection to this host:port (mqtt, mqtts, tcp, etc.)
["192.168.1.100:1883"]
username = "any_scheme"
password = "pass"
```

### Scheme Aliases

These scheme aliases are recognized:

| Alias | Canonical |
|-------|-----------|
| `tcp://` | `mqtt://` |
| `ssl://` | `mqtts://` |
| `ws://` | `http://` |
| `wss://` | `https://` |

Multiple credentials may be defined for the same server but on different paths.
