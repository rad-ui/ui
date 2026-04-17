# What Makes A Library Truly Headless

A headless library is not defined only by being unstyled. It is defined by where it draws the boundary between behavior and design.

A strong headless library provides:

- behavior
- accessibility
- state management
- keyboard interactions
- ARIA wiring
- positioning or focus management when needed

A strong headless library avoids owning:

- visual design
- CSS architecture
- design tokens
- unnecessary DOM shape
- application semantics that can reasonably be user-owned

The practical test is simple: can a consumer take the primitive, render it inside their own design system, and not fight the library?

## Core Characteristics

## 1. Behavior Without Visual Ownership

The library should provide working interaction patterns without imposing a look and feel.

Examples:

- accordion open and close behavior
- menu keyboard navigation
- dialog focus trapping
- tabs roving focus
- popover positioning

## 2. Accessibility By Default

The library should handle the hard accessibility work:

- roles
- ARIA attributes
- focus behavior
- keyboard support
- disabled states
- screen-reader expectations

This is one of the main reasons consumers adopt headless primitives instead of building every interaction from scratch.

## 3. Minimal Styling Assumptions

A headless library should not require:

- default visual CSS imports
- hardcoded colors, borders, spacing, radius, or shadows
- fragile wrapper DOM added only for styling convenience
- visual token assumptions inside component logic

Headless does not mean no styling API. It means styling is opt-in and consumer-owned.

## 4. DOM Control

Consumers should be able to control the rendered element when semantics can be safely user-owned.

This usually means support for:

- `asChild`
- `as`
- render props
- slot APIs
- low-level primitive composition

This matters because real apps often need to integrate primitives into existing routing, typography, layout, and semantic markup.

## 5. Stable Styling Hooks

Even headless components should expose stable, documented styling hooks.

Examples:

- semantic `data-*` attributes
- optional namespaced classes
- documented slots or parts
- predictable DOM structure where required

Headless does not mean consumers should inspect source code to discover how to style a component.

## 6. Composability

The best headless libraries feel like primitives, not sealed widgets.

Consumers should be able to:

- combine components freely
- wrap them in local abstractions
- bring their own layout
- attach their own design tokens
- integrate them into an existing system without undoing built-in visual assumptions

## Market Examples

## Radix UI

Radix UI is one of the clearest modern examples of headless primitives.

Why it is commonly seen as headless:

- strong accessibility and behavior layer
- minimal visual ownership in primitives
- stable `data-*` attributes such as `data-state`
- strong `asChild` support
- composable primitive architecture

Radix is a strong benchmark for behavior, accessibility, and styling hooks without owning the design layer.

## Headless UI

Headless UI is another well-known example.

Why it fits:

- interaction and accessibility are handled for the consumer
- styling is left to the app
- markup can be adapted to local design needs

It often pairs naturally with utility-first styling, but the core idea is still headless behavior over visual ownership.

## Ariakit

Ariakit is a strong accessibility-first headless library.

Why it stands out:

- deep accessibility rigor
- low-level primitives
- consumer-owned styling
- strong state and behavior modeling

It is a useful reference when the goal is serious headless accessibility primitives rather than styled widgets.

## React Aria

React Aria is another strong reference point, especially through its hooks-based model.

Why it fits:

- accessibility and interaction logic are first-class
- consumers retain significant rendering and styling control
- design is not owned by the behavior layer

Its API shape is more hook-driven than some component primitive libraries, but philosophically it belongs in the same conversation.

## Reach UI

Reach UI is an important historical reference for accessible, lightly styled primitives.

Why it matters:

- accessibility-first design
- lighter visual ownership than styled component libraries
- strong emphasis on correct semantics and behavior

## What Makes A Library Drift Away From Headless

A library starts to feel less headless when:

- it automatically ships visual CSS with component imports
- it always emits library-owned classes whether the consumer wants them or not
- it requires specific wrappers mainly for styling
- it hardcodes visual tokens in component logic
- it makes consumers fight default spacing, colors, or borders
- it limits DOM control or polymorphism

This does not make the library bad. It simply means the library is moving toward a styled component system rather than a headless primitive system.

## A Practical Definition For Rad UI

Rad UI can credibly describe itself as headless if, by default:

- components render with no library-owned visual classes
- no visual CSS is applied unless the consumer explicitly opts in
- behavior and accessibility still work correctly
- semantic `data-*` hooks remain available
- consumers can opt into namespaced styling through `Theme classNamespace`

That is a strong and defensible headless model.

## Simple Litmus Test

Ask these questions:

- Can the component be used with zero library CSS?
- Does it still behave correctly and accessibly?
- Can consumers style it entirely with their own system?
- Can consumers control the rendered DOM when needed?
- Are styling hooks stable and documented?
- Do consumers avoid fighting default visuals?

If the answer is mostly yes, the library is meaningfully headless.
