# Playlist

Zaparoo supports keeping a playlist of media in memory and keeping track of the current position in the playlist.

## Playlist Format

There are multiple ways to define a playlist, which is given to the playlist commands to load.

### Folder

Give a folder as an argument to the `playlist.play` command to load it.

```
**playlist.play:/media/fat/games/Genesis
```

This will only load the immediate contents of the folder. Any subfolders will not be included. This method doesn't support the contents of .zip files.

### .pls File

A .pls file is a simple text file that lists media files, one per line.

For example, a file named `playlist.pls`:

```
[playlist]
File1=/media/fat/games/Genesis/1 US - Q-Z/Some Game (USA, Europe).md
Title1=Some Game (USA, Europe)
File2=/media/fat/games/Genesis/1 US - Q-Z/Another Game (USA, Europe).md
Title2=Another Game (USA, Europe)
```

Give this file as an argument to the `playlist.play` command to load it.

```
**playlist.play:/media/fat/playlist.pls
```

The `Title` line is optional and can be used to give a custom name to the item. If it's not present, the filename will be used instead if possible. Media will be sorted in order of the ID numbers in the `File`/`Title` lines, not by order in the file itself.

File paths may be absolute paths, system lookup paths or relative paths to the playlist file location (but not subfolders).

Using relative paths:

```
[playlist]
File1=Some Game (USA, Europe).md
Title1=A different name
File2=Another Game (USA, Europe).md?launcher=LLAPIMegaDrive
```

### Inline Playlists

A playlist definition can be embedded directly in a ZapScript command by writing a JSON object in the following format in the first argument:

```json
{
  "id": "12341234",
  "name": "My Playlist",
  "items": [
    {
      "name": "Game 1",
      "zapscript": "path/to/file.bin"
    },
    {
      "name": "Game 2",
      "zapscript": "path/to/another/file.bin"
    }
  ]
}
```

- `id` is an internal ID (no special format but make it unique) used to check if the same playlist is being reloaded.
- `name` is an optional argument that will display in places like a picker menu.
- `items` is the list of items in the playlist:
  - `name` is similar to the top level name, this is an optional display name. Core will attempt to generate an appropriate name if it's missing.
  - `zapscript` is the actual ZapScript script which will be run when the item is played. 

A full command might look like this:

```
**playlist.open:{"id":"12341234","name":"My Playlist","items":[{"name":"Game 1","zapscript":"path/to/file.bin"},{"name":"Game 2","zapscript":"path/to/another/file.bin"}]}
```

## playlist.load

```
**playlist.load:/media/fat/playlist.pls
```

Load the given playlist into memory.

The advanced argument `mode` can be used to load the playlist in a random order, using the `shuffle` keyword.

```
**playlist.load:/media/fat/playlist.pls?mode=shuffle
```

## playlist.play

```
**playlist.play:/media/fat/_@Favorites
```

Load the given playlist into memory and immediately launch the first item. Clearing any existing playlist.

This command can also be run without any arguments, to resume playback of the current paused playlist.

```
**playlist.play
```

The `mode` advanced argument can also be used here.

## playlist.stop

```
**playlist.stop
```

Stop/exit the current playlist media and clear the playlist from memory.

## playlist.next

```
**playlist.next
```

Launch the next media in the playlist.

## playlist.previous

```
**playlist.previous
```

Launch the previous media in the playlist.

## playlist.pause

```
**playlist.pause
```

Pause the current playlist media. This will stop the current media from playing, but will not clear the playlist, allowing it to be resumed later.

## playlist.goto

```
**playlist.goto:2
```

Launch the media at the given index in the playlist, and set it as the current media in the playlist.

## playlist.open

Similar to `playlist.load`, but will also open a picker menu on screen which allows you to select which item to launch from the playlist.

```
**playlist.open:/media/fat/playlist.pls
```

Re-running the command will open the same menu again, allowing you to select a different item to launch, and will show the current place in the playlist.

This command supports the `mode` advanced argument.
