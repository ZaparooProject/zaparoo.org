---
description: "Use a USB stick, SD card, or removable drive as a Zaparoo token by adding a zaparoo.txt file."
keywords: [zaparoo external drive, usb stick token, sd card launcher zaparoo]
---

# External Drive Reader

A USB stick or SD card can work as a [Zaparoo token](../tokens/index.md). Put a `zaparoo.txt` file on the drive, plug it into the device running [Core](../core/index.md), and Zaparoo scans the file contents.

This is useful if you want physical tokens without buying [NFC cards](../tokens/nfc/index.md) or a separate reader.

## Platforms

<PlatformSupport
  groups={[
    {
      name: "Base OS",
      platforms: [
        { name: "Windows", href: "../platforms/windows/", support: "supported" },
        { name: "macOS", href: "../platforms/mac", support: "supported" },
        { name: "Linux", href: "../platforms/linux/", support: "supported" },
      ],
    },
    {
      name: "FPGA",
      platforms: [
        { name: "MiSTer", href: "../platforms/mister/", support: "supported" },
        { name: "MiSTeX", href: "../platforms/mistex", support: "supported" },
      ],
    },
    {
      name: "Retro Gaming OS",
      platforms: [
        { name: "Batocera", href: "../platforms/batocera/", support: "supported" },
        { name: "RePlayOS", href: "../platforms/replayos", support: "supported" },
      ],
    },
    {
      name: "Handheld and Gaming Linux",
      platforms: [
        { name: "SteamOS", href: "../platforms/steamos", support: "supported" },
        { name: "Bazzite", href: "../platforms/bazzite", support: "supported" },
        { name: "ChimeraOS", href: "../platforms/chimeraos", support: "supported" },
      ],
    },
    {
      name: "Media Center",
      platforms: [
        { name: "LibreELEC", href: "../platforms/libreelec", support: "supported" },
      ],
    },
  ]}
/>

## Enable the reader

The reader is disabled by default. Add this to your [`config.toml`](../core/config.md):

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

The filename is matched case-insensitively, so `zaparoo.txt`, `ZAPAROO.TXT`, and similar casing work.

## What happens when you insert it

When the drive mounts, Core looks for `zaparoo.txt`. If it finds one, it trims surrounding whitespace and scans the remaining text as an `externaldrive` token. On Linux, Core can also find the file on sibling partitions mounted under `/media` or `/mnt`, which helps with multi-partition USB drives.

Removing or ejecting the drive clears the active token, similar to removing an NFC card from a reader.

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
