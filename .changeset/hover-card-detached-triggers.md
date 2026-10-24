---
"@radui/ui": minor
---

Add detached triggers to HoverCard: `HoverCard.createHandle()` connects any number of `HoverCard.Trigger`s, rendered anywhere, to one `HoverCard.Root`. Each trigger passes a `payload`, the Root's children can be a function of it, and the Root's `openDelay`/`closeDelay` still apply.
