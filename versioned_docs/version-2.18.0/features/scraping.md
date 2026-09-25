---
sidebar_position: 8
sidebar_label: Media Database and Scraping
description: "Update the Zaparoo Core media database and import local metadata and artwork with the gamelist.xml, media-folder, mister-docs, mister-arcade, and pinup-popper scrapers."
keywords: [zaparoo media database, zaparoo scraper, zaparoo gamelist.xml, zaparoo artwork, emulationstation media folder, mister arcade metadata]
---

# Media Database and Scraping

Core's media database is a rebuildable index of games, apps, videos, music, and other launchable media on your device. A media database update finds those items and makes them searchable. Scraping then enriches the indexed records with local metadata and artwork such as cover images, descriptions, developers, and genres.

If you use Zaparoo Frontend on MiSTer, start with [Add Artwork and Metadata](../frontend/scraping.mdx) for a task-oriented setup guide. This page is the detailed Core reference for database updates, scraper behavior, paths, and supported files.

Database updates and scrapes never move, modify, or delete your games. Scrapers only update media that already exists in the database.

:::info Archive support depends on the platform
On MiSTer, Zaparoo can browse ZIP archives like folders and index supported files inside them. Other platforms cannot browse or launch a file inside a ZIP archive. A launcher may still support the ZIP file itself as media when `.zip` is one of its declared formats. Check the relevant [platform launcher documentation](../platforms/index.mdx) rather than assuming one system's archive behavior applies everywhere.
:::

## Updating the media database

Update the database after adding or removing media, installing games in a supported launcher, or changing launcher paths. Start an update from either interface:

