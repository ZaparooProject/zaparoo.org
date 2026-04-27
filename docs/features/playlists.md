---
description: "Use Zaparoo playlists to group media, play items in order or shuffled, and move between entries from ZapScript."
keywords: [zaparoo playlists, zapscript playlist, playlist picker, shuffled playlist]
---

# Playlists

Playlists let Zaparoo Core keep a temporary list of media or ZapScript actions in memory. A playlist can start playing immediately, wait for you to choose an item, or stay loaded so another token can move forward, go back, or jump to a specific position.

Use playlists when one token should represent a small set of games, a music or video queue, a random folder, or a menu of related launches.

## How playlists work

A playlist has an ordered list of items and a current position. Each item contains ZapScript, so an item can be a media path, a title ID, or another supported command.

Playlists are loaded at runtime. They are not a permanent library feature, and the active playlist is cleared when you stop it or when Core restarts.

## Playlist sources

Zaparoo can load playlists from three source types:

| Source | Use it when |
| ------ | ----------- |
| Folder | You want every immediate file in a folder to become a playlist item. Subfolders and zip contents are not included. |
| `.pls` file | You want a reusable playlist file with explicit order and optional display titles. |
| Inline JSON | You want the whole playlist stored inside one ZapScript command. |

## Common patterns

Load a folder and launch the first item:

```zapscript
**playlist.play:/media/fat/games/Genesis
```

Load a `.pls` file in shuffled order:

```zapscript
**playlist.play:/media/fat/playlist.pls?mode=shuffle
```

Move through an active playlist from separate tokens:

```zapscript
**playlist.next
```

```zapscript
**playlist.previous
```

Pause and resume the active playlist:

```zapscript
**playlist.pause
```

```zapscript
**playlist.play
```

## Picker support

`playlist.open` opens an interactive picker for the active playlist or for a playlist source you provide.

:::note Platform Support
The interactive picker is currently only supported on [MiSTer](../platforms/mister/index.md).
:::

## Command reference

See the [ZapScript playlist command reference](../zapscript/playlist.md) for exact syntax, supported formats, and all playlist commands.
