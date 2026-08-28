---
description: "Use NFC toys as Zaparoo tokens: map Amiibo, Skylanders, Disney Infinity, and LEGO Dimensions figures to games by their UID."
keywords: [zaparoo nfc toys, amiibo zaparoo, skylanders zaparoo, disney infinity zaparoo, lego dimensions zaparoo, nfc figure game launcher]
---

# NFC Toys

NFC toys like Amiibo, Skylanders, Disney Infinity, and LEGO Dimensions figures work as Zaparoo tokens. Their chips are locked or hold game data Zaparoo can't use, so instead of writing to them you map each figure's unique ID (UID) to a game or [ZapScript](../../zapscript/index.md) with a [mapping](../../features/mappings.md). Every physical figure has its own UID, so each one is mapped individually.

## Supported toys

| Toy line | Chip | Phone support for mapping |
| -------- | ---- | ------------------------- |
| [Amiibo](#amiibo) | NTAG215 | iPhone and Android |
| [Skylanders](#skylanders) | MIFARE Classic 1K | Android only |
| [Disney Infinity](#disney-infinity) | MIFARE | Android only |
| [LEGO Dimensions](#lego-dimensions) | NTAG213 | iPhone and Android |

Any NFC reader that Zaparoo supports can scan these toys. See [readers](../../readers/index.md).

### Amiibo

Nintendo Amiibo figures and cards use [NTAG215](../nfc/ntag.md) chips. Zaparoo can read them, but Nintendo locks the writable pages at manufacture, so they are read-only.

### Skylanders

Skylanders figures use [MIFARE Classic 1K](../nfc/mifare.md) chips. The data on them is encrypted and specific to the Skylanders game, so only the UID is used. iPhones can't read MIFARE Classic, so use an Android phone or a reader connected to Core to get the UID.

### Disney Infinity

Disney Infinity figures use [MIFARE](../nfc/mifare.md) chips with game-specific data, so only the UID is used. The same iPhone limitation as Skylanders applies.

### LEGO Dimensions

LEGO Dimensions character and vehicle tags use [NTAG213](../nfc/ntag.md) chips. Their data is encrypted and game-specific, so they are treated as read-only.

## Map a toy in the Zaparoo App

1. Go to **Create > Add a Mapping**.
2. Tap the **NFC** button and hold the figure to your phone.
3. The UID fills in the token ID field.
4. Enter ZapScript, or use the command palette to pick a game.
5. Tap **Save mapping**.

The mapping syncs to your connected Zaparoo device. The next time that figure is scanned on your reader, it runs the assigned script.

If your phone can't read the toy (iPhone with Skylanders or Disney Infinity), scan the figure on a reader connected to Core instead. The UID appears in the Zaparoo App's scan history and in Core's logs, and you can create the mapping from there.

## Map a toy with a mapping file

You can also create mappings manually by adding a `.toml` file to Zaparoo Core's `mappings` folder. See the [mappings documentation](../../features/mappings.md) for file locations and matching rules.

```toml
[[mappings.entry]]
token_key = 'id'
match_pattern = '04:a2:3b:c1:d4:5e:80'
zapscript = '**launch.search:Mario Kart'
```

Replace the UID with the one Core reports for your figure, from its logs or the App's scan history.

## Troubleshooting

**The UID my phone shows doesn't match the UID in Core's logs.** Use the value from the App's scan history or Core's logs for the mapping, since that is what Core matches against.

**The figure scans but nothing launches.** Check that a mapping exists for that exact UID and that the ZapScript in it works when written to a normal tag. See [mappings](../../features/mappings.md#matching-fields).

**My iPhone won't read the figure.** iPhones can't read MIFARE Classic chips, which Skylanders and Disney Infinity use. Scan the figure on a reader connected to Core to get its UID.
