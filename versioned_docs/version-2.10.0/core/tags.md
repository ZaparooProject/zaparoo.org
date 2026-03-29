# Tags

Tags are metadata labels automatically extracted from media filenames and used to filter, search, and identify games in Zaparoo. They're a core part of the [title ID system](../zapscript/launch.md#launchtitle) and make it possible to handle conflicts and preferences when matching games.

:::info Credit
The Zaparoo tag system is heavily inspired by the [GameDatabase](https://github.com/PigSaint/GameDataBase) project by [PigSaint](https://github.com/PigSaint). GameDatabase is an ambitious project to personally curate and categorize games with a unique hierarchical tagging system. If you find the Zaparoo tag system useful, consider supporting PigSaint's work on [Patreon](https://www.patreon.com/GameDataBase).
:::

## What Are Tags?

Tags work like search filters on a website. You have your main search query (the game name), and then you can add tags to narrow down results. For example, if you have both European and US versions of a game, you can use a `region:eu` tag to specifically launch the European version.

Tags are organized into **types** (categories) and **values**:

- Tag type: `region` (the category)
- Tag value: `eu` (the specific region)
- Full tag: `region:eu`

## Where Tags Come From

### Automatic Extraction

Tags are automatically extracted from filenames during media database updates. Zaparoo recognizes common naming conventions from ROM sets like [No-Intro](https://no-intro.org/) and [TOSEC](https://www.tosec.org/).

For example, this filename:

```
Sonic the Hedgehog (USA, Europe) (En,Fr,De) (Rev A).md
```

Generates these tags:
- `region:us`
- `region:eu`
- `lang:en`
- `lang:fr`
- `lang:de`
- `rev:a`

### Future: Scraped Metadata

In the future, tags will also be generated from scraped metadata sources for additional information like game genres, player counts, and ratings.

## Using Tags

### In Title IDs

Tags are used in title IDs to resolve conflicts and specify preferences:

**Basic title ID** (no tags):
```
@SNES/Super Mario World
```

**With region filter** (launches US version):
```
@SNES/Super Mario World (region:us)
```

**With multiple tags** (launches German language, European region):
```
@SNES/Super Mario World (region:eu) (lang:de)
```

**Excluding unwanted versions** (exclude beta versions):
```
@SNES/Super Mario World (-unfinished:beta)
```

**Multiple language options** (English OR French):
```
@SNES/Game Title (~lang:en) (~lang:fr)
```

### Tag Operators

Tags support three operators:

- **No operator** or **`+`**: MUST have this tag (AND filter)
- **`-`**: MUST NOT have this tag (NOT filter)
- **`~`**: At least ONE of these tags must match (OR filter)

Examples:

```
@Genesis/Sonic (+region:us)              # Must be US region
@Genesis/Sonic (-unfinished:demo)        # Must not be a demo
@SNES/Game (+lang:en) (-unfinished:beta) # English, not a beta
@SNES/Game (~lang:en) (~lang:fr)         # English OR French
```

### In Web UI Search

Tags can be used as search filters in the Web UI media search page. Select tag filters to narrow down results when browsing your media library.

## Common Tag Types

Here are the most useful tag types extracted from filenames:

### Region

Where the game was released:

- `region:us` - United States
- `region:eu` - Europe
- `region:jp` - Japan
- `region:world` - Global release
- `region:au`, `region:br`, `region:cn`, `region:fr`, `region:de`, `region:it`, `region:kr`, etc.

### Language

Language(s) the game supports:

- `lang:en` - English
- `lang:fr` - French
- `lang:de` - German
- `lang:es` - Spanish
- `lang:ja` - Japanese
- `lang:pt`, `lang:it`, `lang:ru`, `lang:zh`, etc.

Multiple languages in a filename like `(En,Fr,De)` generate separate tags for each language.

### Unfinished

Development status and unofficial versions:

- `unfinished:alpha` - Alpha version
- `unfinished:beta` - Beta version
- `unfinished:demo` - Demo version
- `unfinished:proto` - Prototype
- `unfinished:sample` - Sample version

### Dump Quality

ROM dump quality (from No-Intro/TOSEC naming):

- `dump:verified` - Verified good dump
- `dump:good` - Good dump
- `dump:bad` - Bad dump (corrupted)
- `dump:overdump` - Overdumped ROM
- `dump:underdump` - Underdumped ROM

### Revision

Game revision or version:

- `rev:a`, `rev:b`, `rev:c` - Alphabetic revisions
- `rev:1`, `rev:2`, `rev:3` - Numeric revisions

### Video Format

Video standard:

- `video:ntsc` - NTSC (North America, Japan)
- `video:pal` - PAL (Europe, Australia)
- `video:pal-60` - PAL at 60Hz

### Year

Release year:

- `year:1991`
- `year:1996`
- `year:2004`

### Unlicensed

Unofficial releases:

- `unlicensed:pirate` - Pirated game
- `unlicensed:bootleg` - Bootleg version
- `unlicensed:hack` - ROM hack
- `unlicensed:translation` - Fan translation
- `unlicensed:trainer` - Game trainer

### Disc/Media

Multi-disc games:

- `disc:1`, `disc:2`, `disc:3` - Disc number
- `disctotal:2`, `disctotal:3` - Total discs in set
- `media:side-a`, `media:side-b` - Tape/disc sides

## How Tag Matching Works

When you launch a game using a title ID, Zaparoo uses a multi-step resolution process:

1. **Name matching**: Exact or fuzzy match on the game title
2. **User tag filters**: If you specified tags, filter to matches with those tags
3. **Automatic variant exclusion**: Filters out demos, betas, prototypes, alphas, samples, hacks, translations, bootlegs, clones, and bad dumps (unless you explicitly requested one with a positive tag like `+unfinished:demo`)
4. **Re-release filtering**: Prefers original releases over re-releases and reboxed versions
5. **Region preferences**: Ranks results based on your configured preferred regions
6. **Language preferences**: Ranks results based on your configured preferred languages
7. **File type priority**: Prefers file types based on launcher extension order
8. **Quality scoring**: Final tie-breaker using filename quality heuristics

This happens in under a second, usually instantly.

## Tag Format

Tags use this format:

```
type:value
```

- All lowercase
- Spaces become dashes
- Colons separate type from value
- Hierarchical values use more colons (e.g., `gamegenre:rpg:action`)

When writing tags in title IDs, wrap them in parentheses:

```
@SNES/Game Name (tag1:value1) (tag2:value2)
```

## Examples

### Choosing a Specific Region

**Problem**: You have multiple regional versions and want a specific one

```
Street Fighter II (USA).md
Street Fighter II (Europe).md
Street Fighter II (Japan).md
```

**Solution**: Use region tags to specify which version

```
@SNES/Street Fighter II (region:us)   # Launch US version
@SNES/Street Fighter II (region:eu)   # Launch EU version
@SNES/Street Fighter II (region:jp)   # Launch JP version
```

Without tags, the resolution will use your configured region preferences from `config.toml`.

### Language Preference

**Problem**: You want a specific language version of a multilingual game

```
@SNES/Super Mario World (lang:de)     # German version
@SNES/Game (~lang:en) (~lang:fr)      # English OR French
```

### Specific Revision

**Problem**: Multiple revisions exist and you want a specific one

```
@N64/Legend of Zelda Ocarina of Time (rev:a)
```

### Explicitly Requesting a Demo or Beta

**Problem**: You specifically want to play a demo/beta version

```
@Genesis/Sonic (+unfinished:demo)     # Launch demo version
@SNES/Game (+unfinished:beta)         # Launch beta version
```

Note: Without explicit positive tags like these, demos and betas are automatically excluded. Using `-unfinished:demo` is unnecessary since they're already filtered out by default.

## Advanced: Setting Default Preferences

You can set your preferred languages and regions in the [config file](./config.md) so Zaparoo automatically prioritizes them when resolving titles without explicit tags:

```toml
[preferences]
languages = ["en", "de"]
regions = ["us", "eu"]
```

With these preferences set, searching for `@SNES/Super Mario World` will automatically prefer English language and US/EU regions if multiple versions exist.

## Complete Tag Type Reference

### Automatically Extracted from Filenames

These tags are extracted during media database updates:

| Tag Type       | Description                                     | Examples                            |
| -------------- | ----------------------------------------------- | ----------------------------------- |
| `region`       | Release region                                  | `us`, `eu`, `jp`, `world`           |
| `lang`         | Language                                        | `en`, `fr`, `de`, `ja`              |
| `year`         | Release year                                    | `1991`, `1996`, `2004`, `19xx`      |
| `unfinished`   | Development status                              | `alpha`, `beta`, `demo`, `proto`    |
| `dump`         | ROM dump quality                                | `verified`, `bad`, `cracked`        |
| `rev`          | Revision number                                 | `a`, `b`, `1`, `2`, `prg0`          |
| `video`        | Video format                                    | `ntsc`, `pal`, `pal-60`, `vga`      |
| `unlicensed`   | Unofficial releases                             | `pirate`, `hack`, `translation`     |
| `disc`         | Disc number (multi-disc games)                  | `1`, `2`, `3`                       |
| `disctotal`    | Total discs in set                              | `2`, `3`, `4`                       |
| `media`        | Media type/side                                 | `disc`, `tape`, `side-a`, `cart`    |
| `alt`          | Alternate version                               | `alt`, `1`, `2`                     |
| `set`          | Set number                                      | `1`, `2`                            |
| `edition`      | Edition markers                                 | `version`, `edition`, `remaster`    |
| `copyright`    | Copyright status (TOSEC)                        | `pd`, `fw`, `sw`                    |
| `addon`        | External peripherals required/recommended       | `controller:rumble`, `lightgun:zapper` |
| `embedded`     | Internal cartridge hardware                     | `chip:sa1`, `backup:battery`        |
| `arcadeboard`  | Arcade system boards                            | `capcom:cps2`, `sega:system16`      |
| `compatibility`| System compatibility                            | `gameboy:color`, `amiga:a1200`      |
| `reboxed`      | Re-releases and special editions                | `satakore`, `playerschoice`         |
| `port`         | Ported from other platforms                     | `arcade`, `commodore:c64`           |
| `rerelease`    | Digital re-releases and collections             | `virtualconsole:wii`, `mdmini:1`    |
| `multigame`    | Multi-game compilations                         | `compilation`, `vol:1`, `menu`      |
| `distribution` | Digital distribution platforms                  | `virtualconsole`, `wiiware`         |
| `supplement`   | Supplementary content                           | `dlc`, `expansion`, `update`        |

### Future: Scraped Metadata Tags

These will be available when metadata scraping is implemented:

| Tag Type        | Description                | Examples                               |
| --------------- | -------------------------- | -------------------------------------- |
| `gamegenre`     | Game genre                 | `action`, `rpg`, `racing:driving`      |
| `players`       | Player count/modes         | `1`, `2`, `4`, `coop`, `vs`            |
| `input`         | Input devices              | `joystick:4`, `lightgun`, `paddle`     |
| `save`          | Save mechanism             | `backup`, `password`                   |
| `based`         | Source material            | `movie`, `manga`, `anime`              |
| `search`        | Search metadata            | `franchise:castlevania`, `tate:cw`     |
| `perspective`   | Camera view angle          | `firstperson`, `topdown`, `isometric`  |
| `art`           | Art style                  | `2d`, `3d`, `pixelart`, `celshaded`    |
| `accessibility` | Accessibility features     | `visual:colorblindmode`, `audio:subtitles` |
| `season`        | TV season number           | `1`, `2`                               |
| `episode`       | TV episode number          | `1`, `2`                               |
| `track`         | Music track number         | `1`, `2`                               |
| `issue`         | Comic/magazine issue       | `1`, `2`                               |
| `volume`        | Comic/book volume          | `1`, `2`                               |
| `extension`     | File extension             | Dynamic based on system configurations |
| `mameparent`    | MAME parent ROM relationship| Dynamic ROM names                     |
