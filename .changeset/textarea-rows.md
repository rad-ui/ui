---
"@radui/ui": patch
---

`TextArea` respects `rows`: the theme's default minimum height (7.5rem, 6rem small, 9rem large) now only applies when `rows` isn't set, so short text areas no longer need a CSS override.
