---
sidebar_position: 2
description: "Using MIFARE Classic 1K NFC tags with Zaparoo: NDEF formatting, compatibility notes, and ACR122U write limitations."
keywords: [mifare classic zaparoo, mifare 1k nfc, zaparoo nfc tags, acr122u mifare]
---

# MIFARE Classic

MIFARE Classic 1K is an older NFC tag standard with 1024 bytes of storage. After the card's reserved blocks, Zaparoo has 720 bytes available for the NDEF message, so usable text is a little under that. Many low-cost NFC reader bundles include MIFARE Classic cards or fobs.

Zaparoo can read and write NDEF text on MIFARE Classic 1K tags, but compatibility depends more on the reader, phone, and driver than it does with [NTAG](./ntag.md). Blank tags may need to be NDEF formatted before use. The Android Zaparoo App can try to format and write them when the phone supports MIFARE Classic. Zaparoo Core can write them through supported PN532/libnfc reader paths.

The main exception is the [ACR122U](../../readers/nfc/acr122u.md). On Windows, the ACR122U PC/SC driver can scan tags but cannot write through Zaparoo. On Linux-based platforms, the libnfc ACR122U driver can attempt MIFARE Classic writes, but some cards or reader variants may need manual formatting or may not write reliably.

:::warning NTAG recommended
MIFARE Classic has limited compatibility compared to NTAG tags. Most notably, iPhones do not support MIFARE Classic, so you can't read or write these tags from the Zaparoo App on iOS. If you're buying new tags, get NTAG instead.
:::

## Compatibility

| Feature | MIFARE Classic | NTAG215 |
| --- | --- | --- |
| Zaparoo NDEF payload limit | 720 bytes | 496 bytes |
| iPhone support | No | Yes |
| Android support | Device-dependent | Yes |
| Zaparoo App (iOS) | No | Yes |
| Zaparoo App (Android) | Device-dependent | Yes |

## Troubleshooting

**My iPhone won't read the card.** iPhones don't support MIFARE Classic. Use an Android phone that does, or a reader connected to Core.

**The write fails on a new card.** Blank MIFARE Classic cards often need NDEF formatting first. The Android Zaparoo App can format them on phones that support MIFARE Classic; otherwise write them through a PN532 reader connected to Core.

**It writes on Android but the ACR122U won't.** The Windows ACR122U driver is read-only in Zaparoo, and the Linux libnfc path is unreliable with some cards and clones. Use a PN532 reader for writing.

## NFC toys

Several NFC toy lines use MIFARE chips internally. See [NFC Toys](../nfc-toys/index.md) for details on using them with Zaparoo:

- [Skylanders](../nfc-toys/index.md#skylanders) (MIFARE Classic 1K)
- [Disney Infinity](../nfc-toys/index.md#disney-infinity) (MIFARE)
