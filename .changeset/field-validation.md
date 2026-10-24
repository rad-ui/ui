---
"@radui/ui": minor
---

Field validates. It runs the browser's own checks (required, type, pattern, min/max) plus an optional `validate` function, and shows the result per `validationMode`: after a submit attempt (`onSubmit`, the default), on blur, or on change, then updates live as the user fixes it. `Field.Error` shows the validation message when it has no children, and `match` gives each problem its own message, for example `match="valueMissing"`. `Field.Validity` renders custom UI from the result. Parts carry `data-valid` and `data-invalid`, and `invalid` still forces the error state.
