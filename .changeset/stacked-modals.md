---
"@radui/ui": patch
---

Fix modals used from inside a `Drawer`. A `Dialog` or `AlertDialog` opened from a drawer now stacks on top of it: screen readers can read it, clicks in it no longer close the drawer, Escape closes only the top one, and focus returns into the drawer. A portalled `Select` (or menu) inside a drawer can be picked with the mouse again; the drawer no longer treats a press on it as the start of a swipe.
