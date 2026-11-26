---
sidebar_position: 2
description: "Using MIFARE Classic 1K NFC tags with Zaparoo: NDEF formatting, reader and phone compatibility, and troubleshooting."
keywords: [mifare classic zaparoo, mifare 1k nfc, zaparoo nfc tags, acr122u mifare]
---

# MIFARE Classic

MIFARE Classic 1K is an older NFC tag standard with 1024 bytes of storage. After the card's reserved blocks, Zaparoo has 720 bytes available for the NDEF message, so usable text is a little under that. Many low-cost NFC reader bundles include MIFARE Classic cards or fobs.

Zaparoo can read and write NDEF text on MIFARE Classic 1K tags, but compatibility depends more on the reader, phone, and driver than it does with [NTAG](./index.md#ntag-types). Blank tags may need to be NDEF formatted before use. The Android Zaparoo App can try to format and write them when the phone supports MIFARE Classic. Zaparoo Core can write them through PN532 readers and [USB smart card readers](../../readers/nfc/usb-smart-card-readers.md) such as the ACR122U.

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

**The write fails on a new card.** Blank MIFARE Classic cards often need NDEF formatting first. The Android Zaparoo App can format them on phones that support MIFARE Classic; otherwise write them through a reader connected to Core.

## NFC toys

Several NFC toy lines use MIFARE chips internally. See [NFC Toys](../nfc-toys/index.md) for details on using them with Zaparoo:

- [Skylanders](../nfc-toys/index.md#skylanders) (MIFARE Classic 1K)
- [Disney Infinity](../nfc-toys/index.md#disney-infinity) (MIFARE)
