# Readers

Readers are the physical hardware that scan [tokens](../tokens/index.md) and trigger actions in Zaparoo. Choose from ready-to-use USB readers, DIY modules, optical drives, or even virtual software-based readers.

:::caution Hardware Selection
Buying generic hardware? Pay attention to the recommendations in the docs. The hardware can be complicated without guidance, and it's easy to buy stuff that won't work or is low quality.
:::

## Reader Types

### NFC Readers

- **[PN532 USB](./nfc/pn532-usb.md)** (Recommended)
- **[PN532 Module](./nfc/pn532-module.md)**
- **[ACR122U](./nfc/acr122u.md)**
- **[RC522](./nfc/rc522.md)**

### Optical Readers

- **[Optical Drive](./optical-drive.md)**

### Display Devices

- **[TTY2OLED](./tty2oled.md)**

### Barcode Readers

- **[Barcode Scanners](./barcode/index.md)** - App-based and hardware scanners

### Custom & Virtual Readers

- **[MQTT Reader](./mqtt.md)**
- **[External Drive Reader](./external-drive.md)**
- **[Simple Serial Protocol](./simple-serial.md)**
- **[File Reader](./file.md)**

## Platform Compatibility

Most readers work on all platforms, but some have limitations:

| Reader Type       | MiSTer | Windows | Linux | macOS |
| ----------------- | ------ | ------- | ----- | ----- |
| PN532 USB         | ✅     | ✅      | ✅    | ✅    |
| PN532 Module      | ✅     | ✅      | ✅    | ✅    |
| ACR122U (USB)     | ✅     | ❌      | ✅    | ❌    |
| ACR122U (PCSC)    | ❌     | ✅      | ❌    | ✅    |
| Optical Drive     | ✅     | ❌      | ✅    | ❌    |
| Barcode (App)     | ✅     | ✅      | ✅    | ✅    |
| Barcode (RS232)   | ✅     | ✅      | ✅    | ✅    |
| MQTT              | ✅     | ✅      | ✅    | ✅    |
| External Drive    | ✅     | ✅      | ✅    | ✅    |
| Simple Serial     | ✅     | ✅      | ✅    | ✅    |
| File Reader       | ✅     | ✅      | ✅    | ✅    |
| TTY2OLED          | ✅     | ✅      | ✅    | ✅    |

## NFC Readers

NFC readers are the most popular option, working with NFC tags, cards, and compatible toys.

- **[NFC Overview](./nfc/index.md)** - General information about NFC readers
- **[PN532 USB](./nfc/pn532-usb.md)** - Ready-to-use USB NFC readers
- **[PN532 Module](./nfc/pn532-module.md)** - Bare NFC modules for DIY projects
- **[ACR122U](./nfc/acr122u.md)** - Common commercial NFC reader
- **[RC522](./nfc/rc522.md)** - Basic RFID module for microcontrollers

### Supported Tokens

All NFC readers can scan:

- [NFC tags](../tokens/nfc/index.md) (NTAG, MIFARE)
- [NFC toys](../tokens/nfc-toys/index.md) (Amiibo, Lego Dimensions)
- [PCB cards](../tokens/pcb-cards.md)
- Custom NFC-enabled items

## Getting Started

1. **Choose your reader** - See recommendations above
2. **Get tokens** - [NFC tags](../tokens/nfc/index.md), [QR codes](../tokens/qr-codes.md), or [optical discs](./optical-drive.md)
3. **Install Zaparoo Core** - [Platform guides](../platforms/index.md)
4. **Configure your reader** - Most work automatically!
5. **Start scanning** - Write [ZapScript](../zapscript/index.md) to your tokens

## Troubleshooting

**Reader not detected?**

- Check [Reader Drivers](../core/drivers.md) for configuration help
- Enable `debug_logging = true` in your [config.toml](../core/config.md)
- Review hardware-specific troubleshooting in reader docs

**Which reader should I buy?**

- 95% of users should get the [PN532 USB](./nfc/pn532-usb.md)
- It's cheap, reliable, and works everywhere

**Can I use multiple readers?**

- Yes! Connect as many readers as you want
- Each reader operates independently

