---
"@radui/ui": patch
---

`Theme` no longer crashes where `window.matchMedia` is missing (some test runners and embedded webviews), only reads the system colour scheme when `appearance="system"`, and follows system changes on browsers that only support the older `addListener` API.
