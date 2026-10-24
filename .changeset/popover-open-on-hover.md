---
"@radui/ui": minor
---

Add `openOnHover` to `Popover.Root`, with `hoverOpenDelay` (default 300ms) and `hoverCloseDelay` (default 0). The popover also opens while the pointer rests on the trigger, and the pointer can move into it without it closing. Clicking still toggles it, so touch and keyboard users aren't left out.
