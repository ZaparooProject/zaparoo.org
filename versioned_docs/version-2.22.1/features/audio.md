---
sidebar_position: 3
description: "Play music, chiptunes, MIDI, and internet radio directly through Zaparoo Core, including background music that keeps playing while you launch games."
keywords: [zaparoo audio, zaparoo background music, zaparoo media slots, native audio launcher, zaparoo music playback]
---

# Audio Playback

Zaparoo Core can play audio files on their own, without an emulator or separate media player. This is handled by a built-in native audio launcher that plays files through the same audio output Core uses for [scan feedback sounds](../core/config/media.md#audio).

Use it to play a single track, a folder of music as a [playlist](./playlists.md), or background music that keeps playing while you launch and play games.

## Supported files

The native audio launcher handles the `Audio` [system](./systems.md) and plays these formats:

| Type | Extensions |
| ---- | ---------- |
| Audio | `.wav`, `.mp3`, `.ogg`, `.flac` |
| Video game music | `.vgm`, `.vgz` |
| Chiptune | `.nsf`, `.nsfe`, `.gbs`, `.hes`, `.kss`, `.spc` |
| MIDI | `.mid`, `.midi`, `.kar`, `.rmi` |
| Playlists | `.pls`, `.m3u` |

Audio files indexed under an `Audio` or `Music` folder are launched through it automatically. You can also launch any audio file directly by its path:

```zapscript
**launch:/media/fat/music/chiptunes/intro.mp3
```

An `.nsf`, `.nsfe`, `.gbs`, `.hes`, or `.kss` file can hold a whole soundtrack. It plays every track in order as one item, and the `next` and `previous` [controls](#controlling-playback) move between tracks. To play a single track, add its number, counting from 1, after the file name:

```zapscript
**launch:/media/fat/music/nsf/game.nsf/3
```

MIDI files play through a built-in FM synthesizer. To use a SoundFont instead, set [`midi_soundfont`](../core/config/media.md#midi_soundfont).

## Internet radio

Launch an `http://` or `https://` URL of an internet radio stream and it plays through the native audio launcher. Core checks what the URL serves first, so other URLs launch the same way they always have.

```zapscript
https://example.com/radio/stream.mp3
```

Core plays MP3, Ogg, and AAC streams from Icecast and Shoutcast stations, `.pls` and `.m3u` playlist links, and HLS (`.m3u8`) streams. Song titles sent by the station update the current track's details.

Add `?slot=background` to play a station as [background music](#background-music):

```zapscript
https://example.com/radio/stream.mp3?slot=background
```

A live stream can't seek and doesn't save a resume position. Pausing disconnects from the station, and resuming joins it again at the live point.

## Media slots

Playback is split into two slots:

| Slot | Use |
| ---- | --- |
| `primary` | The default slot. Games and other media launch here. |
| `background` | A separate slot for audio that plays alongside whatever is in the primary slot. |

Commands act on the slot of the playlist that is running, or the primary slot when none is, unless you set a slot. Add `?slot=background` (or the short form `?slot=bg`) to target the background slot instead.

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

When the device boots, Core starts the background playlist that was open when it last stopped, unless you stopped it yourself. Turn this off with [`music_autoplay`](../core/config/media.md#music_autoplay).

On MiSTer, [Zaparoo Frontend](../frontend/browsing.mdx#background-music) has a music player for browsing your music and controlling background playback.

### Pause on launch

By default, background music automatically pauses when a game launches in the primary slot and resumes when the game quits. This keeps the music from competing with a game's own audio.

To keep background music playing through game launches, turn this off for the `Audio` system in the [config file](../core/config/launchers.md#systemsdefault):

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

## Resuming long tracks

A track 10 minutes or longer, such as an audiobook chapter or a podcast episode, resumes where you left it the next time it plays in the primary slot. Positions are kept separately for each [profile](./profiles.md), and a track that plays to its end starts from the beginning next time. Background audio always starts from the beginning.

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
| `next` | Next track of a multi-track chiptune file |
| `previous` | Previous track of a multi-track chiptune file |

To control background audio, add the slot:

```zapscript
**control:toggle_pause?slot=background
```

`fast_forward` and `rewind` seek by 10 seconds by default. Set a custom amount with the `seconds` advanced argument:

```zapscript
**control:fast_forward?slot=background&seconds=30
```

## Volume

Native audio playback uses [`music_volume`](../core/config/media.md#music_volume) in the config file. When that is not set, it plays at the same [`volume`](../core/config/media.md#volume) as scan feedback sounds.

Music and radio are leveled to a common loudness, using a file's ReplayGain tags when it has them, so quiet and loud tracks play at a similar volume. Turn this off with [`normalize`](../core/config/media.md#normalize).
