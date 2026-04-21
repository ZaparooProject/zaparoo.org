---
description: "Use LEGO Dimensions figures as Zaparoo tokens: each tag's unique UID can be mapped to launch a game or trigger any ZapScript action."
keywords: [lego dimensions zaparoo, lego dimensions nfc, nfc toy game launcher zaparoo]
---

# Lego Dimensions

Lego Dimensions character and vehicle tags use [NTAG213](../nfc/ntag.md) NFC chips. Zaparoo can read them, but the data stored on them is encrypted and specific to the Lego Dimensions game, so it can't be used directly.

Instead, you use [mappings](../../features/mappings.md) to assign an action to each tag based on its UID. Every physical Lego Dimensions tag has a unique UID, so each one is mapped individually.

## Setting up with the Zaparoo App

The easiest way to map a Lego Dimensions tag is through the [Zaparoo App](../../app/index.md):

1. Go to **Create > Add a Mapping**
2. Tap the **NFC** button and hold the tag to your phone
3. The UID auto-populates in the token ID field
4. Write a ZapScript or use the command palette to pick a game
5. Tap **Save mapping**

The mapping syncs to your connected Zaparoo device. Next time that tag is scanned on your reader, it runs the assigned script.

## Setting up with mapping files

You can also create mappings manually by adding a `.toml` file to your mappings folder. See the [mappings documentation](../../features/mappings.md) for details on file format and location.

```toml
[[mappings.entry]]
token_key = 'uid'
match_pattern = '04:b1:2c:d3:e4:5f:70'
zapscript = '**launch.search:Lego Batman'
```

Replace the UID with the one reported in your Zaparoo logs when scanning the tag.
