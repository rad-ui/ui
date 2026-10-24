---
"@radui/ui": minor
---

Add `Tooltip.Provider` to share hover delays between tooltips. Once one tooltip in the group has opened, moving to another within `timeout` opens it instantly, and its content carries `data-instant` so CSS can skip the entry animation. `Tooltip.Root` `openDelay` and `closeDelay` still override the provider.
