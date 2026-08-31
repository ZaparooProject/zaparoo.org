---
sidebar_position: 4
description: "How Zaparoo Core checks for new releases, when it installs them automatically, what blocks an update, and which platforms update in place."
keywords: [zaparoo core update, zaparoo auto update, zaparoo update channel, zaparoo beta channel, zaparoo core rollback]
---

# Core Updates

Zaparoo Core checks for new releases on its own and tells you when one is available. It only installs a release by itself when you turn automatic installs on, and a build that fails to start is rolled back.

## Update checks

Core checks about every 12 hours against a signed release manifest, and posts a message to the Inbox when a newer release exists. The Inbox is available in the [Zaparoo App](../app/index.md), the [Web UI](../app/web.md), the [terminal UI](./tui.md), and the [Decky plugin](../platforms/steamos/decky.md).

On MiSTer, Core counts as managed by Update All when Downloader is configured with the Zaparoo database, and on Batocera when the Zaparoo package is installed through its package manager. Managed installs still get the Inbox message, but it points at that tool and Core never replaces itself, because the package manager would undo the change. Builds compiled from source never check.

## Settings

Update settings live under `[updates]` in [`config.toml`](./config.md#updates):

| Key | Default | What it does |
| --- | ------- | ------------ |
| `check` | `true` | Check for new releases and post Inbox messages. |
| `install` | `false` | Install new releases automatically. Ignored while `check` is off. |
| `channel` | `"stable"` | `"stable"` or `"beta"`. |

```toml
[updates]
check = true
install = false
channel = "stable"
```

The same settings are `updateCheck`, `updateInstall`, and `updateChannel` on [`settings.update`](./api/methods.md#settingsupdate) in the Core API.

## Where update status shows

- The **Version** line on the [terminal UI](./tui.md) main screen shows a waiting release next to the running version, and says when the last update was rolled back.
- The Windows system tray has an update entry that shows the current state and installs a waiting release.
- `-update` on the [command line](./cli.md#check-for-updates) prints the same status.
- The Inbox message announces a new release, and the `update.status` [API method](./api/index.md#methods) reports the last check's result without contacting the release server.

## Automatic installs

With `install = true`, Core stages the download, runs the new binary once to confirm it starts, backs up the user database, swaps the binary into place, and restarts. If the new build fails to start within 30 seconds, Core restores the previous one. The result arrives as an Inbox message.

An automatic install waits for a quiet minute on the API before it starts, up to 15 minutes, and refuses to run while:

- A media database update, optimization, or metadata import is running.
- A backup, restore, or cloud upload is in progress.
- A reader is writing a tag.
- The battery is below 40 percent, or Core cannot tell what is powering the device.

Media playing, an active playlist, or a busy API only delay an automatic install. Releases can be rolled out in stages, so a device may wait until the release reaches it.

A release that failed to start on this device and was rolled back is not installed automatically again. The next release is offered as normal, and you can retry the same one with `-update`.

## Installing an update yourself

Run `-update` on the device to install a release when one is waiting:

```bash
./zaparoo -update
```

It prints the current version and update state, checks for a new release, and only installs when there is something to install. On Windows, use the tray entry instead.

The API offers the same steps separately:

```bash
./zaparoo -api 'update.status'
./zaparoo -api 'update.check'
./zaparoo -api 'update.apply'
```

`update.status` answers from the last check without contacting anything, [`update.check`](./api/methods.md#updatecheck) reports why an update is blocked and whether `force` can override it, and [`update.apply`](./api/methods.md#updateapply) accepts `force` for playing media, playlists, and a busy API. A manual install needs at least 20 percent battery. `update.apply` needs an admin client or an API key with the `update.apply` capability.

## Platform support

| Platform | Update behavior |
| -------- | --------------- |
| MiSTer, Batocera | Check only when managed by Update All or the Batocera package manager; otherwise updates in place. Batocera updates carry the EmulationStation hook, `multimedia_keys.conf`, the Ports entry, the service files, and the write-game script. |
| Windows | Updates in place when Core can write to its install folder and rename `Zaparoo.exe`; otherwise the Inbox message says to run the installer. |
| All other platforms | Updates in place. |

## Beta channel

`channel = "beta"` includes beta and release candidate builds. Moving back to stable after a beta that changed the media database layout makes Core rebuild the media database on its next start; favorites and launcher overrides are copied to the user database first, and an Inbox message tells you if that copy fails. Import artwork again afterwards with the [scraper](../features/scraping.md).

## Troubleshooting

**An update is reported but nothing installs.** Automatic installs are off unless `install = true`, and managed installs update through Update All or the Batocera package manager. Run `-update` to see what is blocking an install. A release this device already rolled back is only reinstalled by hand.

**Core rolled back to the previous version.** The new build did not start within 30 seconds. Check the Inbox message and the log file, then try `-update` again or install the release from your platform guide.

**Core will not start after going back to an older version.** The user database was migrated by a newer build, and Core refuses to open it with an older one rather than lose history, mappings, and profiles; the log names both versions. Reinstall the newer version, or restore a user database backup from `backups/` in the data directory that predates the newer build. On Linux platforms the service stays stopped instead of restarting in a loop.
