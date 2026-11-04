---
"@radui/ui": minor
---

Checkbox, Switch, Select and NumberField inside `Field.Root` now report focus, blur and edits to the field, so `data-focused`, `data-touched` and `data-dirty` follow them, and they carry the field's state attributes themselves. Fields also get `data-filled` while the control holds a value (non-empty text, a checked box, a picked option). Moving between a NumberField's input and its buttons doesn't count as leaving the field.
