---
"@radui/ui": minor
---

Add `focusableWhenDisabled` to Button. A disabled button with it stays in the tab order and uses `aria-disabled` instead of native `disabled`, while clicks, Enter, Space and form submission stay blocked. Use it when a button disables itself during a pending request, so focus isn't lost, or when keyboard users need to reach a disabled button to learn why.

In Clarity, only natively disabled buttons ignore the pointer, so a disabled button with `focusableWhenDisabled` can still show a Tooltip on hover explaining why. Hover colors no longer apply to disabled buttons.
