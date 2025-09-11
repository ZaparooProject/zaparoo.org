# Tokens

All scanned objects are eventually translated into a token object before they're processed by the Zaparoo Core software or matched against mappings.

An NFC tag token may look like this:

```json
{
  "id": "04a1b2c3d4e5f6",
  "value": "**launch.random:Genesis",
  "data": "2a2a6c61756e63682e72616e646f6d3a47656e65736973"
}
```

All fields in a token object are optional, but at least one is required to be populated.
