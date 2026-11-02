---
"@radui/ui": patch
---

`Dialog.Content` with `initialFocus` set to a ref or a function now focuses that element with `preventScroll`, so a tall, scrolling dialog opens at its top instead of jumping to the element (#2278). A function is now called once the dialog has opened, so it can look up elements inside the content.
