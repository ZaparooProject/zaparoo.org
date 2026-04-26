---
description: Use a text file as a virtual Zaparoo reader for scripts and automation.
keywords: [zaparoo file reader, virtual reader zaparoo, automation zaparoo, script token zaparoo]
---

# File Reader

The File Reader treats a text file as a [Zaparoo reader](./index.md). When the file contains text, Core reads that text as a [ZapScript](../zapscript/index.md) token. When the file is empty, the token is removed.

This is useful for scripts, local tools, and automation that need to trigger Zaparoo without physical reader hardware.

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
        { name: "ReplayOS", href: "../platforms/replayos", support: "supported" },
        { name: "Recalbox", href: "../platforms/recalbox", support: "supported" },
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

## Configure the reader

Add a `file` reader to your [`config.toml`](../core/config.md):

```toml
[[readers.connect]]
driver = 'file'
path = '/tmp/zaparoo-token.txt'
```

On Windows, use an absolute path to a writable location:

```toml
[[readers.connect]]
driver = 'file'
path = 'C:/zaparoo/input.txt'
```

The path must be absolute. The parent directory must already exist, but Core creates the watched file if it is missing when the reader starts.

## Use the file

Write token text or ZapScript into the file to scan it:

```bash
echo "**launch.random:SNES" > /tmp/zaparoo-token.txt
```

Clear the file to remove the active token:

```bash
echo "" > /tmp/zaparoo-token.txt
```

On Windows PowerShell:

```powershell
Set-Content -Path C:/zaparoo/input.txt -Value '**launch.random:SNES'
Clear-Content -Path C:/zaparoo/input.txt
```

## Behavior notes

- Core checks the file about every 100 ms.
- Surrounding whitespace is trimmed, including trailing newlines.
- Empty or whitespace-only file contents mean there is no active token.
- Writing different text scans a new token.
- Writing the same trimmed text again is ignored as a duplicate.
- You can control the token text only. UID is not configurable through this reader.
- Writing physical tokens through the File Reader is not supported.

## Troubleshooting

If changes are not detected, check these first:

- The `path` in `config.toml` is absolute.
- The parent directory exists.
- Zaparoo Core can read and write the file.
- Core was restarted after changing `config.toml`.
- The file contains non-whitespace text when you expect a scan.

Clear the file contents to remove the token. Do not delete the watched file while Core is running. If the file was deleted and scans stop, recreate the file and restart Core.
