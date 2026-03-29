---
title: "ESP32 S3 Default GPIO Pins"
---

## PN532 Module  
(Check your ESP32's default I2C pins as the code uses them by default)  
SDA            8  
SCL            9  
RSTPDN         36  

## SDCARD or RC522 Module  
(Check your ESP32's default vspi pins as the code uses them by default)  
SDA            10  
SCK            12  
MOSI           11  
MISO           13  
RST            4  
  
## LED's       (Configurable in Web UI)
WIFI           2 (This is normally replicates the cards wifi led, but it may be a different gpio on your esp32)  
PWR            37  
Launch         39  
  
## Rumble Motor (Configurable in Web UI)  
Motor          35  
  
## Audio MAX98357 Module (Configurable in Web UI)  
DOUT           17  
BCLK           16  
LRC            15  
