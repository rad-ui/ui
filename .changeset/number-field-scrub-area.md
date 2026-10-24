---
"@radui/ui": minor
---

Add `NumberField.ScrubArea`: drag over it (for example a short label) to change the value, like the inputs in design tools. Moving right or up increments by one `step` per `pixelSensitivity` pixels (default 2), Shift uses `largeStep`, `direction="vertical"` switches the axis, and min and max still apply. It carries `data-scrubbing` while dragging. In Clarity it becomes a leading column of the field.