- In the Zaparoo App, open **Settings > Manage Media**, choose **All systems** or specific systems, then select **Update media database**.
- In the [terminal UI](../core/tui.md#managing-media), open **Manage media** and start an update.

After changing settings, mappings, or custom launchers outside the app, [reload Core](../core/tui.md#reload-core) before updating the database. This lets Core rediscover launcher configuration before it scans for media.

The rebuildable media database is separate from Core's user database, which stores favorites, launcher overrides, history, and token mappings. If the media database is corrupt, Core can [rebuild it without deleting that user data](../core/cli.md#database-recovery). Scraped metadata and artwork must be imported again after a rebuild.

A folder that holds one game, such as a PlayStation folder with one `.cue` and its `.bin` tracks or one `.m3u` and its discs, is shown as that game when you browse, with its artwork and tags, instead of as a plain folder. This includes a folder holding a single ROM, and a folder of loose disc images (`.cue`, `.chd`, `.iso`, `.bin`, `.img`, or `.pbp`) that all belong to the same title. Folders with several games or nested folders stay ordinary folders.

:::info Local sources only
Core's built-in scrapers read metadata and artwork that already exist on your device. They do not download anything from the internet. To fetch artwork, scrape it first with a tool like MiSTer Companion or Skraper, then run a Zaparoo scrape to import the results.
:::

## Running a scrape

Start a scrape from the [Zaparoo App](../app/index.md) under **Settings**, or from the [TUI](../core/tui.md) under **Manage media**.

You can scrape your whole library, specific [systems](./systems.md), or a single game or folder in clients that offer it. Only one scrape runs at a time, and scraping cannot run while a media database update is in progress. A running scrape can be paused, resumed, or cancelled, and one interrupted by a restart picks up where it left off.

By default a scrape skips media that has already been scraped, so repeat runs are quick. A **force** (full re-scrape) processes everything again, refreshes existing metadata, and cleans up references to artwork files that have since been removed.

## Scrapers

The `gamelist.xml` and `media-folder` scrapers are based on the [EmulationStation](https://emulationstation.org/) folder conventions used by distributions like [Batocera](../platforms/batocera/index.md), RetroBat, ES-DE, RetroDECK, and RetroPie, and run on all [platforms](../platforms/index.mdx) wherever the matching files are present. `mister-docs` reads the artwork and manual databases Update All installs on a MiSTer, `mister-arcade` reads the MiSTer arcade catalog, and `pinup-popper` reads the PinUP Popper library on Windows.

### gamelist.xml

The `gamelist.xml` scraper imports EmulationStation metadata from a `gamelist.xml` file in each system's games folder. This is the richer of the two scrapers and brings in both text metadata and artwork.

It imports:

- **Tags**: developer, publisher, year, genre, rating, player count, plus per-file region and language. These feed into the [tag system](./tags.md#scraped-tags) for matching and filtering.
- **Descriptions** and the game's ScreenScraper ID.
- **Artwork and media paths**: box art (2D, 3D, side, back), screenshots, title screens, marquees, wheels and logos, fan art, maps, plus videos and PDF manuals.

When a `gamelist.xml` entry does not list an image directly, the scraper falls back to looking in the system's `media/` folder, the same place the media-folder scraper reads.

`<folder>` entries, and `<game>` entries whose path is a folder, apply to the game a per-game disc folder is shown as, including ES-DE's convention of naming that folder with a ROM extension.

#### Custom gamelist bundles

You can keep `gamelist.xml` metadata and artwork in a separate directory instead of copying them into each ROM folder. Set a bundle root in `config.toml`:

```toml
[scraper.gamelist_xml]
custom_path = "/path/to/gamelists"
```

Create one subdirectory for each exact [system ID](./systems.md):

```text
/path/to/gamelists/
├── NES/
│   ├── gamelist.xml
│   ├── assets/
│   └── media/
└── SNES/
    ├── gamelist.xml
    └── media/
```

Core checks `<custom_path>/<system ID>/gamelist.xml` for every indexed system. Custom bundles only enrich games already in the media database; they do not create systems or game entries. Run a [media database update](../core/tui.md#managing-media) before scraping when the games have not been indexed yet.

Game `<path>` values in a custom gamelist resolve against the system's first ROM root. Artwork, video, and manual paths resolve against the custom system directory, so an image such as `./assets/cover.png` is read from `<custom_path>/<system ID>/assets/cover.png`.

For custom bundles, Core only stores an explicit image path when the file exists. If that image is missing, Core looks through EmulationStation-style `media/` folders in this order:

1. The custom system directory
2. The system's ROM roots, in configured order

A bundle can provide metadata before all of its artwork is installed. Run a force re-scrape after adding more artwork.

A normal `gamelist.xml` beside the ROMs takes precedence when it and the custom bundle both match the same game. Invalid or malformed custom files are logged and skipped without stopping other systems from scraping.

A `gamelist.xml` that cannot be read, because it is invalid XML or over the size limit, is skipped and named in an Inbox warning when the scrape ends, and the rest of the scrape carries on. The file can be up to 128 MB, or 16 MB on MiSTer, which does not have the memory for a larger one; a library that big can import its artwork through [media folders](#media-folder) instead.

#### MiSTer arcade gamelists

Scrapers like Skraper write arcade gamelists against MAME ROM sets such as `pacman.zip`, while MiSTer launches `.mra` files. On MiSTer, an entry whose `<path>` is a ROM set name is matched to the `.mra` that names that set, and artwork is looked up by the set name too. When more than one installed `.mra` uses the same set name, the entry is skipped; use an exact `.mra` path to pick one.

Put the gamelist in a [custom bundle](#custom-gamelist-bundles) under an `Arcade` directory, or beside the `.mra` files in `_Arcade`:

```text
/media/fat/metadata/
└── Arcade/
    ├── gamelist.xml
    └── images/
        └── pacman.png
```

[Hardware classifications](../platforms/mister/launchers.md#hardware-classification) such as `CPS1` have no folder of their own, so a bundle directory named after the classification is the only way to scrape them.

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

A per-game folder that Core shows as one game also matches artwork named after the folder, so `PSX/media/boxart/Cool Game.png` beside a `PSX/Cool Game/` disc folder works without a gamelist. Any other folder can have artwork too: for `SNES/RPGs/`, Core checks `SNES/media/boxart/RPGs.png` and shows it as the folder's cover in clients that display folder art. It does not make the folder launchable.

When a system exists in more than one indexed root, such as the normal games folder plus an [`index_root`](../core/config/launchers.md#index_root), Core checks each root's `media/` folder in root order and uses the first matching file. The same lookup applies when `gamelist.xml` falls back to `media/`. This lets setups with ROMs on one root and artwork on another use the same EmulationStation `media/` folder layout.

A force re-scrape also removes image references that follow this naming convention when their file is no longer on disk.

### mister-docs

The `mister-docs` scraper is MiSTer only. It imports artwork, game information, synopses, and manuals from the **Game Artwork DBs** and **Game Manuals (EN) DBs** that [Update All](https://github.com/theypsilon/Update_All_MiSTer) installs under `docs/<system>/` on any MiSTer storage root, including the SD card, USB drives, network storage, and custom index roots. The artwork databases follow the [MiSTer Artwork Pack](https://github.com/chipster6502/MiSTer_artwork_pack) format. It never downloads anything itself.

In each system's `docs` folder it reads:

- `Artwork/index.tsv` and the images it lists, which become box art.
- `gameinfo.tsv`, if present, which becomes `year`, `genre`, `developer`, and `players` [tags](./tags.md). Games it lists without an image still get their metadata.
- `synopsis_<lang>.tsv` files, if present, which become the game's description. Core uses the first language in [`media.default_langs`](../core/config/media.md#default_langs) that the pack has, then English, then whatever is there.
- PDF files in a child folder whose name contains `manual`, which become the game's manual.

Games are matched by their catalogued ROM name first, or for arcade by the set name inside each `.mra` file, then by a unique title. Update All's **Game Manuals (EN) DBs** provide the manuals. Run the scraper again after Update All refreshes the packs; a force run also removes box art and manual references whose files are gone.

### mister-arcade

The `mister-arcade` scraper runs on MiSTer and MiSTeX. It fills in arcade metadata from the [MiSTer arcade catalog](https://github.com/MiSTer-devel/ArcadeDatabase_MiSTer), which Core already downloads. Games are matched by the MAME set name inside each `.mra`, not by filename. It imports the year, developer, genre, series, arcade board, player count and whether players take turns, controls and button count, 15 kHz or 31 kHz video, vertical (tate) monitor rotation, and region, revision, and bootleg details for each set.

It runs on its own after a media database update that indexed arcade games and only fills in fields that are empty, so artwork and metadata from `gamelist.xml` or `mister-docs` are kept. Run it with force to refresh what it wrote. Sets the catalog does not list, mostly under `_Arcade/_alternatives`, are skipped.

### pinup-popper

The `pinup-popper` scraper is Windows only and appears when the [PinUP Popper launcher](../platforms/windows/launchers.md#pinup-popper) finds a Popper installation. It imports each table's year, manufacturer, player count, notes, genre, and wheel, playfield, backglass, and flyer images from Popper's own library. It runs on its own after a media database update for tables that have no metadata yet; run a force scrape to refresh tables that were already imported.

## What scraping produces

Scraped values become [tags](./tags.md) when Core can translate them into its tag vocabulary; a value it cannot translate is left out. Core uses tags to choose between similar media, and you can filter on them when launching by title. Scraped artwork is shown in the Zaparoo App when you browse your library, and descriptions and manuals appear in clients that display them, such as [Zaparoo Frontend](../frontend/index.mdx).

For the full metadata field mapping and the API methods used to start scrapes and read scraped data, see the [scraper subsystem reference](../core/contributing/scraper.md), a developer page maintained in the Core repository.
