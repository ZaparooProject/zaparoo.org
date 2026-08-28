---
description: "The Zaparoo App for iOS and Android: connect to Zaparoo Core, browse and launch your media library, create tokens, and use your phone as a wireless reader with Pro."
keywords: [zaparoo app, zaparoo ios, zaparoo android, nfc app game launcher, zaparoo mobile, zaparoo pro]
---

# Zaparoo App

Use the Zaparoo App to manage [Zaparoo Core](../core/index.md) from an iPhone or Android phone. It can find Core devices on your local network, or you can enter a device's IP address manually.

Every Core release also includes the browser-based [Web UI](./web.md) for setups that do not use a phone.

## First run

1. Install the app from the App Store or Google Play. Links are on the [Downloads](/downloads/) page.
2. On the device card, tap the search icon to find Zaparoo devices on your network, or type the device's IP address into **Device address**.
3. If the status shows **Pairing required**, tap the key icon and enter the six-digit PIN that Core displays (in the terminal UI under **Settings > Clients > Pair**).
4. Open **Create**, search for a game, and hold a blank NFC card to your phone to write it.
5. Tap the card on your reader.

## What the app does

The app has four main sections.

### Zap

Scan [NFC tags](../tokens/nfc/index.md), [QR codes](../tokens/qr-codes.md), or [barcodes](../tokens/barcodes.md) from the home screen. You can also:

- See and stop media playing on the connected device, including separate foreground and background playback.
- Run a previous token again from your scan history.
- Open **Controls** for remote buttons and keyboard input (Core v2.10.0 or newer), plus screenshots on Core versions that support them.

### Create

Search the connected device's media library and write a result to an NFC tag. Blank NTAG215 cards are stocked in the <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink>. Create also includes:

- A [ZapScript](../zapscript/index.md) editor for custom commands, plus options for choosing title tags such as region or disc number.
- Options for writing the media currently playing on Core.
- NFC tools for reading, formatting, erasing, and making compatible tags permanently read-only.
- A [mappings](../features/mappings.md) manager for assigning [NFC toys](../tokens/nfc-toys/index.md) and barcodes without changing them. You can view mappings loaded from Core's mapping files, but only edit mappings managed by the app.

### Library

Browse systems and folders from Core's media library, then:

- Search across every system or keep a Favorites collection.
- View artwork, descriptions, release details, and tags.
- Launch a title or write it to an NFC tag.

Library and Favorites require Core v2.15.0 or newer and a media database. Create one from Settings if the app prompts you.

### Settings

Settings includes:

- Finding Core devices, switching between saved devices, and managing pairing.
- Updating the media library and downloading artwork and metadata.
- Configuring scan behavior and connected [external readers](../readers/index.md).
- Inbox notifications, app icon badges on supported devices, accessibility, and language.
- **Zaparoo Online**: signing in, linking a Core device, subscribing to or managing Warp, and restoring purchases.
- [Play Controls](../features/play-controls.md) for playtime limits, Launch Guard, and [device profiles](../features/profiles.md). Profile management requires Core v2.16.0 or newer.

If Core requires an encrypted connection, the app asks for the pairing PIN shown by Core. If Core's network address changes later, the app can reconnect without asking you to pair it again.

The app is available in English, Chinese (Simplified), Dutch, French, German, Japanese, Korean, and Spanish.

## Zaparoo App Pro {#zaparoo-app-pro}

Pro (shown as Zaparoo Pro inside the app) covers features that use the phone itself as a wireless reader. Managing Core, browsing your library, and creating tokens remain free.

There are two current Pro features:

- **Launch on scan:** Scan NFC tags, QR codes, or barcodes with your phone to launch them on the connected Core device.
- **Shake to launch:** Shake your phone to play something random from a chosen system or run custom [ZapScript](../zapscript/index.md).

Pro is available as a one-time purchase through the App Store or Play Store, with future Pro features included. Pro is also included while your [Warp subscription](../online/index.md#cloud-backup-with-warp) is active. If you'd rather support Zaparoo development another way, there are [other ways to help](/sponsor/).

## Getting the app

The Zaparoo App is on the iOS App Store and Google Play. See the [Downloads](/downloads/) page for store links.

The [Web UI](./web.md) is built into Core and opens in any browser on your local network. Phone features such as NFC, camera scanning, device discovery, and Pro are not available there.

## Open source

The [app source code](https://github.com/ZaparooProject/zaparoo-app), including Pro features, uses the [Apache 2.0 license](https://github.com/ZaparooProject/zaparoo-app/blob/main/LICENSE). You can inspect, build, and modify it under those terms. Please do not redistribute prebuilt copies with Pro unlocked, since Pro purchases fund ongoing development.

## Troubleshooting

**The app can't find my device.** Device search works only in the phone app, not the Web UI, and the phone and the device must be on the same network. If search finds nothing, type the device's IP address into **Device address**.

**It says pairing required.** Core is set to require encrypted connections. Get a PIN from Core (terminal UI: **Settings > Clients > Pair**, or run `zaparoo -pair` on the device), then enter it under **Pair with Device**. The PIN expires after five minutes.

**Library says to create a media database.** In **Settings**, run a media database update, then open Library again. Library also needs Core v2.15.0 or newer.

**Writing a tag fails.** The tag is probably full or read-only. See [NTAG troubleshooting](../tokens/nfc/ntag.md#troubleshooting).

## FAQ

**Do I need the app to use Zaparoo?**

No. You can also manage Core with the built-in [Web UI](./web.md), [terminal UI](../core/tui.md), or [CLI](../core/cli.md) without installing anything on your phone.

**Does my phone need to be near my MiSTer or other device?**

No. Your phone and Core device do not need to be next to each other, but both must be reachable on the same local network.

**Does the app work on iPhone?**

Yes. iPhones can scan and write [NTAG](../tokens/nfc/ntag.md) tags, but they do not support [MIFARE Classic](../tokens/nfc/mifare.md). Use NTAG tags for phone-based scanning and writing.
