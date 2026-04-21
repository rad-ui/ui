# @radui/ui

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
