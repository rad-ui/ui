---
"@radui/ui": minor
---

Every element with a `data-state` now also gets a boolean attribute for it: `data-open` / `data-closed`, `data-checked` / `data-unchecked` / `data-indeterminate`, `data-pressed` (toggles that are on), `data-complete`, `data-dragging` and `data-loading`. Style with `[data-open]` or Tailwind's `data-open:` variant as well as `[data-state="open"]`.
