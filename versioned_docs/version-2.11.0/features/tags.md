---
description: "Use Zaparoo tags to choose specific regions, languages, revisions, and other media variants when launching by title ID."
keywords: [zaparoo tags, title id tags, media tags zaparoo, region tags zaparoo]
---

# Tags

Tags are metadata labels that Zaparoo Core extracts from media filenames. They help Core choose between multiple matches for the same title, especially when your library has several regions, languages, revisions, demos, or bad dumps.

You will usually see tags when using [title IDs](../zapscript/launch.md#launchtitle). For example, this launches the US version of `Super Mario World` when more than one version is available:

```zapscript
@SNES/Super Mario World (region:us)
```

## Tag format

Tags use `type:value` format. The type is the category, and the value is the specific label.

| Part | Example |
| --- | --- |
| Tag type | `region` |
| Tag value | `us` |
| Full tag | `region:us` |

When a tag is part of a title ID, wrap it in parentheses:

```zapscript
@SNES/Game Title (region:eu) (lang:de)
```

## Filename tags

During media database updates, Core can parse known filename markers from ROM sets such as [No-Intro](https://no-intro.org/) and [TOSEC](https://www.tosec.org/). This behavior is controlled by [`filename_tags`](../core/config.md#filename_tags), which is enabled by default.

This filename:

```text
Sonic the Hedgehog (USA, Europe) (En,Fr,De) (Rev A).md
```

can produce tags like:

- `region:us`
- `region:eu`
- `lang:en`
- `lang:fr`
- `lang:de`
- `rev:a`

Core also extracts tags from other recognized markers, including years, disc numbers, versions, dumps, prototypes, demos, translations, and re-releases.

## Using tags in title IDs

Use tags when a title ID needs to be more specific than the game name alone.

```zapscript
@SNES/Super Mario World
@SNES/Super Mario World (region:us)
@SNES/Super Mario World (region:eu) (lang:de)
@Genesis/Sonic (+unfinished:demo)
@SNES/Game Title (~lang:en) (~lang:fr)
```

The first example lets Core choose the best match. The others require or exclude specific tagged matches.

### Operators

Tags support three operators in title IDs and `launch.title` tag arguments.

| Syntax | Meaning |
| --- | --- |
| `(tag:value)` or `(+tag:value)` | Match must have this tag. |
| `(-tag:value)` | Match must not have this tag. |
| `(~tag:value)` | At least one `~` tag must match. |

Examples:

```zapscript
@Genesis/Sonic (region:us)
@Genesis/Sonic (-unfinished:demo)
@SNES/Game Title (lang:en) (-unfinished:beta)
@SNES/Game Title (~lang:en) (~lang:fr)
```

The `tags` argument uses the same operators without parentheses:

```zapscript
**launch.title:Genesis/Sonic?tags=region:us,lang:en
**launch.title:Genesis/Sonic?tags=region:us,-unfinished:demo
```

## Matching behavior

When you launch by title ID, Core matches the title first, then uses tags to narrow or rank the results.

Core also filters out some variants by default, including demos, betas, prototypes, hacks, translations, bootlegs, re-releases, and bad dumps. If you want one of those variants, request it with a positive tag:

```zapscript
@Genesis/Sonic (+unfinished:demo)
@SNES/Game Title (+unfinished:beta)
@SNES/Game Title (+unlicensed:translation)
```

If several good matches remain, Core applies your configured region and language preferences, then other scoring rules such as launcher file type priority and filename quality.

## Default regions and languages

Set default preferences in the [`media`](../core/config.md#media) config section when you want Core to prefer certain regions or languages without writing tags into every title ID.

```toml
[media]
default_regions = ["us", "eu", "world"]
default_langs = ["en", "de"]
```

With those preferences, `@SNES/Super Mario World` will prefer matching US, European, or World releases, and English or German language tags, when those tags are present.

## Useful tag types

These are the tag types most likely to matter when writing title IDs by hand.

| Tag type | Used for | Examples |
| --- | --- | --- |
| `region` | Release region | `region:us`, `region:eu`, `region:jp`, `region:world` |
| `lang` | Language | `lang:en`, `lang:fr`, `lang:de`, `lang:ja` |
| `rev` | Revision or version | `rev:a`, `rev:b`, `rev:1`, `rev:prg0` |
| `year` | Release year | `year:1991`, `year:1996`, `year:19xx` |
| `unfinished` | Pre-release or incomplete builds | `unfinished:alpha`, `unfinished:beta`, `unfinished:demo`, `unfinished:proto` |
| `dump` | Dump quality or dump status | `dump:verified`, `dump:bad`, `dump:overdump`, `dump:underdump` |
| `unlicensed` | Unofficial releases and modifications | `unlicensed:bootleg`, `unlicensed:hack`, `unlicensed:translation` |
| `rerelease` | Digital re-releases and collections | `rerelease:virtualconsole:wii`, `rerelease:mdmini:1` |
| `reboxed` | Re-releases and packaging variants | `reboxed:playerschoice`, `reboxed:satakore` |
| `disc` and `disctotal` | Multi-disc sets | `disc:1`, `disc:2`, `disctotal:3` |
| `media` | Media type or side | `media:disc`, `media:tape`, `media:side-a` |
| `video` | Video standard | `video:ntsc`, `video:pal`, `video:pal-60` |

Core defines many more tag types than this, including hardware add-ons, embedded cartridge chips, compatibility tags, publishers, developers, genres, and player counts. Most users do not need to write those by hand.

## Credit

Zaparoo's tag taxonomy is inspired by [GameDataBase](https://github.com/PigSaint/GameDataBase), a game metadata project by [PigSaint](https://github.com/PigSaint). GameDataBase uses a deeper hierarchical tag system; Zaparoo uses simpler `type:value` tags for filename parsing and title matching.
