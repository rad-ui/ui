---
"@radui/ui": patch
---

Toast: the `hotkey` prop now works. Alt+T (Option+T) moves focus to the toasts by default, so keyboard users can reach their actions before they time out; an empty array turns it off, and the viewport exposes it as `aria-keyshortcuts`. Escape dismisses the focused toast and keeps focus in the viewport, and Escape on the viewport returns focus to where the hotkey was pressed.
