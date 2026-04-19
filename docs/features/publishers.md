---
---

# Publishers

Publishers send Zaparoo Core events to external services in real time. When tokens are scanned or media starts and stops, any configured publishers receive a notification. You can filter each one to only forward the event types you care about.

Multiple publishers can run at the same time, including multiple of the same type. Each gets the same event stream.

Publishers are configured in `config.toml`. There is no Web UI for this feature.

## MQTT

The MQTT publisher sends Core events as JSON messages to an MQTT broker. It works well with home automation setups like Home Assistant and Node-RED, or anything else that speaks MQTT.

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

The PixelCade publisher displays game marquee art on a [PixelCade](https://pixelcade.org) LED display. When a game starts, it looks up the console folder for the current system and fetches the matching marquee image. When media stops, you can blank the display, show a default marquee, or leave the last image up.

```toml
[[service.publishers.pixelcade]]
host = "192.168.1.50"
```

See the [Config File Reference](../core/config.md#servicepublisherspixelcade) for all options:

- [`enabled`](../core/config.md#pixelcade-publisher-enabled) — turn this publisher on or off
- [`host`](../core/config.md#pixelcade-publisher-host) — hostname or IP address of the PixelCade device (required)
- [`port`](../core/config.md#pixelcade-publisher-port) — HTTP API port (default: `8080`)
- [`mode`](../core/config.md#pixelcade-publisher-mode) — `"stream"` or `"write"` endpoint (default: `"stream"`)
- [`on_stop`](../core/config.md#pixelcade-publisher-on-stop) — what to do when media stops: `"blank"`, `"marquee"`, or `"none"` (default: `"blank"`)
- [`filter`](../core/config.md#pixelcade-publisher-filter) — limit which event types trigger requests

## Filtering events

Every publisher has a `filter` option that limits which [notification types](../core/api/notifications.md) are forwarded. Leave it empty to receive all events.

```toml
[[service.publishers.mqtt]]
broker = "mqtt://localhost:1883"
topic = "zaparoo/events"
filter = [
    "media.started",
    "media.stopped"
]
```

If you only care about media events and not every token scan, filter down to just what you need.

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
on_stop = "marquee"
```
