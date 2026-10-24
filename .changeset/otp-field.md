---
"@radui/ui": minor
---

Add OTPField for one-time codes: a group of single-character inputs that fill left to right. Typing moves forward, Backspace moves back, arrows, Home and End move between slots, and pasting or SMS autofill (`autocomplete="one-time-code"`) spreads a full code across them. `validationType` limits characters (numeric by default), `type="password"` masks them, `onValueComplete` fires once every slot is filled, `autoSubmit` submits the form, and `name` submits the code through a hidden input.
