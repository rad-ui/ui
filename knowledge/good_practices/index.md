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

See `Runtime Style Injection` below for the canonical guidance on CSS injection.

## Data Attribute Contract

Keep public data attributes semantic and unprefixed.

Rules:

- Do not namespace public styling attributes like `data-state`, `data-variant`, or `data-size`.
- Use data attributes for public state, behavior, orientation, and styling prop reflection.
- Do not treat data attributes as global namespace boundaries. Generated classes handle namespacing.
- Keep data attributes readable and stable so consumers can style against them intentionally.

Attribute categories:

- `data-state`: behavior state
- `data-disabled`: interaction state
- `data-orientation`: layout or behavior state
- `data-variant`, `data-size`, `data-color`: styling props reflected to the DOM
- `data-slot`: optional component anatomy marker, if supported

Prefer:

```html
<button data-state="open" data-variant="soft" data-size="md"></button>
```

Avoid:

```html
<button data-rad-ui-state="open" data-acme-variant="soft"></button>
```

## CSS Variable Neutrality

If components emit CSS variables, keep structural variables separate from visual variables.

Rules:

- Structural runtime variables are acceptable when they are needed for behavior, measurement, positioning, or animation.
- Avoid emitting visual design variables directly from headless components.
- Visual variables imply a design system and should live in optional CSS packages or theme stylesheets instead of the headless core.

Acceptable structural examples:

- measured content height
- transform origin
- floating position variables
- animation dimensions

Potentially non-headless visual examples:

- `--button-bg`
- `--accordion-border`
- `--color-primary`

Structural variables support behavior. Visual variables define a design language. Keep those concerns separate.

## Default Prop Values

Default props should be evaluated differently depending on whether they define behavior or styling metadata.

Rules:

- Behavioral defaults are generally good when they make the component usable and predictable.
- Styling defaults should be treated carefully because they can imply a design system even when the component is otherwise headless.
- If styling defaults are part of the public API, be explicit that they are metadata defaults and not visual styling by themselves.
- Be intentional about whether default styling props should be reflected into the DOM when the consumer did not pass them.

Behavioral defaults examples:

- `orientation="vertical"`
- `type="single"`
- `disabled={false}`

Styling metadata defaults examples:

- `variant="soft"`
- `size="md"`
- `color="gray"`
- `radius="md"`

This is a product and API decision, not just an implementation detail. Decide per component whether default styling props should produce public data attributes by default or only when explicitly passed.

## CSS Package Separation

Package structure should communicate the styling model clearly.

Rules:

- Importing components should not automatically import visual styles.
- Keep headless component exports separate from optional design-system CSS packages.
- Make default styles an explicit consumer choice through stylesheet imports or equivalent framework-level configuration.
- Avoid packaging structures that make the styled path feel implicit or unavoidable.

The important contract is simple: component imports provide behavior and DOM APIs, while CSS imports provide optional design-system visuals.

## Public Anatomy Docs

If generated classes are opt-in, consumers need a stable styling map for each component.

Rules:

Document the following for each component:

- Slots or parts for every stylable component
- Generated class names using the namespace pattern
- Public data attributes
- Public CSS variables, if any exist
- DOM structure guarantees that consumers can safely rely on
- Be explicit about what is public and stable versus what is internal and may change.

Each component should make its styling contract easy to find and easy to trust.

## Tests For Headlessness

Classless-by-default behavior should be covered by tests for each component that emits namespaced styling classes.

Rules:

- Add a test that verifies the component renders without generated classes by default.
- Add a test that verifies `Theme classNamespace` enables the expected generated class.
- Keep these assertions focused on the public styling contract so regressions are caught early.

Example:

```tsx
render(<Accordion.Root />);
expect(root).not.toHaveAttribute('class');
```

```tsx
render(
  <Theme classNamespace="acme">
    <Accordion.Root />
  </Theme>
);

expect(root).toHaveClass('acme-accordion-root');
```

## Avoid DOM Wrapper Surprises

Headless components should avoid unnecessary wrapper elements.

Rules:

- Do not add wrapper elements only to make default styling easier.
- Prefer rendering the semantic element or primitive directly when behavior allows it.
- Add a wrapper only when it is required for behavior, accessibility, measurement, positioning, animation, or layout that cannot be expressed on the existing element.
- When a wrapper is required, keep its responsibility clear and local.
- Document stable wrappers that consumers may reasonably style against.

Audit components for wrappers added only for styling convenience.

## asChild And Polymorphism

Headless components should give consumers control over the rendered element whenever semantics can reasonably be user-owned.

Rules:

- Support `asChild` consistently on interactive parts where consumers may need to control the DOM element.
- Consider `as` support for non-interactive components when it improves semantic flexibility without complicating the API too much.
- Preserve refs correctly across polymorphic rendering paths.
- Preserve ARIA attributes, event handlers, and component behavior when using `asChild`.
- Avoid forcing `button`, `div`, `span`, or other elements when the semantic element can be safely owned by the consumer.

Polymorphism is part of the headless contract. Consumers should be able to keep accessible behavior while choosing the DOM shape that fits their app.

## Collision-Free Portal Strategy

Portaled components must continue to work with headless styling, theme context, and SSR.

Rules:

- Portal roots should be controllable by the consumer or theme provider.
- Generated class namespaces must still apply to portaled content.
- CSS variables should continue to resolve correctly for portaled content when consumers rely on them.
- Do not assume portaled content remains inside the visual or DOM subtree where the trigger was rendered.
- SSR output and hydration behavior must stay deterministic.

Portals can break styling assumptions when content renders outside the original subtree; audit dialog, popover, hover card, context menu, and similar components wherever theme context, CSS variables, or namespace-based styling must flow across the portal boundary.

## Runtime Style Injection

Avoid runtime style injection unless the consumer explicitly opts into it.

Rules:

- A headless core should not inject `<style>` tags by default.
- Do not make component styling depend on automatic client-side style injection.
- Prefer static CSS imports or framework-level stylesheet links for default design-system styles.
- If runtime style injection is ever supported, it should be an explicit opt-in API.

Runtime style injection complicates SSR, streaming, CSP, ordering, and first paint. Keep the default styling model deterministic and explicit.

## Attribute Noise

Headless components should keep generated DOM intentional.

Rules:

- Audit for unnecessary `data-*` attributes.
- Do not render empty `class=""` attributes.
- Do not render empty `style=""` attributes.
- Avoid duplicating semantic roles that the browser or primitive already provides.
- Do not leak internal implementation attributes as part of the public styling API by accident.
- After class namespace migrations, audit for empty class output caused by patterns like `clsx('', className)`.

Headless does not always mean minimal DOM output, but every emitted attribute should have a clear behavioral, accessibility, or public styling purpose.
