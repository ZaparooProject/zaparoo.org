# File Reader (Virtual)

The File Reader is a virtual reader that treats a file on disk as an input source for [tokens](/docs/tokens/). This enables automation, remote control, testing, and integration with other software without physical hardware.

## Overview

Instead of scanning physical tokens, the File Reader monitors a text file. When the file's contents change, Zaparoo treats it as a new token scan. This opens up powerful automation possibilities:

- **Web interfaces** - Build custom web UIs that write to the file
- **Scripts and automation** - Control Zaparoo from shell scripts, Python, etc.
- **Testing** - Test token commands without physical hardware
- **Remote control** - Control Zaparoo over the network via file shares

:::tip Advanced Use Cases
While the File Reader is great for simple automation, the [Core API](/docs/core/api/) is recommended for more advanced use cases. The API provides programmatic control with full support for token metadata (UID, data fields) and more robust integration options.
:::

## Driver Configuration

### Driver Details

- **Driver ID**: `file`
- **Platforms**: [All platforms](/docs/platforms/)
- **Enabled by default**: Yes
- **Auto-detect**: No (requires manual configuration)

### Configuration

Add to your [`config.toml`](/docs/core/config):

```toml
[[readers.connect]]
driver = 'file'
path = '/tmp/zaparoo_input'  # Linux/MiSTer
```

On Windows:

```toml
[[readers.connect]]
driver = 'file'
path = 'C:/zaparoo/input.txt'
```

:::tip Auto-Creation
If the file doesn't exist when Zaparoo Core starts, it will automatically create an empty file at the specified path.
:::

## How It Works

### Token Insertion

When you **write content** to the file, a token is "inserted":

```bash
echo "Genesis/Sonic The Hedgehog" > /tmp/zaparoo_input
```

### Token Removal

When you **clear** the file, the token is "removed":

```bash
echo "" > /tmp/zaparoo_input
# or
> /tmp/zaparoo_input
```

### File Contents as Token Text

The entire file content becomes the token's [ZapScript](/docs/zapscript/) text. No other token metadata (like UID or data) can be set through this reader.

## Usage Examples

### Launch a Random Game

```bash
# Linux/MiSTer
echo "**launch.random:SNES" > /tmp/zaparoo_input
```

```powershell
# Windows PowerShell
Set-Content C:\zaparoo\input.txt "**launch.random:SNES"
```

### Launch a Specific Game

```bash
echo "PSX/Crash Bandicoot" > /tmp/zaparoo_input
```

### Stop Media (Clear Token)

```bash
echo "" > /tmp/zaparoo_input
```

### Execute ZapScript Commands

```bash
echo "**http.post:http://example.com/webhook||**delay:1000||**echo:Done!" > /tmp/zaparoo_input
```

## Integration Examples

### Python Script

```python
def launch_game(system, game):
    with open('/tmp/zaparoo_input', 'w') as f:
        f.write(f"{system}/{game}\n")

def stop_game():
    with open('/tmp/zaparoo_input', 'w') as f:
        f.write("")

# Launch a game
launch_game("SNES", "Super Mario World")

# Later, stop it
stop_game()
```

### Bash Script Menu

```bash
#!/bin/bash

echo "Zaparoo Launcher Menu"
echo "1. Random NES Game"
echo "2. Random SNES Game"
echo "3. Random Genesis Game"
echo "4. Stop"

read -p "Choice: " choice

case $choice in
  1) echo "**launch.random:NES" > /tmp/zaparoo_input ;;
  2) echo "**launch.random:SNES" > /tmp/zaparoo_input ;;
  3) echo "**launch.random:Genesis" > /tmp/zaparoo_input ;;
  4) echo "" > /tmp/zaparoo_input ;;
esac
```

## Advanced Uses

### Multiple File Readers

You can configure multiple file readers for different purposes:

```toml
[[readers.connect]]
driver = 'file'
path = '/tmp/zaparoo_games'

[[readers.connect]]
driver = 'file'
path = '/tmp/zaparoo_commands'
```

### Network File Sharing

Place the file on a network share to control Zaparoo remotely:

```toml
[[readers.connect]]
driver = 'file'
path = '/mnt/nas/zaparoo/input.txt'
```

Now any computer that can write to the network share can control Zaparoo.

## Limitations

- **No UID or data fields** - Only token text is supported
- **No automatic removal** - You must explicitly clear the file
- **File system dependent** - File change detection relies on the OS
- **Not suitable for rapid changes** - There may be a small delay in detection

## Troubleshooting

### Changes Not Detected

1. **Check file path** - Ensure the path in config.toml is correct and absolute
2. **Restart Core** - Changes to config.toml require a restart
3. **File permissions** - Ensure Zaparoo Core can read the file
4. **Check logs** - Enable `debug_logging = true` in config.toml

### File Not Created

- Verify the **parent directory exists** and is writable
- Check Core logs for permission errors

### Token Stays Active

- You must **clear the file contents** to remove the token
- Simply deleting the file won't work (Core will recreate it)

