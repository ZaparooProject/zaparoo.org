---
description: "Zaparoo Online: create virtual NFC card decks, sync play history, create cloud backups, write ZapScript to physical tags, and share collections."
keywords: [zaparoo online, virtual nfc cards, zaparoo cloud, zaparoo play history, online.zaparoo.com, nfc card sync]
---

# Zaparoo Online

[Zaparoo Online](https://online.zaparoo.com) is a companion web service for managing virtual cards and decks. Create cards with ZapScript on them, organize them into shareable decks, and write them to physical NFC tags using the [Zaparoo App](../app/index.md).

Linked Core devices can also upload play history when you explicitly opt in. Warp members can use the same account for cloud device backups.

Cards live online. Change a card's script on the website, and every NFC tag linked to that card updates instantly without rewriting.

:::info Not Open Source
Zaparoo Online is a proprietary service operated by [Wizzo Pty Ltd](https://wizzo.au/). It adds cloud features that complement the open source project without replacing any offline functionality. Using Zaparoo Online helps support the ongoing development of the Zaparoo open source project, the same way purchasing from the <ProductLink href="https://shop.zaparoo.com" store="shop">Zaparoo Shop</ProductLink> does.
:::

## Cards

A card is a virtual container for one or more [ZapScript](../zapscript/index.md) commands. Each card gets a unique short URL that can be written to a physical NFC tag.

You can create cards from the dashboard or by redeeming a code, then add ZapScripts to define what happens when the card is scanned. Because the tag points to the card (not the script), changes you make apply instantly to all NFC tags linked to that card.

## Decks

Decks are collections of cards, like playlists. You can organize cards into themed sets, reorder them, and share the deck via a public URL. Decks can also be locked to prevent changes after sharing.

## Writing to NFC tags

Cards and decks are written to physical NFC tags using the [Zaparoo App](../app/index.md). The tag stores a link to the card, not the script itself, so the tag never needs to be rewritten when you change what it does.

## Play history sync

Core keeps play history on the device by default. Linking a device does not upload it automatically.

To opt in from the Core terminal UI:

1. Open **Settings > Online**.
2. Link the device to your Zaparoo Online account if it is not already linked.
3. Enable **Play history sync**.

Play history sync does not require Warp. The first sync uploads all retained local history. Core then checks for new and updated sessions about once an hour.

Each synced session includes:

- Session and profile IDs; profile names and PINs are not included
- System, launcher, media name, and media path
- Parsed filename tags such as region or disc number; user-created tags are not included
- Start and end times, play duration, and clock-reliability details
- Whether the local record was marked as deleted

Core checks the setting again before each batch. Disabling it stops later uploads but does not delete history already stored by Zaparoo Online. Unlinking the device also stops sync without deleting existing online data.

While sync is enabled and the device is linked, local retention cleanup preserves sessions that have not reached the server yet. After a session is acknowledged, the normal [`playtime.retention`](../core/config.md#retention) period still applies to the local copy.

## Warp

Warp is the premium tier for Zaparoo Online, available through [Patreon](https://www.patreon.com/wizzo). It unlocks higher card and deck limits, features like hiding zap counts on shared cards, and cloud backups for supported Core devices.

Link a device from the Core terminal UI to upload snapshots manually or on a daily or weekly schedule. Existing snapshots can be browsed and restored from other compatible devices linked to the same account. See [Device Backups](../features/backups.md#cloud-backup) for setup and restore behavior.
