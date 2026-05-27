---
name: showcase-commentary
description: Rewrite commentary in the latest Zaparoo community showcase draft one creator section at a time, using user-provided context, Zaparoo proofread style, and comparable maker-community roundup patterns.
compatibility: pi
metadata:
  project: zaparoo.org
  audience: blog
---

# Showcase Commentary

Use this skill when polishing a Zaparoo Community Showcase blog draft, especially when the user wants to improve the short commentary under each creator's gallery.

This is an interactive editing workflow. Do not rewrite the whole post in one pass. Work through one creator section at a time, ask for or use the user's context about the photos/videos, suggest revised commentary, wait for approval or iteration, then move to the next section.

## Goal

Turn each gallery note into a short, human community-showcase blurb that:

- Says what the creator made or shared.
- Points out one useful, charming, or specific detail from the media.
- Gives the creator a moment without overexplaining.
- Sounds like Zaparoo blog voice: casual, direct, specific, and lightly personal.
- Avoids generic filler like `nice`, `cool`, `awesome`, `great`, and `love seeing` unless one instance genuinely fits.

## Influences

Follow the `proofread` skill for Zaparoo facts, links, style, and human editing.

Use these external format lessons as style guidance, not as citations to add to the post:

- Raspberry Pi Maker Monday: image-first roundup with tiny captions and light editorial reactions.
- Arduino Project Hub picks: each project gets a short explanation of what it is and why it is notable.
- OctoPrint community spotlight: creator-by-creator sections, user-submitted context, brief personal reactions, and occasional quoted details.
- Handmade Network community showcase: Discord-sourced highlights with short blurbs that explain why each item belongs in the roundup.
- Adafruit #3DThursday: frequent maker-project posts with compact context, source credit, and practical detail.

Best fit for Zaparoo: image-first community roundup with 1-2 sentences per creator, sometimes 3 if the build needs context.

## Workflow

### 1. Find the latest showcase draft

Identify the newest `blog/YYYY-MM-DD-community-showcase-*` folder. Prefer drafts changed in the current worktree.

Before editing:

- Read the whole latest showcase post.
- Inspect the current diff.
- Read the previous 1-2 community showcase posts for voice and structure.
- Note each creator section in order.
- Do not change title, slug, date, gallery media, image paths, or frontmatter unless the user asks.
- If commentary changes the meaning of a media item, update stale alt text after approval in both the blog gallery and `src/components/Showcase/index.tsx` when that media also appears there.

### 2. Process one creator at a time

For the current creator section:

1. Show the creator name and current commentary.
2. Briefly summarize visible gallery context from filenames, alt text, and existing text.
3. Ask the user what is happening in the media if the context is incomplete or if the current commentary feels generic.
4. Use the user's explanation as source truth for that section.
5. Draft 1-3 commentary options, usually one recommended option first.
6. Wait for the user to approve, revise, or reject.
7. Edit only that creator's commentary after approval.
8. Reread the changed section and move to the next creator.

Do not batch multiple creator rewrites unless the user explicitly asks.

### 3. Commentary shape

Default pattern:

```text
[Creator] [made/shared/showed] [specific thing]. [One detail that explains why it stands out or what to notice].
```

Examples of useful moves:

- Name the object or workflow: card backs, floppy labels, card holder, printed batch, setup cleanup.
- Mention visible progression: tests, printed sheets, applied labels, final demo.
- Mention physical feel: shelf-ready, cartridge-like, tidy, handmade, compact, playable.
- Explain why it fits Zaparoo: turns cards/tokens into something that feels like real media, makes scanning easier, organizes a setup, expands system templates.
- Use creator context when provided: first print, first card, reused hardware, label issue, design intent.

Avoid:

- Repeating the alt text without adding anything.
- Deep technical claims unless verified from user/source.
- Generic praise for every section.
- Overstating significance.
- Pretending to know intent from images alone.
- Changing `they/their` creator references unless the user gives a preference.
- Making jokes at the creator's expense.

### 4. Suggested lengths

- Single photo: 1 sentence is fine.
- Small gallery: 1-2 sentences.
- Process gallery or video demo: 2 sentences.
- Tool/template release: 2-3 sentences if links or usage context matter.

If a section has no meaningful detail beyond the image, keep commentary short rather than forcing depth.

### 5. Approval loop

Use this loop for every creator:

```text
Next: [Creator]
Current: "..."
What I can tell: ...
Need from you: what is happening here / what detail matters?
```

After user gives context:

```text
Suggested commentary:
"..."

Use this, tweak, or try another angle?
```

Only edit the file after approval.

### 6. Link and metadata pass

After commentary is stable:

- Rewrite the intro and frontmatter description if the section mix changed.
- Add links only when they help a reader act, choose, or understand a specific thing.
- Avoid generic links for broad terms like `Zaparoo cards`, `NFC card`, `tokens`, or `Discord` unless the link target is genuinely useful at that point.
- Prefer local docs links for Zaparoo products, platform pages, Designer, and documented community project indexes.
- Do not force links for every mention. One useful link is better than several obvious ones.

### 7. Final pass

After all sections are approved and edited:

- Reread the full post.
- Check commentary does not repeat the same praise words or sentence shapes too often.
- Verify creator names are consistent between headings, media filenames, and visible credits.
- Check alt text still matches the user-verified media context.
- Check links and `truncate` marker remain unchanged.
- Inspect the diff.
- Run `pnpm typecheck` only if TypeScript/React/config changed.
- Run `pnpm build` only if asked or if MDX/link/media validity needs verification.

Final response should state:

- Which creator sections were rewritten.
- What was verified.
- What was not run.
