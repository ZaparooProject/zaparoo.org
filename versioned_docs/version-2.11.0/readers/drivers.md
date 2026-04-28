---
sidebar_position: 1
description: "Configure Zaparoo reader drivers for PN532, ACR122U, RS-232 barcode scanners, optical drives, MQTT, and other reader hardware."
keywords: [zaparoo drivers, libnfc, pn532 driver, acr122u driver, nfc reader driver]
---

# Reader Drivers

Reader drivers let [Zaparoo Core](../core/index.md) communicate with different types of [reader hardware](./index.md). Each driver handles the protocol and connection method for one reader type.

## How drivers work

When Zaparoo Core starts, it:

1. Loads all enabled reader drivers
2. Attempts to auto-detect connected readers when auto-detect is enabled
3. Establishes connections to detected or manually configured readers
4. Begins listening for token scans

Most PN532 and ACR122U setups are auto-detected. Serial readers, MQTT, display devices, external drives, and fallback NFC drivers usually need manual configuration or explicit enabling.

## Available drivers

### NFC readers

NFC readers are the most common type, supporting NFC tags, cards, and compatible toys (Amiibo, Lego Dimensions, etc.).

| Driver ID                  | Hardware           | Platforms      | Documentation                                  |
| -------------------------- | ------------------ | -------------- | ---------------------------------------------- |
| `pn532`, `pn532uart`       | PN532 USB modules  | Current Core platforms | [PN532 USB](./nfc/pn532-usb.md)       |
| `pn532i2c`, `pn532spi`     | PN532 bare modules | Current Core platforms | [PN532 Module](./nfc/pn532-module.md) |
| `libnfcacr122`             | ACR122U reader     | Linux-based platforms | [ACR122U](./nfc/acr122u.md)           |
| `acr122pcsc`               | ACR122U reader     | Windows               | [ACR122U](./nfc/acr122u.md)           |
| `legacypn532uart` (legacy) | PN532 USB fallback | Linux-based platforms | See [legacy NFC drivers](#legacy-nfc-drivers) |
| `legacypn532i2c` (legacy)  | PN532 I2C fallback | Linux-based platforms | See [legacy NFC drivers](#legacy-nfc-drivers) |

:::note Backward compatibility
Driver IDs with underscores, such as `pn532_uart` and `simple_serial`, are still supported. Core strips underscores internally, but new configurations should use the non-underscore driver IDs shown here.
:::

### Optical readers

| Driver ID      | Hardware              | Platforms             | Documentation                                |
| -------------- | --------------------- | --------------------- | -------------------------------------------- |
| `opticaldrive` | CD/DVD/Blu-ray drives | Linux-based platforms | [Optical Drive](./optical-drive.md) |

### Display devices

| Driver ID  | Hardware                 | Platforms     | Documentation                      |
| ---------- | ------------------------ | ------------- | ---------------------------------- |
| `tty2oled` | TTY2OLED serial displays | Current Core platforms | [TTY2OLED](./tty2oled.md) |

`tty2oled` is disabled by default. Enable it before use.

### Barcode readers

| Driver ID      | Hardware                  | Platforms     | Documentation                                |
| -------------- | ------------------------- | ------------- | -------------------------------------------- |
| `rs232barcode` | RS-232 barcode/QR scanners | Current Core platforms | [RS-232 Scanner](./barcode/rs232.md) |

:::info App Barcode Scanning
The Zaparoo App can also scan barcodes and QR codes using your device's camera. Scanned codes are sent to Core via the API and don't require a dedicated reader driver.
:::

### Protocol and virtual readers

These drivers support custom hardware, automation, and non-reader token sources:

| Driver ID       | Purpose                        | Platforms     | Documentation                                  |
| --------------- | ------------------------------ | ------------- | ---------------------------------------------- |
| `mqtt`          | MQTT broker integration        | Current Core platforms | [MQTT Reader](./mqtt.md)              |
| `externaldrive` | USB/SD cards as tokens         | Current Core platforms | [External Drive](./external-drive.md) |
| `simpleserial`  | Custom microcontroller readers | Current Core platforms | [Simple Serial](./simple-serial.md)   |
| `file`          | File-based virtual reader      | Current Core platforms | [File Reader](./file.md)              |

`externaldrive` is disabled by default. Enable it directly or add a manual connection for the drive you want Core to watch.

## Configuration

### Auto-detection

By default, Zaparoo Core automatically detects readers whose drivers support auto-detection:

```toml
[readers]
auto_detect = true
```

Some drivers are enabled but not auto-detected by default. For those readers, add a manual connection or enable auto-detect for the specific driver.

### Manual reader configuration

To manually specify a reader, add a `readers.connect` section to your [`config.toml`](../core/config.md):

```toml
[[readers.connect]]
driver = "pn532uart"
path = "/dev/ttyUSB0"
```

A `[[readers.connect]]` entry also enables that driver unless the driver is explicitly disabled with `[readers.drivers.DRIVER_ID]`. See the individual reader page for driver-specific paths and options.

### Driver-specific settings

You can control individual drivers with `readers.drivers` sections:

```toml
[readers.drivers.tty2oled]
enabled = true

[readers.drivers.simpleserial]
enabled = false
auto_detect = false
```

Use `[readers.drivers.DRIVER_ID]` for driver settings. `[[readers.drivers]]` is not valid config syntax.

## Troubleshooting

### Reader not detected

1. Check auto-detect is enabled with `auto_detect = true` in `config.toml`.
2. Enable debug logging with `debug_logging = true` in `config.toml`.
3. Check the hardware connection. Make sure the USB cable is a data cable, not power-only.
4. Review the hardware-specific reader page for setup and troubleshooting notes.
5. Try manual configuration with `[[readers.connect]]`.

### Multiple readers

You can connect multiple readers simultaneously:

```toml
[[readers.connect]]
driver = "pn532uart"
path = "/dev/ttyUSB0"

[[readers.connect]]
driver = "pn532uart"
path = "/dev/ttyUSB1"

[[readers.connect]]
driver = "opticaldrive"
path = "/dev/sr0"
```

Each reader operates independently and can scan tokens.

## Legacy NFC drivers

Core v2.6.0 switched PN532 readers to the newer `pn532` driver. The old libnfc-based PN532 drivers are still available as fallback options if a reader worked before v2.6.0 but has trouble with the newer driver.

### When to use legacy drivers

Use the legacy drivers if you experience:

- Connection issues with PN532 readers that worked before v2.6.0
- Problems reading or writing specific tag types
- I2C communication issues on embedded platforms

### Configuration

Manually configure your reader to use the legacy driver:

For PN532 UART/USB readers:

```toml
[[readers.connect]]
driver = "legacypn532uart"
path = "/dev/ttyUSB0"
```

For PN532 I2C readers:

```toml
[[readers.connect]]
driver = "legacypn532i2c"
path = "/dev/i2c-1"
```

### Limitations

The legacy drivers have the following limitations compared to the new driver:

- Higher CPU usage
- MIFARE tags require pre-formatting before use
- No FeLiCa tag support
- Less responsive feel when scanning
- Windows is not supported

### Reporting issues

If you need to use the legacy drivers, please report the issue you're experiencing with the new driver on [GitHub](https://github.com/ZaparooProject/zaparoo-core/issues) or [Discord](https://zaparoo.org/discord). Reports help improve the current PN532 driver.
