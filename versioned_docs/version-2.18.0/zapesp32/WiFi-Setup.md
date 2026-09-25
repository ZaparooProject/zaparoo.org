---
title: "WiFi Setup"
---

ZapEsp32 will create an Access Point after the initial flash to enable the setup of your wifi credentials (or if the wifi connection fails).  
Look for a WiFi SSID of `zapesp32` in your WiFi network manager and connect to the AP using `zapesp32` as the password.  
Once connected to the AP type `http://zapesp.local` into your browser to access the Web UI.  
  
![Wifi Setup](https://raw.githubusercontent.com/ZaparooProject/zaparoo-esp32/main/wikires/WebUI_WiFi.png)
  
Click the **`WiFi`** item in the top right of the window, and enter your WiFi network credentials. Click save to continue.  
  
ZapEsp32 will now reboot and attempt to connect to your wifi network. If successful you should be able to reload `http://zapesp.local` in your browser to access the Web UI. If the connection fails the zapesp32 SSID will be available for you to connect & re-enter your WiFi credentials again.  
  
Note: Your WiFi network may not support the mDNS protocol that enables the `http://zapesp.local` url. If the device is connected to you WiFi and you cannot access the `http://zapesp.local` url, launch the Arduino Studio and enable Serial Monitor with a baud of 115200. When you connect the ZapEsp32 to your computer Arduino Studio will show the IP address of the ZapEsp32, and you can access the Web UI by typing that IP into your browser.  
  
[NEXT - ZapEsp32 Configuration](../ZapEsp32-Configuration)