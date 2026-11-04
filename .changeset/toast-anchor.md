---
"@radui/ui": minor
---

Anchored toasts: pass `anchor` (an element, virtual element, ref or function) to `toast()` to show it beside that element instead of in the stack, e.g. "Copied" next to a copy button. `side`, `align`, `sideOffset` and `alignOffset` place it (default: 8px above, centered) with collision handling. It announces like other toasts, closes on its timer (paused while hovered or focused), on Escape and with `close(id)`, and doesn't take a place in the stack. `Toaster` renders them; with your own `Toast.Provider`, render `<Toast.AnchoredToasts />` once.
