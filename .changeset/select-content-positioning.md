---
"@radui/ui": patch
---

`Select.Content`, `Combobox.Content` and `Autocomplete.Content` accept `side`, `align`, `sideOffset` and `alignOffset`, as `Popover.Content` and `Tooltip.Content` do. They used to work only on the Root; on Content they were silently passed to the DOM, and React warned about unknown props. Values on Content win over the Root's (#2335).
