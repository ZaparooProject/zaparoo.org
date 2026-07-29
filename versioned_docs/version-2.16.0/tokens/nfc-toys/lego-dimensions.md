---
description: "Use LEGO Dimensions tags as Zaparoo tokens by mapping each tag's UID to ZapScript."
keywords: [lego dimensions zaparoo, lego dimensions nfc, nfc toy game launcher zaparoo]
---

# LEGO Dimensions

LEGO Dimensions character and vehicle tags use [NTAG213](../nfc/ntag.md) NFC chips. Zaparoo can read them, but the data stored on them is encrypted and specific to the LEGO Dimensions game, so it isn't used directly.

Use [mappings](../../features/mappings.md) to assign an action to each tag based on its UID. Every physical LEGO Dimensions tag has its own UID, so each one is mapped individually.

## Setting up with the Zaparoo App

You can map a LEGO Dimensions tag through the [Zaparoo App](../../app/index.md):

1. Go to **Create > Add a Mapping**
2. Tap the **NFC** button and hold the tag to your phone
3. The UID auto-populates in the token ID field
4. Enter ZapScript or use the command palette to pick a game
5. Tap **Save mapping**

The mapping syncs to your connected Zaparoo device. Next time that tag is scanned on your reader, it runs the assigned script.

## Setting up with mapping files

You can also create mappings manually by adding a `.toml` file to Zaparoo Core's `mappings` folder. See the [mappings documentation](../../features/mappings.md) for file locations and matching rules.

```toml
[[mappings.entry]]
token_key = 'id'
match_pattern = '04:b1:2c:d3:e4:5f:70'
zapscript = '**launch.search:LEGO Batman'
```

Replace the UID with the one reported in your Zaparoo logs when scanning the tag.
