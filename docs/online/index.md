---
description: "Use Zaparoo Online for cloud backups, play history sync, the User API, and virtual cards and decks."
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

[Zaparoo Online](https://online.zaparoo.com) is an optional companion service for features that need an account or cloud connection. It can back up Zaparoo data from every Core platform, include supported [MiSTer](../platforms/mister/index.md) and [SteamOS](../platforms/steamos/index.md) settings and saves, sync play history, give apps access to your data, and manage virtual cards and decks. [Zaparoo Core](../core/index.md) continues to work without an Online account.

Cloud backup requires Warp, the paid tier of Zaparoo Online. Play history sync, the User API, and virtual cards and decks are free. Remote control through the User API is free for one device at a time and unlimited with Warp.

Online currently provides:

- **Cloud backup with Warp:** keep off-site snapshots of Zaparoo data, plus supported MiSTer saves and settings
- **Play history sync:** optionally upload play sessions to your account
- **User API:** give apps scoped access to data from your account
- **Remote control:** let apps you authorise send approved commands to a device that has opted in
- **Virtual cards and decks:** create cards and collections online, then write them to physical NFC tags

:::info Optional Online Service
Zaparoo Online is a proprietary service operated by [Wizzo Pty Ltd](https://wizzo.au/). It complements the open-source Zaparoo projects without replacing local functionality. Linking a device does not enable cloud backup or play history sync automatically.
:::

## Create an account

1. Go to [online.zaparoo.com](https://online.zaparoo.com) and choose **Sign up**.
2. Use an email address and password, or continue with Google or Apple.
3. Claim a username when prompted.
4. Link a device: on the device, open **Settings > Online** in the terminal UI (or the Decky plugin on SteamOS) to get a URL and one-time code, then approve it from the **Link device** button on your Online dashboard.

Linking a device does not turn on cloud backup, play history sync, or remote control. Each is enabled separately.

## Cloud backup with Warp

Warp is the optional paid tier for Zaparoo Online. It adds automatic off-site backups for linked Core devices and includes Zaparoo App Pro while the subscription is active.

Core can upload snapshots on a daily or weekly schedule, or only when you start one. Online keeps the latest 30 changed snapshots for each linked device. Snapshots from every platform contain Zaparoo-owned data. MiSTer and SteamOS snapshots can also contain supported platform settings, saves, and save states. Comparable platform-data backup support is planned for more platforms. See [Device Backups](../features/backups.md#cloud-backup) for setup, contents, exclusions, and restore behavior.

Portable local backups remain free. Ending a Warp subscription stops new cloud snapshots but leaves existing snapshots available to browse, download, and restore. If you unlink a device, its backups stay under **Unlinked devices** for 60 days and are then deleted.

Patreon Supporter and Sponsor members have Warp while their membership is active. Link Patreon under **Account > Warp** instead of subscribing separately.

<WarpCallout utmContent="online_docs" />

If Warp isn't for you, there are [other ways to support Zaparoo](/sponsor/).

## Play history sync

Core keeps play history on the device by default. Linking a device does not upload it automatically.

To opt in from the Core terminal UI:

1. Open **Settings > Online**.
2. Link the device to your Zaparoo Online account if it is not already linked.
3. Enable **Play history sync**.

On SteamOS, use **Zaparoo Online > Link device** in the Decky plugin, approve the displayed QR code or URL, then enable **Sync play history**. Linking alone uploads nothing.

Play history sync does not require Warp. The first sync uploads all retained local history. Core requests another sync when a session starts or ends, refreshes an active session about every five minutes, and runs a catch-up pass about once an hour.

Each synced session includes:

- Session and profile IDs; profile names and PINs are not included
- System, launcher, media name, and media path
- Parsed filename tags such as region or disc number; user-created tags are not included
- Start and end times, play duration, and clock-reliability details
- Whether the local record was marked as deleted
- A media identity derived from the file (canonical system, normalized title, and a content fingerprint) so the same game can be matched across devices

Synced history also shows on the device's page in Online under **Recent play**.

Core checks the setting again before each batch. Disabling it stops later uploads but does not delete history already stored by Zaparoo Online. Unlinking the device also stops sync without deleting play history already stored. You can delete stored play history at any time under **Account > Profile**.

While sync is enabled and the device is linked, local retention cleanup preserves sessions that have not reached the server yet. After a session is acknowledged, the normal [`playtime.retention`](../core/config.md#retention) period still applies to the local copy.

## Remote control

Apps you authorise through the [User API](#user-api) can send commands to a device once that device opts in: turn on **Remote control** under **Settings > Online** in the terminal UI. A remote command can launch a game or a system, stop what is playing, search and browse the library, or run a MiSTer script, and each one is recorded on the device under **Remote control activity**. Unlinking the device turns it off again.

Free accounts can remote-control one device at a time. Warp subscribers are not limited.

The **Remote status** line under the toggle shows whether Online can currently reach the device, including when a free account's remote slot is held by another device. Select it for an explanation of what to do.

## User API

The [Zaparoo Online User API](https://developers.zaparoo.com/) gives apps scoped access to data from your account and, for devices that opt in, remote control. It is free to use and does not require Warp.

Version 1 can read:

- Your profile and premium-access status
- Play sessions, active now-playing status, and play-time summaries
- Cards you have redeemed, and your decks
- Linked Core devices
- Backup snapshots, manifests, and individual files

To create a key:

1. Open [Zaparoo Online](https://online.zaparoo.com) and go to **Account**.
2. Select **User API**.
3. Choose only the permissions the app needs.
4. Create the key and save it when shown. The secret cannot be viewed again. An account can have up to 10 active keys.

Send the key as a bearer token with requests to `https://user.api.zaparoo.com`:

```http
Authorization: Bearer zpk1_...
```

Keys use separate scopes for profile, play history, cards, decks, devices, and backups, and can be revoked at any time. The `read:backups` scope can download files from your snapshots, so only give it to apps you trust.

The `devices:launch` and `devices:scripts` scopes let an app use [remote control](#remote-control) on devices that have it turned on; only grant them to apps you trust. Keys cannot change your account data. See the [complete User API reference](https://developers.zaparoo.com/) for endpoints, device operations, pagination, rate limits, and response schemas.

## Virtual cards and decks {#cards-and-decks}

Virtual cards and decks are free Zaparoo Online features. You can create as many as you would reasonably need; only high abuse-prevention limits apply. One optional display setting, hiding a card's zap count, needs Warp.

A card is a virtual container for one or more [ZapScript](../zapscript/index.md) commands. Each card gets a unique short URL that can be written to a physical NFC tag. Because the tag points to the card rather than storing the script itself, changes made in Online apply without rewriting the tag.

Decks organize cards into shareable collections. You can reorder cards, share a deck through a public URL, and lock a deck to prevent further changes. Cards and decks each have a public page at their short URL, and a deck's URL can be written to a tag the same way as a card's.

Physical Zaparoo cards that come with a code can be added to your account under **Redeem cards**.

Use the [Zaparoo App](../app/index.md) to write cards and decks to physical NFC tags.

## Your account

- **Dashboard**: device, deck, and zap counts, your decks, and the **Link device** button.
- **Devices**: each linked device's platform, Core version, backup storage used, backups with per-file downloads, and recent play.
- **Unlinked devices**: backups from unlinked devices, kept for 60 days.
- **Redeem cards**: add physical Zaparoo cards with a code to your account.
- **Account > Profile**: display name, email, a portable export of your data, play history deletion, and account deletion.
- **Account > Security**: password, linked Google and Apple sign-in, and two-factor authentication with backup codes.
- **Account > Warp**: your access and billing status, including Patreon.
- **Account > User API**: create and revoke API keys.
