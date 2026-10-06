---
"@radui/ui": patch
---

fix(tooltip): keep the Clarity tooltip dark in dark mode

The Clarity tooltip used `--rad-ui-surface-inverse`, which flips to near-white
under `data-rad-ui-theme="dark"`, so tooltips rendered as a light box on dark
pages. Tooltip content and arrow now read new `--rad-ui-tooltip-background`,
`--rad-ui-tooltip-text`, and `--rad-ui-tooltip-border` aliases: inverse in light
mode (unchanged), and a raised dark surface with a soft border in dark mode.
Override those aliases on a Theme container to customise tooltip colors.
