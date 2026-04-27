---
description: "NFC tag types for Zaparoo: NTAG215, NTAG213, MIFARE Classic, and what to buy for game card collections."
keywords: [zaparoo nfc tags, ntag215 games, nfc cards zaparoo, rfid tags zaparoo]
---

# NFC Tags

NFC tags tell the reader and software what action to take. They **do not** contain games. They store a small piece of [ZapScript](../../zapscript/index.md), such as a game launch command.

Tags come in many form factors and standards. Cards, stickers, coins, and key fobs all work the same way, but the NFC standard affects compatibility with Zaparoo, phones, and reader hardware.

:::tip Recommended: NTAG215 NFC cards
NTAG215 has enough room for most Zaparoo tokens. NTAG213 can be too small for longer file paths or multiple ZapScript commands, but it works well when each tag only needs a short value such as a Title ID.
:::

## Writing NFC tags

The [Zaparoo App](../../app/index.md) can write Zaparoo commands to NTAG tags from NFC-capable iPhones and Android phones.

:::tip
The Zaparoo App's tag writing feature is free. Pro is only needed when the app acts as a reader using the phone's hardware sensors.
:::

## Where to buy

:::tip Official Support
Looking for pre-printed NFC cards? Get them from the <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink> which directly supports the project!
:::

NFC tags are available from Amazon, eBay, AliExpress, and specialist NFC suppliers. Search for the standard and form factor, such as `NTAG215 NFC card` or `NTAG213 NFC sticker`. If you're buying new tags for Zaparoo, search for `NTAG215` specifically so you don't accidentally buy [MIFARE Classic](./mifare.md) tags.

## Supported tag types

- [NTAG](./ntag.md) is the recommended standard for new Zaparoo NFC tags.
- [MIFARE Classic](./mifare.md) is supported in some setups, but has more compatibility limits.
