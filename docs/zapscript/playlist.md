# Playlist

Currently an experimental feature, it's possible to treat a folder on disk as a playlist to be loaded in memory and then navigate between items. The format of these commands may change in the future.

## Load and Play a Playlist (playlist.play)

```
**playlist.play:/media/fat/_@Favorites
```

Will load the contents of a directory into memory and launch the first item.

At this stage, the argument must be an absolute path to a folder (not in a .zip).

Launching another game manually will reset the current loaded playlist.

## Play Next Item (playlist.next)

```
**playlist.next
```

Launch the next game in the playlist.

## Play Previous Item (playlist.previous)

```
**playlist.previous
```

Launch the previous game in the playlist.
