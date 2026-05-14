# Goodbye World

Source for [goodbye-world.pages.dev](https://goodbye-world.pages.dev/) — a learning-in-public blog about AI agent orchestration.

Built on [Astro Paper](https://github.com/satnaing/astro-paper). Runs on [Bun](https://bun.sh/), deploys to [Cloudflare Pages](https://pages.cloudflare.com/) on every push to `main`.

## Run locally

```bash
bun install
bun dev          # http://localhost:4321
bun run build    # production build into dist/
bun run preview  # serve the production build
```

## Repo layout

- `src/data/blog/` — posts (markdown). Filename `NN-slug.md` keeps the series numbered.
- `src/config.ts` — site config (title, author, URL, etc.)
- `src/styles/global.css` — design tokens (dark mode colors from `.ai/design.md`)
- `.ai/` — planning notes (PL): tech stack rationale, design decisions, post series outline
- `CLAUDE.md` — guidance for Claude Code when editing this repo

## Companion repo

Code examples for each post live at [agenticflow-examples](https://github.com/) (link will work once the repo is up).

## Status

Phase 1 — MVP. Design system, custom layouts, comments, analytics and newsletter come in later phases. See `.ai/README.md` for the full plan.
