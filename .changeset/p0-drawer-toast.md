---
"@radui/ui": patch
---

fix: Drawer focus management and stable Toast manager functions

- **Drawer:** focus now moves into the drawer when it opens, and Tab stays trapped inside. The focus manager used to engage as soon as `data-state` flipped to `open`, but the themes keep the popup `visibility: hidden` until the entrance transition starts. Initial focus found nothing focusable and silently failed, so keyboard and screen-reader users were left on the page behind the modal. It now waits until the popup is actually visible (capped at about 0.5s).
- **Toast:** the functions from `useToastManager()` (`add`, `close`, `update`, `promise`, `dismiss`, `dismissAll` and the variant helpers) are stable for a given manager, as in Base UI. They used to be recreated on every render. An effect keyed on one of them, such as an unmount cleanup calling `dismissAll`, then re-ran on every render and dismissed each toast as soon as it was added.
