---
description: "Use an Epilogue GB, SN, or 64 Operator to launch original cartridges on MiSTer through Zaparoo."
keywords: [epilogue operator mister, gb operator mister, sn operator mister, 64 operator mister]
---

# Epilogue Operator

[Epilogue](https://www.epilogue.co/) Operator cartridge readers can launch original cartridges through Zaparoo on MiSTer.

<PlatformSupport
  groups={[
    {
      name: "Base OS",
      platforms: [
        { name: "Windows", href: "../platforms/windows/", support: "unsupported" },
        { name: "macOS", href: "../platforms/mac", support: "unsupported" },
        { name: "Linux", href: "../platforms/linux/", support: "unsupported" },
      ],
    },
    {
      name: "FPGA",
      platforms: [
        { name: "MiSTer", href: "../platforms/mister/", support: "supported" },
        { name: "MiSTeX", href: "../platforms/mistex", support: "unsupported" },
      ],
    },
    {
      name: "Retro Gaming OS",
      platforms: [
        { name: "Batocera", href: "../platforms/batocera/", support: "unsupported" },
        { name: "RePlayOS", href: "../platforms/replayos", support: "unsupported" },
      ],
    },
    {
      name: "Handheld and Gaming Linux",
      platforms: [
        { name: "SteamOS", href: "../platforms/steamos", support: "unsupported" },
        { name: "Bazzite", href: "../platforms/bazzite", support: "unsupported" },
        { name: "ChimeraOS", href: "../platforms/chimeraos", support: "unsupported" },
      ],
    },
    {
      name: "Media Center",
      platforms: [
        { name: "LibreELEC", href: "../platforms/libreelec", support: "unsupported" },
      ],
    },
  ]}
/>

## Supported readers

| Reader | Cartridges |
| ------ | ---------- |
| [GB Operator](https://www.epilogue.co/product/gb-operator) | Game Boy, Game Boy Color, Game Boy Advance |
| [SN Operator](https://www.epilogue.co/product/sn-operator) | Super Nintendo |
| [64 Operator](https://www.epilogue.co/) | Nintendo 64 |

## Setup

1. Update to Zaparoo Core v2.16.0 or later.
2. Download the latest package from the [official bridge releases](https://github.com/epilogue-co/zaparoo-operator/releases).
3. Extract the entire archive to the root of the MiSTer SD card.
4. Open **F12 > Scripts > Operator** and run the initial setup.
5. Connect the Operator over USB and insert a cartridge.

Core detects the bridge automatically. No `config.toml` changes are needed.

## Troubleshooting

- If setup cannot find bridge files, extract the entire archive, including the hidden `Scripts/.operator` folder.
- If Core does not detect the reader, confirm `/media/fat/Scripts/Operator.sh` exists, reader auto-detection is enabled, and the bridge is running.
- Use **Status snapshot** in the Operator script to collect details for an issue report.

See the [official Epilogue bridge repository](https://github.com/epilogue-co/zaparoo-operator) for updates and support.
