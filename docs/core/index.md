# Zaparoo Core

Zaparoo Core is a software service which runs in the background of supported platform devices. This service manages and coordinates all aspects of making Zaparoo work as a system, including:

- Supporting [NFC reader hardware](../readers) communication and managing reader connections
- Supporting different types of [NFC tags](../tokens) and reading data from them
- Interpreting and launching [token commands](../zapscript)
- Launching, managing and monitoring media and associated [launchers](./launchers)
- Indexing, storing and querying a database of media available from the device
- Publishing and managing its own device instance of the [Core API](./api/index.md)

The core Zaparoo software is free and open source under the GPLv3 license, hosted and developed on [GitHub](https://github.com/ZaparooProject/zaparoo-core/) including releases.

## See Also

- **[Configuration](./config)** - Configure Core settings and behavior
- **[Reader Drivers](./drivers)** - Available hardware drivers for different reader types
- **[Launchers](./launchers)** - Media launchers and custom launcher creation
- **[Systems](./systems)** - Supported gaming systems and media types
- **[Mappings](./mappings)** - Map tokens to custom actions without writing to the token
- **[Core API](./api/)** - Programmatically interact with Core
