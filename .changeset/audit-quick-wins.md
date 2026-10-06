---
"@radui/ui": patch
---

fix(a11y): Command separators and RadioGroup arrow keys

- **Command:** `Command.Separator` is now hidden from assistive technology (`aria-hidden`, no `role="separator"`). A separator isn't an allowed child of the `listbox` it renders inside, so axe reported a critical `aria-required-children` violation.
- **RadioGroup / RadioCards:** all four arrow keys move between options, whatever the `orientation`, as the WAI-ARIA radio pattern specifies. Radix and Base UI do the same. `orientation` still sets `aria-orientation`.
