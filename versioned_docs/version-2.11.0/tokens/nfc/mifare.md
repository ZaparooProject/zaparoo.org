---
description: "Using MIFARE Classic 1K NFC tags with Zaparoo: NDEF formatting, compatibility notes, and ACR122U write limitations."
keywords: [mifare classic zaparoo, mifare 1k nfc, zaparoo nfc tags, acr122u mifare]
---

# MIFARE Classic

MIFARE Classic 1K is an older NFC tag standard with 1024 bytes of storage. Zaparoo has about 716 bytes available for NDEF text after the card's reserved blocks and NDEF overhead. Many low-cost NFC reader bundles include MIFARE Classic cards or fobs.

Zaparoo can read and write NDEF text on MIFARE Classic 1K tags, but compatibility depends more on the reader, phone, and driver than it does with [NTAG](./ntag.md). Blank tags may need to be NDEF formatted before use. The Android Zaparoo App can try to format and write them when the phone supports MIFARE Classic. Zaparoo Core can write them through supported PN532/libnfc reader paths.

The main exception is the [ACR122U](../../readers/nfc/acr122u.md). On Windows, the ACR122U PC/SC driver can scan tags but cannot write through Zaparoo. On Linux-based platforms, the libnfc ACR122U driver can attempt MIFARE Classic writes, but some cards or reader variants may need manual formatting or may not write reliably.

:::warning NTAG recommended
MIFARE Classic has limited compatibility compared to NTAG tags. Most notably, iPhones do not support MIFARE Classic, so you can't read or write these tags from the Zaparoo App on iOS. If you're buying new tags, get NTAG instead.
:::

## Compatibility

| Feature | MIFARE Classic | NTAG215 |
| --- | --- | --- |
| Zaparoo text storage | About 716 bytes | 504 bytes |
| iPhone support | No | Yes |
| Android support | Device-dependent | Yes |
| Zaparoo App (iOS) | No | Yes |
| Zaparoo App (Android) | Device-dependent | Yes |

## NFC toys

Several NFC toy lines use MIFARE chips internally. See [NFC Toys](../nfc-toys/index.md) for details on using them with Zaparoo:

- [Skylanders](../nfc-toys/skylanders.md) (MIFARE Classic 1K)
- [Disney Infinity](../nfc-toys/disney-infinity.md) (MIFARE)
