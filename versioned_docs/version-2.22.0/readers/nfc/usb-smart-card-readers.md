---
sidebar_position: 3.5
description: Use USB smart card NFC readers with Zaparoo, including the ACS ACR1552U and Feitian bR500. Covers tested readers, setup, and how to get an untested reader supported.
keywords: [acr1552u zaparoo, feitian br500 zaparoo, usb smart card reader nfc, ccid nfc reader, pc/sc nfc reader, nfc reader mister fpga]
---

# USB Smart Card Readers

Many USB smart card readers have a contactless slot that can read NFC tags. Zaparoo Core supports them with its `ccid` driver, which works with readers that follow the CCID and PC/SC standards. These readers can read and write [NTAG](../../tokens/nfc/index.md) and [MIFARE Classic](../../tokens/nfc/mifare.md) tags.

## Tested readers

These readers are tested with Zaparoo and are detected as soon as you plug them in.

### ACS ACR1552U

<img className="docHeroImage" src="/img/docs/readers/ACR1552U-NFC-reader.png" alt="An ACS ACR1552U USB NFC reader" width="300" />

A USB NFC reader in a finished case from [ACS](https://www.acs.com.hk/en/products/575/acr1552u-usb-nfc-reader-iv/), the maker of the original [ACR122U](./acr122u.md).

- <ProductLink href="https://www.amazon.com.au/ACS-ACR1552U-Reader-Type-W128445488/dp/B0CJPXCYWK" store="amazon">Amazon (Australia)</ProductLink>

### Feitian bR500

<img className="docHeroImage" src="/img/docs/readers/Feitian-bR500-NFC-reader.png" alt="A Feitian bR500 card reader" width="300" />

A card reader from Feitian that connects over USB or Bluetooth. Zaparoo supports it over a USB cable only; Bluetooth connections are not supported.

- <ProductLink href="https://www.ftsafe.com/store/product/bluetooth-card-reader/" store="other">Feitian store</ProductLink>

### ACR122U

The [ACR122U](./acr122u.md) uses the same driver. It has its own page because of the clone compatibility issues that come with it.

## Platforms

<PlatformSupport readerId="usb-smart-card" />

## Setup

Plug the reader in with a USB cable. Core finds it on its own.

On Windows and on Linux systems running the PC/SC service (`pcscd`), Core goes through that service. Elsewhere, such as on MiSTer, it talks to the reader over USB directly, so no extra software is needed. On desktop Linux and SteamOS, that needs the udev rule from Core's hardware support; see [Linux](../../platforms/linux/index.md#troubleshooting) or [SteamOS](../../platforms/steamos/index.md#an-nfc-reader-is-not-detected) if the reader does not scan.

If you have more than one smart card reader and need to pick one, add a connection to [`config.toml`](../../core/config/readers.md#readersconnect) with the reader's name as the `path`:

```toml
[[readers.connect]]
driver = "ccid"
path = "Reader name"
```

The `path` is the reader's PC/SC name on Windows and on Linux with `pcscd`, and a USB port such as `usb:1-1.2:0` elsewhere. Both appear as `path=` on the `ccid: found smart card reader` line in the [log](../../core/tui.md#logs).

## Other readers

Other USB smart card readers with an NFC slot might work too. Core tries one the first time you hold an NFC tag to it, and leaves contact card slots and security keys alone.

A reader that beeps or lights up when you present a tag is doing that on its own. It does not mean Core has found it.

### Get an untested reader supported

If an untested reader does not scan, Core writes what is needed to add support for it to the log. It logs the reader as soon as it sees it, and the tag details once a tag has been held to it, so follow these steps in order:

1. Plug the reader into the device running Core with a USB cable. If you set `auto_detect = false` in `config.toml`, globally or under `[readers.drivers.ccid]` or `[readers.drivers.acr122pcsc]`, change it back to `true` and restart Core.
2. Hold a Zaparoo card or other NFC tag flat on **the new reader** for about five seconds. A tag on your phone or on another reader does not count.
3. Upload the log right away, without restarting Core or unplugging anything:
   - **Windows:** open the Zaparoo tray menu and select **Upload Log**.
   - **MiSTer and other platforms:** open the [terminal UI](../../core/tui.md#logs) and select **Settings > Logs**, then upload. You can also run [`zaparoo -upload-log`](../../core/cli.md#upload-the-log).
4. Post the link it gives you in the [Zaparoo Discord](https://zaparoo.org/discord) or a [GitHub issue](https://github.com/ZaparooProject/zaparoo-core/issues), with the reader's make and model and a link to where you bought it.

You do not need to turn on debug logging. If the log has no line containing `ccid: found`, Core did not see a smart card reader at all, and the reader is likely a different kind of device, such as one that types the card number like a keyboard.

<SponsorCallout variant="sponsor" />
