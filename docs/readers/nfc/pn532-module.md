---
description: Use a raw PN532 NFC module with Zaparoo over USB UART or I2C. Covers wiring, config, and troubleshooting for DIY builds.
keywords: [pn532 module, pn532 uart, pn532 i2c, diy nfc reader zaparoo, pn532 wiring]
---

# PN532 Module

<img className="docHeroImage" src="/img/docs/readers/PN532-module.jpg" alt="Standalone PN532 NFC module" width="300" />

The PN532 Module is a bare NFC reader board for custom builds. It can scan and write supported [NFC tags](../../tokens/nfc/index.md) through Zaparoo. Use it when you want to mount a reader inside a case, wire it into another device, or connect it directly to a board that exposes UART or I2C.

If you only want a reader you can plug in and use, choose the [PN532 USB](./pn532-usb.md) instead.

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

:::warning DIY hardware
This is not a finished USB reader. Expect wiring, soldering, and some troubleshooting.
:::

For a complete photographed build with a case and custom serial PCB, see the [DIY Reader](../../community-projects/diy-reader.md) community project. That guide shows the soldering, board assembly, and case fitment, and the custom serial PCB avoids the form factor and voltage issues found with some generic USB-to-serial adapters.

:::caution Clone quality
Many PN532 modules sold online are clones. They can work with Zaparoo, but read range and board quality vary by seller and revision.
:::

## What you need

For the usual USB UART setup, you need:

1. A PN532 module.
2. A USB-to-serial adapter, such as a CH340, CP2102, or FT232RL board.
3. Wires or pin headers.
4. Basic soldering tools.

## Wire the module

UART is the most practical connection for a Zaparoo host because it appears as a normal serial port.

Most modules ship with the DIP switches already set to HSU, which is the UART mode used for USB-to-serial adapters. Check the switch labels before wiring the module.

For HSU/UART wiring, use the labels on your PN532 board and USB-to-serial adapter:

1. Connect `GND` on the PN532 module to `GND` on the adapter.
2. Connect `TX` or `TXD` on the PN532 module to `RX` or `RXD` on the adapter.
3. Connect `RX` or `RXD` on the PN532 module to `TX` or `TXD` on the adapter.
4. Connect `VCC` to a voltage your PN532 module supports.

Check the markings on your module before connecting power. Some boards accept both 3.3V and 5V; others are stricter.

## Configure the reader

[Zaparoo Core](../../core/index.md) can auto-detect PN532 UART readers by default. If auto-detection does not find the module, add it to your [`config.toml`](../../core/config.md) with the `pn532uart` driver.

Linux-based platforms usually expose the USB-to-serial adapter as `/dev/ttyUSB0` or `/dev/ttyACM0`:

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

## I2C

Direct I2C connections are for embedded setups, such as a Raspberry Pi-style board with an exposed I2C bus. I2C is supported, but it does not auto-detect. You must add the reader to `config.toml`.

Set the module to I2C mode and configure the bus device:

```toml
[[readers.connect]]
driver = "pn532i2c"
path = "/dev/i2c-1"
```

## Troubleshooting

### Module not detected

Check these first:

1. `TX` on the module goes to `RX` on the adapter, and `RX` goes to `TX`.
2. The DIP switches match the configured transport: HSU/UART or I2C.
3. The module has stable power. If you are using a generic USB-to-serial adapter and the reader is unreliable, compare it with the DIY Reader build that uses a custom serial PCB.
4. For UART, the USB-to-serial adapter appears as a device path or COM port.
5. For I2C, the `path` in `config.toml` matches the I2C device you connected the module to.

### Scans are unreliable

Move the module away from metal, dense wiring, and other electronics. If the tag only reads at very close range, the module may be a low-quality clone.

### Writing fails

Keep the tag still on the reader while writing. If writing [MIFARE Classic](../../tokens/nfc/mifare.md) tags fails repeatedly, test with an [NTAG](../../tokens/nfc/ntag.md) tag before replacing the reader.

## Where to buy

For a ready-to-use reader, use the PN532 USB page instead.

Original hardware:

- <ProductLink href="https://www.elechouse.com/product/pn532-nfc-rfid-module-v4/" store="elechouse">Elechouse</ProductLink> - Official PN532 module

Other modules are usually listed as `PN532 Module`:

- Amazon
- eBay
- AliExpress
- Local electronics shops

Known listings submitted by users:

- <ProductLink href="https://www.aliexpress.com/item/1005002755983375.html" store="aliexpress">AliExpress (China) - JIAQISHENG JQS Official Store</ProductLink>
- <ProductLink href="https://www.aliexpress.com/item/1005005973913526.html" store="aliexpress">AliExpress (China) - TENSTAR ROBOT Store</ProductLink>
