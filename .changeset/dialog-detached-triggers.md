---
"@radui/ui": minor
---

Dialog and AlertDialog support detached triggers. Create a handle with `Dialog.createHandle()` and pass it to `Dialog.Root` and to any number of `Dialog.Trigger` elements rendered anywhere, each with a `payload`, for example one delete dialog for every row of a table. The Root's children can be a function of the payload, focus returns to the trigger that opened it, and `handle.open(payload)` and `handle.close()` work from code.
