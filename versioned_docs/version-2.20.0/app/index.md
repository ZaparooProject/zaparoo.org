---
description: "The Zaparoo App for iOS and Android: connect to Zaparoo Core, browse and launch your library, write tokens, and use your phone as a reader with Pro."
keywords: [zaparoo app, zaparoo ios, zaparoo android, nfc app game launcher, zaparoo mobile, zaparoo pro]
---

# Zaparoo App

Use the Zaparoo App to manage [Zaparoo Core](../core/index.md) from an iPhone or Android phone. It can find Core devices on your local network, or you can enter a device's IP address manually.

Every Core release also includes the browser-based [Web UI](./web.md) for setups that do not use a phone.

## First run {#first-run}

1. Install the app from the App Store or Google Play. Links are on the [Downloads](/downloads/) page.
2. Open **Settings**. On the device card at the top, tap the search icon to find Zaparoo devices on your network, or type the device's IP address into the address field.
3. If the card shows **Pairing required**, tap the key icon and enter the six-digit PIN from Core. Where you get the PIN depends on the platform:
   - **MiSTer, Batocera, Linux, and RePlayOS:** open the [terminal UI](../core/tui.md) (`zaparoo` in the MiSTer Scripts menu, the Ports system on Batocera, or `zaparoo` in a terminal) and go to **Settings > Clients > Pair**.
   - **SteamOS:** select **Pair client** in the [Decky plugin](../platforms/steamos/decky.md), or run `~/.local/bin/zaparoo -pair` in Konsole.
   - **Windows:** right-click the tray icon and choose **Pair Device...**.
