# Disney Infinity

Disney Infinity figures use [MIFARE](../nfc/mifare.md) NFC chips. Zaparoo can read them, but the data stored on them is specific to the Disney Infinity game, so it can't be used directly.

Instead, you use [mappings](../../features/mappings.md) to assign an action to each figure based on its UID. Every physical Disney Infinity figure has a unique UID, so each one is mapped individually.

## Setting up with the Zaparoo App

The easiest way to map a Disney Infinity figure is through the [Zaparoo App](../../app/index.md):

1. Go to **Create > Add a Mapping**
2. Tap the **NFC** button and hold the figure to your phone
3. The UID auto-populates in the token ID field
4. Write a ZapScript or use the command palette to pick a game
5. Tap **Save mapping**

The mapping syncs to your connected Zaparoo device. Next time that figure is scanned on your reader, it runs the assigned script.

## Setting up with mapping files

You can also create mappings manually by adding a `.toml` file to your mappings folder. See the [mappings documentation](../../features/mappings.md) for details on file format and location.

```toml
[[mappings.entry]]
token_key = 'uid'
match_pattern = '04:5d:60:ba:4f:48:80'
zapscript = '**launch.search:Disney Infinity'
```

Replace the UID with the one reported in your Zaparoo logs when scanning the figure.
