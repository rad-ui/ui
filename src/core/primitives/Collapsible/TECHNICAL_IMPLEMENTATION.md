# Collapsible Technical Implementation

`CollapsiblePrimitive.Content` uses a Radix-style measurement flow so the first open can animate smoothly.

## Why this exists

If closed content is completely unmounted and only mounted after `open` flips to `true`, the browser has no element to animate from on the first open. The panel appears instantly, then later toggles animate because the element already exists.

## Current flow

The implementation in [CollapsiblePrimitiveContent.tsx](/Users/pranaykothapalli/Desktop/dev/hobby/ui/src/core/primitives/Collapsible/fragments/CollapsiblePrimitiveContent.tsx) does this instead:

1. Render the content immediately when `open` becomes `true`.
2. In `useLayoutEffect`, temporarily disable transitions on the DOM node.
3. Measure the node with `getBoundingClientRect()`.
4. Save the measured size into CSS variables:
   - `--radix-collapsible-content-height`
   - `--radix-collapsible-content-width`
5. Restore the transition styles before paint.
6. Animate the inline `height` from `0` to the measured height.
7. When closing, keep the node mounted until the close animation duration completes, then unmount unless `forceMount` is set.

## Important details

- `useLayoutEffect` is required here because the measurement and style restoration must happen before the browser paints.
- `isPresent` keeps the content mounted long enough for close animations to finish.
- `forceMount` keeps the content in the DOM even while closed.
- `transitionDuration` still controls both the inline height animation and the unmount delay for this primitive.

## Accordion relationship

Accordion content reuses the same measured dimensions by aliasing the collapsible CSS variables onto:

- `--radix-accordion-content-height`
- `--radix-accordion-content-width`

That keeps Accordion aligned with the Radix mental model without duplicating the measurement logic.
