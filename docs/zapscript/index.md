# ZapScript

ZapScript is a small scripting language written to the storage of Zaparoo tokens. It is used to tell Zaparoo what to do when it's scanned. Through regular use you won't need to write any yourself, but you can use it to customize launching or add scripted actions.

## Commands

ZapScript commands are organized into several categories:

- [HTTP](/docs/zapscript/http) - Commands for making HTTP requests
- [Input](/docs/zapscript/input) - Commands for simulating keyboard and gamepad input
- [Launch](/docs/zapscript/launch) - Commands for launching games, systems, and other media
- [MiSTer](/docs/zapscript/mister) - Commands specific to the MiSTer platform
- [Playlist](/docs/zapscript/playlist) - Commands for managing playlists of games
- [Utility](/docs/zapscript/utilities) - Various utility commands

## Syntax

The syntax of ZapScript is very simple. Its purpose is to fit as much information as possible into the small storage available on tokens, but also remain human-readable.

- A script is made up of one or more sequential commands
- A command is made up of a case-insensitive command name, followed by one or more arguments
- Commands always start with a `**`, except for the [launch](/docs/zapscript/launch) command where it's optional
- Command arguments are separated by a `,`
- The command name and arguments are separated by a `:`
- Multiple commands are separated by a `||`
- Commands are blocking, meaning the script will wait for the command to finish before executing the next one

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

### Send an HTTP request and launch random game

```
**http.get:https://api.example.com/hello||**launch.random:Genesis
```
