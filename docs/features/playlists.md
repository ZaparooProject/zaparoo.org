---
sidebar_position: 2
description: "Use Zaparoo playlists to group media, write playlist sources, play items in order or shuffled, rotate games on a timer or when idle, and move between entries from ZapScript."
keywords: [zaparoo playlists, zapscript playlist, playlist picker, shuffled playlist, attract mode, playlist auto advance]
---

# Playlists

Playlists let Zaparoo Core keep a temporary list of media or [ZapScript](../zapscript/index.md) actions in memory. A playlist can start playing immediately, wait for you to choose an item, or stay loaded so another token can move forward, go back, or jump to a specific position.

Use playlists when one token should represent a set of games, a music or video queue, a shuffled folder, or a menu of related launches.

## How playlists work

A playlist has an ordered list of items and a current position. Each item contains ZapScript, so an item can be a media path, a [title ID](../zapscript/launch.md#launchtitle), or another supported command.

Core remembers where you left each playlist, including its shuffled order, separately for each [profile](./profiles.md). Loading the playlist again opens it on that item, or on the first item if that one is gone. A playlist that played to its end starts over next time. Add [`start`](../zapscript/playlist.md#choosing-the-starting-item) to a playlist command to pick the item yourself.

After Core restarts, the playlist that was open comes back paused, ready for `**playlist.play` to continue it. A playlist held by a card in [hold mode](../core/config/readers.md#scan-mode) is not restored. To keep a playlist's items on the device, save it as a [deck](#deck).

## Playlist source formats

The `playlist.play`, `playlist.load`, and `playlist.open` commands all take the same kind of source. A source can be a folder path, a `.pls` file path, an inline JSON playlist, a deck, or a Kodi collection.

| Source | Use it when |
| ------ | ----------- |
| Folder | You want immediate files in a folder to become playlist items. Subfolders, hidden files, files without extensions, and zip contents are not included. |
| `.pls` file | You want a reusable playlist file with numbered entries, optional display titles, and entries that can run ZapScript. |
| Inline JSON | You want the whole playlist stored inside one ZapScript command. |
| Deck | You want a saved playlist that stays on the device and can be edited without rewriting the token. |
| Kodi collection | You want every episode of a TV show, or every song on an album or by an artist, from your Kodi library. |

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
| `name` | Optional display name for the playlist. The picker uses this as its title. |
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

### Deck

A deck is a playlist saved on the device: an ordered collection of games and scripts with a name and an ID that survives restarts. Edit the deck and every token that points at it follows. A `deck://<id>` source opens it:

```zapscript
**playlist.play:deck://0k3v9x2rq7bm
```

Decks live in Core, with or without an account. Create and edit them in the [Zaparoo App](../app/index.md#decks) or in [Zaparoo Online](../online/index.md#cards-and-decks), and [Library sync](../online/index.md#library-sync) keeps the device and the account in step. Scanning a [Zap Link](../zapscript/zap-links.md) to a shared deck keeps a read-only copy on the device, so the link works offline after that.

Games in a deck carry a `user:deck:<id>` [tag](./tags.md#user-tags), so `**launch.random:SNES?tags=user:deck:0k3v9x2rq7bm` picks from the deck.

### Kodi collection

A TV show, album, or artist from your [Kodi](../platforms/linux/launchers.md#kodi) library becomes a playlist of its episodes or songs. Use the `kodi-show://`, `kodi-album://`, or `kodi-artist://` value the [Zaparoo App](../app/index.md) writes for that item:

```zapscript
**playlist.play:kodi-album://12/Rumours?mode=shuffle
```

Launching the same value directly, without a playlist command, hands the whole show, album, or artist to Kodi instead.

## Using a playlist

Write `**playlist.play:<source>` to a token to load a playlist and start playing it, or `**playlist.load:<source>` to load it without launching. Separate tokens can then run `**playlist.next`, `**playlist.previous`, `**playlist.pause`, and `**playlist.stop`. Every command and its arguments are on the [playlist command reference](../zapscript/playlist.md).

Scanning the playlist's card again while it is playing moves to the next item, and wraps to the first after the last. If the playlist is paused, the scan picks up where it stopped. A card for a different playlist opens that one where you last left it, and `**playlist.goto:1` takes the current playlist back to the start. In hold mode, removing the card clears the playlist, and putting it back opens the playlist on the item it was on.

If an item fails to launch, the playlist pauses on it instead of moving on. `**playlist.play` tries the item again, and `**playlist.next`, `**playlist.previous`, or `**playlist.goto` carry on from another item.

## Moving to the next item on its own

A playlist moves on by itself when its current item ends:

- **Media finishes.** A video or song that plays to its end starts the next item straight away.
- **A game exits.** When you quit a game yourself, Core counts down before starting the next item, 10 seconds by default. Pressing a button or key after the first 2 seconds cancels the countdown, as does scanning a card or launching something else. If a game the playlist started on its own is quit within 30 seconds, the playlist pauses instead. In a playlist with [`idle`](#timed-and-idle-switching), quitting a game skips the countdown and the next item starts once the idle time has passed.

Stopping or replacing media through Zaparoo never moves the playlist on. The last item of a playlist without [repeat](../zapscript/playlist.md#repeat-modes) ends the playlist.

[MiSTer](../platforms/mister/index.md) shows the countdown on screen with **Play now** and **Stop playlist** options. On other platforms, a connected client that supports Core's global UI events can show and answer it.

### Timed and idle switching

Two arguments switch items while a game is still running, for example to rotate through games on a display or arcade cabinet:

| Argument | Switches to the next item |
| -------- | ------------------------- |
| `advance` | After that much playing time. The timer stops while the playlist is paused. |
| `idle` | After that long with no keyboard, mouse, or controller input. |

Write durations with a unit, such as `90s`, `10m`, or `1h`, up to 24 hours. `advance` and `idle` cannot be used together, and only work in the primary slot.

```zapscript
**playlist.play:/media/fat/games/Genesis?mode=shuffle&advance=10m
```

Loading a playlist with `idle` through `**playlist.load` or `**playlist.open` leaves it waiting: it starts on its own once nobody has touched the device for that long. A game you start yourself is never switched away from.

```zapscript
**playlist.load:deck://0k3v9x2rq7bm?idle=5m&repeat=all
```

`idle` needs a device where Core can watch the keyboard, mouse, and controllers. Core refuses it on macOS, SteamOS, Bazzite, ChimeraOS, and Android.

Timed and idle switches happen straight away, without a countdown. `countdown` sets how long the countdown after a game exits runs, such as `countdown=30s`, and `countdown=0` skips it.

[`launch.random`](../zapscript/launch.md#launchrandom) takes the same `advance`, `idle`, and `countdown` arguments to roll a new random game each time.

## Picker support

`playlist.open` opens an interactive picker for the active playlist or for a playlist source you provide.

:::note Picker display
[MiSTer](../platforms/mister/index.md) displays the picker locally. On other platforms, a connected client that supports Core's global UI events can display and answer it. If no local or connected renderer is available, the playlist still loads but the picker expires without a selection after 30 seconds.
:::

## Command reference

See the [ZapScript playlist command reference](../zapscript/playlist.md) for exact syntax, supported formats, and all playlist commands.
