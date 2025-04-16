# Methods

Methods are used to execute actions and request data back from the API.

## Launching

### launch

Emulate the scanning of a token.

#### Parameters

Accepts two types of parameters:

- A string, in which case the string will be treated as the token text with all other options set as default.
- An object:

| Key  | Type   | Required | Description                                                                                                    |
| :--- | :----- | :------- | :------------------------------------------------------------------------------------------------------------- |
| type | string | No       | An internal category of the type of token being scanned. _Not currently in use outside of logging._            |
| uid  | string | No\*     | The UID of the token being scanned. For example, the UID of an NFC tag. Used for matching mappings.            |
| text | string | No\*     | The main text to be processed from a scan, should contain [ZapScript](../../zapscript).                        |
| data | string | No\*     | The raw data read from a token, converted to a hexadecimal string. Used in mappings and detection of NFC toys. |

These parameters allow emulating a token exactly as it would be read directly from an attached reader on the server. A request's parameters must contain at least a populated `uid`, `text` or `data` value.

#### Result

Returns `null` on success.

Currently, it is not reported if the launched ZapScript encountered an error during launching, and the method will return before execution of ZapScript is complete.

#### Example

##### Request

```json
{
  "jsonrpc": "2.0",
  "id": "52f6242e-7a5a-11ef-bf93-020304050607",
  "method": "launch",
  "params": {
    "text": "**launch.system:snes"
  }
}
```

##### Response

```json
{
  "jsonrpc": "2.0",
  "id": "52f6242e-7a5a-11ef-bf93-020304050607",
  "result": null
}
```

### stop

Kill any active launcher, if possible.

This method is highly dependant on the platform and specific launcher used. It's not guaranteed that a launcher is capable of killing the playing process.

#### Parameters

None.

#### Result

Returns `null` on success.

Currently, it is not reported if a process was killed or not.

#### Example

##### Request

```json
{
  "jsonrpc": "2.0",
  "id": "176b4558-7a5b-11ef-b318-020304050607",
  "method": "stop"
}
```

##### Response

```json
{
  "jsonrpc": "2.0",
  "id": "176b4558-7a5b-11ef-b318-020304050607",
  "result": null
}
```

## Tokens

### tokens.history

Returns a list of the last recorded token launches.

#### Parameters

None.

#### Result

