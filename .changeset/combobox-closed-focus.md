---
"@radui/ui": patch
---

Combobox and Select: closed, force-mounted lists can no longer hold focus. A focus move queued while the list was opening could land in it after a quick Escape; focus now goes back to the trigger (or `finalFocus`).
