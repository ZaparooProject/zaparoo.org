# Mappings

**Mappings** are a feature of Zaparoo Core to assign custom [ZapScript](../zapscript/index.md) to a token based on some criteria to detect when that token has been scanned. This is useful for making tokens work with Zaparoo that don't have any rewritable storage, such as barcodes and NFC toys like Amiibos.

There are two main methods of managing mappings in an instance of Core. Other applications may use these methods to add management GUIs or automate creation of mappings.

If there is a conflict between these two methods, the **mappings database will take precedence**, as it's checked first when a scan happens.

## Processing Order and Normalization

When a token is scanned, Core processes mappings in this specific order:

### Processing Order
1. **Database mappings** (created via API) are checked first, in order of creation
2. **File mappings** (from `.toml` files) are checked second, in alphanumeric filename order
3. **Legacy platform mappings** (MiSTer only - for backwards compatibility with old CSV files)

The first matching mapping found will be applied, and no further mappings are evaluated.

### Normalization Rules
- **ID/UID normalization**: When matching against token IDs or UIDs, both the pattern and the token ID are normalized by:
  - Converting to lowercase
  - Removing spaces and colons
  - Example: `04:4E:D8:DA:ED:72:81` becomes `044ed8daed7281`
- **Text and Data matching**: No normalization is applied - patterns must match exactly as stored
- **Wildcard behavior**: Asterisks (`*`) are treated as wildcards for partial matching, not literal characters

## Mapping Files

In a subfolder called `mappings` in the data folder of Core, it's possible to add any number of [TOML](https://toml.io/en/) files (like the [config file](config.md)) which will define new mappings to be enabled on service start. Check the page for your [platform](../platforms/index.md) to see where this folder will be. You can organise your mappings in any number of subfolders.

### Examples

Here are various examples of mapping configurations:

**Basic ID matching** (`nfc-mappings.toml`):
```toml
# Exact match on NFC tag UID
[[mappings.entry]]
token_key = 'id'
match_pattern = '044ed8daed7281'
zapscript = '**launch.random:snes'
```

**Wildcard matching** (`barcode-mappings.toml`):
```toml
# Match any barcode starting with "978" (books)
[[mappings.entry]]
token_key = 'id'
match_pattern = '978*'
zapscript = '**launch.search:books'

# Match barcodes containing "pokemon"
[[mappings.entry]]
token_key = 'value'
match_pattern = '*pokemon*'
zapscript = '**launch.random:gbc/*pokemon*'
```

**Regular expression matching** (`regex-mappings.toml`):
```toml
# Match UIDs ending with specific pattern
[[mappings.entry]]
token_key = 'id'
match_pattern = '/.*7281$/'
zapscript = '**launch.system:nes'

# Match text with specific format
[[mappings.entry]]
token_key = 'value'
match_pattern = '/^GAME-\d{4}$/'
zapscript = '**launch.favorites'
```

**Data-based matching** (`amiibo-mappings.toml`):
```toml
# Match Amiibo by raw data pattern
[[mappings.entry]]
token_key = 'data'
match_pattern = '04*0327*'
zapscript = '**launch.system:switch/amiibo'
```

**Multiple mappings in one file** (`all-mappings.toml`):
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

The first example would trigger on a token with the ID "044ed8daed7281" (an [NFC tag](../tokens/nfc/index.md) UID) and run the ZapScript `**launch.random:snes` instead of whatever value may have been written to the token originally.

The name of the file doesn't matter except that it must end with the `.toml` file extension. Files in the mappings folder are read in alphanumeric order and stored this way in memory, so it's optional but may be useful to name them with this in mind. A single file may contain any number of entries as long as each mapping has its own `[[mappings.entry]]` header.

The `token_key` option is the key of a [token object](../tokens/index.md) this mapping will attempt to match against. It accepts 3 possible values:

- `id` (default): Match against the token's unique identifier (UID for NFC tags, barcode content for barcodes, etc.)
- `value`: Match against the stored text/value on the token
- `data`: Match against the raw token data as a hexadecimal string

This option is optional and will default to `id` if empty. Note that when using the [Core API](api/index.md) for managing mappings programmatically, these values correspond to `uid`, `text`, and `data` respectively.

The `match_pattern` option is the pattern used to match against the contents of the key above. Its behavior is different depending on the format given:

- By default, the pattern will be treated as an exact match, and must be exactly the same as the given key contents of the token. When matching against a token ID, the contents and pattern are both normalized to remove spaces, colons, and is converted to lowercase. This is to make it easier to match against NFC tag UIDs and barcodes, which do not have a standard display format.
- If the pattern contains one or more stars (`*`), it will use wildcard matching, treating the asterisks as wildcards that can match any characters. For example, to match part of a UID: `*ed8dae*`
- If the pattern is surrounded by forward slashes (`/`), it will be treated as a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions). For example: `/.*7281$/`

The `zapscript` option is the actual [ZapScript](../zapscript/index.md) you want to be run when the mapping is matched.

When adding or changing mapping files, the Core service must be restarted before the changes are loaded.

## API-based Mappings Management

In addition to managing mappings through configuration files, Core provides a comprehensive API for creating, updating, and managing mappings programmatically. These API-managed mappings are stored in the Core database and take precedence over file-based mappings.

### Available API Methods

- **`mappings`**: List all stored mappings (both active and inactive)
- **`mappings.new`**: Create a new mapping with specified parameters
- **`mappings.update`**: Modify an existing mapping by ID
- **`mappings.delete`**: Remove a mapping by ID
- **`mappings.reload`**: Reload file-based mappings from disk

### API Mapping Parameters

When creating or updating mappings via the API, you use these parameters:

- **`label`**: A human-readable display name for the mapping
- **`enabled`**: Boolean indicating if the mapping is active
- **`type`**: The token field to match against (`uid`, `text`, or `data`)
- **`match`**: The matching method (`exact`, `partial`, or `regex`)
- **`pattern`**: The pattern to match against the token
- **`override`**: The ZapScript to execute when matched

### Key Differences from File-based Mappings

- API mappings support a `label` field for easier identification
- API mappings use `uid`/`text`/`data` for the type field (vs `id`/`value`/`data` in files)
- API mappings can be enabled/disabled without restarting Core
- API mappings are stored in the database and persist across restarts

### Precedence and Processing Order

When a token is scanned, Core checks mappings in this order:

1. **Database mappings first** (created via API) - checked in order of creation
2. **File mappings second** (from `.toml` files) - checked in alphanumeric filename order

If any mapping matches, its ZapScript override is used and no further mappings are evaluated.

See the [Core API Methods](api/methods.md#mappings) documentation for detailed examples and complete parameter specifications.
