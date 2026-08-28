---
sidebar_position: 1
description: "Back up and restore Zaparoo Core settings and user data, plus MiSTer configuration, saves, and save states, locally or through Zaparoo Online."
keywords:
  [
    zaparoo backup,
    zaparoo restore,
    mister backup,
    zaparoo cloud backup,
    zaparoo online,
  ]
---

# Device Backups

Device backups capture Zaparoo configuration and user data together with supported platform settings and save data. Use them before reinstalling Core, replacing storage, or moving a setup to another compatible device.

Full-device backup is currently supported on MiSTer. You can create portable ZIP backups on the device without an online account. Cloud backup currently works only on MiSTer and requires a linked [Zaparoo Online](../online/index.md) account.

## What is included

Every backup includes:

- Core configuration
- Favorites, history, token mappings, profiles, and per-game launcher choices from the user database
- Zaparoo Frontend and terminal UI configuration
- Custom launcher and mapping TOML files

MiSTer backups also include supported platform data:

- `MiSTer.ini`, alternate MiSTer INI files, and Downloader configuration
- MiSTer core configuration files and input mappings
- Shared saves and save states
- Separate save and save-state directories created by [device profiles](./profiles.md)

Backups do not include ROMs, disc images, downloaded cores, Core binaries, the rebuildable media database, scraped artwork, logs, or authentication credentials. This includes shared and per-profile `retroachievements.cfg` files used by [MiSTer profiles](./profiles.md#retroachievements-accounts), because they contain plaintext passwords. Paired clients and the destination device's identity, encryption setting, and Zaparoo Online credentials are preserved during restore rather than copied from the backup.

If Core cannot include every file, it marks the backup as partial. Check the backup details for skipped categories and warnings before relying on it.

## Create a local backup

From the Core terminal UI:

1. Open **Settings > Backup**.
2. Under **Local**, select **Back up now**.
3. Wait for the backup to finish.

Local backups are portable ZIP files. On MiSTer, the default location is `/media/fat/zaparoo/backups/files`. Manual backups remain there until you delete them.

Open **Settings > Backup > Local > View backups** to inspect, restore, or delete a backup.

## Restore a backup

Stop any active game before restoring. Core validates the archive, platform, manifest, and file hashes before replacing data.

When you restore a local or cloud backup, Core:

1. Creates a local safety backup of the current device.
2. Applies the selected snapshot as a transaction.
3. Rolls back to the previous state if the restore fails.
4. Restarts to load the restored configuration.

Core keeps the three newest automatic pre-restore safety backups. Manual backups are not pruned automatically.

A restore changes the backed-up settings and data but keeps the current device identity, encryption setting, paired clients, and Zaparoo Online link. Restoring a cloud snapshot copies it onto this device; it does not change or remove the source device or its snapshot.

## Cloud backup

Link the device from **Settings > Online**, or select **Link account** under **Settings > Backup > Cloud**. Core shows a URL and one-time code to approve from your Zaparoo Online account.

Creating new cloud snapshots requires Warp. <a href="https://zaparoo.com/pricing?utm_source=zaparoo.org&utm_medium=referral&utm_campaign=warp&utm_content=backup_docs" data-umami-event="backup-docs-warp">See Warp plans and pricing</a>.

After linking, the Cloud section provides:

- **Automatic backup**: enables or disables scheduled uploads
- **Schedule**: selects `daily`, `weekly`, or `manual`
- **Back up now**: uploads a snapshot immediately
- **View backups**: groups snapshots by their source device and lets you inspect or restore them
- **Status**: shows the latest result, warnings, and service availability

The automatic-backup toggle only controls scheduling. You can run a manual cloud backup while scheduling is disabled. Linked devices can still list and restore existing snapshots after a Warp subscription ends.

Cloud snapshots transfer files in packs. An individual file close to or larger than 64 MiB cannot fit in a pack, so Core skips it and reports a partial backup. Local backups can include larger files when the device has enough free space.

Backup work slows down or pauses while a game is running to avoid competing with gameplay.

## Command line

The `-backup`, `-backups`, and `-restore` flags use the same full-device backup system. See the [Core command-line reference](../core/cli.md#back-up-and-restore-device-data).

## Troubleshooting

### Restore is unavailable

Stop active media and wait for any launch, backup, or restore operation to finish. If Core reports a pending restore transaction, restart Core so recovery can finish before trying again.

### Backup completed with warnings

Inspect the backup details to see which files or categories were skipped. Cloud backups also skip individual files that cannot fit in a 64 MiB transfer pack. On MiSTer, an active personal profile can hide shared-profile saves from the backup, while unavailable network storage can hide other save data. Switch to **Shared Profile**, reconnect any storage, and retry.

### Cloud backup is unavailable

Confirm the device is linked under **Settings > Online**. New cloud uploads require an active Warp subscription. If the server rejected an old link, unlink and link the device again.

### Backup fails for storage space

Free space on the device and retry. A restore also needs space for staging files and the automatic pre-restore safety backup.
