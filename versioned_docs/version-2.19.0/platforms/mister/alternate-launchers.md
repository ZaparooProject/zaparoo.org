---
sidebar_position: 3
description: "Use alternate MiSTer cores with Zaparoo: RetroAchievements, DB9, LLAPI, PWM, overclock, DualRAM, Sinden, and unstable nightly launchers, with launcher groups and preferences."
keywords: [mister alternate cores zaparoo, mister retroachievements cores, mister llapi zaparoo, mister db9 cores, mister unstable nightlies zaparoo, launcher groups]
---

# Alternate Launchers


Some alternate or unofficial versions of cores are supported and can be used by explicitly setting a launcher in the ZapScript on a token. Zaparoo assumes they're installed in either the default location from Update All or in the appropriate menu folder.

To use them, add the following to the end of the file path or launch command: `?launcher=<launcher ID>`. For example: `N64/some/game.n64?launcher=80MHzNintendo64`

`NeoGeoPocketColor` uses the Kitrinx NGPC core when it is installed and the Jotego core otherwise. `HybridDVDPlayer` launches DVD images through the hybrid `_Other/DVD_Player` core instead of the FPGA DVD core.

To boot an alternate core without loading a game, give [`launch.system`](../../zapscript/launch.md#launchsystem) the same argument. Launcher IDs are matched case-insensitively:

```zapscript
**launch.system:Nintendo64?launcher=80MHzNintendo64
```

MiSTer launch commands also support `set_name` and `set_name_same_dir` advanced arguments. These map to MiSTer's MGL `<setname>` tag and `same_dir` attribute. Use `set_name_same_dir=1` when you want a separate config name while keeping the normal games folder. Without `set_name_same_dir=1`, MiSTer also uses the set name as the games folder.

```zapscript
NES/Mega Man 2.nes?set_name=RA_NES&set_name_same_dir=1
```

To set an alternate core as the default for all tokens of a launcher (instead of per-token), use the [`load_path`](../../core/config/launchers.md#launchersdefault) field in `config.toml`:

```toml
[[launchers.default]]
launcher = "Nintendo64"
load_path = "_LLAPI/N64_LLAPI"
```

`load_path` is an MGL-form RBF path relative to `/media/fat`, without extension. A config reload is sufficient after changing this. No service restart is required.

## Launcher groups

Every alternate core family is also a launcher group, so [`launchers.preference`](../../core/config/launchers.md#preference) can prefer a whole family and fall back to the regular core for systems that have no core from it installed:

```toml title="config.toml"
[launchers]
preference = ["Unstable", "RetroAchievements"]
```

| Group | Launchers |
|-------|-----------|
| `RetroAchievements` | `RA*` cores from `_RA_Cores/Cores` |
| `DB9` | `DB9*` cores |
| `LLAPI` | `LLAPI*` cores from `_LLAPI` |
| `DualRAM` | Dual-SDRAM cores, including `DB9DualRAMPSX`, `DB9DualRAMSaturn`, and `UnstableDualRAMSaturn` |
| `Sinden` | Sinden Lightgun cores |
| `PWM` | `PWM*` cores from `_ConsolePWM` |
| `Unstable` | `Unstable*` nightly cores |

A launcher is grouped by the RBF files it loads, so `DB9DualRAMPSX` belongs to both `DB9` and `DualRAM`.

## RetroAchievements

RetroAchievements cores from [Odelot's MiSTer FPGA RetroAchievements Cores](https://github.com/odelot/mister-cores) are supported when installed in `_RA_Cores/Cores`.

These launchers automatically use a dedicated `RA_*` set name so RetroAchievements cores keep independent MiSTer configuration. Core selects the appropriate `same_dir` behavior for each launcher, including systems that share another system's RBF. Games continue loading from their normal system folders; you do not need to move them into `RA_*` folders.

To use a RetroAchievements core by default for one system in [Zaparoo Frontend](../../frontend/browsing.mdx):

1. Highlight the system.
2. Open **Options**.
3. Select **Change launcher**.
4. Select the installed RetroAchievements launcher.

Frontend saves the selection as that system's default launcher. Select **Default** from the same menu to remove the override. Only launchers currently available from Core appear in the list.

All built-in RetroAchievements launchers belong to the `RetroAchievements` [launcher group](#launcher-groups), so one `launchers.preference` entry prefers them across every supported system.

| Launcher ID | System |
|-------------|--------|
| `RAAtari2600` | Atari 2600 |
| `RAAtari7800` | Atari 7800 |
| `RAFDS` | Famicom Disk System |
| `RAGameboy` | Game Boy |
| `RAGameboyColor` | Game Boy Color |
| `RAGameGear` | Game Gear |
| `RAGBA` | Game Boy Advance |
| `RAMegaDrive` | Genesis/Mega Drive |
| `RAMegaCD` | Mega CD |
| `RASMS` | Master System |
| `RANeoGeo` | Neo Geo |
| `RANeoGeoCD` | Neo Geo CD |
| `RANES` | NES |
| `RANintendo64` | Nintendo 64 |
| `RAPSX` | PlayStation |
| `RAS32X` | Sega 32X |
| `RASaturn` | Saturn |
| `RASNES` | SNES |
| `RASuperGameboy` | Super Game Boy |
| `RATurboGrafx16` | TurboGrafx-16 |
| `RATurboGrafx16CD` | TurboGrafx-16 CD |

## DB9

DB9 cores are alternate MiSTer cores for DB9 controller adapters. Install them in the matching `_Console` core locations, then select them with `?launcher=<launcher ID>` or a default launcher override.

| Launcher ID | System |
|-------------|--------|
| `DB9AdventureVision` | Adventure Vision |
| `DB9Astrocade` | Astrocade |
| `DB9Atari5200` | Atari 5200 |
| `DB9Atari7800` | Atari 7800 |
| `DB9AtariLynx` | Atari Lynx |
| `DB9CasioPV1000` | Casio PV-1000 |
| `DB9CDI` | CD-i |
| `DB9ColecoVision` | ColecoVision |
| `DB9CreatiVision` | CreatiVision |
| `DB9Gameboy` | Game Boy |
| `DB9Gameboy2P` | Game Boy 2P |
| `DB9GameNWatch` | Game & Watch |
| `DB9GBA` | Game Boy Advance |
| `DB9GBAAccuracy` | Game Boy Advance (accuracy) |
| `DB9GBA2P` | Game Boy Advance 2P |
| `DB9MegaDrive` | Mega Drive |
| `DB9Genesis` | Genesis |
| `DB9SMS` | Master System |
| `DB9MegaCD` | Mega CD |
| `DB9NeoGeo` | Neo Geo |
| `DB9NeoGeo24MHz` | Neo Geo (24 MHz) |
| `DB9NES` | NES |
| `DB9Odyssey2` | Odyssey 2 |
| `DB9PSX` | PlayStation |
| `DB9DualRAMPSX` | PlayStation (DualRAM) |
| `DB9Sega32X` | Sega 32X |
| `DB9SuperGameboy` | Super Game Boy |
| `DB9Saturn` | Saturn |
| `DB9DualRAMSaturn` | Saturn (DualRAM) |
| `DB9SNES` | SNES |
| `DB9TurboGrafx16` | TurboGrafx-16 |
| `DB9Vectrex` | Vectrex |

## LLAPI

Bliss-Box LLAPI cores. Alternate Arcade cores can be referenced directly with their `.mra` files.

| Launcher ID | System |
|-------------|--------|
| `LLAPIAtari2600` | Atari 2600 |
| `LLAPIAtari7800` | Atari 7800 |
| `LLAPIGameboy` | Game Boy |
| `LLAPIGBA` | Game Boy Advance |
| `LLAPIMegaDrive` | Genesis/Mega Drive |
| `LLAPISMS` | Master System |
| `LLAPIMegaCD` | Mega CD |
| `LLAPINeoGeo` | Neo Geo |
| `LLAPINES` | NES |
| `LLAPINintendo64` | Nintendo 64 |
| `LLAPI80MHzNintendo64` | Nintendo 64 (80MHz) |
| `LLAPIPSX` | PlayStation |
| `LLAPIS32X` | Sega 32X |
| `LLAPISuperGameboy` | Super Game Boy |
| `LLAPISaturn` | Saturn |
| `LLAPISNES` | SNES |
| `LLAPITurboGrafx16` | TurboGrafx-16 |
| `LLAPISuperGrafx` | SuperGrafx |

## PWM

24-bit video PWM cores.

| Launcher ID | System |
|-------------|--------|
| `PWMNintendo64` | Nintendo 64 |
| `PWM80MHzNintendo64` | Nintendo 64 (80MHz) |
| `PWMPSX` | PlayStation |
| `PWM2XPSX` | PlayStation (2X CPU) |
| `PWMSaturn` | Saturn |

## Overclock

Robert Piep's experimental overclock cores.

| Launcher ID | System |
|-------------|--------|
| `80MHzNintendo64` | Nintendo 64 |
| `2XPSX` | PlayStation |

## DualRAM

Dual-SDRAM cores from [TheJesusFish/Dual-Ram-Console-Cores](https://github.com/TheJesusFish/Dual-Ram-Console-Cores).

| Launcher ID | System |
|-------------|--------|
| `DualRAM3DO` | 3DO |
| `DualRAMJaguar` | Jaguar |
| `DualRAMPSX` | PlayStation |
| `DualRAMSaturn` | Saturn |

## Sinden Lightgun

Sinden Lightgun cores.

:::info
Zaparoo looks for Sinden cores in `Light Gun/<Core>-Sinden.rbf` first, then the legacy `_Sinden/<Core>_Sinden.rbf` path. If both paths exist, Zaparoo uses the `Light Gun` version.
:::

| Launcher ID | System |
|-------------|--------|
| `SindenGenesis` | Genesis |
| `SindenMegaDrive` | Mega Drive |
| `SindenSMS` | Master System |
| `SindenMegaCD` | Mega CD |
| `SindenNES` | NES |
| `SindenPSX` | PlayStation |
| `SindenSNES` | SNES |

## Unstable nightlies

Nightly builds from the [unstable nightlies](https://github.com/MiSTer-unstable-nightlies/Unstable_Folder_MiSTer) database, named `<core>_unstable_YYYYMMDD_<hash>.rbf`, get an `Unstable` launcher for every system their core serves, whether they sit in `_Unstable` or somewhere else. When several dated builds of one core exist, the newest is used. Select one with `?launcher=UnstableSNES`, or prefer the whole family with the `Unstable` [group](#launcher-groups).

Launcher IDs are `Unstable` followed by the system ID, such as `UnstableSNES`. Core knows the nightlies for 3DO, AcornAtom, AcornElectron, AliceMC10, AmigaCD32, Amstrad, AppleII, Atari2600, Atari7800, AtariLynx, C64, CDI, Chip8, ColecoVision, FDS, Gameboy, GameboyColor, GameGear, GBA, Genesis, MacPlus, MasterSystem, MegaCD, MegaDuck, MSX, NeoGeo, NeoGeoCD, NES, NESMusic, PSX, Saturn, Sega32X, SG1000, SNES, SNESMusic, SuperGrafx, TatungEinstein, TI994A, TurboGrafx16, TurboGrafx16CD, X68000, ZXNext, and ZXSpectrum, plus `UnstableDualRAMSaturn` for the dual-SDRAM Saturn nightly. Arcade nightlies have no launcher because arcade games launch through an MRA that names its own core.
