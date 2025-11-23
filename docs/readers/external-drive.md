# External Drive Reader

The external drive reader treats USB sticks, SD cards, and external hard drives as tokens. When a drive is mounted, Zaparoo automatically detects it and executes [ZapScript](/docs/zapscript/) from a `zaparoo.txt` file in the root of the drive.

## Features

- Automatic detection of USB sticks, SD cards, and external HDDs
- Execute ZapScript when a drive is inserted
- Automatic token removal when drive is ejected
- Security protections against symlinks and oversized files
- Cross-platform support (Windows, Linux, macOS)

## Setup

The external drive reader is **disabled by default** and must be manually enabled. Add this to your `config.toml`:

```toml
[[readers.drivers]]
driver = "externaldrive"
enabled = true
```

Once enabled, the reader will automatically detect all mounted external drives. No additional configuration is needed.

## Usage

### Creating a Zaparoo Drive

1. Format a USB stick or SD card (any filesystem supported by your platform)
2. Create a file named `zaparoo.txt` in the root directory
3. Add ZapScript commands to the file
4. Insert the drive into your device

Example `zaparoo.txt` file:

```
**launch.random:snes
```

When you insert the drive, Zaparoo will automatically execute the ZapScript.

### Multiple Drives

Zaparoo can handle multiple external drives simultaneously. Each drive is tracked independently:

- Inserting a drive executes its `zaparoo.txt`
- Removing a drive triggers a token removal event (similar to removing an NFC card)

## Security

The external drive reader includes security protections:

- **Symlink rejection**: Symlinks in `zaparoo.txt` are rejected to prevent path traversal attacks
- **File size limit**: Maximum file size is 1MB to prevent memory exhaustion
- **Read-only**: Cannot write back to the drive (ZapScript execution only)

## Platform Support

| Platform   | Supported | Notes                                   |
| ---------- | --------- | --------------------------------------- |
| Windows    | ✅        | Uses WMI for drive mount events         |
| Linux      | ✅        | Uses D-Bus/UDisks2 for event detection  |
| macOS      | ✅        | Watches `/Volumes` directory for events |
| MiSTer     | ✅        | Works with Linux mount detection        |
| Batocera   | ✅        | Works with Linux mount detection        |
| SteamOS    | ✅        | Works with Linux mount detection        |

## Troubleshooting

### Drive Not Detected

1. Verify the reader is enabled in `config.toml`:

```toml
[[readers.drivers]]
driver = "externaldrive"
enabled = true
```

2. Enable debug logging to see mount events:

```toml
debug_logging = true
```

3. Check that the drive is actually being mounted by your operating system:
   - **Linux**: `mount | grep /media`
   - **macOS**: `diskutil list`
   - **Windows**: Check "This PC" in File Explorer

### File Not Being Read

1. Ensure the file is named exactly `zaparoo.txt` (case-sensitive on Linux/macOS)
2. Ensure it's in the root directory of the drive, not in a subfolder
3. Check file size is under 1MB
4. Verify the file is not a symlink

### ZapScript Not Executing

1. Test the same ZapScript with an NFC tag to verify it's valid
2. Check logs for ZapScript execution errors
3. Ensure there are no special characters or encoding issues in the file

## Advanced Configuration

### Disabling Auto-Detection

The external drive reader auto-detects all mounted drives by default. If you want to manually specify drives, you'll need to disable the reader entirely as per-drive filtering is not currently supported.

### Performance Considerations

- Each mount event includes a 100ms delay to ensure the filesystem is ready
- File read operations have a 5-second timeout
- Unmount events are processed immediately

## Limitations

- **Read-only**: Cannot write ZapScript back to the drive
- **No per-drive filtering**: All detected drives are monitored (cannot exclude specific drives)
- **Root directory only**: `zaparoo.txt` must be in the root, not in subdirectories
- **File size limit**: Maximum 1MB for security
