---
description: "Compatible Zaparoo hardware readers: NFC/RFID readers, cartridge bridges, barcode scanners, optical drives, MQTT, and custom serial devices."
keywords: [zaparoo readers, nfc reader, rfid reader, cartridge reader, barcode scanner, zaparoo hardware]
---

# Readers

Readers are the hardware that scans [tokens](../tokens/index.md) and tells Zaparoo what to launch. Choose from ready-to-use USB readers, DIY modules, cartridge bridges, optical drives, or virtual readers that need no hardware at all. Terms like NFC, NDEF, and UID are defined in the [glossary](../glossary.md).

If you are buying your first reader, start with the [PN532 USB](./nfc/pn532-usb.md). It works on every platform, is detected without configuration (Windows sometimes needs a serial driver, covered on its page), and is the reader stocked in the <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink>. Not sure what you need? The [setup guide](/start/) picks a reader for your platform and tokens.

:::caution Buying generic hardware
Not every reader sold as "NFC" or "RFID" works with Zaparoo, and some cheap ones are unreliable. Check the reader's page here before you buy, or use official hardware from the Shop, which is tested and includes a case. Community members also sell custom readers and cases; ask in the [Discord](https://zaparoo.org/discord) to find someone near you.
:::

## Comparison

Support levels: **Supported** means Core detects and uses the reader with the setup shown. **Limited** means it works with caveats listed on the reader's page. Each reader page has a per-platform card with the current notes.

| Reader | Best for | Token types | Setup | Support |
| ------ | -------- | ----------- | ----- | ------- |
| [PN532 USB](./nfc/pn532-usb.md) | Most people | NFC cards, tags, toys | Plug and play | Supported on every platform |
| [PN532 module](./nfc/pn532-module.md) | DIY builds and custom cases | NFC cards, tags, toys | Wiring required | Supported on every platform |
| [ZapESP32](../zapesp32/index.md) | Wireless DIY reader with sound and lights | NFC cards, tags, toys | Flash an ESP32 | Supported on every platform, over the network |
| [ACR122U](./nfc/acr122u.md) | If you already own one | NFC cards, tags, toys | Enable in config | Limited everywhere; no writing on Windows, not on macOS |
| [RC522](./nfc/rc522.md) | If you already own one | NFC cards, tags | Needs a Simple Serial bridge | Limited; needs a microcontroller |
| [Zaparoo App camera](./barcode/index.md) | No hardware at all | Barcodes, QR codes | Free in the App | Supported on every platform |
| [Serial barcode scanner](./barcode/index.md#hardware-scanners) | Hands-free barcode setups | Barcodes, QR codes | RS-232 or USB-COM mode, manual config | Supported on every platform |
| [Optical drive](./optical-drive.md) | Launching from real discs | CDs, DVDs, Blu-rays | Auto-detect or manual config | Supported on Linux-based platforms; not on Windows |
| [Epilogue Operator](./epilogue-operator.md) | Original cartridges on MiSTer | GB/GBC/GBA, SNES, N64 cartridges | Install the bridge | MiSTer only |
| [External drive](./external-drive.md) | USB sticks and SD cards as tokens | Removable drives | Enable in config | Supported on every platform |
| [MQTT reader](./mqtt.md) | Home Assistant and automation | Anything sent over MQTT | Broker config | Supported on every platform |
| [File reader](./file.md) | Scripts and testing | Text files | No hardware | Supported on every platform |
| [Simple Serial](./simple-serial.md) | Building your own reader | Anything your firmware sends | Firmware and serial config | Supported on every platform |

All NFC readers can scan [NFC cards and tags](../tokens/nfc/index.md), [NFC toys](../tokens/nfc-toys/index.md), and [PCB cards](../tokens/pcb-cards.md). [TTY2OLED](./tty2oled.md) is a display add-on that shows what is playing; it does not scan tokens. Driver IDs and manual configuration for every reader are on the [reader drivers](./drivers.md) page.

You can connect as many readers as you want; each one operates independently.

## Troubleshooting

**A reader is not detected.** Check the reader's own page for its driver and any manual configuration, then turn on `debug_logging = true` in [`config.toml`](../core/config/index.md) and read the log to see what Core finds.

**Permission denied opening the reader's serial port.** On Linux-based platforms, add your user to the `dialout` group (`sudo usermod -a -G dialout $USER`), then log out and back in. On Linux, SteamOS, Bazzite, and ChimeraOS, the `hardware` install component adds a udev rule that avoids this for common readers.

**A USB serial reader stops working after a reconnect.** Unplug it, wait a few seconds, and plug it back in. If it still fails, restart Core; see [reader drivers](./drivers.md#troubleshooting) for the USB and legacy driver notes.

---

<SponsorCallout variant="sponsor" />
