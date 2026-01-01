# ZapESP32

ZapESP32 is an ESP32-based NFC reader with haptic and audio feedback designed for the Zaparoo project. It enables launching games via the [Zaparoo Core](../core/index.md) service on MiSTer and Steam over WiFi, with additional audio and rumble features. The device also supports launching games via [Simple Serial](../core/drivers.md) connection.

## Core Features

### NFC/RFID Reading

- **PN532 Module Support**: Full feature support including SD card compatibility
- **RC522 Module Support**: Alternative module (limited SD card compatibility)
- **Multiple Tag Types**: Works with NFC tags, cards, and read-only devices like Amiibos
- **Game Launch**: Direct integration with Zaparoo Core for game launching

### Audio System

- **Event-Based Audio**: Play audio files for card detected, game launched, and card removed events
- **Game-Specific Audio**: Configure unique launch and removal sounds per game/card
- **Default Sound Configuration**: Set fallback audio files for different event types
- **SD Card Storage**: Store large audio libraries with SD card module support
- **SPIFFS Storage**: Built-in flash storage for essential audio files

### Haptic Feedback

- **Vibration Motor Support**: Physical feedback for card detection and game launch events
- **Configurable Events**: Choose which events trigger haptic feedback
- **GPIO Configuration**: Flexible pin assignment for vibration motor control

### Visual Feedback

- **Multi-Color LEDs**: Three-color LED system for status indication
- **Event Status**: Visual confirmation of card detection, game launch, and errors
- **Network Status**: Connection status indicators

### Web Interface

- **Browser-Based Configuration**: Complete setup and management through web interface
- **File Manager**: Upload and manage audio files directly through the browser
- **Game Search**: Search for games and write them to NFC tags with extended information
- **Real-Time Updates**: Live status updates and configuration changes

## Hardware Requirements

### ESP32 Boards

ZapESP32 is built around the ESP32 platform and has been tested with several board variants:

- **ESP32**: ESP32 Wroom V1 USB-C
- **ESP32-S3**: ESP32-S3 Wroom N16R8 - Enhanced performance with more memory
- **ESP32-S2 Mini**: Works but has poor WiFi performance

:::tip
The ESP32 Wroom V1 USB-C offers the most stable performance for most builds.
:::

Each ESP32 variant uses different default GPIO pins. Using non-standard pins requires code modifications.

### RFID Modules

Two RFID reader modules are supported:

- **PN532**: Supports all features including SD card module compatibility
- **RC522**: Basic functionality, but prevents SD card module usage due to SPI conflicts

:::tip
The PN532 enables SD card storage for extensive audio libraries. The RC522 has SPI conflicts that prevent SD card usage.
:::

### Required Components

- **ESP32 Development Board**: One of the supported variants above
- **RFID Module**: PN532 or RC522 NFC/RFID reader
- **Power Supply**: USB power or battery pack
- **Breadboard/PCB**: For component connections
- **Jumper Wires**: For GPIO connections

### Optional Components

#### Audio System

- **Max98357 I2S Audio Module**: 2.5-5.5V, 3W output
- **Speaker**: 4-8 Ohm impedance (15mm×24mm recommended for 3D printed cases)
- **Audio Files**: MP3 format supported

#### Storage

- **Micro SD Module**: SPI-compatible, 3.3-5V
- **SD Card**: Tested with 8GB and 16GB cards

#### Visual Feedback

- **LEDs**: 3× two-pin LEDs in different colors (3.3V)
- **Resistors**: 3× 220Ω resistors for LED current limiting

#### Haptic Feedback

- **DC Vibration Motor**: 1.5-5V operating voltage
- **Motor Driver Circuit**: Transistor-based circuit for motor control

### 3D Printed Case

The project includes STL files for 3D printable cases:

- **Simple Case Design**: Compact form factor
- **Component Access**: Easy access to connectors and controls
- **Multiple Variants**: Different cases for ESP32 and ESP32-S2 Mini boards

