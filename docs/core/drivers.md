# Reader Drivers

Reader drivers are software components that enable [Zaparoo Core](/docs/core/) to communicate with different types of [reader hardware](/docs/readers/). Each driver implements the specific protocol and communication method required for a particular reader type.

## How Drivers Work

When Zaparoo Core starts, it:

1. Loads all enabled reader drivers
2. Attempts to auto-detect connected readers (if enabled)
3. Establishes connections to detected or manually configured readers
4. Begins listening for token scans

Most users don't need to worry about drivers - they work automatically! Auto-detection is enabled by default and works for most hardware.

## Available Drivers

### NFC Readers

NFC readers are the most common type, supporting NFC tags, cards, and compatible toys (Amiibo, Lego Dimensions, etc.).

| Driver ID                | Hardware           | Platforms     | Documentation                                  |
| ------------------------ | ------------------ | ------------- | ---------------------------------------------- |
| `pn532`, `pn532_uart`    | PN532 USB modules  | All platforms | [PN532 USB](/docs/readers/nfc/pn532-usb)       |
| `pn532_i2c`, `pn532_spi` | PN532 bare modules | All platforms | [PN532 Module](/docs/readers/nfc/pn532-module) |
| `acr122_usb`             | ACR122U reader     | Linux, MiSTer | [ACR122U](/docs/readers/nfc/acr122u)           |
| `acr122_pcsc`            | ACR122U reader     | Windows       | [ACR122U](/docs/readers/nfc/acr122u)           |

### Optical Readers

| Driver ID       | Hardware              | Platforms             | Documentation                                |
| --------------- | --------------------- | --------------------- | -------------------------------------------- |
| `optical_drive` | CD/DVD/Blu-ray drives | Linux-based platforms | [Optical Drive](/docs/readers/optical-drive) |

### Display Devices

| Driver ID  | Hardware                 | Platforms     | Documentation                      |
| ---------- | ------------------------ | ------------- | ---------------------------------- |
| `tty2oled` | TTY2OLED serial displays | All platforms | [TTY2OLED](/docs/readers/tty2oled) |

### Protocol & Virtual Readers

These drivers enable custom hardware integration and automation:

| Driver ID       | Purpose                        | Platforms     | Documentation                                |
| --------------- | ------------------------------ | ------------- | -------------------------------------------- |
| `simple_serial` | Custom microcontroller readers | All platforms | [Simple Serial](/docs/readers/simple-serial) |
| `file`          | File-based virtual reader      | All platforms | [File Reader](/docs/readers/file)            |

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
driver = 'pn532_uart'
path = '/dev/ttyUSB0'
```

See individual hardware documentation for driver-specific configuration options.

### Driver-Specific Settings

You can control individual drivers with `readers.drivers` sections:

```toml
[readers.drivers.tty2oled]
enabled = true  # Enable disabled-by-default drivers

[readers.drivers.simple_serial]
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
driver = 'pn532_uart'
path = '/dev/ttyUSB0'

[[readers.connect]]
driver = 'pn532_uart'
path = '/dev/ttyUSB1'

[[readers.connect]]
driver = 'optical_drive'
path = '/dev/sr0'
```

Each reader operates independently and can scan tokens.

