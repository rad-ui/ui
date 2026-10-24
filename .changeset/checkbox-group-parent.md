---
"@radui/ui": minor
---

CheckboxGroup supports a "select all" checkbox. Pass every item's value as `allValues` on the Root and add `parent` to a Trigger: it's checked when every item is, mixed (`aria-checked="mixed"`, `data-state="indeterminate"`, a dash icon) when some are, and toggling it checks or clears them all. It submits nothing of its own.
