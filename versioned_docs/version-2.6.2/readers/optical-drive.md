# Optical Drive

Use CDs, DVDs, and Blu-ray discs as physical tokens with any optical drive! This unique reader type turns your disc collection into a library of launchable media.

## Overview

Optical drives provide a nostalgic and tactile way to launch games - insert a disc, and Zaparoo reads its metadata to determine what to launch. This is perfect for:

- **Retro gaming setups** - Physical media for that authentic feel
- **Large game libraries** - Organize games on labeled discs
- **PSX/PS2 authenticity** - Use actual game discs with emulators
- **Custom collections** - Burn blank discs with custom labels

:::info How It Works
Zaparoo reads the disc's **UUID** (Universally Unique Identifier) and/or **label**, not the actual game data. You can use blank discs burned with any data, original game discs, or music CDs - each will have a unique identifier.
:::

## Hardware Requirements

The support is based on the operating system's optical drive support, so any Linux-compatible drive will work:

- **CD drives** - Basic CD-ROM or CD-RW drives
- **DVD drives** - DVD-ROM or DVD±RW drives
- **Blu-ray drives** - BD-ROM or BD-RE drives
- **USB external drives** - Easiest to add to existing setups
- **Internal SATA drives** - Work equally well

Just pick up any drive from your local electronics shop along with some blank discs to get started.

## Driver Configuration

### Driver Details

- **Driver ID**: `optical_drive`
- **Platforms**: Linux-based platforms only
  - [MiSTer](/docs/platforms/mister)
  - [Batocera](/docs/platforms/batocera)
  - [SteamOS](/docs/platforms/steamos)
  - [LibreELEC](/docs/platforms/libreelec)
- **Enabled by default**: No
- **Auto-detect**: No

### Basic Configuration

Add to your [`config.toml`](/docs/core/config):

```toml
[[readers.connect]]
driver = 'optical_drive'
path = '/dev/sr0'
```

:::tip Finding Your Drive
On Linux, optical drives typically appear as `/dev/sr0`, `/dev/sr1`, etc. Use `lsblk` to list all block devices and find your optical drive.
:::

### ID Source Options

The optical drive driver has a special `id_source` option that controls what identifier is used for token matching:

```toml
[[readers.connect]]
driver = 'optical_drive'
path = '/dev/sr0'
id_source = 'merged'  # 'uuid', 'label', or 'merged'
```

#### ID Source Modes

**`merged` (default)** - Combines UUID and label:

- Token ID format: `<UUID>/<LABEL>`
- Example: `2023-04-15-16-42-13-00/SONIC_THE_HEDGEHOG`
- Most flexible for matching

**`uuid`** - Uses only the disc UUID:

- Token ID format: `<UUID>`
- Example: `2023-04-15-16-42-13-00`
- Best for blank discs or when labels might change

**`label`** - Uses only the disc label:

- Token ID format: `<LABEL>`
- Example: `SONIC_THE_HEDGEHOG`
- Best for discs with consistent labels

:::caution Blank Discs
A **completely blank disc won't work** - it must have data burned to it before the OS assigns a UUID and label. Even a single small file is enough.
:::

## Usage Examples

### Example 1: Using Original PSX Discs

Launch a PS1 game using the actual game disc with wildcard matching:

**Configuration:**

```toml
[[readers.connect]]
driver = 'optical_drive'
path = '/dev/sr0'
id_source = 'merged'
```

**Mapping file (`/path/to/mappings.toml`):**

```toml
[[mappings.entry]]
token_key = 'id'
match_pattern = '*/SCES-01420*'
zapscript = 'PSX/*Crash Bandicoot*Warped*'
```

When you insert the Crash Bandicoot 3 disc (with label `SCES-01420`), it matches and launches the game!

### Example 2: Custom Burned Discs

Create custom game discs with specific labels:

**1. Burn a disc with any data and label it `GENESIS_SONIC`**

**2. Configuration:**

```toml
[[readers.connect]]
driver = 'optical_drive'
path = '/dev/sr0'
id_source = 'label'
```

**3. Mapping:**

```toml
[[mappings.entry]]
token_key = 'id'
match_pattern = 'GENESIS_SONIC'
zapscript = 'Genesis/Sonic The Hedgehog'
```

### Example 3: Random Game Launcher

Burn multiple discs, each launching a random game from different systems:

```toml
[[mappings.entry]]
token_key = 'id'
match_pattern = 'RANDOM_NES'
zapscript = '**launch.random:NES'

[[mappings.entry]]
token_key = 'id'
match_pattern = 'RANDOM_SNES'
zapscript = '**launch.random:SNES'

[[mappings.entry]]
token_key = 'id'
match_pattern = 'RANDOM_GENESIS'
zapscript = '**launch.random:Genesis'
```

## Platform-Specific Notes

### MiSTer

Optical drives work great on MiSTer! Both USB and internal SATA drives are supported.

**Finding the device:**

```bash
ls -l /dev/sr*
```

### Batocera

Check `/dev/sr0` or use:

```bash
lsblk | grep rom
```

## Troubleshooting

### Disc Not Detected

1. **Check disc has data** - Blank discs must be burned with at least one file
2. **Verify drive path** - Use `lsblk` to find the correct `/dev/sr*` device
3. **Check permissions** - Ensure user is in `cdrom` group
4. **Try different disc** - Some old/damaged discs may not read properly
5. **Enable debug logging** - Set `debug_logging = true` in config.toml

### Wrong Game Launches

- **Check your mappings** - Verify `match_pattern` is correct
- **Test disc ID** - Check Zaparoo logs to see what ID the disc reports
- **Use `id_source`** - Try different modes (uuid/label/merged)

### Drive Not Recognized

```bash
# Check if drive is detected by the system
lsblk
dmesg | grep -i cdrom

# Check if device exists
ls -l /dev/sr0
```

## Limitations

- **Linux only** - Not supported on Windows or macOS
- **Metadata only** - Zaparoo reads UUID/label, not actual disc contents
- **No game data** - You cannot launch games directly from the disc data (yet)
- **Requires burned discs** - Completely blank discs won't work

