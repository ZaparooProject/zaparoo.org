import type { ReaderSupportGroup } from "@site/src/components/SupportMatrix/types";

/**
 * Reader support per platform, rendered by <ReaderSupport platformId="..." />
 * on platform pages and used to generate the plain Markdown tables in the
 * platform README pages. Edit here, not in individual pages.
 * hrefs are docs-root relative; the component resolves them per version.
 */
export const readerSupportByPlatform = {
  "mister": [
    {
      "name": "NFC/RFID",
      "readers": [
        {
          "name": "PN532 USB",
          "href": "readers/nfc/pn532-usb",
          "support": "supported",
          "setup": "Auto-detected"
        },
        {
          "name": "PN532 Module",
          "href": "readers/nfc/pn532-module",
          "support": "supported",
          "setup": "Depends on wiring",
          "note": "UART can auto-detect. I2C is supported."
        },
        {
          "name": "ACR122U",
          "href": "readers/nfc/acr122u",
          "support": "supported",
          "setup": "Manual enable",
          "note": "Uses libnfc: LED and beeper do not work, and some clone variants are incompatible."
        },
        {
          "name": "RC522",
          "href": "readers/nfc/rc522",
          "support": "limited",
          "setup": "Via Simple Serial",
          "note": "Requires a microcontroller; not a direct USB reader."
        }
      ]
    },
    {
      "name": "Barcode and QR",
      "readers": [
        {
          "name": "Zaparoo App camera",
          "href": "app/",
          "support": "supported",
          "setup": "Via Zaparoo App"
        },
        {
          "name": "RS-232 scanner",
          "href": "readers/barcode/rs232",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Optical and Media",
      "readers": [
        {
          "name": "Optical Drive",
          "href": "readers/optical-drive",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "External Drive",
          "href": "readers/external-drive",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    },
    {
      "name": "Custom and Virtual",
      "readers": [
        {
          "name": "MQTT Reader",
          "href": "readers/mqtt",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "Simple Serial",
          "href": "readers/simple-serial",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "File Reader",
          "href": "readers/file",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Displays and Integrations",
      "readers": [
        {
          "name": "TTY2OLED",
          "href": "readers/tty2oled",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    }
  ],
  "batocera": [
    {
      "name": "NFC/RFID",
      "readers": [
        {
          "name": "PN532 USB",
          "href": "readers/nfc/pn532-usb",
          "support": "supported",
          "setup": "Auto-detected"
        },
        {
          "name": "PN532 Module",
          "href": "readers/nfc/pn532-module",
          "support": "supported",
          "setup": "Depends on wiring",
          "note": "UART can auto-detect. I2C is supported."
        },
        {
          "name": "ACR122U",
          "href": "readers/nfc/acr122u",
          "support": "supported",
          "setup": "Manual enable",
          "note": "Uses libnfc: LED and beeper do not work, and some clone variants are incompatible."
        },
        {
          "name": "RC522",
          "href": "readers/nfc/rc522",
          "support": "limited",
          "setup": "Via Simple Serial",
          "note": "Requires a microcontroller; not a direct USB reader."
        }
      ]
    },
    {
      "name": "Barcode and QR",
      "readers": [
        {
          "name": "Zaparoo App camera",
          "href": "app/",
          "support": "supported",
          "setup": "Via Zaparoo App"
        },
        {
          "name": "RS-232 scanner",
          "href": "readers/barcode/rs232",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Optical and Media",
      "readers": [
        {
          "name": "Optical Drive",
          "href": "readers/optical-drive",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "External Drive",
          "href": "readers/external-drive",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    },
    {
      "name": "Custom and Virtual",
      "readers": [
        {
          "name": "MQTT Reader",
          "href": "readers/mqtt",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "Simple Serial",
          "href": "readers/simple-serial",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "File Reader",
          "href": "readers/file",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Displays and Integrations",
      "readers": [
        {
          "name": "TTY2OLED",
          "href": "readers/tty2oled",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    }
  ],
  "linux": [
    {
      "name": "NFC/RFID",
      "readers": [
        {
          "name": "PN532 USB",
          "href": "readers/nfc/pn532-usb",
          "support": "supported",
          "setup": "Auto-detected"
        },
        {
          "name": "PN532 Module",
          "href": "readers/nfc/pn532-module",
          "support": "supported",
          "setup": "Depends on wiring",
          "note": "UART can auto-detect. I2C is supported."
        },
        {
          "name": "ACR122U",
          "href": "readers/nfc/acr122u",
          "support": "supported",
          "setup": "Manual enable",
          "note": "Uses libnfc: LED and beeper do not work, and some clone variants are incompatible."
        },
        {
          "name": "RC522",
          "href": "readers/nfc/rc522",
          "support": "limited",
          "setup": "Via Simple Serial",
          "note": "Requires a microcontroller; not a direct USB reader."
        }
      ]
    },
    {
      "name": "Barcode and QR",
      "readers": [
        {
          "name": "Zaparoo App camera",
          "href": "app/",
          "support": "supported",
          "setup": "Via Zaparoo App"
        },
        {
          "name": "RS-232 scanner",
          "href": "readers/barcode/rs232",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Optical and Media",
      "readers": [
        {
          "name": "Optical Drive",
          "href": "readers/optical-drive",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "External Drive",
          "href": "readers/external-drive",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    },
    {
      "name": "Custom and Virtual",
      "readers": [
        {
          "name": "MQTT Reader",
          "href": "readers/mqtt",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "Simple Serial",
          "href": "readers/simple-serial",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "File Reader",
          "href": "readers/file",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Displays and Integrations",
      "readers": [
        {
          "name": "TTY2OLED",
          "href": "readers/tty2oled",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    }
  ],
  "windows": [
    {
      "name": "NFC/RFID",
      "readers": [
        {
          "name": "PN532 USB",
          "href": "readers/nfc/pn532-usb",
          "support": "supported",
          "setup": "Auto-detected"
        },
        {
          "name": "PN532 Module",
          "href": "readers/nfc/pn532-module",
          "support": "supported",
          "setup": "Depends on wiring",
          "note": "UART can auto-detect. I2C is supported."
        },
        {
          "name": "ACR122U",
          "href": "readers/nfc/acr122u",
          "support": "limited",
          "setup": "Auto-detected",
          "note": "Can scan tags, but cannot write them through PCSC."
        },
        {
          "name": "RC522",
          "href": "readers/nfc/rc522",
          "support": "limited",
          "setup": "Via Simple Serial",
          "note": "Requires a microcontroller; not a direct USB reader."
        }
      ]
    },
    {
      "name": "Barcode and QR",
      "readers": [
        {
          "name": "Zaparoo App camera",
          "href": "app/",
          "support": "supported",
          "setup": "Via Zaparoo App"
        },
        {
          "name": "RS-232 scanner",
          "href": "readers/barcode/rs232",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Optical and Media",
      "readers": [
        {
          "name": "Optical Drive",
          "href": "readers/optical-drive",
          "support": "unsupported",
          "note": "Linux only"
        },
        {
          "name": "External Drive",
          "href": "readers/external-drive",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    },
    {
      "name": "Custom and Virtual",
      "readers": [
        {
          "name": "MQTT Reader",
          "href": "readers/mqtt",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "Simple Serial",
          "href": "readers/simple-serial",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "File Reader",
          "href": "readers/file",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Displays and Integrations",
      "readers": [
        {
          "name": "TTY2OLED",
          "href": "readers/tty2oled",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    }
  ],
  "steamos": [
    {
      "name": "NFC/RFID",
      "readers": [
        {
          "name": "PN532 USB",
          "href": "readers/nfc/pn532-usb",
          "support": "supported",
          "setup": "Auto-detected"
        },
        {
          "name": "PN532 Module",
          "href": "readers/nfc/pn532-module",
          "support": "supported",
          "setup": "Depends on wiring",
          "note": "UART can auto-detect. I2C is supported."
        },
        {
          "name": "ACR122U",
          "href": "readers/nfc/acr122u",
          "support": "limited",
          "setup": "Manual enable",
          "note": "Uses libnfc: MIFARE Classic writing is limited, LED and beeper do not work, and some clone variants are incompatible."
        },
        {
          "name": "RC522",
          "href": "readers/nfc/rc522",
          "support": "limited",
          "setup": "Via Simple Serial",
          "note": "Requires a microcontroller; not a direct USB reader."
        }
      ]
    },
    {
      "name": "Barcode and QR",
      "readers": [
        {
          "name": "Zaparoo App camera",
          "href": "app/",
          "support": "supported",
          "setup": "Via Zaparoo App"
        },
        {
          "name": "RS-232 scanner",
          "href": "readers/barcode/rs232",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Optical and Media",
      "readers": [
        {
          "name": "Optical Drive",
          "href": "readers/optical-drive",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "External Drive",
          "href": "readers/external-drive",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    },
    {
      "name": "Custom and Virtual",
      "readers": [
        {
          "name": "MQTT Reader",
          "href": "readers/mqtt",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "Simple Serial",
          "href": "readers/simple-serial",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "File Reader",
          "href": "readers/file",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Displays and Integrations",
      "readers": [
        {
          "name": "TTY2OLED",
          "href": "readers/tty2oled",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    }
  ],
  "bazzite": [
    {
      "name": "NFC/RFID",
      "readers": [
        {
          "name": "PN532 USB",
          "href": "readers/nfc/pn532-usb",
          "support": "supported",
          "setup": "Auto-detected"
        },
        {
          "name": "PN532 Module",
          "href": "readers/nfc/pn532-module",
          "support": "supported",
          "setup": "Depends on wiring",
          "note": "UART can auto-detect. I2C is supported."
        },
        {
          "name": "ACR122U",
          "href": "readers/nfc/acr122u",
          "support": "supported",
          "setup": "Manual enable",
          "note": "Uses libnfc: LED and beeper do not work, and some clone variants are incompatible."
        },
        {
          "name": "RC522",
          "href": "readers/nfc/rc522",
          "support": "limited",
          "setup": "Via Simple Serial",
          "note": "Requires a microcontroller; not a direct USB reader."
        }
      ]
    },
    {
      "name": "Barcode and QR",
      "readers": [
        {
          "name": "Zaparoo App camera",
          "href": "app/",
          "support": "supported",
          "setup": "Via Zaparoo App"
        },
        {
          "name": "RS-232 scanner",
          "href": "readers/barcode/rs232",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Optical and Media",
      "readers": [
        {
          "name": "Optical Drive",
          "href": "readers/optical-drive",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "External Drive",
          "href": "readers/external-drive",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    },
    {
      "name": "Custom and Virtual",
      "readers": [
        {
          "name": "MQTT Reader",
          "href": "readers/mqtt",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "Simple Serial",
          "href": "readers/simple-serial",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "File Reader",
          "href": "readers/file",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Displays and Integrations",
      "readers": [
        {
          "name": "TTY2OLED",
          "href": "readers/tty2oled",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    }
  ],
  "chimeraos": [
    {
      "name": "NFC/RFID",
      "readers": [
        {
          "name": "PN532 USB",
          "href": "readers/nfc/pn532-usb",
          "support": "supported",
          "setup": "Auto-detected"
        },
        {
          "name": "PN532 Module",
          "href": "readers/nfc/pn532-module",
          "support": "supported",
          "setup": "Depends on wiring",
          "note": "UART can auto-detect. I2C is supported."
        },
        {
          "name": "ACR122U",
          "href": "readers/nfc/acr122u",
          "support": "supported",
          "setup": "Manual enable",
          "note": "Uses libnfc: LED and beeper do not work, and some clone variants are incompatible."
        },
        {
          "name": "RC522",
          "href": "readers/nfc/rc522",
          "support": "limited",
          "setup": "Via Simple Serial",
          "note": "Requires a microcontroller; not a direct USB reader."
        }
      ]
    },
    {
      "name": "Barcode and QR",
      "readers": [
        {
          "name": "Zaparoo App camera",
          "href": "app/",
          "support": "supported",
          "setup": "Via Zaparoo App"
        },
        {
          "name": "RS-232 scanner",
          "href": "readers/barcode/rs232",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Optical and Media",
      "readers": [
        {
          "name": "Optical Drive",
          "href": "readers/optical-drive",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "External Drive",
          "href": "readers/external-drive",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    },
    {
      "name": "Custom and Virtual",
      "readers": [
        {
          "name": "MQTT Reader",
          "href": "readers/mqtt",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "Simple Serial",
          "href": "readers/simple-serial",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "File Reader",
          "href": "readers/file",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Displays and Integrations",
      "readers": [
        {
          "name": "TTY2OLED",
          "href": "readers/tty2oled",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    }
  ],
  "mac": [
    {
      "name": "NFC/RFID",
      "readers": [
        {
          "name": "PN532 USB",
          "href": "readers/nfc/pn532-usb",
          "support": "supported",
          "setup": "Auto-detected"
        },
        {
          "name": "PN532 Module",
          "href": "readers/nfc/pn532-module",
          "support": "supported",
          "setup": "Depends on wiring",
          "note": "UART can auto-detect. I2C is supported."
        },
        {
          "name": "ACR122U",
          "href": "readers/nfc/acr122u",
          "support": "unsupported",
          "note": "Not included in the current macOS Core reader set."
        },
        {
          "name": "RC522",
          "href": "readers/nfc/rc522",
          "support": "limited",
          "setup": "Via Simple Serial",
          "note": "Requires a microcontroller; not a direct USB reader."
        }
      ]
    },
    {
      "name": "Barcode and QR",
      "readers": [
        {
          "name": "Zaparoo App camera",
          "href": "app/",
          "support": "supported",
          "setup": "Via Zaparoo App"
        },
        {
          "name": "RS-232 scanner",
          "href": "readers/barcode/rs232",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Optical and Media",
      "readers": [
        {
          "name": "Optical Drive",
          "href": "readers/optical-drive",
          "support": "unsupported",
          "note": "Linux only"
        },
        {
          "name": "External Drive",
          "href": "readers/external-drive",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    },
    {
      "name": "Custom and Virtual",
      "readers": [
        {
          "name": "MQTT Reader",
          "href": "readers/mqtt",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "Simple Serial",
          "href": "readers/simple-serial",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "File Reader",
          "href": "readers/file",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Displays and Integrations",
      "readers": [
        {
          "name": "TTY2OLED",
          "href": "readers/tty2oled",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    }
  ],
  "recalbox": [
    {
      "name": "NFC/RFID",
      "readers": [
        {
          "name": "PN532 USB",
          "href": "readers/nfc/pn532-usb",
          "support": "supported",
          "setup": "Auto-detected"
        },
        {
          "name": "PN532 Module",
          "href": "readers/nfc/pn532-module",
          "support": "supported",
          "setup": "Depends on wiring",
          "note": "UART can auto-detect. I2C is supported."
        },
        {
          "name": "ACR122U",
          "href": "readers/nfc/acr122u",
          "support": "supported",
          "setup": "Manual enable",
          "note": "Uses libnfc: LED and beeper do not work, and some clone variants are incompatible."
        },
        {
          "name": "RC522",
          "href": "readers/nfc/rc522",
          "support": "limited",
          "setup": "Via Simple Serial",
          "note": "Requires a microcontroller; not a direct USB reader."
        }
      ]
    },
    {
      "name": "Barcode and QR",
      "readers": [
        {
          "name": "Zaparoo App camera",
          "href": "app/",
          "support": "supported",
          "setup": "Via Zaparoo App"
        },
        {
          "name": "RS-232 scanner",
          "href": "readers/barcode/rs232",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Optical and Media",
      "readers": [
        {
          "name": "Optical Drive",
          "href": "readers/optical-drive",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "External Drive",
          "href": "readers/external-drive",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    },
    {
      "name": "Custom and Virtual",
      "readers": [
        {
          "name": "MQTT Reader",
          "href": "readers/mqtt",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "Simple Serial",
          "href": "readers/simple-serial",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "File Reader",
          "href": "readers/file",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Displays and Integrations",
      "readers": [
        {
          "name": "TTY2OLED",
          "href": "readers/tty2oled",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    }
  ],
  "replayos": [
    {
      "name": "NFC/RFID",
      "readers": [
        {
          "name": "PN532 USB",
          "href": "readers/nfc/pn532-usb",
          "support": "supported",
          "setup": "Auto-detected"
        },
        {
          "name": "PN532 Module",
          "href": "readers/nfc/pn532-module",
          "support": "supported",
          "setup": "Depends on wiring",
          "note": "UART can auto-detect. I2C is supported."
        },
        {
          "name": "ACR122U",
          "href": "readers/nfc/acr122u",
          "support": "supported",
          "setup": "Manual enable",
          "note": "Uses libnfc: LED and beeper do not work, and some clone variants are incompatible."
        },
        {
          "name": "RC522",
          "href": "readers/nfc/rc522",
          "support": "limited",
          "setup": "Via Simple Serial",
          "note": "Requires a microcontroller; not a direct USB reader."
        }
      ]
    },
    {
      "name": "Barcode and QR",
      "readers": [
        {
          "name": "Zaparoo App camera",
          "href": "app/",
          "support": "supported",
          "setup": "Via Zaparoo App"
        },
        {
          "name": "RS-232 scanner",
          "href": "readers/barcode/rs232",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Optical and Media",
      "readers": [
        {
          "name": "Optical Drive",
          "href": "readers/optical-drive",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "External Drive",
          "href": "readers/external-drive",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    },
    {
      "name": "Custom and Virtual",
      "readers": [
        {
          "name": "MQTT Reader",
          "href": "readers/mqtt",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "Simple Serial",
          "href": "readers/simple-serial",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "File Reader",
          "href": "readers/file",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Displays and Integrations",
      "readers": [
        {
          "name": "TTY2OLED",
          "href": "readers/tty2oled",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    }
  ],
  "libreelec": [
    {
      "name": "NFC/RFID",
      "readers": [
        {
          "name": "PN532 USB",
          "href": "readers/nfc/pn532-usb",
          "support": "supported",
          "setup": "Auto-detected"
        },
        {
          "name": "PN532 Module",
          "href": "readers/nfc/pn532-module",
          "support": "supported",
          "setup": "Depends on wiring",
          "note": "UART can auto-detect. I2C is supported."
        },
        {
          "name": "ACR122U",
          "href": "readers/nfc/acr122u",
          "support": "supported",
          "setup": "Manual enable",
          "note": "Uses libnfc: LED and beeper do not work, and some clone variants are incompatible."
        },
        {
          "name": "RC522",
          "href": "readers/nfc/rc522",
          "support": "limited",
          "setup": "Via Simple Serial",
          "note": "Requires a microcontroller; not a direct USB reader."
        }
      ]
    },
    {
      "name": "Barcode and QR",
      "readers": [
        {
          "name": "Zaparoo App camera",
          "href": "app/",
          "support": "supported",
          "setup": "Via Zaparoo App"
        },
        {
          "name": "RS-232 scanner",
          "href": "readers/barcode/rs232",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Optical and Media",
      "readers": [
        {
          "name": "Optical Drive",
          "href": "readers/optical-drive",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "External Drive",
          "href": "readers/external-drive",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    },
    {
      "name": "Custom and Virtual",
      "readers": [
        {
          "name": "MQTT Reader",
          "href": "readers/mqtt",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "Simple Serial",
          "href": "readers/simple-serial",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "File Reader",
          "href": "readers/file",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Displays and Integrations",
      "readers": [
        {
          "name": "TTY2OLED",
          "href": "readers/tty2oled",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    }
  ],
  "mistex": [
    {
      "name": "NFC/RFID",
      "readers": [
        {
          "name": "PN532 USB",
          "href": "readers/nfc/pn532-usb",
          "support": "supported",
          "setup": "Auto-detected"
        },
        {
          "name": "PN532 Module",
          "href": "readers/nfc/pn532-module",
          "support": "supported",
          "setup": "Depends on wiring",
          "note": "UART can auto-detect. I2C is supported."
        },
        {
          "name": "ACR122U",
          "href": "readers/nfc/acr122u",
          "support": "supported",
          "setup": "Manual enable",
          "note": "Uses libnfc: LED and beeper do not work, and some clone variants are incompatible."
        },
        {
          "name": "RC522",
          "href": "readers/nfc/rc522",
          "support": "limited",
          "setup": "Via Simple Serial",
          "note": "Requires a microcontroller; not a direct USB reader."
        }
      ]
    },
    {
      "name": "Barcode and QR",
      "readers": [
        {
          "name": "Zaparoo App camera",
          "href": "app/",
          "support": "supported",
          "setup": "Via Zaparoo App"
        },
        {
          "name": "RS-232 scanner",
          "href": "readers/barcode/rs232",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Optical and Media",
      "readers": [
        {
          "name": "Optical Drive",
          "href": "readers/optical-drive",
          "support": "unsupported",
          "setup": "Not available",
          "note": "Not included in the current MiSTeX Core reader set."
        },
        {
          "name": "External Drive",
          "href": "readers/external-drive",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    },
    {
      "name": "Custom and Virtual",
      "readers": [
        {
          "name": "MQTT Reader",
          "href": "readers/mqtt",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "Simple Serial",
          "href": "readers/simple-serial",
          "support": "supported",
          "setup": "Manual config"
        },
        {
          "name": "File Reader",
          "href": "readers/file",
          "support": "supported",
          "setup": "Manual config"
        }
      ]
    },
    {
      "name": "Displays and Integrations",
      "readers": [
        {
          "name": "TTY2OLED",
          "href": "readers/tty2oled",
          "support": "supported",
          "setup": "Manual enable"
        }
      ]
    }
  ]
} satisfies Record<string, ReaderSupportGroup[]>;

export type ReaderSupportPlatformId = keyof typeof readerSupportByPlatform;
