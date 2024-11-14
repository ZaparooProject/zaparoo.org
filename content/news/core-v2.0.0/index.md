---
title: "TapTo Core v2.0.0 released"
date: 2024-11-03
tags: ["update", "core"]
summary: "TapTo Core v2.0.0 is now available! This release has several breaking changes compared to the previous versions, including the deprecation of the taptui.sh script. It has many new features and bug fixes, including the first release of TapTo for Windows."
showSummary: true
---

Version 2.0.0 of TapTo Core has several breaking changes compared to the previous versions:

- The [TapTo Life app](https://tapto.life/) must be updated to the latest version available on the app stores (v1.2) before it can connect to TapTo.
- The taptui.sh script has now been deprecated and will no longer be shipped with TapTo on MiSTer. It may be updated to be compatible again in the future, but the TapTo Life app is now the primary supported way to interact with the TapTo service.
- Management of mappings is not yet integrated in the TapTo Life app. Either use the [TapTo CLI](https://tapto.wiki/Command_Line_Interface) and [API](https://tapto.wiki/API) to manage them manually or use the old [nfc.csv](https://tapto.wiki/MiSTer_FPGA#Legacy_Mappings_Database) file temporarily. This functionality will be added to the TapTo Life app soon.
- Writing to tokens using a physical NFC reader is also not implemented in the TapTo Life app yet, but will also be added soon. Either use the app itself to write or use the CLI.

{{< button href="/downloads#zaparoo-core" target="_self" >}}
{{< icon "download" >}} Download v2.0.0
{{< /button >}}<br>

{{< button href="https://github.com/ZaparooProject/tapto/releases/tag/v2.0.0" target="_self" >}}
{{< icon "github" >}} GitHub
{{< /button >}}

## New Features

Some of these features are still in process of being documented. Please [ask in the Discord](https://wizzo.dev/discord) if you need help using them until documentation is available on the [TapTo wiki](https://tapto.wiki/).

- First release of TapTo for Windows is now available! Please be aware it's still in heavily development and more a proof of concept. It works with PN532 readers, ACR122U readers, the TapTo Life app and launchers like Steam, LaunchBox and Flashpoint. Please join the wizzo.dev Discord server if you'd like to join in development and testing!
- A new JSON-RPC over WebSocket API is now used in TapTo with the old REST-based one being completely deprecated. Please see the [API wiki article](https://tapto.wiki/API) for instructions how to use it. It is still in development.
- New alternate launchers have been added for Sinden cores which allow setting a token to explicitly launch a Sinden core variant, for example by adding `?launcher=SindenSNES` to the end of a launch command. Sinden cores must be moved to the `_Sinden` menu folder to work with this feature. Sinden launchers also set the appropriate setnames as per current community usage.
- The `mister.script` command has a new option to run a script in the background.
- All launch commands can have their core overridden with the `?launcher=...` argument.
- Initial implementation of an optical drive reader has been added which allows using CDs on MiSTer to launch games via a USB CD drive.
- Multiple PN532 reader devices can now be used at once plug and play.
- Alternate launchers for all LLAPI cores have been added.
- Alternate launchers for all PWM cores have been added.
- Alternate launchers for N64 80mhz and PSX2X cores have been added.
- AmigaVision now indexes and can be searched from TapTo Life.
- NeoGeo system now supports .zip and folder game files to be indexed and search from TapTo Life.

## Bug Fixes

- The `mister.script` command will fallback to headless/silent running if the Linux framebuffer is not available (like on a CRT).
- Various fixes added to avoid crashes caused by NFC toy checks during scans.
- Game database will now be properly cleared out when a partial rescan is done.
- NeoGeo and NeoGeoCD systems are now correctly defined and will no longer conflict during index and in TapTo Life searching.

## Other Changes

- The ao486 system has been renamed to DOS and a new PC system has been added alongside it.
- The /dev/serial path is no longer used for device detection to avoid conflicts in clone USB chips.
- API launch text is now normalized to avoid issues with UTF input and similar characters. This may be changed.
- Launches can now be run concurrently (like if a launch is long running) and individual commands are now blocking. You probably won't notice anything except that a HTTP GET or POST will now block before running the next command.
