# Launch

These commands are used to launch games, systems, and other media.

## launch

Attempts to launch the given media path.

If Zaparoo encounters a command with no `**<command>:` prefix, it will assume it's a launch command.

For example:

```
/media/fat/games/Genesis/1 US - Q-Z/Some Game (USA, Europe).md
```

Will be forwarded to this command automatically.

The advanced argument `launcher` can be used to explicitly set the launcher to use, overriding the default one and any auto-detection.

```
Genesis/1 US - Q-Z/Some Game (USA, Europe).md?launcher=LLAPIMegaDrive
```

This can be useful to use alternate launchers for specific games or to launch a game that's not in a standard folder.

### Launch Argument Format

Since launching media is the most common action, this command has a lot more special syntax for different ways to look up media on the device.

For the most basic usage, a file path can be written to a token and Zaparoo will attempt to find the file on the device and launch it.

Zaparoo uses the following rules, in order, to find the game file. Keep these rules in mind if you want a token to work well between different devices.

:::tip
If you're not sure what to do, it's recommended to use the [System Lookup](./launch.md#system-lookup) method for the best portability between devices.
:::

#### System Lookup

This is similar to a relative path, but the first "folder" will be treated as a reference to a system instead of a folder. Like this: `<System ID>/<Game Path>`.

Check the [Systems](../core/systems.md) documentation for a list of supported system IDs.

For example:

```
N64/1 US - A-M/Another Game (USA).z64
```

While this looks like a relative path, it will work on any device with the same system folder structure, even if the Nintendo 64 folder does not have the same name. Zaparoo will look up the system ID and find the game file based on that.

System ID aliases can also be used here.

For example, this will work:

```
TurboGrafx16/Another Game (USA).pce
```

Or this:

```
tgfx16/Another Game (USA).pce
```

Or even this:

```
PCEngine/Another Game (USA).pce
```

#### Absolute Path

Any path starting with a `/` will be treated as an absolute path.

For example, to launch a game, write something like this to the token:

```
/media/fat/games/Genesis/1 US - Q-Z/Some Game (USA, Europe).md
```

This is the least portable method, as it will only work on the device with the exact same file path.

#### Relative Path

It's also possible to use a file path relative to the games folder. This will search for the file in all standard MiSTer game folder paths including CIFS and USB.

For example:

```
Genesis/1 US - Q-Z/Some Game (USA, Europe).md
```

This saves storage space on the token and will work if one device has games stored on a USB drive and another on the SD card. There's no downside to using it compared to an absolute path.

Some other examples:

```
_Arcade/Some Arcade Game.mra
```

```
_@Favorites/My Favorite Game.mgl
```

.zip files are also supported natively if the platform treats them as folders too. Just treat the .zip file as a folder name:

```
Genesis/@Genesis - 2022-05-18.zip/1 US - Q-Z/Some Game (USA, Europe).md
```

#### Game Title

Games can be looked up by system and title by using the format `<system>/<title>` similar to the above, but without a file extension or any subfolders. The game's title will be looked up in the database and launched if there's a match. The is currently the most portable method to make tokens work between devices and platforms.

Examples:

```
PCEngine/Another Game
```

```
N64/Some Game (USA)
```

Currently most game titles are taken from the filename and will include things like region tags. Some fuzzy matching may be implemented in the future to strip these out as a fallback.

## launch.system

This command will launch a system, based on MiSTer Extensions own internal list of [system IDs](../core/systems.md). This can be useful for "meta systems" such as Atari 2600 and WonderSwan Color which don't have their own core .rbf file.

For example:

```
**launch.system:Atari2600
```

```
**launch.system:WonderSwanColor
```

It also works for any other system if you prefer this method over the standard core .rbf file one.

## launch.random

This command will launch a game at random for the given system or search query. For example:

```
**launch.random:snes
```

This will launch a random SNES game each time you read the token.

System IDs can also be combined with the `,` separator. For example:

```
**launch.random:snes,nes
```

This will launch a random game from either the SNES or NES systems. You can also select all systems with `**launch.random:all`.

An absolute path to a folder will pick a random file from that folder and attempt to launch it:

```
**launch.random:/media/fat/_#Favorites
```

This is useful for folder full of .mgl files on MiSTer.

A random game can also be chosen using the `launch.search` syntax. Instead of picking and launching the first result, Zaparoo will pick a random one:

```
**launch.random:Genesis/*sonic*
```

The `all` keyword is also supported here.

```
**launch.random:all/*mario*
```

## launch.search

This command will search for a game with the given query by filename and launch the first result. The syntax of the command is similar to the generic launch command, but with the addition of "globbing" to create a fuzzy search query. For example:

```
**launch.search:SNES/*mario*
```

Will search for all SNES games with the word "mario" in the filename and launch the first result. Narrow it down:

```
**launch.search:SNES/super mario*(*usa*
```

To launch the US version of Super Mario _something_.

Search queries are case insensitive.
