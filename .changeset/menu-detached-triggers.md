---
"@radui/ui": minor
---

DropdownMenu supports detached triggers: create a handle with `DropdownMenu.createHandle()` and share one menu between triggers rendered anywhere, each with a `payload`, for example a row-actions menu in a table. The menu anchors to the trigger that opened it, its children can be a function of the payload, ArrowDown on a trigger opens it, and clicking the open trigger closes it.
