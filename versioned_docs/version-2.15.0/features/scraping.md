---
description: "How Zaparoo Core scraping imports local metadata and artwork into your media library using the gamelist.xml and media-folder scrapers."
keywords: [zaparoo scraping, zaparoo gamelist.xml, zaparoo artwork, emulationstation media folder, zaparoo metadata]
---

# Scraping

Scraping enriches your indexed media with extra metadata and artwork. Media indexing finds your files and creates the records; scraping fills those records with details like cover art, descriptions, developers, and genres.

Scrapers only update media that already exists in your library. They never create, move, or delete your games, and a scrape never changes the files on disk.

:::info Local sources only
Core's built-in scrapers read metadata and artwork that already exist on your device. They do not download anything from the internet. To fetch artwork, scrape it first with a tool like MiSTer Companion or Skraper, then run a Zaparoo scrape to import the results.
:::

## Running a scrape

Start a scrape from the [Zaparoo App](../app/index.md) under **Settings**, or from the [TUI](../core/tui.md) under **Manage media**.

You can scrape your whole library or pick specific [systems](./systems.md). Only one scrape runs at a time, and scraping cannot run while a media database update is in progress. A running scrape can be paused, resumed, or cancelled.

By default a scrape skips media that has already been scraped, so repeat runs are quick. A **force** (full re-scrape) processes everything again, refreshes existing metadata, and cleans up references to artwork files that have since been removed.

## Scrapers

Core currently includes two scrapers, both based on the [EmulationStation](https://emulationstation.org/) folder conventions used by distributions like [Batocera](../platforms/batocera/index.md), RetroBat, ES-DE, RetroDECK, and RetroPie. Both run on all [platforms](../platforms/index.mdx) wherever the matching files are present.

### gamelist.xml

The `gamelist.xml` scraper imports EmulationStation metadata from a `gamelist.xml` file in each system's games folder. This is the richer of the two scrapers and brings in both text metadata and artwork.

It imports:

- **Tags**: developer, publisher, year, genre, rating, player count, plus per-file region and language. These feed into the [tag system](./tags.md#scraped-tags-and-labels) for matching and filtering.
- **Descriptions** and the game's ScreenScraper ID.
- **Artwork and media paths**: box art (2D, 3D, side, back), screenshots, title screens, marquees, wheels and logos, fan art, maps, plus videos and PDF manuals.

When a `gamelist.xml` entry does not list an image directly, the scraper falls back to looking in the system's `media/` folder, the same place the media-folder scraper reads.

### media-folder

The `media-folder` scraper imports artwork from EmulationStation-style `media/` folders without needing a `gamelist.xml`. Use it when you have media folders but no gamelist, or to pick up artwork a gamelist did not list.

It only imports images. It does not read descriptions, tags, videos, or manuals.

For each game, it looks under `<system folder>/media/` in convention-named subfolders and matches files by the game's filename. For example, for `SNES/Super Mario World.sfc` it looks for files like:

```text
SNES/media/images/Super Mario World.png
SNES/media/boxart/Super Mario World.jpg
SNES/media/screenshot/Super Mario World.png
```

Common subfolders include `images`, `boxart` (and `cover`, `box2dfront`), `boxart3d`, `screenshot`, `thumbnail`, `marquee`, `wheel` (and `logo`), `fanart`, `titleshot`, and `map`. Supported image types are PNG, JPG, JPEG, and WEBP. Games in subfolders are matched against the mirrored path first, then the flat filename.

When a system exists in more than one indexed root, such as the normal games folder plus an [`index_root`](../core/config.md#index_root), Core checks each root's `media/` folder in root order and uses the first matching file. The same lookup applies when `gamelist.xml` falls back to `media/`. This lets setups with ROMs on one root and artwork on another use the same EmulationStation `media/` folder layout.

A force re-scrape also removes image references that follow this naming convention when their file is no longer on disk.

## What scraping produces

Scraped text values become [tags](./tags.md), which Core uses to choose between similar media and which you can filter on when launching by title. Scraped artwork is shown in the Zaparoo App when you browse your library.

For the full metadata field mapping and the API methods used to start scrapes and read scraped data, see the [scraper subsystem reference](../core/contributing/scraper.md).
