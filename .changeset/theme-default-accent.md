---
"@radui/ui": patch
---

Theme: the accent scale (`--rad-ui-color-accent-*`) now defaults to gray on the Theme container when no `accentColor` is set. Previously every accent-based border and fill (Table frames, Button fills, focus rings) silently disappeared unless an accent colour was passed. An explicit `accentColor` or a component `color` still wins.
