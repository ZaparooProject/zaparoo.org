# Web UI

Every copy of Zaparoo Core ships with a pre-built web version of the [Zaparoo App](/docs/app/) which can be accessed locally on your network through any web browser. This embedded web build is automatically included with every Core release and requires no separate installation.

The web build provides the same functionality as the full app, but is missing features like direct NFC and camera support since these aren't available in web browsers. When you use the web UI to read and write tags, it will use an NFC reader connected directly to the host device running Zaparoo Core.

## Accessing the Web UI

### Finding Your IP Address

To access the web UI, you need to know the IP address of the machine running Zaparoo Core. You can find this in several ways:

- **System tray menu** (desktop systems): The IP address is displayed in the Zaparoo Core system tray menu
- **Core startup logs**: The IP address is shown when Zaparoo Core starts
- **Network settings**: Check your system's network configuration

### Connecting to the Web UI

Once you have your IP address, access the web UI by opening a web browser and navigating to `http://<ip>:7497/app/`.

**Important**: The web UI is only accessible at the `/app/` path - it's not available at the root URL.

For example, if your IP address is `192.168.1.100`, go to `http://192.168.1.100:7497/app/`.

## Configuration

### Custom Port

The default port `7497` can be changed by setting the `api_port` option in your Zaparoo Core configuration file:

```toml
[service]
api_port = 8080
```

### Remote Access

By default, the web UI is accessible from any device on your local network. For remote access or custom security requirements, you can configure allowed origins in your configuration file:

```toml
[service]
allowed_origins = ["https://example.com", "http://custom-domain.local"]
```

The web UI supports both HTTP and HTTPS connections, with CORS automatically configured for local network IP addresses.
