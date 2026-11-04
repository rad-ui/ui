---
"@radui/ui": minor
---

Add `initialFocus` and `finalFocus` to `Popover.Content`, matching Dialog: choose where focus goes when the popover opens (first tabbable element, stay on the trigger, or a ref) and where it returns when it closes (the trigger, nowhere, or a ref). Each also accepts a function.
