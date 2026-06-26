---
title: "ESP32 S2 Mini Default GPIO Pins"
---

## PN532 Module  
(Check your ESP32's default I2C pins as the code uses them by default)  
SDA            8  
SCL            9  
RSTPDN         12  

## SDCARD or RC522 Module  
(Check your ESP32's default vspi pins as the code uses them by default)  
SDA            34  
SCK            36  
MOSI           35  
MISO           34  
RST            4  
  
## LED's       (Configurable in Web UI)
WIFI           11 (This is normally replicates the cards wifi led, but it may be a different gpio on your esp32)  
PWR            6  
Launch         4  
  
## Rumble Motor (Configurable in Web UI)  
Motor          32  
  
## Audio MAX98357 Module (Configurable in Web UI)  
DOUT           17  
BCLK           16  
LRC            15  
