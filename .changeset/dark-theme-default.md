---
"@radui/ui": minor
---

feat(theme): default `Theme` appearance to dark

`<Theme>` now renders `data-rad-ui-theme="dark"` when no `appearance` is passed. Previously it defaulted to `'system'` and followed the OS color scheme.

To keep the old behavior, pass it explicitly:

```tsx
<Theme appearance="system">...</Theme>
```

`appearance="light"` and `appearance="dark"` are unchanged.
