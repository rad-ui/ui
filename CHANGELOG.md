# @radui/ui

## 1.0.0

### Major Changes

- 56ab619: Tailwind CSS v4 support. Tailwind v3 is no longer supported.

  The Tailwind preset is now a CSS file instead of a JavaScript config object.
  Import it after Tailwind itself:

  ```css
  @import "tailwindcss";
  @import "@radui/ui/themes/tailwind-presets/default.css";
  ```

  Breaking changes:

  - The `@radui/ui/themes/tailwind-presets/default.js` export has been removed.
    Upgrade Tailwind to v4 before upgrading Rad UI.
  - The preset covers colours only, as before. Spacing, radius, shadow, blur and
    typography keep Tailwind's own defaults.
  - The colour ramp no longer contains `<alpha-value>`. Opacity modifiers keep
    working (`bg-gray-500/90`), so nothing needs replacing.
  - Tailwind v4 dropped its default border colour, so bare `border` now inherits
    `currentColor` instead of `gray-200`. To restore the old default, add this to
    your base layer:

    ```css
    @layer base {
      *,
      ::after,
      ::before,
      ::backdrop,
      ::file-selector-button {
        border-color: oklch(from var(--rad-ui-color-gray-200) l c h);
      }
    }
    ```

  - `var(--color-gray-500)` no longer resolves. Read `var(--rad-ui-color-gray-500)`
    instead, which is what v3 emitted anyway.

  Applying v4's utility renames to your own markup: `shadow-sm` → `shadow-xs`,
  `shadow` → `shadow-sm`, `blur-sm` → `blur-xs`, `blur` → `blur-sm`,
  `backdrop-blur-sm` → `backdrop-blur-xs`, `backdrop-blur` → `backdrop-blur-sm`,
  `outline-none` → `outline-hidden`, `bg-gradient-to-*` → `bg-linear-to-*`, and
  bare `ring` → `ring-3`. Running `npx @tailwindcss/upgrade` handles most of this
  automatically.

### Minor Changes

- 3fec6d3: Add a LiveRegion primitive for accessible status announcements.
- 02254e0: table resizable columns
- 56ab619: Release `TextField` and add theme styles for `Fieldset`.

  - `TextField` is now published. Previously it shipped with styles and tests but
    was missing from the export list, so `@radui/ui/TextField` did not resolve.
  - `Fieldset` now renders with Rad UI styling in both themes instead of the
    browser default, and its `invalid` and `disabled` props have a visual effect.

- 63d644a: Support React 19 in `asChild` components and enable Tailwind alpha modifiers on design tokens.

  **React 19 `asChild` refs** — components that read a ref off the child element (`Primitive`, `PopoverPrimitiveArrow`, `TooltipTrigger`, `AccordionHeader`) accessed `element.ref` directly. React 19 promoted `ref` to a regular prop and left `element.ref` as a deprecation getter, so every `asChild` render logged "Accessing element.ref was removed in React 19" and consumers on React 19 saw warnings from components they never opted into. These now read the ref through a shared `getElementRef` helper that branches on the React major version, because both access paths warn: React 18 warns on `props.ref`, React 19 warns on `element.ref`. Behaviour is unchanged on both versions.

  **React 19 peer range** — the `react` and `react-dom` peer dependencies widened from `^18.2.0` to `^18.2.0 || ^19.0.0`. Without this, an application on React 19 could fail installation while this release claims to support it.

  **React 19 ref teardown** — React 19 lets a callback ref return a teardown function, which React then calls _instead of_ passing `null`. `composeRefs` fanned the node out to every ref but discarded those return values, so a composed ref silently swallowed every teardown an inner ref had registered. It now retains them per ref and replays them on detach, falling back to the old `null` contract for refs that register no teardown. React 18 has no way to run a teardown, so its behaviour is untouched.

  **Tailwind alpha modifiers** — the generated Tailwind preset emitted `var(--rad-ui-color-*)` for every ramp step, so Tailwind's `<alpha-value>` placeholder could never be substituted and opacity modifiers such as `bg-gray-50/90` silently produced no color. The preset now emits `oklch(from var(--rad-ui-color-*) l c h / <alpha-value>)`, which enables the full `/<opacity>` syntax across every palette and step. This changes the CSS your build emits for preset-derived color utilities, and it relies on relative color syntax (Chrome 119+, Safari 16.4+, Firefox 128+). That is inside this project's stated support policy of the latest two stable versions of each evergreen browser, but it does raise the effective floor for apps pinning older browsers, so it is released as a `minor` rather than a `patch`.

  **Token adjustment** — `--rad-ui-text-muted` in the Clarity design system now resolves to `--rad-ui-color-gray-950` instead of `--rad-ui-color-gray-800`, bringing muted text closer to the secondary text ramp for legibility.

