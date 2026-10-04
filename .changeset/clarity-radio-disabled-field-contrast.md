---
"@radui/ui": patch
---

Clarity theme contrast fixes: Radio, RadioGroup, and RadioCards controls now use the same `border-strong` ring as Checkbox (the previous step-6 border was nearly invisible in dark mode), and disabled TextArea and TextField dim to 50% opacity like Button and Select, since the disabled surface tokens alone were almost indistinguishable from an enabled field.
