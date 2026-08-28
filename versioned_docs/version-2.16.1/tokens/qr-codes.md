---
sidebar_position: 3
description: "Create and use QR codes as Zaparoo tokens: embed ZapScript in a QR code and scan it with the Zaparoo App, a serial scanner, or a phone camera."
keywords: [zaparoo qr codes, qr code game launcher, zapscript qr code, zaparoo app qr]
---

# QR Codes

QR codes can be used as Zaparoo tokens, just like an [NFC tag](./nfc/index.md). A QR code can store [ZapScript](../zapscript/index.md) directly, and Zaparoo runs that ZapScript when the code is scanned.

<img src="/img/showcase/discord5.webp" alt="Zaparoo launch QR code printed beside a game entry in a book" width="500" loading="lazy" />

*Elphive added Zaparoo launch codes to a retro gaming book and shared the result in the [Showcase gallery](/showcase/).*

## QR code generator

Use the generator below to create QR codes with your ZapScript:

<QRCodeGenerator />

Any standard QR code generator also works. Paste the ZapScript into its text field and turn off link tracking if the generator offers it.

QR codes cost nothing to print. If you'd rather have durable cards, the <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink> stocks pre-printed NFC cards.

## Zaparoo App

The [Zaparoo App](../app/index.md) can scan QR codes with your phone's camera. If Launch on scan (Pro) is enabled, the app sends the scanned ZapScript to Zaparoo Core over WiFi. This avoids hard-coding your Core device's IP address into every QR code.

### Examples

#### Launch a random Genesis game

```zapscript
**launch.random:genesis
```

#### Exit to the menu

```zapscript
**launch.system:menu
```

#### Launch Metal Slug for Neo Geo

```zapscript
NeoGeo/mslug.zip
```

## Phone camera URL

You can also make a QR code that opens Zaparoo Core's [launch endpoint](../core/api/index.md#launch-endpoint) directly from a normal phone camera app. Use this format:

```text
http://<IP ADDRESS>:7497/run/<ZAPSCRIPT>
```

Replace `<IP ADDRESS>` with your Core device's IP address and `<ZAPSCRIPT>` with the ZapScript you want to run. When your phone opens the URL, Core treats it like a token scan.

:::warning
Phone-camera URLs depend on your Core device's IP address. If the IP address changes, you need to update the QR codes.

Remote launch requests also have to match a pattern in Core's [`allow_run`](../core/config.md#allow_run) setting in the `[service]` section of the config file. With no patterns set, every remote launch is refused. If you do not want to enable remote launch URLs, use the Zaparoo App scanning option instead.
:::

### Examples

#### Launch a random Genesis game

```text
http://192.168.0.123:7497/run/**launch.random:genesis
```

#### Exit to the menu

```text
http://192.168.0.123:7497/run/**launch.system:menu
```

#### Launch Metal Slug for Neo Geo

```text
http://192.168.0.123:7497/run/NeoGeo/mslug.zip
```
