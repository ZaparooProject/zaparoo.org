# Zap Links

Zap links is a feature that allows querying and running remote ZapScript scripts on the fly from a remote HTTP/S URL.

For example, the following URL is written to a token: `https://zpr.au/c$abcd1234`

Every time the token is scanned, Core will make a request to this URL checking for a ZapScript payload. If it successfully receives one, it will run that ZapScript instead. Core will not cache this value, so the payload can be dynamic.

The payload itself is just a snippet of plaintext ZapScript to be run, with no special extra formatting. The only condition is that this payload has the MIME-type `application/vnd.zaparoo.zapscript` in the response's `Content-Type` header.

Core detects Zap Link support by domain. When a domain is encountered for the first time on a token, Core will query for the file `/.well-known/zaparoo` which must exist and contain the JSON payload `{"zapscript":1}`. If successful, this result will be cached and any subsequent URLs will be treated as zap links immediately. If the query fails, it will also be cached and that domain will be silently ignored.

:::warning
Currently all ZapScript received via a zap link will be tagged as "unsafe" which will disable the `input.keyboard`, `input.gamepad` and `execute` commands from running. This may be configurable in the future.
:::

## Self-Hosting

It's easy to host your own "zap link server" as long as it follows the conventions above.

### Python

Here's an example in Python which would serve a directory of text files as zap links:

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

### NGINX

And another example using an NGINX server:

```
server {
    listen 80;
    server_name yourdomain.com;

    location = /.well-known/zaparoo {
        alias /var/www/.well-known/zaparoo;
        add_header Content-Type application/json;
        try_files $uri =404;
    }

    location ~ ^/(.*)$ {
        alias /var/www/zaps/$1.txt;
        add_header Content-Type application/vnd.zaparoo.zapscript;
        try_files $uri =404;
    }
}
```

This one also requires the well-known JSON file lives on disk too.
