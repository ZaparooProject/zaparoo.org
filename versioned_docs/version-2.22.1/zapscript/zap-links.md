---
sidebar_position: 9
description: "Zap Links: point a token at an HTTPS URL that serves ZapScript, so the script can change without rewriting the tag. Covers detection, headers, security rules, and self-hosting."
keywords: [zap links, zaparoo remote zapscript, zaparoo virtual cards, zapscript url, self-host zap links]
---

# Zap Links

Zap Links is a feature that allows querying and running remote ZapScript scripts on the fly from a remote HTTP/S URL.

For example, the following URL is written to a token: `https://zpr.au/c$abcd1234`

Virtual cards and decks in [Zaparoo Online](../online/index.md#cards-and-decks) are a hosted way to use Zap Links without running a server of your own.

Every time the token is scanned, Core will make a request to this URL checking for a ZapScript payload. If it successfully receives one, it will run that ZapScript instead. Core also stores the last successful payload for offline fallback, but normal online scans fetch the current response so the payload can still be dynamic.

The payload itself is plaintext ZapScript, with no extra formatting. The response's `Content-Type` header must use the MIME type `application/vnd.zaparoo.zapscript`.

Core detects Zap Link support by domain. When a domain is encountered for the first time on a token, Core will query for the file `/.well-known/zaparoo` which must exist and contain the JSON payload `{"zapscript":1}`. If successful, this result is cached and later URLs on the same domain are treated as Zap Links immediately. If the domain responds but does not support Zap Links, Core caches that result and prunes non-supporting hosts after 30 days so they can be checked again. Temporary network and server errors are not cached.

Zap Link URLs must use HTTPS. Plain `http://` is only accepted for `localhost` and for private or link-local IP addresses, which covers a server on your own network while you test it. URLs that include a username or password are rejected, redirects are followed up to 10 times with every hop checked against the same rules, and the `.well-known/zaparoo` check is a plain request without Zaparoo headers.

:::warning
ZapScript received via a Zap Link is treated as a remote source, and so is every item of a playlist it opens. For security, remote sources cannot run `input.keyboard`, `input.gamepad`, or `execute`. Scripts sent through the [Zaparoo App](../app/index.md) are not remote.
:::

## Platform Detection

Zap Link servers receive headers identifying the device making the request:

| Header             | Description      | Example                                   |
| ------------------ | ---------------- | ----------------------------------------- |
| `Zaparoo-OS`       | Operating system | `linux`, `windows`, `darwin`              |
| `Zaparoo-Arch`     | CPU architecture | `amd64`, `arm`, `arm64`                   |
| `Zaparoo-Platform` | Zaparoo platform | `mister`, `steamos`, `bazzite`, `windows` |

Servers can use these headers to serve different scripts for different devices from the same URL.

## Self-Hosting

You can host your own Zap Link server as long as it follows the conventions above. A server reachable from the internet needs a valid HTTPS certificate; only local and private addresses may use plain HTTP.

Here's an example in Python which would serve a directory of text files as Zap Links:

```python
from flask import Flask, send_file, abort, Response
import os

app = Flask(__name__)

@app.route("/.well-known/zaparoo")
def zaparoo_meta():
    return {"zapscript": 1}

@app.route("/<zap_id>")
def serve_zaplink(zap_id):
    filename = f"zaps/{zap_id}.txt"
    if not os.path.exists(filename):
        abort(404)
    with open(filename, "rb") as f:
        content = f.read()
        return Response(
            content,
            mimetype="application/vnd.zaparoo.zapscript"
        )

if __name__ == "__main__":
    app.run()
```

