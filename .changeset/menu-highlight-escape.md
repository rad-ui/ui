---
"@radui/ui": minor
---

Menus take `highlightItemOnHover`, `onItemHighlighted` and `closeParentOnEsc`, an `Arrow` part, and `finalFocus` on Content. Escape in a submenu now closes only that submenu and returns focus to its trigger item, as the WAI-ARIA menu pattern describes; set `closeParentOnEsc` for the old behaviour.
