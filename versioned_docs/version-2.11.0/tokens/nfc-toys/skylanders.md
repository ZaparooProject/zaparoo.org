---
description: "Use Skylanders figures as Zaparoo tokens by mapping each figure's NFC UID to ZapScript."
keywords: [skylanders zaparoo, skylanders nfc token, skylanders game launcher, skylanders uid zaparoo]
---

# Skylanders

Skylanders figures use [MIFARE Classic 1K](../nfc/mifare.md) NFC chips. Zaparoo can read their UID with compatible NFC hardware, but the data stored on them is encrypted and specific to the Skylanders game, so it isn't used directly.

Use [mappings](../../features/mappings.md) to assign an action to each figure based on its UID. Every physical Skylanders figure has its own UID, so each one is mapped individually.

## Setting up with the Zaparoo App

On phones that can read MIFARE Classic tags, you can map a Skylanders figure through the [Zaparoo App](../../app/index.md):

1. Go to **Create > Add a Mapping**
2. Tap the **NFC** button and hold the figure to your phone
3. The UID auto-populates in the token ID field
4. Enter ZapScript or use the command palette to pick a game
5. Tap **Save mapping**

The mapping syncs to your connected Zaparoo device. Next time that figure is scanned on your reader, it runs the assigned script.

## Setting up with mapping files

You can also create mappings manually by adding a `.toml` file to Zaparoo Core's `mappings` folder. See the [mappings documentation](../../features/mappings.md) for file locations and matching rules.

```toml
[[mappings.entry]]
token_key = 'id'
match_pattern = '04:8b:9f:38'
zapscript = '**launch.search:Skylanders'
```

Replace the UID with the one reported in your Zaparoo logs when scanning the figure. iPhones do not support MIFARE Classic, so use a compatible Android phone or an NFC reader connected to Zaparoo Core to get the UID.
