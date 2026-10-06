---
"@radui/ui": minor
---

feat(badge): soft label style by default

Badges get a new look:

- **Default variant is now `soft`** (was `solid`): a translucent tint of the badge's color with vivid text. Pass `variant="solid"` to keep the previous default.
- **Small rounded corners** (`--rad-ui-control-radius-sm`) instead of a pill, and the **mono font** at weight 600, for every variant.
- **Without `color`**, the soft badge uses the neutral gray scale.

Every color scale clears WCAG AA (4.5:1 or better) in both light and dark. A new theme variable, `--rad-ui-badge-soft-text-weight`, tunes the soft text mix per appearance.