### Patch Changes

- 68d9ea9: Expose stable Accordion anatomy data slots for root, item, header, trigger, content, and content inner parts.
- 2fc2c28: Add a composable Breadcrumb component with accessible navigation semantics.
- 1cb98d6: Add Button and Link keyboard interaction and ARIA reference docs.
- 1899f88: Add Checkbox keyboard interaction and ARIA reference tables to the docs.
- d8d348c: Document CheckboxCards keyboard interactions and ARIA references.
- 0e2c3a8: fix(checkbox): expose protected anatomy and state data attributes
- 1ea8953: Document CheckboxGroup keyboard interactions and ARIA references.
- 5ff13c7: Expose stable `data-slot` anatomy markers on CheckboxGroup parts.
- ae43686: Add an automated Clarity design-system audit gate and close the first tranche of
  findings it surfaced.

  The gate (`npm run check:clarity`, wired into CI) fails on raw colors, token
  fallbacks, hand-coded shadows, `filter: drop-shadow`, and literal duration,
  spacing, radius, typography, and sizing values. It carries a per-rule budget
  that acts as a ratchet: CI fails only when a rule goes above its recorded count,
  and that count drops as findings are fixed. Rules added later start at zero.

  All color, shadow, and motion findings are now zero. Popover's navy shadow and
  Toast's hand-picked status hexes were replaced with tokens, which fixes their
  dark-mode rendering; the Radio family shared one control shadow; AvatarGroup
  referenced an undefined `--rad-ui-text`. Two dense type sizes that had no token
  (`0.8125rem` and `0.9375rem`, previously literals in 13 components) are now
  generated scale steps behind `dense` and `comfortable` aliases.

  No rendered value changes: each swap was verified against compiled CSS.

- 10dbaf0: Document Collapsible keyboard interactions and ARIA references.
- 3406f13: fix(collapsible): publish measured content dimensions when forceMounted

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

- 1853344: Add Combobox large-list documentation with an incremental loading example.
- b45059a: Document Command keyboard interactions and ARIA references.
- 90f0db6: docs(contributing): add component docs templates for Accessibility and Features sections

  Adds two contributor guides alongside the existing `component-docs-anatomy` and
  `component-docs-styling` templates:

  - `component-docs-accessibility` — keyboard table format, ARIA/role and state
    attribute requirements, and a checklist that ties each section back to the
    keyboard interaction spec and screen reader testing guide.
  - `component-docs-features` — the short scannable Features bullet list, with
    rules for deriving bullets from the shipped public API.

  Both are also registered in `docsNavigationSections`, titled
  `Component Docs: Accessibility` and `Component Docs: Features` to match the
  existing `Component Docs: Anatomy` / `Component Docs: Styling` entries.

- 4e3b3fe: Document CSS variable fallback and partial token override expectations for Rad UI styled layers.
- 05c0ccb: Add `defaultOpen` to `Dialog.Root` and fix controlled/uncontrolled handling

  `DialogPrimitive.Root` now accepts `defaultOpen` for uncontrolled usage and
  switches from hand-rolled `useState` + `useEffect` syncing to the existing
  `useControllableState` hook.

  This also fixes controlled mode. Previously `open` was seeded into local state
  and re-synced by an effect, so a controlled dialog still opened when the
  trigger was clicked even though the parent held `open={false}` — the effect
  only re-ran when `open` itself changed. With `useControllableState`, a defined
  `open` is authoritative: the dialog reports the request through
  `onOpenChange` and waits for the parent to update.

  `AlertDialog` inherits the same fix. Its `onOpenChange` test asserted the old
  behaviour (clicking the trigger opened a controlled dialog) and now asserts
  correct controlled semantics: the request fires, the dialog stays closed
  until the parent rerenders with `open={true}`.

- 55d0806: fix(dialog): merge consumer props through getItemProps on Action and Cancel

  `DialogPrimitiveAction` and `DialogPrimitiveCancel` spread consumer props
  _after_ the props returned by `getItemProps`, so a consumer handler replaced
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

