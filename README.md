# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ pnpm install
```

### Local Development

```
$ pnpm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Core Release Checklist

1. Check commits since last release for changelog
2. Update `docs/` with new features/config options
3. Create docs snapshot: `pnpm docusaurus docs:version X.X.X`
4. Update `docusaurus.config.ts` (lastVersion + versions config)
5. Copy install script: `cp ../zaparoo-core/scripts/install.sh static/`
6. Update versions in:
   - `src/components/DownloadCard/index.tsx` (version, date, blog slug)
   - `static/install.sh` (DEFAULT_VERSION)
7. Write blog post in `blog/YYYY-MM-DD-core-vX.X.X/index.mdx`
8. Build and verify: `pnpm build && pnpm serve`
