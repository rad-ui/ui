# Knowledge Master List

Start here before making meaningful code or documentation changes. This file is the canonical entry point for project context across AI agents.

## What This Repo Is

Rad UI is a React component library focused on headless behavior, accessibility, composition, and long-term maintainability.

## Default Workflow

- Read this file first.
- Open only the linked knowledge docs relevant to the current task.
- Prefer existing patterns in `src/`, `docs/`, and the knowledge docs over inventing new ones.
- If behavior, API shape, or styling contracts change, update docs and tests in the same change when practical.

## Commands

- Install root dependencies: `npm install`
- Run Storybook: `npm run sb`
- Build library: `npm run build:rollup`
- Run root tests: `npm test`
- Run lint: `npm run lint`

Docs app workflow:

- Install docs dependencies: `cd docs && pnpm install`
- Run docs app: `cd docs && pnpm dev`

## Codebase Landmarks

- `src/`: component library source
- `docs/`: docs site
- `knowledge/`: internal project knowledge and decisions
- `README.md`: product/repo overview

## Core Project Rules

- Preserve the headless boundary. The library should own behavior and accessibility, not consumer visual design.
- Prefer stable semantic `data-*` attributes for public state/styling contracts.
- Avoid `querySelector` in components; use refs for instance-safe DOM access.
- Do not introduce library-owned styling classes unless they are generated through `Theme classNamespace`.
- Match existing architecture and naming conventions before adding new patterns.

## Knowledge Docs

Open these as needed based on the task:

- `knowledge/what-makes-a-library-truly-headless.md`
  Use for headless architecture, behavior/design boundaries, and API decisions.
- `knowledge/features/data-attributes.md`
  Use for public `data-*` attribute conventions and styling contract decisions.
- `knowledge/features/styling-namespaces.md`
  Use for `Theme classNamespace` behavior and generated class rules.
- `knowledge/good_practices/index.md`
  Use for implementation guardrails, especially SSR-safe class generation and avoiding `querySelector`.
- `knowledge/querySelector-to-refs/components-analysis.md`
  Use when touching components that currently rely on `querySelector`.
- `knowledge/design_system/clarity_design_system.md`
  Use for design-system thinking and perceptual consistency decisions.
- `knowledge/releases/how-rad-ui-releases-are-made.md`
  Use for release-stage terminology and release documentation.

## When To Read More

- For component behavior or API questions, start with `src/` and the matching knowledge doc.
- For documentation changes, check `docs/` and `README.md`.
- For release or maturity language, consult the release-stage knowledge doc before editing docs or labels.

## Agent Notes

- Treat this file as the starting point, not the only source of truth.
- Pull in only the minimum additional docs needed for the task to keep context focused.
- If this file becomes outdated, update it as part of the change.
