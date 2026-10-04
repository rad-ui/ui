---
"@radui/ui": patch
---

Fix NavigationMenu dismissal and semantics: open content now closes on Escape (returning focus to the trigger) and on pointerdown outside the item, hover no longer re-opens a dismissed menu, hover-opened content stays open while the pointer crosses the gap into the panel (deferred close plus a hover bridge), a pointer click right after hover-opening a trigger keeps the menu open instead of toggling it closed, and links/triggers no longer carry invalid `role="button"`, `type`, or `aria-selected` attributes. RovingFocusGroup no longer logs a `Primitive.div` asChild warning when a group has multiple children, and RovingFocus items wrapping `<a href>` keep native link semantics.
