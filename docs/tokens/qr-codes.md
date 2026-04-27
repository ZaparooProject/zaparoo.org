---
description: "Create and use QR codes as Zaparoo tokens: embed ZapScript in a QR code and scan it with the Zaparoo App, a serial scanner, or a phone camera."
keywords: [zaparoo qr codes, qr code game launcher, zapscript qr code, zaparoo app qr]
---

# QR Codes

QR codes can be used as Zaparoo tokens, just like an [NFC tag](./nfc/index.md). A QR code can store [ZapScript](../zapscript/index.md) directly, and Zaparoo runs that ZapScript when the code is scanned.

## QR code generator

Use the generator below to create QR codes with your ZapScript:

<QRCodeGenerator />

You can also use a standard [QR code generator](https://httpbin.dmuth.org/qrcode/). Paste the ZapScript into the generator's text field and disable link tracking if the generator offers it.

## Zaparoo App

The [Zaparoo App](../app/index.md) can scan QR codes with your phone's camera. If Pro Launch on scan is enabled, the app sends the scanned ZapScript to Zaparoo Core over WiFi. This avoids hard-coding your Core device's IP address into every QR code.

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

Remote launch requests also need to be allowed by Core's `allow_launch` config setting. If you do not want to enable remote launch URLs, use the Zaparoo App scanning option instead.
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
