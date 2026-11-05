---
"@radui/ui": patch
---

`Combobox`, `Checkbox`, `CheckboxGroup`, `RadioGroup`, `Switch` and `Field` no longer restore their default value when the owning form's `reset` event is cancelled with `preventDefault()`. They used to reset anyway, so a page that cancels resets lost the user's selection and submitted the default. The restore now runs after the event has finished dispatching, like a native control, so it also follows the browser's own reset of the form (#2344).
