---
title: "Flashing the ESP32"
---

## If you haven't already got Arduino Studio setup and configured for ESP32's then follow these [steps](../Arduino-Studio-Setup).  

## The following Libraries will need to be installed from within the Libraries Manager of Arduino Studio:  
* ESP8266Audio  (2.0.0)
* ArdunioJSON (7.3.0)
* Preferences (2.1.0)
* ArduinoWebSockets (0.5.4)
* ESP Async WebServer by ESP32Async (3.7.0) Note: **DO NOT** use ESPAsyncWebSerer by lacamera, which is a older fork
* UUID (0.1.6)
* ESPWebFileManager (2.1.0)

## These additional libraries will need to be downloaded and installed manually:  
* [Zaparoo-esp32-launch-api](https://github.com/ZaparooProject/zaparoo-esp32-launch-api) (latest)
* [AsyncTCP](https://github.com/ESP32Async/AsyncTCP) (1.1.4) Note: The one listed in the library manager is an older fork and will cause issues

### PN532 Module Only:  
* [PN532 & NDEF](https://github.com/MintyTrebor/PN532)  
### RC522 Module Only:  
* [NDEF](https://github.com/TheNitek/NDEF)
* [MFRC522](https://github.com/MintyTrebor/rfid)  
  
## Download the Project & Prepare to Flash
1. Clone/Download this repository and extract all the files into a folder of your choice.  
  Open `<your folder>/ZaparooEsp32/ZaparooEsp32.ino` in Arunido Studio.  
2. Edit the ZaparooEsp32.hpp file to set your RFID module type, & additional default GPIO Pin options.  
3. Make sure your "Partition Scheme" under tools is set to "No OTA(2MB APP/xMB SPIFFS)". xMB will vary based on your board, but 2MB is common.  
4. [Optional] If you are planning to use a battery to power the ESP32, it might help to extend battery life by decreasing the CPU frequency under tools. If using the audio configuration, you need a min cpu of 160mhz.  

### !Important! - If you are updating ZapEsp32 from a previous version, ensure you have turned off "erase all flash before sketch upload" in tools to preserve your preferences.

You can now compile and upload the project to the ESP32.

[NEXT - WiFi Setup](../WiFi-Setup)