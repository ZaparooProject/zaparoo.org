---
title: "ESP32 Default GPIO Pins"
---

## PN532 Module  
(Check your ESP32's default I2C pins as the code uses them by default)  
SDA            21  
SCL            22  
RSTPDN         13  

## SDCARD or RC522 Module  
(Check your ESP32's default vspi pins as the code uses them by default)  
SDA            5  
SCK            18  
MOSI           23  
MISO           19  
RST            4  
  
## LED's       (Configurable in Web UI)
WIFI           2 (This is normally replicates the cards wifi led, but it may be a different gpio on your esp32)  
PWR            15  
Launch         33  
  
## Rumble Motor (Configurable in Web UI)  
Motor          32  
  
## Audio MAX98357 Module (Configurable in Web UI)  
DOUT           25  
BCLK           27  
LRC            26  
 