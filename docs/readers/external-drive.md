---
sidebar_position: 4
description: "Use a USB stick, SD card, or removable drive as a Zaparoo token by adding a zaparoo.txt file."
keywords: [zaparoo external drive, usb stick token, sd card launcher zaparoo]
---

# External Drive Reader

A USB stick or SD card can work as a [Zaparoo token](../tokens/index.md). Put a `zaparoo.txt` file on the drive, plug it into the device running [Core](../core/index.md), and Zaparoo scans the file contents.

This is useful if you want physical tokens without buying [NFC cards](../tokens/nfc/index.md) or a separate reader.

<img src="/img/showcase/Galewin_floppy_drive_demo_thumb.webp" alt="USB floppy drive reading a disk as a Zaparoo token" width="100%" loading="lazy" />

*A USB floppy drive used as removable token media by Galewin in [Community Showcase #5](/blog/community-showcase-5). USB sticks and SD cards work the same way.*

## Platforms

<PlatformSupport readerId="external-drive" />

## Enable the reader

The reader is disabled by default. Add this to your [`config.toml`](../core/config/index.md):

```toml
[[readers.connect]]
driver = "externaldrive"
enabled = true
```

Restart Core after changing the config.

A `readers.connect` entry makes this reader active unless you have explicitly disabled the driver elsewhere. You can also enable the driver directly:

```toml
[readers.drivers.externaldrive]
enabled = true
```

## Make a drive token

1. Format a USB stick or SD card using a filesystem your device can mount.
2. Create a plain text file named `zaparoo.txt` at the top level of the drive.
3. Put the [ZapScript](../zapscript/index.md) in the file.
4. Eject the drive, then insert it into the device running Core.

Example `zaparoo.txt`:

```zapscript
**launch.random:SNES
```

The filename is matched case-insensitively, so `zaparoo.txt`, `ZAPAROO.TXT`, and similar casing work. A burned data disc accepts the same file; see [optical drive token files](./optical-drive.md#use-a-token-file-on-a-disc).

## Launch media from the drive

You can store a game on the drive and launch it with a path relative to the drive's root. Add [`?system=`](../zapscript/launch.md#select-a-system-for-a-file-path) to say which system it's for. For example, save the game as `GBC/Tetris.gbc`, then put this in `zaparoo.txt`:

```zapscript
GBC/Tetris.gbc?system=GameboyColor
```

Using a relative path means the token works without knowing where the drive will be mounted. Always include `?system=` for a game on the drive. Core usually can't tell the system from a drive's folder names, and without it the launch can fail with "no launcher can open this file".

## Make a game cartridge

A drive can carry a game along with its own name, description, and cover, so it works like a cartridge: plug it in and the game starts. A drive laid out like this:

```text
GBC/Tetris.gbc
cover.png
zaparoo.txt
zaparoo.json
```

has this in `zaparoo.txt`:

```zapscript
GBC/Tetris.gbc?system=GameboyColor
```

and this in `zaparoo.json`:

```json
{
  "name": "Tetris",
  "description": "Falling blocks, on a stick.",
  "image": "cover.png"
}
```

While the game is running, Core reports the name from `zaparoo.json` instead of the file name, so the [Zaparoo App](../app/index.md) shows it. The description and cover are available to apps through the [Core API](../core/api/index.md).

The cartridge still needs the emulator or core for its system installed on the device. Core only loads the game file from the drive, never an emulator, core, or BIOS. If one is missing, the launch fails with a message saying which part isn't installed.

### zaparoo.json

`zaparoo.json` is optional. It goes at the top level of the drive next to `zaparoo.txt`, and its name is matched case-insensitively. It only describes the game; `zaparoo.txt` still decides what runs.

| Field | Value |
| ----- | ----- |
| `name` | Shown instead of the game's file name. Up to 100 characters. |
| `description` | A longer description. Up to 1000 characters, line breaks allowed. |
| `image` | A path to the cover, relative to the top of the drive, such as `cover.png` or `art/cover.jpg`. PNG or JPEG, up to 8 MiB (2 MiB on MiSTer) and no more pixels than 4096×4096. |

Every field is optional, and other fields are ignored. A field with the wrong type or over its limit is ignored on its own, and the rest of the file still applies. A file that isn't valid JSON is ignored, and the drive still launches its game. Core also ignores `zaparoo.json` if it is larger than 64 KiB or is a symlink, and ignores an `image` that is a symlink, is inside a symlinked folder, or points outside the drive.

The name, description, and cover only apply when the game that launches is stored on the same drive. If `zaparoo.txt` launches a game from your library instead, that game keeps its usual name and art.

### Removing the cartridge

What happens when you pull the drive depends on the [scan mode](../core/config/readers.md#scan-mode):

- In the default `tap` mode, the game keeps running. The emulator may still read from the game file, so quit the game before removing the drive.
- In `hold` mode, removing the drive exits the game, like taking a cartridge out of a console. Core does not save first. To use hold mode for drives only, set [`scan_mode`](../core/config/readers.md#readers-connect-scan-mode) on the reader:

```toml
[[readers.connect]]
driver = "externaldrive"
enabled = true
scan_mode = "hold"
```

## What happens when you insert it

When the drive mounts, Core looks for `zaparoo.txt`. If it finds one, it trims surrounding whitespace and scans the remaining text as an `externaldrive` token. On Linux, Core can also find the file on sibling partitions mounted under `/media` or `/mnt`, which helps with multi-partition USB drives.

Removing or ejecting the drive clears the active token, similar to removing an NFC card from a reader. See [removing the cartridge](#removing-the-cartridge) for what happens to a running game.

Core ignores the file if:

- It is empty or only contains whitespace
- It is inside a folder instead of at the top level of the drive
- It is a folder named `zaparoo.txt` rather than a file
- It is a symlink
- It is larger than 1 MiB

The reader does not write anything back to the drive. You create and edit `zaparoo.txt` yourself.

## Detected drives

Core watches for removable drive mount events. It does not scan every mounted disk on the system, and that distinction matters for USB hard drives.

- Windows detects drives reported by Windows as removable, such as many USB sticks and SD card readers.
- Linux uses UDisks2 when available. Without UDisks2, Core falls back to `/proc/mounts` and only watches removable mounts under `/media` or `/mnt`.
- MiSTer, Batocera, SteamOS, and similar Linux-based systems depend on the fallback behavior if UDisks2 is not available.
- macOS detects removable volumes mounted under `/Volumes`.

Some USB hard drives and SSDs are reported by the operating system as fixed or internal disks. Those may not be picked up by this reader.

## Troubleshooting

### Drive not detected

Check your config first:

```toml
[[readers.connect]]
driver = "externaldrive"
enabled = true
```

If you use driver settings, make sure the driver has not been disabled:

```toml
[readers.drivers.externaldrive]
enabled = true
```

Then check the basics:

1. Restart Core after changing `config.toml`.
2. Confirm the operating system mounted the drive.
3. On Linux-based systems, check whether the drive mounted under `/media` or `/mnt`.
4. Enable `debug_logging = true` in `config.toml` and check the Core logs.

### File ignored

Make sure `zaparoo.txt` is a normal text file at the top level of the drive. The name can use any case.

The file must not be empty, whitespace-only, a symlink, or larger than 1 MiB.

### ZapScript not running

Test the same text with another reader or through the app. If it still does not work, the ZapScript probably needs fixing.

Check the [ZapScript docs](../zapscript/index.md) for syntax.
