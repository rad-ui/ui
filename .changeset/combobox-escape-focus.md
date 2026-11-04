---
"@radui/ui": patch
---

Combobox and Select return focus to the trigger as soon as Escape closes the list, instead of after the focus manager's queued return, so focus is never left on force-mounted content in between (#2274).
