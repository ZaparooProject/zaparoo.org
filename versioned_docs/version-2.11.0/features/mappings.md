---
description: Map NFC card UIDs, barcodes, or token text to custom ZapScript commands using Zaparoo mapping files or the Core API.
keywords: [zaparoo mappings, nfc uid mapping, amiibo mapping, barcode mapping zaparoo, zapscript mapping]
---

# Mappings

Mappings let Zaparoo Core run custom [ZapScript](../zapscript/index.md) when a scanned token matches a UID, barcode, stored text, or raw data pattern. They are useful for read-only tokens, including [barcodes](../tokens/qr-codes.md) and NFC toys like [Amiibos](../tokens/nfc-toys/amiibo.md), where you cannot write ZapScript directly to the token.

Core can load mappings from local TOML files or from mappings stored in its database through the API. Database mappings are checked first. If a database mapping matches, Core uses that ZapScript and does not check file mappings or legacy platform mappings.

## Mapping files

Create mapping files in the `mappings` folder inside the Core data folder. Check the page for your [platform](../platforms/index.mdx) to find that folder. You can organize mappings in subfolders, and each mapping file must use the `.toml` extension.

Each file can contain any number of entries. Every entry starts with `[[mappings.entry]]` and needs at least `match_pattern` and `zapscript`.

```toml
[[mappings.entry]]
match_pattern = '044ed8daed7281'
zapscript = '**launch.random:snes'
```

This example matches the NFC tag UID `044ed8daed7281` and runs `**launch.random:snes` instead of any ZapScript stored on the token.

When adding or changing mapping files, restart Core so the changes are loaded. API clients can also call `mappings.reload` when they need to reload file mappings directly.

## Matching fields

Use `token_key` to choose which token field Core should match. If `token_key` is omitted, Core matches against `id`.

| `token_key` | Matches |
| --- | --- |
| `id` | The token's identifier, such as an NFC UID or barcode contents. |
| `value` | The text stored on the token. |
| `data` | The raw token data as a hexadecimal string. |

For API-managed mappings, the stored type names are also `id`, `value`, and `data`. The API still accepts the older `uid` and `text` names for compatibility, and API responses may return those older names.

## Match patterns

The `match_pattern` value controls how the selected token field is matched.

| Pattern format | Behavior | Example |
| --- | --- | --- |
| Plain text | Exact match. For `id` matches, Core normalizes both values by trimming outer whitespace, converting to lowercase, and removing colons. | `044ed8daed7281` |
| Contains `*` | Partial match. Core removes the `*` characters and checks whether the remaining text appears anywhere in the field. | `978*` matches any ID containing `978`. |
| Wrapped in `/` | Regular expression. Core removes the surrounding slashes before compiling the expression. | `/^GAME-\d{4}$/` |

For `value` and `data` matches, exact and partial matching use the text exactly as stored. Regex patterns are not normalized.

## Examples

### Match an NFC UID

```toml
[[mappings.entry]]
token_key = 'id'
match_pattern = '04:4E:D8:DA:ED:72:81'
zapscript = '**launch.random:snes'
```

UID matching is normalized, so this also matches `044ed8daed7281`.

### Match a barcode

```toml
[[mappings.entry]]
token_key = 'id'
match_pattern = '978*'
zapscript = '**launch.search:books'
```

Because `*` creates a partial match, this matches any barcode ID containing `978`.

### Match stored token text

```toml
[[mappings.entry]]
token_key = 'value'
match_pattern = '*pokemon*'
zapscript = '**launch.random:gbc/*pokemon*'
```

### Match with a regular expression

```toml
[[mappings.entry]]
token_key = 'value'
match_pattern = '/^GAME-\d{4}$/'
zapscript = '**launch.favorites'
```

### Match raw token data

```toml
[[mappings.entry]]
token_key = 'data'
match_pattern = '*0327*'
zapscript = '**launch.system:switch/amiibo'
```

Raw data is matched as a hexadecimal string.

## Multiple mappings

Core checks database mappings first, then file mappings, then legacy platform mappings such as MiSTer CSV mappings. The first match wins.

Within mapping files, entries are loaded from `.toml` files in the `mappings` folder and its subfolders. File ordering can matter when two mappings could match the same token, so keep more specific mappings before broader ones when they are in the same file.

```toml
# NFC tag for SNES games
[[mappings.entry]]
match_pattern = '044ed8daed7281'
zapscript = '**launch.random:snes'

# Barcode for retro gaming
[[mappings.entry]]
token_key = 'id'
match_pattern = '/^[0-9]{13}$/'
zapscript = '**launch.search:retro'

# Text value override
[[mappings.entry]]
token_key = 'value'
match_pattern = 'old-script'
zapscript = '**launch.system:genesis'
```

## API-managed mappings

Core also exposes API methods for creating, updating, deleting, listing, and reloading mappings. API-managed mappings are stored in the Core database, can be enabled or disabled without restarting Core, and take precedence over file mappings.

| Method | Purpose |
| --- | --- |
| `mappings` | List stored mappings. |
| `mappings.new` | Create a mapping. |
| `mappings.update` | Update a mapping by ID. |
| `mappings.delete` | Delete a mapping by ID. |
| `mappings.reload` | Reload file mappings from disk. |

See the [Core API methods](../core/api/methods.md#mappings) documentation for request parameters and examples.
