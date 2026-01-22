---
title: "Build Info"
---

## ESP32 SOC
ZapEsp is built around the ESP32 SOC platform, which is cheap & commonly available in many iterations and forms. We have tested ZapEsp with the following versions of the SOC:  
* [ESP32](../ESP32-Default-GPIO-Pins) (Version Tested ESP32 Wroom V1 USB-C)
* [ESP32-S3](../ESP32%E2%80%90S3-Default-GPIO-Pins) (Version Tested ESP32-S3 Wroom N16R8)
* [ESP32-S2 Mini](../ESP32%E2%80%90S2-Mini-Default-GPIO-Pins) (Works - But not recommended due to poor wifi performance)

Each ESP version uses different GPIO pins to connect to the other component modules used in the project. We recommend you use the default pins for the SOC type you are using. Using pins other than the default pins for your ESP32 version will require you to alter the base code. Refer to your board manufacturers instructions to establish your ESP32 version's default pins for SPI & I2C. Follow the links above to see example default GPIO pins for the ESP32 devices above.  
  
## RFID Module  
Two RFID modules are supported:
* PN532 (Recommended)
* RC522  
  
The PN532 RFID module is preferred as the RC522 module prevents the use of a SDCard module. Without an SDCard module you will only have a tiny amount of storage space to hold audio files, preventing the use of game specific audio clips. If you do not intend to include audio in your build then the RC522 is an acceptable choice.  
  
## Case  
* Example 3d printable cases are included in the project files
  
![Simple Case](https://raw.githubusercontent.com/ZaparooProject/zaparoo-esp32/main/wikires/ZapEsp32_SimpleCase.png)  ![Case Insides](https://raw.githubusercontent.com/ZaparooProject/zaparoo-esp32/main/wikires/ZapEsp32_SimpleCase_Inside.png)
  
# Optional Components
## Audio
* Max98357 I2S 3W Audio Module (2.5-5.5V)  
* Speaker (4-8 Ohm) - [8 Ohm 15mmx24mm speaker is a good choice to use in the example 3d Printed Cases]  

## Storage
* Micro SD SPI Storage Module (3.3-5V) + SD Card (Tested 8gb and 16gb cards)

## LED's
* 3 x 2-Pin (3.3v) LED's each a different colour
* 3 x 220ohm resistors

## Vibration/Rumble Motor
* DC (1.5-5V) Vibrating Motor - Note: You will need to build a driving circuit to control the motor ([example guide](https://www.instructables.com/How-to-drive-a-DC-Motor-with-Transistor-Arduino-Tu/))


