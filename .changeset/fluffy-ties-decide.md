---
"@radui/ui": minor
---

This release adds tests around the codebase, improves API support across multiple components, introduces new features like Steps + Minimap and roving focus in CheckboxGroups, while cleaning up builds, docs, and accessibility.


### ✨ Features
- Added **roving focus support for CheckboxGroups**.
- Improved **RadioGroup behavior and accessibility**.
- Enhanced **Select component behavior**.
- Introduced **Steps + Minimap basic implementation**.
- Refactored multiple components to support **`forwardRef`**:
  - RadioGroup, ToggleGroup, Splitter, Table, Tabs, ContextMenu, Collapsible, DataList, Code, BlockQuote, Badge, Card, Avatar, VisuallyHidden.

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


