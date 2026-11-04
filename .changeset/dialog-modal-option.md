---
"@radui/ui": minor
---

Add `modal` to Dialog (and AlertDialog) roots: `true` (default, unchanged) traps focus, locks page scroll and lets the overlay block the page; `"trap-focus"` traps focus but leaves the page scrollable and clickable; `false` leaves the page fully usable (no focus trap, no `aria-modal`). Explicit `trapFocus` / `aria-modal` on the content still win.
