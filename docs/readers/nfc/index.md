# NFC Readers

:::tip
Are you looking for a ready-to-use NFC reader? Check out the [PN532 USB](./pn532-usb.md). You can also get one from the [Zaparoo Shop](https://shop.zaparoo.com/) which supports the project.
:::

NFC readers were the first type of reader supported by Zaparoo, and currently still the best option for most users. Both the reader and tags are inexpensive, compact and easy to get online.

- [PN532 USB](./pn532-usb.md) - Recommended for most users. Plug-and-play USB connection.
- [PN532 Module](./pn532-module.md) - Bare module for custom builds and embedded projects.
- [ACR122U](./acr122u.md) - Common USB reader, but uses the older libnfc driver with limited [MIFARE](../../tokens/nfc/mifare.md) write support.
- [RC522](./rc522.md) - Budget RFID module. Requires a microcontroller and the [simple serial protocol](../simple-serial.md).
