# Launch

These commands are used to launch games, systems, and other media.

## Generic Launch (launch)

This command works exactly the same as the basic [game launch](/docs/zapscript/launching-games) behavior. It's just a more explicit way of doing it.

For example:

```
**launch:/media/fat/games/Genesis/1 US - Q-Z/Some Game (USA, Europe).md
```

## Launch a System (launch.system)

This command will launch a system, based on MiSTer Extensions own internal list of [system IDs](/docs/systems). This can be useful for "meta systems" such as Atari 2600 and WonderSwan Color which don't have their own core .rbf file.

For example:

```
**launch.system:Atari2600
```

```
**launch.system:WonderSwanColor
```

It also works for any other system if you prefer this method over the standard core .rbf file one.

## Launch a Random Game (launch.random)

This command will launch a game at random for the given system. For example:

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

This is useful for folder full of .mgl file on MiSTer.

A random game can also be chosen using the `launch.search` syntax. Instead of picking and launching the first result, Zaparoo will pick a random one:

```
**launch.random:Genesis/*sonic*
```

## Search for and Launch Game (launch.search)

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

# Launching Games

For the most basic usage, a file path can be written to a token and Zaparoo will attempt to find the file on the device and launch it.
The required system and configuration for the game will be automatically selected based on the file path. On MiSTer, you can also launch arcade .mra files, shortcut .mgl files and core .rbf files with just their path.

Zaparoo uses the following rules, in order, to find the game file. Keep these rules in mind if you want a token to work well between different devices.

:::tip
If you're not sure what to do, it's recommended to use the System Lookup method for the best portability between devices.
:::

## Absolute Path

Any path starting with a `/` will be treated as an absolute path.

For example, to launch a game, write something like this to the token:

```
/media/fat/games/Genesis/1 US - Q-Z/Some Game (USA, Europe).md
```

This is the least portable method, as it will only work on the device with the exact same file path.

## Relative Path

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

.zip files are also supported natively, same as they are in MiSTer itself. Just treat the .zip file as a folder name:

```
Genesis/@Genesis - 2022-05-18.zip/1 US - Q-Z/Some Game (USA, Europe).md
```

## System Lookup

This is similar to a relative path, but the first "folder" will be treated as a reference to a system instead of a folder. Like this: `<System ID>/<Game Path>`.

Check the [Systems](/docs/systems) documentation for a list of supported system IDs.

For example:

```
N64/1 US - A-M/Another Game (USA).z64
```

While this looks like a relative path, it will work on any device with the same system folder structure, even if the Nintendo 64 folder does not have the same name. Zaparoo will look up the system ID and find the game file based on that.

System ID aliases (listed in the [Systems](/docs/systems) page as well) can also be used here.

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

:::info
While this method is basically the same as a relative path right now, as Zaparoo develops, we will be adding more features to this System Lookup method so it's not necessary to use explicit paths. It will also be important going forward as more devices are supported with different file structures.
:::

## Game Title

Games can be looked up by system and title by using the format `<system>/<title>` similar to the above, but without a file extension or any subfolders. The game's title will be looked up in the database and launched if there's a match. The is currently the most portable method to make tokens work between devices and platforms.

Examples:

```
PCEngine/Another Game
```

```
N64/Some Game (USA)
```

Currently most game titles are taken from the filename and will include things like region tags. Some fuzzy matching may be implemented in the future to strip these out as a fallback.

## Special Cases

Some systems have special cases and extra support implemented for their launching capabilities.

### ao486

If a .vhd file is launched via Zaparoo, and this .vhd file is sitting in its own folder with an .iso or .chd file, that .iso or .chd file will also be automatically mounted alongside the .vhd file.

### AmigaVision (Amiga)

Launching games in the [AmigaVision](https://amiga.vision/) image on the Amiga core is supported via the `games.txt` files and `demos.txt` files located in the `Amiga/listings` folder on your SD card.

For example, to launch Beneath a Stell Sky in AmigaVision:

```
Amiga/listings/games.txt/Beneath a Steel Sky (OCS)[en]
```

The `games.txt` and `demos.txt` files contain a listing of all supported games and demos, generated by AmigaVision, and can be treated as a virtual folder for launching via Zaparoo. Other games can be launched using the same format of `Amiga/listings/games.txt/<Game Name>`.

Opening the `games.txt` and `demos.txt` files in a text editor will show the full list of supported games and demos.

### NeoGeo

NeoGeo also supports launching .zip files and folders directly with Zaparoo, as is supported with the MiSTer core itself.

For example, a .zip file:

```
NeoGeo/mslug.zip
```

Or a folder:

```
NeoGeo/mslug2
```