4. If searching finds no games, open **Settings > Manage Media** and run a [media database update](../features/scraping.md#updating-the-media-database). Core only knows about games it has indexed.
5. Open **Create**, search for a game, and hold a blank NFC card to your phone to write it.
6. Tap the card on your reader.

## What the app does

The app has four main sections.

### Zap

<Gallery media={[
  { src: "/img/docs/app/zap.webp", width: 540, height: 1080, alt: "Zap tab with the scan button, Camera and Controls shortcuts, and the connected device card" },
  { src: "/img/docs/app/controls.webp", width: 540, height: 1080, alt: "Controls sheet with remote buttons and a keyboard tab" },
]} />

Scan [NFC tags](../tokens/nfc/index.md), [QR codes](../tokens/qr-codes.md), or [barcodes](../tokens/barcodes.md) from the home screen. You can also:

- See and stop media playing on the connected device, including separate foreground and background playback, and favorite, like, dislike, or save the game for later.
- Run a previous token again from your scan history.
- Open **Controls** for remote buttons, keyboard input, and screenshots on platforms that support them.

### Create

<Gallery media={[
  { src: "/img/docs/app/create.webp", width: 540, height: 1080, alt: "Create tab with search for media, mappings, custom ZapScript, and NFC utilities" },
  { src: "/img/docs/app/search-result.webp", width: 540, height: 1080, alt: "A search result with its system, tags, path, and ZapScript, and a Write to tag button" },
  { src: "/img/docs/app/nfc-utils.webp", width: 540, height: 1080, alt: "NFC utilities screen for reading tag information" },
]} />

Search the connected device's media library and write a result to an NFC tag. Blank NTAG215 cards are stocked in the <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink>. Create also includes:

- A [ZapScript](../zapscript/index.md) editor for custom commands, plus options for choosing title tags such as region or disc number.
- Options for writing the media currently playing on Core.
- **New deck**, which starts a [deck](#decks).
- NFC tools for reading, formatting, erasing, and making compatible tags permanently read-only.
- A [mappings](../features/mappings.md) manager for assigning [NFC toys](../tokens/nfc-toys/index.md) and barcodes without changing them. You can view mappings loaded from Core's mapping files, but only edit mappings managed by the app.

### Library

<Gallery media={[
  { src: "/img/docs/app/library.webp", width: 540, height: 1080, alt: "Library tab listing Favorites and systems filtered by category" },
  { src: "/img/docs/app/library-system.webp", width: 540, height: 1080, alt: "Folders and files inside a system" },
  { src: "/img/docs/app/library-game.webp", width: 540, height: 1080, alt: "A game's details with Favorite, Write, and Launch actions" },
]} />

Browse systems and folders from Core's media library, then:

- Search across every system.
- View artwork, descriptions, release details, and tags.
- Launch a title or write it to an NFC tag.
- Favorite, like, dislike, or save a title for later. Each has its own collection under **Collections**, and each is a [tag you can filter on](../features/tags.md#user-tags).

Library and its lists need a media database. Create one from Settings if the app prompts you.

#### Decks

A [deck](../features/playlists.md#deck) is a list of games and scripts saved on the device that plays as a playlist. Start one with **New deck** on the Create tab, or **Add to deck** on a game's details. Add games from a search, your own ZapScript, or a virtual card by its ID, and drag items to reorder them. A deck holds up to 120 items.

Open a deck in Library to **Play** it, **Open** it to [pick an item](../zapscript/playlist.md#playlistopen), **Write** it to a card, or **Share** a link to it. A card written for a deck keeps working when you change the deck. A deck someone else shared, or one your Zaparoo Online account has locked, is read-only. With [Library sync](../online/index.md#library-sync) on, decks and your lists stay the same on every linked device.

### Settings

<Gallery media={[
  { src: "/img/docs/app/settings.webp", width: 540, height: 1080, alt: "Settings tab with the device address card, media database update, and settings list" },
  { src: "/img/docs/app/readers.webp", width: 540, height: 1080, alt: "Readers settings with scan mode and scanning options" },
  { src: "/img/docs/app/play-controls.webp", width: 540, height: 1080, alt: "Play Controls settings with profiles and playtime limits" },
  { src: "/img/docs/app/online.webp", width: 540, height: 1080, alt: "Zaparoo Online sign-in screen" },
]} />

Settings includes:

- Finding Core devices, switching between saved devices, and managing pairing.
- Updating the media library and downloading artwork and metadata.
- Configuring scan behavior and connected [external readers](../readers/index.md).
- Inbox notifications, app icon badges on supported devices, accessibility, and language.
- **Zaparoo Online**: signing in, linking a Core device, subscribing to or managing Warp, and restoring purchases. The same page manages the connected device's Online features, including [Library sync](../online/index.md#library-sync), remote control, an **All online features** switch, and unlinking, whether or not you are signed in. Changing them needs an admin or local connection to Core.
- [Play Controls](../features/play-controls.md) for playtime limits, Launch Guard, and [device profiles](../features/profiles.md). Profile management needs an up-to-date Core.

If Core requires an encrypted connection, the app asks for the pairing PIN shown by Core. If Core's network address changes later, the app can reconnect without asking you to pair it again.

The app is available in English, Chinese (Simplified), Dutch, French, German, Japanese, Korean, and Spanish.

## Zaparoo App Pro {#zaparoo-app-pro}

Pro (shown as Zaparoo Pro inside the app) covers features that use the phone itself as a wireless reader. Managing Core, browsing your library, and creating tokens remain free.

There are two current Pro features:

- **Launch on scan:** Scan NFC tags, QR codes, or barcodes with your phone to launch them on the connected Core device.
- **Shake to launch:** Shake your phone to play something random from a chosen system or run custom [ZapScript](../zapscript/index.md).

Pro is available as a one-time purchase through the App Store or Play Store, with future Pro features included. Linking it to a free [Zaparoo Online](../online/index.md) account lets you use it on both Android and iOS. Pro is also included while your [Warp subscription](../online/index.md#cloud-backup-with-warp) is active. If you'd rather support Zaparoo development another way, there are [other ways to help](/sponsor/).

## Getting the app

The Zaparoo App is on the iOS App Store and Google Play. See the [Downloads](/downloads/) page for store links.

The [Web UI](./web.md) is built into Core and opens in any browser on your local network. Phone features such as NFC, camera scanning, device discovery, and Pro are not available there.

## Open source

The [app source code](https://github.com/ZaparooProject/zaparoo-app), including Pro features, uses the [Apache 2.0 license](https://github.com/ZaparooProject/zaparoo-app/blob/main/LICENSE). You can inspect, build, and modify it under those terms. Please do not redistribute prebuilt copies with Pro unlocked, since Pro purchases fund ongoing development.

## Troubleshooting

**The app can't find my device.** Device search works only in the phone app, not the Web UI, and the phone and the device must be on the same network. If search finds nothing, type the device's IP address into the address field on the device card under **Settings**.

**It says pairing required.** Core is set to require encrypted connections. Get a PIN from Core (terminal UI: **Settings > Clients > Pair**, or run `zaparoo -pair` on the device), then enter it under **Pair with Device**. The PIN expires after five minutes and works once. If the app says no pairing is in progress, start pairing on the device again for a new PIN.

**Library says to create a media database.** In **Settings**, run a media database update, then open Library again.

**A section says it requires a newer Core.** The app hides features the connected Core cannot provide: Controls need Core v2.10.0, Library and Favorites need v2.15.0, profiles need v2.16.0, and decks, likes, and play later need v2.18.0. Update Core to use them.

**Writing a tag fails.** The tag is probably full or read-only. See [NTAG troubleshooting](../tokens/nfc/index.md#troubleshooting).

## FAQ

**Do I need the app to use Zaparoo?**

No. You can also manage Core with the built-in [Web UI](./web.md), [terminal UI](../core/tui.md), or [CLI](../core/cli.md) without installing anything on your phone.

**Does my phone need to be near my MiSTer or other device?**

No. Your phone and Core device do not need to be next to each other, but both must be reachable on the same local network.

**Does the app work on iPhone?**

Yes. iPhones can scan and write [NTAG](../tokens/nfc/index.md) tags, but they do not support [MIFARE Classic](../tokens/nfc/mifare.md). Use NTAG tags for phone-based scanning and writing.
