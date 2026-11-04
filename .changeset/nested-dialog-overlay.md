---
"@radui/ui": patch
---

A Dialog or AlertDialog opened inside another no longer darkens the page a second time: its overlay gets `data-nested` and the themes keep it transparent. It still catches outside clicks.
