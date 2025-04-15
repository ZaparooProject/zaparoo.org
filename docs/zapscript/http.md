# HTTP

These commands are used to make HTTP requests to external services.

## Make an HTTP GET Request to a URL (http.get)

Perform an HTTP GET request to the specified URL. For example:

```
**launch.random:snes,nes
```

This is useful for triggering webhooks or other web services.

It can be combined with other commands using the `||` separator. For example:

```
**http.get:https://example.com||_Console/SNES
```

If your URL contains any of the following characters, you must URL encode them by replacing them with the following:

- `,` with `%2C`
- `||` with `%7C%7C`
- `**` with `%2A%2A`

## Make an HTTP POST Request to a URL (http.post)

Perform an HTTP POST request to the specified URL. For example:

```
**http.post:https://example.com,application/json,{"key":"value"}
```

Or with Remote, to launch the Update All script:

```
**http.post:http://localhost:8182/api/scripts/launch/update_all.sh,application/json,
```

The command is in the format `URL,Content-Type,Body`.

If your URL contains any of the following characters, you must URL encode them by replacing them with the following:

- `,` with `%2C`
- `||` with `%7C%7C`
- `**` with `%2A%2A`
