---
sidebar_position: 2
description: "Zaparoo web UI: browser-based interface for managing Zaparoo Core from any device on your network without the mobile app."
keywords: [zaparoo web ui, zaparoo browser interface, zaparoo core web, zaparoo network ui]
---

# Web UI

Every [Zaparoo Core](../core/index.md) release includes a web version of the [Zaparoo App](./index.md). Open it from any browser on your network. Nothing to install.

Most features work the same as the full app. The main gaps are things that need native device access: NFC (read, write, and format) and camera barcode scanning. Tag reads and writes go through whatever [NFC reader](../readers/nfc/index.md) is plugged into the Core host.

## Accessing the web UI

### Finding your IP address

You'll need the IP address of the machine running Zaparoo Core. You can find it in the system tray menu (desktop systems), in the startup logs when Core first runs, or in your system's network settings.

### Connecting

Open a browser and go to `http://<ip>:7497/app/`. The root URL (`http://<ip>:7497/`) also works and redirects there.

For example, if your IP is `192.168.1.100`, go to `http://192.168.1.100:7497/app/`.

The app automatically connects to Core at that address, so you don't need to enter the IP again inside the app.

Sign-in on the embedded build is email and password only. Google and Apple sign-in are only available in the native apps.

## Configuration

### Remote access

By default, the web UI is accessible from any device on your local network. Core automatically allows local IPs, `localhost`, the device hostname, and `*.local` mDNS names. To allow other origins, add them to your [configuration file](../core/config.md):

```toml
[service]
allowed_origins = ["https://example.com", "http://custom-domain.local"]
```
