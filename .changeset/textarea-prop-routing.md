---
"@radui/ui": patch
---

Fix TextArea prop routing: field attributes (`id`, `name`, `value`, `onChange`, `rows`, `required`, `aria-*`, …) now reach the native `<textarea>` instead of the wrapper `<div>`, so labels associate and controlled usage works; string children render once as the initial value instead of being duplicated after the textarea; styling props and `data-*` attributes stay on the root, which also exposes `data-disabled`. `readOnly` is accepted alongside the legacy `readonly` prop.
