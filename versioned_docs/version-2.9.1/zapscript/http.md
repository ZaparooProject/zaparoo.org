---
sidebar_position: 3
---

# HTTP

These commands make HTTP requests to external services. Both commands run asynchronously in the background with a 30-second timeout, so they won't block script execution.

## http.get

Performs an HTTP GET request to a URL.

### Syntax

```zapscript
**http.get:<url>
```

### Arguments

**`url`** (required)
The full URL to request. Must include the protocol (`http://` or `https://`).

If your URL contains special characters, you can either:
- Escape them with `^` (e.g., `^?` for a literal `?`)
- Quote the entire URL (e.g., `**http.get:"https://example.com/?q=test"`)
- URL encode them (`%2C` for `,`, `%7C%7C` for `||`, `%2A%2A` for `**`)

### Advanced Arguments

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `when` | expression | - | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**http.get:https://example.com/webhook
```

Triggers a simple webhook.

```zapscript
**http.get:https://example.com/api/trigger||_Console/SNES
```

Triggers a webhook and then launches SNES.

```zapscript
**http.get:"https://example.com/search?q=test&page=1"
```

Makes a request with query parameters (quoted to avoid parsing issues).

---

## http.post

Performs an HTTP POST request with a body.

### Syntax

```zapscript
**http.post:<url>,<content-type>,<body>
```

### Arguments

**`url`** (required)
The full URL to request. Must include the protocol.

**`content-type`** (required)
The MIME type of the request body (e.g., `application/json`, `text/plain`).

**`body`** (required)
The request body content. Can be empty.

### Advanced Arguments

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `when` | expression | - | Conditional execution (see [Expressions](./syntax.md#expressions)) |

### Examples

```zapscript
**http.post:https://example.com/api,application/json,{"event":"scan"}
```

Posts JSON data to an API endpoint.

```zapscript
**http.post:http://localhost:8182/api/scripts/launch/update_all.sh,application/json,
```

Triggers a local API with an empty body.

```zapscript
**http.post:https://hooks.example.com/notify,text/plain,Token scanned!
```

Sends a plain text notification.
