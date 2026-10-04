---
"@radui/ui": patch
---

Fix standalone Radio state handling: `defaultChecked` now sets the initial uncontrolled state (instead of being forwarded alongside `checked` and triggering React's controlled/uncontrolled warning), clicking a checked radio no longer unchecks it, uncontrolled radios sharing a `name` keep `data-state` in sync when a sibling is selected, and the native input is no longer removed from the tab order. Disabled radios now render their disabled styling (the Clarity selector expected `data-disabled="true"` while the component emits a presence attribute).
