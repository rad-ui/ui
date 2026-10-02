---
"@radui/ui": patch
---

fix(collapsible): publish measured content dimensions when forceMounted

With `forceMount`, `CollapsiblePrimitive.Content` is already present, so in the
zero-duration branch both `setHeight(undefined)` and `setIsPresent(true)` bail
out as no-ops and no re-render is scheduled. The measurement from that pass
lives only in refs, so the measured size never reached the CSS variables and
`--radix-collapsible-content-height` / `--rad-collapsible-content-height` were
left at their initial `0`.

That matters most under `prefers-reduced-motion`, where the resolved transition
duration is `0` — so the affected path is the default for those users:

```tsx
<CollapsiblePrimitive.Root defaultOpen>
    <CollapsiblePrimitive.Content forceMount>…</CollapsiblePrimitive.Content>
</CollapsiblePrimitive.Root>
```

Before, the content height variable read `0px`; it now reads the measured
height.