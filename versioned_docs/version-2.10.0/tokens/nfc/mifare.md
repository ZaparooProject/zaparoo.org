# MIFARE Classic

MIFARE Classic 1K is an older NFC tag standard with 1024 bytes of storage (716 bytes usable). If you buy a cheap NFC reader from AliExpress or Amazon, the bundled tags are almost always MIFARE Classic.

Zaparoo can read and write to MIFARE Classic 1K tags, including most Chinese clones. These tags need to be NDEF formatted before use, but Zaparoo Core and the Zaparoo App handle this automatically. The exception is the [ACR122U](../../readers/nfc/acr122u.md) reader, which uses the libnfc driver and has limited MIFARE Classic write support. Writing with an ACR122U may require manually formatting the tag first.

:::warning NTAG recommended
MIFARE Classic has limited compatibility compared to [NTAG](./ntag.md) tags. Most notably, iPhones do not support MIFARE Classic at all, so you can't read or write them from the Zaparoo App on iOS. If you're buying new tags, get NTAGs instead.
:::

## Compatibility

| Feature | MIFARE Classic | NTAG215 |
| --- | --- | --- |
| Storage | 716 bytes usable | 504 bytes |
| iPhone support | No | Yes |
| Android support | Yes | Yes |
| Zaparoo App (iOS) | No | Yes |
| Zaparoo App (Android) | Yes | Yes |

## NFC toys

Several NFC toy lines use MIFARE chips internally. See [NFC Toys](../nfc-toys/index.md) for details on using them with Zaparoo:

- [Skylanders](../nfc-toys/skylanders.md) (MIFARE Classic 1K)
- [Disney Infinity](../nfc-toys/disney-infinity.md) (MIFARE)
