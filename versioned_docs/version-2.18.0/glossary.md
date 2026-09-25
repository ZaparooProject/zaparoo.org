---
sidebar_position: 17
description: "Definitions of the terms used across the Zaparoo docs: token, reader, NFC, Core, App, Pro, Frontend, Online, Warp, ZapScript, mapping, launcher, UID, NDEF, and more."
keywords: [zaparoo glossary, zaparoo terms, what is a zaparoo token, what is zaparoo core, what is nfc, ndef, uid]
---

# Glossary

Short definitions of the words used across these docs, with a link to the page that covers each one.

## Products

- **Zaparoo Core**: the service that runs on your gaming device. It watches readers, reads tokens, and launches games and media. See [Zaparoo Core](./core/index.md).
- **Zaparoo App**: the free iOS and Android app for connecting to Core, browsing your library, and writing tokens. See [Zaparoo App](./app/index.md).
- **Zaparoo App Pro** (Pro): a one-time in-app purchase that turns your phone into a wireless reader. Included with Warp. See [Pro](./app/index.md#zaparoo-app-pro).
- **Web UI**: the browser version of the app, built into Core. See [Web UI](./app/web.md).
- **Terminal UI (TUI)**: the text menu built into Core for settings, tokens, backups, and logs. It opens when you run Core by hand on platforms that have it. See [Terminal UI](./core/tui.md).
- **Core API**: the local JSON-RPC API that Core exposes. The App, Web UI, and third-party tools all talk to Core through it. See the [Core API reference](./core/api/index.md).
- **Zaparoo Frontend**: a TV and controller-friendly interface for browsing and launching your library on MiSTer. See [Zaparoo Frontend](./frontend/index.mdx).
- **Zaparoo Online**: a free, optional account for play history sync, virtual cards and decks, and the User API. See [Zaparoo Online](./online/index.md).
- **Warp**: the paid tier of Zaparoo Online. Automatic off-site backups of your Zaparoo data (plus saves and settings on MiSTer), with App Pro included. See [cloud backup](./features/backups.md#cloud-backup).
- **Zaparoo Designer**: the web app for designing printable card labels. See [Zaparoo Designer](./designer/index.md).
- **ZapESP32**: open-source firmware that turns an ESP32 board into a wireless NFC reader. See [ZapESP32](./zapesp32/index.md).
- **Zaparoo Shop**: official readers, cards, and starter kits, tested with Zaparoo. Purchases fund development. See the [Zaparoo Shop](https://shop.zaparoo.com).
- **Zaparoo Runtime**: the permanent Steam shortcut Core adds on SteamOS so emulators run as Steam-owned sessions in Gaming Mode. See [SteamOS launchers](./platforms/steamos/launchers.md#zaparoo-runtime-and-gaming-mode).
- **Pairing**: approving a client such as the App, a browser, or a tool with a six-digit PIN so it can talk to Core over an encrypted connection. See [encryption](./core/config/service.md#encryption).

## Tokens and readers

- **Token**: any physical object Zaparoo can scan: an NFC card, sticker, or toy, a QR code, a barcode, a disc, or a USB stick. Software sources such as the API, MQTT, and the file reader can also act as tokens without any hardware. See [tokens](./tokens/index.md).
- **NFC**: near-field communication, the short-range wireless standard that phones and readers use to talk to a tag held a few centimeters away. Zaparoo's most common tokens are NFC cards. See [NFC cards and tags](./tokens/nfc/index.md).
- **RFID**: radio-frequency identification, the broader family of contactless ID technologies that NFC belongs to. Readers sold as "RFID" are not all NFC readers, so check the [readers](./readers/index.md) pages before buying one.
- **Tag** and **card**: an NFC chip in any form. A card is a tag in credit-card shape. See [NFC cards and tags](./tokens/nfc/index.md).
- **NTAG** and **MIFARE Classic**: the two common NFC chip families. NTAG215 is the usual choice. See [NTAG](./tokens/nfc/index.md#ntag-types) and [MIFARE](./tokens/nfc/mifare.md).
- **NDEF**: the standard format for data stored on an NFC tag. Zaparoo writes ZapScript as NDEF text. The "NDEF payload" figures on tag pages are how much of that text fits.
- **UID**: the unique ID burned into every NFC chip. Read-only tokens such as toys are matched by UID. See [NFC toys](./tokens/nfc-toys/index.md).
- **Reader**: the hardware that scans tokens, such as a USB NFC reader, a barcode scanner, or an optical drive. See [readers](./readers/index.md).
- **Driver**: the piece of Core that talks to a particular reader model. See [reader drivers](./readers/drivers.md).
- **Zap Link**: a short URL that points to ZapScript hosted online, so the script can change without rewriting the tag. Virtual cards in Zaparoo Online use Zap Links. See [Zap Links](./zapscript/zap-links.md).

## What happens on a scan

- **ZapScript**: the small scripting language written to tokens that tells Zaparoo what to do. See [ZapScript](./zapscript/index.md).
- **Mapping**: a rule that assigns ZapScript to a token that cannot be written, such as a toy, a barcode, or a disc. See [mappings](./features/mappings.md).
- **Launcher**: the part of Core that starts a game or app on a platform, such as a MiSTer core or a Steam shortcut. See [launchers](./features/launchers.md).
- **Launchable**: anything Core can start, including games, apps, scripts, and media files.
- **Media database**: Core's index of everything it can launch. Games only show up in the App, Frontend, and search after a media database update, so run one after installing Core or adding files. See [media database and scraping](./features/scraping.md).
- **System**: a console, computer, or category Core uses to group media, such as `SNES` or `Arcade`. See [systems](./features/systems.md).
- **Scraping**: importing artwork and metadata for indexed media from local files. See [scraping](./features/scraping.md).
- **Hook**: ZapScript that runs automatically at an event such as a scan or a launch. See [hooks](./features/hooks.md).
- **Playlist**: a list of media or actions that one token steps through on repeated scans. See [playlists](./features/playlists.md).
- **Launch guard**: a setting that holds a scan for confirmation instead of interrupting the current game. See [play controls](./features/play-controls.md#launch-guard).
- **Profile**: a per-person set of settings, playtime limits, and (on MiSTer) saves. See [device profiles](./features/profiles.md).
- **Publisher**: an outbound connection that sends Core events to MQTT or other software. See [publishers](./features/publishers.md).
- **Tap mode**: the default scan mode. You tap a token and take it away, and the media keeps running until you scan something else. See [scan mode](./core/config/readers.md#scan-mode).
- **Hold mode**: the other scan mode. The token has to stay on the reader for as long as the media plays, and removing it stops the media, like real physical media. See [scan mode](./core/config/readers.md#scan-mode).

## Platform terms

- **Update All**: the community updater script for MiSTer. It installs and updates Zaparoo Core alongside cores and other tools. See [MiSTer](./platforms/mister/index.md#install).
- **Gaming Mode** and **Desktop Mode**: the two interfaces on SteamOS and Steam Deck. Gaming Mode is the controller-first Steam interface; Desktop Mode is a normal Linux desktop, and it is where the Core installer runs. See [SteamOS](./platforms/steamos/index.md).
- **Zap**: the home tab of the Zaparoo App, where you scan tokens with your phone and see what is playing. See [Zaparoo App](./app/index.md#zap).
