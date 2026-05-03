# Verify pnpm Usage and Documentation Consistency

Use this checklist whenever you touch package management, contributor workflows, CI, or installation docs.

## Package manager contract

- The root library uses `pnpm`, not `npm`, for local development and CI.
- The docs app also uses `pnpm`.
- Root and docs `package.json` files should declare the current `packageManager` version.
- Guardrails should prevent accidental `npm install` usage for development workflows where practical.

## Lockfiles and manifests

- Prefer `pnpm-lock.yaml` as the source of truth for active workflows.
- Do not introduce or regenerate `package-lock.json` files for root or docs unless there is an explicit reason documented in the change.
- If dependencies change, verify the related `package.json` and `pnpm-lock.yaml` stay aligned.

## Scripts and CI

- Root scripts should call other scripts with `pnpm`, not `npm run`.
- GitHub Actions workflows for install, test, lint, coverage, build, and release validation should use `pnpm`.
- Cache settings in CI should target `pnpm` and the correct lockfile path.
- If a workflow intentionally still uses npm, call that out in the PR summary and explain why.

## Contributor documentation

- Repository setup docs should instruct contributors to run `pnpm install` in the root.
- Docs development docs should also use `pnpm` end-to-end.
- Local linking or package testing instructions should use pnpm-compatible commands and be verified after edits.
- Contributing and release-checklist docs should reference `pnpm` commands when describing local verification steps.

## Consumer installation documentation

- Public installation docs should show `pnpm add @radui/ui`.
- Keep npm installation guidance alongside pnpm where the page is consumer-facing.
- Do not replace npm consumer instructions entirely unless the page is specifically about repository development.
- When updating install snippets, verify examples remain accurate for package name and import paths.

## Verification

- Search for stale `npm install`, `npm ci`, `npm run`, and `package-lock.json` references after the edit.
- Run the relevant install/build/test/docs commands with `pnpm` where feasible.
- Summarize any remaining npm references that are intentional, external, or publish-related.
