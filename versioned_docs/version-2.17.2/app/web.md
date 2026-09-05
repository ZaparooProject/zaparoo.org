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

If Core requires encrypted client connections, a browser on another device is asked for the pairing PIN the first time it connects; a browser on the Core device itself is not. See [encryption](../core/config.md#encryption) for the pairing steps and the platform defaults.

[Zaparoo Online](../online/index.md) sign-in on the embedded Web UI is email and password only. Google and Apple sign-in are hidden there; use the native apps if you need social sign-in.

## Configuration

### Remote access

By default, the Web UI is accessible from any device on your local network. Core automatically allows `localhost`, the device's own IP addresses on the API port, and the device's hostname and `.local` name, so `http://mister.local:7497/app/` works without any configuration.

Any other name you use to reach Core, such as a hostname from your router or DNS server, a VPN address, or a reverse proxy, has to be listed in [`allowed_origins`](../core/config.md#allowed_origins) in the [configuration file](../core/config.md):

```toml
[service]
allowed_origins = [
    'zaparoo.example.lan'
]
```

A bare hostname covers HTTP and HTTPS, with and without the API port. Behind a reverse proxy, the browser's origin is the proxy's address and port, so list that. See [allowed_origins](../core/config.md#allowed_origins) for the other entry formats.

## Troubleshooting

**The page loads but never connects.** The Web UI's files load from any address, but the connection back to Core only works from an origin Core allows. If it works at the device's IP address, such as `http://192.168.1.100:7497/app/`, but not at a name, add that name to [`allowed_origins`](../core/config.md#allowed_origins) exactly as it appears in the address bar, then run `zaparoo -reload`.