- ebcab1f: Expose Dialog trigger `data-state`, `data-disabled`, and `aria-expanded` attributes from the primitive.
- 79e711d: Add Disclosure keyboard interaction and ARIA reference documentation.
- 51a45ac: Expose stable Disclosure anatomy data slots and initialize `defaultOpen`.
- 87604b7: Document Drawer keyboard interactions and ARIA references.
- 7d338d9: docs(drawer): add the component documentation page and align the internal context type
- 1ec9c6d: fix(drawer): resolve peekStyle temporal dead zone in DrawerContent

  `DrawerContent` referenced `peekStyle` inside the `getFloatingProps` call
  before the variable was declared further down the component body. The
  `const` declarations sat below an early `return`, so the reference landed in
  the temporal dead zone. The file failed to type-check, which broke four
  Drawer test suites at compile time.

  Hoisting the `peekOffset`/`peekStyle` pair above the `getFloatingProps` call
  fixes the ordering. `getFloatingProps` is also cast to its user-props
  signature, matching the convention already used by Dialog, Combobox and Menu.

- 54b05e7: Add a Fieldset component with native legend semantics, grouped form-control slots, accessibility docs, and state data attributes.
- f2c6bfb: Document HoverCard keyboard interactions and ARIA references.
- 4095f30: Expose stable `data-slot` anatomy markers on HoverCard root, trigger, content, and arrow parts.
- 285c5c8: Document Live Region keyboard behavior and ARIA references.
- 0f04b58: docs(a11y): add ARIA references for select, combobox, and dropdown menu
- 465e6d1: Document NumberField keyboard interactions and ARIA spinbutton references.
- 66a89d5: Expose Popover anatomy data slots for root, anchor, trigger, content, close, and arrow parts.
- db4c358: Collapsible primitives respect `prefers-reduced-motion`

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

- f83f617: Document Progress keyboard behavior and ARIA references.
- 16ed885: Render indeterminate Progress without determinate ARIA value attributes.
- 09da0e2: Keep Progress.Indicator out of the accessibility tree as a second progressbar while preserving its styling data attributes.
- 669e5d8: Document Radio keyboard interaction and ARIA reference tables.
- 06d4f89: Expose stable Radio state and anatomy data attributes.
- 903a35d: Expose stable RadioGroup anatomy markers through `data-slot` attributes on root, label, item, and indicator parts.
- e0a9b2d: Document Slider and RadioCards keyboard interactions and ARIA references.
- e6dde24: Add ScrollArea keyboard interaction and ARIA reference tables to the docs.
- 0ccabb4: fix(scrollarea): hide the scrollbar while a document overlay is open

  An overlay (Dialog, Menu, Popover, Combobox, Drawer) covers the page and locks
  body scroll, but a `ScrollArea` with `type="always"` still painted its scrollbar
  and thumb on top of it.

  Adds a document-level overlay registry and suppresses the scrollbar and thumb
  while any overlay is open:

  ```ts
  const isVisible =
    !overlaySuppressesScrollbar &&
    (type === "always" ||
      (type === "auto" && isOverflowing) ||
      (isOverflowing &&
        (type === "scroll" || type === "hover") &&
        scrollbarVisible));
  ```

  The registry is ref-counted and mirrors its state onto
  `data-rad-ui-overlay-open` on `<html>`, so overlays stack correctly (two open
  overlays decrement back to zero rather than clearing early). `ScrollArea` picks
  the state up via `useDocumentOverlayOpenState`, which also observes the
  attribute and `body`'s inline `style`, so overlays from other libraries that
  only lock body scroll are covered too.

  `resetDocumentOverlayOpenForTests` is wired into the global `afterEach` in
  `setupTests.ts` so the registry cannot leak between suites.

- ffab89f: Expose stable Select anatomy markers through `data-slot` attributes on root, trigger, content, group, item, item text, and item indicator parts.
- 8f8574c: Add Select documentation for large option lists.
- ed757fa: Improve Splitter handle accessibility with separator range attributes, Home/End keyboard resizing, and matching docs tables.
- 6c18fcb: docs(a11y): add ARIA references for alert dialog, context menu, and menubar
- 279d111: Document Switch keyboard interactions and ARIA pattern references.
- bfd1085: Expose stable Switch anatomy data slots and keep the thumb visual-only for assistive technologies.
- 5f1af85: Expose stable Tabs anatomy markers through `data-slot` attributes on root, list, trigger, and content parts.
- 8284dc5: Added TextArea accessibility docs covering keyboard behavior and native multiline textbox semantics.
- 8ca42a5: Expose TextField anatomy through stable `data-slot` attributes.
- 88c11a3: docs(toast): add keyboard interaction and ARIA reference tables
- ebe6ba7: Document Toggle and Toggle Group keyboard interactions and ARIA references.
- 32d31e8: Expose Tooltip anatomy data slots for root, trigger, content, and arrow parts.
- 91d18f6: Document Tree keyboard interactions and ARIA tree view references.
- dc01059: docs(Tree): add large-data branch mounting guidance and correct item API docs.

