# Readers

Readers are the physical hardware that scan [tokens](/docs/tokens/) and trigger actions in Zaparoo. Choose from ready-to-use USB readers, DIY modules, optical drives, or even virtual software-based readers.

:::caution Hardware Selection
Buying generic hardware? Pay attention to the recommendations in the docs. The hardware can be complicated without guidance, and it's easy to buy stuff that won't work or is low quality.
:::

## Reader Types

### NFC Readers

- **[PN532 USB](/docs/readers/nfc/pn532-usb)** (Recommended)
- **[PN532 Module](/docs/readers/nfc/pn532-module)**
- **[ACR122U](/docs/readers/nfc/acr122u)**
- **[RC522](/docs/readers/nfc/rc522)**

### Optical Readers

- **[Optical Drive](/docs/readers/optical-drive)**

### Display Devices

- **[TTY2OLED](/docs/readers/tty2oled)**

### Custom & Virtual Readers

- **[Simple Serial Protocol](/docs/readers/simple-serial)**
- **[File Reader](/docs/readers/file)**

## Platform Compatibility

Most readers work on all platforms, but some have limitations:

| Reader Type    | MiSTer | Windows | Linux | macOS |
| -------------- | ------ | ------- | ----- | ----- |
| PN532 USB      | ✅     | ✅      | ✅    | ✅    |
| PN532 Module   | ✅     | ✅      | ✅    | ✅    |
| ACR122U (USB)  | ✅     | ❌      | ✅    | ❌    |
| ACR122U (PCSC) | ❌     | ✅      | ❌    | ✅    |
| Optical Drive  | ✅     | ❌      | ✅    | ❌    |
| Simple Serial  | ✅     | ✅      | ✅    | ✅    |
| File Reader    | ✅     | ✅      | ✅    | ✅    |
| TTY2OLED       | ✅     | ✅      | ✅    | ✅    |

## NFC Readers

NFC readers are the most popular option, working with NFC tags, cards, and compatible toys.

- **[NFC Overview](/docs/readers/nfc/)** - General information about NFC readers
- **[PN532 USB](/docs/readers/nfc/pn532-usb)** - Ready-to-use USB NFC readers
- **[PN532 Module](/docs/readers/nfc/pn532-module)** - Bare NFC modules for DIY projects
- **[ACR122U](/docs/readers/nfc/acr122u)** - Common commercial NFC reader
- **[RC522](/docs/readers/nfc/rc522)** - Basic RFID module for microcontrollers

### Supported Tokens

All NFC readers can scan:

- [NFC tags](/docs/tokens/nfc/) (NTAG, MIFARE)
- [NFC toys](/docs/tokens/nfc-toys/) (Amiibo, Lego Dimensions)
- [PCB cards](/docs/tokens/pcb-cards)
- Custom NFC-enabled items

## Getting Started

1. **Choose your reader** - See recommendations above
2. **Get tokens** - [NFC tags](/docs/tokens/nfc/), [QR codes](/docs/tokens/qr-codes), or [optical discs](/docs/readers/optical-drive)
3. **Install Zaparoo Core** - [Platform guides](/docs/platforms/)
4. **Configure your reader** - Most work automatically!
5. **Start scanning** - Write [ZapScript](/docs/zapscript/) to your tokens

## Troubleshooting

**Reader not detected?**

- Check [Reader Drivers](/docs/core/drivers) for configuration help
- Enable `debug_logging = true` in your [config.toml](/docs/core/config)
- Review hardware-specific troubleshooting in reader docs

**Which reader should I buy?**

- 95% of users should get the [PN532 USB](/docs/readers/nfc/pn532-usb)
- It's cheap, reliable, and works everywhere

**Can I use multiple readers?**

- Yes! Connect as many readers as you want
- Each reader operates independently

