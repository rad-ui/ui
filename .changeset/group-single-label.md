---
"@radui/ui": patch
---

`CheckboxGroup` and `RadioGroup` always render their group wrapper. With a single item wrapped in its `Label`, the group's `role` and `id` used to merge onto that `<label>`, so the checkbox or radio lost its accessible name.
