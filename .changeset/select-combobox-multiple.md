---
"@radui/ui": minor
---

Select and Combobox support `multiple`. With it, `value`, `defaultValue` and `onValueChange` use arrays, picking an option toggles it and keeps the list open, the listbox gets `aria-multiselectable`, the trigger lists the selected labels (or calls `renderValue` with the arrays), and a form submits every value under `name`. Combobox adds `Combobox.Chips`, which shows the selected values as removable chips, and Backspace in an empty search removes the last one.
