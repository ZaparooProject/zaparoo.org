# Web UI

Every copy of Zaparoo Core ships with a web build of the [Zaparoo App](/docs/app/) which can used locally on your own network through a web browser.

The web build is generally the same as the full app, but is missing features like direct NFC and camera support. When you use the web UI to read and write tags, it will use an NFC reader connected directly to the host device.

## Accessing the Web UI

To access the web UI, you need to know the IP address of the machine running Zaparoo Core. You can usually find this from Zaparoo itself.

Once you have your IP address, you can access the web UI by opening a web browser and navigating to `http://<ip>:7497/app/`.

For example, if your IP address is `192.168.1.100`, go to `http://192.168.1.100:7497/app/`.
