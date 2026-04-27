---
description: "Use Zaparoo playlists to group media, write playlist sources, play items in order or shuffled, and move between entries from ZapScript."
keywords: [zaparoo playlists, zapscript playlist, playlist picker, shuffled playlist]
---

# Playlists

Playlists let Zaparoo Core keep a temporary list of media or [ZapScript](../zapscript/index.md) actions in memory. A playlist can start playing immediately, wait for you to choose an item, or stay loaded so another token can move forward, go back, or jump to a specific position.

Use playlists when one token should represent a set of games, a music or video queue, a shuffled folder, or a menu of related launches.

## How playlists work

A playlist has an ordered list of items and a current position. Each item contains ZapScript, so an item can be a media path, a [title ID](../zapscript/launch.md#launchtitle), or another supported command.

Playlists are loaded at runtime. They are not a permanent library feature, and the active playlist is cleared when you stop it or when Core restarts.

## Playlist source formats

The `playlist.play`, `playlist.load`, and `playlist.open` commands all take the same kind of source. A source can be a folder path, a `.pls` file path, or an inline JSON playlist.

| Source | Use it when |
| ------ | ----------- |
| Folder | You want immediate files in a folder to become playlist items. Subfolders, hidden files, files without extensions, and zip contents are not included. |
| `.pls` file | You want a reusable playlist file with numbered entries, optional display titles, and entries that can run ZapScript. |
| Inline JSON | You want the whole playlist stored inside one ZapScript command. |

### Folder

A folder source turns each immediate file in that folder into a playlist item. The item name comes from the filename without its extension, and the item ZapScript is the file path.

```zapscript
**playlist.play:/media/fat/games/Genesis
```

Folder playlists do not scan subfolders. They also skip hidden files, entries without file extensions, and files inside zip archives.

Add `?mode=shuffle` to shuffle the loaded items:

```zapscript
**playlist.play:/media/fat/games/Genesis?mode=shuffle
```

### `.pls` file

A `.pls` source uses the standard playlist-style header and numbered `File` entries. In Zaparoo, each `File` value is treated as ZapScript. It can be a media path, a title ID, or a command such as `**launch.random:Genesis`. The field is still named `File` because that is the `.pls` format.

```text
[playlist]
File1=/media/fat/games/Genesis/Sonic The Hedgehog.md
Title1=Sonic The Hedgehog
File2=/media/fat/games/Genesis/Streets of Rage.md
Title2=Streets of Rage
File3=**launch.random:Genesis
Title3=Random Genesis Game
```

`Title` lines are optional. If a title is missing, Core generates a display name from the item ZapScript where it can.

Items are sorted by their number, not by the order they appear in the file. `File2` plays before `File10`, even if `File10` appears first. Numbering does not need to be consecutive, but each playable item needs a matching `File` line.

Relative media filenames are resolved from the same folder as the `.pls` file when Core can find a matching file there. For portable playlists, absolute paths or normal ZapScript entries are clearer:

```text
[playlist]
File1=Some Game (USA).md
Title1=Some Game
File2=/media/fat/games/SNES/Another Game.sfc?launcher=LLAPISNES
Title2=Another Game
```

Load a `.pls` file the same way you would load a folder:

```zapscript
**playlist.play:/media/fat/playlists/favorites.pls
```

### Inline JSON

Inline JSON stores the playlist object directly in the ZapScript command. Use this when you want a complete playlist on one token without creating a separate `.pls` file.

Use these top-level fields:

| Field | Description |
| ----- | ----------- |
| `id` | Playlist ID. Core uses this to recognize the same playlist when opening a source that is already active. |
| `name` | Display name for the playlist. The picker uses this as its title. |
| `items` | Array of playlist items. Without items, there is nothing useful to play. |

Each item uses these fields:

| Field | Description |
| ----- | ----------- |
| `name` | Display name for the item. If this is missing, Core generates a display name from `zapscript` where it can. |
| `zapscript` | ZapScript to run when the item is selected or played. Each useful item needs this field. |

This is the JSON object by itself:

```json
{
  "id": "party-list",
  "name": "Party List",
  "items": [
    {
      "name": "Sonic",
      "zapscript": "/media/fat/games/Genesis/Sonic The Hedgehog.md"
    },
    {
      "name": "Random SNES Game",
      "zapscript": "**launch.random:SNES"
    }
  ]
}
```

To use it on a token, put the JSON after the playlist command:

```zapscript
**playlist.play:{"id":"party-list","name":"Party List","items":[{"name":"Sonic","zapscript":"/media/fat/games/Genesis/Sonic The Hedgehog.md"},{"name":"Random SNES Game","zapscript":"**launch.random:SNES"}]}
```

Inline JSON is parsed as a single [JSON argument](../zapscript/syntax.md#json-arguments), so the command can still contain ZapScript separators such as `||` after the closing `}` if you need to chain another command.

Because this is JSON, strings must be quoted and any quotes inside item ZapScript need to be escaped.

## Using a playlist

Load a playlist source and launch the first item:

```zapscript
**playlist.play:/media/fat/playlists/favorites.pls
```

Load a playlist source without launching anything yet:

```zapscript
**playlist.load:/media/fat/playlists/favorites.pls
```

Open a picker for a playlist source:

```zapscript
**playlist.open:/media/fat/playlists/favorites.pls
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

Stop the current media and clear the active playlist:

```zapscript
**playlist.stop
```

## Picker support

`playlist.open` opens an interactive picker for the active playlist or for a playlist source you provide.

:::note Platform Support
The interactive picker is currently only supported on [MiSTer](../platforms/mister/index.md).
:::

## Command reference

See the [ZapScript playlist command reference](../zapscript/playlist.md) for exact syntax, supported formats, and all playlist commands.
