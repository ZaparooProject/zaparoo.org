# NFC Toys

NFC toys like Amiibo, Skylanders, and Disney Infinity figures can be used with Zaparoo. These toys contain NFC chips with game-specific data that can't be used directly, but their unique ID (UID) can be read and [mapped](../../core/mappings.md) to custom actions.

## Supported toys

- [Amiibo](./amiibo.md) - Nintendo's collectible figures and cards
- [Skylanders](./skylanders.md) - Activision's collectible figures
- [Disney Infinity](./disney-infinity.md) - Disney's collectible figures
- [Lego Dimensions](./lego-dimensions.md) - Lego's interactive game figures

## How they work

Unlike regular NFC tags, these toys can't be written to with ZapScript. Instead, you scan the toy to get its UID, then create a mapping that tells Zaparoo what to do when it sees that UID. The [Zaparoo App](../../app/index.md) makes this easy with a built-in mapping editor, or you can create mapping files manually.
