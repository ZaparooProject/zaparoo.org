# Launch

These commands are used to launch games, systems, and other media.

## launch

Attempts to launch the given media path.

If Zaparoo encounters a command with no `**<command>:` prefix, it will assume it's an [Auto Launch](#auto-launch) command.

For example:

```
/media/fat/games/Genesis/1 US - Q-Z/Some Game (USA, Europe).md
```

Will be forwarded to this command automatically.

The advanced argument `launcher` can be used to explicitly set the launcher to use, overriding the default one and any auto-detection.

```
Genesis/1 US - Q-Z/Some Game (USA, Europe).md?launcher=LLAPIMegaDrive
```

This can be useful to use alternate launchers for specific games or to launch a game not in a standard folder.

The advanced argument `system` can be used to apply system default launchers to local file paths:

```
/path/to/game.bin?system=Genesis
```

This is particularly useful when launching files outside standard system folders or when the file extension alone isn't enough to determine the correct launcher.

### Auto Launch

Since launching media is the most common action, this command has a lot more special syntax for different ways to look up media on the device.

For the most basic usage, a file path can be written to a token, and Zaparoo will attempt to find the file on the device and launch it.

Zaparoo uses the following rules to find the game file. Keep these rules in mind if you want a token to work well between different devices.

:::tip
If you're not sure what to do, it's recommended to use the [Title ID](./launch.md#title-id) method for the best portability between devices.
:::

#### Title ID

**This is the recommended method for making tokens portable between devices.**

Title IDs identify games by system and name, with optional [tags](../core/tags.md) for filtering. The format is `@<system>/<title>` or `<system>/<title>` (the `@` prefix is recommended but optional).

Basic examples:

```
@Genesis/Sonic the Hedgehog
@SNES/Super Mario World
@N64/Legend of Zelda Ocarina of Time
```

Title IDs work across all your Zaparoo devices and platforms. Write a card on your MiSTer, scan it on your Windows PC, and it'll launch the same game. Zaparoo automatically matches the title to whatever media you have locally using fuzzy matching and intelligent algorithms.

**With tags** to resolve conflicts or specify preferences:

```
@SNES/Super Mario World (region:us)
@SNES/Super Mario World (region:eu) (lang:de)
@Genesis/Sonic (-unfinished:demo)
```

See the [Tags documentation](../core/tags.md) for all available tags and how to use them.

**Without the @ prefix** (backward compatibility):

```
Genesis/Sonic the Hedgehog
SNES/Super Mario World
```

This format also works, but the `@` prefix is recommended to avoid potential conflicts with folder-based lookups.

#### System Lookup

This is similar to a relative path, but the first "folder" will be treated as a reference to a system instead of a folder. Like this: `<System ID>/<Game Path>`.

Check the [Systems](../systems.md) documentation for a list of supported system IDs.

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

### Remote Install

Remote media can be downloaded and installed via SMB (CIFS) and HTTP/S URLs by entering the full URL to a file and filling the `system` advanced argument with a valid system ID. This feature can be used for services like a [RetroNAS](https://github.com/retronas/retronas) running on your local network, or any compatible NAS server.

Example with SMB:

```
smb://10.0.0.123/Games/path/to/file.bin?system=Genesis
```

Or HTTP:

```
http://10.0.0.123/path/to/file.bin?system=Genesis
```

If the URL itself contains a `?` character, the URL must be escaped or quoted so it doesn't conflict with advanced argument parsing.

When first run, the media file will be downloaded locally to the `media` directory in Zaparoo Core's data directory or a [configured location](../core/config.md#media_dir). On later scans the locally cached file will be used to launch immediately instead.

If the server requires authentication, you can define the credentials using the [auth.toml](../core/config.md#auth-file) file.

The `pre_notice` advanced argument can be used to show a message before launching the game:

```
http://10.0.0.123/path/to/file.bin?system=Genesis&pre_notice=Loading special game...
```

The `name` advanced argument can be used to specify a custom display name for the download:

```
http://10.0.0.123/path/to/file.bin?system=Genesis&name=My Custom Game
```

## launch.title

Launches media by [title ID](../core/tags.md). This is the explicit command for title-based launching (the [Auto Launch](#title-id) format uses this internally).

Format: `**launch.title:<system>/<title>`

Basic examples:

```
**launch.title:Genesis/Sonic the Hedgehog
**launch.title:SNES/Super Mario World
**launch.title:N64/Legend of Zelda Ocarina of Time
```

**With tags** to filter results:

```
**launch.title:SNES/Super Mario World (region:us)
**launch.title:Genesis/Sonic (lang:en) (-unfinished:demo)
**launch.title:N64/Mario 64 (+region:jp) (+lang:ja)
```

**Using the @ prefix** (optional, works the same):

```
**launch.title:@Genesis/Sonic the Hedgehog
```

**Advanced arguments**:

The `launcher` advanced argument can override the default launcher:

```
**launch.title:Genesis/Sonic?launcher=LLAPIMegaDrive
```

The `tags` advanced argument provides an alternate way to specify tag filters:

```
**launch.title:Genesis/Sonic?tags=region:us,lang:en
```

Title IDs are the recommended format for making tokens portable between devices. The system automatically handles:

- Fuzzy matching for typos and variations
- Conflict resolution when multiple versions exist
- Tag-based filtering for precise game selection
- Preference ranking based on your config settings

See the [Tags documentation](../core/tags.md) and [Title Normalization](../core/dev/media-titles.md) for technical details on how matching works.

## launch.system

This command will launch a system, based on MiSTer Extensions' own internal list of [system IDs](../systems.md). This can be useful for "meta-systems" such as Atari 2600 and WonderSwan Color which don't have their own core .rbf file.

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
