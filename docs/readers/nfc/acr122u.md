---
sidebar_position: 1
slug: acr122u
description: Set up the ACR122U NFC reader with Zaparoo. Covers platform support, clone compatibility, Windows PC/SC, Linux libnfc, and troubleshooting.
keywords: [acr122u zaparoo, acr122u mister fpga, acr122u libnfc, acr122u linux, nfc reader setup]
---

# ACR122U

<img className="readerHeroImage" src="/img/docs/readers/ACR122U-NFC-reader.jpg" alt="An ACR122U NFC reader" width="300" />

The ACR122U, also sold as ACR122, is a USB NFC reader in a finished case with a built-in cable, status LED, and beeper. It can scan supported Zaparoo [NFC tags](../../tokens/nfc/index.md) and cards, but it has more compatibility caveats than the [PN532 USB](./pn532-usb.md).

Internally it uses a PN532 NFC chip, but the host device does not talk to that chip the same way it talks to PN532 USB modules. Zaparoo uses different ACR122U drivers depending on the platform.

:::warning Before you buy
If you're buying your first reader, a [PN532 USB](./pn532-usb.md) is a safer choice. It avoids the ACR122U clone compatibility issues described below. The [Zaparoo Shop](https://shop.zaparoo.com/) stocks official PN532 readers that support the project.
:::

:::info
The ACR122U is no longer produced by its original designer [ACS](https://www.acs.com.hk/en/), so new listings are usually clone hardware. Internal differences between clones can affect Zaparoo compatibility, and they are not always visible from the listing. Some clones only work through [PC/SC](https://pcscworkgroup.com/specifications/), which means they may work on Windows but fail on Linux-based Zaparoo platforms where [Zaparoo Core](../../core/index.md) uses [libnfc](https://github.com/nfc-tools/libnfc) for this reader.
:::

## Platforms

:::warning Linux-based platforms
Zaparoo uses the libnfc ACR122U driver on Linux-based platforms. [NTAG](../../tokens/nfc/ntag.md) read/write support works, but [MIFARE Classic](../../tokens/nfc/mifare.md) write support is limited and some MIFARE cards may need manual formatting or may not work. The reader LED and beeper also do not work with this driver, and some clone variants are incompatible.
:::

<PlatformSupport
  groups={[
    {
      name: "Base OS",
      platforms: [
        { name: "Windows", href: "../../platforms/windows/", support: "limited", note: "Scanning works through PC/SC. Writing tags through Zaparoo is not supported." },
        { name: "macOS", href: "../../platforms/mac", support: "unsupported", note: "Not included in the current macOS Core reader set." },
        { name: "Linux", href: "../../platforms/linux/", support: "limited" },
      ],
    },
    {
      name: "FPGA",
      platforms: [
        { name: "MiSTer", href: "../../platforms/mister/", support: "limited" },
        { name: "MiSTeX", href: "../../platforms/mistex", support: "limited" },
      ],
    },
    {
      name: "Retro Gaming OS",
      platforms: [
        { name: "Batocera", href: "../../platforms/batocera/", support: "limited" },
        { name: "ReplayOS", href: "../../platforms/replayos", support: "limited" },
        { name: "Recalbox", href: "../../platforms/recalbox", support: "limited" },
      ],
    },
    {
      name: "Handheld and Gaming Linux",
      platforms: [
        { name: "SteamOS", href: "../../platforms/steamos", support: "limited" },
        { name: "Bazzite", href: "../../platforms/bazzite", support: "limited" },
        { name: "ChimeraOS", href: "../../platforms/chimeraos", support: "limited" },
      ],
    },
    {
      name: "Media Center",
      platforms: [
        { name: "LibreELEC", href: "../../platforms/libreelec", support: "limited" },
      ],
    },
  ]}
/>

## Configure the reader

Zaparoo Core auto-detects supported ACR122U readers by default.

On Linux-based platforms, Core uses the `libnfcacr122` driver. This does not need a PC/SC daemon, but some clone variants are incompatible. With the libnfc driver, it is normal for the reader LED and beeper not to react when scanning a card.

On Windows, Core uses the `acr122pcsc` driver through PC/SC. This can scan tags, but writing tags through Zaparoo is not supported with this driver.

### Manual configuration

Auto-detection should work on supported platforms, but if auto-detection fails or you need to specify a particular reader, you can manually configure it.

On Windows, the `path` must match the PC/SC reader name:

```toml
[[readers.connect]]
driver = "acr122pcsc"
path = "ACS ACR122 0"
```

To find the PC/SC reader name, check [Device Manager](https://www.lifewire.com/device-manager-2625860) under **Smart card readers**.

## Linux-based platforms

An ACR122U on Linux-based platforms should be detected automatically unless `auto_detect` is disabled in [`config.toml`](../../core/config.md). If the reader is detected but the LED and beeper do not react, that is expected with the libnfc driver.

If the reader lights up or beeps but Core does not detect scans, it may be a clone that only works through PC/SC.

## Windows

On Windows, the reader should appear under **Smart card readers** in Device Manager. The LED usually lights red and flashes green when a card is scanned. The reader may also beep on scan.

The Windows PC/SC driver can scan tags, but it cannot write tags through Zaparoo. If you want to write tags from Zaparoo, use a [PN532 USB](./pn532-usb.md) or the [Zaparoo App](../../app/index.md) instead.

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
- [Kogan (Australia)](https://www.kogan.com/au/buy/zoestore-kkmoon-nfc-acr122u-rfid-contactless-smart-reader-writerusb-sdk-c-card-d8a0-h10391/)
- [Everything ID (Australia)](https://www.everythingid.com.au/rfid-equipment-c-13/acr122u-usb-nfc-rfid-card-reader-writer-mifare-nfc-p-324)
- <ProductLink href="https://www.aliexpress.us/item/2251832554165448.html" store="aliexpress">AliExpress (China) - 5YOA Official Store</ProductLink>
<SponsorCallout variant="sponsor" />
