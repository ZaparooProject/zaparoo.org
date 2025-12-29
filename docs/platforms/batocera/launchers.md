# Launchers

Batocera uses EmulationStation as its primary launcher. Games are stored in `/userdata/roms/<folder>/` and automatically detected during media indexing.

## EmulationStation

The built-in EmulationStation launcher supports all systems listed below. Each system maps to one or more folders in `/userdata/roms/`.

### Supported Systems

| System ID | Folders | Extensions |
|-----------|---------|------------|
| `3DO` | `3do` | `.iso`, `.chd`, `.cue` |
| `3DS` | `3ds` | `.3ds`, `.cci`, `.cxi` |
| `Amiga` | `amigacdtv` | `.bin`, `.cue`, `.iso`, `.chd`, `.m3u` |
| `Amiga500` | `amiga500` | `.adf`, `.uae`, `.ipf`, `.dms`, `.dmz`, `.adz`, `.lha`, `.hdf`, `.exe`, `.m3u`, `.zip` |
| `Amiga1200` | `amiga1200` | `.adf`, `.uae`, `.ipf`, `.dms`, `.dmz`, `.adz`, `.lha`, `.hdf`, `.exe`, `.m3u`, `.zip` |
| `AmigaCD32` | `amigacd32` | `.bin`, `.cue`, `.iso`, `.chd` |
| `Amstrad` | `amstradcpc`, `gx4000` | `.dsk`, `.sna`, `.tap`, `.cdt`, `.voc`, `.m3u`, `.zip`, `.7z`, `.cpr` |
| `AcornAtom` | `atom` | `.wav`, `.tap`, `.csw`, `.uef`, `.mfi`, `.dfi`, `.hfe`, `.mfm`, `.td0`, `.imd`, `.d77`, `.d88`, `.1dd`, `.cqm`, `.cqi`, `.dsk`, `.40t`, `.atm`, `.bin`, `.rom`, `.zip`, `.7z` |
| `AcornElectron` | `electron` | `.wav`, `.csw`, `.uef`, `.mfi`, `.dfi`, `.hfe`, `.mfm`, `.td0`, `.imd`, `.d77`, `.d88`, `.1dd`, `.cqm`, `.cqi`, `.dsk`, `.ssd`, `.bbc`, `.img`, `.dsd`, `.adf`, `.ads`, `.adm`, `.adl`, `.rom`, `.bin`, `.zip`, `.7z` |
| `AdventureVision` | `advision` | `.bin`, `.zip`, `.7z` |
| `AppleII` | `apple2`, `apple2gs` | `.nib`, `.do`, `.po`, `.dsk`, `.mfi`, `.dfi`, `.rti`, `.edd`, `.woz`, `.wav`, `.zip`, `.7z` |
| `Arcade` | `arcade`, `mame`, `fbneo`, `apfm1000`, `cannonball`, `cave3rd`, `gong`, `systemsp` | `.zip`, `.7z`, `.cannonball`, `.game` |
| `Arcadia` | `arcadia` | `.bin`, `.zip`, `.7z` |
| `Archimedes` | `archimedes` | `.mfi`, `.dfi`, `.hfe`, `.mfm`, `.td0`, `.imd`, `.d77`, `.d88`, `.1dd`, `.cqm`, `.cqi`, `.dsk`, `.ima`, `.img`, `.ufi`, `.360`, `.ipf`, `.adf`, `.apd`, `.jfd`, `.ads`, `.adm`, `.adl`, `.ssd`, `.bbc`, `.dsd`, `.st`, `.msa`, `.chd`, `.zip`, `.7z` |
| `Arduboy` | `arduboy` | `.hex`, `.zip`, `.7z` |
| `Astrocade` | `astrocde` | `.bin`, `.zip`, `.7z` |
| `Atari2600` | `atari2600` | `.a26`, `.bin`, `.zip`, `.7z` |
| `Atari5200` | `atari5200` | `.rom`, `.xfd`, `.atr`, `.atx`, `.cdm`, `.cas`, `.car`, `.bin`, `.a52`, `.xex`, `.zip`, `.7z` |
| `Atari7800` | `atari7800` | `.a78`, `.bin`, `.zip`, `.7z` |
| `Atari800` | `atari800` | `.rom`, `.xfd`, `.atr`, `.atx`, `.cdm`, `.cas`, `.car`, `.bin`, `.a52`, `.xex`, `.zip`, `.7z` |
| `AtariLynx` | `lynx` | `.lnx`, `.zip`, `.7z` |
| `AtariST` | `atarist` | `.st`, `.msa`, `.stx`, `.dim`, `.ipf`, `.m3u`, `.zip`, `.7z` |
| `AtariXEGS` | `xegs` | `.atr`, `.dsk`, `.xfd`, `.bin`, `.rom`, `.car`, `.zip`, `.7z` |
| `Atomiswave` | `atomiswave` | `.lst`, `.bin`, `.dat`, `.zip`, `.7z` |
| `Audio` | `vgmplay` | `.vgm`, `.vgz` |
| `BBCMicro` | `bbc` | `.mfi`, `.dfi`, `.hfe`, `.mfm`, `.td0`, `.imd`, `.d77`, `.d88`, `.1dd`, `.cqm`, `.cqi`, `.dsk`, `.ima`, `.img`, `.ufi`, `.360`, `.ipf`, `.ssd`, `.bbc`, `.dsd`, `.adf`, `.ads`, `.adm`, `.adl`, `.fsd`, `.wav`, `.tap`, `.bin`, `.zip`, `.7z` |
| `C16` | `cplus4` | `.d64`, `.prg`, `.tap`, `.m3u`, `.zip`, `.7z` |
| `C64` | `c64`, `c128` | `.d64`, `.d81`, `.crt`, `.prg`, `.tap`, `.t64`, `.lnx`, `.m3u`, `.zip`, `.7z` |
| `CasioPV1000` | `pv1000` | `.bin`, `.zip`, `.7z` |
| `CDI` | `cdi` | `.chd`, `.cue`, `.toc`, `.nrg`, `.gdi`, `.iso`, `.cdr` |
| `ChannelF` | `channelf` | `.zip`, `.rom`, `.bin`, `.chf` |
| `Chihiro` | `chihiro` | `.chd` |
| `CoCo2` | `coco` | `.wav`, `.cas`, `.ccc`, `.rom`, `.zip`, `.7z` |
| `ColecoAdam` | `adam` | `.wav`, `.ddp`, `.mfi`, `.dfi`, `.hfe`, `.mfm`, `.td0`, `.imd`, `.d77`, `.d88`, `.1dd`, `.cqm`, `.cqi`, `.dsk`, `.rom`, `.col`, `.bin`, `.zip`, `.7z` |
| `ColecoVision` | `colecovision` | `.bin`, `.col`, `.rom`, `.zip`, `.7z` |
| `CommanderX16` | `commanderx16` | `.prg`, `.crt`, `.bin`, `.zip` |
| `CreatiVision` | `crvision` | `.bin`, `.rom`, `.zip`, `.7z` |
| `DAPHNE` | `daphne` | `.daphne`, `.squashfs` |
| `DICE` | `dice` | `.zip`, `.dmy` |
| `DOS` | `dos`, `abuse`, `bstone`, `catacomb`, `cdogs`, `cgenius`, `dxx-rebirth`, `ecwolf`, `eduke32`, `fury`, `gzdoom`, `prboom`, `raze`, `rott`, `tyrian` | `.pc`, `.dos`, `.zip`, `.squashfs`, `.dosz`, `.m3u`, `.iso`, `.cue`, `.bstone`, `.game`, `.d1x`, `.d2x`, `.ecwolf`, `.pk3`, `.eduke32`, `.grp`, `.wad`, `.iwad`, `.pwad`, `.gzdoom`, `.raze`, `.rott` |
| `Dreamcast` | `dreamcast` | `.cdi`, `.cue`, `.gdi`, `.chd`, `.m3u` |
| `FDS` | `fds` | `.fds`, `.zip`, `.7z` |
| `FM7` | `fm7` | `.wav`, `.t77`, `.mfi`, `.dfi`, `.hfe`, `.mfm`, `.td0`, `.imd`, `.d77`, `.d88`, `.1dd`, `.cqm`, `.cqi`, `.dsk`, `.zip`, `.7z` |
| `FMTowns` | `fmtowns` | `.bin`, `.m3u`, `.cue`, `.d88`, `.d77`, `.xdf`, `.iso`, `.chd`, `.toc`, `.nrg`, `.gdi`, `.cdr`, `.mfi`, `.dfi`, `.hfe`, `.mfm`, `.td0`, `.imd`, `.1dd`, `.cqm`, `.cqi`, `.dsk`, `.zip`, `.7z` |
| `Gaelco` | `gaelco` | `.zip` |
| `Gamate` | `gamate` | `.bin`, `.zip`, `.7z` |
| `GameCom` | `gamecom` | `.bin`, `.tgc`, `.zip`, `.7z` |
| `GameCube` | `gamecube` | `.gcm`, `.iso`, `.gcz`, `.ciso`, `.wbfs`, `.rvz`, `.elf`, `.dol`, `.m3u` |
| `GameGear` | `gamegear` | `.bin`, `.gg`, `.zip`, `.7z` |
| `GameMaster` | `gmaster` | `.bin`, `.zip`, `.7z` |
| `GameNWatch` | `gameandwatch`, `lcdgames` | `.mgw`, `.zip`, `.7z` |
| `GamePocket` | `gamepock` | `.bin`, `.zip`, `.7z` |
| `Gameboy` | `gb` | `.gb`, `.zip`, `.7z` |
| `Gameboy2P` | `gb2players`, `gbc2players` | `.gb`, `.gb2`, `.gbc2`, `.gbc`, `.zip`, `.7z` |
| `GameboyColor` | `gbc` | `.gbc`, `.zip`, `.7z` |
| `GBA` | `gba` | `.gba`, `.zip`, `.7z` |
| `Genesis` | `megadrive`, `pico`, `sonic3-air`, `sonicretro` | `.bin`, `.gen`, `.md`, `.sg`, `.smd`, `.zip`, `.7z`, `.sonic3air`, `.sonicretro` |
| `GenesisMSU` | `msu-md` | `.msu`, `.md` |
| `GP32` | `gp32` | `.smc`, `.zip`, `.7z` |
| `Hikaru` | `hikaru` | `.chd`, `.zip` |
| `Image` | `imageviewer` | `.jpg`, `.png`, `.gif`, `.bmp` |
| `Intellivision` | `intellivision` | `.int`, `.bin`, `.rom`, `.zip`, `.7z` |
| `J2ME` | `j2me` | `.jar` |
| `Jaguar` | `jaguar` | `.cue`, `.j64`, `.jag`, `.cof`, `.abs`, `.cdi`, `.rom`, `.zip`, `.7z` |
| `JaguarCD` | `jaguarcd` | `.cue`, `.chd` |
| `Laser` | `laser310` | `.vz`, `.wav`, `.cas`, `.zip`, `.7z` |
| `Lindbergh` | `lindbergh` | `.zip` |
| `Lynx48` | `camplynx` | `.wav`, `.tap`, `.zip`, `.7z` |
| `MacOS` | `macintosh` | `.dsk`, `.zip`, `.7z`, `.mfi`, `.dfi`, `.hfe`, `.mfm`, `.td0`, `.imd`, `.d77`, `.d88`, `.1dd`, `.cqm`, `.cqi`, `.ima`, `.img`, `.ufi`, `.ipf`, `.dc42`, `.woz`, `.2mg`, `.360`, `.chd`, `.cue`, `.toc`, `.nrg`, `.gdi`, `.iso`, `.cdr`, `.hd`, `.hdv`, `.hdi` |
| `MasterSystem` | `mastersystem` | `.bin`, `.sms`, `.zip`, `.7z` |
| `MegaCD` | `megacd` | `.cue`, `.iso`, `.chd`, `.m3u` |
| `MegaDuck` | `megaduck` | `.bin`, `.zip`, `.7z` |
| `Model1` | `model1` | `.zip` |
| `Model2` | `model2` | `.zip` |
| `Model3` | `model3` | `.zip` |
| `MSX` | `msx1`, `msx2`, `msxturbor` | `.dsk`, `.mx1`, `.mx2`, `.rom`, `.zip`, `.7z`, `.cas`, `.m3u` |
| `MSX2Plus` | `msx2+` | `.dsk`, `.mx2`, `.rom`, `.zip`, `.7z`, `.cas`, `.m3u` |
| `Multivision` | `multivision` | `.bin`, `.gg`, `.rom`, `.sg`, `.sms`, `.zip` |
| `NAOMI` | `naomi` | `.lst`, `.bin`, `.dat`, `.zip`, `.7z` |
| `NAOMI2` | `naomi2` | `.zip`, `.7z` |
| `Namco22` | `namco22` | `.zip` |
| `Namco2X6` | `namco2x6` | `.zip` |
| `NDS` | `nds` | `.nds`, `.bin`, `.zip`, `.7z` |
| `NeoGeo` | `neogeo` | `.7z`, `.zip` |
| `NeoGeoCD` | `neogeocd` | `.cue`, `.iso`, `.chd` |
| `NeoGeoPocket` | `ngp` | `.ngp`, `.zip`, `.7z` |
| `NeoGeoPocketColor` | `ngpc` | `.ngc`, `.zip`, `.7z` |
| `NES` | `nes` | `.nes`, `.unif`, `.unf`, `.zip`, `.7z` |
| `NGage` | `ngage` | `.ngage`, `.jar` |
| `Nintendo64` | `n64`, `n64dd` | `.z64`, `.n64`, `.v64`, `.zip`, `.7z`, `.z64.ndd` |
| `Odyssey2` | `o2em` | `.bin`, `.zip`, `.7z` |
| `Oric` | `oricatmos` | `.dsk`, `.tap` |
| `PC` | `bennugd`, `cavestory`, `corsixth`, `devilutionx`, `doom3`, `easyrpg`, `etlegacy`, `flash`, `hcl`, `hurrican`, `iortcw`, `jazz2`, `jkdf2`, `jknight`, `library`, `lowresnx`, `lutro`, `mohaa`, `moonlight`, `mrboom`, `odcommander`, `openjazz`, `ports`, `pygame`, `quake`, `quake2`, `quake3`, `reminiscence`, `sdlpop`, `solarus`, `sonic-mania`, `superbroswar`, `theforceengine`, `thextech`, `traider1`, `traider2`, `tyrquake`, `uqm`, `uzebox`, `vemulator`, `vircon32`, `vis`, `wasm4`, `flatpak`, `steam`, `xash3d_fwgs`, `xrick`, `zc210`, `pyxel` | Various |
| `PC88` | `pc88` | `.d88`, `.u88`, `.m3u` |
| `PC98` | `pc98` | `.d98`, `.zip`, `.98d`, `.fdi`, `.fdd`, `.2hd`, `.tfd`, `.d88`, `.88d`, `.hdm`, `.xdf`, `.dup`, `.cmd`, `.hdi`, `.thd`, `.nhd`, `.hdd`, `.hdn`, `.m3u` |
| `PCFX` | `pcfx` | `.cue`, `.ccd`, `.toc`, `.chd`, `.zip`, `.7z` |
| `PDP1` | `pdp1` | `.zip`, `.7z`, `.tap`, `.rim`, `.drm` |
| `PET2001` | `pet` | `.a0`, `.b0`, `.crt`, `.d64`, `.d81`, `.prg`, `.tap`, `.t64`, `.m3u`, `.zip`, `.7z` |
| `Pico8` | `pico8` | `.p8`, `.png`, `.m3u` |
| `PlugNPlay` | `plugnplay` | `.game` |
| `PokemonMini` | `pokemini` | `.min`, `.zip`, `.7z` |
| `PS2` | `ps2` | `.iso`, `.mdf`, `.nrg`, `.bin`, `.img`, `.dump`, `.gz`, `.cso`, `.chd`, `.m3u` |
| `PS3` | `ps3` | `.ps3`, `.psn`, `.squashfs` |
| `PS4` | `ps4` | `.ps4` |
| `PSP` | `psp` | `.iso`, `.cso`, `.pbp`, `.chd` |
| `PSX` | `psx` | `.cue`, `.img`, `.mdf`, `.pbp`, `.toc`, `.cbn`, `.m3u`, `.ccd`, `.chd`, `.iso` |
| `SAMCoupe` | `samcoupe` | `.cpm`, `.dsk`, `.sad`, `.mgt`, `.sdf`, `.td0`, `.sbt`, `.zip` |
| `Saturn` | `saturn` | `.cue`, `.ccd`, `.m3u`, `.chd`, `.iso`, `.zip` |
| `ScummVM` | `scummvm` | `.scummvm`, `.squashfs` |
| `Sega32X` | `sega32x` | `.32x`, `.chd`, `.smd`, `.bin`, `.md`, `.zip`, `.7z` |
| `SG1000` | `sg1000`, `scv` | `.bin`, `.sg`, `.zip`, `.7z`, `.0` |
| `SGBMSU1` | `sgb-msu1` | `.gb`, `.gbc`, `.zip`, `.7z` |
| `Singe` | `singe` | `.singe` |
| `SNES` | `snes`, `satellaview` | `.smc`, `.fig`, `.sfc`, `.gd3`, `.gd7`, `.dx2`, `.bsx`, `.swc`, `.zip`, `.7z`, `.bs` |
| `SNESMSU1` | `snes-msu1` | `.smc`, `.fig`, `.sfc`, `.gd3`, `.gd7`, `.dx2`, `.bsx`, `.swc`, `.zip`, `.7z`, `.squashfs` |
| `Socrates` | `socrates` | `.bin`, `.zip` |
| `Spectravideo` | `spectravideo` | `.cas`, `.rom`, `.ri`, `.mx1`, `.mx2`, `.dsk`, `.zip` |
| `Sufami` | `sufami` | `.st`, `.zip` |
| `SuperACan` | `supracan` | `.bin`, `.zip` |
| `SuperGameboy` | `sgb` | `.gb`, `.gbc`, `.zip`, `.7z` |
| `SuperGrafx` | `supergrafx` | `.pce`, `.sgx`, `.cue`, `.ccd`, `.chd`, `.zip`, `.7z` |
| `SuperVision` | `supervision` | `.sv`, `.zip`, `.7z` |
| `Switch` | `switch` | `.xci`, `.nsp` |
| `Thomson` | `thomson` | `.fd`, `.sap`, `.k7`, `.m7`, `.m5`, `.rom`, `.zip` |
| `TI994A` | `ti99` | `.rpk`, `.wav`, `.zip`, `.7z` |
| `TIC80` | `tic80` | `.tic` |
| `TomyTutor` | `tutor` | `.bin`, `.wav`, `.zip`, `.7z` |
| `Triforce` | `triforce` | `.iso`, `.gcz` |
| `TurboGrafx16` | `pcengine` | `.pce`, `.bin`, `.zip`, `.7z` |
| `TurboGrafx16CD` | `pcenginecd` | `.pce`, `.cue`, `.ccd`, `.iso`, `.img`, `.chd` |
| `VC4000` | `vc4000` | `.bin`, `.rom`, `.pgm`, `.tvc`, `.zip`, `.7z` |
| `Vectrex` | `vectrex` | `.bin`, `.gam`, `.vec`, `.zip`, `.7z` |
| `VIC20` | `c20` | `.a0`, `.b0`, `.crt`, `.d64`, `.d81`, `.prg`, `.tap`, `.t64`, `.m3u`, `.zip`, `.7z` |
| `Video` | `recordings` | `.mp4`, `.avi`, `.mkv` |
| `VideopacPlus` | `videopacplus` | `.bin`, `.zip` |
| `VirtualBoy` | `virtualboy` | `.vb`, `.zip`, `.7z` |
| `Vita` | `psvita` | `.zip`, `.psvita` |
| `VSmile` | `vsmile` | `.zip`, `.7z` |
| `Wii` | `wii` | `.gcm`, `.iso`, `.gcz`, `.ciso`, `.wbfs`, `.wad`, `.rvz`, `.elf`, `.dol`, `.m3u`, `.json` |
| `WiiU` | `wiiu` | `.wua`, `.wup`, `.wud`, `.wux`, `.rpx`, `.squashfs`, `.wuhb` |
| `Windows` | `wine`, `windows`, `windows_installers`, `fallout1-ce`, `fallout2-ce` | `.wine`, `.exe`, `.bat`, `.msi`, `.f1ce`, `.f2ce` |
| `WonderSwan` | `wswan` | `.ws`, `.zip`, `.7z` |
| `WonderSwanColor` | `wswanc` | `.wsc`, `.zip`, `.7z` |
| `X1` | `x1` | `.dx1`, `.zip`, `.2d`, `.2hd`, `.tfd`, `.d88`, `.88d`, `.hdm`, `.xdf`, `.dup`, `.cmd`, `.7z` |
| `X68000` | `x68000` | `.dim`, `.img`, `.d88`, `.88d`, `.hdm`, `.dup`, `.2hd`, `.xdf`, `.hdf`, `.cmd`, `.m3u`, `.zip`, `.7z` |
| `Xbox` | `xbox` | `.iso`, `.squashfs` |
| `Xbox360` | `xbox360` | `.iso`, `.xex`, `.xbox360`, `.zar` |
| `ZX81` | `zx81` | `.tzx`, `.p`, `.zip`, `.7z` |
| `ZXSpectrum` | `zxspectrum` | `.tzx`, `.tap`, `.z80`, `.rzx`, `.scl`, `.trd`, `.dsk`, `.zip`, `.7z` |

