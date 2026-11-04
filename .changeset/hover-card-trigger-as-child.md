---
"@radui/ui": patch
---

`HoverCard.Trigger asChild` no longer puts the theme's link look (underline, text colour, font size) on your element: a Button inside it keeps the Button's styles. The link look stays on the trigger's default `<span>`.
