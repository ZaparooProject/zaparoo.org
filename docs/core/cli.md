# Command Line

All [Zaparoo Core](/docs/core) distributions ship with a common command line interface (CLI) that can be used to interact with the [API](/docs/core/api). This interface is the same on every platform that Zaparoo works on, and can be safely used as a scripting target.

The name of the Zaparoo core binary may differ slightly on your platform. For example, [MiSTer](/docs/platforms/mister) ships with a binary named `zaparoo.sh`, whereas [Windows](/docs/platforms/windows) ships with a binary named `Zaparoo.exe`. Functionally they're the same, just replace the filename in the examples.

If a platform's binary displays a GUI when run without arguments, the GUI will not be display when at least one of these flags are enabled.

## Help

**Flag:** `-help`  
**Argument:** none (boolean switch)  
**Example:** `./zaparoo -help`

The most important one. This will output a list of all available command line flags along with a brief summary of each. This will also show any platform-specific flags not listed here.

## Version

**Flag:** `-version`  
**Argument:** none (boolean switch)  
**Example:** `./zaparoo -version`

Outputs this Zaparoo binary's build version (not the currently started API service).

## API Request

**Flag:** `-api`  
**Argument:** string  
**Example:** `./zaparoo -api 'launch:{"text":"**launch.system:menu"}'`

Sends a single request to the [Zaparoo API](../core/api/index.md), waits for a response and then outputs the result body of that response.

## Run

**Flag:** `-run`  
**Argument:** string  
**Example:** `./zaparoo -run "**launch.random:arcade"`

Sends the string argument to the API via the run method, as if a token with that text on it was scanned.

## Write

**Flag:** `-write`  
**Argument:** string  
**Example:** `./zaparoo -write "SNES/MyGame.sfc"`

If a [reader](../readers/index.md) is physically connected to the device and has the capability to write to a token, try to write the given string to that token. Reports an error if the token couldn't be written and times out after 30 seconds.

## Reload

**Flag:** `-reload`  
**Argument:** none (boolean switch)  
**Example:** `./zaparoo -reload`

Reloads the [config file](config.md) from disk and re-reads any [mapping files](mappings.md) from disk.
