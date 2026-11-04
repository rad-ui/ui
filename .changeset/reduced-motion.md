---
"@radui/ui": minor
---

The default theme now follows the system's reduce-motion setting. Every `--rad-ui-motion-duration-*` token collapses to `--rad-ui-motion-duration-reduced`, so transitions and enter/exit animations finish at once (components still unmount on time), and the transition tokens keep colour changes but drop movement. A Skeleton stops pulsing, an indeterminate Progress keeps a slow pace, and Spinner keeps spinning.
