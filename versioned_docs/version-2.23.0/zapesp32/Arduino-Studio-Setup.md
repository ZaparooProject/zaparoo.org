---
title: "Arduino Studio Setup"
---

1. If you haven't already, download and install Arduino Studio.  
2. Select your board and port, located in the Tools menu. If you do not have options for an Esp32, follow these [instructions](https://docs.sunfounder.com/projects/umsk/en/latest/03_esp32/esp32_start/03_install_esp32.html) for installing the board configurations.  
3. Make sure your "Partition Scheme" under tools is set to "No OTA(2MB APP/xMB SPIFFS)". xMB will vary based on your board, but 2MB is common. 
4. Install the libraries and follow the steps in this [page](../Flashing-the-ESP32)


If you plan on modifying the web ui, set [this page](../Web-Development-Setup) for the setup documentation for visual studio code.