# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Source for [Goodbye World](https://blog.kamyk-sklepy.workers.dev/) — Astro Paper-based blog about AI agent orchestration. Deployed to Cloudflare Workers Static Assets on push to `main` (config in `wrangler.jsonc`).

This is the **blog** repo. The parent workspace (`../`) holds shared planning notes in `.ai/` and a workspace-level `CLAUDE.md` with cross-repo context. Read `../CLAUDE.md` first when you need the bigger picture; this file covers blog-specific details only.

## Commands

```bash
bun install
bun dev          # http://localhost:4321
bun run build    # astro check + astro build + pagefind index + copy pagefind to public/
bun run preview
bun run lint     # eslint
bun run format   # prettier write
```

Build runs `astro check` first — TypeScript errors block the build. Cloudflare uses the same `bun run build`, so a green local build = green deploy.

## Architecture

**Path alias**: `@/` maps to `src/`.

**Content**: Astro 5 Content Layer API. Posts are `.md` files in `src/data/blog/` loaded via `glob()` in `src/content.config.ts`. Frontmatter schema is there — required fields are `title`, `description`, `pubDatetime`.

**Dark mode**: toggled via `data-theme="dark"` on `<html>` (not CSS `prefers-color-scheme`). All dark-mode CSS uses the custom variant defined in `global.css`: `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *))`. Client JS that reads the theme must check `document.documentElement.getAttribute("data-theme") === "dark"` — see the particle canvas in `src/pages/index.astro` for an example.

**Logo**: `public/logo-sprite.png` is a 1254×1254 PNG sprite with the light-mode logo on the top half and dark-mode logo on the bottom half. The Header displays it using CSS background-image with `background-size: 100% 200%` and `background-position: 0% 0% / 0% 100%` toggled by the dark variant.

**Code blocks**: Shiki is configured with two themes (`min-light` / `night-owl`) and custom transformers in `src/utils/transformers/`. The `transformerFileName` adds filename labels; `@shikijs/transformers` adds notation-based diff/highlight/word-highlight. Use standard Shiki notation comments in fenced code blocks to activate these.

**Dynamic OG images**: `dynamicOgImage: true` in `src/config.ts` triggers Astro Paper's Satori-based OG generation at build time (`@resvg/resvg-js` renders to PNG). Excluded from Vite's `optimizeDeps`.

**Homepage particle canvas**: `src/pages/index.astro` contains a fully client-side canvas animation (mouse-repellent particles with connecting lines). It runs only on `astro:page-load`, cleans up on `astro:before-swap`, and clips rendering to the left/right margins (outside the text column) via `ctx.save()/clip()/ctx.restore()`. Particles are disabled on viewports < 768px.

**Fonts**: Inter (headings) and JetBrains Mono (code) are loaded via Astro experimental fonts API in `astro.config.ts` and exposed as `--font-inter` / `--font-jetbrains-mono` CSS variables.

## Where things live

- `src/data/blog/*.md` — posts. Filename `NN-slug.md` keeps the series numbered.
- `src/config.ts` — site-wide config (title, author, URL, timezone, feature toggles).
- `src/constants.ts` — `SOCIALS` array (footer/about icons) and `SHARE_LINKS` (post share buttons).
- `src/styles/global.css` — Tailwind v4 entry + CSS custom properties for light/dark theme.
- `src/pages/about.md` — About page content.
- `src/layouts/`, `src/components/` — Astro Paper layout/component code.
- `public/logo-sprite.png` — header logo sprite (light top / dark bottom).
- `public/astropaper-og.jpg` — default OG image (replaced in phase 2).

## Conventions

- Posts in **English**, "learning in public" tone, numbered series. Template: (1) what I wanted to check, (2) what I did, (3) what I learned, (4) code/demo, (5) next step. See `../.ai/posty.md` for the planned outline.
- Drafts: set `draft: true` in frontmatter — excluded from build automatically.
- Code examples for each post live in the sibling repo `../agenticflow-examples/post-NN/`. Link from the post.

## Deferred to phase 2 / 3

Don't implement these unless explicitly asked:
- Custom post layout (prev/next, series number, reading time)
- Roadmap checklist on the homepage
- Callout MDX components (💡 / ⚠️ / 💬)
- Mermaid.js diagrams
- Custom-branded OG images via Satori
- Giscus comments, analytics, newsletter form, custom domain
