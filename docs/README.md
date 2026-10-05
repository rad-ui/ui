# Docs App

This directory contains the Rad UI documentation site built with Next.js.

## Prerequisites

- Node.js 18+
- `pnpm`

The root package uses `npm`, but the docs app is managed with `pnpm`.

## Run locally

From this directory:

```bash
pnpm install
pnpm dev
```

The app starts a local Next.js server for docs and showcase work.

## Docs modes: live vs fixed

Run these from the **repository root**. They decide which `@radui/ui` the docs app uses:

| Command | `@radui/ui` source | Use it to |
|---|---|---|
| `npm run docs:live` | Your local build (`dist/` in the repo root) | Develop or debug components against the real docs |
| `npm run docs:fixed` | Published version pinned in `docs/pnpm-lock.yaml` | See exactly what production shows |
| `npm run docs:mode` | — | Print which mode `docs/` is in right now |
| `npm run docs:verify:fixed` | Pinned published version, isolated copy of `docs/` | Reproduce the Vercel build |
| `npm run docs:verify:live` | `npm pack` of your local build, isolated copy of `docs/` | Release sanity check: will docs still build once this version ships? |

**Live mode** builds the library (`npm run build:rollup`; pass `-- --no-build` to reuse `dist/`). It points `docs/node_modules/@radui/ui` at the repo root, then starts `pnpm dev`. To pick up later library changes, rebuild in another terminal. Live mode only swaps that one `node_modules` symlink, never `docs/package.json` or the lockfile, so it can't be committed or reach Vercel. Run `npm run docs:fixed`, or any `pnpm install` in `docs/`, to go back.

**Verify commands** copy `docs/` to a temp directory with no monorepo around it and run a production build there, the same way Vercel does. Before a release, run both:

```bash
npm run docs:verify:fixed   # what's deployed today still builds
npm run docs:verify:live    # docs build against the version you're about to publish
```

## Dev note: the docs app must stay inside `docs/`

Vercel builds this app with `docs/` as the root, so nothing outside this folder exists at build time. Never import, alias, `@import`, or `fs`-read files from `../src`, `../styles`, or anywhere else outside `docs/`. Use the published `@radui/ui` package, or `npm run docs:live` (above) to test local library changes. `pnpm check:boundary` enforces this and runs automatically before `pnpm build`. Full rules: [`AGENTS.md`](./AGENTS.md#docs-app-boundary-dev-note--read-before-touching-docs).
