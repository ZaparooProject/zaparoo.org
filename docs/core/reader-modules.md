# Reader Modules

Reader modules are ways for [Zaparoo Core](.) to communicate with different types of reader hardware. This mostly includes [NFC Readers](../readers/nfc/index.md), but can be other types of hardware or virtual devices.

## libnfc

A passthrough to the [libnfc library](https://github.com/nfc-tools/libnfc). It supports many types of wired connections for common NFC readers available. It has autodetection for ACR122U NFC readers and PN532 modules connected over USB. Handles module IDs: `acr122_usb`, `pn532_uart` and `pn532_i2c`.

### acr122_usb

Supports the ACR122U USB NFC reader. This module does not take a file path as an argument, it takes a device name. This is a little tricky to find at the moment, but auto-detection works well and is generally how you should use it.

### pn532_uart

Supports PN532 modules that are connected via USB through a USB serial chip and with the DIP switches set to UART. This is the module used for all the currently available [Zaparoo USB-C Readers](../readers/nfc/pn532-type-c.md) and [Zaparoo DIY Readers](../readers/nfc/diy-reader.md). The device path is something like `/dev/ttyUSB0` on Linux. This module supports auto-detection.

### pn532_i2c

Supports PN532 modules connected directly like, for example, a GPIO with the DIP switches set to I2C. The device path is something like `/dev/i2c-0`. This module does not currently support auto-detection.

## Simple Serial

A lightweight custom serial protocol that allows a microcontroller to act as a reader using its own hardware and custom logic. The device only needs to offer a read-only serial connection to the attached host. It handles the module ID `simple_serial` and takes a path to a serial device, it does not currently support autodetection. A baud rate of 115200 is required for the serial connection, though this may be configurable in the future.

The module accepts one command payload from the connected device:

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

A virtual reader module which allows treating a file on disk as an input source of tokens. Handles module ID `file` and takes an absolute path to a file on disk. If this file doesn't exist on first startup, Zaparoo will create an empty file.

The contents of the file is used as the token text. No other token metadata can be set with this reader module. When a file is first written to the token will be "inserted", when the contents of the file is cleared it will be "removed".

## Optical Drive

Use an optical drive as a reader. This reader module allows optical media (CDs, DVDs, etc.) to act as tokens for Zaparoo. Currently MiSTer-only and only using the UUID written to a CD. Plug an external USB CD drive into your MiSTer and add the following reader line:

`reader=optical_drive:/dev/sr0`

**A CD must have data written to it (any data) for it to have a UUID assigned.** Check in the Zaparoo App scan screen or the Zaparoo log file to see what UUID is detected from a CD. This value can be added as a mapping with a [mapping file](mappings.md#mapping-files) or through the [API](api/index.md), just like an NFC tag.
