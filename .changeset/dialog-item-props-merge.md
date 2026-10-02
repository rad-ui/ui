---
"@radui/ui": patch
---

fix(dialog): merge consumer props through getItemProps on Action and Cancel

`DialogPrimitiveAction` and `DialogPrimitiveCancel` spread consumer props
*after* the props returned by `getItemProps`, so a consumer handler replaced
the library's own handler instead of running alongside it.

On `Action`, passing an `onClick` silently suppressed the close: the internal
`handleOpenChange(false)` was overwritten, so the dialog stayed open.

Both parts now pass consumer props into `getItemProps` and compose `onClick`
explicitly, so the consumer handler runs first and the dialog still closes:

```tsx
{...getItemProps({
    ...props,
    onClick: (e) => {
        onClick?.(e);
        handleOpenChange(false);
    }
})}
```

`DialogPrimitiveContextType` also widens `getItemProps`, `getReferenceProps`
and `getFloatingProps` to accept optional user props, and the default context
value returns those props unchanged instead of `{}`.
