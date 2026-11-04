---
"@radui/ui": patch
---

`Button asChild` with a link child (`<a href>`, or a component like `next/link` that renders one) now keeps the link's own semantics: no `role="button"`, no `type="button"`, and the native tab order. `asChild` children are classified after they mount, so the server HTML and hydration match (fixes a `tabIndex` hydration mismatch). Spans and custom elements still get `role="button"`, `tabIndex={0}` and Enter/Space activation.
