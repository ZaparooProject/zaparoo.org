# QR Codes

QR codes can be used as tokens for Zaparoo, just like an NFC tag. There are a couple of ways to do it, but essentially it's done by embedding ZapScript in a QR code which will be parsed and launched by Zaparoo when scanned. 

## QR Code Generator

Use the generator below to create QR codes with your ZapScript:

<QRCodeGenerator />

You can also use any standard [QR code generator](https://httpbin.dmuth.org/qrcode/), just paste some ZapScript into the text field of the generator. **Make sure link tracking is disabled in the generator if it supports that.**

## Zaparoo App

The [Zaparoo app](https://zaparoo.app) has native support for scanning and launching QR codes using the Pro version. This is the most reliable way to use QR codes, as it doesn't rely on the host device having a static IP address. The app supports parsing standalone ZapScript in a QR code.

### Examples

#### Launch a random Genesis game

```
**launch.random:genesis
```

#### Exit to the menu

```
**launch.system:menu
```

#### Launch Metal Slug for Neo Geo

```
NeoGeo/mslug.zip
```

## Phone Camera

Your phone's camera can also be used, by adding some extra text before the ZapScript using the Zaparoo API. Do the same as above, but with the following text format:

```
http://<IP ADDRESS>:7497:/l/<ZAPSCRIPT>
```

Replace `<IP ADDRESS>` with your host device's IP address and `<ZAPSCRIPT>` with whatever ZapScript you want to launch. When your phone scans this QR code, it will automatically browse to that URL which hits the API and runs the ZapScript.

:::warning
If your host device's IP address ever changes, you will need to change all the QR codes too.
:::

### Examples

#### Launch a random Genesis game

```
http://192.168.0.123:7497:/l/**launch.random:genesis
```

#### Exit to the menu

```
http://192.168.0.123:7497:/l/**launch.system:menu
```

#### Launch Metal Slug for Neo Geo

```
http://192.168.0.123:7497:/l/NeoGeo/mslug.zip
```
