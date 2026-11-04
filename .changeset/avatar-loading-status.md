---
"@radui/ui": minor
---

Add `onLoadingStatusChange` to `Avatar.Image`: it's called with `"loading"`, `"loaded"` or `"error"` as the image loads, fails or changes `src` (a missing `src` reports `"error"`).