| Key     | Type                                  | Required | Description                        |
| :------ | :------------------------------------ | :------- | :--------------------------------- |
| entries | [LaunchEntry](#launch-entry-object)[] | Yes      | A list of recorded token launches. |

##### Launch entry object

| Key     | Type    | Required | Description                                     |
| :------ | :------ | :------- | :---------------------------------------------- |
| data    | string  | No       | Same as [launch parameter](#launch).            |
| success | boolean | Yes      | True if the launch was successful.              |
| text    | string  | No       | Same as [launch parameter](#launch).            |
| time    | string  | Yes      | Timestamp of the launch time in RFC3339 format. |
| type    | string  | No       | Same as [launch parameter](#launch).            |
| uid     | string  | No       | Same as [launch parameter](#launch).            |

#### Example

##### Request

```json
{
  "jsonrpc": "2.0",
  "id": "5e9f3a0e-7a5b-11ef-8084-020304050607",
  "method": "history"
}
```

##### Response

```json
{
  "jsonrpc": "2.0",
  "id": "5e9f3a0e-7a5b-11ef-8084-020304050607",
  "result": {
    "entries": [
      {
        "data": "",
        "success": true,
        "text": "**launch.system:snes",
        "time": "2024-09-24T17:49:42.938167429+08:00",
        "type": "",
        "uid": ""
      }
    ]
  }
}
```

## Media

### media.search

Query the media database and return all matching indexed media.

#### Parameters

An object:

| Key        | Type     | Required | Description                                                                                                                    |
| :--------- | :------- | :------- | :----------------------------------------------------------------------------------------------------------------------------- |
| query      | string   | Yes      | Case-insensitive search by filename. By default, query is split by white space and results are found which contain every word. |
| systems    | string[] | No       | Case-sensitive list of system IDs to restrict search to. A missing key or empty list will search all systems.                  |
| maxResults | number   | No       | Max number of results to return. Default is 250.                                                                               |

#### Result

| Key     | Type    | Required | Description                                        |
| :------ | :------ | :------- | :------------------------------------------------- |
| results | Media[] | Yes      | A list of all search results from the given query. |
| total   | number  | Yes      | Total number of search results.                    |

##### Media object

| Key    | Type                     | Required | Description                                                                                                 |
| :----- | :----------------------- | :------- | :---------------------------------------------------------------------------------------------------------- |
| system | [System](#system-object) | Yes      | System which the media has been indexed under.                                                              |
| name   | string                   | Yes      | A human-readable version of the result's filename without a file extension.                                 |
| path   | string                   | Yes      | Path to the media file. If possible, this path will be compressed into the `<system>/<path>` launch format. |

##### System object

| Key      | Type   | Required | Description                                           |
| :------- | :----- | :------- | :---------------------------------------------------- |
| id       | string | Yes      | Internal system ID for this system.                   |
| name     | string | Yes      | Display name of the system.                           |
| category | string | Yes      | Category of system. This field is not yet formalised. |

#### Example

##### Request

```json
{
  "jsonrpc": "2.0",
  "id": "47f80537-7a5d-11ef-9c7b-020304050607",
  "method": "media.search",
  "params": {
    "query": "240p"
  }
}
```

##### Response

```json
{
  "jsonrpc": "2.0",
  "id": "47f80537-7a5d-11ef-9c7b-020304050607",
  "result": {
    "results": [
      {
        "name": "240p Test Suite (PD) v0.03 tepples",
        "path": "Gameboy/240p Test Suite (PD) v0.03 tepples.gb",
        "system": {
          "category": "Handheld",
          "id": "Gameboy",
          "name": "Gameboy"
        }
      }
    ],
    "total": 1
  }
}
```

### media.index

Create a new media database index.

During an index, the server will emit [media.indexing](../notifications#media-indexing) notifications showing progress of the index.

#### Parameters

Optionally, an object:

| Key     | Type     | Required | Description                                                                         |
| :------ | :------- | :------- | :---------------------------------------------------------------------------------- |
| systems | string[] | No       | List of system IDs to restrict indexing to. Other system indexes will remain as is. |

An omitted or `null` value parameters key is also valid and will index every system.

#### Result

Returns `null` on success once indexing is complete.

#### Example

##### Request

```json
{
  "jsonrpc": "2.0",
  "id": "6f20e07c-7a5e-11ef-84bb-020304050607",
  "method": "media.index"
}
```

##### Response

```json
{
  "jsonrpc": "2.0",
  "id": "6f20e07c-7a5e-11ef-84bb-020304050607",
  "result": null
}
```

### systems

List all currently indexed systems.

#### Parameters

None.

#### Result

| Key     | Type                       | Required | Description                    |
| :------ | :------------------------- | :------- | :----------------------------- |
| systems | [System](#system-object)[] | Yes      | A list of all indexed systems. |

See [System object](#system-object).

#### Example

##### Request

```json
{
  "jsonrpc": "2.0",
  "id": "dbd312f3-7a5f-11ef-8f29-020304050607",
  "method": "systems"
}
```

##### Response

```json
{
  "jsonrpc": "2.0",
  "id": "dbd312f3-7a5f-11ef-8f29-020304050607",
  "result": {
    "systems": [
      {
        "category": "Handheld",
        "id": "GameboyColor",
        "name": "Gameboy Color"
      },
      {
        "category": "Computer",
        "id": "EDSAC",
        "name": "EDSAC"
      }
    ]
  }
}
```

## Settings

### settings

List currently set configuration settings.

This method will list values set in the [Config File](../../core/config). Some config file options may be omitted which are not appropriate to be read or written remotely.

#### Parameters

None.

#### Result

| Key                 | Type                              | Required | Description                                                                                                                                            |
| :------------------ | :-------------------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| reader              | string[]                          | Yes      | A list of manually configured [reader driver](../../core/readers) connection strings. See [reader](../../core/config#manual-reader-connection-reader). |
| audioFeedback       | boolean                           | Yes      |                                                                                                                                                        |
| detectReaders       | boolean                           | Yes      |                                                                                                                                                        |
| insertMode          | boolean                           | Yes      |                                                                                                                                                        |
| insertModeBlocklist | string[]                          | Yes      |                                                                                                                                                        |
| insertModeExitDelay | number                            | Yes      |                                                                                                                                                        |
| consoleLogging      | boolean                           | Yes      |                                                                                                                                                        |
| debug               | boolean                           | Yes      | See [debug](../../core/config#debug-logging-debug).                                                                                                    |
| systems             | [Systems config](#systems-config) | Yes      | The systems section of the config file.                                                                                                                |

###### Systems config

| Key        | Type     | Required | Description |
| :--------- | :------- | :------- | :---------- |
| rootFolder | string[] | Yes      |             |

#### Example

##### Request

```json
{
  "jsonrpc": "2.0",
  "id": "f208d996-7ae6-11ef-960e-020304050607",
  "method": "settings"
}
```

##### Response

```json
{
  "jsonrpc": "2.0",
  "id": "f208d996-7ae6-11ef-960e-020304050607",
  "result": {
    "readers": ["pn532_uart:/dev/ttyUSB0"],
    "detectReaders": true,
    "audioFeedback": true,
    "insertMode": false,
    "insertModeBlocklist": ["DOS"],
    "insertModeExitDelay": 0,
    "consoleLogging": false,
    "debug": false,
    "systems": {
      "rootFolders": []
    }
  }
}
```

### settings.update

Update one or more settings in-memory and save changes to disk.

This method will only write values which are supplied. Existing values will not be modified.

#### Parameters

An object:

| Key                 | Type                              | Required | Description                                                                                                                                            |
| :------------------ | :-------------------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| reader              | string[]                          | Yes      | A list of manually configured [reader driver](../../core/readers) connection strings. See [reader](../../core/config#manual-reader-connection-reader). |
| audioFeedback       | boolean                           | Yes      |                                                                                                                                                        |
| detectReaders       | boolean                           | Yes      |                                                                                                                                                        |
| insertMode          | boolean                           | Yes      |                                                                                                                                                        |
| insertModeBlocklist | string[]                          | Yes      |                                                                                                                                                        |
| insertModeExitDelay | number                            | Yes      |                                                                                                                                                        |
| consoleLogging      | boolean                           | Yes      |                                                                                                                                                        |
| debug               | boolean                           | Yes      | See [debug](../../core/config#debug-logging-debug).                                                                                                    |
| systems             | [Systems config](#systems-config) | Yes      | The systems section of the config file.                                                                                                                |

###### Systems config

| Key        | Type     | Required | Description |
| :--------- | :------- | :------- | :---------- |
| rootFolder | string[] | Yes      |             |

#### Result

Returns `null` on success.

#### Example

##### Request

```json
{
  "jsonrpc": "2.0",
  "id": "562c0b60-7ae8-11ef-87d7-020304050607",
  "method": "settings.update",
  "params": {
    "debug": false
  }
}
```

##### Response

```json
{
  "jsonrpc": "2.0",
  "id": "562c0b60-7ae8-11ef-87d7-020304050607",
  "result": null
}
```

## Mappings

Mappings are used to modify the contents of tokens before they're launched, based on different types of matching parameters. Stored mappings are queried before every launch and applied to the token if there's a match. This allows, for example, adding ZapScript to a read-only NFC tag based on its UID.

### mappings

List all mappings.

Returns a list of all active and inactive mappings entries stored on server.

#### Parameters

None.

#### Result

| Key      | Type                         | Required | Description                                                         |
| :------- | :--------------------------- | :------- | :------------------------------------------------------------------ |
| mappings | [Mapping](#mapping-object)[] | Yes      | List of all stored mappings. See [mapping object](#mapping-object). |

##### Mapping object

| Key      | Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                             |
| :------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| added    | string  | Yes      | Timestamp of the time mapping was created in RFC3339 format.                                                                                                                                                                                                                                                                                                            |
| enabled  | boolean | Yes      | True if the mapping will be used when looking up matching mappings.                                                                                                                                                                                                                                                                                                     |
| id       | number  | Yes      | Internal database ID of mapping entry. Used to reference mapping for updates and deletions.                                                                                                                                                                                                                                                                             |
| label    | string  | No       | An optional display name shown to the user.                                                                                                                                                                                                                                                                                                                             |
| type     | string  | Yes      | The field which will be matched against:<br/>_ `uid`: match on UID, if available. UIDs are normalized before matching to remove spaces, colons and convert to lowercase.<br/>_ `text`: match on the stored text on token.<br/>\* `data`: match on the raw token data, if available. This is converted from bytes to a hexadecimal string and should be matched as this. |
| match    | string  | Yes      | The method used to match a mapping pattern:<br/>_ `exact`: match the entire string exactly to the field.<br/>_ `partial`: match part of the string to the field.<br/>\* `regex`: use a regular expression to match the field.                                                                                                                                           |
| pattern  | string  | Yes      | Pattern that will be matched against the token, using the above settings.                                                                                                                                                                                                                                                                                               |
| override | string  | Yes      | Final text that will completely replace the existing token text if a match was successful.                                                                                                                                                                                                                                                                              |

#### Example

##### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1a8bee28-7aef-11ef-8427-020304050607",
  "method": "mappings"
}
```

##### Response

```json
{
  "jsonrpc": "2.0",
  "id": "1a8bee28-7aef-11ef-8427-020304050607",
  "result": {
    "mappings": [
      {
        "added": "1970-01-21T06:08:18+08:00",
        "enabled": true,
        "id": "1",
        "label": "barcode pokemon",
        "match": "partial",
        "override": "**launch.search:gbc/*pokemon*gold*",
        "pattern": "9780307468031",
        "type": "text"
      }
    ]
  }
}
```

### mappings.new

Create a new mapping.

#### Parameters

An object:

| Key      | Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                             |
| :------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enabled  | boolean | Yes      | True if the mapping will be used when looking up matching mappings.                                                                                                                                                                                                                                                                                                     |
| label    | string  | No       | An optional display name shown to the user.                                                                                                                                                                                                                                                                                                                             |
| type     | string  | Yes      | The field which will be matched against:<br/>_ `uid`: match on UID, if available. UIDs are normalized before matching to remove spaces, colons and convert to lowercase.<br/>_ `text`: match on the stored text on token.<br/>\* `data`: match on the raw token data, if available. This is converted from bytes to a hexadecimal string and should be matched as this. |
| match    | string  | Yes      | The method used to match a mapping pattern:<br/>_ `exact`: match the entire string exactly to the field.<br/>_ `partial`: match part of the string to the field.<br/>\* `regex`: use a regular expression to match the field.                                                                                                                                           |
| pattern  | string  | Yes      | Pattern that will be matched against the token, using the above settings.                                                                                                                                                                                                                                                                                               |
| override | string  | Yes      | Final text that will completely replace the existing token text if a match was successful.                                                                                                                                                                                                                                                                              |

#### Result

| Key | Type   | Required | Description                       |
| :-- | :----- | :------- | :-------------------------------- |
| id  | number | Yes      | Database ID of new mapping entry. |

#### Example

_(Example missing in source)_

### mappings.delete

Delete an existing mapping.

#### Parameters

| Key | Type   | Required | Description             |
| :-- | :----- | :------- | :---------------------- |
| id  | number | Yes      | Database ID of mapping. |

#### Result

Returns `null` on success.

#### Example

_(Example missing in source)_

### mappings.update

Change an existing mapping.

#### Parameters

An object:

| Key      | Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                             |
| :------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id       | number  | Yes      | Internal database ID of mapping entry.                                                                                                                                                                                                                                                                                                                                  |
| enabled  | boolean | No       | True if the mapping will be used when looking up matching mappings.                                                                                                                                                                                                                                                                                                     |
| label    | string  | No       | An optional display name shown to the user.                                                                                                                                                                                                                                                                                                                             |
| type     | string  | No       | The field which will be matched against:<br/>_ `uid`: match on UID, if available. UIDs are normalized before matching to remove spaces, colons and convert to lowercase.<br/>_ `text`: match on the stored text on token.<br/>\* `data`: match on the raw token data, if available. This is converted from bytes to a hexadecimal string and should be matched as this. |
| match    | string  | No       | The method used to match a mapping pattern:<br/>_ `exact`: match the entire string exactly to the field.<br/>_ `partial`: match part of the string to the field.<br/>\* `regex`: use a regular expression to match the field.                                                                                                                                           |
| pattern  | string  | No       | Pattern that will be matched against the token, using the above settings.                                                                                                                                                                                                                                                                                               |
| override | string  | No       | Final text that will completely replace the existing token text if a match was successful.                                                                                                                                                                                                                                                                              |

Only keys which are provided in the object will be updated in the database.

#### Result

Returns `null` on success.

#### Example

##### Request

```json
{
  "jsonrpc": "2.0",
  "id": "e98fd686-7e62-11ef-8f8c-020304050607",
  "method": "mappings.update",
  "params": {
    "enabled": false,
    "id": 1
  }
}
```

##### Response

_(Response missing in source)_

## Readers

### readers

List all currently connected readers.

#### Parameters

_(Parameters missing in source)_

#### Result

_(Result missing in source)_

#### Example

_(Example missing in source)_

### readers.write

Attempt to write given text to the first available write-capable reader, if possible.

#### Parameters

An object:

| Key  | Type   | Required | Description                           |
| :--- | :----- | :------- | :------------------------------------ |
| text | string | Yes      | ZapScript to be written to the token. |

#### Result

Returns `null` on success.

#### Example

_(Example missing in source)_

## Clients

_Clients can only be managed through the API via a device-local connection._

### clients

List all registered clients and associated data.

#### Parameters

None.

#### Result

| Key     | Type                       | Required | Description                     |
| :------ | :------------------------- | :------- | :------------------------------ |
| clients | [Client](#client-object)[] | Yes      | List of all registered clients. |

##### Client object

| Key     | Type   | Required | Description                       |
| :------ | :----- | :------- | :-------------------------------- |
| id      | string | Yes      | Unique ID of client.              |
| name    | string | No       | Display name of client.           |
| secret  | string | Yes      | Secret key of client.             |
| address | string | No       | Last connected address of client. |

#### Example

##### Request

```json
{
  "jsonrpc": "2.0",
  "id": "aae4aaa4-7e48-11ef-9e36-020304050607",
  "method": "clients"
}
```

##### Response

```json
{
  "jsonrpc": "2.0",
  "id": "aae4aaa4-7e48-11ef-9e36-020304050607",
  "result": {
    "clients": [
      {
        "address": "",
        "id": "0b150eae-0f1b-4ede-9d7c-09c0ae0509ea",
        "name": "Test",
        "secret": "d3edfd14ce20e64f01c06932dcb5553560d0995a8871b7398c9a7b7fcc42e670"
      }
    ]
  }
}
```

### clients.new

Create a new client with a newly generated ID and secret.

#### Parameters

Optionally, an object:

| Key  | Type   | Required | Description             |
| :--- | :----- | :------- | :---------------------- |
| name | string | No       | Display name of client. |

#### Result

_(Result missing in source)_

#### Example

_(Example missing in source)_

### clients.delete

Delete an existing client.

#### Parameters

_(Parameters missing in source)_

#### Result

_(Result missing in source)_

#### Example

_(Example missing in source)_

## Service

### version

Return server's current version and platform.

#### Parameters

None.

#### Result

| Key      | Type   | Required | Description                                         |
| :------- | :----- | :------- | :-------------------------------------------------- |
| platform | string | Yes      | ID of platform the service is currently running on. |
| version  | string | Yes      | Current version of the running Zaparoo service.     |

#### Example

##### Request

```json
{
  "jsonrpc": "2.0",
  "id": "ca47f646-7e47-11ef-971a-020304050607",
  "method": "version"
}
```

##### Response

```json
{
  "jsonrpc": "2.0",
  "id": "ca47f646-7e47-11ef-971a-020304050607",
  "result": {
    "platform": "mister",
    "version": "2.0.0-dev"
  }
}
```
