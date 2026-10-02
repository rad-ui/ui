---
"@radui/ui": patch
---

fix(drawer): resolve peekStyle temporal dead zone in DrawerContent

`DrawerContent` referenced `peekStyle` inside the `getFloatingProps` call
before the variable was declared further down the component body. The
`const` declarations sat below an early `return`, so the reference landed in
the temporal dead zone. The file failed to type-check, which broke four
Drawer test suites at compile time.

Hoisting the `peekOffset`/`peekStyle` pair above the `getFloatingProps` call
fixes the ordering. `getFloatingProps` is also cast to its user-props
signature, matching the convention already used by Dialog, Combobox and Menu.
