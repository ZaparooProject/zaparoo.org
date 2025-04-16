# MIFARE Classic

:::warning
MIFARE is only partially supported by Zaparoo. It can read cards just fine, but it can only write to them after the card has been NDEF formatted with a third party application.
:::

MIFARE Classic 1K tags have been confirmed working with Zaparoo. They have 716 bytes of storage. If you order a commercial NFC reader that comes with tags, this is often the standard you'll receive.

They're totally usable with Zaparoo, but generally not recommended at this stage if buying new tokens separately.

At this stage, it's possible to format these tags using the [NFC Tools](https://www.wakdev.com/en/apps/nfc-tools-pc-mac.html) software on a PC or Mac using an [ACR122U](../../readers/nfc/acr122u.md) NFC reader or using the NFC Tools [Android app](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc&hl=en&gl=US) on **some** Android phones. Use either of these methods to write a "Text record" to the MIFARE tag, it doesn't matter what text. From then on the tag should be fully compatible with Zaparoo.

This limitation will be fixed in later Zaparoo versions.
