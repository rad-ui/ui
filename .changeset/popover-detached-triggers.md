---
"@radui/ui": minor
---

Popover supports detached triggers. Create a handle with `Popover.createHandle()` and pass it to `Popover.Root` and to triggers rendered anywhere, each with a `payload`. The popover anchors to whichever trigger opened it, its children can be a function of the payload, and clicking the open trigger again closes it.
