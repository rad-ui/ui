# @radui/ui

## 0.1.8

### Patch Changes

- d22ef40: resize, size and varaint api support added for textarea

## 0.1.7

### Patch Changes

- 75152f8: Fix GitHub workflows to use correct build script instead of silent failure

## 0.1.6

### Patch Changes

- 4363ff3: Added Separator for dropdown , context and menubar menus
- 336fe3f: MenuPrimitive root now supports rtl, loop, avoidCollision,placement and the item supports disabled, asChild , onSelect. Tests for the same have been added too.
- bcad222: ## Fix: Missing Components in NPM Bundle

  **Versions 0.1.0 - 0.1.5** had incomplete component bundles due to build failures.

  **Root Cause**: Due to updates we've made to build processes to build components for npm, we might have broken the process due to list on package.json not being in sync, we totally missed testing a couple of versions.

  **Fix**: Increased Node.js heap size to 8GB and added export validation to prevent silent build failures.

  **New Features**: Added `--check` flag for export validation, ESM/CommonJS support, and root export support.

## 0.1.5

### Patch Changes

- f77dc1b: Sub-components, now throw subtle warnings instead of console logs

## 0.1.4

### Patch Changes

- 6b514f8: fix formatting of announcement - test workflow
- 6b514f8: Patch workflow indentation issue

## 0.1.3

### Patch Changes

- cb1205d: Patch workflow indentation issue
- 2d19c42: Testing Discord Release Workflow

## 0.1.2

### Patch Changes

- e394a8d: testing changeset workflow automation - part 2

## 0.1.1

### Patch Changes

- 759dcc6: Test patch to check workflows

## 0.1.0

### Minor Changes

- b471ddb: This release adds tests around the codebase, improves API support across multiple components, introduces new features like Steps + Minimap and roving focus in CheckboxGroups, while cleaning up builds, docs, and accessibility.

  ### ✨ Features

  - Added **roving focus support for CheckboxGroup**.
  - Improved **RadioGroup behavior and accessibility**.
  - Enhanced **Select component behavior**.
  - Introduced **Steps + Minimap basic implementation**.
  - Refactored multiple components to support **`forwardRef`**:
    - Avatar, Badge, BlockQuote, Card, Code, Collapsible, ContextMenu, DataList, RadioGroup, Splitter, Table, Tabs, ToggleGroup, VisuallyHidden.

  ### 🧪 Tests & Accessibility

  - Expanded **a11y test coverage**: axe-core, Accordion, Slider, RadioGroup, AlertDialog, Dialog, Primitive `asChild`, and SSR hydration scenarios.
  - Added **portal test utilities** for Dialog/AlertDialog.
  - Stabilized and silenced noisy test warnings.
  - Enforced **global test coverage thresholds**.
  - Parallelized Jest test runs with **sharding** for faster feedback.

  ### 🛠 Fixes & Refactors

  - Fixed `SelectPrimitiveItemProps` export typing.
  - Refined **NavigationMenu typing**.
  - Increased **Rollup build memory limit** and excluded Storybook files from builds.
  - Silenced “Primitive `asChild`” warnings in tests.

  ### 📚 Docs & Chores

  - Added **CodeRabbit sponsor hero** to docs.
  - Added **Changeset workflow** for release management.
  - Improved **WCAG tree navigation support**.
  - Minor styling fixes and dark mode improvements.
  - Updated Toggle API: `onChange` → `onPressedChange`.

  ## BREAKING CHANGES

  ### Toggle Component API Rename

  The Toggle component's `onChange` prop has been renamed to `onPressedChange` to better reflect its semantic meaning and align with accessibility standards.

  **Migration Required:**

  ```tsx
  // Before
  <Toggle onChange={(pressed) => { /* handle toggle */ }} />

  // After
  <Toggle onPressedChange={(pressed) => { /* handle toggle */ }} />
  ```

  **TypeScript Updates:**

  - Update any TypeScript interfaces or type definitions that reference `onChange` to use `onPressedChange`
  - The prop signature remains the same: `(pressed: boolean) => void`
  - Update any custom Toggle wrapper components or higher-order components that pass through the `onChange` prop

  **Impact:**

  - This change affects all consumers using the Toggle component
  - Update your codebase to use the new `onPressedChange` prop name
  - No functional changes to the component behavior - only the prop name has changed
