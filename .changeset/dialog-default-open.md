---
"@radui/ui": patch
---

Add `defaultOpen` to `Dialog.Root` and fix controlled/uncontrolled handling

`DialogPrimitive.Root` now accepts `defaultOpen` for uncontrolled usage and
switches from hand-rolled `useState` + `useEffect` syncing to the existing
`useControllableState` hook.

This also fixes controlled mode. Previously `open` was seeded into local state
and re-synced by an effect, so a controlled dialog still opened when the
trigger was clicked even though the parent held `open={false}` — the effect
only re-ran when `open` itself changed. With `useControllableState`, a defined
`open` is authoritative: the dialog reports the request through
`onOpenChange` and waits for the parent to update.

`AlertDialog` inherits the same fix. Its `onOpenChange` test asserted the old
behaviour (clicking the trigger opened a controlled dialog) and now asserts
correct controlled semantics: the request fires, the dialog stays closed
until the parent rerenders with `open={true}`.
