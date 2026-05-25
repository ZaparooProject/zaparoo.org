---
description: "Zaparoo Core command line reference for running ZapScript, calling the Core API, writing tokens, reloading settings, and managing platform services."
keywords: [zaparoo cli, zaparoo command line, zaparoo core cli, zaparoo scripting cli]
---

# Command Line

Zaparoo Core includes a command line interface for local scripting, quick tests, and platform service management. Most action flags call the local [Core API](./api/index.md), so Core needs to be running and reachable on the same device unless the flag starts or manages the service itself.

The executable name depends on the platform. [MiSTer FPGA](../platforms/mister/index.md) uses `zaparoo.sh`, while [Linux](../platforms/linux/index.md) usually uses `zaparoo`. Replace the executable name in the examples with the one from your platform.

```bash
./zaparoo -version
./zaparoo -run "**launch.system:menu"
```

Run `-help` on your installed binary for the exact flags supported by that build.

## Common flags

These flags are defined by the shared Core CLI and are available in current command-line builds.

| Flag | Argument | Description |
| ---- | -------- | ----------- |
| `-help` | None | Prints the available flags for the current binary. |
| `-version` | None | Prints the binary version and platform ID, then exits. |
| `-run` | ZapScript string | Runs text as [ZapScript](../zapscript/index.md), like a scanned token. |
| `-launch` | ZapScript string | Deprecated alias of `-run`. |
| `-api` | `method:params` | Calls one [Core API method](./api/index.md) and prints the response. |
| `-read` | None | Prints the next scanned token without running its actions. |
| `-write` | Text string | Writes text to the next token found by a write-capable reader. |
| `-reload` | None | Reloads `config.toml` and mapping files from disk. |
| `-pair` | None | Starts app/client pairing and prints the pairing result when complete. |

The `-config` flag may appear in `-help` output because it is still defined by the shared parser. In current Core source it does not run a separate action; start the [TUI](tui.md) or use the [Web UI](../app/web.md) for configuration instead.

## Run ZapScript

Use `-run` when you want the CLI to behave like a scanned token. The argument is ZapScript, so it can be a media path, launcher command, input command, or several commands joined with `||`.

```bash
./zaparoo -run "**launch.system:menu"
./zaparoo -run "SNES/Super Metroid.sfc"
```

`-launch` still works as an alias for older scripts, but new scripts should use `-run`.

## Call the API

Use `-api` to send one raw API call to the local Core service. The format is the method name, a colon, then the JSON parameters for that method.

```bash
./zaparoo -api 'run:{"text":"**launch.system:menu"}'
./zaparoo -api 'settings.reload'
```

If the method does not need parameters, omit the colon and JSON body. The CLI prints the response body returned by Core.

For method names and parameter shapes, see the [API methods reference](./api/methods.md).

## Read or write tokens

Use `-read` to wait for the next token scan and print its stored text without running the token.

```bash
./zaparoo -read
```

Use `-write` to write text to the next token detected by a write-capable reader.

```bash
./zaparoo -write "SNES/Super Metroid.sfc"
./zaparoo -write "**launch.system:menu"
```

While reading or writing, Core temporarily disables normal ZapScript execution so the scanned token is handled by the CLI action instead of launching media.

## Reload settings

Use `-reload` after editing the [config file](config.md) or [mapping files](../features/mappings.md) while Core is running.

```bash
./zaparoo -reload
```

This calls the `settings.reload` API method. Settings that require a full service restart still need the service to be restarted.

## Pair a client

Use `-pair` to start the same pairing flow used by clients such as the [Zaparoo App](../app/index.md).

```bash
./zaparoo -pair
```

Core prints a PIN to the terminal. Enter that PIN in the client app. When pairing succeeds, the CLI prints the pairing response as a single line.

## Platform flags

Platform builds add their own service, UI, and installer flags. These are the user-facing flags in current Core source.

### Linux, SteamOS, Bazzite, and ChimeraOS

These Linux desktop-style builds share the same extra flags.

| Flag | Argument | Description |
| ---- | -------- | ----------- |
| `-install` | `application`, `desktop`, `service`, or `hardware` | Installs one component. |
| `-uninstall` | `application`, `desktop`, `service`, or `hardware` | Uninstalls one component. |
| `-daemon` | None | Runs the service in the foreground with no TUI. |
| `-start` | None | Starts the user service if needed and opens the Web UI in the browser. |

Examples:

```bash
./zaparoo -install service
./zaparoo -install hardware
./zaparoo -start
```

Outside install and uninstall commands, do not run these builds as root. The Linux service is a user service, and Core exits if normal service or UI mode starts with root privileges.

### MiSTer FPGA and MiSTeX

| Flag | Argument | Description |
| ---- | -------- | ----------- |
| `-service` | `start`, `stop`, `restart`, or `status` | Manages the Zaparoo service. |
| `-add-startup` | None | Adds Zaparoo to MiSTer startup if it is not already there. |
| `-show-loader` | JSON file path | Shows a MiSTer loading widget. |
| `-show-notice` | JSON file path | Shows a MiSTer notice widget. |
| `-show-picker` | JSON file path | Shows a MiSTer picker widget. |

Examples:

```bash
/media/fat/Scripts/zaparoo.sh -service restart
/media/fat/Scripts/zaparoo.sh -add-startup
```

The widget flags are mainly used by Core and MiSTer integrations. They expect a JSON configuration file path.

### Batocera

| Flag | Argument | Description |
| ---- | -------- | ----------- |
| `-service` | `start`, `stop`, `restart`, or `status` | Manages the Zaparoo service. |
| `-install` | None | Installs the Batocera service file. |
| `-uninstall` | None | Removes the Batocera service file. |

Examples:

```bash
/userdata/system/zaparoo -service restart
/userdata/system/zaparoo -install
```

### LibreELEC

| Flag | Argument | Description |
| ---- | -------- | ----------- |
| `-service` | `start`, `stop`, `restart`, or `status` | Manages the Zaparoo service. |

Example:

```bash
/storage/zaparoo -service restart
```

### macOS

| Flag | Argument | Description |
| ---- | -------- | ----------- |
| `-daemon` | None | Runs the service without the TUI or system tray UI. |
| `-gui` | None | Runs the service with the system tray UI. |

Without either flag, the macOS build starts the local [TUI](tui.md) after starting or connecting to the Core service.

### Windows

Windows does not support CLI arguments. The Windows build is compiled as a GUI application and starts Core in the system tray.

Windows also refuses to run with elevated administrator rights. Start it as your normal user.
