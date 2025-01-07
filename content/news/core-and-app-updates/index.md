---
title: "Core v2.1.0 and App v1.4.1 updates"
date: 2025-01-07
tags: ["update", "core", "app"]
summary: "Happy new year! Major updates to Zaparoo Core and the App are now live. Many new features and bug fixes come with this release. Please read the release notes for important information to avoid issues."
showSummary: true
---

{{< alert >}}
**Hotfix Core v2.1.1:** A hotfix has been released to fix some issues on MiSTer with the migration process. You should get the fixed version through update_all automatically!
{{< /alert >}}

Happy new year! Zaparoo Core v2.1.0 and Zaparoo App v.1.4.1 are now live. This release finalizes the transition from TapTo to Zaparoo and includes many new features and bug fixes.

A big thank you to these contributors this release:

- [spark2k06](https://github.com/spark2k06) introduced the initial work for video playback on MiSTer.
- [Spark-King](https://github.com/Spice-King) added a new automated build system for Core which saves hours of work each release (I'm so happy).
- [Anime0t4ku](https://github.com/Anime0t4ku) added a new Japanese translation for the App.

Contributions are always welcome and encouraged!

## Important Information

Overall, this update should be pretty seamless and automatic, but it comes with some major changes to how you configure and interact with Zaparoo afterwards. Please read the following notes carefully to avoid issues:

- The `tapto.ini` file is no longer used. A new file called `config.toml` in the TOML format is used instead. A [new wiki article](https://wiki.zaparoo.org/Config_file) details how it works.
- The App will not work with Core v2.1.0 until it's been updated to v1.4.0. It should already be available on your device's app store. This last change is necessary for a new backwards compatibility feature to avoid the same problem with future updates.
- Zaparoo Core on MiSTer is now called `zaparoo.sh` instead of `tapto.sh` and **must be manually run once** in order to complete migration tasks like updating the MiSTer startup file.
- To fix some issues with networked Scripts folders on MiSTer, Zaparoo now stores all data and config files in a new folder called `zaparoo` in the root of the SD card.
- Other platforms now default to using shared user folders instead of the directory where the binary is:
  - Windows: `C:\Users\<username>\AppData\Local\zaparoo`
  - Linux-based: `~/.config/zaparoo` and `~/.local/share/zaparoo`

The migrations will be made automatically, but it's important to be aware of these changes in case you run into issues.

Once migrated on MiSTer, feel free to delete the following files and folders:

- `Scripts/tapto.sh` (may already be removed by Downloader)
- `Scripts/tapto.ini`
- `Scripts/.config/tapto/`

I've opted not to delete them in case there are any problems during migration that aren't detected.

## Core

### Known Issues

- On MiSTer, Arcade games may not be correctly detected as playing, but will still launch correctly and are searchable.
- On Windows, LaunchBox launching may not be working. Try to reinstall the CLI Launcher plugin.

### New Features

- Initial support for media playlists

  This feature allows you to set a path to a folder on a token, load it and navigate next and previous media in the folder. See the [wiki for details](https://wiki.zaparoo.org/ZapScript#Playlists). This feature is a WIP and we're looking for feedback on how it should best work.

- Initial support for video playback on MiSTer

  A first draft of being able to launch videos from tokens on MiSTer. There's still work left to do here, but if you want to give it a test please ask for help in the [Discord](https://zaparoo.org/discord).

- SteamOS support

  This was already announced previously, but SteamOS is now officially supported! Check out the [wiki article](https://wiki.zaparoo.org/SteamOS) for information.

- Steam launcher now supports scanning all game libraries
- New TOML config file format and data storage locations

  As mentioned above, please see the [wiki article](https://wiki.zaparoo.org/Config_file) for instructions on how to use this new file and format.

- Core binary renamed to zaparoo(.exe/.sh)
- Insert mode has been renamed to "hold mode"
- Mappings can now be loaded from files

  In addition to the API mappings, you can now also define mappings by creating files. This is primarily a stopgap until the App has a mappings UI, but it also has the side effect of allowing mappings to be easily shareable. Both methods of defining mappings will be supported going forward. [See the wiki](https://wiki.zaparoo.org/Mappings) for details.

- New `-read` flag available for [CLI](https://wiki.zaparoo.org/Command_Line_Interface)
- All `allow_*` config options now support RegEx matching and are enforced
- The `shell` ZapScript command has been renamed to `execute`

  To avoid security issues, the `shell` command has been renamed to `execute` and its behaviour has been changed. It now only allows executing system commands with arguments rather than arbitrary shell scripts. The old `shell` command will be kept as an alias to this one and in most cases should function the same.

- New launching by media title launch command format

  Media can now be launched from tokens using the format "system/name" without any wildcards or file extensions. Core will look up the media name in the database and launch the first match. This should be a good start to making tokens which work between platforms and MiSTers. See the [wiki section](https://wiki.zaparoo.org/ZapScript#Game_Title) for details.

- Embedded web version of App now shipped with Core

  A web build of the App is now included with Core alongside the API. This version of the App has many features disabled which aren't allowed in an insecure web context, but most features still work and it will use a physically attached NFC reader to perform writes. This will be kept as a feature going forward for people who don't like apps or want to use it on a PC web browser. The web version is available at: `http://(localhost/device IP):7497/app/`

- New "before exit" hook for systems

  A new experimental feature has been added which lets you run custom ZapScript before media exits in hold mode. Specifically, it now means you can set up Zaparoo to trigger a save before exiting. We are looking for feedback on this feature as it has a lot of potential to be expanded to other types of hooks. See [the wiki](https://wiki.zaparoo.org/Config_file#before_exit) for details.

- New `-run` CLI flag to replace `-launch`
- Many new modern systems added and linked to LaunchBox Windows launcher
- Shared CLI flags ported to Windows binary
- `.ahk` scripts can now be launched from tokens on Windows
- API WebSocket endpoint moved to `/api`
- API versioning has now been introduced, current version is `0.1`, accessible at `/api/v0.1`
- Stdout messages have been added back to `-service status` CLI output
- API method `launch` renamed to `run` (alias kept)
- API `/l/` endpoint renamed to `/r/` and `/run/` (alias kept)
- The `allow_run` config option for this endpoint is now enforced
- New `tokens` API method added to query active and last scanned token
- New `media` API method added to query active/playing media and index status
- Undocumented `status` API method removed
- Notification changes:
  - `readers.connected` -> `readers.added`
  - `readers.disconnected` -> `readers.removed`
  - `running` -> `tokens.running`
  - `tokens.active` -> `tokens.added`
  - New `tokens.removed` notification

### Bug Fixes

- The `random` command now works correctly in hold mode
- Other serial devices will no longer crash auto-detection on Windows
- The `auto_detect` option is now correctly respected
- AmigaVision and Neo Geo launching now works correctly
- Media indexing process will no longer about on an error, instead will skip to next system
- ADF files can now be launched on Amiga
- The Cores menu in the MiSTer OSD will now correctly show the menu cores
- PN532 reliability has been greatly improved on Windows and scans faster
- `allow_file` is now case-insensitive on Windows and will automatically convert forward slashes to backslashes
- Useless log spam has been reduced

## App

Some options on the settings page have been temporarily removed until they have better support on the Core API.

The Android app reports its version as 1.4.0, you can just ignore this. It's exactly the same as 1.4.1 but was necessary to get the app submission through.

### New Features

- New Japanese translation added
- Initial deep link support added for domains `tapto.life`, `zpr.au` and `zaparoo.app`
- API client updated to v0.1 endpoint
- Text updates to make terms more consistent with Core
- Help page links and names updated

### Bug Fixes

- Continuous scanning toggle now works correctly
- App now checks for status updates on load for token and media state
- No longer need to restart after a database index update

## Downloads

{{< button href="/downloads#zaparoo-core" target="_self" >}}
{{< icon "download" >}} Download Core v2.1.0
{{< /button >}}<br>

{{< button href="https://github.com/ZaparooProject/zaparoo-core/" target="_self" >}}
{{< icon "github" >}} Core GitHub
{{< /button >}}

{{< button href="/downloads#zaparoo-app" target="_self" >}}
{{< icon "download" >}} Download App v1.4.1
{{< /button >}}<br>

{{< button href="https://github.com/ZaparooProject/zaparoo-app/" target="_self" >}}
{{< icon "github" >}} App GitHub
{{< /button >}}
