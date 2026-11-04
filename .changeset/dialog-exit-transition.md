---
"@radui/ui": patch
---

Dialog, AlertDialog and Popover now play their closing transition: content and overlay stay mounted with `data-state="closed"` until the exit transition or animation finishes, then unmount (straight away with reduced motion or no animation). Focus still returns at the moment of closing.
