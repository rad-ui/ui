---
"@radui/ui": minor
---

Add `onValueCommit` to NumberField: it's called with the settled value on blur or Enter after typing, when a held stepper button is released, and right away for keyboard steps, and only when the value actually changed. Use it to save or validate without reacting to every keystroke.
