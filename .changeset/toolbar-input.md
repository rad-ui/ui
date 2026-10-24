---
"@radui/ui": minor
---

Add `Toolbar.Input`, a text field that's one stop in the toolbar's arrow-key navigation. ArrowLeft and ArrowRight move the caret and leave the field only once the caret is at its start or end, and Home and End stay in the field. Roving focus now keeps a text field's own role and type instead of stamping button semantics on it.
