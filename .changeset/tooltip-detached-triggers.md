---
"@radui/ui": minor
---

Tooltip supports detached triggers: create a handle with `Tooltip.createHandle()` and share one `Tooltip.Root` between many `Tooltip.Trigger` elements, each with a `payload` and an optional hover `delay`, for example every cell of a table. The tooltip anchors to the hovered or focused trigger, which gets `aria-describedby`, and closes on pointer leave, blur or Escape.
