---
"@radui/ui": minor
---

`Tooltip.Content` and `HoverCard.Content` take `side`, `align`, `sideOffset` and `alignOffset`, like `Popover.Content`, and expose the resolved `data-side` and `data-align`. HoverCard could only open below its trigger before. `Tooltip.Root`'s `placement` still works when `side` isn't set. A `style` prop on `HoverCard.Content` no longer replaces its positioning styles.
