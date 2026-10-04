---
"@radui/ui": patch
---

Fix Clarity sizing gaps: Skeleton now falls back to a visible `1em` × `100%` block when `height`/`width` are omitted instead of collapsing to 0px, Avatar accepts the library-standard `small`/`large` sizes alongside `sm`/`lg`, and AvatarGroup now applies its `size` and `variant="square"` props to its items.
