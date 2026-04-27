---
description: Set up the PN532 USB NFC reader with Zaparoo. Covers auto-detection, manual config, serial ports, and troubleshooting.
keywords: [pn532 usb, zaparoo nfc reader, pn532 type-c, nfc reader mister fpga]
---

# PN532 USB

<img className="docHeroImage" src="/img/docs/readers/PN532-Type-C.jpg" alt="A PN532 USB-C module" width="300" />

The PN532 USB is the ready-to-use NFC reader option for Zaparoo. It connects over USB serial, scans supported [NFC tags](../../tokens/nfc/index.md) and cards, and can write tokens through Zaparoo.

:::tip
This is the reader stocked in the [Zaparoo Shop](https://shop.zaparoo.com/). Official hardware purchases support development.
:::

## Platforms

<PlatformSupport
  groups={[
    {
      name: "Base OS",
      platforms: [
        { name: "Windows", href: "../../platforms/windows/", support: "supported" },
        { name: "macOS", href: "../../platforms/mac", support: "supported" },
        { name: "Linux", href: "../../platforms/linux/", support: "supported" },
      ],
    },
    {
      name: "FPGA",
      platforms: [
        { name: "MiSTer", href: "../../platforms/mister/", support: "supported" },
        { name: "MiSTeX", href: "../../platforms/mistex", support: "supported" },
      ],
    },
    {
      name: "Retro Gaming OS",
      platforms: [
        { name: "Batocera", href: "../../platforms/batocera/", support: "supported" },
        { name: "ReplayOS", href: "../../platforms/replayos", support: "supported" },
        { name: "Recalbox", href: "../../platforms/recalbox", support: "supported" },
      ],
    },
    {
      name: "Handheld and Gaming Linux",
      platforms: [
        { name: "SteamOS", href: "../../platforms/steamos", support: "supported" },
        { name: "Bazzite", href: "../../platforms/bazzite", support: "supported" },
        { name: "ChimeraOS", href: "../../platforms/chimeraos", support: "supported" },
      ],
    },
    {
      name: "Media Center",
      platforms: [
        { name: "LibreELEC", href: "../../platforms/libreelec", support: "supported" },
      ],
    },
    {
      name: "Other Hardware",
      platforms: [
        { name: "Commodore 64", href: "../../platforms/commodore64", support: "limited", note: "Via TeensyROM, not Zaparoo Core." },
      ],
    },
  ]}
/>

## Configure the reader

[Zaparoo Core](../../core/index.md) auto-detects PN532 USB readers by default. In most setups, connect the reader to a normal USB port, start Core, and scan a tag.

If auto-detection does not find it, add the serial port to your [`config.toml`](../../core/config.md). Use the `pn532uart` driver for USB serial modules.

Use the serial device or COM port assigned by your operating system.

Linux-based platforms usually expose the reader as `/dev/ttyUSB0` or `/dev/ttyACM0`:

```toml
[[readers.connect]]
driver = "pn532uart"
path = "/dev/ttyUSB0"
```

On Windows, use the COM port shown in [Device Manager](https://www.lifewire.com/device-manager-2625860):

```toml
[[readers.connect]]
driver = "pn532uart"
path = "COM3"
```

On macOS, use the matching `/dev/cu.*` device:

```toml
[[readers.connect]]
driver = "pn532uart"
path = "/dev/cu.usbserial-1234"
```

## Platform notes

### MiSTer

On [MiSTer](../../platforms/mister/index.md), use one of the normal USB ports. The SNAC/USER port looks like USB, but it is not a standard USB port and will not work for NFC readers.

### Windows

PN532 USB readers use a USB serial driver on Windows. If Windows does not create a COM port for the reader, install or reinstall the driver.

:::info CH340 Driver Installation
You can download the [CH340 driver (ZIP)](https://zaparoo.org/drivers/Windows-CH340-Driver.zip) or [CH340 driver (EXE)](https://zaparoo.org/drivers/CH341SER.EXE). The [SparkFun CH340 installation guide](https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers/all) has driver install steps if you need them.
:::

### Linux-based platforms

Desktop Linux users may need to add their account to the `dialout` group before Core can open the serial port:

```bash
sudo usermod -a -G dialout $USER
```

Log out and back in after changing groups.

### macOS

The PN532 USB reader is supported on macOS. If auto-detection fails, configure the `/dev/cu.*` serial device manually.

## Troubleshooting

### Reader not detected

Check these first:

1. Use a USB cable that supports data, not a charge-only cable.
2. Try a different normal USB port. On MiSTer, do not use the SNAC/USER port.
3. Check that the reader appears as a serial device or COM port.
4. On Linux-based platforms, check serial port permissions.
5. On Windows, install or reinstall the [CH340 driver](#windows) if no COM port appears.
6. Enable `debug_logging = true` in `config.toml`, restart Core, and check the logs for PN532 detection attempts.

### Slow or inconsistent scanning

Keep the reader away from metal surfaces and other electronics. If it is connected through a hub, test it directly on the host device.

## Where to buy

:::tip Official Support
Buying from the <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink> directly supports the project and includes a case.
:::

Original hardware:

- [Elechouse](https://www.elechouse.com/product/pn532-nfc-usb-module/) - Official PN532 USB module

Other modules are usually listed as `PN532 Type C` or `PCR532`:

- <ProductLink href="https://www.aliexpress.us/item/1005006326438326.html" store="aliexpress">AliExpress (China) - Allinbest Store</ProductLink>
- <ProductLink href="https://www.aliexpress.com/item/1005005262748046.html" store="aliexpress">AliExpress (China) - MI YU KOUNG Official Store</ProductLink>
<SponsorCallout variant="sponsor" />
