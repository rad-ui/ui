---
"@radui/ui": minor
---

Popover, Tooltip, Dialog and AlertDialog content (and the Dialog overlay) support CSS transitions on enter and exit. Opening renders one frame with `data-starting-style` and closing sets `data-ending-style`, and the element stays mounted until its animations and transitions finish, so a plain `transition` on opacity or transform animates both ways. With no exit animation it unmounts at once, as before. Closed content still on screen can't be clicked or focused.
