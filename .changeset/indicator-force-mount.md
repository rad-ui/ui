---
"@radui/ui": minor
---

Add `forceMount` to `Checkbox.Indicator` and `RadioGroup.Indicator` (and the CheckboxGroup primitive content): the indicator stays rendered while unchecked, with `data-state="unchecked"`, so it can animate out or reserve space. The radio indicator now also carries `data-state`.
