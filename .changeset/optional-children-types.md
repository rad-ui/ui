---
"@radui/ui": patch
---

`children` is optional in the types of parts that work without it: `Checkbox.Root`, `Switch.Root`, `Progress.Root`, `Slider.Root`, `RadioGroup.Root` and `RadioGroup.Item`, and the triggers of `Dialog`, `AlertDialog`, `Tooltip`, `DropdownMenu`, `ContextMenu` and `Menubar`. A wrapper typed from `React.ComponentProps<typeof Checkbox.Root>` no longer forces every call site to pass children (#2334).
