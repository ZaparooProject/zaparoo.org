---
description: "Use a CD, DVD, or Blu-ray disc as a Zaparoo token with a Linux optical drive."
keywords: [zaparoo optical drive, cd token, dvd token, disc launcher zaparoo]
---

# Optical Drive Reader

An optical disc can work as a [Zaparoo token](../tokens/index.md) on Linux-based systems. Connect a CD, DVD, or Blu-ray drive to the device running [Core](../core/index.md), point the reader at the drive device, and Core uses the disc ID reported by Linux.

This reader does not read games or media from the disc. It uses the disc as a physical trigger for a [mapping](../features/mappings.md) or [ZapScript](../zapscript/index.md) command.

## Platforms

<PlatformSupport
  groups={[
    {
      name: "Base OS",
      platforms: [
        { name: "Windows", href: "../platforms/windows/", support: "unsupported", note: "Linux only." },
        { name: "macOS", href: "../platforms/mac", support: "unsupported", note: "Linux only." },
        { name: "Linux", href: "../platforms/linux/", support: "supported" },
      ],
    },
    {
      name: "FPGA",
      platforms: [
        { name: "MiSTer", href: "../platforms/mister/", support: "supported" },
        { name: "MiSTeX", href: "../platforms/mistex", support: "unsupported", note: "Not included in the current MiSTeX Core reader set." },
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

The optical drive reader is available on supported Linux-based platforms, but you usually need to tell Core which drive device to watch. Linux optical drives usually appear as `/dev/sr0`, `/dev/sr1`, and so on.

Add a `readers.connect` entry to your [`config.toml`](../core/config.md):

```toml
[[readers.connect]]
driver = "opticaldrive"
path = "/dev/sr0"
```

Restart Core after changing the config. Use `lsblk` or check `/dev/sr*` if you are not sure which path your drive uses.

## Choose the scanned ID

Core checks the configured drive about once a second. It asks Linux `blkid` for the disc `UUID` and `LABEL`, then scans the result as a `disc` token.

The `id_source` option controls which value is used for matching:

```toml
[[readers.connect]]
driver = "opticaldrive"
path = "/dev/sr0"
id_source = "merged"
```

The available modes are:

- `merged` combines UUID and label as `<UUID>/<LABEL>`. This is the default when both values are available.
- `uuid` uses only the disc UUID.
- `label` uses only the disc label.

If only one value is available, Core uses that value. If neither value is available, nothing is scanned. Removing the disc clears the active token.

`merged` is usually the safest option for matching a specific disc. `label` can be easier for custom burned discs if you control the label and keep it unique.

## Map a disc to a command

For a custom disc, one practical setup is to use the disc label as the token ID.

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

Core does not write anything to the disc. Completely blank discs usually will not work because Linux has no UUID or label to report.

## Supported drives and platforms

This reader is for Linux-based systems where Core includes the optical drive reader and the operating system exposes the drive as `/dev/sr0`, `/dev/sr1`, or another `/dev/` path.

USB optical drives are the most common option. Internal SATA drives can also work if Linux exposes them the same way. Blu-ray drives can be used when Linux exposes the disc and `blkid` can read its metadata.

The reader is available on Linux-based Zaparoo platforms such as [MiSTer](../platforms/mister/index.md), [Batocera](../platforms/batocera/index.md), [SteamOS](../platforms/steamos.md), and [LibreELEC](../platforms/libreelec.md). It is not supported on Windows, macOS, or MiSTeX.

## Troubleshooting

### Drive not detected

Check that Linux can see the drive:

```bash
lsblk
ls -l /dev/sr*
```

Make sure the configured `path` is absolute and points to a device under `/dev/`, such as `/dev/sr0`. Restart Core after changing the path.

If the drive still is not scanned, enable `debug_logging = true` in `config.toml` and check the Core logs.

### Disc ignored

Check whether Linux can read a UUID or label from the disc:

```bash
blkid -o value -s UUID /dev/sr0
blkid -o value -s LABEL /dev/sr0
```

If both commands return nothing or fail, Core has no disc ID to scan. Try a different disc, or burn a data disc with a label if you want a custom token.

### Wrong command launches

Check the Core logs for the actual token ID. Then compare it with your mapping's `match_pattern` and the reader's `id_source` setting.

Restart Core after changing mapping files.
