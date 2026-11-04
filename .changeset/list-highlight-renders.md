---
"@radui/ui": patch
---

Long lists stay fast while you move through them. In Select, Combobox, Autocomplete, DropdownMenu, ContextMenu and Menubar, moving the highlight used to re-render every item on each arrow key (300 options in a 300-item Select, twice that in a Combobox with search); now only the item losing the highlight and the one gaining it re-render.
