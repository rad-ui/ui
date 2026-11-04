---
"@radui/ui": minor
---

DropdownMenu, ContextMenu and Menubar gain `CheckboxItem`, `RadioGroup`, `RadioItem`, `ItemIndicator`, `Group` and `GroupLabel`. Checkbox items toggle (`checked`, `defaultChecked`, `onCheckedChange`), radio items pick one value in their group (`value`, `defaultValue`, `onValueChange`), and both keep the menu open unless `closeOnClick` is set. They expose `menuitemcheckbox` and `menuitemradio` with `aria-checked`, `data-state` and `data-checked`, and a GroupLabel names its Group for screen readers.
