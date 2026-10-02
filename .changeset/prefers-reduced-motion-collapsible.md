---
"@radui/ui": patch
---

Collapsible primitives respect `prefers-reduced-motion`

Adds a `usePrefersReducedMotion` hook and uses it to resolve the Collapsible
height transition.

`transitionDuration` was previously defaulted to `300` in
`CollapsiblePrimitive.Root`, which meant the content type could not tell
"the consumer asked for 300ms" apart from "nobody asked for anything". The
default is removed and the value is resolved in `CollapsiblePrimitiveContent`:

```ts
const resolvedTransitionDuration =
    transitionDuration !== undefined
        ? transitionDuration
        : prefersReducedMotion
            ? 0
            : DEFAULT_TRANSITION_DURATION;
```

So an unset `transitionDuration` now collapses the animation entirely when
`prefers-reduced-motion: reduce` is set, rather than still animating for
300ms. An explicit `transitionDuration` always wins, which is the escape
hatch for anyone who needs to keep animating.

The hook is SSR-safe: it returns `false` until mounted, then follows the
media query, and supports both `addEventListener` and the legacy
`addListener` APIs.

Note that `transitionDuration` on `CollapsiblePrimitiveRootProps` is
unchanged for consumers — it was already optional at the prop level; only the
internal default is gone.