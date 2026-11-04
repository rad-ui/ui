---
"@radui/ui": minor
---

Nested dialogs can be styled as a stack. A Dialog or AlertDialog opened inside another dialog's content gets `data-nested`, and the parent's content gets `data-nested-dialog-open` plus a `--nested-dialogs` count while it's open, so CSS can scale or dim the dialog behind. Escape still closes only the top dialog.
