# Reader Drivers

Reader drivers are ways for Zaparoo Core to communicate with different types of reader hardware. This mostly includes [NFC Readers](/docs/readers/nfc/), but can be other types of hardware or virtual devices.

## PN532

- **Driver IDs**: `pn532`, `pn532_uart`, `pn532_i2c`, `pn532_spi`
- **Platforms**: [All platforms](/docs/platforms/)
- **Enabled by default**: Yes
- **Auto-detect**: Yes

A unified driver for PN532 NFC modules that supports multiple transport protocols (UART, I2C, SPI). This is the modern replacement for the legacy pn532_uart driver and is used for all currently available [PN532 USB-C Readers](/docs/readers/nfc/pn532-usb).

- **UART**: For PN532 modules connected via USB serial (e.g., `/dev/ttyUSB0` on Linux)
- **I2C**: For direct I2C connections (e.g., `/dev/i2c-0` on Linux)
- **SPI**: For SPI connections

Auto-detection is enabled by default for UART connections but can be configured for other transport types. See [Reader Configuration](/docs/core/config#readers) for details.

## ACR122U (USB)

- **Driver IDs**: `acr122_usb`
- **Platforms**: [All platforms](/docs/platforms/) (except [Windows](/docs/platforms/windows/) and macOS)
- **Enabled by default**: Yes
- **Auto-detect**: Yes

A passthrough to the [libnfc library](https://github.com/nfc-tools/libnfc) that now primarily supports [ACR122U](/docs/readers/nfc/acr122u) USB NFC readers with autodetection. The PN532 UART and I2C support has been moved to the unified `pn532` driver.

This driver does not take a file path as an argument, it takes a device name. This is a little tricky to find at the moment, but auto-detection works well and is generally how you should use it.

## ACR122U (PCSC)

- **Driver IDs**: `acr122_pcsc`
- **Platforms**: [Windows](/docs/platforms/windows/)
- **Enabled by default**: Yes
- **Auto-detect**: Yes

ACR122 NFC reader support via the PC/SC (Personal Computer/Smart Card) protocol. This driver provides ACR122U support on Windows platforms using the PC/SC interface.

## TTY2OLED

- **Driver IDs**: `tty2oled`
- **Platforms**: [All platforms](/docs/platforms/)
- **Enabled by default**: No
- **Auto-detect**: Yes

A display device driver for [TTY2OLED](https://github.com/venice1200/MiSTer_tty2oled) serial display devices. This driver communicates with TTY2OLED hardware to show game information and artwork on external displays. It requires a serial connection to the TTY2OLED device.

**Note**: This driver is disabled by default and must be explicitly enabled in the configuration. See [Reader Configuration](/docs/core/config#readers) for details.

## Optical Drive

- **Driver IDs**: `optical_drive`
- **Platforms**: Linux-based platforms ([Linux](/docs/platforms/linux), [MiSTer](/docs/platforms/mister), [Batocera](/docs/platforms/batocera), [SteamOS](/docs/platforms/steamos), RetroPie, [Recalbox](/docs/platforms/recalbox), [LibreELEC](/docs/platforms/libreelec), [ChimeraOS](/docs/platforms/chimeraos), [Bazzite](/docs/platforms/bazzite))
- **Enabled by default**: Yes
- **Auto-detect**: Yes

Use CDs, DVDs, etc. as tokens and an [optical drive](/docs/readers/optical-drive) as the reader. Zaparoo currently doesn't read any value off the disc itself, but it does pull either the UUID or label from the disc's metadata, which can be assigned to do something via a [mapping file](/docs/core/mappings#mapping-files). _A blank disc won't work, the disc must have data (anything) burned to it before it gets assigned a UUID and label._

Example configuration:

```toml
[[readers.connect]]
driver = 'optical_drive'
path = '/dev/sr0'
id_source = 'merged'
```

This reader driver has an extra option called `id_source`. It can be set to either: `uuid`, `label`, or `merged`. This option is used to determine what value will be used for the [token ID](/docs/core/tokens), which is used to match against [mappings](/docs/core/mappings). `merged` is the default value of nothing is set, and will combine the UUID and label into one value separated by a colon (`:`).

Example mapping file which would launch Crash Bandicoot 3 using the actual PS1 disc:

```toml
[[mappings.entry]]
token_key = 'id'
match_pattern = '*:SCES-01420*'
zapscript = 'PSX/*Crash Bandicoot*Warped*'
```

## Simple Serial

- **Driver IDs**: `simple_serial`
- **Platforms**: [All platforms](/docs/platforms/)
- **Enabled by default**: Yes
- **Auto-detect**: Yes

A lightweight custom serial protocol that allows a microcontroller to act as a reader using its own hardware and custom logic. The device only needs to offer a read-only serial connection to the attached host. It takes a path to a serial device and does not currently support autodetection. A baud rate of 115200 is required for the serial connection, though this may be configurable in the future.

The driver accepts one command payload from the connected device:

```
SCAN\tremovable=yes\tuid=123457890\ttext=NeoGeo/mslug\n
```

That is, a string starting with `SCAN`, 3 named arguments separated by a tab (`\t`), and ending with a newline (`\n`). The device should send this string constantly, as long as it wants the token to be considered active. If a token hasn't been sent for 1 second, it will be considered removed. The intention is that a device can simply spam this text at Zaparoo if something is being read, and Zaparoo will handle the rest to make it act like a standard reader.

All 3 arguments are optional. Sending `SCAN` by itself will explicitly set the token as removed in Zaparoo.

- `removable` is a boolean (`yes`/`no`) value that specifies if the reader is itself capable of telling when a token has been "removed" from it. Setting this to `no` will inform Zaparoo not to clear the token as active when it stops receiving the payload, and make sure it works correctly when insert mode is active. This can be useful, for example, with a barcode scanner which would only scan a barcode once and doesn't make sense to "remove" it later. This option defaults to `yes` and can be left out in most cases.
- `uid` is a string that sets the UID value on the resulting token. This is just an extra piece of metadata that can be attached to a token. It is used for comparing tokens and can be used in a mapping (see [Mappings](/docs/core/mappings)). The option defaults to an empty string and is optional.
- `text` is a string which contains the token commands which will be run (see [ZapScript](/docs/zapscript/)).

If the payload only contains one argument without any name, the entire argument will be used as the token text.

## File

- **Driver IDs**: `file`
- **Platforms**: [All platforms](/docs/platforms/)
- **Enabled by default**: Yes
- **Auto-detect**: Yes

A virtual reader driver which allows treating a file on disk as an input source of tokens. Takes an absolute path to a file on disk. If this file doesn't exist on first startup, Zaparoo will create an empty file.

The contents of the file is used as the token text. No other token metadata can be set with this reader driver. When a file is first written to the token will be "inserted", when the contents of the file is cleared it will be "removed".
