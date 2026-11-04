---
"@radui/ui": minor
---

Add `Tabs.Indicator`, a marker for the active tab rendered inside `Tabs.List`. It exposes `--active-tab-left`, `--active-tab-top`, `--active-tab-right`, `--active-tab-bottom`, `--active-tab-width` and `--active-tab-height` relative to the list, plus `data-activation-direction` (`left`, `right`, `up`, `down`), so CSS can slide it between tabs. The Clarity theme animates it and respects `prefers-reduced-motion`.
