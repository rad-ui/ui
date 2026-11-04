---
"@radui/ui": minor
---

New state attributes: `ScrollArea.Root` and its scrollbars get `data-scrolling` while the viewport scrolls and `data-hovering` while the pointer is over the area, and the root gets `data-has-overflow-x` / `data-has-overflow-y`; `Slider.Root` gets `data-dragging` during a drag; `Avatar.Root` gets `data-loading` while the image loads and `data-error` if it fails.
