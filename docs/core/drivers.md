# Reader Drivers

Reader drivers are ways for Zaparoo Core to communicate with different types of reader hardware. This mostly includes [NFC Readers](../readers/nfc/index.md), but can be other types of hardware or virtual devices.

## libnfc

A passthrough to the [libnfc library](https://github.com/nfc-tools/libnfc). It supports many types of wired connections for common NFC readers available. It has autodetection for ACR122U NFC readers and PN532 drivers connected over USB. Handles driver IDs: `acr122_usb`, `pn532_uart` and `pn532_i2c`.

### acr122_usb

Supports the ACR122U USB NFC reader. This driver does not take a file path as an argument, it takes a device name. This is a little tricky to find at the moment, but auto-detection works well and is generally how you should use it.

### pn532_uart

Supports PN532 modules that are connected via USB through a USB serial chip and with the DIP switches set to UART. This is the driver used for all the currently available [PN532 USB-C Readers](../readers/nfc/pn532-usb.md). The device path is something like `/dev/ttyUSB0` on Linux. This driver supports auto-detection.

### pn532_i2c

Supports PN532 modules connected directly like, for example, a GPIO with the DIP switches set to I2C. The device path is something like `/dev/i2c-0`. This driver does not currently support auto-detection.

## Optical Drive

Linux-based platforms only. Use CDs, DVDs, etc. as tokens and an optical drive as the reader. Zaparoo currently doesn't read any value off the disc itself, but it does pull either the UUID or label from the disc's metadata, which can be assigned to do something via a [mapping file](mappings.md#mapping-files). _A blank disc won't work, the disc must have data (anything) burned to it before it gets assigned a UUID and label._

Example configuration:

```toml
[[readers.connect]]
driver = 'optical_drive'
path = '/dev/sr0'
id_source = 'merged'
```

This reader driver has an extra option called `id_source`. It can be set to either: `uuid`, `label`, or `merged`. This option is used to determine what value will be used for the [token ID](./tokens.md), which is used to match against [mappings](./mappings.md). `merged` is the default value of nothing is set, and will combine the UUID and label into one value separated by a colon (`:`).

Example mapping file which would launch Crash Bandicoot 3 using the actual PS1 disc:

```toml
[[mappings.entry]]
token_key = 'id'
match_pattern = '*:SCES-01420*'
zapscript = 'PSX/*Crash Bandicoot*Warped*'
```

## Simple Serial

A lightweight custom serial protocol that allows a microcontroller to act as a reader using its own hardware and custom logic. The device only needs to offer a read-only serial connection to the attached host. It handles the driver ID `simple_serial` and takes a path to a serial device, it does not currently support autodetection. A baud rate of 115200 is required for the serial connection, though this may be configurable in the future.

The driver accepts one command payload from the connected device:

```
SCAN\tremovable=yes\tuid=123457890\ttext=NeoGeo/mslug\n
```

That is, a string starting with `SCAN`, 3 named arguments separated by a tab (`\t`), and ending with a newline (`\n`). The device should send this string constantly, as long as it wants the token to be considered active. If a token hasn't been sent for 1 second, it will be considered removed. The intention is that a device can simply spam this text at Zaparoo if something is being read, and Zaparoo will handle the rest to make it act like a standard reader.

All 3 arguments are optional. Sending `SCAN` by itself will explicitly set the token as removed in Zaparoo.

- `removable` is a boolean (`yes`/`no`) value that specifies if the reader is itself capable of telling when a token has been "removed" from it. Setting this to `no` will inform Zaparoo not to clear the token as active when it stops receiving the payload, and make sure it works correctly when insert mode is active. This can be useful, for example, with a barcode scanner which would only scan a barcode once and doesn't make sense to "remove" it later. This option defaults to `yes` and can be left out in most cases.
- `uid` is a string that sets the UID value on the resulting token. This is just an extra piece of metadata that can be attached to a token. It is used for comparing tokens and can be used in a mapping (see [Mappings](mappings.md)). The option defaults to an empty string and is optional.
- `text` is a string which contains the token commands which will be run (see [ZapScript](../zapscript/index.md)).

If the payload only contains one argument without any name, the entire argument will be used as the token text.

## File

A virtual reader driver which allows treating a file on disk as an input source of tokens. Handles driver ID `file` and takes an absolute path to a file on disk. If this file doesn't exist on first startup, Zaparoo will create an empty file.

The contents of the file is used as the token text. No other token metadata can be set with this reader driver. When a file is first written to the token will be "inserted", when the contents of the file is cleared it will be "removed".
