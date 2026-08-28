---
sidebar_position: 3
description: "Install Zaparoo on RePlayOS: launch games through the RePlayOS libretro frontend with NFC cards and other Zaparoo tokens."
keywords: [zaparoo replayos, replayos nfc, replayos game launcher zaparoo]
---

# RePlayOS

Zaparoo Core on [RePlayOS](https://www.replayos.com/) launches games and media through the RePlayOS libretro frontend.

## File Paths

| Item               | Path                                  |
| ------------------ | ------------------------------------- |
| Config file        | `/media/sd/zaparoo/config.toml`       |
| Data directory     | `/media/sd/zaparoo`                   |
| Log file           | `/media/sd/zaparoo/logs/core.log`     |
| Mappings directory | `/media/sd/zaparoo/mappings`          |

`/media/sd` is the persistent SD card partition and survives OS updates.

## Install

SSH into your RePlayOS device and run:

```bash
curl -fsSL https://zaparoo.org/install.sh | bash
```

This installs and enables the `zaparoo.service` systemd unit to run on startup. Once running, use the [Zaparoo App](/docs/app/) on your phone or the built-in web UI to manage your setup and write tokens.

## Uninstall

```bash
/media/sd/zaparoo/zaparoo -uninstall
```

## Readers

| Type | Reader | Support | Setup | Notes |
| ---- | ------ | ------- | ----- | ----- |
| NFC/RFID | [PN532 USB](../readers/nfc/pn532-usb.md) | Supported | Auto-detected |  |
| NFC/RFID | [PN532 Module](../readers/nfc/pn532-module.md) | Supported | Depends on wiring | UART can auto-detect. I2C is supported. |
| NFC/RFID | [ACR122U](../readers/nfc/acr122u.md) | Supported | Auto-detected | Uses libnfc: LED and beeper do not work, and some clone variants are incompatible. |
| NFC/RFID | [RC522](../readers/nfc/rc522.md) | Limited | Via Simple Serial | Requires a microcontroller; not a direct USB reader. |
| Barcode and QR | [App/Camera Scanner](../app/index.md) | Supported | Via Zaparoo App |  |
| Barcode and QR | [RS232 Scanner](../readers/barcode/rs232.md) | Supported | Manual config |  |
| Optical and Media | [Optical Drive](../readers/optical-drive.md) | Supported | Manual config |  |
| Optical and Media | [External Drive](../readers/external-drive.md) | Supported | Manual enable |  |
| Custom and Virtual | [MQTT Reader](../readers/mqtt.md) | Supported | Manual config |  |
| Custom and Virtual | [Simple Serial](../readers/simple-serial.md) | Supported | Manual config |  |
| Custom and Virtual | [File Reader](../readers/file.md) | Supported | Manual config |  |
| Displays and Integrations | [TTY2OLED](../readers/tty2oled.md) | Supported | Manual enable |  |

Each reader's page has setup steps and troubleshooting. See [readers](../readers/index.md) to compare them, or the [setup guide](/start/) to pick one for your setup.

## Launchers

| System ID                 | Folder               | Extensions                                                                                        |
| ------------------------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| `NES`                     | `nintendo_nes`       | `.nes`, `.unif`, `.unf`, `.fds`, `.zip`, `.7z`                                                    |
| `SNES`                    | `nintendo_snes`      | `.smc`, `.sfc`, `.swc`, `.fig`, `.bs`, `.st`, `.zip`, `.7z`                                       |
| `Gameboy`                 | `nintendo_gb`        | `.gb`, `.zip`, `.7z`                                                                              |
| `GameboyColor`            | `nintendo_gbc`       | `.gbc`, `.zip`, `.7z`                                                                             |
| `GBA`                     | `nintendo_gba`       | `.gba`, `.zip`, `.7z`                                                                             |
| `Nintendo64`              | `nintendo_n64`       | `.z64`, `.n64`, `.v64`, `.bin`, `.u1`, `.zip`, `.7z`                                              |
| `NDS`                     | `nintendo_ds`        | `.nds`, `.bin`, `.zip`, `.7z`                                                                     |
| `Genesis`                 | `sega_smd`           | `.bin`, `.gen`, `.md`, `.sg`, `.smd`, `.zip`, `.7z`                                               |
| `MasterSystem`            | `sega_sms`           | `.bin`, `.sms`, `.zip`, `.7z`                                                                     |
| `GameGear`                | `sega_gg`            | `.bin`, `.gg`, `.zip`, `.7z`                                                                      |
| `Sega32X`                 | `sega_32x`           | `.32x`, `.chd`, `.smd`, `.bin`, `.md`, `.zip`, `.7z`                                              |
| `MegaCD`                  | `sega_cd`            | `.cue`, `.iso`, `.chd`, `.m3u`                                                                    |
| `Dreamcast`               | `sega_dc`            | `.cdi`, `.cue`, `.gdi`, `.chd`, `.m3u`                                                            |
| `Saturn`                  | `sega_saturn`        | `.cue`, `.ccd`, `.m3u`, `.chd`, `.iso`, `.zip`                                                    |
| `SG1000`                  | `sega_sg1000`        | `.bin`, `.sg`, `.zip`, `.7z`                                                                      |
| `Arcade` (FBNeo)          | `arcade_fbneo`       | `.zip`, `.7z`                                                                                     |
| `Arcade` (MAME)           | `arcade_mame`        | `.zip`, `.7z`                                                                                     |
| `Arcade` (MAME 2003 Plus) | `arcade_mame_2k3p`   | `.zip`, `.7z`                                                                                     |
| `Atomiswave`              | `arcade_dc`          | `.zip`, `.chd`, `.lst`, `.bin`, `.dat`, `.7z`                                                     |
| `Atari2600`               | `atari_2600`         | `.a26`, `.bin`, `.zip`, `.7z`                                                                     |
| `Atari5200`               | `atari_5200`         | `.rom`, `.xfd`, `.atr`, `.atx`, `.cdm`, `.cas`, `.car`, `.bin`, `.a52`, `.xex`, `.zip`, `.7z`    |
| `Atari7800`               | `atari_7800`         | `.a78`, `.bin`, `.zip`, `.7z`                                                                     |
| `Jaguar`                  | `atari_jaguar`       | `.cue`, `.j64`, `.jag`, `.cof`, `.abs`, `.cdi`, `.rom`, `.zip`, `.7z`                            |
| `AtariLynx`               | `atari_lynx`         | `.lnx`, `.zip`, `.7z`                                                                             |
| `PSX`                     | `sony_psx`           | `.cue`, `.img`, `.mdf`, `.pbp`, `.toc`, `.cbn`, `.m3u`, `.ccd`, `.chd`, `.iso`                   |
| `TurboGrafx16`            | `nec_pce`            | `.pce`, `.bin`, `.zip`, `.7z`                                                                     |
| `TurboGrafx16CD`          | `nec_pcecd`          | `.pce`, `.cue`, `.ccd`, `.iso`, `.img`, `.chd`                                                    |
| `NeoGeo`                  | `snk_neogeo`         | `.7z`, `.zip`                                                                                     |
| `NeoGeoCD`                | `snk_neocd`          | `.cue`, `.iso`, `.chd`                                                                            |
| `NeoGeoPocket`            | `snk_ngp`            | `.ngp`, `.zip`, `.7z`                                                                             |
| `C64`                     | `commodore_c64`      | `.d64`, `.d81`, `.crt`, `.prg`, `.tap`, `.t64`, `.m3u`, `.zip`, `.7z`                            |
| `Amiga`                   | `commodore_ami`      | `.adf`, `.uae`, `.ipf`, `.dms`, `.dmz`, `.adz`, `.lha`, `.hdf`, `.exe`, `.m3u`, `.zip`           |
| `AmigaCD32`               | `commodore_amicd`    | `.bin`, `.cue`, `.iso`, `.chd`                                                                    |
| `MSX1`                    | `msx_msx`            | `.dsk`, `.mx1`, `.rom`, `.zip`, `.7z`, `.cas`, `.m3u`                                             |
| `MSX2`                    | `msx_msx2`           | `.dsk`, `.mx2`, `.rom`, `.zip`, `.7z`, `.cas`, `.m3u`                                             |
| `ZXSpectrum`              | `sinclair_zxs`       | `.tzx`, `.tap`, `.z80`, `.rzx`, `.scl`, `.trd`, `.dsk`, `.zip`, `.7z`                            |
| `X68000`                  | `sharp_x68k`         | `.dim`, `.img`, `.d88`, `.88d`, `.hdm`, `.dup`, `.2hd`, `.xdf`, `.hdf`, `.cmd`, `.m3u`, `.zip`, `.7z` |
| `3DO`                     | `panasonic_3do`      | `.iso`, `.chd`, `.cue`                                                                            |
| `CDI`                     | `philips_cdi`        | `.chd`, `.cue`, `.toc`, `.nrg`, `.gdi`, `.iso`, `.cdr`                                           |
| `DOS`                     | `pc_dos`             | `.pc`, `.dos`, `.zip`, `.squashfs`, `.dosz`, `.m3u`, `.iso`, `.cue`                               |
| `ScummVM`                 | `pc_scummvm`         | `.scummvm`, `.squashfs`                                                                           |
| `Amstrad`                 | `amstrad_cpc`        | `.dsk`, `.sna`, `.tap`, `.cdt`, `.voc`, `.cpr`, `.zip`, `.7z`                                    |
| `Video`                   | `alpha_player`       | `.mkv`, `.avi`, `.mp4`, `.flac`, `.ogg`, `.nsf`, `.vgm`                                          |

### Shell Scripts

Run `.sh` scripts. Scripts must be allow-listed via the [`allow_file`](../core/config.md#allow_file) setting in `config.toml`.
