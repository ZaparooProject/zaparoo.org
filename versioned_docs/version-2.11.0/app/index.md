---
description: "The Zaparoo App for iOS and Android: connect to Zaparoo Core, scan tokens, write NFC tags, search your media library, and use your phone as a wireless reader with Pro."
keywords: [zaparoo app, zaparoo ios, zaparoo android, nfc app game launcher, zaparoo mobile, zaparoo pro]
---

# Zaparoo App

The Zaparoo App is the main way to interact with [Zaparoo Core](../core/index.md) from your phone. Install it on iOS or Android and it connects to your Core service over the local network. The app can search for nearby Zaparoo devices, or you can enter your device's IP address manually.

If you'd rather not use a phone at all, there's a browser-based version of the app bundled with every Core release. See the [Web UI](./web.md) page for that.

## What the app does

The app has three main sections:

**Zap** is the home screen. You can scan [NFC tags](../tokens/nfc/index.md), [QR codes](../tokens/qr-codes.md), or [barcodes](../tokens/barcodes.md), see what's currently playing on the connected device, stop playback, and check what was last scanned. Tapping the scan button puts the phone into active scanning mode; once you're done you can review your scan history too.

**Create** is where you make tokens. Search your connected device's media library and write results directly to an NFC tag, or write the currently playing media to a new tag. There's also a custom [ZapScript](../zapscript/index.md) editor for arbitrary commands, a set of NFC utilities for reading raw tag data, formatting, erasing, and making tags read-only, and a [mappings](../features/mappings.md) tool for assigning [NFC toys](../tokens/nfc-toys/index.md) and barcodes to media without writing to the tag itself.

**Settings** covers everything else: entering your device address or searching for nearby Zaparoo devices automatically, updating the media database, configuring reader behavior (scan mode, audio feedback, auto-detecting [external readers](../readers/index.md)), accessibility options, language, and your [Zaparoo Online](../online/index.md) account for managing purchases and subscriptions. Pro features and purchase restoration are also in here.

The app is available in English, Chinese (Simplified), Dutch, French, German, Japanese, and Korean.

## Zaparoo Pro

Pro is defined by a single rule: any feature that lets the app act as a reader using the phone's own hardware sensors. Everything else is free.

There are two current Pro features. Launch on scan forwards in-app scans to the connected device so the phone works as a wireless Zaparoo reader over Wi-Fi, the same as any physical reader would. Shake to launch uses the accelerometer: shake the phone to play something random from a chosen system, or trigger a custom [ZapScript](../zapscript/index.md).

Pro is a one-time purchase through the App Store or Play Store. All future Pro features are included at no extra cost. If you'd rather support Zaparoo development another way, there are [other ways to help](/sponsor/).

## Getting the app

The Zaparoo App is on the iOS App Store and Google Play. See the [Downloads](/downloads/) page for current links and version information.

There's also the [Web UI](./web.md), a version of the app embedded in Zaparoo Core and accessible from any browser on your local network. NFC, camera scanning, network device discovery, and Pro aren't available in the browser.

## Open source

The [app source code](https://github.com/ZaparooProject/zaparoo-app) is open source under the [Apache 2.0 license](https://github.com/ZaparooProject/zaparoo-app/blob/main/LICENSE), including the Pro features. You're free to build and modify it under the license terms. The project just asks in good faith that you don't redistribute compiled builds with Pro features enabled, since those purchases fund ongoing development.

## FAQ

**Do I need the app to use Zaparoo?**

No. The app is the most convenient way to manage things and write tags, but you can also use the built-in [Web UI](./web.md) from any browser, the [TUI](../core/tui.md), or the [CLI](../core/cli.md) without installing anything on your phone.

**Does my phone need to be near my MiSTer or other device?**

No. The app communicates with Zaparoo Core over Wi-Fi. As long as both are on the same network, distance doesn't matter.

**Does the app work on iPhone?**

Yes. The Zaparoo App is on iOS and iPhones can scan and write NFC tags. The one limitation is that iPhone NFC only supports [NTAG](../tokens/nfc/ntag.md) format tags, not [MIFARE Classic](../tokens/nfc/mifare.md), but NTAG is the tag type Zaparoo recommends anyway so this usually isn't an issue.
