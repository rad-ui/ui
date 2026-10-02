---
"@radui/ui": patch
---

fix(scrollarea): hide the scrollbar while a document overlay is open

An overlay (Dialog, Menu, Popover, Combobox, Drawer) covers the page and locks
body scroll, but a `ScrollArea` with `type="always"` still painted its scrollbar
and thumb on top of it.

Adds a document-level overlay registry and suppresses the scrollbar and thumb
while any overlay is open:

```ts
const isVisible = !overlaySuppressesScrollbar && (
    type === 'always'
    || (type === 'auto' && isOverflowing)
    || (isOverflowing && (type === 'scroll' || type === 'hover') && scrollbarVisible)
);
```

The registry is ref-counted and mirrors its state onto
`data-rad-ui-overlay-open` on `<html>`, so overlays stack correctly (two open
overlays decrement back to zero rather than clearing early). `ScrollArea` picks
the state up via `useDocumentOverlayOpenState`, which also observes the
attribute and `body`'s inline `style`, so overlays from other libraries that
only lock body scroll are covered too.

`resetDocumentOverlayOpenForTests` is wired into the global `afterEach` in
`setupTests.ts` so the registry cannot leak between suites.