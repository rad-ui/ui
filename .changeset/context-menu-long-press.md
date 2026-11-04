---
"@radui/ui": minor
---

ContextMenu now opens on a 500ms touch long press, so it works on iOS Safari, which never fires `contextmenu`. Moving the finger more than 10px cancels the press so the page can still scroll, and the click that follows lifting the finger no longer closes the menu. The Clarity trigger also turns off the iOS touch callout.
