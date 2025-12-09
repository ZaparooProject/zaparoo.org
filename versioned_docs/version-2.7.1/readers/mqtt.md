# MQTT Reader

The MQTT reader connects to an MQTT broker and executes [ZapScript](../zapscript/index.md) commands received from subscribed topics. This enables integration with home automation systems like [Home Assistant](https://www.home-assistant.io/) and other MQTT-based services.

## Features

- Subscribe to MQTT topics and execute ZapScript from messages
- Support for standard MQTT and secure MQTT over TLS (mqtts://)
- Authentication via username/password
- Automatic reconnection if connection is lost
- Integration with Home Assistant automations
- QoS 1 (at-least-once delivery) for reliable message processing

## Setup

The MQTT reader requires manual configuration in your [config file](../core/config.md). Auto-detection is not supported.

### Basic Configuration

Add the following to your `config.toml`:

```toml
[[readers.connect]]
driver = "mqtt"
path = "localhost:1883/zaparoo/tokens"
```

The `path` format is: `broker:port/topic`

- `broker:port` - Your MQTT broker address and port (e.g., `localhost:1883`)
- `topic` - The MQTT topic to subscribe to (e.g., `zaparoo/tokens`)

### Secure Connection (TLS)

For encrypted connections using MQTT over TLS:

```toml
[[readers.connect]]
driver = "mqtt"
path = "mqtts://broker.example.com:8883/zaparoo/tokens"
```

Or using the `ssl://` scheme:

```toml
[[readers.connect]]
driver = "mqtt"
path = "ssl://broker.example.com:8883/zaparoo/tokens"
```

### Authentication

If your MQTT broker requires authentication, add credentials to your `auth.toml` file:

```toml
[auth.creds."broker.example.com:1883"]
username = "your_username"
password = "your_password"
```

The credential key should match your broker address without the topic path. If you're using a secure connection with `mqtts://` in your config path, use the same scheme in the credential key:

```toml
[auth.creds."mqtts://broker.example.com:8883"]
username = "your_username"
password = "your_password"
```

## Usage

Once configured, the MQTT reader will subscribe to the specified topic and execute any ZapScript received in message payloads.

### Example: Send ZapScript via MQTT

Using `mosquitto_pub` command-line tool:

```bash
mosquitto_pub -h localhost -t zaparoo/tokens -m "**launch:Genesis/Sonic"
```

Using Python with paho-mqtt:

```python
import paho.mqtt.client as mqtt

client = mqtt.Client()
client.connect("localhost", 1883)
client.publish("zaparoo/tokens", "**launch:Genesis/Sonic")
client.disconnect()
```

## Home Assistant Integration

The MQTT reader works seamlessly with Home Assistant automations. This example shows how to launch a random game when a button is pressed:

### Prerequisites

1. Home Assistant with MQTT integration configured
2. Zaparoo Core MQTT reader configured to the same broker

### Example Automation

```yaml
automation:
  - alias: "Launch Random SNES Game"
    triggers:
      - trigger: state
        entity_id: input_button.random_game
        to: "on"
    actions:
      - action: mqtt.publish
        data:
          topic: "zaparoo/tokens"
          payload: "**launch.random:snes"
```

### Advanced Example: Launch Specific Game Based on Sensor

```yaml
automation:
  - alias: "Launch Game Based on Time of Day"
    triggers:
      - trigger: time
        at: "19:00:00"
    conditions:
      - condition: state
        entity_id: binary_sensor.someone_home
        state: "on"
    actions:
      - action: mqtt.publish
        data:
          topic: "zaparoo/tokens"
          payload: "@Genesis/Sonic the Hedgehog"
```

## Topic Structure

You can use any topic structure you want, but here are some common patterns:

- `zaparoo/tokens` - Simple, single topic for all commands
- `zaparoo/devices/living_room/tokens` - Per-device topics
- `homeassistant/zaparoo/commands` - Integrated with Home Assistant namespace

Just make sure your Zaparoo Core `readers.connect` path matches the topic you're publishing to.

## Limitations

- **Read-only**: The MQTT reader cannot write ZapScript back to tokens (use NFC readers for writing)
- **No auto-detection**: Must be manually configured in config file
- **Message format**: Payloads must be valid ZapScript text (binary formats not supported)

## Troubleshooting

### Connection Issues

Enable debug logging in your `config.toml`:

```toml
debug_logging = true
```

Then check your logs for MQTT connection messages:

```
mqtt reader: connected to localhost:1883
mqtt reader: subscribed to topic zaparoo/tokens
```

### Authentication Failures

If authentication is failing:

1. Verify your credentials in `auth.toml`
2. Ensure the broker address matches exactly (don't include `mqtt://` scheme in auth.toml)
3. Check broker logs for authentication errors

### Messages Not Executing

If messages are received but not executing:

1. Verify the payload is valid ZapScript
2. Check logs for ZapScript execution errors
3. Test the same ZapScript with an NFC token to verify it works

## Platform Compatibility

The MQTT reader works on all platforms:

| Platform   | Supported |
| ---------- | --------- |
| MiSTer     | ✅        |
| Windows    | ✅        |
| Linux      | ✅        |
| macOS      | ✅        |
| Batocera   | ✅        |
| SteamOS    | ✅        |
| LibreELEC  | ✅        |
