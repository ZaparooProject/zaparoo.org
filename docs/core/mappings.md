# Mappings

**Mappings** are a feature of Zaparoo Core to assign custom [ZapScript](../zapscript/index.md) to a token based on some criteria to detect when that token has been scanned. This is useful for making tokens work with Zaparoo that don't have any rewritable storage, such as barcodes and NFC toys like Amiibos.

There are two main methods of managing mappings in an instance of Core. Other applications may use these methods to add management GUIs or automate creation of mappings.

If there is a conflict between these two methods, the **mappings database will take precedence**, as it's checked first when a scan happens.

## Mapping Files

In a subfolder called `mappings` in the data folder of Core, it's possible to add any number of [TOML](https://toml.io/en/) files (like the [config file](config.md)) which will define new mappings to be enabled on service start. Check the page for your [platform](../platforms/index.md) to see where this folder will be. You can organise your mappings in any number of subfolders.

An example of a mapping config file called `1-test.toml` in the `mappings` folder:

```toml
[[mappings.entry]]
token_key = 'id'
match_pattern = '044ed8daed7281'
zapscript = '**launch.random:snes'
```

This mapping would trigger on a token with the ID "044ed8daed7281" (in this case an [NFC tag](../tokens/nfc/index.md) UID) to be scanned and then run the ZapScript `**launch.random:snes` instead of whatever value may have been written to the token originally.

The name of the file doesn't matter except that it must end with the `.toml` file extension. Files in the mappings folder are read in alphanumeric order and stored this way in memory, so it's optional but may be useful to name them with this in mind. A single file may contain any number of entries as long as each mapping has its own `[[mappings.entry]]` header.

The `token_key` option is the key of a [token object](../tokens/index.md) this mapping will attempt to match against. It accepts 3 possible values: `id`, `value`, `data`. This option is optional and will default to `id` if empty.

The `match_pattern` option is the pattern used to match against the contents of the key above. Its behavior is different depending on the format given:

- By default, the pattern will be treated as an exact match, and must be exactly the same as the given key contents of the token. When matching against a token ID, the contents and pattern are both normalized to remove spaces, colons, and is converted to lowercase. This is to make it easier to match against NFC tag UIDs and barcodes, which do not have a standard display format.
- _This type of match currently doesn't behave as expected and will always treat the pattern as if it was surrounded by two stars. This behavior will be fixed in a later update._ If the pattern contains one or more stars (`*`), it will use wildcard matching. For example, to match part of a UID: `*ed8dae*`
- If the pattern is surrounded by forward slashes (`/`), it will be treated as a regular expression. For example: `/.*7281$/`

The `zapscript` option is the actual [ZapScript](../zapscript/index.md) you want to be run when the mapping is matched.

When adding or changing mapping files, the Core service must be restarted before the changes are loaded.

## Mappings database

See [Core API](api/index.md) for details.
