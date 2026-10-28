---
sidebar_position: 3
slug: acr122u
description: Set up the ACR122U NFC reader with Zaparoo. Covers platform support, clone compatibility, the ccid driver, manual configuration, and Windows troubleshooting.
keywords: [acr122u zaparoo, acr122u mister fpga, acr122u libnfc, acr122u linux, nfc reader setup]
---

# ACR122U

<img className="docHeroImage" src="/img/docs/readers/ACR122U-NFC-reader.jpg" alt="An ACR122U NFC reader" width="300" />

The ACR122U, also sold as ACR122, is a USB NFC reader in a finished case with a built-in cable, status LED, and beeper. It can scan supported Zaparoo [NFC tags](../../tokens/nfc/index.md) and cards, but it has more compatibility caveats than the [PN532 USB](./pn532-usb.md).

Core talks to it through the `ccid` driver, which supports USB smart card readers with a contactless slot. The same driver handles the [ACS ACR1552U, Feitian bR500, and other USB smart card readers](./usb-smart-card-readers.md).

:::warning Before you buy
If you're buying your first reader, a [PN532 USB](./pn532-usb.md) is a safer choice. It avoids the ACR122U clone compatibility issues described below. The <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink> stocks official PN532 readers that support the project.
:::

:::info
The ACR122U is no longer produced by its original designer [ACS](https://www.acs.com.hk/en/), so new listings are usually clone hardware. Internal differences between clones can affect Zaparoo compatibility, and they are not always visible from the listing.
:::

## Platforms

<PlatformSupport readerId="acr122u" />

## Configure the reader

The `ccid` driver is enabled and auto-detects the ACR122U when you plug it in, so most setups need no configuration. It can read and write [NTAG](../../tokens/nfc/index.md) and [MIFARE Classic](../../tokens/nfc/mifare.md) tags.

On Windows and on Linux systems running the PC/SC service (`pcscd`), Core goes through that service. Elsewhere, such as on MiSTer, it talks to the reader over USB directly, so no extra software is needed. On desktop Linux and SteamOS, that needs the udev rule from Core's hardware support; see [Linux](../../platforms/linux/index.md#troubleshooting) or [SteamOS](../../platforms/steamos/index.md#an-nfc-reader-is-not-detected) if the reader does not scan.

### Manual configuration

If you have more than one smart card reader and need to pick one, add a connection with the reader's name as the `path`:

```toml
[[readers.connect]]
driver = "ccid"
path = "ACS ACR122 0"
```

The `path` is the reader's PC/SC name on Windows and on Linux with `pcscd`, and a USB port such as `usb:1-1.2:0` elsewhere. Both appear as `path=` on the `ccid: found smart card reader` line in the [log](../../core/tui.md#logs). Connections written for the old `acr122pcsc` driver still work.

### libnfc driver

The older `libnfcacr122` driver is still available on Linux-based platforms. It is enabled but does not search for the reader unless you turn on auto-detect for it in [`config.toml`](../../core/config/readers.md#readers-drivers-auto-detect). Turn off the `ccid` driver at the same time, or it takes the reader first:

```toml
[readers.drivers.libnfcacr122]
auto_detect = true

[readers.drivers.ccid]
enabled = false
```

Use it only if the `ccid` driver cannot read your reader. Its LED and beeper do not react when scanning a card.

## Windows

On Windows, the reader should appear under **Smart card readers** in Device Manager. The LED usually lights red and flashes green when a card is scanned. The reader may also beep on scan.

### Troubleshooting

If Windows does not detect the reader, check these items:

<img src="/img/docs/readers/Windows-smart-card-services.png" alt="Windows Services Manager example" width="400" />

Enable the Smart Card Plug and Play service via regedit:

| Description    | Value                                     |
| -------------- | ----------------------------------------- |
| Registry Hive  | HKEY_LOCAL_MACHINE                        |
| Registry Path  | SOFTWARE\Policies\Microsoft\Windows\ScPnP |
| Value Name     | EnableScPnP                               |
| Value Type     | REG_DWORD                                 |
| Enabled Value  | 1                                         |
| Disabled Value | 0                                         |

Install the [official ACS ACR122U driver](https://www.acs.com.hk/en/driver/3/acr122u-usb-nfc-reader/). You can confirm it is working when **ACR122 Smart Card Reader** appears in the **Smart card readers** section of Device Manager.

<img src="/img/docs/readers/ACR122U-device-manager-example.png" alt="Windows Device Manager example" width="300" />

Make sure **Smart Card** and **Smart Card Device Enumeration** are running in the [Services Manager](https://www.thewindowsclub.com/open-windows-services). Their startup types should be **Automatic** and **Automatic (Trigger Start)**.

Reboot Windows after changing drivers, registry values, or services.

## Where to buy

The ACR122U can be found by searching for "ACR122U" on sites like Amazon, eBay and AliExpress.

:::warning
Please be aware there's still a risk of receiving an incompatible variant even from these listings.
:::

These are some known working listings submitted by users:

- <ProductLink href="https://www.amazon.com/dp/B00GYPIZG6/" store="amazon">Amazon (US) - Yosoo Store</ProductLink>
- <ProductLink href="https://www.amazon.com/dp/B07KRKPWYC" store="amazon">Amazon (US) - ACS Store</ProductLink>
- <ProductLink href="https://www.kogan.com/au/buy/zoestore-kkmoon-nfc-acr122u-rfid-contactless-smart-reader-writerusb-sdk-c-card-d8a0-h10391/" store="kogan">Kogan (Australia)</ProductLink>
- [Everything ID (Australia)](https://www.everythingid.com.au/rfid-equipment-c-13/acr122u-usb-nfc-rfid-card-reader-writer-mifare-nfc-p-324)
- <ProductLink href="https://www.aliexpress.us/item/2251832554165448.html" store="aliexpress">AliExpress (China) - 5YOA Official Store</ProductLink>

<SponsorCallout variant="sponsor" />
