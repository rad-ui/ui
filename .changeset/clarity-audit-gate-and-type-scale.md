---
"@radui/ui": patch
---

Add an automated Clarity design-system audit gate and close the first tranche of
findings it surfaced.

The gate (`npm run check:clarity`, wired into CI) fails on raw colors, token
fallbacks, hand-coded shadows, `filter: drop-shadow`, and literal duration,
spacing, radius, typography, and sizing values. It carries a per-rule budget
that acts as a ratchet: CI fails only when a rule goes above its recorded count,
and that count drops as findings are fixed. Rules added later start at zero.

All color, shadow, and motion findings are now zero. Popover's navy shadow and
Toast's hand-picked status hexes were replaced with tokens, which fixes their
dark-mode rendering; the Radio family shared one control shadow; AvatarGroup
referenced an undefined `--rad-ui-text`. Two dense type sizes that had no token
(`0.8125rem` and `0.9375rem`, previously literals in 13 components) are now
generated scale steps behind `dense` and `comfortable` aliases.

No rendered value changes: each swap was verified against compiled CSS.