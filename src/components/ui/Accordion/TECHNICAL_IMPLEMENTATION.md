# Accordion Technical Implementation

Accordion is built on top of the shared collapsible primitive.

## Structure

- `Accordion.Item` owns whether a section is open.
- `Accordion.Trigger` toggles the item through the shared accordion context.
- `Accordion.Content` delegates mounting and measurement to `CollapsiblePrimitive.Content`.

## Animation model

The measured content size comes from the collapsible primitive, not from Accordion-specific DOM reads.

In [AccordionContent.tsx](/Users/pranaykothapalli/Desktop/dev/hobby/ui/src/components/ui/Accordion/fragments/AccordionContent.tsx), the component maps the collapsible variables to Radix-style accordion variables:

- `--radix-accordion-content-height: var(--radix-collapsible-content-height)`
- `--radix-accordion-content-width: var(--radix-collapsible-content-width)`

This means Accordion can style against the same variable names that Radix documents, while the underlying measurement work stays centralized in the primitive.

## Why measurement lives in Collapsible

Putting the measurement logic in Accordion would duplicate behavior that is already generic:

- first-open animation handling
- close-presence timing
- `forceMount` behavior
- DOM size measurement before paint

Keeping that logic in the primitive lets Accordion stay focused on value management, keyboard behavior, and semantic wiring.

## Timing

Accordion items currently pass a fixed internal transition timing to the collapsible primitive:

- duration: `200ms`
- timing function: `ease`

That keeps Accordion behavior consistent while still exposing Radix-style size variables for styling.
