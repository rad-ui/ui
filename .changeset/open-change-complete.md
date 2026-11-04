---
"@radui/ui": minor
---

Add `onOpenChangeComplete` to Dialog, AlertDialog and Popover roots: it's called with `true` once the open animation finishes and with `false` once the close animation finishes and the content unmounts (immediately when nothing animates). Useful for moving focus, resetting forms or loading data after a transition.
