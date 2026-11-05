---
"@radui/ui": patch
---

Triggers rendered with `asChild` keep the child's own semantics. A link inside `Tooltip.Trigger`, `Popover.Trigger`, `Dialog.Trigger` or any other trigger used to get `role="button"` and `type="button"`, so screen readers announced it as a button. Now a link stays a link, a native button keeps its own `type`, and only other elements (a `span`, a `div`) get `role="button"`. `Button` already worked this way; every trigger now does too (#2332).
