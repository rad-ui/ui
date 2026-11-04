---
"@radui/ui": patch
---

Popover and Dialog (and AlertDialog) now call `onOpenChange(true, { reason: "trigger-press" })` when a detached trigger opens them, so they can be controlled with a handle; canceling it keeps them closed. A `defaultOpen` popup with a handle no longer closes itself on mount.
