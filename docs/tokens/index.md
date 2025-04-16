---
sidebar_position: 1
---

# Tokens

Tokens are physical objects that can be used to trigger actions in Zaparoo. The most common type of token is an NFC tag, but other types of tokens like QR codes are also supported.

**Token** is a name used to describe all types of objects, physical or virtual, that can be scanned by a reader and used to run ZapScript. It's a best effort attempt to unify the many types of scannable objects into a single concept that can be worked with.

All scanned objects are eventually translated into a token before they're processed by the Zaparoo Core software or matched against mappings.

An NFC tag token may look like this:

```json
{
  "id": "04a1b2c3d4e5f6",
  "value": "**launch.random:Genesis",
  "data": "2a2a6c61756e63682e72616e646f6d3a47656e65736973"
}
```

All fields in a token object are optional, but at least one is required to be populated.
