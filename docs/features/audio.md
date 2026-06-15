---
description: "Play music and audio files directly through Zaparoo Core, including background music that keeps playing while you launch games."
keywords: [zaparoo audio, zaparoo background music, zaparoo media slots, native audio launcher, zaparoo music playback]
---

# Audio Playback

Zaparoo Core can play audio files on their own, without an emulator or separate media player. This is handled by a built-in native audio launcher that plays files through the same audio output Core uses for [scan feedback sounds](../core/config.md#audio).

Use it to play a single track, a folder of music as a [playlist](./playlists.md), or background music that keeps playing while you launch and play games.

## Supported files

The native audio launcher handles the `Audio` [system](./systems.md) and plays these formats:

- `.wav`
- `.mp3`
- `.ogg`
- `.flac`

Audio files indexed under an `Audio` or `Music` folder are launched through it automatically. You can also launch any audio file directly by its path:

```zapscript
**launch:/media/fat/music/chiptunes/intro.mp3
```

## Media slots

Playback is split into two slots:

| Slot | Use |
| ---- | --- |
| `primary` | The default slot. Games and other media launch here. |
| `background` | A separate slot for audio that plays alongside whatever is in the primary slot. |

Commands act on the primary slot unless you set a slot. Add `?slot=background` (or the short form `?slot=bg`) to target the background slot instead.

The background slot is what makes background music possible: a game runs in the primary slot while music plays in the background slot at the same time.

## Background music

Start background music from a single track:

```zapscript
**launch:/media/fat/music/album/track01.flac?slot=background
```

Or play a whole folder as a background [playlist](./playlists.md):

```zapscript
**playlist.play:/media/fat/music/album?slot=background
```

While background music plays you can keep scanning game tokens as usual. They launch in the primary slot without clearing the background slot, so the music stays loaded.

### Pause on launch

By default, background music automatically pauses when a game launches in the primary slot and resumes when the game quits. This keeps the music from competing with a game's own audio.

To keep background music playing through game launches, turn this off for the `Audio` system in the [config file](../core/config.md#systemsdefault):

```toml
[[systems.default]]
system = "Audio"
pause_on_launch = false
```

If you manually start background music while a game is already running, Core treats that as intentional and does not pause it when the game quits.

### Looping

Background playlists can repeat. Add a [`repeat`](../zapscript/playlist.md#repeat-modes) argument when you load the playlist:

```zapscript
**playlist.play:/media/fat/music/album?slot=background&repeat=all
```

Use `repeat=all` to loop the whole playlist or `repeat=one` to loop the current track. The default is `repeat=off`.

## Controlling playback

Use the [`control`](../zapscript/utilities.md#control) command, or the [`media.control`](../core/api/methods.md#mediacontrol) API method, to control audio. The native audio launcher supports:

| Action | Effect |
| ------ | ------ |
| `toggle_pause` | Pause or resume |
| `pause` | Pause |
| `resume` | Resume |
| `stop` | Stop playback |
| `fast_forward` | Seek forward |
| `rewind` | Seek backward |

To control background audio, add the slot:

```zapscript
**control:toggle_pause?slot=background
```

`fast_forward` and `rewind` seek by 10 seconds by default. Set a custom amount with the `seconds` advanced argument:

```zapscript
**control:fast_forward?slot=background&seconds=30
```

## Volume

Native audio playback uses the same volume setting as scan feedback sounds, set with [`volume`](../core/config.md#volume) in the config file.
