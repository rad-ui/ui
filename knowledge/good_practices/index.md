Avoid `querySelector` in components. With multiple instances, it always selects the first match in the DOM.
This causes cross-component bugs. Use refs for scoped, instance-safe access instead.

## SSR-Safe Styling Namespace Generation

Generated component classes must be deterministic and synchronous.

Rules:

- `Theme` should provide `classNamespace` through React context.
- Components should derive part classes during render.
- No `classNamespace` means no generated component classes.
- Class generation must not depend on browser-only APIs, effects, random values, layout measurements, local storage, or media queries.
- The server and client must see the same `Theme` value during render and hydration.
- Avoid making theme classes appear only after mount.

Good:

```tsx
const className = classNamespace ? `${classNamespace}-accordion-root` : undefined;
```

Avoid:

```tsx
useEffect(() => {
  setClassNamespace(window.localStorage.getItem("theme"));
}, []);
```

Do not rely on runtime CSS injection as the default styling mechanism. Runtime injection complicates SSR, streaming, CSP, style ordering, and first paint. Prefer static CSS imports or framework-level stylesheet links.
