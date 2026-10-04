---
"@radui/ui": patch
---

Give Menubar WAI-ARIA menubar semantics: the root is `role="menubar"` with horizontal orientation, triggers are `menuitem`s with `aria-haspopup="menu"`, `aria-expanded` and `data-state`, triggers use a roving tab stop with Home/End support, and menu content is `role="menu"` with `menuitem` items. Menubar no longer listens for arrow keys on the whole document, so arrow keys pressed elsewhere on the page can no longer reopen a closed menu. In Clarity, the Menubar and Toolbar roots now hug their controls, and Toolbar buttons, links and toggle items share one control recipe with a distinct pressed state.
