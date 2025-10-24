# PN532 USB

The PN532 is a popular NFC chip used in many readers. This USB version is the recommended ready-to-use reader for Zaparoo - it's affordable, plug-and-play, and works on all platforms.

<img src="/img/docs/readers/PN532-Type-C.jpg" alt="A PN532 USB-C module" width="300" />

## Features

- **Plug and play** - No drivers or setup required
- **Great price** - Starting at around $5 USD
- **Universal compatibility** - Works on all [platforms](/docs/platforms/)
- **USB Type-C** - Modern connector standard
- **Compact size** - Very small footprint
- **Full NFC support** - Same functionality as all PN532 readers
- **Community cases** - Fits in available 3D-printed cases

## Driver Configuration

### Driver Details

- **Driver IDs**: `pn532`, `pn532_uart`
- **Transport**: USB Serial (UART)
- **Platforms**: [All platforms](/docs/platforms/)
- **Enabled by default**: Yes
- **Auto-detect**: Yes

:::tip Auto-Detection
These readers are automatically detected on all platforms. You typically don't need any configuration - just plug it in and it works!
:::

### Manual Configuration

In rare cases where auto-detection doesn't work, you can manually specify the reader in your [`config.toml`](/docs/core/config):

**Linux/MiSTer:**

```toml
[[readers.connect]]
driver = 'pn532_uart'
path = '/dev/ttyUSB0'
```

**Windows:**

```toml
[[readers.connect]]
driver = 'pn532_uart'
path = 'COM3'
```

**macOS:**

```toml
[[readers.connect]]
driver = 'pn532_uart'
path = '/dev/cu.usbserial-1234'
```

### Finding the Serial Port

If you need to find the device path:

**Linux/MiSTer:**

```bash
ls /dev/ttyUSB*
# or
dmesg | grep tty
```

**Windows:**
Open Device Manager and look under "Ports (COM & LPT)"

**macOS:**

```bash
ls /dev/cu.*
```

## Platform-Specific Notes

### MiSTer

The PN532 USB reader is fully supported and auto-detected on MiSTer. It typically appears as `/dev/ttyUSB0`.

### Windows

Windows may require a USB serial driver for some PN532 modules:

- Most use CH340 chips
- Drivers are usually installed automatically via Windows Update

:::info CH340 Driver Installation
Windows normally comes with a driver for this reader by default, but if it's not working, you may want to try reinstalling it. You can download the [CH340 driver (ZIP)](/Windows-CH340-Driver.zip) or [CH340 driver (EXE)](/CH341SER.EXE) and see this [SparkFun installation guide](https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers/all) if you need help installing it.
:::

### Linux

You may need to add your user to the `dialout` group for serial port access:

```bash
sudo usermod -a -G dialout $USER
```

Log out and back in for the change to take effect.

### macOS

The PN532 USB reader works out of the box on macOS. No additional drivers needed.

## Troubleshooting

### Reader Not Detected

1. **Check USB connection** - Try a different USB port or cable
2. **Verify auto-detect is enabled** - Check `auto_detect = true` in config.toml
3. **Check for device** - Verify the device appears in system (see "Finding the Serial Port" above)
4. **Permissions** - On Linux, ensure dialout group membership
5. **Enable debug logging** - Set `debug_logging = true` in config.toml to see detection attempts
6. **Windows Driver** - Try (re)installing the [CH340 driver](#windows) and rebooting.

### Slow or Inconsistent Scanning

- **Check power** - Some USB hubs don't provide enough power
- **Reduce interference** - Keep away from metal surfaces and other electronics

### USB Cable Issues

:::warning
Some USB cables are **power-only** and don't support data transfer. If your reader isn't detected, try a different cable.
:::

## Where To Buy

:::tip Official Support
Buying from the [Zaparoo Shop](https://zaparoo.com/shop) directly supports the project and includes a quality case!
:::

**Original Hardware:**

- [Elechouse](https://www.elechouse.com/product/pn532-nfc-usb-module/) - Official PN532 USB module

**Clones (Search for "PN532 Type C" or "PCR532"):**

- [AliExpress (China) - Allinbest Store](https://www.aliexpress.us/item/1005006326438326.html)
- [AliExpress (China) - MI YU KOUNG Official Store](https://www.aliexpress.com/item/1005005262748046.html)

## See Also

- **[PN532 Module](/docs/readers/nfc/pn532-module)** - Bare module version for DIY projects
- **[NFC Readers Overview](/docs/readers/nfc/)** - All NFC reader options
- **[Configuration](/docs/core/config#readers)** - Reader configuration reference
- **[Community Projects](/docs/community/projects/)** - DIY cases and projects
