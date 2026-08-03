---
description: "Zaparoo Online: protect MiSTer saves with Warp cloud backup, sync play history, use the User API, and manage virtual cards and decks."
keywords:
  [
    zaparoo online,
    zaparoo user api,
    virtual nfc cards,
    zaparoo cloud,
    zaparoo play history,
    online.zaparoo.com,
    nfc card sync,
  ]
---

# Zaparoo Online

[Zaparoo Online](https://online.zaparoo.com) is an optional companion service for features that need an account or cloud connection. It can back up a [MiSTer](../platforms/mister/index.md) off-site, sync play history, give apps access to your data, and manage virtual cards and decks. [Zaparoo Core](../core/index.md) continues to work without an Online account.

Cloud backup requires Warp. Play history sync, the User API, and cards and decks are free.

Online currently provides:

- **Cloud backup with Warp:** keep off-site snapshots of MiSTer saves, settings, and Zaparoo data
- **Play history sync:** optionally upload play sessions to your account
- **User API:** give apps scoped, read-only access to data from your account
- **Cards and decks:** create virtual cards and collections, then write them to physical NFC tags

:::info Optional Online Service
Zaparoo Online is a proprietary service operated by [Wizzo Pty Ltd](https://wizzo.au/). It complements the open-source Zaparoo projects without replacing local functionality. Linking a device does not enable cloud backup or play history sync automatically.
:::

## Cloud backup with Warp

Warp is the optional paid tier for Zaparoo Online. It adds automatic off-site backups for linked MiSTer devices and includes Zaparoo App Pro while the subscription is active.

Core can upload snapshots manually or on a daily or weekly schedule. Online keeps the latest 30 changed snapshots for each linked device. You can browse or restore those snapshots from another MiSTer linked to the same account. See [Device Backups](../features/backups.md#cloud-backup) for setup, contents, exclusions, and restore behavior.

Portable local backups remain free. Ending a Warp subscription stops new cloud snapshots but leaves existing snapshots available to browse, download, and restore.

Existing Patreon Supporter and Sponsor members already have Warp access. Link Patreon from your Zaparoo Online account instead of subscribing again.

<a href="https://zaparoo.com/pricing?utm_source=zaparoo.org&utm_medium=referral&utm_campaign=warp&utm_content=online_docs" data-umami-event="online-docs-warp">See Warp plans and pricing</a>.

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

## User API

The [Zaparoo Online User API](https://developers.zaparoo.com/) gives apps read-only access to data from your account. It is free to use and does not require Warp.

Version 1 can read:

- Your profile and premium-access status
- Play sessions, active now-playing status, and play-time summaries
- Redeemed cards and decks
- Linked Core devices
- Backup snapshots, manifests, and individual files

To create a key:

1. Open [Zaparoo Online](https://online.zaparoo.com) and go to **Account**.
2. Select **User API**.
3. Choose only the permissions the app needs.
4. Create the key and save it when shown. The secret cannot be viewed again.

Send the key as a bearer token with requests to `https://user.api.zaparoo.com`:

```http
Authorization: Bearer zpk1_...
```

Keys use separate scopes for profile, play history, cards, decks, devices, and backups, and can be revoked at any time. The `read:backups` scope can download files from your snapshots, so only give it to apps you trust.

Version 1 has no write permissions. Apps cannot change your account data or control linked devices through the current API. See the [complete User API reference](https://developers.zaparoo.com/) for endpoints, pagination, rate limits, and response schemas.

## Cards and decks

Cards and decks are free Zaparoo Online features. You can create as many as you would reasonably need; only high abuse-prevention limits apply.

A card is a virtual container for one or more [ZapScript](../zapscript/index.md) commands. Each card gets a unique short URL that can be written to a physical NFC tag. Because the tag points to the card rather than storing the script itself, changes made in Online apply without rewriting the tag.

Decks organize cards into shareable collections. You can reorder cards, group them into themed sets, share a deck through a public URL, and lock a deck to prevent further changes.

Use the [Zaparoo App](../app/index.md) to write cards and decks to physical NFC tags.
