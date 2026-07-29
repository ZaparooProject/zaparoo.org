---
description: "Use NFC toys as Zaparoo tokens: Amiibo, Skylanders, Disney Infinity, and LEGO Dimensions figures can launch actions through UID mappings."
keywords: [zaparoo nfc toys, amiibo zaparoo, skylanders zaparoo, disney infinity zaparoo, nfc figure game launcher]
---

# NFC Toys

NFC toys like Amiibo, Skylanders, Disney Infinity, and LEGO Dimensions figures can be used with Zaparoo. Their game data is locked, encrypted, or specific to the original game, so Zaparoo uses the toy's unique ID (UID) with [mappings](../../features/mappings.md) instead.

## Supported toys

- [Amiibo](./amiibo.md) - Nintendo's collectible figures and cards
- [Skylanders](./skylanders.md) - Activision's collectible figures
- [Disney Infinity](./disney-infinity.md) - Disney's collectible figures
- [LEGO Dimensions](./lego-dimensions.md) - LEGO's interactive game figures and vehicle tags

## How they work

Unlike writable NFC tags, these toys are usually treated as read-only by Zaparoo. Scan the toy to get its UID, then create a mapping that tells Zaparoo which [ZapScript](../../zapscript/index.md) to run when that UID appears. The [Zaparoo App](../../app/index.md) has a built-in mapping editor, or you can create mapping files manually.
