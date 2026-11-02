---
"@radui/ui": patch
---

Checkbox and CheckboxGroup items no longer toggle on Enter; Space toggles them, as the WAI-ARIA checkbox pattern and native checkboxes do. Roving-focus items (CheckboxGroup, and other groups built on them) now run a consumer's `onKeyDown` and `onFocus` alongside their own instead of replacing them, so passing `onKeyDown` to `CheckboxGroup.Trigger` no longer breaks arrow-key navigation.
