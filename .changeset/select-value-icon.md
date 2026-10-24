---
"@radui/ui": minor
---

Add `Select.Value` and `Select.Icon`. Put `<Select.Value placeholder="…" />` inside `Select.Trigger` and the trigger keeps all its own children (icons, prefixes) instead of being replaced by the selected label; Value shows the label, the placeholder (with `data-placeholder`), or your render function's output. `Select.Icon` is a decorative chevron that replaces the built-in caret. Triggers without a Value part behave as before.
