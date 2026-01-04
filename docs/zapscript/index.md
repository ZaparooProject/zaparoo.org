# ZapScript

ZapScript is a small scripting language written to the storage of Zaparoo tokens. It tells Zaparoo what to do when a token is scanned. Through regular use you won't need to write much yourself, but you can use it to customize launching or add scripted actions.

## Quick Reference

| Command | Description |
|---------|-------------|
| [`launch`](./launch.md#launch) | Launch media from a path or identifier |
| [`launch.title`](./launch.md#launchtitle) | Launch by title ID with explicit syntax |
| [`launch.system`](./launch.md#launchsystem) | Launch a system/emulator |
| [`launch.random`](./launch.md#launchrandom) | Launch a random game |
| [`launch.search`](./launch.md#launchsearch) | Search and launch by filename pattern |
| [`input.keyboard`](./input.md#inputkeyboard) | Simulate keyboard input |
| [`input.gamepad`](./input.md#inputgamepad) | Simulate gamepad input |
| [`input.coinp1`](./input.md#inputcoinp1--inputcoinp2) | Insert coin for player 1 |
| [`input.coinp2`](./input.md#inputcoinp1--inputcoinp2) | Insert coin for player 2 |
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
| [`echo`](./utilities.md#echo) | Log a message |
| [`execute`](./utilities.md#execute) | Run a shell command |
| [`delay`](./utilities.md#delay) | Pause script execution |
| [`mister.ini`](./mister.md#misterini) | Load MiSTer ini file |
| [`mister.core`](./mister.md#mistercore) | Launch MiSTer core |
| [`mister.script`](./mister.md#misterscript) | Run MiSTer script |
| [`mister.mgl`](./mister.md#mistermgl) | Execute MGL content |

## Command Categories

- [Launch](./launch.md): Commands for launching games, systems, and media
- [Input](./input.md): Commands for simulating keyboard and gamepad input
- [HTTP](./http.md): Commands for making HTTP requests
- [Playlist](./playlist.md): Commands for managing playlists
- [Utilities](./utilities.md): Utility commands (stop, delay, echo, execute)
- [MiSTer](./mister.md): Commands specific to the MiSTer platform

## Syntax

The syntax of ZapScript is designed to be human-readable and writeable, with minimal complexity and focused on fitting as much information as possible on the limited storage available on NFC tags and QR codes.

See [Syntax](./syntax.md) for a detailed explanation of all the different parts of ZapScript syntax, [Expressions](./syntax.md#expressions) for dynamic values, and [Zap Links](./syntax.md#zap-links) for remote script hosting.

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
