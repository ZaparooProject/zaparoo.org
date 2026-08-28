import type { PlatformSupportGroup } from "@site/src/components/SupportMatrix/types";

export interface PlatformSupportEntry {
  groups: PlatformSupportGroup[];
  note?: string;
}

/**
 * Platform support per reader, rendered by <PlatformSupport readerId="..." />
 * on reader pages. Edit here, not in individual pages.
 * hrefs are docs-root relative; the component resolves them per version.
 */
export const platformSupportByReader = {
  "pn532-usb": {
    "groups": [
      {
        "name": "Base OS",
        "platforms": [
          {
            "name": "Windows",
            "href": "platforms/windows/",
            "support": "supported"
          },
          {
            "name": "Linux",
            "href": "platforms/linux/",
            "support": "supported"
          }
        ]
      },
      {
        "name": "FPGA",
        "platforms": [
          {
            "name": "MiSTer",
            "href": "platforms/mister/",
            "support": "supported"
          },
          {
            "name": "MiSTeX",
            "href": "platforms/mistex",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Retro Gaming OS",
        "platforms": [
          {
            "name": "Batocera",
            "href": "platforms/batocera/",
            "support": "supported"
          },
          {
            "name": "RePlayOS",
            "href": "platforms/replayos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Handheld and Gaming Linux",
        "platforms": [
          {
            "name": "SteamOS",
            "href": "platforms/steamos",
            "support": "supported"
          },
          {
            "name": "Bazzite",
            "href": "platforms/bazzite",
            "support": "supported"
          },
          {
            "name": "ChimeraOS",
            "href": "platforms/chimeraos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Media Center",
        "platforms": [
          {
            "name": "LibreELEC",
            "href": "platforms/libreelec",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Other Hardware",
        "platforms": [
          {
            "name": "Commodore 64",
            "href": "platforms/commodore64",
            "support": "limited",
            "note": "Via TeensyROM, not Zaparoo Core."
          }
        ]
      }
    ]
  },
  "pn532-module": {
    "groups": [
      {
        "name": "Base OS",
        "platforms": [
          {
            "name": "Windows",
            "href": "platforms/windows/",
            "support": "supported"
          },
          {
            "name": "Linux",
            "href": "platforms/linux/",
            "support": "supported"
          }
        ]
      },
      {
        "name": "FPGA",
        "platforms": [
          {
            "name": "MiSTer",
            "href": "platforms/mister/",
            "support": "supported"
          },
          {
            "name": "MiSTeX",
            "href": "platforms/mistex",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Retro Gaming OS",
        "platforms": [
          {
            "name": "Batocera",
            "href": "platforms/batocera/",
            "support": "supported"
          },
          {
            "name": "RePlayOS",
            "href": "platforms/replayos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Handheld and Gaming Linux",
        "platforms": [
          {
            "name": "SteamOS",
            "href": "platforms/steamos",
            "support": "supported"
          },
          {
            "name": "Bazzite",
            "href": "platforms/bazzite",
            "support": "supported"
          },
          {
            "name": "ChimeraOS",
            "href": "platforms/chimeraos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Media Center",
        "platforms": [
          {
            "name": "LibreELEC",
            "href": "platforms/libreelec",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Other Hardware",
        "platforms": [
          {
            "name": "Commodore 64",
            "href": "platforms/commodore64",
            "support": "limited",
            "note": "Via TeensyROM, not Zaparoo Core."
          }
        ]
      }
    ]
  },
  "acr122u": {
    "groups": [
      {
        "name": "Base OS",
        "platforms": [
          {
            "name": "Windows",
            "href": "platforms/windows/",
            "support": "limited",
            "note": "Scanning works through PC/SC. Writing tags through Zaparoo is not supported."
          },
          {
            "name": "Linux",
            "href": "platforms/linux/",
            "support": "limited"
          }
        ]
      },
      {
        "name": "FPGA",
        "platforms": [
          {
            "name": "MiSTer",
            "href": "platforms/mister/",
            "support": "limited"
          },
          {
            "name": "MiSTeX",
            "href": "platforms/mistex",
            "support": "limited"
          }
        ]
      },
      {
        "name": "Retro Gaming OS",
        "platforms": [
          {
            "name": "Batocera",
            "href": "platforms/batocera/",
            "support": "limited"
          },
          {
            "name": "RePlayOS",
            "href": "platforms/replayos",
            "support": "limited"
          }
        ]
      },
      {
        "name": "Handheld and Gaming Linux",
        "platforms": [
          {
            "name": "SteamOS",
            "href": "platforms/steamos",
            "support": "limited"
          },
          {
            "name": "Bazzite",
            "href": "platforms/bazzite",
            "support": "limited"
          },
          {
            "name": "ChimeraOS",
            "href": "platforms/chimeraos",
            "support": "limited"
          }
        ]
      },
      {
        "name": "Media Center",
        "platforms": [
          {
            "name": "LibreELEC",
            "href": "platforms/libreelec",
            "support": "limited"
          }
        ]
      }
    ]
  },
  "rc522": {
    "groups": [
      {
        "name": "Base OS",
        "platforms": [
          {
            "name": "Windows",
            "href": "platforms/windows/",
            "support": "limited"
          },
          {
            "name": "Linux",
            "href": "platforms/linux/",
            "support": "limited"
          }
        ]
      },
      {
        "name": "FPGA",
        "platforms": [
          {
            "name": "MiSTer",
            "href": "platforms/mister/",
            "support": "limited"
          },
          {
            "name": "MiSTeX",
            "href": "platforms/mistex",
            "support": "limited"
          }
        ]
      },
      {
        "name": "Retro Gaming OS",
        "platforms": [
          {
            "name": "Batocera",
            "href": "platforms/batocera/",
            "support": "limited"
          },
          {
            "name": "RePlayOS",
            "href": "platforms/replayos",
            "support": "limited"
          }
        ]
      },
      {
        "name": "Handheld and Gaming Linux",
        "platforms": [
          {
            "name": "SteamOS",
            "href": "platforms/steamos",
            "support": "limited"
          },
          {
            "name": "Bazzite",
            "href": "platforms/bazzite",
            "support": "limited"
          },
          {
            "name": "ChimeraOS",
            "href": "platforms/chimeraos",
            "support": "limited"
          }
        ]
      },
      {
        "name": "Media Center",
        "platforms": [
          {
            "name": "LibreELEC",
            "href": "platforms/libreelec",
            "support": "limited"
          }
        ]
      }
    ]
  },
  "barcode": {
    "groups": [
      {
        "name": "Base OS",
        "platforms": [
          {
            "name": "Windows",
            "href": "platforms/windows/",
            "support": "supported"
          },
          {
            "name": "Linux",
            "href": "platforms/linux/",
            "support": "supported"
          }
        ]
      },
      {
        "name": "FPGA",
        "platforms": [
          {
            "name": "MiSTer",
            "href": "platforms/mister/",
            "support": "supported"
          },
          {
            "name": "MiSTeX",
            "href": "platforms/mistex",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Retro Gaming OS",
        "platforms": [
          {
            "name": "Batocera",
            "href": "platforms/batocera/",
            "support": "supported"
          },
          {
            "name": "RePlayOS",
            "href": "platforms/replayos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Handheld and Gaming Linux",
        "platforms": [
          {
            "name": "SteamOS",
            "href": "platforms/steamos",
            "support": "supported"
          },
          {
            "name": "Bazzite",
            "href": "platforms/bazzite",
            "support": "supported"
          },
          {
            "name": "ChimeraOS",
            "href": "platforms/chimeraos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Media Center",
        "platforms": [
          {
            "name": "LibreELEC",
            "href": "platforms/libreelec",
            "support": "supported"
          }
        ]
      }
    ]
  },
  "rs232": {
    "groups": [
      {
        "name": "Base OS",
        "platforms": [
          {
            "name": "Windows",
            "href": "platforms/windows/",
            "support": "supported"
          },
          {
            "name": "Linux",
            "href": "platforms/linux/",
            "support": "supported"
          }
        ]
      },
      {
        "name": "FPGA",
        "platforms": [
          {
            "name": "MiSTer",
            "href": "platforms/mister/",
            "support": "supported"
          },
          {
            "name": "MiSTeX",
            "href": "platforms/mistex",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Retro Gaming OS",
        "platforms": [
          {
            "name": "Batocera",
            "href": "platforms/batocera/",
            "support": "supported"
          },
          {
            "name": "RePlayOS",
            "href": "platforms/replayos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Handheld and Gaming Linux",
        "platforms": [
          {
            "name": "SteamOS",
            "href": "platforms/steamos",
            "support": "supported"
          },
          {
            "name": "Bazzite",
            "href": "platforms/bazzite",
            "support": "supported"
          },
          {
            "name": "ChimeraOS",
            "href": "platforms/chimeraos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Media Center",
        "platforms": [
          {
            "name": "LibreELEC",
            "href": "platforms/libreelec",
            "support": "supported"
          }
        ]
      }
    ]
  },
  "optical-drive": {
    "groups": [
      {
        "name": "Base OS",
        "platforms": [
          {
            "name": "Windows",
            "href": "platforms/windows/",
            "support": "unsupported",
            "note": "Linux only."
          },
          {
            "name": "Linux",
            "href": "platforms/linux/",
            "support": "supported"
          }
        ]
      },
      {
        "name": "FPGA",
        "platforms": [
          {
            "name": "MiSTer",
            "href": "platforms/mister/",
            "support": "supported"
          },
          {
            "name": "MiSTeX",
            "href": "platforms/mistex",
            "support": "unsupported",
            "note": "Not included in the current MiSTeX Core reader set."
          }
        ]
      },
      {
        "name": "Retro Gaming OS",
        "platforms": [
          {
            "name": "Batocera",
            "href": "platforms/batocera/",
            "support": "supported"
          },
          {
            "name": "RePlayOS",
            "href": "platforms/replayos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Handheld and Gaming Linux",
        "platforms": [
          {
            "name": "SteamOS",
            "href": "platforms/steamos",
            "support": "supported"
          },
          {
            "name": "Bazzite",
            "href": "platforms/bazzite",
            "support": "supported"
          },
          {
            "name": "ChimeraOS",
            "href": "platforms/chimeraos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Media Center",
        "platforms": [
          {
            "name": "LibreELEC",
            "href": "platforms/libreelec",
            "support": "supported"
          }
        ]
      }
    ]
  },
  "external-drive": {
    "groups": [
      {
        "name": "Base OS",
        "platforms": [
          {
            "name": "Windows",
            "href": "platforms/windows/",
            "support": "supported"
          },
          {
            "name": "Linux",
            "href": "platforms/linux/",
            "support": "supported"
          }
        ]
      },
      {
        "name": "FPGA",
        "platforms": [
          {
            "name": "MiSTer",
            "href": "platforms/mister/",
            "support": "supported"
          },
          {
            "name": "MiSTeX",
            "href": "platforms/mistex",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Retro Gaming OS",
        "platforms": [
          {
            "name": "Batocera",
            "href": "platforms/batocera/",
            "support": "supported"
          },
          {
            "name": "RePlayOS",
            "href": "platforms/replayos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Handheld and Gaming Linux",
        "platforms": [
          {
            "name": "SteamOS",
            "href": "platforms/steamos",
            "support": "supported"
          },
          {
            "name": "Bazzite",
            "href": "platforms/bazzite",
            "support": "supported"
          },
          {
            "name": "ChimeraOS",
            "href": "platforms/chimeraos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Media Center",
        "platforms": [
          {
            "name": "LibreELEC",
            "href": "platforms/libreelec",
            "support": "supported"
          }
        ]
      }
    ]
  },
  "epilogue-operator": {
    "groups": [
      {
        "name": "Base OS",
        "platforms": [
          {
            "name": "Windows",
            "href": "platforms/windows/",
            "support": "unsupported"
          },
          {
            "name": "Linux",
            "href": "platforms/linux/",
            "support": "unsupported"
          }
        ]
      },
      {
        "name": "FPGA",
        "platforms": [
          {
            "name": "MiSTer",
            "href": "platforms/mister/",
            "support": "supported"
          },
          {
            "name": "MiSTeX",
            "href": "platforms/mistex",
            "support": "unsupported"
          }
        ]
      },
      {
        "name": "Retro Gaming OS",
        "platforms": [
          {
            "name": "Batocera",
            "href": "platforms/batocera/",
            "support": "unsupported"
          },
          {
            "name": "RePlayOS",
            "href": "platforms/replayos",
            "support": "unsupported"
          }
        ]
      },
      {
        "name": "Handheld and Gaming Linux",
        "platforms": [
          {
            "name": "SteamOS",
            "href": "platforms/steamos",
            "support": "unsupported"
          },
          {
            "name": "Bazzite",
            "href": "platforms/bazzite",
            "support": "unsupported"
          },
          {
            "name": "ChimeraOS",
            "href": "platforms/chimeraos",
            "support": "unsupported"
          }
        ]
      },
      {
        "name": "Media Center",
        "platforms": [
          {
            "name": "LibreELEC",
            "href": "platforms/libreelec",
            "support": "unsupported"
          }
        ]
      }
    ]
  },
  "file": {
    "groups": [
      {
        "name": "Base OS",
        "platforms": [
          {
            "name": "Windows",
            "href": "platforms/windows/",
            "support": "supported"
          },
          {
            "name": "Linux",
            "href": "platforms/linux/",
            "support": "supported"
          }
        ]
      },
      {
        "name": "FPGA",
        "platforms": [
          {
            "name": "MiSTer",
            "href": "platforms/mister/",
            "support": "supported"
          },
          {
            "name": "MiSTeX",
            "href": "platforms/mistex",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Retro Gaming OS",
        "platforms": [
          {
            "name": "Batocera",
            "href": "platforms/batocera/",
            "support": "supported"
          },
          {
            "name": "RePlayOS",
            "href": "platforms/replayos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Handheld and Gaming Linux",
        "platforms": [
          {
            "name": "SteamOS",
            "href": "platforms/steamos",
            "support": "supported"
          },
          {
            "name": "Bazzite",
            "href": "platforms/bazzite",
            "support": "supported"
          },
          {
            "name": "ChimeraOS",
            "href": "platforms/chimeraos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Media Center",
        "platforms": [
          {
            "name": "LibreELEC",
            "href": "platforms/libreelec",
            "support": "supported"
          }
        ]
      }
    ]
  },
  "mqtt": {
    "groups": [
      {
        "name": "Base OS",
        "platforms": [
          {
            "name": "Windows",
            "href": "platforms/windows/",
            "support": "supported"
          },
          {
            "name": "Linux",
            "href": "platforms/linux/",
            "support": "supported"
          }
        ]
      },
      {
        "name": "FPGA",
        "platforms": [
          {
            "name": "MiSTer",
            "href": "platforms/mister/",
            "support": "supported"
          },
          {
            "name": "MiSTeX",
            "href": "platforms/mistex",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Retro Gaming OS",
        "platforms": [
          {
            "name": "Batocera",
            "href": "platforms/batocera/",
            "support": "supported"
          },
          {
            "name": "RePlayOS",
            "href": "platforms/replayos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Handheld and Gaming Linux",
        "platforms": [
          {
            "name": "SteamOS",
            "href": "platforms/steamos",
            "support": "supported"
          },
          {
            "name": "Bazzite",
            "href": "platforms/bazzite",
            "support": "supported"
          },
          {
            "name": "ChimeraOS",
            "href": "platforms/chimeraos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Media Center",
        "platforms": [
          {
            "name": "LibreELEC",
            "href": "platforms/libreelec",
            "support": "supported"
          }
        ]
      }
    ]
  },
  "simple-serial": {
    "groups": [
      {
        "name": "Base OS",
        "platforms": [
          {
            "name": "Windows",
            "href": "platforms/windows/",
            "support": "supported"
          },
          {
            "name": "Linux",
            "href": "platforms/linux/",
            "support": "supported"
          }
        ]
      },
      {
        "name": "FPGA",
        "platforms": [
          {
            "name": "MiSTer",
            "href": "platforms/mister/",
            "support": "supported"
          },
          {
            "name": "MiSTeX",
            "href": "platforms/mistex",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Retro Gaming OS",
        "platforms": [
          {
            "name": "Batocera",
            "href": "platforms/batocera/",
            "support": "supported"
          },
          {
            "name": "RePlayOS",
            "href": "platforms/replayos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Handheld and Gaming Linux",
        "platforms": [
          {
            "name": "SteamOS",
            "href": "platforms/steamos",
            "support": "supported"
          },
          {
            "name": "Bazzite",
            "href": "platforms/bazzite",
            "support": "supported"
          },
          {
            "name": "ChimeraOS",
            "href": "platforms/chimeraos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Media Center",
        "platforms": [
          {
            "name": "LibreELEC",
            "href": "platforms/libreelec",
            "support": "supported"
          }
        ]
      }
    ]
  },
  "tty2oled": {
    "groups": [
      {
        "name": "Base OS",
        "platforms": [
          {
            "name": "Windows",
            "href": "platforms/windows/",
            "support": "supported"
          },
          {
            "name": "Linux",
            "href": "platforms/linux/",
            "support": "supported"
          }
        ]
      },
      {
        "name": "FPGA",
        "platforms": [
          {
            "name": "MiSTer",
            "href": "platforms/mister/",
            "support": "supported"
          },
          {
            "name": "MiSTeX",
            "href": "platforms/mistex",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Retro Gaming OS",
        "platforms": [
          {
            "name": "Batocera",
            "href": "platforms/batocera/",
            "support": "supported"
          },
          {
            "name": "RePlayOS",
            "href": "platforms/replayos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Handheld and Gaming Linux",
        "platforms": [
          {
            "name": "SteamOS",
            "href": "platforms/steamos",
            "support": "supported"
          },
          {
            "name": "Bazzite",
            "href": "platforms/bazzite",
            "support": "supported"
          },
          {
            "name": "ChimeraOS",
            "href": "platforms/chimeraos",
            "support": "supported"
          }
        ]
      },
      {
        "name": "Media Center",
        "platforms": [
          {
            "name": "LibreELEC",
            "href": "platforms/libreelec",
            "support": "supported"
          }
        ]
      }
    ]
  }
} satisfies Record<string, PlatformSupportEntry>;

export type PlatformSupportReaderId = keyof typeof platformSupportByReader;