### Additional Game Engines

These folders run games through standalone game engines:

| Folder | Description | Extensions |
|--------|-------------|------------|
| `ikemen` | Ikemen GO fighting game engine | `.ikemen` |
| `mugen` | M.U.G.E.N fighting game engine | `.mugen` |
| `openbor` | OpenBOR beat 'em up engine | `.pak` |
| `vpinball` | Visual Pinball | `.vpx`, `.vpt` |

## Kodi

Media playback through Kodi is available when the Kodi JSON-RPC API is enabled. Kodi must be running for these launchers to work.

### Local Files

These launchers play files directly from disk:

| System ID | Folders | Extensions |
|-----------|---------|------------|
| `Video` | `videos`, `tvshows` | `.avi`, `.mp4`, `.mkv`, `.iso`, `.bdmv`, `.ifo`, `.mpeg`, `.mpg`, `.mov`, `.wmv`, `.flv`, `.webm`, `.m4v`, `.3gp`, `.ts`, `.m2ts`, `.mts`, `.m3u`, `.m3u8` |
| `MusicTrack` | `music` | `.mp3`, `.flac`, `.ogg`, `.m4a`, `.wav`, `.wma`, `.aac`, `.opus` |

### Library Media

These launchers play media from Kodi's indexed library. They don't scan filesystem folders - instead they query Kodi's database during media indexing.

| System ID | Description |
|-----------|-------------|
| `Movie` | Movies from Kodi library |
| `TVEpisode` | Individual TV episodes |
| `TVShow` | Entire TV show (plays next unwatched episode) |
| `MusicTrack` | Songs from Kodi music library |
| `MusicAlbum` | Albums from Kodi music library |
| `MusicArtist` | Artists from Kodi music library (plays all songs) |

### Configuration

Configure the Kodi server URL in `config.toml`:

```toml
[[launchers.default]]
launcher = "Kodi"
server_url = "http://localhost:8080"
```

If Kodi requires authentication, add credentials to `auth.toml`:

```toml
[creds."http://localhost:8080"]
username = "kodi"
password = "your_password"
```

See [LibreELEC](../libreelec.md) for detailed Kodi API setup instructions.

## Shell Scripts

Custom shell scripts (`.sh` files) can be launched directly. Scripts must be added to the `allow_file` list in `config.toml`.

```toml
[launchers]
allow_file = [
    "^/userdata/roms/.*\\.sh$"
]
```

Restart Zaparoo after modifying the config for changes to take effect.
