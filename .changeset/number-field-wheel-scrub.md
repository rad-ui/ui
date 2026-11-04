---
"@radui/ui": minor
---

Add `allowWheelScrub` to NumberField: while the input is focused, the mouse wheel steps the value (Shift uses `largeStep`) and the page doesn't scroll. Scrolling past an unfocused field never changes it.
