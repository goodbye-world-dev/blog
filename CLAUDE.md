# CLAUDE.md (blog repo)

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

Build script runs `astro check` first — TypeScript errors block builds. Cloudflare Pages uses the same `bun run build`, so a green local build = green deploy.

## Where things live

- `src/data/blog/*.md` — blog posts. Filename `NN-slug.md` keeps the series numbered. Schema in `src/content.config.ts` (required: `title`, `description`, `pubDatetime`; optional: `author` defaults to `SITE.author`, `tags`, `draft`, `featured`, `ogImage`).
- `src/config.ts` — site-wide config (title, author, URL, timezone, feature toggles).
- `src/constants.ts` — `SOCIALS` array (footer/about icons) and `SHARE_LINKS` (post share buttons).
- `src/styles/global.css` — Tailwind v4 entry + CSS custom properties for light/dark theme. Dark mode tokens are from `../.ai/design.md`.
- `src/pages/about.md` — About page content.
- `src/layouts/`, `src/components/` — Astro Paper layout/component code; don't touch in phase 1 unless fixing bugs.
- `public/astropaper-og.jpg` — default OG image. Replaced in phase 2.

## Conventions

- Posts in **English**, "learning in public" tone, numbered series. Template: (1) what I wanted to check, (2) what I did, (3) what I learned, (4) code/demo, (5) next step. See `../.ai/posty.md` for the planned post outline.
- Drafts: set `draft: true` in frontmatter. Drafts are excluded from build automatically.
- Code examples for each post live in the sibling repo `../agenticflow-examples/post-NN/`. Link from the post.
- Don't add features beyond what the current phase needs. Phase 1 = MVP; design system, callouts, custom OG images, and engagement features come in later phases.

## Deferred to phase 2 / 3

Don't implement these yet unless explicitly asked:
- Custom post layout (prev/next, series number, reading time)
- Roadmap checklist on the homepage
- Callout MDX components (💡 / ⚠️ / 💬)
- Mermaid.js diagrams
- Custom-branded OG images via Satori
- Inter / JetBrains Mono fonts
- Giscus comments, analytics, newsletter form, custom domain
