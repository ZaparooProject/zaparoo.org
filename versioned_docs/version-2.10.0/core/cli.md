# Command Line

Most [Zaparoo Core](./index.md) distributions ship with a common command line interface (CLI) that can be used to interact with the [API](./api/index.md). This interface is the same on every platform that supports it, and can be safely used as a scripting target.

The name of the Zaparoo core binary may differ slightly on your platform. For example, [MiSTer](../platforms/mister/index.md) ships with a binary named `zaparoo.sh`, whereas [Linux](../platforms/linux/index.md) ships with a binary named `zaparoo`. Functionally they're the same, just replace the filename in the examples.

:::note Windows
The [Windows](../platforms/windows/index.md) distribution does not support CLI flags and always runs with a GUI (system tray).
:::

## Common Flags

These flags are available on all platforms:

### Help

- **Flag:** `-help`
- **Argument:** none (boolean switch)
- **Example:** `./zaparoo -help`

The most important one. This will output a list of all available command line flags along with a brief summary of each.

### Version

- **Flag:** `-version`
- **Argument:** none (boolean switch)
- **Example:** `./zaparoo -version`

Outputs this Zaparoo binary's build version (not the currently started API service).

### API Request

- **Flag:** `-api`
- **Argument:** string
- **Example:** `./zaparoo -api 'launch:{"text":"**launch.system:menu"}'`

Sends a single request to the [Zaparoo API](./api/index.md), waits for a response and then outputs the result body of that response. The format is `method:parameters` where parameters is a JSON string.

### Run

- **Flag:** `-run`
- **Argument:** string
- **Example:** `./zaparoo -run "**launch.random:arcade"`

Sends the string argument to the API via the run method, as if a token with that text on it was scanned.

### Launch (Deprecated)

- **Flag:** `-launch`
- **Argument:** string
- **Example:** `./zaparoo -launch "**launch.random:arcade"`

:::caution Deprecated Feature
This flag is deprecated and is an alias of `-run`. Use `-run` instead.
:::

### Write

- **Flag:** `-write`
- **Argument:** string
- **Example:** `./zaparoo -write "SNES/MyGame.sfc"`

If a [reader](../readers/index.md) is physically connected to the device and has the capability to write to a token, try to write the given string to that token. Reports an error if the token couldn't be written and times out after 30 seconds.

### Read

- **Flag:** `-read`
- **Argument:** none (boolean switch)
- **Example:** `./zaparoo -read`

Print the next scanned token without running any actions. Useful for debugging or checking what text is stored on a token.

### Config

- **Flag:** `-config`
- **Argument:** none (boolean switch)
- **Example:** `./zaparoo -config`

Start the text-based user interface (TUI) to handle Zaparoo configuration.

### Reload

- **Flag:** `-reload`
- **Argument:** none (boolean switch)
- **Example:** `./zaparoo -reload`

Reloads the [config file](config.md) from disk and re-reads any [mapping files](mappings.md) from disk.

## Platform-Specific Flags

These flags are only available on certain platforms:

### Linux

#### Install

- **Flag:** `-install`
- **Argument:** string (component name)
- **Valid components:** `application`, `desktop`, `service`, `hardware`
- **Example:** `./zaparoo -install service`

Install a specific Zaparoo component. Components can be installed individually:

- `application` - Core application files
- `desktop` - Desktop integration (menu entries, icons)
- `service` - Systemd service configuration
- `hardware` - Hardware permissions and udev rules

#### Uninstall

- **Flag:** `-uninstall`
- **Argument:** string (component name)
- **Valid components:** `application`, `desktop`, `service`, `hardware`
- **Example:** `./zaparoo -uninstall service`

Uninstall a specific Zaparoo component.

#### Daemon

- **Flag:** `-daemon`
- **Argument:** none (boolean switch)
- **Example:** `./zaparoo -daemon`

Run the service in the foreground with no user interface.

#### Start

- **Flag:** `-start`
- **Argument:** none (boolean switch)
- **Example:** `./zaparoo -start`

Start the service and open the web UI in the default browser. If the service is not installed, it will be installed automatically.

### SteamOS

#### Install

- **Flag:** `-install`
- **Argument:** none (boolean switch)
- **Example:** `./zaparoo -install`

Install the Zaparoo service. Must be run as root.

#### Uninstall

- **Flag:** `-uninstall`
- **Argument:** none (boolean switch)
- **Example:** `./zaparoo -uninstall`

Uninstall the Zaparoo service. Must be run as root.

### Batocera

#### Service

- **Flag:** `-service`
- **Argument:** string (`start`, `stop`, `restart`, or `status`)
- **Example:** `./zaparoo -service start`

Manage the Zaparoo service state.

#### Install

- **Flag:** `-install`
- **Argument:** none (boolean switch)
- **Example:** `./zaparoo -install`

Install the Zaparoo service file to `/userdata/system/services/`.

#### Uninstall

- **Flag:** `-uninstall`
- **Argument:** none (boolean switch)
- **Example:** `./zaparoo -uninstall`

Remove the Zaparoo service file.

### MiSTer

#### Service

- **Flag:** `-service`
- **Argument:** string (`start`, `stop`, `restart`, or `status`)
- **Example:** `./zaparoo -service start`

Manage the Zaparoo service state.

#### Add Startup

- **Flag:** `-add-startup`
- **Argument:** none (boolean switch)
- **Example:** `./zaparoo -add-startup`

Add the Zaparoo service to MiSTer startup if not already added.

#### Show Loader

- **Flag:** `-show-loader`
- **Argument:** string (file path)
- **Example:** `./zaparoo -show-loader "/tmp/loader.json"`

Display a loading widget based on a JSON configuration file.

#### Show Notice

- **Flag:** `-show-notice`
- **Argument:** string (file path)
- **Example:** `./zaparoo -show-notice "/tmp/notice.json"`

Display a notice widget based on a JSON configuration file.

#### Show Picker

- **Flag:** `-show-picker`
- **Argument:** string (file path)
- **Example:** `./zaparoo -show-picker "/tmp/picker.json"`

Display a picker widget based on a JSON configuration file.
