---
sidebar_position: 2
description: "Zaparoo web UI: browser-based interface for managing Zaparoo Core from any device on your network without the mobile app."
keywords: [zaparoo web ui, zaparoo browser interface, zaparoo core web, zaparoo network ui]
---

# Web UI

Every [Zaparoo Core](../core/index.md) release includes a web version of the [Zaparoo App](./index.md). Open it from any browser on your network. Nothing to install.

Most features work the same as the full app. The main gaps are things that need native device access: NFC (read, write, and format) and camera barcode scanning. Tag reads and writes go through whatever [NFC reader](../readers/nfc/index.md) is plugged into the Core host.

## Accessing the Web UI

Open a browser and go to `http://<ip>:7497/app/`. The root URL (`http://<ip>:7497/`) redirects there too.

For example, if your IP is `192.168.1.100`, go to `http://192.168.1.100:7497/app/`.

When the Web UI is hosted by a Core instance, it automatically connects back to that same host. You don't need to enter the IP address again inside the app.

[Zaparoo Online](../online/index.md) sign-in on the embedded Web UI is email and password only. Google and Apple sign-in are hidden there; use the native apps if you need social sign-in.

## Configuration

### Remote access

By default, the Web UI is accessible from any device on your local network. Core automatically allows `localhost`, local IP addresses on the Core API port, and configured `.local` hostnames. To allow other browser origins, add them to your [configuration file](../core/config.md):

```toml
[service]
allowed_origins = ["https://example.com", "http://custom-domain.local"]
```
