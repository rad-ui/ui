---
"@radui/ui": patch
---

`RadioGroup` and `RadioCards` render their items directly inside the `radiogroup` element. They used to sit in an extra `<div role="group">`, so `display: grid` or `flex` with `gap` on the root didn't lay them out, and assistive tech met a `group` nested inside the `radiogroup`. The Clarity and Baremetal themes now lay out the root itself. If your own CSS targeted the inner wrapper (`.rad-ui-radio-group-root > [role="group"]`), move those rules to the root (#2336).
