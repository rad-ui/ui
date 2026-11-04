---
"@radui/ui": minor
---

Add `hiddenUntilFound` to `Collapsible.Content` and `Accordion.Content`. Closed content stays in the page with `hidden="until-found"`, so the browser's find-in-page can search it, and a match opens the section. Useful for FAQs and docs where people search with Ctrl+F.
