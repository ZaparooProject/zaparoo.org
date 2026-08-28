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
- The [terminal UI](./tui.md), when available for your platform.
- The [command line](./cli.md), when supported by your platform.
- The [Core API](./api/index.md) for custom tools and integrations.

Most Core settings live in `config.toml`. See the [configuration reference](./config.md) for file locations, option names, and examples.

## Media database and scraping

Core keeps a rebuildable media database so the app, Web UI, TUI, and ZapScript can search for games and other launchable media. Update it after adding files, installing games in a supported launcher, or changing launcher paths. Scraping is a separate step that imports local metadata and artwork into those indexed records.

The [media database and scraper guide](../features/scraping.md) explains how to update all systems or selected systems, run scrapers, and recover a damaged media database without deleting favorites, history, mappings, or launcher overrides.

## Maintenance and troubleshooting

Use these starting points for Core maintenance tasks:

| Task | Start here |
| ---- | ---------- |
| Reload settings, mappings, or launchers | [Reload Core from the TUI](./tui.md#reload-core) or [command line](./cli.md#reload-core) |
| Restart or manage the Core service | [Platform command-line flags](./cli.md#platform-flags) and your [platform guide](../platforms/index.mdx) |
| Find, view, or export logs | [TUI logs](./tui.md#logs) and the log path in your [platform guide](../platforms/index.mdx) |
| Update the media database or run a scraper | [Media database and scraper guide](../features/scraping.md) |
| Back up before making changes | [Device backups](../features/backups.md), local for free or automatic with Warp |
| Edit `config.toml` | [Configuration reference](./config.md) |
| Recover a corrupt media database | [Database recovery](./cli.md#database-recovery) |
| Update or uninstall Core | Your [platform guide](../platforms/index.mdx); uninstall steps are platform-specific |

Direct uninstall instructions are available for [Linux](../platforms/linux/install.md#uninstalling), [SteamOS](../platforms/steamos/index.md#uninstall), [Bazzite](../platforms/bazzite.mdx#uninstall), [ChimeraOS](../platforms/chimeraos.mdx#uninstall), [Windows](../platforms/windows/index.md#uninstall), and [RePlayOS](../platforms/replayos.md#uninstall).

## Features and customization

Core includes optional features for larger setups and custom workflows. The [features section](../features/index.md) covers device backups, profiles, playlists, audio playback, play controls, mappings, tags, scraping, systems, hooks, launchers, and publishers.

If you are setting up hardware, start with the [readers](../readers/index.md) and [tokens](../tokens/index.md) sections first. If you already have a reader working and want to control what a scan does, start with [ZapScript](../zapscript/index.md).

## For developers

The [Core API](./api/index.md) reference and the [Developer Guide](./contributing/index.md) are maintained in the Core repository and published here automatically, so they read differently from the rest of these docs. The [Zaparoo CLI](https://github.com/ZaparooProject/zaparoo-cli) is the maintained command-line client for scripts, tests, and AI agents.

## Source and license

Zaparoo Core is free and open source under the GPLv3 license. The source code and releases are hosted in the [Zaparoo Core GitHub repository](https://github.com/ZaparooProject/zaparoo-core/).
