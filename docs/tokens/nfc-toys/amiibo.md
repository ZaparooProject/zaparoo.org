---
description: Use Amiibo figures and cards as Zaparoo tokens to launch games. Tap any Amiibo to a reader and map its UID to a game launch.
keywords: [amiibo zaparoo, amiibo game launcher, amiibo mister fpga, amiibo nfc token, tap amiibo launch game]
---

# Amiibo

Nintendo Amiibo figures and cards use [NTAG215](../nfc/ntag.md) NFC chips. Zaparoo can read them, but they can't be written to because Nintendo locks the writable pages during manufacturing.

Since you can't write ZapScript directly to an Amiibo, you use [mappings](../../features/mappings.md) to assign an action to each figure based on its UID. Every physical Amiibo has a unique UID, so each figure is mapped individually.

## Setting up with the Zaparoo App

The easiest way to map an Amiibo is through the [Zaparoo App](../../app/index.md):

1. Go to **Create > Add a Mapping**
2. Tap the **NFC** button and hold the Amiibo to your phone
3. The UID auto-populates in the token ID field
4. Write a ZapScript or use the command palette to pick a game
5. Tap **Save mapping**

The mapping syncs to your connected Zaparoo device. Next time that Amiibo is scanned on your reader, it runs the assigned script.

## Setting up with mapping files

You can also create mappings manually by adding a `.toml` file to your mappings folder. See the [mappings documentation](../../features/mappings.md) for details on file format and location.

```toml
[[mappings.entry]]
token_key = 'uid'
match_pattern = '04:a2:3b:c1:d4:5e:80'
zapscript = '**launch.search:Mario Kart'
```

Replace the UID with the one reported in your Zaparoo logs when scanning the Amiibo.
