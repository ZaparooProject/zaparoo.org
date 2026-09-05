---
sidebar_position: 2
description: "Find the Zaparoo page that answers what you want to do: launch a random game, use an Amiibo, limit playtime, back up saves, print card labels, and more."
keywords: [zaparoo how to, zaparoo random game card, zaparoo amiibo, zaparoo playtime limit, zaparoo backup saves, zaparoo card labels]
---

# Common Tasks

Not sure which page you need? Find what you want to do below. Each link goes to the page that explains it.

## Launching games

- **Launch a game from a card.** Write it in the [Zaparoo App](./app/index.md#create): pick the game, tap a blank NFC card, done.
- **Launch a random game from a system.** Use the [`launch.random`](./zapscript/launch.md#launchrandom) command on a card.
- **Put a whole folder or a list of games on one card.** Create a [playlist](./features/playlists.md) and scan the card again to move through it.
- **Use an Amiibo, Skylander, or other toy.** Map each figure to a game with [NFC toys](./tokens/nfc-toys/index.md).
- **Use the barcode on a game box or a printed QR code.** See [barcodes](./tokens/barcodes.md) and [QR codes](./tokens/qr-codes.md).
- **Launch from your phone without a reader.** [Zaparoo App Pro](./app/index.md#zaparoo-app-pro) turns your phone into the reader.
- **Browse and launch from the TV on MiSTer.** Install [Zaparoo Frontend](./frontend/index.mdx).
- **Boot an alternate MiSTer core without a game.** Use [`launch.system` with `?launcher=`](./zapscript/launch.md#launchsystem).
- **Launch emulators on a Linux desktop or handheld.** Core registers the [standalone emulators](./platforms/linux/launchers.md#standalone-emulators) it finds installed, plus EmuDeck and RetroDECK.

## Households and arcades

- **Limit playtime.** Set limits and warnings with [play controls](./features/play-controls.md#playtime-limits).
- **Give each person their own settings, limits, and saves.** Create [device profiles](./features/profiles.md).
- **Stop an accidental scan from killing the current game.** Turn on the [launch guard](./features/play-controls.md#launch-guard).
- **Keep music playing while a game runs.** Use the [background music](./features/audio.md#background-music) slot.

## Protecting your setup

- **Back up saves and settings.** Create a local backup or turn on cloud backup with Warp in [device backups](./features/backups.md).
- **Make one card work on two devices.** Write a portable title on the card; see [using tokens on multiple devices](./tokens/index.md#using-tokens-on-multiple-devices).
- **Restore a setup onto a replacement device.** Follow [restore a backup](./features/backups.md#restore-a-backup).
- **Keep Core up to date.** Core checks on its own; turn on automatic installs or install by hand with [Core updates](./core/updates.md).

## Automation

- **Run a script or automation when a card is tapped.** Use [hooks](./features/hooks.md), or send scans from Home Assistant with the [MQTT reader](./readers/mqtt.md).
- **Send events to lights, marquees, or other software.** Set up [publishers](./features/publishers.md).
- **Control Zaparoo from your own code.** Use the [Core API](./core/api/index.md).

## Cards and labels

- **Design and print card labels.** Start with the [labels guide](./labels/index.md), which covers Zaparoo Designer, printing, and cutting.
- **Choose which NFC cards to buy.** Read [NFC cards and tags](./tokens/nfc/index.md).
- **Store and display a collection.** See [token storage](./tokens/storage/index.md).
- **Burn a disc that runs a command.** Put the ZapScript in a [`zaparoo.txt` file on the disc](./readers/optical-drive.md#use-a-token-file-on-a-disc).

## When something is wrong

- **A reader is not detected.** Start with [reader troubleshooting](./readers/index.md#troubleshooting).
- **A card scans but nothing launches.** Check the platform's launcher page, for example [MiSTer launchers](./platforms/mister/launchers.md), then [mappings](./features/mappings.md).
- **Collect logs and get help.** See the [help page](/support/).

Still lost? The [glossary](./glossary.md) defines the terms used across these docs, and the [Discord](https://zaparoo.org/discord) is the fastest place to ask.
