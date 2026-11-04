---
"@radui/ui": patch
---

Dialog and AlertDialog content in the default theme: centred on phones (the mobile margin no longer pushes it off the right edge, #2277); padded at the bottom when there's no Footer, and tall content scrolls inside the viewport instead of being clipped (#2285). The content box is now `box-sizing: border-box`, so its padding counts inside the width: desktop dialogs are a little narrower than before and exactly `--rad-ui-overlay-width-lg` wide.
