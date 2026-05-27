---
name: homepage-stats
description: Update the Zaparoo.org homepage stats for downloads, Discord members, and GitHub stars using current verified sources.
compatibility: pi
metadata:
  project: zaparoo.org
  audience: homepage
---

# Homepage Stats

Use this skill when updating the stats bar on the Zaparoo.org front page.

Stats live in `src/pages/index.tsx` inside the `Stats()` component.

## Sources

Use these sources unless the user gives a newer verified value:

- **Downloads**: total release asset downloads from `ZaparooProject/zaparoo-core` via GitHub API.
- **Discord Members**: user-provided current Discord member count, unless a verified source is available.
- **GitHub Stars**: total stars across non-fork `ZaparooProject` repositories via GitHub API.

## Commands

### Zaparoo Core downloads

```bash
curl -s https://api.github.com/repos/ZaparooProject/zaparoo-core/releases?per_page=100 \
  | jq '[.[].assets[].download_count] | add'
```

Round display value down to a clean public number, usually nearest `5k` or `10k` once above 50k.

Example: `103825` -> `100k`.

### Organization GitHub stars

```bash
curl -s 'https://api.github.com/orgs/ZaparooProject/repos?per_page=100' \
  | jq '{total_nonfork_stars: ([.[] | select(.fork == false) | .stargazers_count] | add), repos: ([.[] | select(.fork == false) | {name, stargazers_count}] | sort_by(.name))}'
```

Use `total_nonfork_stars`, rounded down to a clean public number.

Example: `254` -> `250`.

If the user asks for core-only stars, use:

```bash
curl -s https://api.github.com/repos/ZaparooProject/zaparoo-core \
  | jq '{name, stargazers_count}'
```

## Workflow

1. Read `src/pages/index.tsx` and find `Stats()`.
2. Fetch current Zaparoo Core download total from GitHub API.
3. Fetch current non-fork organization star total from GitHub API.
4. Confirm or use user-provided Discord member count.
5. Choose rounded public display values:
   - Downloads: compact count like `100k`, `105k`, `110k`.
   - Discord: compact count like `1.8k`.
   - Stars: compact count like `250` or `300`.
6. Edit only the stat numbers unless the user asks for label changes.
7. Run `pnpm typecheck` because `src/pages/index.tsx` is TypeScript/React.
8. Report exact source totals, displayed rounded values, and validation.

## Guidelines

- Do not invent growth numbers.
- Prefer rounded-down public numbers over precise counts.
- Keep labels short and stable unless the metric definition changes.
- If changing GitHub stars from core-only to org-wide, mention the source change in the final response.
- Use `pnpm`, not `npm`, for project commands.
