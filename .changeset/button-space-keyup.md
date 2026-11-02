---
"@radui/ui": patch
---

`Button asChild` with a non-button child (span, div, custom element) now activates on Space the way a native button does: once, when Space is released, and not if focus moves away first. Holding Space no longer fires a click on every key repeat (#2289). Enter still activates on keydown.
