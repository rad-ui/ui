<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Docs app boundary (dev note — read before touching docs/)

**The docs Next.js app must never reference files outside `docs/`.** Doing so is always a bug.

Vercel builds this app with `docs/` as the project root. At build time the rest of the monorepo (`../src`, `../styles`, `../CHANGELOG.md`, …) does not exist. Anything that reaches outside `docs/` works locally and in a full-repo checkout, then breaks production deploys.

Never:

- Add webpack/turbopack `resolve.alias` entries, `tsconfig` `paths`, or `@source`/`@import` rules that point outside `docs/`.
- Import with a relative path that climbs out of `docs/` (`../../src/...`, `../../styles/...`).
- Read files with `fs` via `process.cwd() + '/..'`, `path.join(__dirname, '..', '..')`, or similar.

Instead:

- Import library code and CSS from the installed package: `@radui/ui`, per-component entries like `@radui/ui/Button`, and theme CSS like `@radui/ui/themes/default.css`.
- Need an unreleased library change in docs? Run `npm run docs:live` from the repo root. It builds the library and points `docs/node_modules/@radui/ui` at it, local only. Ship it by releasing and bumping `@radui/ui`. Never alias to source. See "Docs modes" in `docs/README.md`.
- Before a release, run `npm run docs:verify:fixed` and `npm run docs:verify:live` from the repo root (isolated production builds against the pinned and the about-to-ship library).
- Showing source on a page? Use `getSourceCodeFromPath` in `utils/parseSourceCode.tsx`. `docs/...` paths are read from this app's files. Clarity styles (`src/components/ui/*/*.clarity.scss`) are read from the installed `@radui/ui` (`styles/clarity/*`), so they match the version the docs render. Anything else is fetched from GitHub at the deployed commit.
- Docs pages must stay prerendered (static). Those source reads happen while rendering, which is only safe at build time. Never call `cookies()`, `headers()` or other dynamic APIs in a shared layout; the theme is applied client-side (see `components/Main/Main.js`). `pnpm build` runs `check:static` afterwards and fails if a page becomes dynamic.
- Need a shared file in docs? Copy or generate it into `docs/`.

Enforced by `pnpm check:boundary` (`scripts/check-docs-boundary.mjs`). It runs in `prebuild`, so Vercel and CI fail fast. CI also builds an isolated copy of `docs/`, the same way Vercel does.

# Text contrast (dev note)

All docs text must meet WCAG AA (4.5:1, or 3:1 for large text) in **both** dark and light themes. CI enforces this with `scripts/check-docs-contrast.mjs`: it runs axe's contrast rule on every prerendered page in both themes and fails the build.

- For secondary or muted text, use `text-gray-950` (the `--rad-ui-text-secondary` step) or `text-gray-1000` with at least 70% opacity.
- Gray steps `50`–`900` are for fills, borders and decoration. As text they fail in at least one theme (for example, `text-gray-900` is 3.8:1 in light mode).
- Colored text (syntax highlighting, accents) uses the `950` step.
- Run it locally with `npm run docs:verify:fixed -- --contrast` from the repo root.
