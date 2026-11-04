---
"@radui/ui": minor
---

Add `format` and `locale` to NumberField. With `format` (Intl.NumberFormat options), the value shows as currency, a percent, a unit or with grouping; people can type formatted text such as "2,000" or "1.234,5", and it's reformatted when they leave the field. The value stays a plain number (25% is 0.25) and forms submit that number. The input keeps spinbutton semantics with `aria-valuetext`.
