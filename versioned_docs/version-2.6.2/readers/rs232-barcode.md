# RS232 Barcode Scanner

The RS232 barcode scanner reader supports barcode and QR code scanners that connect via serial (RS232) interface. These are commonly used in retail and industrial settings and provide a reliable alternative to optical drives for reading barcodes.

## Features

- Supports RS232 serial barcode and QR code scanners
- Automatic barcode parsing with standard and POS-format support
- QR code support (up to QR Code v40, ~4KB data)
- Line-based reading with both `\n` and `\r` delimiters
- Buffer overflow protection
- Cross-platform serial communication

## Setup

The RS232 barcode reader requires manual configuration. Auto-detection is not supported.

### Configuration

Add this to your `config.toml`:

```toml
[[readers.connect]]
driver = "rs232barcode"
path = "/dev/ttyUSB0"  # Linux/macOS
```

On Windows:

```toml
[[readers.connect]]
driver = "rs232barcode"
path = "COM3"  # Windows
```

### Finding Your Serial Port

**Linux:**
```bash
ls /dev/ttyUSB* /dev/ttyACM*
```

**macOS:**
```bash
ls /dev/tty.usb* /dev/cu.usb*
```

**Windows:**
- Check Device Manager → Ports (COM & LPT)
- Look for "USB Serial Port (COMX)"

## Connection Settings

The reader uses these fixed serial settings (standard for most barcode scanners):

- **Baud Rate**: 9600
- **Data Bits**: 8
- **Parity**: None
- **Stop Bits**: 1

Most barcode scanners are configured to these defaults out of the box. If your scanner uses different settings, you may need to reconfigure it using the manufacturer's programming barcodes.

## Usage

### Basic Barcode Scanning

1. Configure the reader in `config.toml`
2. Restart Zaparoo Core
3. Scan a barcode or QR code
4. The barcode data is executed as [ZapScript](/docs/zapscript/)

### Creating Barcodes for Zaparoo

Print barcodes or QR codes containing ZapScript commands:

**Code 128 Barcode:**
```
@Genesis/Sonic the Hedgehog
```

**QR Code:**
```
**launch.random:snes
```

QR codes support much more data (up to ~4KB) compared to linear barcodes (~100 characters), making them better for complex ZapScript.

### Supported Barcode Formats

The RS232 reader doesn't care about the barcode format - it just reads whatever data the scanner sends. Your scanner determines what formats it can read. Common formats include:

- Code 128
- Code 39
- EAN-13 / UPC
- QR Code (most versatile for Zaparoo)
- Data Matrix
- PDF417

Check your scanner's documentation for supported formats.

## Scanner Compatibility

### POS Scanners

The reader automatically strips STX (Start of Text, `0x02`) and ETX (End of Text, `0x03`) framing characters commonly used by Point of Sale scanners. This means POS-configured scanners work out of the box.

### Line Endings

Both `\n` (newline) and `\r` (carriage return) are treated as line delimiters. Most scanners send `\r\n` or just `\r` after each scan, both work fine.

## Platform Support

| Platform   | Supported | Typical Device Path  |
| ---------- | --------- | -------------------- |
| MiSTer     | ✅        | `/dev/ttyUSB0`       |
| Windows    | ✅        | `COM3`               |
| Linux      | ✅        | `/dev/ttyUSB0`       |
| macOS      | ✅        | `/dev/tty.usbserial` |
| Batocera   | ✅        | `/dev/ttyUSB0`       |
| SteamOS    | ✅        | `/dev/ttyUSB0`       |

## Troubleshooting

### Scanner Not Working

1. **Verify port path**:
   - Run the device detection commands above
   - Update `config.toml` with the correct port

2. **Check permissions** (Linux/macOS):
   ```bash
   sudo usermod -a -G dialout $USER
   # Log out and back in for changes to take effect
   ```

3. **Enable debug logging**:
   ```toml
   debug_logging = true
   ```

   Then check logs for messages like:
   ```
   opened RS232 barcode reader: /dev/ttyUSB0
   barcode scanned: @Genesis/Sonic
   ```

### Nothing Happens When Scanning

1. Verify the barcode contains valid ZapScript
2. Test the same content on an NFC tag to rule out ZapScript issues
3. Check that the scanner is sending data with line endings (`\r` or `\n`)

### Buffer Overflow Errors

If you see "buffer overflow" in the logs:

- The scanned data is too large (>8KB limit)
- For QR codes, this shouldn't happen unless you're using extremely large QR codes
- Try reducing the data in your barcode/QR code

### Wrong Data Being Scanned

Some scanners have configurable prefixes/suffixes. Make sure your scanner isn't adding extra characters:

1. Test scan a simple barcode in a text editor
2. If extra characters appear, reconfigure your scanner using programming barcodes
3. Look for "prefix" and "suffix" settings in your scanner's manual

## Recommended Hardware

### Budget Option
Generic USB barcode scanners with serial output mode. Most can be switched between USB HID (keyboard mode) and RS232 serial mode using programming barcodes.

### QR Code Support
Look for scanners that specifically support 2D codes (QR, Data Matrix). Linear-only scanners won't read QR codes.

### Industrial Options
Honeywell, Zebra, and Datalogic make high-quality industrial scanners with RS232 support. These are more expensive but extremely reliable.

## Limitations

- **Read-only**: Cannot write barcodes (obviously!)
- **No auto-detection**: Must manually configure the serial port path
- **Fixed serial settings**: 9600 baud, 8N1 (reconfigure your scanner if it uses different settings)
- **8KB data limit**: Maximum barcode/QR size is 8KB
- **No scanner programming**: Zaparoo doesn't program or configure scanners

## Comparison with Optical Drive Reader

| Feature              | RS232 Barcode | Optical Drive   |
| -------------------- | ------------- | --------------- |
| Speed                | Very fast     | Slower          |
| Reliability          | Excellent     | Good            |
| Token reusability    | Unlimited     | Limited (discs) |
| Cost                 | $30-200       | $20-50          |
| QR Code support      | Yes (scanner) | No              |
| Physical durability  | High          | Medium          |
| Requires peripherals | Scanner       | Disc printer    |

## See Also

- [Barcode Scanner (USB HID)](/docs/readers/barcode/) - Alternative USB keyboard-mode scanner
- [ZapScript Documentation](/docs/zapscript/)
- [Config File Reference](/docs/core/config)
