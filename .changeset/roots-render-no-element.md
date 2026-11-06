---
"@radui/ui": patch
---

`Dialog.Root`, `AlertDialog.Root`, `Popover.Root` and `Tooltip.Root` no longer render a wrapping `<div>`. A Root only holds state, and the extra element changed the layout around it: it took a `gap` in a flex or grid row even when its trigger was hidden, and broke `space-y` stacks and `:last-child` rules. The trigger now sits directly in your markup. Passing a `ref`, `className`, `style` or another HTML attribute to the Root still renders the wrapper `<div>`, so code that styles or measures a Root keeps working (#2333).
