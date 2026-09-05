---
description: "Compatible Zaparoo hardware readers: NFC/RFID readers, cartridge bridges, barcode scanners, optical drives, MQTT, and custom serial devices."
keywords: [zaparoo readers, nfc reader, rfid reader, cartridge reader, barcode scanner, zaparoo hardware]
---

# Readers

Readers are the hardware that scans [tokens](../tokens/index.md) and tells Zaparoo what to launch. Readers are the hardware; tokens are the things you scan. Choose from ready-to-use USB readers, DIY modules, cartridge bridges, optical drives, or virtual readers that need no hardware at all.

If you are buying your first reader, start with the [PN532 USB](./nfc/pn532-usb.md). It works on every platform, needs no configuration, and is the reader stocked in the <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink>. Not sure what you need? The [setup guide](/start/) picks a reader for your platform and tokens.

:::caution Buying generic hardware
Not every reader sold as "NFC" or "RFID" works with Zaparoo, and some cheap ones are unreliable. Check the reader's page here before you buy, or use official hardware from the Shop, which is tested and includes a case.
:::

## Comparison

| Reader | Best for | Token types | Setup | Platforms |
| ------ | -------- | ----------- | ----- | --------- |
| [PN532 USB](./nfc/pn532-usb.md) | Most people | NFC cards, tags, toys | Plug and play | All |
| [PN532 module](./nfc/pn532-module.md) | DIY builds and custom cases | NFC cards, tags, toys | Wiring required | All |
| [ZapESP32](../zapesp32/index.md) | Wireless DIY reader with sound and lights | NFC cards, tags, toys | Flash an ESP32 | All (over the network) |
| [ACR122U](./nfc/acr122u.md) | If you already own one | NFC cards, tags, toys | Enable in config, with limits | Linux-based platforms; limited on Windows |
| [RC522](./nfc/rc522.md) | If you already own one | NFC cards, tags | Needs a Simple Serial bridge | All |
| [Zaparoo App camera](./barcode/index.md) | No hardware at all | Barcodes, QR codes | Free in the App | All |
| [Serial barcode scanner](./barcode/rs232.md) | Hands-free barcode setups | Barcodes, QR codes | RS-232 or USB-COM mode, manual config | All |
| [Optical drive](./optical-drive.md) | Launching from real discs | CDs, DVDs, Blu-rays | Auto-detect or manual config | Linux-based platforms except MiSTeX |
| [Epilogue Operator](./epilogue-operator.md) | Original cartridges on MiSTer | GB/GBC/GBA, SNES, N64 cartridges | Install the bridge | MiSTer |
| [External drive](./external-drive.md) | USB sticks and SD cards as tokens | Removable drives | Enable in config | All |
| [MQTT reader](./mqtt.md) | Home Assistant and automation | Anything sent over MQTT | Broker config | All |
| [File reader](./file.md) | Scripts and testing | Text files | No hardware | All |
| [Simple Serial](./simple-serial.md) | Building your own reader | Anything your firmware sends | Firmware and serial config | All |

## Reader types

### NFC readers

NFC readers are the most popular option and work with NFC cards, stickers, key fobs, and compatible toys.

- **[PN532 USB](./nfc/pn532-usb.md)** (recommended): ready-to-use USB reader
- **[PN532 module](./nfc/pn532-module.md)**: bare module for DIY projects
- **[ZapESP32](../zapesp32/index.md)**: wireless DIY reader built on an ESP32
- **[ACR122U](./nfc/acr122u.md)**: common commercial reader with platform limits
- **[RC522](./nfc/rc522.md)**: basic RFID module for microcontrollers

All NFC readers can scan [NFC cards and tags](../tokens/nfc/index.md) (NTAG, MIFARE), [NFC toys](../tokens/nfc-toys/index.md) (Amiibo, Skylanders, Disney Infinity, LEGO Dimensions), and [PCB cards](../tokens/pcb-cards.md).

### Barcode and QR scanners

- **[Barcode scanners](./barcode/index.md)**: the Zaparoo App camera or a serial hardware scanner

### Optical and cartridge readers

- **[Optical drive](./optical-drive.md)**: launch from real CDs, DVDs, and Blu-rays
- **[Epilogue Operator](./epilogue-operator.md)**: launch original cartridges on MiSTer

### Virtual and custom readers

- **[External drive](./external-drive.md)**: USB sticks and SD cards as tokens
- **[MQTT reader](./mqtt.md)**: receive scans from Home Assistant or any MQTT client
- **[File reader](./file.md)**: watch a text file for ZapScript
- **[Simple Serial](./simple-serial.md)**: the protocol for building your own reader
- **[Reader drivers](./drivers.md)**: driver IDs and manual configuration for every reader

### Displays

- **[TTY2OLED](./tty2oled.md)**: a MiSTer display add-on that shows what is playing. It does not scan tokens.

## Platform compatibility

Each reader page includes a platform support card with current notes. Check it before buying hardware, especially for [Epilogue Operator](./epilogue-operator.md), [ACR122U](./nfc/acr122u.md), [RC522](./nfc/rc522.md), and [optical drive](./optical-drive.md) setups.

## Troubleshooting

**Reader not detected?**

- Check [reader drivers](./drivers.md) for manual configuration
- Enable `debug_logging = true` in your [config.toml](../core/config.md) and read the log
- Read the troubleshooting section on the reader's own page

**Which reader should I buy?**

- Start with the [PN532 USB](./nfc/pn532-usb.md) if you want a ready-to-use NFC reader
- It has the broadest platform support and needs the least setup

**Can I use multiple readers?**

- Yes. Connect as many readers as you want; each one operates independently

---

<SponsorCallout variant="sponsor" />
