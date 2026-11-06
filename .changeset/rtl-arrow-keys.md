---
"@radui/ui": patch
---

In right-to-left layouts, `OTPField` and `Menubar` arrow keys now follow the reading direction. `OTPField.Input`'s ArrowLeft moves to the next slot and ArrowRight to the previous one, and `Menubar.Content`'s ArrowLeft opens the next menu, when the root has `dir="rtl"` or sits in an RTL `DirectionProvider`. Both used to move as in left-to-right layouts. `OTPField.Root` also sets `dir` on its element when the direction comes from a `DirectionProvider`.
