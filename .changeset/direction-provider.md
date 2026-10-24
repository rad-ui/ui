---
"@radui/ui": minor
---

Add DirectionProvider and `useDirection`. Wrap an RTL app once with `<DirectionProvider dir="rtl">` and every Rad UI component inside uses right-to-left keyboard navigation and positioning: Tabs, TabNav, ToggleGroup, Toolbar, RadioGroup, CheckboxGroup, Accordion, Menubar, menus, NavigationMenu, Splitter, Slider, Select and Combobox. A component's own `dir` prop still wins. Set `dir` on `<html>` as well so text and CSS follow.
