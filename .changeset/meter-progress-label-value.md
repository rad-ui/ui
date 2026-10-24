---
"@radui/ui": minor
---

Meter and Progress add `Label`, `Value` and `Track` parts plus `format` and `locale`. Label names the bar for screen readers, Value shows the formatted value (or a rounded percentage) as visible text, and Track holds the Indicator so Label and Value can sit next to the bar. `format` takes Intl.NumberFormat options and also sets `aria-valuetext`. Without a Track, the root is still the bar.
