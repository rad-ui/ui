---
"@radui/ui": minor
---

Select, Combobox and Autocomplete take `filter` (or `null`), `limit`, `locale`, `readOnly`, `form`, `inputRef`, `autoComplete`, `finalFocus`, `highlightItemOnHover`, `onItemHighlighted` and `loop`. The default filter ignores case and accents; `Combobox.useFilter` and `Autocomplete.useFilter` give the matchers. New parts: `Select.Label`, `Combobox.Status` and `Autocomplete.Status` (announces the match count). Autocomplete takes `autoHighlight`, `openOnInputClick`, `submitOnItemClick` and `mode`.
