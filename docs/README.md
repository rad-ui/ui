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

## Test local library changes in the docs app

Build and link the library from the repository root:

```bash
npm install
npm run build:rollup
npm link
```

Then link that local package into the docs app:

```bash
cd docs
pnpm link @radui/ui
pnpm dev
```

If the docs app is already using the published package, re-run `pnpm link @radui/ui` after rebuilding the library.
