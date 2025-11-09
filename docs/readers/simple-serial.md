# Simple Serial Reader

The Simple Serial driver allows microcontrollers and custom hardware to act as Zaparoo readers using a lightweight serial protocol. This enables you to build custom readers with your own hardware and scanning logic - perfect for DIY projects, barcode scanners, RFID modules that aren't directly supported, or creative reader implementations.

## Overview

With this driver, your device only needs to provide a read-only serial connection. The microcontroller handles all the scanning logic and hardware interaction, then sends simple text commands to Zaparoo Core over serial.

### Common Use Cases

- **Custom barcode scanners** - Scan barcodes and send the data to Zaparoo
- **Unsupported RFID modules** - Use modules like [RC522](/docs/readers/nfc/rc522) with a microcontroller
- **Custom button interfaces** - Create physical button panels that trigger Zaparoo actions
- **Multi-reader setups** - Combine multiple readers into one serial stream
- **Experimental hardware** - Prototype new reader types quickly

## Driver Configuration

### Driver Details

- **Driver ID**: `simple_serial`
- **Platforms**: [All platforms](/docs/platforms/)
- **Enabled by default**: Yes
- **Auto-detect**: Yes
- **Baud Rate**: 115200 (fixed, not currently configurable)

### Configuration Example

Add to your [`config.toml`](/docs/core/config):

```toml
[[readers.connect]]
driver = 'simple_serial'
path = '/dev/ttyUSB0'  # Linux/MiSTer
```

On Windows:
```toml
[[readers.connect]]
driver = 'simple_serial'
path = 'COM3'  # Windows COM port
```

## Protocol Specification

### Command Format

The protocol uses a simple text-based format. Your device sends newline-terminated commands:

```
SCAN\t<arg1>=<value1>\t<arg2>=<value2>\t...\n
```

**Format rules:**
- Start with `SCAN`
- Arguments separated by tabs (`\t`)
- End with newline (`\n`)
- Arguments are `name=value` pairs

### Token Persistence

Send the `SCAN` command **continuously** while a token should be active:
- Keep sending the command repeatedly while a token is present
- If Core doesn't receive a command for **1 second**, the token is considered removed
- This creates natural "hold to scan" behavior

### Basic Example

Scan a Genesis game and keep it active:
```
SCAN\ttext=Genesis/Sonic The Hedgehog\n
SCAN\ttext=Genesis/Sonic The Hedgehog\n
SCAN\ttext=Genesis/Sonic The Hedgehog\n
...
```

### Removing a Token

To explicitly remove a token, send `SCAN` with no arguments:
```
SCAN\n
```

## Command Arguments

All arguments are optional. You can send any combination that makes sense for your reader.

### `text` - Token Content

The [ZapScript](/docs/zapscript/) commands to execute:

```
SCAN\ttext=**launch.random:SNES\n
```

```
SCAN\ttext=NeoGeo/Metal Slug\n
```

### `uid` - Unique Identifier

An identifier for the physical token (optional metadata):

```
SCAN\tuid=04a1b2c3d4e5f6\ttext=Genesis/Sonic\n
```

The UID can be used in [mappings](/docs/core/mappings) for token comparison or matching.

### `removable` - Removal Behavior

Controls whether the token auto-removes when commands stop:

- `removable=yes` (default) - Token removed after 1 second of no commands
- `removable=no` - Token stays active until explicitly removed

**Use `removable=no` for:**
- Barcode scanners (scan once, no way to "remove" a barcode)
- Button interfaces (press once, action persists)
- One-shot triggers

**Example - Barcode Scanner:**
```
SCAN\tremovable=no\ttext=PSX/Crash Bandicoot\n
```

After this single command, the token stays active. It won't be removed even if no more commands are sent.

**Example - NFC Reader (default behavior):**
```
SCAN\tremovable=yes\ttext=SNES/Super Mario World\n
SCAN\tremovable=yes\ttext=SNES/Super Mario World\n
...
```

Stop sending commands → token removed after 1 second.

## Simplified Single-Argument Format

If you only need to send token text, you can skip the argument names:

```
SCAN\tGenesis/Sonic 2\n
```

This is equivalent to:
```
SCAN\ttext=Genesis/Sonic 2\n
```

## Example Implementations

### Arduino - NFC Reader

```cpp
#include <PN532_HSU.h>
#include <PN532.h>

PN532_HSU pn532hsu(Serial1);
PN532 nfc(pn532hsu);

void setup() {
  Serial.begin(115200);  // Serial to Zaparoo
  Serial1.begin(115200); // Serial to PN532
  nfc.begin();
}

void loop() {
  uint8_t uid[7];
  uint8_t uidLength;

  if (nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength)) {
    // Read NDEF data from tag and format as text
    String text = readNdefText();

    // Send to Zaparoo continuously while tag is present
    while (nfc.isPresent()) {
      Serial.print("SCAN\ttext=");
      Serial.print(text);
      Serial.print("\n");
      delay(100);  // Send ~10 times per second
    }

    // Tag removed - send explicit removal
    Serial.print("SCAN\n");
  }

  delay(100);
}
```

### Python - Barcode Scanner

```python
import serial
import time

ser = serial.Serial('/dev/ttyUSB0', 115200)

def scan_barcode():
    # Read barcode from scanner hardware
    barcode = read_barcode_from_hardware()

    # Send to Zaparoo (removable=no means it won't auto-clear)
    command = f"SCAN\tremovable=no\ttext={barcode}\n"
    ser.write(command.encode())

while True:
    scan_barcode()
    time.sleep(0.1)
```

### ESP32 - Button Interface

```cpp
void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(BUTTON_PIN) == LOW) {
    // Button pressed - send command once
    Serial.print("SCAN\tremovable=no\ttext=**launch.random:Arcade\n");
    delay(500);  // Debounce
  }
}
```

## Troubleshooting

### Token Not Detected

1. **Check baud rate** - Must be 115200
2. **Verify newline** - Commands must end with `\n`
3. **Check tab characters** - Use `\t`, not spaces
4. **Enable debug logging** - Set `debug_logging = true` in config.toml

### Token Removed Too Quickly

- You need to send commands **continuously** (every ~100-500ms)
- Token is removed after 1 second of silence
- For one-shot actions, use `removable=no`

### Serial Port Not Found

**Linux:**
```bash
ls /dev/ttyUSB*
ls /dev/ttyACM*
```

**Windows:**
Check Device Manager under "Ports (COM & LPT)"

### Permission Denied (Linux)

Add your user to the dialout group:
```bash
sudo usermod -a -G dialout $USER
```

Log out and back in for changes to take effect.

## See Also

- **[RC522 Reader](/docs/readers/nfc/rc522)** - Use RC522 modules with simple serial
- **[Configuration](/docs/core/config#readers)** - Reader configuration options
- **[ZapScript](/docs/zapscript/)** - Commands to send in the `text` field
- **[Mappings](/docs/core/mappings)** - Use UIDs to map tokens to actions
- **[Community Projects](/docs/community-projects/)** - See DIY reader projects
