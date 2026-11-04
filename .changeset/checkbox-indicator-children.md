---
"@radui/ui": patch
---

`Checkbox.Indicator`: children now replace the default check/dash icon instead of being added next to it, `className` goes on the indicator element instead of the icon, and the default icon is sized in `em` (the theme sizes it to the box) instead of a fixed 15px that overflowed small checkboxes.
