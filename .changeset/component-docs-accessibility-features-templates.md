---
"@radui/ui": patch
---

docs(contributing): add component docs templates for Accessibility and Features sections

Adds two contributor guides alongside the existing `component-docs-anatomy` and
`component-docs-styling` templates:

- `component-docs-accessibility` — keyboard table format, ARIA/role and state
  attribute requirements, and a checklist that ties each section back to the
  keyboard interaction spec and screen reader testing guide.
- `component-docs-features` — the short scannable Features bullet list, with
  rules for deriving bullets from the shipped public API.

Both are also registered in `docsNavigationSections`, titled
`Component Docs: Accessibility` and `Component Docs: Features` to match the
existing `Component Docs: Anatomy` / `Component Docs: Styling` entries.