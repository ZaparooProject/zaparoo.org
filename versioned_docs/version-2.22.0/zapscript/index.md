---
description: ZapScript is the scripting language written to Zaparoo tokens. Tap a card, launch anything. Reference for all commands and syntax.
keywords: [zapscript, zaparoo scripting language, zapscript commands, nfc scripting, zaparoo token script]
---

# ZapScript

ZapScript is a small scripting language written to the storage of Zaparoo tokens. It tells Zaparoo what to do when a token is scanned. Through regular use you won't need to write much yourself, but you can use it to customize launching or add scripted actions. The [Zaparoo App](../app/index.md) is the easiest way to write ZapScript to tokens. If you write ZapScript by hand, read [Syntax](./syntax.md) first.

## Write your first card

Most cards only need the name of a game. The [Zaparoo App](../app/index.md) writes that for you when you pick a game from your library, and the [Web UI](../app/web.md) does the same from a browser. When you want a card to do something else, write ZapScript by hand in the App's **Custom write** or ZapScript editor:

1. Start with a launch. `@Genesis/Sonic the Hedgehog` launches a game by system and title; `**launch.random:SNES` picks one at random.
2. Add more commands with `||` between them. `**delay:1000||@SNES/Super Mario World` waits a second first.
3. Tune a command with `?` arguments. `@N64/GoldenEye 007?launcher=80MHzNintendo64` picks a specific launcher.

That covers most cards. [Syntax](./syntax.md) explains the rest: escaping, quoting, `when` conditions, and expressions.

## Quick reference

| Command | Description |
|---------|-------------|
| [`launch`](./launch.md) | Launch media from a path or identifier |
| [`launch.title`](./launch.md#launchtitle) | Launch by title ID with explicit syntax |
| [`launch.system`](./launch.md#launchsystem) | Launch a system/emulator |
| [`launch.random`](./launch.md#launchrandom) | Launch a random game |
| [`launch.search`](./launch.md#launchsearch) | Search indexed media and launch the first result |
| [`launch.last`](./launch.md#launchlast) | Launch a recently played game |
| [`input.keyboard`](./input.md#inputkeyboard) | Simulate keyboard input |
| [`input.text`](./input.md#inputtext) | Type a string of literal text |
| [`input.gamepad`](./input.md#inputgamepad) | Simulate gamepad input |
| [`input.coinp1` to `input.coinp4`](./input.md#inputcoinp1--inputcoinp2--inputcoinp3--inputcoinp4) | Insert coins for players 1 to 4 |
| [`http.get`](./http.md#httpget) | Make an HTTP GET request |
| [`http.post`](./http.md#httppost) | Make an HTTP POST request |
| [`playlist.play`](./playlist.md#playlistplay) | Load and play a playlist |
| [`playlist.load`](./playlist.md#playlistload) | Load a playlist without playing |
| [`playlist.open`](./playlist.md#playlistopen) | Open playlist picker menu |
| [`playlist.stop`](./playlist.md#playliststop) | Stop and clear playlist |
| [`playlist.pause`](./playlist.md#playlistpause) | Pause playlist |
| [`playlist.next`](./playlist.md#playlistnext) | Next playlist item |
| [`playlist.previous`](./playlist.md#playlistprevious) | Previous playlist item |
| [`playlist.goto`](./playlist.md#playlistgoto) | Jump to playlist position |
| [`stop`](./utilities.md#stop) | Stop current media |
| [`profile`](./utilities.md#profile) | Switch to a device profile |
| [`profile.clear`](./utilities.md#profileclear) | Return to the shared profile |
| [`playtime.extend`](./utilities.md#playtimeextend) | Grant extra playtime with an administrator's card |
| [`echo`](./utilities.md#echo) | Log a message |
| [`execute`](./utilities.md#execute) | Run a host command |
| [`delay`](./utilities.md#delay) | Pause script execution |
| [`control`](./utilities.md#control) | Send a control action to the active media's launcher |
| [`screenshot`](./utilities.md#screenshot) | Capture the current platform display |
| [`write`](./utilities.md#write) | Write ZapScript to the next token scanned |
| [`mister.ini`](./mister.md#misterini) | Load MiSTer ini file |
| [`mister.core`](./mister.md#mistercore) | Launch MiSTer core |
| [`mister.script`](./mister.md#misterscript) | Run MiSTer script |
| [`mister.mgl`](./mister.md#mistermgl) | Execute MGL content |
| [`mister.wallpaper`](./mister.md#misterwallpaper) | Set or unset MiSTer menu wallpaper |

## Command categories

- [Launch](./launch.md): Commands for launching games, systems, and media
- [Input](./input.md): Commands for simulating keyboard and gamepad input
- [HTTP](./http.md): Commands for making HTTP requests
- [Playlist](./playlist.md): Commands for managing playlists
- [Utilities](./utilities.md): Utility commands (stop, profile switching, playtime extension, delay, echo, execute, control, screenshot)
- [MiSTer](./mister.md): Commands specific to the MiSTer platform

## Syntax

The syntax of ZapScript is designed to be human-readable and writeable, with minimal complexity and focused on fitting as much information as possible on the limited storage available on NFC tags and QR codes.

See [Syntax](./syntax.md) for a detailed explanation of all the different parts of ZapScript syntax, [Expressions](./syntax.md#expressions) for dynamic values, and [Zap Links](./zap-links.md) for scripts hosted at a URL.

## Examples

### Launch a game

```zapscript
@Genesis/Sonic the Hedgehog
```

Or with the explicit command:

```zapscript
**launch:PCEngine/Another Game
```

### Launch a game with a delay

```zapscript
**delay:1000||@SNES/Super Mario World
```

### Send an HTTP request and launch a random game

```zapscript
**http.get:https://api.example.com/hello||**launch.random:Genesis
```

### Launch different content based on platform

```zapscript
Genesis/Game.md?when=[[platform == "mister"]]||PCEngine/Game.pce?when=[[platform != "mister"]]
```

### Use expressions for dynamic paths

```zapscript
SNES/games-[[platform]]/Super Mario World.sfc
```
