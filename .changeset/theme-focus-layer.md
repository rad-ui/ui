---
"@radui/ui": patch
---

The theme's fallback focus ring for plain buttons, links and inputs inside a `Theme` now sits in the `base` cascade layer, so app focus styles (Tailwind `focus-visible:` utilities, or any unlayered CSS) override it. It is also drawn outside the element, so content that fills a button (an image, a canvas) no longer hides it. Rad UI components keep their own focus rings.
