---
description: "Use Zaparoo launcher controls to pause, stop, save state, or send launcher-specific commands to active media."
keywords: [zaparoo launcher controls, zapscript control, media.control api, custom launcher controls]
---

# Launcher Controls

Launcher controls send actions to the launcher handling the currently active media. Use them for actions like pause, stop, save state, load state, fast forward, rewind, or next and previous track.

Control support depends on the active launcher. If no media is active, or the launcher does not support the requested action, the command returns an error.

:::note Active Development
Launcher controls are still in active development. Only a limited set of built-in launchers currently report control support, and each launcher supports its own set of actions.
:::

## How control actions work

Zaparoo Core asks the active launcher to run a named control action. Official launchers can implement controls directly. [Custom launchers](./launchers.md#controls) can define controls as ZapScript snippets in their launcher configuration.

Built-in action names include:

| Action | Typical use |
| ------ | ----------- |
| `toggle_pause` | Pause or unpause active media |
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

## Current support

This list tracks built-in launcher control support in Zaparoo Core. Custom launchers can add their own controls separately.

| Launcher | Supported actions |
| -------- | ----------------- |
| Kodi launchers: `KodiLocalVideo`, `KodiMovie`, `KodiTVEpisode`, `KodiLocalAudio`, `KodiAlbum`, `KodiArtist`, `KodiTVShow`, `KodiSong` | `toggle_pause`, `stop`, `fast_forward`, `rewind`, `next`, `previous` |
| EmuDeck RetroArch-based launchers on SteamOS | `save_state`, `load_state`, `toggle_menu`, `toggle_pause`, `reset`, `fast_forward`, `stop` |
| Custom launchers | Whatever is defined in the launcher's `controls` table |

EmuDeck standalone emulator launchers and RetroDECK launchers do not currently define built-in launcher controls.

## ZapScript control

Use the `control` command to send a control action from a token:

```zapscript
**control:toggle_pause
```

Save state for the active media, if the launcher supports it:

```zapscript
**control:save_state
```

See the [ZapScript utility command reference](../zapscript/utilities.md#control) for exact syntax and examples.

## API control

Apps and integrations can use the [`media.control`](../core/api/methods.md#mediacontrol) API method to send launcher control actions. The active media response includes `launcherControls` when the active launcher reports supported controls.

## Custom launcher controls

Custom launcher controls are defined in the launcher TOML file. Control scripts run in a restricted runtime: media-launching, playlist, and nested `control` commands are blocked, while utility commands such as `input.keyboard`, `execute`, `delay`, and `echo` are allowed. The `execute` command still requires a matching [`allow_execute`](../core/config.md#allow_execute) entry.

See [custom launcher controls](./launchers.md#controls) for configuration details.
