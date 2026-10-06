---
"@radui/ui": minor
---

feat(build): publish per-component Clarity style sources

Each component's Clarity styles now ship in the package and can be imported from `@radui/ui/styles/clarity/<Component>/<file>.clarity.scss`. For example, `@radui/ui/styles/clarity/Button/button.clarity.scss`.

- The folder structure matches the source, so relative `@use` imports between components still resolve when you compile a single file with Sass.
- `@radui/ui/themes/default.css` is unchanged and remains the recommended way to load the full Clarity theme.
- The docs site uses these files to show the exact styles that ship in each released version.
