---
"@radui/ui": major
---

Migrate from Tailwind CSS v3 to v4.

The Tailwind preset is now a CSS file of `@theme` variables instead of a v3
JavaScript config object. Import it after Tailwind itself:

```css
@import "tailwindcss";
@import "@radui/ui/themes/tailwind-presets/default.css";
```

Breaking changes for consumers:

- The export is now `@radui/ui/themes/tailwind-presets/default.css`. The v3
  `.../default.js` export has been removed, along with support for v3 configs.
  If you are still on Tailwind v3, upgrade Tailwind before upgrading Rad UI.
- The preset covers colours only, as the v3 preset did. Spacing, radius, shadow,
  blur and typography keep Tailwind's own defaults.
- `<alpha-value>` is gone from the colour ramp. v4 composes opacity with
  `color-mix()`, so `bg-gray-500/90` keeps working and needs no placeholder.
- Tailwind v4 dropped its default border colour, so bare `border` now inherits
  `currentColor` instead of `gray-200`. If you relied on the old default, add
  this to your base layer:

  ```css
  @layer base {
    *,
    ::after,
    ::before,
    ::backdrop,
    ::input {
      border-color: oklch(from var(--rad-ui-color-gray-200) l c h);
    }
  }
  ```

- The theme is declared with `@theme inline`, which is what keeps colour
  utilities theme-aware. Inline theme variables are substituted into the
  utilities that use them, so `bg-gray-50` compiles to
  `oklch(from var(--rad-ui-color-gray-50) l c h)` and resolves against whichever
  theme element it sits in. Plain `@theme` would hoist `--color-gray-50` to
  `:root`, where it substitutes the light `--rad-ui-color-gray-50` once and
  caches that result — dark mode and nested themes would silently do nothing.

  The tradeoff: no `--color-*` custom properties are emitted, so
  `var(--color-gray-500)` in your own CSS will not resolve. Read the
  `--rad-ui-*` properties directly instead (`--rad-ui-color-gray-500`), which is
  what v3 emitted anyway.

Consumers upgrading from v3 also need to apply v4's utility renames to their own
markup. The ones this repository hit: `shadow-sm` → `shadow-xs`, `shadow` →
`shadow-sm`, `blur-sm` → `blur-xs`, `blur` → `blur-sm`, `backdrop-blur-sm` →
`backdrop-blur-xs`, `backdrop-blur` → `backdrop-blur-sm`, `outline-none` →
`outline-hidden`, `bg-gradient-to-*` → `bg-linear-to-*`, and bare `ring` →
`ring-3`. Running `npx @tailwindcss/upgrade` handles most of this automatically.