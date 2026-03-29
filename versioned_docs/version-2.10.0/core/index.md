# Zaparoo Core

Zaparoo Core is a software service which runs in the background of supported platform devices. This service manages and coordinates all aspects of making Zaparoo work as a system, including:

- Supporting [NFC reader hardware](../readers) communication and managing reader connections
- Supporting different types of [NFC tags](../tokens) and reading data from them
- Interpreting and launching [token commands](../zapscript)
- Launching, managing and monitoring media and associated [launchers](./launchers)
- Indexing, storing and querying a database of media available from the device
- Publishing and managing its own device instance of the [Core API](./api/)

The core Zaparoo software is free and open source under the GPLv3 license, hosted and developed on [GitHub](https://github.com/ZaparooProject/zaparoo-core/) including releases.
