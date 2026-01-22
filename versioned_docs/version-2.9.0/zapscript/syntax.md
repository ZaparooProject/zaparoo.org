---
sidebar_position: 7
---

# Syntax

A ZapScript script is a simple flat list of commands which are run in sequence:

```zapscript
Genesis/Some Game.md?launcher=AltMegaDrive||**delay:500||**echo:"Hello, World!"
```

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

### Media Title Syntax

ZapScript also supports a special syntax for launching media by title lookup. If a command section starts with `@` or contains a `/` separator without a file extension, it's parsed as a media title lookup.

For example: `@SNES/Super Mario World` would search for a game titled "Super Mario World" in the SNES system.

See the [launch command documentation](./launch.md#launchtitle) for full details on media title syntax and inline tag filtering.

## Commands

A command is run by writing `**`, a command name, and optionally some arguments.

Using advanced arguments:

```zapscript
**launch:SNES/Some Game.sfc?launcher=LLAPISNES
```

Using multiple positional arguments:

```zapscript
**launch.random:genesis,snes,nes
```

No arguments:

```zapscript
**stop
```

All argument values are automatically trimmed, so any whitespace before or after the value will be removed before being run. An argument should be quoted if this behavior isn't wanted.

### Positional Arguments

Commands may have one or more positional arguments, which are separated by a `,` character. Positional arguments begin with a `:` character immediately after the command name.

Arguments containing `,` or `?` must be escaped or quoted so they are not treated as new arguments.

### Advanced Arguments

Commands can also have advanced arguments which start with a `?` and are then defined using a key value pair similar to a URL, using `=` to separate a key with its value, and `&` to separate multiple advanced arguments.

Multiple advanced arguments:

```zapscript
**example:arg1?adv_arg1=foo&adv_arg2=bar
```

If an argument contains a `&` character, it must be escaped or quoted so it is not treated as a new advanced argument.

## Escaping Characters

All arguments support escaping individual characters using the `^` character.

An example of escaping `,`:

```zapscript
**launch:/path/to (a^, game)/file.bin
```

Which would correctly treat the path as a single argument because the `,` was escaped.

Or for a URL:

```zapscript
**http.get:http://google.com/^?q=testing
```

Which would avoid the `?` in the URL being treated as the start of an advanced argument.

All characters are accepted as escapable even if they don't do anything as part of the syntax:

```zapscript
**delay:^1^0^0^0
```

Would resolve as `1000` for the argument.

Some special characters may be inserted using escape sequences:

- `^n` for a newline character.
- `^t` for a tab character.
- `^r` for a carriage return character.

Keep in mind these will still be trimmed at runtime if they're at the start or end of an argument, so you must quote them if you want to preserve them.

## Quoting Arguments

Arguments can also be quoted if (and only if) the first character in an argument is either a `"` or a `'` character.

Using quotes instead of escaping:

```zapscript
**http.get:"http://google.com/?q=testing"
```

Or:

```zapscript
**http.get:'http://google.com/?q=testing'
```

There's functionally no difference between these quotes; it's just your preference whatever works best for the argument.

If you need to use a quote character at the start of an argument, you can escape it.

Escape sequences are supported in quoted arguments as well, so you can use `^n`, `^t` and `^r` inside a quoted argument or escape the quote itself. Expressions are also supported in quoted arguments.

## When Condition

All commands support an advanced argument called `when` which allows for basic conditional control of running a command. See the [Expressions](#expressions) section for how to use this.

If the `when` advanced argument of a command resolves to either `true` or `yes` at runtime, the command will be run as usual. If not, the command will be silently skipped and Core will move to the next command in sequence.

A script that launches a different path on Windows:

```zapscript
NES/Some/Game.bin?when=[[platform != "windows"]]||NES/Some/Other/Game.bin?when=[[platform == "windows"]]&launcher=AltNESLauncher
```

## Expressions

ZapScript arguments support inline expressions using the [expr library](https://expr-lang.org/). If a `[[` is encountered with a matching `]]` at any point in an argument, it will be treated as an expression. The contents of an expression don't need to be escaped if they contain special characters, similar to how quoting works.

At runtime, when Core sees an expression string in an argument, it will be sent through to the expr library to be evaluated and the result will be injected back into the argument as a string.

Dynamic launch path using the device's platform:

```zapscript
SNES/some/path/[[platform]]/file.bin
```

This may resolve as `SNES/some/path/mister/file.bin`.

Launching a different game depending on the time:

```zapscript
Genesis/hour [[now().Hour()]]/game.md
```

This may resolve as `Genesis/hour 9/game.md`.

Running a game only on Linux:

```zapscript
DOS/game.iso?when=[[device.os == "linux"]]
```

An expression can be placed anywhere in an argument or as the entire argument. Multiple expressions can also be put in a single argument.

Expression start/end markers may be escaped if you need to use literal `[[` or `]]` in an argument.

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
- `scanned`: object with information about the token currently being scanned. Only available in the `on_scan` hook.
  - `id`: ID/UID of the token.
  - `value`: value/text contents of the token.
  - `data`: raw binary data of the token as a hex string.
- `launching`: object with information about the media being launched. Only available in the `before_media_start` hook.
  - `launcher_id`: ID of the launcher launching the media.
  - `system_id`: ID of the media's system.
  - `path`: path to the media file.

Objects can be accessed with a `.`, for example `device.os` or `last_scanned.id`. Empty values will return an empty string, so if a token was never scanned, `last_scanned.value` would return an empty string.

The expression environment is resolved and set once before the running of each command. That means if you have multiple expressions set throughout a single command's arguments, they will all reference the same static environment values. Once Core moves to the next command, the values will be recalculated.

There is no guarantee that a command will update environment variables before the next command. For example, if a command launches media and the next command references the `active_media` variable, it may or may not have updated by the time the proceeding command's environment is calculated. In this case you should also use the `delay` command to give some time to process fully.

## JSON Arguments

If an argument starts with a `{` character, it will be specially parsed and validated as a JSON object until the matching `}` end character. This is used by [playlist commands](./playlist.md#inline-json) for inline playlist definitions.

## Zap Links

Zap Links is a feature that allows querying and running remote ZapScript scripts on the fly from a remote HTTP/S URL.

For example, the following URL is written to a token: `https://zpr.au/c$abcd1234`

Every time the token is scanned, Core will make a request to this URL checking for a ZapScript payload. If it successfully receives one, it will run that ZapScript instead. Core will not cache this value, so the payload can be dynamic.

The payload itself is just a snippet of plaintext ZapScript to be run, with no special extra formatting. The only condition is that this payload has the MIME-type `application/vnd.zaparoo.zapscript` in the response's `Content-Type` header.

Core detects Zap Link support by domain. When a domain is encountered for the first time on a token, Core will query for the file `/.well-known/zaparoo` which must exist and contain the JSON payload `{"zapscript":1}`. If successful, this result will be cached and any subsequent URLs will be treated as zap links immediately. If the query fails, it will also be cached and that domain will be silently ignored for 30 days before being re-checked.

:::warning
Currently all ZapScript received via a zap link will be tagged as "unsafe" which will disable the `input.keyboard`, `input.gamepad` and `execute` commands from running. This may be configurable in the future.
:::

### Platform Detection

Zap Link servers receive headers identifying the device making the request:

| Header             | Description      | Example                                   |
| ------------------ | ---------------- | ----------------------------------------- |
| `Zaparoo-OS`       | Operating system | `linux`, `windows`, `darwin`              |
| `Zaparoo-Arch`     | CPU architecture | `amd64`, `arm`, `arm64`                   |
| `Zaparoo-Platform` | Zaparoo platform | `mister`, `steamos`, `bazzite`, `windows` |

Servers can use these headers to serve different scripts for different devices from the same URL.

### Self-Hosting

It's easy to host your own Zap Link server as long as it follows the conventions above.

Here's an example in Python which would serve a directory of text files as zap links:

```python
from flask import Flask, send_file, abort, Response
import os

app = Flask(__name__)

@app.route("/.well-known/zaparoo")
def zaparoo_meta():
    return {"zapscript": 1}

@app.route("/<zap_id>")
def serve_zaplink(zap_id):
    filename = f"zaps/{zap_id}.txt"
    if not os.path.exists(filename):
        abort(404)
    with open(filename, "rb") as f:
        content = f.read()
        return Response(
            content,
            mimetype="application/vnd.zaparoo.zapscript"
        )

if __name__ == "__main__":
    app.run()
```

## Deprecated Commands

These older command names are kept for compatibility. New scripts should use the current names.

| Deprecated  | Use Instead                                           |
| ----------- | ----------------------------------------------------- |
| `key`       | [`input.keyboard`](./input.md#inputkeyboard)          |
| `input.key` | [`input.keyboard`](./input.md#inputkeyboard)          |
| `coinp1`    | [`input.coinp1`](./input.md#inputcoinp1--inputcoinp2) |
| `coinp2`    | [`input.coinp2`](./input.md#inputcoinp1--inputcoinp2) |
| `random`    | [`launch.random`](./launch.md#launchrandom)           |
| `shell`     | [`execute`](./utilities.md#execute)                   |
| `command`   | [`execute`](./utilities.md#execute)                   |
| `system`    | [`launch.system`](./launch.md#launchsystem)           |
| `get`       | [`http.get`](./http.md#httpget)                       |
| `ini`       | [`mister.ini`](./mister.md#misterini)                 |
