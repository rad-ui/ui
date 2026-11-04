---
"@radui/ui": minor
---

Checkbox, Switch, Select and NumberField work inside `Field.Root` without `Field.Control`: they take the field's id (so `Field.Label` names them), name, disabled and required state, and get `aria-describedby` from `Field.Description` and `Field.Error` plus `aria-invalid` when the field is invalid. A control's own props still win.
