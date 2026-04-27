---
description: Use MQTT with Zaparoo to trigger game and media launches from Home Assistant, smart home systems, or custom MQTT devices.
keywords: [zaparoo mqtt, home assistant game launcher, mqtt reader zaparoo, smart home game launch]
---

# MQTT Reader

The MQTT reader lets [Zaparoo Core](../core/index.md) listen to an MQTT topic and treat each non-empty message as [ZapScript](../zapscript/index.md).

Use it when another system already speaks MQTT, such as [Home Assistant](https://www.home-assistant.io/) or a custom button, script, or device that publishes launch commands.

## Platforms

<PlatformSupport
  groups={[
    {
      name: "Base OS",
      platforms: [
        { name: "Windows", href: "../platforms/windows/", support: "supported" },
        { name: "macOS", href: "../platforms/mac", support: "supported" },
        { name: "Linux", href: "../platforms/linux/", support: "supported" },
      ],
    },
    {
      name: "FPGA",
      platforms: [
        { name: "MiSTer", href: "../platforms/mister/", support: "supported" },
        { name: "MiSTeX", href: "../platforms/mistex", support: "supported" },
      ],
    },
    {
      name: "Retro Gaming OS",
      platforms: [
        { name: "Batocera", href: "../platforms/batocera/", support: "supported" },
        { name: "ReplayOS", href: "../platforms/replayos", support: "supported" },
      ],
    },
    {
      name: "Handheld and Gaming Linux",
      platforms: [
        { name: "SteamOS", href: "../platforms/steamos", support: "supported" },
        { name: "Bazzite", href: "../platforms/bazzite", support: "supported" },
        { name: "ChimeraOS", href: "../platforms/chimeraos", support: "supported" },
      ],
    },
    {
      name: "Media Center",
      platforms: [
        { name: "LibreELEC", href: "../platforms/libreelec", support: "supported" },
      ],
    },
  ]}
/>

## Configure the reader

Add an MQTT reader to your [`config.toml`](../core/config.md):

```toml
[[readers.connect]]
driver = "mqtt"
path = "localhost:1883/zaparoo/tokens"
```

The `path` is the broker address followed by the topic Core should subscribe to: `broker:port/topic`. The example above connects to `localhost:1883` and listens on `zaparoo/tokens`.

Restart Core after changing the config. MQTT readers are not auto-detected, so the `[[readers.connect]]` entry is what enables this reader.

For an encrypted broker, use `mqtts://` in the reader path:

```toml
[[readers.connect]]
driver = "mqtt"
path = "mqtts://broker.example.com:8883/zaparoo/tokens"
```

## Add broker credentials

If your broker needs a username and password, add them to [`auth.toml`](../core/config.md#auth-file). Match the broker address, not the full topic path:

```toml
["mqtt://broker.example.com:1883"]
username = "your_username"
password = "your_password"
```

If you want the same credentials to work with either `mqtt://` or `mqtts://`, use only the host and port:

```toml
["192.168.1.100:1883"]
username = "your_username"
password = "your_password"
```

For encrypted brokers, use an `mqtts://` credential key. Core also treats `ssl://` auth entries as `mqtts://`.

## Send a message

Publish ZapScript to the topic configured in `config.toml`:

```bash
mosquitto_pub -h localhost -t zaparoo/tokens -m "@Genesis/Sonic the Hedgehog"
```

The `@` prefix is shorthand for a [title launch](../zapscript/launch.md#launchtitle). You can send any valid ZapScript, including commands such as `**launch.random:snes`.

Choose whatever topic name fits your setup. For example, you could use `zaparoo/tokens`, `zaparoo/devices/living_room/tokens`, or `homeassistant/zaparoo/commands`. The important part is that the published topic matches the topic in your reader `path`.

The MQTT reader is read-only. It can receive ZapScript, but it cannot write anything back to NFC tags, cards, or other tokens.

## Home Assistant integration

Set up Home Assistant's MQTT integration to use the same broker as Zaparoo Core, then publish ZapScript from an automation. This example runs when an input button changes:

```yaml
automation:
  - alias: "Launch Random SNES Game"
    triggers:
      - trigger: state
        entity_id: input_button.random_game
    actions:
      - action: mqtt.publish
        data:
          topic: "zaparoo/tokens"
          payload: "**launch.random:snes"
```

Change `topic` to match your reader path, and change `payload` to the ZapScript you want to run.

## Troubleshooting

### No connection

Enable debug logging in `config.toml`, restart Core, then check the Core logs:

```toml
debug_logging = true
```

For a working connection, you should see messages like:

```text
mqtt reader: connected to localhost:1883
mqtt reader: subscribed to topic zaparoo/tokens
```

If Core does not connect, check the broker host, port, network access, and whether encrypted brokers use `mqtts://` in the reader path.

### Authentication fails

Check that your `auth.toml` entry matches the broker address and port. Do not include the MQTT topic in the auth key.

For example, if the reader path is `mqtts://broker.example.com:8883/zaparoo/tokens`, the auth key should be `mqtts://broker.example.com:8883`.

### Messages do nothing

Check these first:

1. The publisher is using the same topic as the reader path.
2. The payload is not empty.
3. The payload is valid ZapScript.
4. Core logs show the MQTT message being received.

Test the same ZapScript with another reader or through the app. If it still does not work, the ZapScript probably needs fixing.
