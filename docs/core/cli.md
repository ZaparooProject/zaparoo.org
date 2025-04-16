# CLI Arguments

All [Zaparoo Core](/docs/core) distributions ship with a common command line interface (CLI) that can be used to interact with the [API](/docs/core/api). This interface is the same on every platform that Zaparoo works on, and can be safely used as a scripting target.

The name of the Zaparoo core binary may differ slightly between platforms. The examples on this page will target [MiSTer](/docs/platforms/mister) which ships with a binary named `zaparoo.sh`, whereas Windows ships with a binary named `Zaparoo.exe`. Functionally they're the same, just replace the filename in the examples.

If a platform's binary displays a GUI when run without arguments, the GUI will not be display when at least one of these flags are enabled.

## Help

**Flag:** `-help`  
**Argument:** none (boolean switch)  
**Example:** `./zaparoo.sh -help`

The most important one. This will output a list of all available command line flags along with a brief summary of each.

## Version

**Flag:** `-version`  
**Argument:** none (boolean switch)  
**Example:** `./zaparoo.sh -version`

Outputs this Zaparoo binary's build version (not the currently started API service).

## API Request

**Flag:** `-api`  
**Argument:** string  
**Example:** `./tapzaparooto.sh -api 'launch:{"text":"**launch.system:menu"}'`

Sends a single request to the [Zaparoo API](../core/api/index.md), waits for a response and then outputs the result body of that response.

## Launch

**Flag:** `-launch`  
**Argument:** string  
**Example:** `./zaparoo.sh -launch "**launch.random:arcade"`

Sends the string argument to the API as a launch command, as if a token with that text on it was scanned.

## Write

**Flag:** `-write`  
**Argument:** string  
**Example:** `./zaparoo.sh -write "SNES/MyGame.sfc"`

If a [reader](../readers/index.md) is physically connected to the device and has the capability to write to a token, try to write the given string to that token. Reports an error if the token couldn't be written and times out after 30 seconds.
