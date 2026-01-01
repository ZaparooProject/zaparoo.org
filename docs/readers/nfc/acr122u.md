---
sidebar_position: 1
slug: acr122u
---

# ACR122U

<img src="/img/docs/readers/ACR122U-NFC-reader.jpg" alt="An ACR122U NFC reader" width="300" />

The ACR122U (also called just ACR122) is the most commonly available consumer grade USB NFC reader. Internally it uses a PN532 NFC chip, but this chip is not exposed directly to the host device so it requires different drivers than other PN532-based readers. Its main method of communication is via a PCSC service, where it's usually plug and play. Its internal PCB is quite large with a fragile cable connection, which can make it difficult to incorporate in custom projects.

This reader is easily available on marketplace sites like Amazon, AliExpress, eBay and even from local smart card/security stores in your own country. It has a built in USB cable, an injection moulded case, internal speaker and external status LED (though compatibility of these varies between devices and platforms). It's fully compatible with NTAG and MIFARE Classic tags.

If you like the look and are willing to accept the risk of receiving an incompatible variant, it's a capable NFC reader for a decent price.

:::info

The ACR122U is no longer produced by its original designer [ACS](https://www.acs.com.hk/en/), so what you'll actually be buying is a hardware clone device. It's important to be aware that there can be differences internally between clones, which are impossible to tell without opening it up, and can affect compatibility with Zaparoo platforms. Some clones are incompatible with [MiSTer](../../platforms/mister/index.md) and will likely never be supported, which is why the project no longer recommends them.

:::

## Driver Configuration

The ACR122U uses **different drivers** depending on your platform. Zaparoo Core automatically selects the correct driver for your system.

### ACR122U (USB) - Linux & MiSTer

- **Driver ID**: `libnfcacr122`
- **Platforms**: Linux-based platforms (MiSTer, Batocera, SteamOS, etc.)
- **Compatibility**: Does **not** work on Windows or macOS
- **Library**: Uses libnfc
- **Enabled by default**: Yes
- **Auto-detect**: Yes

This driver provides direct USB communication via the libnfc library, which means:

- ✅ No need for PCSC daemon on Linux/MiSTer
- ✅ Auto-detection works well
- ❌ Some clone variants are incompatible
- ❌ LED and beeper may not work (normal behavior)

### ACR122U (PCSC) - Windows & macOS

- **Driver ID**: `acr122pcsc`
- **Platforms**: Windows, macOS
- **Compatibility**: Windows 10+, macOS 10.12+
- **Library**: Uses PC/SC (Personal Computer/Smart Card)
- **Enabled by default**: Yes
- **Auto-detect**: Yes

This driver uses the PC/SC interface, which means:

- ✅ Better compatibility with clone variants
- ✅ LED lights up and beeper works

Requires Smart Card services to be enabled (Windows) or already included in macOS.

### Manual Configuration

Auto-detection should work on all platforms, but if auto-detection fails or you need to specify a particular reader, you can manually configure it.

**Windows:**

```toml
[[readers.connect]]
driver = 'acr122pcsc'
path = 'ACS ACR122 0'  # Use actual reader name from PC/SC
```

To find the PC/SC reader name on Windows, check Device Manager under "Smart card readers".

## MiSTer

An ACR122U on [MiSTer](../../platforms/mister/index.md) is plug and play unless `auto_detect` is disabled in the Core config file. It's normal for the LED on the reader to **not** light up and for it to make **no** noise when scanning a card. If your reader lights up or makes noise, _it's a sign that it isn't compatible with MiSTer_.

Core on MiSTer uses a special libnfc driver to speak with the reader. Using this driver means a PCSC daemon is not required to be running, which is not shipped with a standard MiSTer OS. The downside is this driver can be a bit picky and will fail for some reader variants as mentioned above.

## Windows

The ACR122U should also be plug and play on the latest version of Windows. The reader's LED will light red and flash green when a card is scanned. The reader will also make a short beeping noise on scan.

### Troubleshooting

If your reader isn't being detected properly, try checking the below steps are done:

<img src="/img/docs/readers/Windows-smart-card-services.png" alt="Windows Services Manager example" width="400" />

- Enable the Smart Card Plug and Play service via regedit:

| Description    | Value                                     |
| -------------- | ----------------------------------------- |
| Registry Hive  | HKEY_LOCAL_MACHINE                        |
| Registry Path  | SOFTWARE\Policies\Microsoft\Windows\ScPnP |
| Value Name     | EnableScPnP                               |
| Value Type     | REG_DWORD                                 |
| Enabled Value  | 1                                         |
| Disabled Value | 0                                         |

- Install the [official ACS ACR122U driver](https://www.acs.com.hk/en/driver/3/acr122u-usb-nfc-reader/). You can confirm it's working if "ACR122 Smart Card Reader" is shown in the "Smart card readers" section of the [Device Manager](https://www.lifewire.com/device-manager-2625860).

<img src="/img/docs/readers/ACR122U-device-manager-example.png" alt="Windows Device Manager example" width="300" />

- Make sure the "Smart Card" and "Smart Card Device Enumeration" services are both running with the startup type set to "Automatic" and "Automatic (Trigger Start)" respectively in the [Services Manager](https://www.thewindowsclub.com/open-windows-services).

All of these steps will require a reboot before they take effect.

## Where To Buy

The ACR122U can be found by searching for "ACR122U" on sites like Amazon, eBay and AliExpress.

:::warning

Please be aware there's still a risk of receiving an incompatible variant even from these listings.

:::

These are some known working listings submitted by users:

- [Amazon (US) - Yosoo Store](https://www.amazon.com/dp/B00GYPIZG6/)
- [Amazon (US) - ACS Store](https://www.amazon.com/dp/B07KRKPWYC)
- [Kogan (Australia)](https://www.kogan.com/au/buy/zoestore-kkmoon-nfc-acr122u-rfid-contactless-smart-reader-writerusb-sdk-c-card-d8a0-h10391/)
- [Everything ID (Australia)](https://www.everythingid.com.au/rfid-equipment-c-13/acr122u-usb-nfc-rfid-card-reader-writer-mifare-nfc-p-324)
- [AliExpress (China) - 5YOA Official Store](https://www.aliexpress.us/item/2251832554165448.html)

