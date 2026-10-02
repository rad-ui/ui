---
"@radui/ui": patch
---

Run manual ScrollArea restoration again on the next animation frame so late browser or router scroll restoration cannot leave custom viewports scrolled after refresh or route changes.
