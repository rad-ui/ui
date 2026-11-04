---
"@radui/ui": patch
---

Internal: one implementation for merging event handlers. `mergeProps` (used by `asChild`) now goes through `composeEventHandlers`, which forwards every argument; behaviour is unchanged (consumer handler first, ours skipped after `preventDefault()`).