## Getting Started

### Prerequisites

- **Zaparoo Core Service**: ZapESP32 requires a running Zaparoo Core service to connect to
- **Arduino IDE**: For flashing firmware to the ESP32
- **WiFi Network**: Required for connecting to Zaparoo Core service
- **NFC Tags/Cards**: For creating and testing game launches

### Step 1: Set Up Development Environment

1. **Install Arduino IDE**: Download and install the latest Arduino IDE
2. **Configure ESP32 Support**: Add ESP32 board support in Arduino IDE preferences
3. **Install Required Libraries** via Arduino Library Manager:

   - ESP8266Audio (2.0.0)
   - ArduinoJSON (7.3.0)
   - Preferences (2.1.0)
   - ArduinoWebSockets (0.5.4)
   - ESP Async WebServer by ESP32Async (3.7.0)
   - UUID (0.1.6)
   - ESPWebFileManager (2.1.0)

4. **Install Manual Libraries**:

   - [Zaparoo-esp32-launch-api](https://github.com/ZaparooProject/zaparoo-esp32-launch-api)
   - [AsyncTCP](https://github.com/ESP32Async/AsyncTCP) (1.1.4)

5. **RFID Module Libraries**:
   - **For PN532**: [PN532 & NDEF](https://github.com/ZaparooProject/PN532)
   - **For RC522**: [NDEF](https://github.com/TheNitek/NDEF) and MFRC522

### Step 2: Build and Flash

1. **Download Project**: Clone or download the [zaparoo-esp32](https://github.com/ZaparooProject/zaparoo-esp32) repository
2. **Open Project**: Load `ZaparooEsp32/ZaparooEsp32.ino` in Arduino IDE
3. **Configure Hardware**: Edit `ZaparooEsp32.hpp` to set your RFID module type and GPIO pins
4. **Set Partition Scheme**: Select "No OTA(2MB APP/xMB SPIFFS)" under Tools menu
5. **Optional**: Reduce CPU frequency for battery operation (minimum 160MHz for audio)
6. **Flash Firmware**: Compile and upload to your ESP32

**Important**: When updating firmware, disable "erase all flash before sketch upload" to preserve settings.

### Step 3: Initial Setup

1. **Power On**: Connect your ESP32 to power via USB or battery
2. **Connect to WiFi**: Look for `zapesp32` network and connect with password `zapesp32`
3. **Access Web Interface**: Navigate to `http://zapesp.local` in your browser
4. **Configure WiFi**: Click **WiFi** menu item and enter your network credentials
5. **Save and Reboot**: Click Save - the device will reboot and connect to your network

If `zapesp.local` doesn't work, check the serial monitor in Arduino IDE for the device's IP address.

### Step 4: Hardware Configuration

1. **Access ESP32 Menu**: Click **ESP32** in the web interface
2. **Enable Modules**: Enable the hardware modules you've installed:
   - RFID module type (PN532 or RC522)
   - Audio module (if installed)
   - SD Card module (if installed)
   - LED indicators (if installed)
   - Vibration motor (if installed)
3. **Configure GPIO Pins**: Set pins according to your wiring or use defaults for your ESP32 variant
4. **Save Configuration**: Click Save - device will reboot with new settings

### Step 5: Connect to Zaparoo

1. **Access Zaparoo Menu**: Click **ZAPAROO** in the web interface
2. **Enter Connection Details**:
   - Zaparoo Core IP address
   - Port (default: 7497)
   - Enable services you want (MiSTer, Steam, or Serial)
3. **Configure Options**:
   - Enable "Return to menu on card removal" for MiSTer if desired
4. **Save Settings**: Connection will be established automatically

### Step 6: Test Your Setup

1. **Create First Tag**: Click **CREATE** menu item
2. **Update Game Database**: Click "Update Zap DB" for your target system
3. **Search for Game**: Select system and search for a game
4. **Test Launch**: Use "Test Launch" button to verify game launches correctly
5. **Write to Tag**: Follow prompts to write game data to NFC tag
6. **Test Tag**: Scan your new tag to verify it launches the game

## Web Interface Features

The ZapESP32 web interface provides comprehensive configuration and management capabilities through your browser at `http://zapesp.local`.

### System Configuration

#### ESP32 Settings

- **Module Management**: Enable/disable installed hardware modules
- **GPIO Configuration**: Assign pins for RFID reader, audio, SD card, LEDs, and vibration motor
- **Hardware Detection**: Automatic detection of connected components
- **Pin Validation**: Verify GPIO assignments match your wiring

#### WiFi Management

- **Network Setup**: Configure WiFi credentials for internet connectivity
- **Access Point Mode**: Fallback AP mode when WiFi connection fails
- **Connection Status**: Real-time network connectivity monitoring
- **IP Address Display**: View current network configuration

#### Zaparoo Connection

- **Service Configuration**: Connect to Zaparoo Core, Zaparoo for Steam, or Serial mode
- **Network Settings**: Configure IP address and port for Zaparoo services
- **Connection Testing**: Verify connectivity to Zaparoo services
- **Auto-reconnection**: Automatic reconnection on connection loss

### Content Management

#### File Manager

- **Audio Upload**: Upload MP3 files to SD card or SPIFFS storage
- **File Organization**: Browse and manage stored audio files
- **Storage Monitoring**: View available space on SD card and internal storage
- **Bulk Operations**: Upload multiple files simultaneously
- **File Preview**: Audio file information and metadata display

#### Game Database

- **Game Search**: Search games across multiple systems from Zaparoo Core
- **System Selection**: Filter searches by gaming platform (MiSTer, Steam, etc.)
- **Database Updates**: Sync latest game lists from Zaparoo services
- **Search Results**: Browse and select from up to 250 game results

### Tag Creation and Management

#### NFC Tag Writing

- **Game Selection**: Choose games from search results for tag creation
- **Launch Testing**: Test game launch before writing to tag
- **Custom Audio**: Assign launch and removal audio files per tag
- **Write Process**: Guided tag writing with on-screen prompts
- **Write Verification**: Confirm successful tag creation

#### Manual Tag Creation

- **Custom Commands**: Enter manual commands for specialized setups
- **Text Entry**: Direct input for system commands and parameters
- **Flexible Configuration**: Support for non-standard game launch methods

### Advanced Features

#### UID Audio Control

- **Read-Only Tag Support**: Configure audio for Amiibos and other read-only tags
- **UID Scanning**: Special scanning mode for tag identification
- **Audio Assignment**: Set launch and removal sounds for specific UIDs
- **Bulk Configuration**: Manage multiple read-only tags efficiently

#### Default Settings

- **Event Audio**: Configure default sounds for detect, launch, error, and removal events
- **Haptic Configuration**: Choose which events trigger vibration motor
- **Fallback Behavior**: Set default actions when specific audio files aren't available
- **System Preferences**: Global settings that apply to all tags

#### Zaparoo Mappings

- **Mapping Creation**: Create database entries for read-only NFC tags
- **Amiibo Support**: Map Amiibo UIDs to game launch commands
- **Command Mapping**: Link tag UIDs to specific Zaparoo commands
- **Override Management**: Update or replace existing mappings

## Advanced Configuration

### GPIO Pin Assignments

Each ESP32 variant has recommended default GPIO pins for different components:

#### ESP32 (Standard)

- **SPI Pins**: MOSI, MISO, SCK for RFID and SD card modules
- **I2C Pins**: SDA, SCL for audio module communication
- **Digital Pins**: Configurable pins for LEDs and vibration motor
- **Power Pins**: 3.3V and GND connections for all modules

#### ESP32-S3

- **Enhanced GPIO**: More available pins for complex configurations
- **Better Performance**: Improved WiFi and processing capabilities
- **Memory Advantages**: Additional RAM for audio buffering

#### ESP32-S2 Mini

- **Limited GPIO**: Fewer available pins requiring careful planning
- **WiFi Limitations**: Reduced WiFi performance affects connectivity
- **Compact Form**: Smaller footprint suitable for minimal builds

### Audio System Configuration

#### Audio File Management

- **Supported Formats**: MP3 files with various bit rates
- **File Naming**: Descriptive names for easy identification
- **Storage Optimization**: Balance quality vs. storage space
- **Audio Length**: Recommended short clips for responsive feedback

#### Event-Based Audio

- **Card Detected**: Plays when NFC tag is detected
- **Game Launched**: Plays when game successfully launches
- **Card Removed**: Plays when NFC tag is removed from reader
- **Error Events**: Plays when launch fails or errors occur

#### Game-Specific Audio

- **Custom Launch Sounds**: Unique audio per game/tag
- **Themed Collections**: Organize sounds by game series or genre
- **Character Voices**: Use game character sounds for immersion
- **Music Clips**: Brief musical themes from games

### Power Management

#### Battery Operation

- **Power Consumption**: Optimize settings for longer battery life
- **CPU Frequency**: Reduce frequency when audio isn't required
- **Sleep Modes**: Automatic power saving during inactivity
- **Low Battery Detection**: Monitor and alert for low battery

#### USB Power

- **Stable Operation**: Consistent power for all features
- **Development Mode**: Easy programming and debugging
- **Always-On**: Continuous operation without power concerns

### Troubleshooting

#### Common Issues

- **WiFi Connection**: Check network credentials and signal strength
- **Game Launch Failures**: Verify Zaparoo Core connectivity and game paths
- **Audio Problems**: Check file formats, storage, and GPIO connections
- **Tag Writing Issues**: Ensure proper NFC tag compatibility

#### Debug Information

- **Serial Monitor**: Use Arduino IDE serial monitor for debugging
- **Web Interface Status**: Check connection indicators in web UI
- **Log Files**: Review system logs for error identification
- **Component Testing**: Individual module testing procedures

## Requirements

### Software Requirements

- **Zaparoo Core Service**: Running instance of Zaparoo Core for game launching
- **Arduino IDE**: For firmware development and flashing
- **WiFi Network**: Stable internet connection for Zaparoo communication
- **Web Browser**: Modern browser for accessing web interface

### Hardware Requirements

- **ESP32 Board**: Compatible ESP32, ESP32-S3, or ESP32-S2 Mini development board
- **RFID Module**: PN532 (recommended) or RC522 NFC/RFID reader
- **NFC Tags**: Compatible NFC tags or cards for game storage
- **Power Supply**: USB power source or battery pack
- **Connecting Materials**: Breadboard, jumper wires, or PCB for assembly

### Optional Requirements

- **Audio Hardware**: Max98357 I2S module and speaker for audio feedback
- **Storage**: Micro SD module and card for expanded audio storage
- **Visual Feedback**: LEDs and resistors for status indication
- **Haptic Feedback**: DC vibration motor and driver circuit
- **Enclosure**: 3D printer access for case fabrication

## Download & Resources

### Source Code

- **GitHub Repository**: [zaparoo-esp32](https://github.com/ZaparooProject/zaparoo-esp32)
- **License**: GPLv3 - Fully open source
- **Latest Release**: Download the most current version from GitHub releases
- **Development Version**: Clone repository for latest features and fixes

### 3D Printable Cases

The project includes several STL files for 3D printing:

- **ESP32_Small_Base.stl**: Compact case base for standard ESP32
- **ESP32-S2Mini_Small_Base.stl**: Case base designed for ESP32-S2 Mini
- **Small_Lid.stl**: Lid for compact case variants
- **ZAPESP_BASE.stl**: Larger case base for expanded builds
- **ZAPESP_LID1.stl**: Lid for larger case design
