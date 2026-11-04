---
"@radui/ui": minor
---

Add `onValueChange(value, event)` to TextField, `TextField.Input` and TextArea: it's called with the new text after `onChange`, so you don't need `event.target.value`. Clearing with `TextField.Reset` reports `''`.
