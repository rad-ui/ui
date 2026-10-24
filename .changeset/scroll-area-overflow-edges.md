---
"@radui/ui": minor
---

ScrollArea marks which edges have hidden content: the root and viewport get `data-overflow-y-start`, `data-overflow-y-end`, `data-overflow-x-start` and `data-overflow-x-end`, plus `--scroll-area-overflow-*` variables with the distance in pixels, updated as it scrolls. Use them for fade masks or edge shadows that appear only where there's more to scroll.