## 0.6.0

### Minor Changes

- fa1a1d5: scroll area visual types
- 1535c08: new toast component

### Patch Changes

- 3a9ef46: Add configurable `loop` focus-wrapping options for Tabs, Disclosure, Tree, and NavigationMenu, including NavigationMenu content panels.
- b7d4406: Restore Menubar horizontal keyboard navigation when focus is inside open menu content.
- b7d4406: Preserve inline AspectRatio styles while applying its ratio value.
- b577317: popover - improve radix api parity, modal focus behavior, arrow styling, and positioning stability

## 0.5.0

### Minor Changes

- ad29c4f: hovercard - size prop , datalist - size , color prop, quote -truncate prop
- fd2bd8b: drawer preview added

### Patch Changes

- a25ee5a: Add a work-in-progress `TextField` compound API with slot and reset fragments, updated styling, Storybook stories, and behavioral test coverage.

## 0.4.0

### Minor Changes

- 2708fb3: 27 components as officially released as preview, including Checkbox, Radio, Select, Combobox, DropdownMenu, and others.
- 5c8ec74: Context Menu (bugs fixes,placement fixes, scroll , variant and size prop)

### Patch Changes

- 3accf7b: slider vertical inverted fix
- 5b55d3c: Refresh **ToggleGroup** and **Toolbar** styles to match the segmented neutral treatment (shared borders, gray fills, internal dividers). Fix **Toolbar** link/button layout after `all: unset` by restoring `inline-flex` row alignment. Expand **Link** and **Toolbar** Storybook examples for icons (leading, trailing, icon-only) and correct **WithIcon** column alignment with `items-start`.
- 69e0c14: onValueCommit prop for slider

## 0.3.0

### Minor Changes

- d2c5395: migration from querySelector to refs for roving focus, tree and slider

### Patch Changes

- 4db8aa7: ui revamp for multiple comps

## 0.2.1

### Patch Changes

- 9a28add: Align AlertDialog styling with theme tokens.

## 0.2.0

### Minor Changes

- 11a4fe9: new spinner component added
- 140d24d: Renamed the select to combobox primitive and separated themed components for select and combobox
- bdf63a1: Addition of color and radius api support in TextArea and new styling

### Patch Changes

- 008342f: **Accordion**: add root `disabled` to disable every item; thread `data-orientation` through root, item, header, trigger, and content for styling hooks consistent with Radix-style patterns; expand accessibility tests.
- 38503b6: mergeRefs added
- b968b4a: export types for all comps
- a42620d: Fix select and combobox popup behavior by improving portal rendering, restoring macOS-style reopen anchoring for `Select`, and tightening related UI polish in the sandbox and shared component styles.

## 0.1.10

### Patch Changes

- f162d4c: Improve readability of borders and text colors

## 0.1.9

### Patch Changes

- 4be6c27: Fix React RSC (React Server Components) vulnerability by ensuring proper client component directives and preventing server-side rendering issues
- 9fb0047: Improve component styling and accessibility, add animations, and update component examples

## 0.1.8

### Patch Changes

- d22ef40: resize, size and varaint api support added for textarea

## 0.1.6

### Patch Changes

- 4363ff3: Added Separator for dropdown , context and menubar menus
- 336fe3f: MenuPrimitive root now supports rtl, loop, avoidCollision,placement and the item supports disabled, asChild , onSelect. Tests for the same have been added too.
- bcad222: Fix incomplete npm bundles for some 0.1.x releases; raise Node heap for builds, add export validation and a `--check` flag, with ESM/CJS and root export support.

## 0.1.5

### Patch Changes

- f77dc1b: Sub-components, now throw subtle warnings instead of console logs

## 0.1.0

### Minor Changes

- b471ddb: Tests, API improvements across components, Steps + Minimap, roving focus for CheckboxGroup, RadioGroup and Select updates, `forwardRef` on many primitives, a11y and build fixes.

### BREAKING CHANGES

**Toggle:** `onChange` was renamed to `onPressedChange`.

```tsx
// Before
<Toggle onChange={(pressed) => { /* handle toggle */ }} />

// After
<Toggle onPressedChange={(pressed) => { /* handle toggle */ }} />
```
