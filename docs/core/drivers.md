# Reader Drivers

Reader drivers are software components that enable [Zaparoo Core](/docs/core/) to communicate with different types of [reader hardware](/docs/readers/). Each driver implements the specific protocol and communication method required for a particular reader type.

## How Drivers Work

When Zaparoo Core starts, it:

1. Loads all enabled reader drivers
2. Attempts to auto-detect connected readers (if enabled)
3. Establishes connections to detected or manually configured readers
4. Begins listening for token scans

Most users don't need to worry about drivers - they work automatically! Auto-detection is enabled by default and works for most common hardware.

## Available Drivers

### NFC Readers

NFC readers are the most common type, supporting NFC tags, cards, and compatible toys (Amiibo, Lego Dimensions, etc.).

| Driver ID                  | Hardware           | Platforms      | Documentation                                  |
| -------------------------- | ------------------ | -------------- | ---------------------------------------------- |
| `pn532`, `pn532uart`       | PN532 USB modules  | All platforms  | [PN532 USB](/docs/readers/nfc/pn532-usb)       |
| `pn532i2c`, `pn532spi`     | PN532 bare modules | All platforms  | [PN532 Module](/docs/readers/nfc/pn532-module) |
| `libnfcacr122`             | ACR122U reader     | Linux, MiSTer  | [ACR122U](/docs/readers/nfc/acr122u)           |
| `acr122pcsc`               | ACR122U reader     | Windows, macOS | [ACR122U](/docs/readers/nfc/acr122u)           |
| `legacypn532uart` (legacy) | PN532 USB (old)    | All platforms  | See [Legacy Drivers](#legacy-nfc-drivers)      |
| `legacypn532i2c` (legacy)  | PN532 I2C (old)    | All platforms  | See [Legacy Drivers](#legacy-nfc-drivers)      |

:::note Backwards Compatibility
Driver IDs with underscores (e.g., `pn532_uart`, `simple_serial`) are still supported for backwards compatibility, but the underscore is automatically stripped. Use the non-underscore format in new configurations.
:::

### Optical Readers

| Driver ID      | Hardware              | Platforms             | Documentation                                |
| -------------- | --------------------- | --------------------- | -------------------------------------------- |
| `opticaldrive` | CD/DVD/Blu-ray drives | Linux-based platforms | [Optical Drive](/docs/readers/optical-drive) |

### Display Devices

| Driver ID  | Hardware                 | Platforms     | Documentation                      |
| ---------- | ------------------------ | ------------- | ---------------------------------- |
| `tty2oled` | TTY2OLED serial displays | All platforms | [TTY2OLED](/docs/readers/tty2oled) |

### Barcode Readers

| Driver ID      | Hardware                  | Platforms     | Documentation                                |
| -------------- | ------------------------- | ------------- | -------------------------------------------- |
| `rs232barcode` | RS232 barcode/QR scanners | All platforms | [RS232 Barcode](/docs/readers/rs232-barcode) |

:::info App Barcode Scanning
The Zaparoo App can also scan barcodes and QR codes using your device's camera. Scanned codes are sent to Core via the API and don't require a dedicated reader driver.
:::

### Protocol & Virtual Readers

These drivers enable custom hardware integration and automation:

| Driver ID       | Purpose                        | Platforms     | Documentation                                  |
| --------------- | ------------------------------ | ------------- | ---------------------------------------------- |
| `mqtt`          | MQTT broker integration        | All platforms | [MQTT Reader](/docs/readers/mqtt)              |
| `externaldrive` | USB/SD cards as tokens         | All platforms | [External Drive](/docs/readers/external-drive) |
| `simpleserial`  | Custom microcontroller readers | All platforms | [Simple Serial](/docs/readers/simple-serial)   |
| `file`          | File-based virtual reader      | All platforms | [File Reader](/docs/readers/file)              |

## Configuration

### Auto-Detection

By default, Zaparoo Core automatically detects most readers:

```toml
[readers]
auto_detect = true  # Default setting
```

### Manual Reader Configuration

To manually specify a reader, add a `readers.connect` section to your [`config.toml`](/docs/core/config):

```toml
[[readers.connect]]
driver = 'pn532uart'
path = '/dev/ttyUSB0'
```

See individual hardware documentation for driver-specific configuration options.

### Driver-Specific Settings

You can control individual drivers with `readers.drivers` sections:

```toml
[readers.drivers.tty2oled]
enabled = true  # Enable disabled-by-default drivers

[readers.drivers.simpleserial]
enabled = false  # Disable problematic drivers
auto_detect = false  # Disable auto-detect for specific drivers
```

## Troubleshooting

### Reader Not Detected

1. **Check auto-detect is enabled** - Set `auto_detect = true` in config.toml
2. **Enable debug logging** - Set `debug_logging = true` in config.toml
3. **Check hardware connection** - Verify USB cable, power, etc. and make sure the cable is a _data cable_, not power-only
4. **Review driver documentation** - See hardware-specific troubleshooting
5. **Try manual configuration** - Explicitly configure the reader

### Multiple Readers

You can connect multiple readers simultaneously:

```toml
[[readers.connect]]
driver = 'pn532uart'
path = '/dev/ttyUSB0'

[[readers.connect]]
driver = 'pn532uart'
path = '/dev/ttyUSB1'

[[readers.connect]]
driver = 'opticaldrive'
path = '/dev/sr0'
```

Each reader operates independently and can scan tokens.

## Legacy NFC Drivers

Core v2.6.0 switched to a new NFC driver for PN532 readers with better performance and features. The old driver is still available as a fallback option if you experience issues with the new driver.

### When to Use Legacy Drivers

Use the legacy drivers if you experience:

- Connection issues with PN532 readers that worked before v2.6.0
- Problems reading or writing specific tag types
- I2C communication issues on embedded platforms

### Configuration

Manually configure your reader to use the legacy driver:

**For PN532 UART/USB readers:**

```toml
[[readers.connect]]
driver = "legacypn532uart"
path = "/dev/ttyUSB0"  # Your device path
```

**For PN532 I2C readers:**

```toml
[[readers.connect]]
driver = "legacypn532i2c"
path = "/dev/i2c-1"  # Your I2C device path
```

### Limitations

The legacy drivers have the following limitations compared to the new driver:

- Higher CPU usage (~3x more resources)
- MIFARE tags require pre-formatting before use
- No FeLiCa tag support
- Less responsive feel when scanning
- Windows is not supported

### Reporting Issues

If you need to use the legacy drivers, please report the issue you're experiencing with the new driver on [GitHub](https://github.com/ZaparooProject/zaparoo-core/issues) or [Discord](https://zaparoo.org/discord). This helps improve the new driver for everyone.
