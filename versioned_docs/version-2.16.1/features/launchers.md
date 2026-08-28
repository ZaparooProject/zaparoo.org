---
sidebar_position: 10
title: Launchers
description: Create custom launchers and use launcher controls in Zaparoo to integrate emulators and media applications.
keywords: [zaparoo launchers, zaparoo custom launchers, zaparoo launcher controls, zaparoo emulator integration, custom launcher toml]
---

# Launchers

A launcher tells Zaparoo Core how to open a game, video, app, or other media file.
Each [platform](../platforms/index.mdx) has its own launchers for matching a [system](./systems.md) and file to the right program.

## Loading games

Core first adds installed games and media files to its [media database](./scraping.md#updating-the-media-database). It then uses the matching platform launcher when you scan a token or select a search result. If a game is missing from search, update the media database. If the game appears but does not open, check its platform launcher guide for required software and setup.

## Platform launcher guides

Use your platform guide for exact setup, supported systems, and launcher limitations. Built-in integrations include:

| Platform | Launcher integrations |
| -------- | --------------------- |
| [MiSTer FPGA](../platforms/mister/launchers.md) | MiSTer cores, AO486, ScummVM, video, and scripts |
| [Windows](../platforms/windows/launchers.md) | Steam, LaunchBox/Big Box, RetroBat, Flashpoint, Kodi, executables, and scripts |
| [Linux](../platforms/linux/launchers.md) | Steam, Lutris, Heroic, RetroArch, Kodi, browser URLs, and scripts |
| [SteamOS](../platforms/steamos/launchers.md) | Steam, native emulators, RetroArch, EmuDeck, RetroDECK, Kodi, and scripts |
| [Bazzite](../platforms/bazzite.mdx#launchers) | Steam, Lutris, Heroic, Kodi, browser URLs, and scripts |
| [Batocera](../platforms/batocera/launchers.md) | EmulationStation, Kodi, and scripts |

For an emulator or media app without a built-in integration, write a [custom launcher](./custom-launchers.md).

## Launchables

Some things can be launched but don't map cleanly to a file on disk or a normal [system](./systems.md), like a ROM-less FPGA core. Launchables are how Core handles these. Core defines them in code and exposes them as virtual versions of the things you already use: a virtual system or a virtual media entry, whichever fits.

You don't deal with launchables as a separate concept. They show up in the [Zaparoo App](../app/index.md) as ordinary systems or media that you can browse, pick, and write to a token like anything else. The only difference is that there is no real file or system behind them.

MiSTer's ROM-less [Other cores](../platforms/mister/launchers.md#other-cores), like Chess or Flappy Bird, are the first example. They have no game file and no system of their own, so Core exposes each one as a virtual system and indexes the ones you have installed.

The one place this shows through is the token value. A launchable is identified by a compact `zaparoo://` URI instead of a file path, so a token that launches one holds a value like `zaparoo://gezdgnbvgy3tqojqgezdgnbvgy` rather than a normal path. You don't write this by hand; the App fills it in when you save a launchable.

### Create a command launchable

A custom launcher can expose a command as a virtual system on any Core platform. Add an entry to a launcher TOML file in Core's `launchers` directory:

```toml
[[launchers.custom]]
id = "Tools"
kind = "virtual_system"
backend = "command"
name = "Tools"
category = "Computer"
execute = "echo tools"
```

The virtual system appears in browse and search without needing a media file. Selecting it runs `execute`. Valid categories are `Other`, `Console`, `Computer`, `Handheld`, and `Arcade`; `Other` is used when `category` is omitted.

Core derives a stable launchable identity from `backend` and `id`, so keep those values unchanged if you want App display settings and artwork to stay attached to the entry. Restart Core or refresh the launchers, then update the media database after adding a virtual system.

For MiSTer cores that launch without media, use the [`mister_core` backend](../platforms/mister/launchers.md#add-your-own-other-core) instead.

## Launcher controls

Launcher controls send actions to the launcher handling the currently active media. Use them for actions like pause, stop, save state, load state, fast forward, rewind, or next and previous track.

Control support depends on the active launcher. If no media is active, or the launcher does not support the requested action, the command returns an error.

:::note Control support varies
Each launcher supports its own set of actions. Check the active media response to see which controls are available.
:::

### How control actions work

Zaparoo Core asks the active launcher to run a named control action. Official launchers can implement controls directly. [Custom launchers](./custom-launchers.md#controls) can define controls as ZapScript snippets in their launcher configuration.

When Core can tell that media is still starting, the `control` command waits before sending the action.

Built-in action names include:

| Action | Typical use |
| ------ | ----------- |
| `toggle_pause` | Pause or unpause active media |
| `pause` | Pause active media |
| `resume` | Resume active media |
| `save_state` | Save emulator state |
| `load_state` | Load emulator state |
| `save_ram` | Save RAM data |
| `toggle_menu` | Open or close an in-game menu |
| `reset` | Reset active media |
| `stop` | Stop active media |
| `fast_forward` | Fast forward |
| `rewind` | Rewind |
| `next` | Move to the next item |
| `previous` | Move to the previous item |

Not every launcher supports every action. Use the [`media`](../core/api/methods.md#media) or [`media.active`](../core/api/methods.md#mediaactive) API response to check the `launcherControls` available for the current media.

### Current support

Built-in launcher support currently includes:

| Launcher | Supported actions |
| -------- | ----------------- |
| Kodi launchers: `KodiLocalVideo`, `KodiMovie`, `KodiTVEpisode`, `KodiLocalAudio`, `KodiAlbum`, `KodiArtist`, `KodiTVShow`, `KodiSong` | `toggle_pause`, `stop`, `fast_forward`, `rewind`, `next`, `previous` |
| Built-in RetroArch launchers on Linux and SteamOS, including EmuDeck | `save_state`, `load_state`, `toggle_menu`, `toggle_pause`, `reset`, `fast_forward`, `rewind`, `stop` |
| Native audio launcher (`Audio` system, see [Audio Playback](./audio.md)) | `toggle_pause`, `pause`, `resume`, `stop`, `fast_forward`, `rewind` |
| Custom launchers | Whatever is defined in the launcher's `controls` table |

EmuDeck standalone emulator launchers and RetroDECK launchers do not currently define built-in launcher controls.

To control [background audio](./audio.md) instead of the active game, add `?slot=background` to the control action.

### ZapScript control

Use the `control` command to send a control action from a token:

```zapscript
**control:toggle_pause
```

Save state for the active media, if the launcher supports it:

```zapscript
**control:save_state
```

See the [ZapScript utility command reference](../zapscript/utilities.md#control) for exact syntax and examples.

### API control

Apps and integrations can use the [`media.control`](../core/api/methods.md#mediacontrol) API method to send launcher control actions. The active media response includes `launcherControls` when controls are available.

## Launcher availability

Core checks whether each launcher's runtime dependencies are present. Unavailable launchers are excluded from automatic selection, but remain in the [`launchers`](../core/api/methods.md#launchers) API response with `available: false` and an `availabilityReason` explaining what is missing.

After installing a missing dependency, restart Core or use **Settings > Advanced > Reload Core** in the terminal UI. You can also run [`-reload`](../core/cli.md#reload-core). Reloading asks supported platforms to rediscover launcher data such as MiSTer RBF files and Batocera's EmulationStation system configuration.

## Default launchers

Core resolves launcher choices in this order:

1. Explicit ZapScript `?launcher=` argument
2. Saved per-media launcher override
3. Explicit [`[[systems.default]]`](../core/config.md#systemsdefault) launcher
4. First available [`launchers.preference`](../core/config.md#preference) entry
5. Normal platform launcher detection

Use a system default when every game in one system should use the same launcher. Core applies it to title/search launches and direct path launches when it can infer the system from the path. System defaults remain authoritative even when their selected launcher is unavailable, so Core reports the missing dependency instead of choosing another launcher.

API clients can save a per-media launcher override through [`media.meta.update`](../core/api/methods.md#mediametaupdate). Use this when one game should always use a different launcher from the rest of its system.

Per-media overrides are stored alongside favorites in Core's user database, separate from the rebuildable media database, so they are kept even if Core has to rebuild the media database after corruption. This user data is included in Core's [device backups](./backups.md).

Use `launchers.preference` when you want an ordered fallback across launcher groups or IDs. Unavailable preference entries are skipped. SteamOS supports the `Native`, `EmuDeck`, and `RetroDECK` groups, for example:

```toml
[launchers]
preference = ["Native", "EmuDeck", "RetroDECK"]
```

Use [`[[launchers.default]]`](../core/config.md#launchersdefault) to set launcher-specific defaults such as `action`, `load_path`, `render_scale`, or `render_resolution`.

## Troubleshooting

### Verifying your launcher loaded

Check the Zaparoo Core logs when it starts up. Look for messages about custom launchers, such as:
- `parsed custom launcher from TOML`
- `registered custom launcher`
- `loaded custom launchers`

If your launcher isn't loading, check for TOML syntax or validation errors in the logs. Invalid custom entries are ignored and logged.

### Testing commands

Before adding a command to your launcher config, test it manually in your terminal or command prompt. Replace `[[media_path]]` with an actual file path to verify it works.

### Common issues

- **Paths with spaces**: Quote the program path and `[[media_path]]` separately in your `execute` command, especially on Windows. If you wrap the command in another shell like PowerShell, that shell can split the path on its spaces. Launch the program directly instead when you can. See [Windows custom launchers](../platforms/windows/launchers.md#quoting-paths-and-powershell)
- **Launcher selection**: If several launchers match the same file, Core prefers more specific matches. Duplicate IDs or equally specific matches can be order-dependent
- **File not found**: Ensure your `media_dirs` paths are absolute or correctly relative to the Core executable directory
- **Command not found**: Verify the programs you're calling in `execute` are installed and in your system's PATH
