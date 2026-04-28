---
description: "NFC reader options for Zaparoo: PN532 USB, PN532 Module, ACR122U, and RC522. Compare ready-to-use and DIY hardware."
keywords: [zaparoo nfc reader, pn532 usb, acr122u, rc522, nfc reader mister fpga]
---

# NFC Readers

NFC readers let Zaparoo scan [NFC tags](../../tokens/nfc/index.md), NFC cards, and compatible NFC toys. The token stores ZapScript or other token text, not the game itself.

If you are buying your first reader, start with the [PN532 USB](./pn532-usb.md). It is the ready-to-use option in this section, and it is the reader stocked in the <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink>.

## Which reader to choose

| Reader | Use it when | Main caveat |
| --- | --- | --- |
| [PN532 USB](./pn532-usb.md) | You want a USB reader that works without wiring. | Some versions of Windows may need a third-party USB serial driver. |
| [PN532 Module](./pn532-module.md) | You are building a custom reader or embedding NFC in another project. | Requires wiring, soldering, and a USB-to-serial adapter or direct bus connection. |
| [ACR122U](./acr122u.md) | You already have one, or you specifically want this reader style. | Clone hardware support varies, and Windows scanning is read-only in Zaparoo. |
| [RC522](./rc522.md) | You have a microcontroller project that can send scans to Core. | Not a direct Zaparoo NFC reader; it needs the [Simple Serial protocol](../simple-serial.md). |

## Reading and writing

PN532 readers can read and write supported NFC tags through Zaparoo. That includes [NTAG](../../tokens/nfc/ntag.md) tags and [MIFARE Classic](../../tokens/nfc/mifare.md), though NTAG is the better choice when buying new tags.

ACR122U support depends on the platform and driver. It can scan on Windows through PC/SC, but writing tags through Zaparoo is not supported there. On Linux-based platforms, Core uses [libnfc](https://github.com/nfc-tools/libnfc) for ACR122U support.

RC522 setups are read-only from Zaparoo's point of view because the microcontroller sends scan text over Simple Serial.

## Before you buy

Check the reader-specific page before ordering hardware. NFC modules and ACR122U-style readers are often sold as clones, and the same listing can change over time.

If you are unsure, use the [PN532 USB](./pn532-usb.md) page first. The other readers are still useful, but they are better fits for existing hardware, custom builds, or experiments.
