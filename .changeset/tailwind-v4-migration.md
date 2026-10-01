---
"@radui/ui": major
---

Tailwind CSS v4 support. Tailwind v3 is no longer supported.

The Tailwind preset is now a CSS file instead of a JavaScript config object.
Import it after Tailwind itself:

```css
@import "tailwindcss";
@import "@radui/ui/themes/tailwind-presets/default.css";
```

Breaking changes:

- The `@radui/ui/themes/tailwind-presets/default.js` export has been removed.
  Upgrade Tailwind to v4 before upgrading Rad UI.
- The preset covers colours only, as before. Spacing, radius, shadow, blur and
  typography keep Tailwind's own defaults.
- The colour ramp no longer contains `<alpha-value>`. Opacity modifiers keep
  working (`bg-gray-500/90`), so nothing needs replacing.
- Tailwind v4 dropped its default border colour, so bare `border` now inherits
  `currentColor` instead of `gray-200`. To restore the old default, add this to
  your base layer:

  ```css
  @layer base {
    *,
    ::after,
    ::before,
    ::backdrop,
    ::file-selector-button {
      border-color: oklch(from var(--rad-ui-color-gray-200) l c h);
    }
  }
  ```

- `var(--color-gray-500)` no longer resolves. Read `var(--rad-ui-color-gray-500)`
  instead, which is what v3 emitted anyway.

Applying v4's utility renames to your own markup: `shadow-sm` → `shadow-xs`,
`shadow` → `shadow-sm`, `blur-sm` → `blur-xs`, `blur` → `blur-sm`,
`backdrop-blur-sm` → `backdrop-blur-xs`, `backdrop-blur` → `backdrop-blur-sm`,
`outline-none` → `outline-hidden`, `bg-gradient-to-*` → `bg-linear-to-*`, and
bare `ring` → `ring-3`. Running `npx @tailwindcss/upgrade` handles most of this
automatically.