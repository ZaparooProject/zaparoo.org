# Syntax

A ZapScript script is a simple flat list of commands which are run in sequence:

`Genesis/Some Game.md?launcher=AltMegaDrive||**delay:500||**echo:"Hello, World!"`

This example showcases most of the supported ZapScript syntax and would:

- Resolve the path `Genesis/Some Game.md` and launch it with the `AltMegaDrive` launcher.
- Sleep for half a second, pausing the entire rest of the script until complete.
- Echo the text `Hello, World!` to the Zaparoo Core log file.

If a command results in an error, Core will stop processing the rest of the script.

## Basics

- Commands are separated by: `||`
- Command names start with: `**`
- Command arguments start with `:` immediately after the name. Optional for some commands.
- Multiple command arguments are separated by: `,`

Whitespace outside of arguments is ignored, though it's rare to add any to a script.

### Auto Launch

Because launching media is such an essential part of ZapScript, the `launch` command has special handling built in. If a command section does not start with a `**` it is assumed to be an argument to the `launch` command and parsed in Auto Launch mode.

For example, the script `Genesis/Some Game.md` would be parsed internally as: `**launch:"Genesis/Some Game.md"`

The `,` character does not need to be escaped in Auto Launch mode, since the path is automatically quoted.

Advanced arguments are allowed in Auto Launch mode, so the `?` character should be escaped or quoted. Advanced argument parsing has a stricter syntax and will fall back on treating the string as an argument, so most unescaped `?` characters should pass through as part of the argument.

## Commands

A command is run by writing `**`, a command name, and optionally some arguments.

Using advanced arguments:

`**launch:SNES/Some Game.sfc?launcher=LLAPISNES`

Using multiple positional arguments:

`**launch.random:genesis,snes,nes`

No arguments:

`**stop`

All argument values are automatically trimmed, so any whitespace before or after the value will be removed before being run. An argument should be quoted if this behavior isn't wanted.

### Positional Arguments

Commands may have one or more positional arguments, which are separated by a `,` character. Positional arguments begin with a `:` character immediately after the command name.

Arguments containing `,` or `?` must be escaped or quoted so they are not treated as new arguments.

### Advanced Arguments

Commands can also have advanced arguments which start with a `?` and are then defined using a key value pair similar to a URL, using `=` to separate a key with its value, and `&` to separate multiple advanced arguments.

Multiple advanced arguments:

`**example:arg1?adv_arg1=foo&adv_arg2=bar`

If and argument contains a `&` character, it must be escaped or quoted so it is not treated as a new advanced argument.

## Escaping Characters

All arguments support escaping individual characters using the `^` character.

An example of escaping `,`:

`**launch:/path/to (a^, game)/file.bin`

Which would correctly treat the path as a single argument because the `,` was escaped.

Or for a URL:

`**http.get:http://google.com/^?q=testing`

Which would avoid the `?` in the URL being treated as the start of an advanced argument.

All characters are accepted as escapable even if they don't do anything as part of the syntax:

`**delay:^1^0^0^0`

Would resolve as `1000` for the argument.

Some special characters may be inserted using escape sequences:

- `^n` for a newline character.
- `^t` for a tab character.
- `^r` for a carriage return character.

Keep in mind if these will still be trimmed at runtime if they're at the start or end of an argument, so you may need to quote them if you want to preserve them.

## Quoting Arguments

Arguments can also be quoted if (and only if) the first character in an argument is either a `"` or a `'` character.

Using quotes instead of escaping:

`**http.get:"http://google.com/?q=testing"`

Or:

`**http.get:'http://google.com/?q=testing'`

There's functionally no difference between these quotes; it's just your preference whatever works best for the argument.

If you need to use a quote character at the start of an argument, you can escape it.

Escape sequences are supported in quoted arguments as well, so you can use `^n`, `^t` and `^r` inside a quoted argument or escape the quote itself. Expressions are also supported in quoted arguments.

## When Condition

All commands support an advanced argument called `when` which allows for basic conditional control of running a command. See the [Expressions](#expressions) section for how to use this.

If the `when` advanced argument of a command resolves to either `true` or `yes` at runtime, the command will be run as usual. If not, the command will be silently skipped and Core will move to the next command in sequence.

A script that launches a different path on Windows:

`NES/Some/Game.bin?when=[[platform != "windows"]]||NES/Some/Other/Game.bin?when=[[platform == "windows"]]&launcher=AltNESLauncher`

## Expressions

ZapScript arguments support inline expressions using the [expr library](https://expr-lang.org/). If a `[[` is encountered with a matching `]]` at any point in an argument, it will be treated as an expression. The contents of an expression don't need to be escaped if they contain special characters, similar to how quoting works.

At runtime, when Core sees an expression string in an argument, it will be sent through to the expr library to be evaluated and the result will be injected back into the argument as a string.

Dynamic launch path using the device's platform:

`SNES/some/path/[[platform]]/file.bin` may resolve as `SNES/some/path/mister/file.bin`.

Launching a different game depending on the time:

`Genesis/hour [[now().Hour()]]/game.md` may resolve as `Genesis/hour 9/game.md`.

Running a game only on Linux:

`DOS/game.iso?when=[[device.os == "linux"]]`

An expression can be placed anywhere in an argument or as the entire argument. Multiple expressions can also be put in a single argument.

Expressions are ignored in quoted arguements and expression start/end markers may be escaped.

The return value of an expression may only be a simple type and will be converted to a string. Returning things like lists and objects is not supported and will cause an error.

Make sure to check the [expr documentation](https://expr-lang.org/docs/language-definition) for more information and options.

### Expression Environment

Expressions have access to a set of environment variables:

- `platform`: the platform which Core is currently running on. E.g. `batocera`
- `version`: the current running version of Core. E.g. `2.4.0`
- `scan_mode`: current reader scan mode set. E.g. `tap` or `hold`
- `device`: object with information about the device running Core.
  - `hostname`: hostname of the host device. E.g. `mister`
  - `os`: OS of the host device. E.g. `linux`, `windows` or `darwin` (Mac)
  - `arch`: architecture of the host device. E.g. `arm` or `amd64`
- `last_scanned`: object with information about the last scanned token, if any.
  - `id`: ID/UID of the token.
  - `value`: value/text contents of the token.
  - `data`: raw binary data of the token as a hex string.
- `media_playing`: returns true if media is currently playing. E.g. `true` or `false`
- `active_media`: object with information about the active media.
  - `launcher_id`: ID of the launcher which launched the media, if available.
  - `system_id`: ID of the media's system.
  - `system_name`: human-readable name of the system.
  - `path`: path to the media file. This can be used to launch the media.
  - `name`: name of the media.

Objects can be accessed with a `.`, for example `device.os` or `last_scanned.id`. Empty values will return an empty string, so if a token was never scanned, `last_scanned.value` would return an empty string.

The expression environment is resolved and set once before the running of each command. That means if you have multiple expressions set throughout a single command's arguments, they will all reference the same static environment values. Once Core moves to the next command, the values will be recalculated.

There is no guarantee that a command will update environment variables before the next command. For example, if a command launches media and the next command references the `active_media` variable, it may or may not have updated by the time the proceeding command's environment is calculated. In this case you should also use the `delay` command to give some time to process fully.

## JSON Arguments

If an argument starts with a `{` character, it will be specially parsed and validated as a JSON object until the matching `}` end character. This syntax is not currently used in production but has been reserved for future use.
