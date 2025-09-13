# @radui/ui

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
