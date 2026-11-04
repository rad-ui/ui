---
"@radui/ui": minor
---

Popover, Dialog and AlertDialog `onOpenChange` handlers that take a second argument receive details: the `reason` (`trigger-press`, `outside-press`, `escape-key`, `focus-out`, `close-press` and more), the DOM `event`, and `cancel()` to keep the current state, for example an "unsaved changes" guard. Handlers that take one argument are called exactly as before. This matches Drawer, which already worked this way.
