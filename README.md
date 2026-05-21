# Goodbye World

Source for [blog.kamyk-sklepy.workers.dev](https://blog.kamyk-sklepy.workers.dev/) — a learning-in-public blog about AI agent orchestration.

Built on [Astro Paper](https://github.com/satnaing/astro-paper). Runs on [Bun](https://bun.sh/), deploys to Cloudflare Workers Static Assets on every push to `main` (config in `wrangler.jsonc`).

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
- `src/styles/global.css` — design tokens (dark mode colors, typography)
- `CLAUDE.md` — guidance for Claude Code when editing this repo

## Companion repo

Code examples for each post live at [goodbye-world-dev/agenticflow-examples](https://github.com/goodbye-world-dev/agenticflow-examples).

## Status

Phase 1 — MVP. Design system, custom layouts, comments, analytics and newsletter come in later phases.
