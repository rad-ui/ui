---
"@radui/ui": minor
---

feat: right-to-left support for menus, Select, Combobox, NavigationMenu, TabNav and ScrollArea

- **DropdownMenu, ContextMenu:** new `dir` prop. In RTL, ArrowLeft/ArrowRight open and close submenus, submenus open on the left, and the portaled content (and submenus) carries `dir`. `rtl` is deprecated in favor of `dir="rtl"`.
- **NavigationMenu, TabNav:** new `dir` prop; arrow keys follow reading direction.
- **Select, Combobox:** `dir` on the root now also applies to the portaled listbox.
- **ScrollArea:** horizontal scroll math and scrollbar placement use the computed direction (logical CSS insets, RTL scroll range).
