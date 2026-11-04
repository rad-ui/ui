---
"@radui/ui": minor
---

Add `triggerId` and `defaultTriggerId` to Dialog, AlertDialog, Popover, Tooltip, HoverCard, DropdownMenu and ContextMenu roots used with a `handle`: the DOM `id` of the detached trigger the popup belongs to. While open, the popup is anchored to that trigger, shows its payload and marks it `aria-expanded`, also when opened from code with `open`. Closing through a controlled `open` now releases the trigger too.
