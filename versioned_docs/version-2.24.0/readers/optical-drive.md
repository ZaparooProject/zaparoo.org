---
sidebar_position: 3
description: "Use a CD, DVD, or Blu-ray drive with Zaparoo on Linux: launch a game disc from your library or the drive, play audio CDs, or run ZapScript from a zaparoo.txt file on the disc."
keywords: [zaparoo optical drive, cd token, dvd token, physical disc launcher, disc game ID, zaparoo.txt disc, audio cd, mister physical cd]
---

# Optical Drive Reader

A CD, DVD, or Blu-ray drive can work as a [Zaparoo token](../tokens/index.md) reader on Linux-based systems. Connect the drive to the device running [Core](../core/index.md), and inserting a disc works like scanning a card: Core launches the matching game from your indexed library, plays the disc from the drive, plays an audio CD, or runs a [mapping](../features/mappings.md) or [ZapScript](../zapscript/index.md) command.

<img src="/img/showcase/Liz_cuphead_custom_disc.webp" alt="Custom-printed Cuphead DVD in a matching steelbook case" width="450" loading="lazy" />

*Liz made a custom Cuphead disc to launch the game through Zaparoo, shared in [Community Showcase #7](/blog/community-showcase-7).*

## Platforms

<PlatformSupport readerId="optical-drive" />

## Enable the reader

On MiSTer, LibreELEC, Batocera, Knulli, ROCKNIX, and AmberELEC, the reader is on by default and finds a drive when it is plugged in. On other Linux-based platforms, turn it on in your [`config.toml`](../core/config/index.md):

```toml
[readers.drivers.opticaldrive]
enabled = true
```

Core looks for drives exposed as `/dev/sr0`, `/dev/sr1`, and similar Linux device paths. To stop Core using a drive, set `enabled = false` instead.

### Use a specific device path

To watch one drive without automatic detection, add a `readers.connect` entry to `config.toml`:

```toml
[[readers.connect]]
driver = "opticaldrive"
path = "/dev/sr0"
```

Restart Core after changing the config. Use `lsblk` or check `/dev/sr*` if you are not sure which path your drive uses.

## What happens when you insert a disc

Inserting a disc is a scan and ejecting it is a removal, so a disc follows the same [scan mode](../core/config/readers.md#scan-mode) rules as a card. Core checks the drive once a second and reads the disc once each time it changes.

A [mapping](#map-a-disc-to-a-command) for the disc, or a [`zaparoo.txt` file](#use-a-token-file-on-a-disc) on it, always runs first. Otherwise Core works out what the disc is:

- A game disc launches its image from your library when one [matches](#launch-an-indexed-game-from-its-original-disc), or [plays from the drive](#play-a-disc-from-the-drive).
- An [audio CD](#play-an-audio-cd) plays as an album.
- Anything else does nothing, but you can still map it.

### Choose between the library and the disc

`launch_order` decides whether Core prefers a matching image in your library or the disc itself:

```toml
[readers.drivers.opticaldrive]
launch_order = "image_first"
```

| Value | What it does |
| ----- | ------------ |
| `image_first` | Launches a matching image from the library, or the disc when there is none. This is the default. |
| `disc_first` | Plays the disc from the drive when something can, or a matching image when nothing can. |
| `image_only` | Only launches library images. |
| `disc_only` | Only plays the disc from the drive. |

When nothing can play the disc, Core logs it and shows no error.

## Launch an indexed game from its original disc

Core can identify supported game discs and match them to disc images in your indexed media library. Disc identification is based on [GameID](https://github.com/niemasd/GameID), created by [Niema Moshiri](https://github.com/niemasd). Insert the original disc, and Core launches the matching indexed file. When several files match, Core prefers one that isn't a hack, translation, demo, prototype, or similar variant. Existing token mappings take priority over automatic matching.

Supported systems are:

- Nintendo GameCube
- Sega CD/Mega CD
- Neo Geo CD
- PlayStation
- PlayStation 2
- PSP
- Sega Saturn

Core indexes game IDs from `.chd`, `.cue`, `.gcm`, and `.iso` files. Compressed `.cso`, `.gcz`, and `.rvz` images are not supported for game ID matching.

Run a [media database update](../core/tui.md#managing-media) after updating Core so game IDs are added to existing indexed media. The physical disc and indexed image must produce the same game ID. When nothing matches, the [launch order](#choose-between-the-library-and-the-disc) decides whether the disc plays from the drive. You can also map the disc ID manually.

## Play a disc from the drive

On MiSTer, Core can play a game disc straight from the drive. It recognizes Mega CD, Saturn, PlayStation, PC Engine CD, Neo Geo CD, 3DO, CD-i, MD+, SNES MSU-1, and DVD discs, then loads them through a physical disc setup you install separately:

- CDs load through the MGL that [Physical Disc Support](https://github.com/Anime0t4ku/Main_MiSTer_Physical_Disc) (`_Physical Disc Cores`) or [mister-disc](https://github.com/theshaneobrien/mister-disc-drive-support) (`_Disc_Cores`) installed for that system.
- DVDs load the newest `DVD_YYYYMMDD.rbf` on the card, or `DVD_Player.rbf`, from the [DVD player core](https://github.com/owenb321/MiSTer_DVD).

Turn off **Auto-run discs** in the [Zaparoo page of the OSD](../platforms/mister/main.md#zaparoo-page-in-the-osd) if your Main build still has it, or the disc launches twice.

## Play an audio CD

Core plays an audio CD as an album through its [audio player](../features/audio.md), with track names from the disc's CD-Text when it has them. This works on every platform the reader supports.

To play audio CDs with another launcher, set `audio_cd_launcher` to its ID. On MiSTer, `PSXCDPlayer` plays the disc through the PlayStation core's CD player, and `MiSTerHiFi` plays it with [MiSTer Hi-Fi](https://github.com/Anime0t4ku/MiSTer_Hi-Fi) when `Scripts/misterhifi.sh` is installed. See [MiSTer launchers](../platforms/mister/launchers.md#physical-discs-and-audio-cds).

```toml
[readers.drivers.opticaldrive]
audio_cd_launcher = "PSXCDPlayer"
```

Leave it empty to use Core's own player. A launcher that is set but not installed plays nothing.

An audio CD has no volume label, so its token ID is `cdda:` followed by a fingerprint of its track list. A DVD with no readable UUID or label uses `dvd:` and the drive name, such as `dvd:sr0`. Use these IDs in a mapping.

### Keep reading the disc

Core reads a disc once when it goes in, then only asks the drive whether the disc changed. Set `keep_reading = true` to read the disc every second while it is in the drive, as earlier Core versions did:

```toml
[readers.drivers.opticaldrive]
keep_reading = true
```

It is off by default because reading the drive can make a disc that is playing from it skip, in a disc core or as an audio CD.

## Choose the scanned ID

Core reads the disc's ISO 9660 volume identity to find its `UUID` and `LABEL`, checks supported game discs for a game ID, then scans the result as a `disc` token.

The `id_source` option controls which value is used for matching:

```toml
[[readers.connect]]
driver = "opticaldrive"
path = "/dev/sr0"
id_source = "merged"
```

The available modes are:

- `merged` combines UUID and label as `<UUID>/<LABEL>`. This is the default and requires both values.
- `uuid` uses only the disc UUID.
- `label` uses only the disc label.

Core does not fall back to another value when the selected source is unavailable. Choose `uuid` or `label` when your disc only provides one of them. A supported game disc can still match indexed media by game ID when no token ID is available, but the game ID never becomes the token ID used by mappings. If Core cannot read the selected token ID or a supported game ID, nothing is scanned. Removing the disc clears the active token.

Use `merged` to distinguish a disc by both values when they are present. For custom burned discs, `label` gives you a token ID you can choose and keep unique.

## Map a disc to a command

Mappings override automatic game ID matching. For a custom disc, one practical setup is to use the disc label as the token ID.

Configure the reader to use labels:

```toml
[[readers.connect]]
driver = "opticaldrive"
path = "/dev/sr0"
id_source = "label"
```

Burn a data disc with a label such as `SNES_RANDOM`, then add a mapping:

```toml
[[mappings.entry]]
token_key = "id"
match_pattern = "SNES_RANDOM"
zapscript = "**launch.random:SNES"
```

Restart Core after changing mapping files. If you are using an existing disc, check the Core logs to see the exact ID Zaparoo scanned before writing the mapping.

Core does not write anything to the disc. Blank discs do not work because they contain nothing to read. If you are burning a disc anyway, a [token file on the disc](#use-a-token-file-on-a-disc) avoids the mapping step.

## Use a token file on a disc

A burned data disc can carry its own ZapScript, the same way a [USB drive token](./external-drive.md#make-a-drive-token) does:

1. Create a plain text file named `zaparoo.txt` with the [ZapScript](../zapscript/index.md) you want to run.
2. Burn it into the root folder of a data disc using the standard ISO 9660 filesystem.
3. Insert the disc into the drive Core is watching.

Example `zaparoo.txt`:

```zapscript
**launch.random:SNES
```

The filename is matched case-insensitively and the file can be up to 1 MiB; surrounding whitespace is ignored. The disc's UUID and label still form the token ID, so an existing mapping for that disc keeps working and takes priority over the file. A disc with no readable UUID or label but a valid `zaparoo.txt` is scanned too, and Core reads the disc again when only the file changed between burns.

A disc can also carry a [`zaparoo.json`](./external-drive.md#zaparoojson) in its root folder, with the same `name`, `description`, and `image` fields as a drive cartridge. They apply when the disc [plays from the drive](#play-a-disc-from-the-drive).

## Drive requirements

On a supported Linux-based platform, the operating system must expose the drive as `/dev/sr0`, `/dev/sr1`, or another `/dev/` path. USB and internal SATA optical drives can work through these paths. Blu-ray drives can also work when Core can read the disc's ISO 9660 volume information.

## Troubleshooting

### Drive not detected

Check that Linux can see the drive:

```bash
lsblk
ls -l /dev/sr*
```

Make sure the configured `path` is absolute and points to a device under `/dev/`, such as `/dev/sr0`. Restart Core after changing the path.

If the drive still is not scanned, enable `debug_logging = true` in `config.toml` and check the Core logs.

### Indexed game does not launch

Update the media database after updating Core. Confirm the indexed file uses a supported system and one of the `.chd`, `.cue`, `.gcm`, or `.iso` formats.

Check the Core debug logs for `gameid` identification and property-matching messages. Existing mappings take priority, so check whether the disc UUID or label already has a mapping.

### Disc ignored

Enable `debug_logging = true` in `config.toml`, insert the disc again, and find the `optical media identification probe changed` message in the Core logs. It reports whether Core found a UUID, label, or game ID property.

If the UUID and label are empty, the disc may not contain readable ISO 9660 volume information. Supported game discs may still work through game ID matching, and a disc with a `zaparoo.txt` file runs that file. Other discs need the UUID or label required by your configured `id_source`. Try a different disc, or burn a data disc with a label or a [token file](#use-a-token-file-on-a-disc) if you want a custom token.

### Wrong command launches

Check the Core logs for the actual token ID. Then compare it with your mapping's `match_pattern` and the reader's `id_source` setting.

Restart Core after changing mapping files.
