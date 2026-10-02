---
"@radui/ui": minor
---

Release `TextField` and add theme styles for `Fieldset`.

- `TextField` is now published. Previously it shipped with styles and tests but
  was missing from the export list, so `@radui/ui/TextField` did not resolve.
- `Fieldset` now renders with Rad UI styling in both themes instead of the
  browser default, and its `invalid` and `disabled` props have a visual effect.
