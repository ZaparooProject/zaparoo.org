---
description: "Zaparoo Core is the background service that reads tokens, launches media, manages readers, and exposes the API used by Zaparoo apps and tools."
keywords: [zaparoo core, zaparoo service, zaparoo background service, zaparoo api, open source game launcher]
---

# Zaparoo Core

Zaparoo Core is the service that runs on your MiSTer, PC, handheld, or media device. It sits in the background, watches for scans from [readers](../readers/index.md), reads the [ZapScript](../zapscript/index.md) from matching [tokens](../tokens/index.md), and launches the right game, app, script, or media file for that platform.

Core is the part of Zaparoo you install on the device that has access to your media library and launchers. The [Zaparoo App](../app/index.md), [Web UI](../app/web.md), command line tools, readers, and custom integrations all connect to or are managed by Core.

## What Core does

Core coordinates the main Zaparoo system:

- Manages reader connections for NFC readers, barcode scanners, optical drives, MQTT, file readers, and other supported reader types.
- Reads token data from NFC tags, NFC toys, QR codes, barcodes, optical discs, and mapped sources.
- Applies mappings and runs ZapScript for launches, input actions, playlists, and other commands.
- Builds and searches the local media database so scans can match games, apps, videos, scripts, and other launchable files.
- Starts, monitors, and controls media through built-in or custom [launchers](../features/launchers.md).
- Publishes the [Core API](./api/index.md), a local JSON-RPC API used by the app, web UI, CLI, and integrations.

## Installing and controlling Core

Start with the [platform guides](../platforms/index.mdx) for installation steps. Each platform has its own paths, startup behavior, launchers, and reader notes.

After Core is installed, you can control it through:

- The [Zaparoo App](../app/index.md) on iOS or Android.
- The embedded [Web UI](../app/web.md) at `http://<device-ip>:7497/app/`.
- The [command line](./cli.md), when supported by your platform.
- The [Core API](./api/index.md) for custom tools and integrations.

Most Core settings live in `config.toml`. See the [configuration reference](./config.md) for file locations, option names, and examples.

## Features and customization

Core includes user-configurable features for larger setups and custom workflows. The [features section](../features/index.md) covers mappings, playlists, launch guard, playtime limits, publishers, launcher controls, custom launchers, systems, and tags.

If you are setting up hardware, start with the [readers](../readers/index.md) and [tokens](../tokens/index.md) sections first. If you already have a reader working and want to control what a scan does, start with [ZapScript](../zapscript/index.md).

## Source and license

Zaparoo Core is free and open source under the GPLv3 license. The source code and releases are hosted in the [Zaparoo Core GitHub repository](https://github.com/ZaparooProject/zaparoo-core/).
