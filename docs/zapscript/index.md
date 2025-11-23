# ZapScript

ZapScript is a small scripting language written to the storage of Zaparoo tokens. It is used to tell Zaparoo what to do when the token is scanned. Through regular use you won't need to write much yourself, but you can use it to customize launching or add scripted actions.

## Commands

ZapScript commands are organized into several categories:

- [HTTP](./http.md): Commands for making HTTP requests.
- [Input](./input.md): Commands for simulating keyboard and gamepad input.
- [Launch](./launch.md): Commands for launching games, systems, and other media.
- [MiSTer](./mister.md): Commands specific to the MiSTer platform.
- [Playlist](./playlist.md): Commands for managing playlists of games.
- [Utility](./utilities.md): Various utility commands.

## Syntax

The syntax of ZapScript is made to be human-readable and writeable, with minimal complexity and focused on fitting as much information as possible on the limited storage available on NFC tags and QR codes.

See [Syntax](./syntax.md) for a detailed explanation of all the different parts of ZapScript syntax, and the [Expressions](./syntax.md#expressions) section for a guide to using expressions in ZapScript.

## Examples

### Launch a game

```
**launch:PCEngine/Another Game
```

Or, without the `**launch:` prefix:

```
PCEngine/Another Game
```

### Launch a game with a delay

```
**delay:1000||PCEngine/Another Game
```

### Send an HTTP request and launch a random game

```
**http.get:https://api.example.com/hello||**launch.random:Genesis
```

### Launch different content based on device platform

```
Genesis/Game.md?when=[[platform == "mister"]]||PCEngine/Game.pce?when=[[platform != "mister"]]
```

### Use expressions for dynamic paths

```
SNES/games-[[platform]]/Super Mario World.sfc
```
