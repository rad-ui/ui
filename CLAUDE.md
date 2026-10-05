See `knowledge/MASTER_LIST.md`.

Treat that file as the single canonical source of project guidance in this repository.

## Hard rule: the docs app never reaches outside `docs/`

The Next.js docs app in `docs/` must never reference files outside `docs/`: no aliases, relative imports, CSS `@import`s, or `fs` reads into `../src`, `../styles`, etc. Vercel builds `docs/` in isolation, so those paths don't exist in production. Use the published `@radui/ui` package instead. If you find such a reference, it is a bug: fix it. Details: `docs/AGENTS.md` → "Docs app boundary". Enforced by `cd docs && pnpm check:boundary`. To test unreleased library changes in docs, use `npm run docs:live` (local only); `npm run docs:fixed` returns to the pinned version.
