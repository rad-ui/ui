---
"@radui/ui": patch
---

docs(guides): add a troubleshooting guide for SSR, portals, and focus

New `docs/app/docs/guides/troubleshooting` page covering the integration
failures that are otherwise spread across guides, organised as
symptom / likely causes / what to try:

- hydration mismatches on overlay and theme components
- portal containers rendering in the wrong place or missing theme tokens
- focus not restoring after a dialog, popover, or menu closes
- focus traps that are too narrow or too wide
- overlays flashing or never opening on first paint
- scroll lock leaking after an overlay unmounts

Registered in `docsNavigationSections` and cross-linked from the existing
SSR & No-JS Fallback guide.