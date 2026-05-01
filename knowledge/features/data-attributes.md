# Data Attributes

Components should expose public state and styling metadata through semantic `data-*` attributes. These attributes are part of the styling contract and should remain stable, readable, and unprefixed.

Data attributes should describe what the component is doing or which public prop value is active. They should not encode a design-system namespace. Namespacing belongs to generated classes through `Theme classNamespace`.

## Attribute Categories

`data-state` represents behavior state.

Examples:

```html
<button data-state="open"></button>
<button data-state="checked"></button>
<div data-state="active"></div>
```

Use this for component states such as open, closed, checked, unchecked, active, inactive, selected, expanded, or collapsed.

`data-disabled` represents interaction state.

Example:

```html
<button data-disabled></button>
```

Use this when the component or part is unavailable for interaction. Prefer presence/absence for boolean interaction flags.

`data-orientation` represents layout or behavior direction.

Examples:

```html
<div data-orientation="horizontal"></div>
<div data-orientation="vertical"></div>
```

Use this for components whose keyboard behavior, layout, or animation depends on orientation.

`data-variant`, `data-size`, and `data-color` represent styling props reflected to the DOM.

Example:

```html
<button data-variant="soft" data-size="md" data-color="blue"></button>
```

These attributes should mirror public styling props. They do not apply styles by themselves; they give consumers and optional design-system CSS a stable selector API.

Do not scope these attributes to a component name. For example, use
`data-variant="soft"` instead of `data-button-variant="soft"`, and
`data-size="large"` instead of `data-badge-size="large"`.

`data-slot` is an optional component anatomy marker.

Example:

```html
<div data-slot="accordion-root">
  <button data-slot="accordion-trigger" data-state="open"></button>
  <div data-slot="accordion-content"></div>
</div>
```

If added, `data-slot` should identify stable component parts. It can be useful for headless styling when consumers prefer attribute selectors over class selectors.

## Prefixing

Do not prefix public styling attributes with a design-system namespace.

Prefer:

```html
<button data-variant="soft" data-state="open"></button>
```

Avoid:

```html
<button data-rad-ui-variant="soft" data-acme-state="open"></button>
<button data-button-variant="soft"></button>
```

Class names are the namespace boundary:

```html
<button class="acme-button-root" data-variant="soft" data-state="open"></button>
```

Library infrastructure attributes may stay library-prefixed when they identify Rad UI internals or provider infrastructure, such as `data-rad-ui-theme` or `data-rad-ui-portal-root`.

## Styling Model

Consumers should be able to combine namespaced classes with semantic data attributes:

```css
.acme-accordion-trigger[data-state="open"] {
  /* open trigger styles */
}

.acme-button-root[data-variant="soft"][data-color="blue"] {
  /* soft blue button styles */
}
```

Consumers should also be able to style with data attributes alone when they choose the classless/headless path:

```css
[data-slot="accordion-trigger"][data-state="open"] {
  /* open trigger styles */
}
```

## Contract

- Data attributes should be deterministic for SSR and hydration.
- Data attributes should reflect public component state or public props.
- Do not expose private implementation details as public data attributes.
- Do not use data attributes as a replacement for accessible ARIA attributes.
- Keep public data attribute names semantic and unprefixed.
- Use generated classes for design-system namespacing.
