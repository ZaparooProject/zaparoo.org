---
description: "Configure Zaparoo publishers to send Core events to MQTT brokers and PixelCade LED displays."
keywords: [zaparoo publishers, zaparoo events, mqtt events zaparoo, pixelcade zaparoo, event publisher]
---

# Publishers

Publishers send [Zaparoo Core](../core/index.md) notifications to other services in real time. MQTT publishers forward the notification stream as JSON. PixelCade publishers turn media launch notifications into marquee display requests.

Multiple publishers can run at the same time, including more than one of the same type. Each one receives the same event stream.

Publishers are configured in `config.toml`. There is no Web UI for this feature.

## MQTT

The MQTT publisher sends Core notifications as JSON messages to an MQTT broker. Use it with home automation setups like [Home Assistant](https://www.home-assistant.io/) and Node-RED, or any other system that can subscribe to MQTT topics.

Events are published to the configured topic as they fire.

```toml
[[service.publishers.mqtt]]
broker = "mqtt://192.168.1.100:1883"
topic = "zaparoo/events"
```

See the [Config File Reference](../core/config.md#servicepublishersmqtt) for all options:

- [`enabled`](../core/config.md#mqtt-publisher-enabled) — turn this publisher on or off
- [`broker`](../core/config.md#mqtt-publisher-broker) — MQTT broker URL (`mqtt://`, `mqtts://`, or `ssl://`)
- [`topic`](../core/config.md#mqtt-publisher-topic) — MQTT topic to publish to
- [`filter`](../core/config.md#mqtt-publisher-filter) — limit which event types are published

## PixelCade

The PixelCade publisher displays game marquee art on a [PixelCade](https://pixelcade.org) LED display. When media starts, it maps the Zaparoo system ID to a PixelCade console folder and requests the matching marquee for the launched file.

```toml
[[service.publishers.pixelcade]]
host = "192.168.1.50"
```

See the [Config File Reference](../core/config.md#servicepublisherspixelcade) for all options:

- [`enabled`](../core/config.md#pixelcade-publisher-enabled) — turn this publisher on or off
- [`host`](../core/config.md#pixelcade-publisher-host) — hostname or IP address of the PixelCade device (required)
- [`port`](../core/config.md#pixelcade-publisher-port) — HTTP API port (default: `8080`)
- [`mode`](../core/config.md#pixelcade-publisher-mode) — `"stream"` or `"write"` endpoint (default: `"stream"`)
- [`filter`](../core/config.md#pixelcade-publisher-filter) — limit which event types trigger requests

PixelCade currently only sends requests for `media.started` notifications. Other notification types are ignored even if they pass the filter.

## Filtering events

Every publisher has a `filter` option that limits which [notification types](../core/api/notifications.md) it receives. Leave it empty to receive all events.

```toml
[[service.publishers.mqtt]]
broker = "mqtt://localhost:1883"
topic = "zaparoo/events"
filter = [
    "media.started",
    "media.stopped"
]
```

If you only care about media events and not every token scan, filter down to the event types you need.

## Multiple publishers

You can define multiple publishers of the same type, each with different settings:

```toml
[[service.publishers.mqtt]]
broker = "mqtt://localhost:1883"
topic = "zaparoo/all"

[[service.publishers.mqtt]]
broker = "mqtt://192.168.1.200:1883"
topic = "home/arcade/events"
filter = ["media.started", "media.stopped"]

[[service.publishers.pixelcade]]
host = "192.168.1.50"
```
