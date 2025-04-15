# Other

These NFC readers are currently confirmed to work with Zaparoo.

We currently recommend the [PN532 NFC USB Module - Type C](#pn532-nfc-usb-module---type-c) if you're looking for a cheap and no-solder NFC reader.

## PN532 NFC USB Module - Type C

<img src="/img/readers/PN532-Type-C.jpg" alt="A PN532 USB-C module" width="300" />

- Plug and play.
- Great price starting at around $5 USD.
- Has the same level of support as all other PN532 based readers.
- USB type C plug.
- Very small size.
- Does not come with a case, but fits in currently available community cases.

### Where To Buy

Can be bought directly from [Elechouse](https://www.elechouse.com/product/pn532-nfc-usb-module/).

Clones are also available on AliExpress by searching for "pn532 type c" or "pcr532".

- [AliExpress (China) - Allinbest Store](https://www.aliexpress.us/item/1005006326438326.html)
- [AliExpress (China) - MI YU KOUNG Official Store](https://www.aliexpress.com/item/1005005262748046.html)

## ACR122U

See the [ACR122U](/platforms/acr122u/) page for more information.

## PN532 Module

<img src="/img/readers/PN532-module.jpg" alt="Standalone PN532 NFC module" width="300" />

:::warning
The PN532 module is not a ready-to-use reader, it's a bare PCB module intended for custom projects. It can be used directly with Zaparoo via a USB to serial adapter.
:::

- Very cheap price, starting at around $3 USD.
- Small footprint and is great for custom projects.
- High quality modules have excellent short and long range reading (up to 5cm without interference).
- Plug and play when paired with a USB to serial adapter (UART).
- Has no case and will not function at all without additional components.
- Build quality can be very variable depending on vendor, resulting in non-functioning modules or poor read range.
- Requires soldering equipment (but is a great beginner project).

### Known Issues

Build quality and shipping of these modules can vary a lot between vendors. In general they are OK, but be cautious about choosing the cheapest possible option.

Some modules may use low quality inductors connecting the antenna. This can result in a module that appears to function fine, but has extremely poor read range. It is possible to replace the inductors with new ones that are to spec.

Not necessarily related to the module, but some USB to serial adapters can have poor quality voltage regulators, which are not good enough to power the module properly.

### Where To Buy

Can be bought directly from [Elechouse](https://www.elechouse.com/product/pn532-nfc-rfid-module-v4/).

The PN532 module is extremely common in the hobby electronics space and very easy to find. You can search for "PN532 module" on sites such as Amazon, eBay and AliExpress, or check out your local hobby electronics shops and websites.

- [AliExpress (China) - JIAQISHENG JQS Official Store](https://www.aliexpress.com/item/1005002755983375.html)
- [AliExpress (China) - TENSTAR ROBOT Store](https://www.aliexpress.com/item/1005005973913526.html)

## DIY Reader

<img src="/img/readers/DIY-Reader.jpg" alt="Zaparoo DIY Reader" width="300" />

The DIY NFC Reader is a Zaparoo community project aiming to offer a high quality and reliable reader at a low price, which is guaranteed to work with Zaparoo software.

- Can be built yourself with the [DIY NFC Reader Build Guide](/platforms/diy-reader/).
- Plug and play.
- Depending on vendor and batch size, comes at a very competitive price compared to [ACR122U](/platforms/acr122u/).
- Very small footprint with case.
- Used by other Zaparoo projects as a base.

Internally, this reader uses a [PN532](/platforms/pn532/) module and has all the same pros and cons associated with it. Having trusted vendors for this reader means none of the quality related issues with the module should be of concern.

See the [Vendors](/vendors/) page for where to buy it.
