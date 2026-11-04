---
"@radui/ui": patch
---

`Combobox.Root`'s `onClickOutside` was accepted but never called; it now fires when a press outside closes the list. On Combobox and Dialog it is deprecated in favour of `onOpenChange`, whose `details.reason` is `"outside-press"` in that case.
