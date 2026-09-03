---
description: "Zaparoo's build of MiSTer Main: what it adds for Core and Frontend users, the Zaparoo page in the OSD, kiosk mode, auto-save, disc autorun, game tracking, and its MiSTer_cmd commands."
keywords: [zaparoo mister main, mister_zaparoo, mister kiosk mode, mister auto-save, mister disc autorun, mister osd zaparoo, zaparoo main fork]
---

# Zaparoo MiSTer Main

MiSTer Main is the program on the ARM side of a MiSTer that draws the menu and OSD, loads cores, and handles input. Zaparoo maintains its own build of it, [ZaparooProject/Main_MiSTer](https://github.com/ZaparooProject/Main_MiSTer), which merges the upstream [MiSTer-devel Main](https://github.com/MiSTer-devel/Main_MiSTer) every day and layers Zaparoo behavior on top. Everything stock Main does still works.

It ships with [Zaparoo Frontend](../../frontend/setup.mdx#manual-install) as `zaparoo/MiSTer_Zaparoo`, alongside the `menu_zaparoo.rbf` menu core, and MiSTer runs it when `MiSTer.ini` contains `main=zaparoo/MiSTer_Zaparoo`. Frontend needs it. Core does not: Core works with stock Main, and this build is optional if you only want its extras.

## What it changes

For every Zaparoo user on MiSTer, with or without Frontend:

- Reports the running game to Core directly, so [game tracking](#game-tracking) works without `MiSTer.ini` changes.
- Starts the Core service [before the menu loads](#core-starts-before-the-menu), so tokens work sooner after power on.
- Hands the console to Core while Core runs a script or video on screen, so the OSD and menu stay out of the way.
- Adds [kiosk mode](#kiosk-mode), [auto-save](#auto-save), and [disc autorun](#auto-run-discs), all off by default.
- Adds [commands](#commands) a card can send to force a save, swap a disk, or toggle a cheat without opening the OSD.
- Can keep a [persistent log](#logs) for support.

For Frontend:

- Starts Frontend, restarts it if it crashes, and switches it off and on from the OSD.
- Puts CRT mode, the video standard, and the screen position in the OSD, so a CRT setup can be fixed without an HDMI display.

## Releases

Frontend bundles the latest stable build, and Update All installs it with Frontend. The [releases page](https://github.com/ZaparooProject/Main_MiSTer/releases) has two channels:

| Release | What it is |
| ------- | ---------- |
| `MiSTer_Zaparoo_YYYYMMDD` | Stable. The upstream MiSTer release of that date with the Zaparoo changes applied. |
| `MiSTer_Zaparoo_unstable` | Prerelease rebuilt from the `master` branch on every change, for testing. |

To install a build by hand, copy the `MiSTer_Zaparoo` file from the release over `/media/fat/zaparoo/MiSTer_Zaparoo` and reboot.

## Zaparoo page in the OSD

Press Menu on a controller or `F12` on a keyboard, open **System Settings**, then **Zaparoo**, which sits directly above **Reboot**.

| Row | What it does |
| --- | ------------ |
| **Frontend** | Turns Frontend off or on. Off returns you to the stock MiSTer menu without editing `MiSTer.ini`. |
| **Kiosk mode** | Locks the OSD. Turning it on shows a warning first; see [kiosk mode](#kiosk-mode). |
| **Auto-save** | Writes the running game's save before the next core loads. Turning it on shows a warning first; see [auto-save](#auto-save). |
| **Auto-run discs** | Launches a CD or DVD when you insert it in the menu; see [auto-run discs](#auto-run-discs). |
| **CRT mode** | Outputs Frontend as 15 kHz analog video and restarts it; see [enable CRT mode](../../frontend/setup.mdx#enable-crt-mode). |
| **Video standard** | NTSC, 480i, or PAL for CRT mode. Shown when CRT mode is on. |
| **Screen position** | Nudges the CRT picture horizontally and vertically against a test pattern, live. Shown when CRT mode is on. |

The page only appears when `zaparoo/frontend` exists on the SD card, even with Frontend switched off. If you removed Frontend, the settings below still work but can only be changed with the [commands](#commands) or by deleting the settings file.

The settings live in `/media/fat/config/zaparoo_settings.bin`, not in `MiSTer.ini`, so a stock Main ignores them. Delete the file to return every setting to its default: Frontend on, everything else off.

## Kiosk mode

Kiosk mode is for setups where cards are the only way to start a game, such as a cabinet or a console for kids. With it on, nothing opens the OSD: not Menu or `F12`, not the front-panel button, not the keyboard combos, and not the boot-time INI selector. Cards still launch cores and games, and the screensaver still follows the timeouts in `MiSTer.ini`.

Getting back in needs something other than the OSD, so set it up before you turn kiosk mode on:

- A card that sends `zaparoo_osd open` opens the OSD once, for the current session, without changing the setting. A card that sends `zaparoo_kiosk off` turns kiosk mode off for good. See [commands](#commands) for how a card sends either.
- Or delete `/media/fat/config/zaparoo_settings.bin` from the SD card on a PC.

## Auto-save

Most cores hold a game's save in memory and only write it to the SD card when you pick the core's own save row in the OSD or its autosave option runs. Under kiosk mode there is no OSD, so **Auto-save** asks the running core to write its save whenever one game exits and another starts.

- Off by default. Turning it on shows a warning.
- Adds about half a second to each launch.
- Only runs on a core change. Switching the MiSTer off mid-game still loses the save.
- A core only writes when the game changed its save data, so a game left at its title screen writes nothing. That is the core's behavior, not a fault.

## Auto-run discs

With **Auto-run discs** on, Main watches the optical drive (`/dev/sr0` to `/dev/sr7`) while the menu is up and launches a disc as soon as it is inserted. It relies on a physical disc setup you already have installed:

- CDs launch through the MGL that [Physical Disc Support](https://github.com/Anime0t4ku/Main_MiSTer_Physical_Disc) (`/media/fat/MiSTer_Physical-CD` with `_Physical Disc Cores`) or [mister-disc](https://github.com/theshaneobrien/mister-disc-drive-support) (`/media/fat/MiSTer-disc` with `_Disc_Cores`) installed for that system.
- DVDs launch the newest `DVD_YYYYMMDD.rbf` on the card, or `DVD_Player.rbf`, from the [DVD player core](https://github.com/owenb321/MiSTer_DVD).

Recognized discs are Mega CD, Saturn, PlayStation, PC Engine CD, Neo Geo CD, 3DO, CD-i, MD+, SNES MSU-1, and DVD. Audio CDs and unrecognized discs are ignored. A disc launches once per insert, so returning to the menu does not relaunch it until you eject it. If nothing is installed to play the disc, the OSD shows **No physical CD provider installed**, **Physical CD launcher not found**, or **DVD core not found**.

:::warning
Core's [optical drive reader](../../readers/optical-drive.md) watches the same drive. Do not enable both for one drive, or both react to the same disc.
:::

## Commands

The build adds commands to MiSTer's command interface, `/dev/MiSTer_cmd`. Any script can send one:

```sh
echo "zaparoo_kiosk off" > /dev/MiSTer_cmd
```

To send one from a card, save that as a script in `/media/fat/Scripts`, such as `kiosk-off.sh`, and write [`**mister.script`](../../zapscript/mister.md#misterscript) with `hidden=true` to the card so the script runs in the background:

```zapscript
**mister.script:kiosk-off.sh?hidden=true
```

| Command | What it does |
| ------- | ------------ |
| `zaparoo_kiosk on\|off\|toggle` | Turns [kiosk mode](#kiosk-mode) on or off. Saved. |
| `zaparoo_osd open\|close\|toggle` | Opens the OSD once while kiosk mode is on. Not saved; the next core load ends it. |
| `zaparoo_frontend on\|off\|toggle` | Turns Frontend off or on. Saved. |
| `zaparoo_save` | Makes the running core write its save now. It uses the core's own save row, so nothing appears on screen; a core without one shows a short **Saving...** banner. |
| `zaparoo_mount <pos> [path]` | Mounts a disk image in slot `pos` of the running core without reloading it, for multi-disc games. `pos` counts the core's slots from 1 in the order the core defines them, so `1` is the first slot on any core. Leave out the path to eject. |
| `zaparoo_cheat on\|off\|toggle <name\|index>` | Turns a cheat on or off by its number, its exact name, or a part of its name that matches only one cheat. Needs the cheat files the core normally uses. |
| `zaparoo_cheat clear` | Turns every cheat off. |
| `zaparoo_cheat list [text]` | Prints the cheats that are on, or every cheat whose name contains `text`. |

`zaparoo_console` is in the list too. Core uses it to take over the console for on-screen scripts and video, and there is nothing to do with it yourself.

## Game tracking

Main writes the path of the running game to `/tmp/ACTIVEGAME` when a game starts from the MiSTer menu or from a file browser inside a core, and clears it when a bare core starts. Core reads that file, so games started outside Zaparoo count for [playtime tracking](../../features/play-controls.md#playtime-limits) and play history without the `recents=1` and `log_file_entry=1` setup that stock Main needs. Main no longer forces those two settings on either, so they follow your `MiSTer.ini`.

## Core starts before the menu

Main runs `/media/fat/Scripts/zaparoo.sh -service start` before it does anything else, ahead of the USB and network wait, so Core is ready by the time the menu appears. The [start Core earlier](./index.md#start-core-earlier) options on the platform page are for stock Main.

## Logs

Main's own output is not kept between reboots. To capture it, create an empty file at `/media/fat/zaparoo/main.log`. Main writes to it from the next start, with a start marker and uptime stamps, and rotates it to `main.log.old` once it passes 8 MB. Delete the file to turn logging off. Attach it when it is asked for on the [help page](/support/).
