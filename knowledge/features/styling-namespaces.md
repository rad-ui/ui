# Styling Namespaces

Components are headless by default. Without a `Theme classNamespace`, components should not emit library-owned styling classes and should not apply visual styles out of the box.

`Theme classNamespace` is the preferred way to enable generated component classes for a subtree:

```tsx
<Theme classNamespace="acme">
  <Accordion.Root />
</Theme>
```

This should render deterministic, namespaced part classes:

```html
<div class="acme-accordion-root" data-state="closed"></div>
```

`Theme` without `classNamespace` must still render no generated component classes:

```tsx
<Theme>
  <Accordion.Root />
</Theme>
```

This is intentional. No namespace means the consumer is consciously choosing a headless/classless component tree, even if `Theme` is present for appearance, tokens, portal placement, or other context values.

`classNamespace` controls emitted component class names. It does not imply that a CSS file has been loaded.

`customRootClass` overrides the active `Theme classNamespace` for this component only. This is useful when incrementally migrating a component to a different design-system namespace.

Precedence:

```txt
customRootClass > Theme classNamespace > no generated class
```

Use `className` for local composition or one-off styling:

```tsx
<Theme classNamespace="acme">
  <Accordion.Root className="billing-accordion" />
</Theme>
```

Expected output:

```html
<div class="acme-accordion-root billing-accordion" data-state="closed"></div>
```

The generated class is the design-system hook. The user-provided `className` is the local override or composition hook.

## Class Contract

Generated classes should represent component parts and slots using:

```txt
{namespace}-{component}-{part}
```

Example:

```html
<div class="acme-accordion-root">
  <div class="acme-accordion-item">
    <button class="acme-accordion-trigger"></button>
    <div class="acme-accordion-content"></div>
  </div>
</div>
```

Root classes should include the `root` part for consistency:

```txt
acme-button-root
acme-card-root
acme-accordion-root
```

## Data Attribute Contract

See `knowledge/features/data-attributes.md` for the full data attribute contract.

Behavioral state and styling props should remain in `data-*` attributes rather than becoming additional generated classes:

```html
<button class="acme-accordion-trigger" data-state="open"></button>
```

CSS should target state like this:

```css
.acme-accordion-trigger[data-state="open"] {
  /* open state styles */
}
```

Public styling data attributes should stay semantic and unprefixed:

```html
<button data-variant="soft" data-size="2" data-state="open"></button>
```

Do not namespace public styling attributes as `data-acme-variant` or `data-rad-ui-variant`. Class namespace handles ownership; data attributes describe state, props, and behavior.

Library infrastructure attributes can remain library-prefixed when they identify Rad UI internals or theme infrastructure, for example `data-rad-ui-theme` or `data-rad-ui-portal-root`.

## CSS Loading

The recommended model is static CSS loading by the consuming app:

```tsx
import "@rad-ui/themes/acme.css";

<Theme classNamespace="acme">
  <App />
</Theme>
```

`Theme` should control emitted classes and theme context values. It should not rely on runtime CSS injection as the default styling mechanism.

## Positioning

Components are unstyled by default. `Theme` enables a styling contract by adding namespaced part classes. Consumers can use provided CSS, their own CSS, or a custom design-system package that targets the same class structure.
