---
sidebar_position: 5
description: "Create Zaparoo device profiles with switch cards, separate playtime limits, and MiSTer save data for each person."
keywords: [zaparoo profiles, zaparoo profile card, zaparoo parental controls, mister separate saves, zaparoo playtime profiles]
---

# Device Profiles

Device profiles give each person a named identity on one Zaparoo device. Profiles can have separate [playtime limits](./play-controls.md#playtime-limits), and MiSTer can also keep separate save files and save states for each profile.

Profiles are not online accounts. One profile can be active on a device at a time, and Core remembers it across restarts. When no personal profile is active, the device uses its **shared profile**: existing global settings, play history, and save locations.

## Create profiles

Use the [Core terminal UI](../core/tui.md) on the device:

1. Open **Profiles** from the main screen.
2. Select **New**.
3. Enter a name, role, PIN, and any playtime limit overrides.
4. Select **Save**.

You can also create and manage profiles from the [Zaparoo App](../app/index.md) under **Settings > Play Controls** (Core v2.16.0 or newer).

The first profile is always an administrator and requires a 4-8 digit PIN. Later profiles default to the member role. Core prevents you from deleting or demoting the final administrator profile.

Profile roles control local profile administration:

- **Admin** profiles can authorize profile, client, and protected settings changes from the terminal UI. Every admin profile requires a PIN.
- **Member** profiles are intended for normal use. Their PIN, if set, protects selecting them from the visible profile list.

## Switch profiles

Open **Profiles** and select **Switch** to choose a profile. Select **Shared Profile** to deactivate the current personal profile. Selecting a profile with a PIN prompts for it first.

You can also open a profile and select **Write Card**. Core writes a profile command containing a generated switch ID:

```zapscript
**profile:<switchId>
```

A switch card does not ask for the profile PIN. Anyone with the card, or a copy of its switch ID, can activate that profile. Treat the card and switch ID like a key, and keep them private when the profile has limits or administrative access.

If a switch card is lost, open the profile's **Switch ID** action and reset it. Existing cards for that profile stop working. Use **Write Card** to create a replacement.

An administrator's switch ID also authorizes [playtime extension cards](./play-controls.md#extend-a-session).

A custom card can switch profiles and then launch media:

```zapscript
**profile:<switchId>||SNES/Super Mario World.sfc
```

The profile command must come before the launch command. See the [`profile` ZapScript command](../zapscript/utilities.md#profile) for details.

## Profile playtime limits

Each profile can override the global enabled state, daily limit, and session limit. In the profile editor:

- **Inherit** uses the corresponding global [playtime setting](./play-controls.md#playtime-limits).
- **Enabled** or **Disabled** overrides whether limits apply to that profile.
- An empty daily or session limit inherits the global value.
- `0` explicitly gives the profile no limit for that field.

Warning intervals and the session reset period remain global settings.

Play history is attributed to the profile active when a game starts. Daily usage for a personal profile only includes that profile's history. The shared profile uses device-wide history, so deactivating a profile does not grant another daily allowance.

Switching to a different personal profile starts a new playtime session for that person. Rescanning the same profile card, editing the active profile, or switching back to the shared profile does not clear accumulated session time. If you deactivate a profile while a game is running, that game keeps the limits and history attribution it started with until it stops.

### Require a profile before launching

Enable `require_for_launch` to prevent the shared profile from launching media:

```toml
[profiles]
require_for_launch = true
```

Profile switch cards and non-launch commands continue to work. A combo card can switch and launch in one scan when the `profile` command comes first.

You can also change this setting from **Settings > Profiles** in the terminal UI. It is disabled by default.

## MiSTer profile data

MiSTer separates these items automatically while a personal profile is active:

- Save files
- Save states
- RetroAchievements account configuration, when using [odelot's custom RetroAchievements Main](https://github.com/odelot/Main_MiSTer)

Existing files are not moved into the first profile. They remain available from **Shared Profile**, while each personal profile starts with separate empty directories. Profile data swapping is enabled by default on MiSTer. Other platforms still use profiles for switching, limits, and history, but do not yet swap save data.

If a game is running when you switch profiles, Core waits until it stops before changing the live save directories. This prevents the running game from writing into another profile's data.

Core stores profile data under the active MiSTer storage root:

```text
zaparoo/profiles/<profile-id>/saves/
zaparoo/profiles/<profile-id>/savestates/
```

For the SD card, this is under `/media/fat/zaparoo/profiles/`. Core also follows MiSTer's USB storage selection. If saves are on a NAS share or another mounted location, Core creates each profile's directories there without moving or replacing the mount.

### RetroAchievements accounts

Odelot's custom RetroAchievements Main and cores store account details in `/media/fat/retroachievements.cfg`. This is not part of official MiSTer. When the file is present, Core gives each personal profile its own copy.

The first time a profile is activated, Core copies the currently visible configuration to:

```text
/media/fat/zaparoo/profiles/<profile-id>/retroachievements.cfg
```

The user can then change the account through the fork's normal setup. Switching profiles activates the matching configuration, while **Shared Profile** returns to the original file. This file always stays on the SD card even when MiSTer saves use USB or network storage.

:::warning Plaintext credentials
`retroachievements.cfg` contains a plaintext RetroAchievements password. Core excludes shared and per-profile copies from local and cloud [device backups](./backups.md). Back up these files separately only if you can store them securely.
:::

Profile switching does not separate other MiSTer core configuration, input mappings, Recently Played lists, arcade NVRAM, or saves stored inside computer-core disk images.

Deleting a profile leaves its save data and RetroAchievements configuration on disk. Remove its directory manually when no longer needed. Do not delete the MiSTer `zaparoo` directory if you want to preserve profile data.

To disable profile-data swapping and return to shared data:

```toml
[profiles]
swap_data = false
```

Restart Core after changing this setting manually.

## Client roles and encryption

Profile roles and paired-client roles are separate. A profile represents a person using the device. A paired client represents an app or other remote device connecting to Core.

Manage paired clients from **Settings > Clients** in the terminal UI:

- **Admin** clients can change settings and manage profiles.
- **Member** clients can perform normal actions such as browsing, launching, and switching profiles, but cannot weaken playtime or profile controls.

The first paired client receives the admin role. For later pairings, choose the role when approving the pairing. The final admin client cannot be revoked.

Client restrictions are only enforceable when remote clients must pair. Enable **Require encryption** under **Settings > Clients**, or set [`service.encryption`](../core/config.md#encryption) to `true`. When encryption is disabled, unpaired remote clients retain full API access for compatibility with older clients.

:::note Existing paired clients
Clients paired before role support are assigned the member role during the upgrade. To grant one admin access, create an admin profile if needed, revoke that client, and pair it again as **Admin** from **Settings > Clients**.
:::

Profiles provide household parental or kiosk controls, not operating-system security. Anyone with local OS access or an admin client can change profile data and limits. Profile PINs are convenience barriers rather than account passwords.

## Recover profile access

The local [Core command line](../core/cli.md#recover-profile-access) can list profile IDs, replace a forgotten PIN, or invalidate lost switch cards:

```bash
./zaparoo -profiles
./zaparoo -profile-reset-pin <profile-id>
./zaparoo -profile-reset-switch-id <profile-id>
```

These commands require Core to be running on the same device.

## API

Clients can use the [`profiles` API methods](../core/api/methods.md#profiles) to list, create, update, switch, verify, and delete profiles. Profile changes are reported through [`profiles.active`](../core/api/notifications.md#profilesactive), while supported platforms report save-data changes through [`profiles.data`](../core/api/notifications.md#profilesdata).
