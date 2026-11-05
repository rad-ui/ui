# @radui/ui

## 1.2.1

### Patch Changes

- 2d81c52: Triggers rendered with `asChild` keep the child's own semantics. A link inside `Tooltip.Trigger`, `Popover.Trigger`, `Dialog.Trigger` or any other trigger used to get `role="button"` and `type="button"`, so screen readers announced it as a button. Now a link stays a link, a native button keeps its own `type`, and only other elements (a `span`, a `div`) get `role="button"`. `Button` already worked this way; every trigger now does too (#2332).
- 8859953: `Combobox`, `Checkbox`, `CheckboxGroup`, `RadioGroup`, `Switch` and `Field` no longer restore their default value when the owning form's `reset` event is cancelled with `preventDefault()`. They used to reset anyway, so a page that cancels resets lost the user's selection and submitted the default. The restore now runs after the event has finished dispatching, like a native control, so it also follows the browser's own reset of the form (#2344).
- cd01923: `children` is optional in the types of parts that work without it: `Checkbox.Root`, `Switch.Root`, `Progress.Root`, `Slider.Root`, `RadioGroup.Root` and `RadioGroup.Item`, and the triggers of `Dialog`, `AlertDialog`, `Tooltip`, `DropdownMenu`, `ContextMenu` and `Menubar`. A wrapper typed from `React.ComponentProps<typeof Checkbox.Root>` no longer forces every call site to pass children (#2334).
- b8cddb8: `RadioGroup` and `RadioCards` render their items directly inside the `radiogroup` element. They used to sit in an extra `<div role="group">`, so `display: grid` or `flex` with `gap` on the root didn't lay them out, and assistive tech met a `group` nested inside the `radiogroup`. The Clarity and Baremetal themes now lay out the root itself. If your own CSS targeted the inner wrapper (`.rad-ui-radio-group-root > [role="group"]`), move those rules to the root (#2336).
- 47693b3: `Select.Content`, `Combobox.Content` and `Autocomplete.Content` accept `side`, `align`, `sideOffset` and `alignOffset`, as `Popover.Content` and `Tooltip.Content` do. They used to work only on the Root; on Content they were silently passed to the DOM, and React warned about unknown props. Values on Content win over the Root's (#2335).

## 1.2.0

### Minor Changes

- 07e6783: Add `onOpenChange` to `Accordion.Item`: it's called with `true` or `false` whenever that item opens or closes, including when opening another item closes it in single mode.
- befc825: Dialog, AlertDialog, Popover, Tooltip, HoverCard, menus, Select, Combobox and NavigationMenu take `actionsRef` with `close()`. Field and Form take `actionsRef` with `validate()`. Field takes controlled `touched` and `dirty`, and `Field.Control` takes `onValueChange`.
- a265579: New state attributes: `ScrollArea.Root` and its scrollbars get `data-scrolling` while the viewport scrolls and `data-hovering` while the pointer is over the area, and the root gets `data-has-overflow-x` / `data-has-overflow-y`; `Slider.Root` gets `data-dragging` during a drag; `Avatar.Root` gets `data-loading` while the image loads and `data-error` if it fails.
- 07e6783: Add Autocomplete: a text input with suggestions. Unlike Combobox, the value is whatever the user types; typing opens a filtered list, ArrowDown and ArrowUp move through it while focus stays in the input, and Enter or a click fills in the suggestion. The Combobox primitive gains `inputValue`, `defaultInputValue` and `onInputValueChange` to control its search text.
- 07e6783: Add `delay` to `Avatar.Fallback`: it waits that many milliseconds before showing, so initials don't flash while a fast image loads. `delayMs` (the Radix name) works too.
- 07e6783: Add `onLoadingStatusChange` to `Avatar.Image`: it's called with `"loading"`, `"loaded"` or `"error"` as the image loads, fails or changes `src` (a missing `src` reports `"error"`).
- a265579: Every element with a `data-state` now also gets a boolean attribute for it: `data-open` / `data-closed`, `data-checked` / `data-unchecked` / `data-indeterminate`, `data-pressed` (toggles that are on), `data-complete`, `data-dragging` and `data-loading`. Style with `[data-open]` or Tailwind's `data-open:` variant as well as `[data-state="open"]`.
- 07e6783: Add `focusableWhenDisabled` to Button. A disabled button with it stays in the tab order and uses `aria-disabled` instead of native `disabled`, while clicks, Enter, Space and form submission stay blocked. Use it when a button disables itself during a pending request, so focus isn't lost, or when keyboard users need to reach a disabled button to learn why.

  In Clarity, only natively disabled buttons ignore the pointer, so a disabled button with `focusableWhenDisabled` can still show a Tooltip on hover explaining why. Hover colors no longer apply to disabled buttons.

- d83bc87: Add `highContrast` to `Button`: a solid button filled with the text colour and labelled in the background colour (near-black on light, near-white on dark), for a main call to action without an accent hue. Applies to the default and `solid` variants and sets `data-high-contrast`.
- 07e6783: CheckboxGroup supports a "select all" checkbox. Pass every item's value as `allValues` on the Root and add `parent` to a Trigger: it's checked when every item is, mixed (`aria-checked="mixed"`, `data-state="indeterminate"`, a dash icon) when some are, and toggling it checks or clears them all. It submits nothing of its own.
- 07e6783: Add `readOnly` to Checkbox, Switch and RadioGroup. A read-only control shows its state, stays focusable and in the form, but clicks and Space don't change it; it carries `aria-readonly` and `data-readonly`.
- 07e6783: Add `Combobox.Clear` and `Autocomplete.Clear`: a button that clears the selection or typed text and returns focus to the trigger or input. It hides while there's nothing to clear (or pass `forceMount`).
- 07e6783: Add `Combobox.Empty` and `Autocomplete.Empty`: a message such as "No results" shown when the typed text matches no option. It renders outside the listbox as a polite live region, so screen readers announce it.
- 07e6783: ContextMenu now opens on a 500ms touch long press, so it works on iOS Safari, which never fires `contextmenu`. Moving the finger more than 10px cancels the press so the page can still scroll, and the click that follows lifting the finger no longer closes the menu. The Clarity trigger also turns off the iOS touch callout.
- 07e6783: Dialog and AlertDialog support detached triggers. Create a handle with `Dialog.createHandle()` and pass it to `Dialog.Root` and to any number of `Dialog.Trigger` elements rendered anywhere, each with a `payload`, for example one delete dialog for every row of a table. The Root's children can be a function of the payload, focus returns to the trigger that opened it, and `handle.open(payload)` and `handle.close()` work from code.
- 07e6783: Add `modal` to Dialog (and AlertDialog) roots: `true` (default, unchanged) traps focus, locks page scroll and lets the overlay block the page; `"trap-focus"` traps focus but leaves the page scrollable and clickable; `false` leaves the page fully usable (no focus trap, no `aria-modal`). Explicit `trapFocus` / `aria-modal` on the content still win.
- 07e6783: Add DirectionProvider and `useDirection`. Wrap an RTL app once with `<DirectionProvider dir="rtl">` and every Rad UI component inside uses right-to-left keyboard navigation and positioning: Tabs, TabNav, ToggleGroup, Toolbar, RadioGroup, CheckboxGroup, Accordion, Menubar, menus, NavigationMenu, Splitter, Slider, Select and Combobox. A component's own `dir` prop still wins. Set `dir` on `<html>` as well so text and CSS follow.
- befc825: New `Drawer.Provider`, `Drawer.Indent` and `Drawer.IndentBackground`: the page eases back while any drawer is open.
- 07e6783: Add `openOnHover` to `DropdownMenu.Root`, with `hoverOpenDelay` (default 100ms) and `hoverCloseDelay` (default 0), for navigation-style menus. The pointer can move into the menu without it closing, and clicking still toggles it.
- 1898db0: Field's `validate` can return a promise for async checks, such as whether a username is taken. While it's pending, every part carries `data-validating` and `Field.Validity` reports `validating`; a slower, older check never overwrites a newer result. `validationDebounceTime` waits for typing to pause before validating in `onChange` mode.
- 07e6783: Checkbox, Switch, Select and NumberField work inside `Field.Root` without `Field.Control`: they take the field's id (so `Field.Label` names them), name, disabled and required state, and get `aria-describedby` from `Field.Description` and `Field.Error` plus `aria-invalid` when the field is invalid. A control's own props still win.
- a265579: Checkbox, Switch, Select and NumberField inside `Field.Root` now report focus, blur and edits to the field, so `data-focused`, `data-touched` and `data-dirty` follow them, and they carry the field's state attributes themselves. Fields also get `data-filled` while the control holds a value (non-empty text, a checked box, a picked option). Moving between a NumberField's input and its buttons doesn't count as leaving the field.
- 1898db0: Add Field: Root, Label, Control, Description and Error parts that link a label, help text and an error to any form control. Ids, `aria-describedby` and `aria-invalid` are wired automatically, Error renders only while the field is `invalid`, and every part carries `data-invalid`, `data-disabled`, `data-required`, `data-focused`, `data-touched` and `data-dirty`. Compose Rad UI's TextField or TextArea with `<Field.Control asChild>`.
- 1898db0: Field validates. It runs the browser's own checks (required, type, pattern, min/max) plus an optional `validate` function, and shows the result per `validationMode`: after a submit attempt (`onSubmit`, the default), on blur, or on change, then updates live as the user fixes it. `Field.Error` shows the validation message when it has no children, and `match` gives each problem its own message, for example `match="valueMissing"`. `Field.Validity` renders custom UI from the result. Parts carry `data-valid` and `data-invalid`, and `invalid` still forces the error state.

  Resetting the form hides shown errors and clears `data-touched` and `data-dirty`.

- befc825: Tooltip, HoverCard and Popover Content, menu Roots and the Select/Combobox/Autocomplete Root take `anchor` (an element, virtual element, ref or function to position against instead of the trigger), `positionMethod`, `collisionAvoidance` (flip, shift or none per axis), `sticky` and `disableAnchorTracking`.
- 07e6783: `Tooltip.Content` and `HoverCard.Content` take `side`, `align`, `sideOffset` and `alignOffset`, like `Popover.Content`, and expose the resolved `data-side` and `data-align`. HoverCard could only open below its trigger before. `Tooltip.Root`'s `placement` still works when `side` isn't set. A `style` prop on `HoverCard.Content` no longer replaces its positioning styles.
- befc825: Checkbox takes `indeterminate`, `uncheckedValue`, `form` and `inputRef`; Switch takes `uncheckedValue`, `form` and `inputRef`; RadioGroup takes `form` and `inputRef`. Form reset now also works with a `form` outside the tree. Slider takes `thumbCollisionBehavior` (`none`, `push`, `swap`), `format`/`locale`, `largeStep` and `form`; its thumbs take `getAriaLabel`, `getAriaValueText` and `inputRef`. NumberField takes `allowOutOfRange`, `snapOnStep`, `form` and `inputRef`.
- 1898db0: Add Form, a form that validates its Fields before submitting. A submit with invalid fields shows every error and focuses the first invalid field, and async checks are awaited before submitting; plain controls outside a Field still get the browser's checks; once valid, `onFormSubmit` receives the values as an object. Pass server errors as `errors`, keyed by field name: each shows on its Field and clears when the user edits it. `validationMode` sets the default for every Field inside.
- 07e6783: Add `hiddenUntilFound` to `Collapsible.Content` and `Accordion.Content`. Closed content stays in the page with `hidden="until-found"`, so the browser's find-in-page can search it, and a match opens the section. Useful for FAQs and docs where people search with Ctrl+F.
- 07e6783: Add detached triggers to HoverCard: `HoverCard.createHandle()` connects any number of `HoverCard.Trigger`s, rendered anywhere, to one `HoverCard.Root`. Each trigger passes a `payload`, the Root's children can be a function of it, and the Root's `openDelay`/`closeDelay` still apply.
- befc825: `HoverCard.Root`'s `onOpenChange` gets details (`reason`, `event`, `cancel()`) as a second argument, and triggers take `delay` and `closeDelay` that override the Root's. `Popover.Trigger` takes `openOnHover`, `delay` and `closeDelay`.
- ed15256: Add `forceMount` to `Checkbox.Indicator` and `RadioGroup.Indicator` (and the CheckboxGroup primitive content): the indicator stays rendered while unchecked, with `data-state="unchecked"`, so it can animate out or reserve space. The radio indicator now also carries `data-state`.
- befc825: Select, Combobox and Autocomplete take `filter` (or `null`), `limit`, `locale`, `readOnly`, `form`, `inputRef`, `autoComplete`, `finalFocus`, `highlightItemOnHover`, `onItemHighlighted` and `loop`. The default filter ignores case and accents; `Combobox.useFilter` and `Autocomplete.useFilter` give the matchers. New parts: `Select.Label`, `Combobox.Status` and `Autocomplete.Status` (announces the match count). Autocomplete takes `autoHighlight`, `openOnInputClick`, `submitOnItemClick` and `mode`.
- 6ce6f63: Add `Menu` (`@radui/ui/Menu`): the same component as `DropdownMenu` under the name most design systems use. Parts, props and theme styles are shared.
- a265579: Add `arrowPadding` to `DropdownMenu.Root`, `ContextMenu.Root` and `Menubar.Menu`: the minimum distance in px between the arrow and the menu's rounded corners (default 4).
- 07e6783: DropdownMenu, ContextMenu and Menubar gain `CheckboxItem`, `RadioGroup`, `RadioItem`, `ItemIndicator`, `Group` and `GroupLabel`. Checkbox items toggle (`checked`, `defaultChecked`, `onCheckedChange`), radio items pick one value in their group (`value`, `defaultValue`, `onValueChange`), and both keep the menu open unless `closeOnClick` is set. They expose `menuitemcheckbox` and `menuitemradio` with `aria-checked`, `data-state` and `data-checked`, and a GroupLabel names its Group for screen readers.
- 07e6783: DropdownMenu supports detached triggers: create a handle with `DropdownMenu.createHandle()` and share one menu between triggers rendered anywhere, each with a `payload`, for example a row-actions menu in a table. The menu anchors to the trigger that opened it, its children can be a function of the payload, ArrowDown on a trigger opens it, and clicking the open trigger closes it.
- befc825: Menus take `highlightItemOnHover`, `onItemHighlighted` and `closeParentOnEsc`, an `Arrow` part, and `finalFocus` on Content. Escape in a submenu now closes only that submenu and returns focus to its trigger item, as the WAI-ARIA menu pattern describes; set `closeParentOnEsc` for the old behaviour.
- 07e6783: Add `closeOnClick` to DropdownMenu, ContextMenu and Menubar items (default `true`). Set it to `false` to keep the menu open after an item is chosen, without calling `preventDefault()`.
- 07e6783: Add `modal` to DropdownMenu and ContextMenu roots. While a modal menu is open, an outside press only closes it, page scroll is locked and the rest of the page is hidden from assistive technology. Off by default, so existing menus are unchanged.
- 07e6783: Menus (`DropdownMenu`, `ContextMenu`, `Menubar` and the menu primitive) take `side`, `align`, `sideOffset` and `alignOffset` on Root, matching the other floating parts, and their content exposes `data-side` and `data-align`. `placement`, `mainAxisOffset` and `crossAxisOffset` keep working.
- 07e6783: Meter and Progress add `Label`, `Value` and `Track` parts plus `format` and `locale`. Label names the bar for screen readers, Value shows the formatted value (or a rounded percentage) as visible text, and Track holds the Indicator so Label and Value can sit next to the bar. `format` takes Intl.NumberFormat options and also sets `aria-valuetext`. Without a Track, the root is still the bar.
- befc825: NavigationMenu takes `delay`, `closeDelay`, `orientation` and `onOpenChangeComplete`; its Content plays enter and exit transitions and takes `forceMount`; a disabled Trigger doesn't open; `Link` takes `active` (`aria-current="page"`) and `closeOnClick`.
- ed15256: `NavigationMenu.Viewport` can anchor itself to the open item's trigger: pass `side`, `align`, `sideOffset`, `alignOffset`, `anchor`, `collisionAvoidance`, `collisionPadding`, `collisionBoundary`, `positionMethod`, `sticky` or `disableAnchorTracking` and it is positioned with collision handling, with `data-side` / `data-align` for styling. Without these props it stays laid out by CSS as before.
- 07e6783: Add `NavigationMenu.Viewport`: one shared container that every open panel renders into. It exposes the open panel's size as `--rad-navigation-menu-viewport-width` / `--rad-navigation-menu-viewport-height` so CSS can animate between panels, and keeps Tab order following the triggers.
- 07e6783: Nested dialogs can be styled as a stack. A Dialog or AlertDialog opened inside another dialog's content gets `data-nested`, and the parent's content gets `data-nested-dialog-open` plus a `--nested-dialogs` count while it's open, so CSS can scale or dim the dialog behind. Escape still closes only the top dialog.
- 07e6783: Add `format` and `locale` to NumberField. With `format` (Intl.NumberFormat options), the value shows as currency, a percent, a unit or with grouping; people can type formatted text such as "2,000" or "1.234,5", and it's reformatted when they leave the field. The value stays a plain number (25% is 0.25) and forms submit that number. The input keeps spinbutton semantics with `aria-valuetext`.
- 07e6783: Add `NumberField.ScrubArea`: drag over it (for example a short label) to change the value, like the inputs in design tools. Moving right or up increments by one `step` per `pixelSensitivity` pixels (default 2), Shift uses `largeStep`, `direction="vertical"` switches the axis, and min and max still apply. It carries `data-scrubbing` while dragging. In Clarity it becomes a leading column of the field.
- 07e6783: Add `smallStep` to NumberField: Alt/Option + ArrowUp/ArrowDown moves by it for fine adjustments (defaults to `step / 10`). Shift still uses `largeStep`.
- 07e6783: Add `onValueCommit` to NumberField: it's called with the settled value on blur or Enter after typing, when a held stepper button is released, and right away for keyboard steps, and only when the value actually changed. Use it to save or validate without reacting to every keystroke.
- 07e6783: Add `allowWheelScrub` to NumberField: while the input is focused, the mouse wheel steps the value (Shift uses `largeStep`) and the page doesn't scroll. Scrolling past an unfocused field never changes it.
- 07e6783: `onOpenChangeComplete` now also works on Tooltip, HoverCard, DropdownMenu, ContextMenu, Menubar menus, Select and Combobox roots.
- 07e6783: Add `onOpenChangeComplete` to Dialog, AlertDialog and Popover roots: it's called with `true` once the open animation finishes and with `false` once the close animation finishes and the content unmounts (immediately when nothing animates). Useful for moving focus, resetting forms or loading data after a transition.
- 07e6783: `onOpenChange` details also come from DropdownMenu, ContextMenu, Menubar menus, Select, Combobox and Tooltip, with an `item-press` reason when picking an item closes the popup. As with Dialog and Popover, only handlers that take a second argument receive them.
- 07e6783: Popover, Dialog and AlertDialog `onOpenChange` handlers that take a second argument receive details: the `reason` (`trigger-press`, `outside-press`, `escape-key`, `focus-out`, `close-press` and more), the DOM `event`, and `cancel()` to keep the current state, for example an "unsaved changes" guard. Handlers that take one argument are called exactly as before. This matches Drawer, which already worked this way.
- befc825: OTPField takes `mask`, `normalizeValue`, `onValueInvalid`, `inputMode`, `autoComplete` and `form`, and gains `OTPField.Separator`. A `required` OTPField now blocks form submission until every slot is filled.
- 07e6783: Add OTPField for one-time codes: a group of single-character inputs that fill left to right. Typing moves forward, Backspace moves back, arrows, Home and End move between slots, and pasting or SMS autofill (`autocomplete="one-time-code"`) spreads a full code across them. `validationType` limits characters (numeric by default), `type="password"` masks them, `onValueComplete` fires once every slot is filled, `autoSubmit` submits the form, and `name` submits the code through a hidden input.
- 07e6783: Popover supports detached triggers. Create a handle with `Popover.createHandle()` and pass it to `Popover.Root` and to triggers rendered anywhere, each with a `payload`. The popover anchors to whichever trigger opened it, its children can be a function of the payload, and clicking the open trigger again closes it.
- 07e6783: Add `initialFocus` and `finalFocus` to `Popover.Content`, matching Dialog: choose where focus goes when the popover opens (first tabbable element, stay on the trigger, or a ref) and where it returns when it closes (the trigger, nowhere, or a ref). Each also accepts a function.
- 07e6783: Add `openOnHover` to `Popover.Root`, with `hoverOpenDelay` (default 300ms) and `hoverCloseDelay` (default 0). The popover also opens while the pointer rests on the trigger, and the pointer can move into it without it closing. Clicking still toggles it, so touch and keyboard users aren't left out.
- 07e6783: `Popover.Root` `modal` now also accepts `"trap-focus"`: focus is trapped in the popover (and the page is hidden from assistive technology) while the rest of the page still takes pointer input. `modal={true}` and the default `false` are unchanged.
- ed15256: Add `triggerId` and `defaultTriggerId` to Dialog, AlertDialog, Popover, Tooltip, HoverCard and DropdownMenu roots used with a `handle`: the DOM `id` of the detached trigger the popup belongs to. While open, the popup is anchored to that trigger, shows its payload and marks it `aria-expanded`, also when opened from code with `open`. Closing through a controlled `open` now releases the trigger too.
- 46fd398: The default theme now follows the system's reduce-motion setting. Every `--rad-ui-motion-duration-*` token collapses to `--rad-ui-motion-duration-reduced`, so transitions and enter/exit animations finish at once (components still unmount on time), and the transition tokens keep colour changes but drop movement. A Skeleton stops pulsing, an indeterminate Progress keeps a slow pace, and Spinner keeps spinning.
- 07e6783: ScrollArea marks which edges have hidden content: the root and viewport get `data-overflow-y-start`, `data-overflow-y-end`, `data-overflow-x-start` and `data-overflow-x-end`, plus `--scroll-area-overflow-*` variables with the distance in pixels, updated as it scrolls. Use them for fade masks or edge shadows that appear only where there's more to scroll. `overflowEdgeThreshold` (one number or per edge) sets how many pixels of hidden content an edge needs before it's marked.
- 07e6783: Add `alignItemWithTrigger` to `Select.Root`: the list opens over the trigger with the selected option lined up on it, like a native select. It falls back to normal positioning when nothing is selected.
- 07e6783: Select and Combobox support `multiple`. With it, `value`, `defaultValue` and `onValueChange` use arrays, picking an option toggles it and keeps the list open, the listbox gets `aria-multiselectable`, the trigger lists the selected labels (or calls `renderValue` with the arrays), and a form submits every value under `name`. Combobox adds `Combobox.Chips`, which shows the selected values as removable chips, and Backspace in an empty search removes the last one.
- 07e6783: Select and Combobox add `GroupLabel` and `Separator`. Groups now have `role="group"` and are named by their GroupLabel, so screen readers announce "Fruit, group" before its options; Separator draws a divider that stays out of the accessibility tree.
- 07e6783: Add `items` to Select and Combobox roots: a record of labels by value (or `{ value, label }` pairs). The trigger then shows the selected label before the list has mounted, even when items are rendered inside your own components.
- 07e6783: Add `modal` to Select and Combobox roots: while the list is open, page scroll is locked and an outside press only closes the list instead of reaching the page. Off by default.
- 07e6783: Add `Select.ScrollUpArrow` and `Select.ScrollDownArrow`: they appear at the top and bottom edges of a long list while it can scroll that way, and resting the pointer on one scrolls the list. They're hidden from assistive technology.
- 07e6783: Add `Select.Value` and `Select.Icon`. Put `<Select.Value placeholder="…" />` inside `Select.Trigger` and the trigger keeps all its own children (icons, prefixes) instead of being replaced by the selected label; Value shows the label, the placeholder (with `data-placeholder`), or your render function's output. `Select.Icon` is a decorative chevron that replaces the built-in caret. Triggers without a Value part behave as before.

  `Combobox.Value` works the same way in `Combobox.Trigger`.

- 07e6783: Add `minStepsBetweenValues` to Slider: in a range slider, neighbouring thumbs stay at least that many steps apart when dragged or moved with the keyboard.
- 07e6783: Add `thumbAlignment` to Slider: `"edge"` keeps the whole thumb inside the track at the minimum and maximum (the fill, marks and pointer follow). The default `"center"` is unchanged. The Clarity thumb size is now the `--rad-slider-thumb-size` variable.
- 07e6783: Add `Slider.Value`, an `<output>` that shows the current value formatted with the root's `formatValue`. A range slider shows both values, and a render function can customize the text.
- 07e6783: Add `@radui/ui/Slot` for building your own components on Rad UI: `Slot` merges its props and ref onto its child (the same behavior as `asChild`), `mergeProps` merges props objects (classes joined, styles merged, handlers chained) and `composeRefs` combines refs.
- f045e5b: Table: redesigned default styling and new layout props. The Clarity recipe now uses neutral surface, border and text aliases (a framed panel, a header band with a bottom border, row dividers, hover highlight, tabular figures) instead of the accent scale, so it renders fully whatever the Theme accent is. New props: `align` (`start` | `center` | `end`) on `Table.Cell` and `Table.ColumnCellHeader`, and `size` (`small` | `medium` | `large`) and `variant` (`surface` | `ghost`) on `Table.Root`.
- 07e6783: Add `Tabs.Indicator`, a marker for the active tab rendered inside `Tabs.List`. It exposes `--active-tab-left`, `--active-tab-top`, `--active-tab-right`, `--active-tab-bottom`, `--active-tab-width` and `--active-tab-height` relative to the list, plus `data-activation-direction` (`left`, `right`, `up`, `down`), so CSS can slide it between tabs. The Clarity theme animates it and respects `prefers-reduced-motion`.
- 07e6783: Add `onValueChange(value, event)` to TextField, `TextField.Input` and TextArea: it's called with the new text after `onChange`, so you don't need `event.target.value`. Clearing with `TextField.Reset` reports `''`.
- d706421: Anchored toasts: pass `anchor` (an element, virtual element, ref or function) to `toast()` to show it beside that element instead of in the stack, e.g. "Copied" next to a copy button. `side`, `align`, `sideOffset` and `alignOffset` place it (default: 8px above, centered) with collision handling. It announces like other toasts, closes on its timer (paused while hovered or focused), on Escape and with `close(id)`, and doesn't take a place in the stack. `Toaster` renders them; with your own `Toast.Provider`, render `<Toast.AnchoredToasts />` once.
- a265579: Toasts can be swiped left and right as well as up and down. Set `swipeDirection` on a toast (one direction or a list) to choose its dismiss directions; it overrides the provider's `swipeDirections`. A toast swiped sideways slides out to that side, and the toast element gets `data-swipe-direction` (its allowed directions) and `data-swipe-out` (the direction it was dismissed in).
- 18cb779: Add `variant` and `size` to `ToggleGroup.Root` (as `data-variant` / `data-size`). The default theme adds `variant="soft"`, a padded track with the pressed item as a raised pill and no dividers (a view switcher), and `size="small"` for dense toolbars. The current look stays the default.
- befc825: `Toolbar.Button` and `Toolbar.Input` take `focusableWhenDisabled`, which keeps a disabled item in the arrow-key order.
- 07e6783: Add `Toolbar.Group`: a named group of related toolbar items. Arrow keys still move across groups, and `disabled` turns off every button, link and toggle item inside it.
- 07e6783: Add `Toolbar.Input`, a text field that's one stop in the toolbar's arrow-key navigation. ArrowLeft and ArrowRight move the caret and leave the field only once the caret is at its start or end, and Home and End stay in the field. Roving focus now keeps a text field's own role and type instead of stamping button semantics on it.
- 07e6783: Tooltip supports detached triggers: create a handle with `Tooltip.createHandle()` and share one `Tooltip.Root` between many `Tooltip.Trigger` elements, each with a `payload` and an optional hover `delay`, for example every cell of a table. The tooltip anchors to the hovered or focused trigger, which gets `aria-describedby`, and closes on pointer leave, blur or Escape.
- befc825: `Tooltip.Root` takes `disabled` and `disableHoverablePopup`. `Tooltip.Trigger` takes `closeOnClick` (default true: clicking the trigger closes the tooltip), and a disabled trigger no longer opens it.
- 07e6783: Add `Tooltip.Provider` to share hover delays between tooltips. Once one tooltip in the group has opened, moving to another within `timeout` opens it instantly, and its content carries `data-instant` so CSS can skip the entry animation. `Tooltip.Root` `openDelay` and `closeDelay` still override the provider.
- 07e6783: Add `trackCursorAxis` to `Tooltip.Root` (`'none' | 'x' | 'y' | 'both'`): the tooltip follows the pointer along that axis while it's over the trigger, for charts and long rows. A tracking tooltip closes as soon as the pointer leaves the trigger.
- 07e6783: DropdownMenu, ContextMenu, Menubar, HoverCard, Select and Combobox content also get `data-starting-style` and `data-ending-style`, and stay mounted (inside their Portal too) until the exit animation finishes.
- 07e6783: Popover, Tooltip, Dialog and AlertDialog content (and the Dialog overlay) support CSS transitions on enter and exit. Opening renders one frame with `data-starting-style` and closing sets `data-ending-style`, and the element stays mounted until its animations and transitions finish, so a plain `transition` on opacity or transform animates both ways. With no exit animation it unmounts at once, as before. Closed content still on screen can't be clicked or focused.
- befc825: `Tree.Root` takes `expanded`, `defaultExpanded`, `onExpandedChange` and `dir`. In right-to-left layouts ArrowLeft expands and ArrowRight collapses.

### Patch Changes

- 589f4ba: `Button asChild` with a link child (`<a href>`, or a component like `next/link` that renders one) now keeps the link's own semantics: no `role="button"`, no `type="button"`, and the native tab order. `asChild` children are classified after they mount, so the server HTML and hydration match (fixes a `tabIndex` hydration mismatch). Spans and custom elements still get `role="button"`, `tabIndex={0}` and Enter/Space activation.
- 589f4ba: `Button asChild` with a non-button child (span, div, custom element) now activates on Space the way a native button does: once, when Space is released, and not if focus moves away first. Holding Space no longer fires a click on every key repeat (#2289). Enter still activates on keydown.
- 589f4ba: Checkbox and CheckboxGroup items no longer toggle on Enter; Space toggles them, as the WAI-ARIA checkbox pattern and native checkboxes do. Roving-focus items (CheckboxGroup, and other groups built on them) now run a consumer's `onKeyDown` and `onFocus` alongside their own instead of replacing them, so passing `onKeyDown` to `CheckboxGroup.Trigger` no longer breaks arrow-key navigation.
- 6d12c79: `Checkbox.Indicator`: children now replace the default check/dash icon instead of being added next to it, `className` goes on the indicator element instead of the icon, and the default icon is sized in `em` (the theme sizes it to the box) instead of a fixed 15px that overflowed small checkboxes.
- a265579: Combobox and Select: closed, force-mounted lists can no longer hold focus. A focus move queued while the list was opening could land in it after a quick Escape; focus now goes back to the trigger (or `finalFocus`).
- 589f4ba: Combobox and Select return focus to the trigger as soon as Escape closes the list, instead of after the focus manager's queued return, so focus is never left on force-mounted content in between (#2274).
- 2091f61: Internal: one implementation for merging event handlers. `mergeProps` (used by `asChild`) now goes through `composeEventHandlers`, which forwards every argument; behaviour is unchanged (consumer handler first, ours skipped after `preventDefault()`).
- ed15256: Popover and Dialog (and AlertDialog) now call `onOpenChange(true, { reason: "trigger-press" })` when a detached trigger opens them, so they can be controlled with a handle; canceling it keeps them closed. A `defaultOpen` popup with a handle no longer closes itself on mount.
- 589f4ba: Dialog, AlertDialog and Popover now play their closing transition: content and overlay stay mounted with `data-state="closed"` until the exit transition or animation finishes, then unmount (straight away with reduced motion or no animation). Focus still returns at the moment of closing.
- 589f4ba: `Dialog.Content` with `initialFocus` set to a ref or a function now focuses that element with `preventScroll`, so a tall, scrolling dialog opens at its top instead of jumping to the element (#2278). A function is now called once the dialog has opened, so it can look up elements inside the content.
- 589f4ba: Dialog and AlertDialog content in the default theme: centred on phones (the mobile margin no longer pushes it off the right edge, #2277); padded at the bottom when there's no Footer, and tall content scrolls inside the viewport instead of being clipped (#2285). The content box is now `box-sizing: border-box`, so its padding counts inside the width: desktop dialogs are a little narrower than before and exactly `--rad-ui-overlay-width-lg` wide.
- ed15256: Clicking a `Field.Label` whose control is a popup trigger (Select, Combobox) now focuses the trigger instead of opening the popup, like the label of a native `<select>`. Labels of checkboxes and switches still toggle them.
- 8356a3c: The default theme now works in forced-colours mode (Windows High Contrast). Keyboard focus shows a system-colour outline (the theme's box-shadow rings are dropped in that mode), and parts that show state only with a fill (the Switch thumb and checked track, the Radio dot, the Slider range and thumb, Progress, the Tabs indicator, pressed toggles, the highlighted menu or list item) keep it in system colours.
- 07e6783: `CheckboxGroup` and `RadioGroup` always render their group wrapper. With a single item wrapped in its `Label`, the group's `role` and `id` used to merge onto that `<label>`, so the checkbox or radio lost its accessible name.
- f6efccd: `HoverCard.Trigger asChild` no longer puts the theme's link look (underline, text colour, font size) on your element: a Button inside it keeps the Button's styles. The link look stays on the trigger's default `<span>`.
- 9662984: Long lists stay fast while you move through them. In Select, Combobox, Autocomplete, DropdownMenu, ContextMenu and Menubar, moving the highlight used to re-render every item on each arrow key (300 options in a 300-item Select, twice that in a Combobox with search); now only the item losing the highlight and the one gaining it re-render.
- ed15256: A Dialog or AlertDialog opened inside another no longer darkens the page a second time: its overlay gets `data-nested` and the themes keep it transparent. It still catches outside clicks.
- f427af1: `Combobox.Root`'s `onClickOutside` was accepted but never called; it now fires when a press outside closes the list. On Combobox and Dialog it is deprecated in favour of `onOpenChange`, whose `details.reason` is `"outside-press"` in that case.
- 589f4ba: Progress fills its container in the default theme. The hidden ~400px max width is gone (#2273); set `--rad-ui-progress-max-width`, or a width on `Progress.Root`, for a narrower bar.
- 07e6783: Fix Slider in right-to-left layouts: the thumb, filled range, marks and pointer position now all mirror together. Before, the range filled from the right while the thumb stayed positioned from the left.
- cc18a8a: Fix modals used from inside a `Drawer`. A `Dialog` or `AlertDialog` opened from a drawer now stacks on top of it: screen readers can read it, clicks in it no longer close the drawer, Escape closes only the top one, and focus returns into the drawer. A portalled `Select` (or menu) inside a drawer can be picked with the mouse again; the drawer no longer treats a press on it as the start of a swipe.
- 54406ef: Tabs: inactive `Tabs.Trigger` no longer shows the browser's default grey button background and border when the app has no CSS reset; the theme resets the native button look.
- 0c86596: `TextArea` respects `rows`: the theme's default minimum height (7.5rem, 6rem small, 9rem large) now only applies when `rows` isn't set, so short text areas no longer need a CSS override.
- fa9449c: The theme's fallback focus ring for plain buttons, links and inputs inside a `Theme` now sits in the `base` cascade layer, so app focus styles (Tailwind `focus-visible:` utilities, or any unlayered CSS) override it. It is also drawn outside the element, so content that fills a button (an image, a canvas) no longer hides it. Rad UI components keep their own focus rings.
- 07e6783: `Theme` no longer crashes where `window.matchMedia` is missing (some test runners and embedded webviews), only reads the system colour scheme when `appearance="system"`, and follows system changes on browsers that only support the older `addListener` API.
- 589f4ba: Toast: the `hotkey` prop now works. Alt+T (Option+T) moves focus to the toasts by default, so keyboard users can reach their actions before they time out; an empty array turns it off, and the viewport exposes it as `aria-keyshortcuts`. Escape dismisses the focused toast and keeps focus in the viewport, and Escape on the viewport returns focus to where the hotkey was pressed.
- befc825: `ToggleGroup.Root` takes `multiple` as a shorthand for `type="multiple"`.
- 6ce6f63: Tooltip and HoverCard fade out when they close instead of disappearing at once (HoverCard also fades in). Moving between tooltips in a shared group still swaps them instantly, and reduced motion turns the animations off.

## 1.1.4

### Patch Changes

- 747344d: Preserve Button styles when used as a DropdownMenu trigger.
- 10dfd50: Theme: the accent scale (`--rad-ui-color-accent-*`) now defaults to gray on the Theme container when no `accentColor` is set. Previously every accent-based border and fill (Table frames, Button fills, focus rings) silently disappeared unless an accent colour was passed. An explicit `accentColor` or a component `color` still wins.
- 5d3475a: Forward TextArea shorthand refs to the native textarea.

## 1.1.3

### Patch Changes

- 7e532c2: Fix published component declarations that referenced internal aliases.
- 519eaa2: Keep Tailwind `black` and `white` utilities literal across appearances.

## 1.1.2

### Patch Changes

- d495e2a: docs: add component-specific changelog pages
- f70cd18: Fix Dialog.Close and AlertDialog.Cancel types so they accept standard button props.
- c0b83c0: Add stable NumberField part attributes and invalid state propagation.
- d318b3a: docs(tab-nav): add keyboard and ARIA reference tables

## 1.1.1

### Patch Changes

- d0b3237: Document Separator keyboard and ARIA accessibility references.

## 1.1.0

### Minor Changes

- d955028: feat(badge): soft label style by default

  Badges get a new look:

  - **Default variant is now `soft`** (was `solid`): a translucent tint of the badge's color with vivid text. Pass `variant="solid"` to keep the previous default.
  - **Small rounded corners** (`--rad-ui-control-radius-sm`) instead of a pill, and the **mono font** at weight 600, for every variant.
  - **Without `color`**, the soft badge uses the neutral gray scale.

  Every color scale clears WCAG AA (4.5:1 or better) in both light and dark. A new theme variable, `--rad-ui-badge-soft-text-weight`, tunes the soft text mix per appearance.

- dc6aaa7: feat(build): publish per-component Clarity style sources

  Each component's Clarity styles now ship in the package and can be imported from `@radui/ui/styles/clarity/<Component>/<file>.clarity.scss`. For example, `@radui/ui/styles/clarity/Button/button.clarity.scss`.

  - The folder structure matches the source, so relative `@use` imports between components still resolve when you compile a single file with Sass.
  - `@radui/ui/themes/default.css` is unchanged and remains the recommended way to load the full Clarity theme.
  - The docs site uses these files to show the exact styles that ship in each released version.

- 0bcb1ef: feat(theme): default `Theme` appearance to dark

  `<Theme>` now renders `data-rad-ui-theme="dark"` when no `appearance` is passed. Previously it defaulted to `'system'` and followed the OS color scheme.

  To keep the old behavior, pass it explicitly:

  ```tsx
  <Theme appearance="system">...</Theme>
  ```

  `appearance="light"` and `appearance="dark"` are unchanged.

- 944003e: feat(meter): add headless Meter primitive
- 3aabdde: feat(label): add Label component

  `@radui/ui/Label` renders a native `<label>` that names a form control (`htmlFor`, or by wrapping it).

  - Matches Radix Label: double-clicking the label doesn't select its text, while controls nested inside it still get their own clicks.
  - Supports `asChild`, `customRootClass` and ref forwarding.
  - Clarity and baremetal styles included.

- 8d5c556: feat: right-to-left support for menus, Select, Combobox, NavigationMenu, TabNav and ScrollArea

  - **DropdownMenu, ContextMenu:** new `dir` prop. In RTL, ArrowLeft/ArrowRight open and close submenus, submenus open on the left, and the portaled content (and submenus) carries `dir`. `rtl` is deprecated in favor of `dir="rtl"`.
  - **NavigationMenu, TabNav:** new `dir` prop; arrow keys follow reading direction.
  - **Select, Combobox:** `dir` on the root now also applies to the portaled listbox.
  - **ScrollArea:** horizontal scroll math and scrollbar placement use the computed direction (logical CSS insets, RTL scroll range).

### Patch Changes

- 9ff88bf: fix(a11y): Command separators and RadioGroup arrow keys

  - **Command:** `Command.Separator` is now hidden from assistive technology (`aria-hidden`, no `role="separator"`). A separator isn't an allowed child of the `listbox` it renders inside, so axe reported a critical `aria-required-children` violation.
  - **RadioGroup / RadioCards:** all four arrow keys move between options, whatever the `orientation`, as the WAI-ARIA radio pattern specifies. Radix and Base UI do the same. `orientation` still sets `aria-orientation`.

- 76087cc: standardize asChild support across remaining compound card, steps, avatar group, scroll area, and table parts
- 0221f95: standardize overlay portal `container` and `forceMount` APIs across menu, combobox, and hover card primitives
- 0af1268: fix: Drawer focus management and stable Toast manager functions

  - **Drawer:** focus now moves into the drawer when it opens, and Tab stays trapped inside. The focus manager used to engage as soon as `data-state` flipped to `open`, but the themes keep the popup `visibility: hidden` until the entrance transition starts. Initial focus found nothing focusable and silently failed, so keyboard and screen-reader users were left on the page behind the modal. It now waits until the popup is actually visible (capped at about 0.5s).
  - **Toast:** the functions from `useToastManager()` (`add`, `close`, `update`, `promise`, `dismiss`, `dismissAll` and the variant helpers) are stable for a given manager, as in Base UI. They used to be recreated on every render. An effect keyed on one of them, such as an unmount cleanup calling `dismissAll`, then re-ran on every render and dismissed each toast as soon as it was added.

- 6ae9df7: fix(tooltip): keep the Clarity tooltip dark in dark mode

  The Clarity tooltip used `--rad-ui-surface-inverse`, which flips to near-white
  under `data-rad-ui-theme="dark"`, so tooltips rendered as a light box on dark
  pages. Tooltip content and arrow now read new `--rad-ui-tooltip-background`,
  `--rad-ui-tooltip-text`, and `--rad-ui-tooltip-border` aliases: inverse in light
  mode (unchanged), and a raised dark surface with a soft border in dark mode.
  Override those aliases on a Theme container to customise tooltip colors.

- 5a38eef: docs(guides): add a troubleshooting guide for SSR, portals, and focus

  New `docs/app/docs/guides/troubleshooting` page covering the integration
  failures that are otherwise spread across guides, organised as
  symptom / likely causes / what to try:

  - hydration mismatches on overlay and theme components
  - portal containers rendering in the wrong place or missing theme tokens
  - focus not restoring after a dialog, popover, or menu closes
  - focus traps that are too narrow or too wide
  - overlays flashing or never opening on first paint
  - scroll lock leaking after an overlay unmounts

  Registered in `docsNavigationSections` and cross-linked from the existing
  SSR & No-JS Fallback guide.

## 1.0.1

### Patch Changes

- 0257be0: Emit CommonJS component bundles and root index files so every `package.json` export target exists in the published package.

## 1.0.0

### Major Changes

- 56ab619: Tailwind CSS v4 support. Tailwind v3 is no longer supported.

  The Tailwind preset is now a CSS file instead of a JavaScript config object.
  Import it after Tailwind itself:

  ```css
  @import "tailwindcss";
  @import "@radui/ui/themes/tailwind-presets/default.css";
  ```

  Breaking changes:

  - The `@radui/ui/themes/tailwind-presets/default.js` export has been removed.
    Upgrade Tailwind to v4 before upgrading Rad UI.
  - The preset covers colours only, as before. Spacing, radius, shadow, blur and
    typography keep Tailwind's own defaults.
  - The colour ramp no longer contains `<alpha-value>`. Opacity modifiers keep
    working (`bg-gray-500/90`), so nothing needs replacing.
  - Tailwind v4 dropped its default border colour, so bare `border` now inherits
    `currentColor` instead of `gray-200`. To restore the old default, add this to
    your base layer:

    ```css
    @layer base {
      *,
      ::after,
      ::before,
      ::backdrop,
      ::file-selector-button {
        border-color: oklch(from var(--rad-ui-color-gray-200) l c h);
      }
    }
    ```

  - `var(--color-gray-500)` no longer resolves. Read `var(--rad-ui-color-gray-500)`
    instead, which is what v3 emitted anyway.

  Applying v4's utility renames to your own markup: `shadow-sm` → `shadow-xs`,
  `shadow` → `shadow-sm`, `blur-sm` → `blur-xs`, `blur` → `blur-sm`,
  `backdrop-blur-sm` → `backdrop-blur-xs`, `backdrop-blur` → `backdrop-blur-sm`,
  `outline-none` → `outline-hidden`, `bg-gradient-to-*` → `bg-linear-to-*`, and
  bare `ring` → `ring-3`. Running `npx @tailwindcss/upgrade` handles most of this
  automatically.

### Minor Changes

- 3fec6d3: Add a LiveRegion primitive for accessible status announcements.
- 02254e0: table resizable columns
- 56ab619: Release `TextField` and add theme styles for `Fieldset`.

  - `TextField` is now published. Previously it shipped with styles and tests but
    was missing from the export list, so `@radui/ui/TextField` did not resolve.
  - `Fieldset` now renders with Rad UI styling in both themes instead of the
    browser default, and its `invalid` and `disabled` props have a visual effect.

- 63d644a: Support React 19 in `asChild` components and enable Tailwind alpha modifiers on design tokens.

  **React 19 `asChild` refs** — components that read a ref off the child element (`Primitive`, `PopoverPrimitiveArrow`, `TooltipTrigger`, `AccordionHeader`) accessed `element.ref` directly. React 19 promoted `ref` to a regular prop and left `element.ref` as a deprecation getter, so every `asChild` render logged "Accessing element.ref was removed in React 19" and consumers on React 19 saw warnings from components they never opted into. These now read the ref through a shared `getElementRef` helper that branches on the React major version, because both access paths warn: React 18 warns on `props.ref`, React 19 warns on `element.ref`. Behaviour is unchanged on both versions.

  **React 19 peer range** — the `react` and `react-dom` peer dependencies widened from `^18.2.0` to `^18.2.0 || ^19.0.0`. Without this, an application on React 19 could fail installation while this release claims to support it.

  **React 19 ref teardown** — React 19 lets a callback ref return a teardown function, which React then calls _instead of_ passing `null`. `composeRefs` fanned the node out to every ref but discarded those return values, so a composed ref silently swallowed every teardown an inner ref had registered. It now retains them per ref and replays them on detach, falling back to the old `null` contract for refs that register no teardown. React 18 has no way to run a teardown, so its behaviour is untouched.

  **Tailwind alpha modifiers** — the generated Tailwind preset emitted `var(--rad-ui-color-*)` for every ramp step, so Tailwind's `<alpha-value>` placeholder could never be substituted and opacity modifiers such as `bg-gray-50/90` silently produced no color. The preset now emits `oklch(from var(--rad-ui-color-*) l c h / <alpha-value>)`, which enables the full `/<opacity>` syntax across every palette and step. This changes the CSS your build emits for preset-derived color utilities, and it relies on relative color syntax (Chrome 119+, Safari 16.4+, Firefox 128+). That is inside this project's stated support policy of the latest two stable versions of each evergreen browser, but it does raise the effective floor for apps pinning older browsers, so it is released as a `minor` rather than a `patch`.

  **Token adjustment** — `--rad-ui-text-muted` in the Clarity design system now resolves to `--rad-ui-color-gray-950` instead of `--rad-ui-color-gray-800`, bringing muted text closer to the secondary text ramp for legibility.

### Patch Changes

- 68d9ea9: Expose stable Accordion anatomy data slots for root, item, header, trigger, content, and content inner parts.
- 2fc2c28: Add a composable Breadcrumb component with accessible navigation semantics.
- 1cb98d6: Add Button and Link keyboard interaction and ARIA reference docs.
- 1899f88: Add Checkbox keyboard interaction and ARIA reference tables to the docs.
- d8d348c: Document CheckboxCards keyboard interactions and ARIA references.
- 0e2c3a8: fix(checkbox): expose protected anatomy and state data attributes
- 55ee49a: Accessibility and Clarity cleanup across core controls: fix menu/navigation semantics and dismissal, form prop/state routing for Checkbox, Radio, TextArea, Fieldset, Text, and Slider, Avatar/Skeleton sizing, and contrast/alignment issues in the Clarity theme.
- 1ea8953: Document CheckboxGroup keyboard interactions and ARIA references.
- 5ff13c7: Expose stable `data-slot` anatomy markers on CheckboxGroup parts.
- ae43686: Add an automated Clarity design-system audit gate and close the first tranche of
  findings it surfaced.

  The gate (`npm run check:clarity`, wired into CI) fails on raw colors, token
  fallbacks, hand-coded shadows, `filter: drop-shadow`, and literal duration,
  spacing, radius, typography, and sizing values. It carries a per-rule budget
  that acts as a ratchet: CI fails only when a rule goes above its recorded count,
  and that count drops as findings are fixed. Rules added later start at zero.

  All color, shadow, and motion findings are now zero. Popover's navy shadow and
  Toast's hand-picked status hexes were replaced with tokens, which fixes their
  dark-mode rendering; the Radio family shared one control shadow; AvatarGroup
  referenced an undefined `--rad-ui-text`. Two dense type sizes that had no token
  (`0.8125rem` and `0.9375rem`, previously literals in 13 components) are now
  generated scale steps behind `dense` and `comfortable` aliases.

  No rendered value changes: each swap was verified against compiled CSS.

- 10dbaf0: Document Collapsible keyboard interactions and ARIA references.
- 3406f13: fix(collapsible): publish measured content dimensions when forceMounted

  With `forceMount`, `CollapsiblePrimitive.Content` is already present, so in the
  zero-duration branch both `setHeight(undefined)` and `setIsPresent(true)` bail
  out as no-ops and no re-render is scheduled. The measurement from that pass
  lives only in refs, so the measured size never reached the CSS variables and
  `--radix-collapsible-content-height` / `--rad-collapsible-content-height` were
  left at their initial `0`.

  That matters most under `prefers-reduced-motion`, where the resolved transition
  duration is `0` — so the affected path is the default for those users:

  ```tsx
  <CollapsiblePrimitive.Root defaultOpen>
    <CollapsiblePrimitive.Content forceMount>…</CollapsiblePrimitive.Content>
  </CollapsiblePrimitive.Root>
  ```

  Before, the content height variable read `0px`; it now reads the measured
  height.

- 1853344: Add Combobox large-list documentation with an incremental loading example.
- b45059a: Document Command keyboard interactions and ARIA references.
- 90f0db6: docs(contributing): add component docs templates for Accessibility and Features sections

  Adds two contributor guides alongside the existing `component-docs-anatomy` and
  `component-docs-styling` templates:

  - `component-docs-accessibility` — keyboard table format, ARIA/role and state
    attribute requirements, and a checklist that ties each section back to the
    keyboard interaction spec and screen reader testing guide.
  - `component-docs-features` — the short scannable Features bullet list, with
    rules for deriving bullets from the shipped public API.

  Both are also registered in `docsNavigationSections`, titled
  `Component Docs: Accessibility` and `Component Docs: Features` to match the
  existing `Component Docs: Anatomy` / `Component Docs: Styling` entries.

- 4e3b3fe: Document CSS variable fallback and partial token override expectations for Rad UI styled layers.
- 05c0ccb: Add `defaultOpen` to `Dialog.Root` and fix controlled/uncontrolled handling

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

- 55d0806: fix(dialog): merge consumer props through getItemProps on Action and Cancel

  `DialogPrimitiveAction` and `DialogPrimitiveCancel` spread consumer props
  _after_ the props returned by `getItemProps`, so a consumer handler replaced
  the library's own handler instead of running alongside it.

  On `Action`, passing an `onClick` silently suppressed the close: the internal
  `handleOpenChange(false)` was overwritten, so the dialog stayed open.

  Both parts now pass consumer props into `getItemProps` and compose `onClick`
  explicitly, so the consumer handler runs first and the dialog still closes:

  ```tsx
  {...getItemProps({
      ...props,
      onClick: (e) => {
          onClick?.(e);
          handleOpenChange(false);
      }
  })}
  ```

  `DialogPrimitiveContextType` also widens `getItemProps`, `getReferenceProps`
  and `getFloatingProps` to accept optional user props, and the default context
  value returns those props unchanged instead of `{}`.

- ebcab1f: Expose Dialog trigger `data-state`, `data-disabled`, and `aria-expanded` attributes from the primitive.
- 79e711d: Add Disclosure keyboard interaction and ARIA reference documentation.
- 51a45ac: Expose stable Disclosure anatomy data slots and initialize `defaultOpen`.
- 87604b7: Document Drawer keyboard interactions and ARIA references.
- 7d338d9: docs(drawer): add the component documentation page and align the internal context type
- 1ec9c6d: fix(drawer): resolve peekStyle temporal dead zone in DrawerContent

  `DrawerContent` referenced `peekStyle` inside the `getFloatingProps` call
  before the variable was declared further down the component body. The
  `const` declarations sat below an early `return`, so the reference landed in
  the temporal dead zone. The file failed to type-check, which broke four
  Drawer test suites at compile time.

  Hoisting the `peekOffset`/`peekStyle` pair above the `getFloatingProps` call
  fixes the ordering. `getFloatingProps` is also cast to its user-props
  signature, matching the convention already used by Dialog, Combobox and Menu.

- 54b05e7: Add a Fieldset component with native legend semantics, grouped form-control slots, accessibility docs, and state data attributes.
- f2c6bfb: Document HoverCard keyboard interactions and ARIA references.
- 4095f30: Expose stable `data-slot` anatomy markers on HoverCard root, trigger, content, and arrow parts.
- 285c5c8: Document Live Region keyboard behavior and ARIA references.
- 0f04b58: docs(a11y): add ARIA references for select, combobox, and dropdown menu
- 465e6d1: Document NumberField keyboard interactions and ARIA spinbutton references.
- 66a89d5: Expose Popover anatomy data slots for root, anchor, trigger, content, close, and arrow parts.
- db4c358: Collapsible primitives respect `prefers-reduced-motion`

  Adds a `usePrefersReducedMotion` hook and uses it to resolve the Collapsible
  height transition.

  `transitionDuration` was previously defaulted to `300` in
  `CollapsiblePrimitive.Root`, which meant the content type could not tell
  "the consumer asked for 300ms" apart from "nobody asked for anything". The
  default is removed and the value is resolved in `CollapsiblePrimitiveContent`:

  ```ts
  const resolvedTransitionDuration =
    transitionDuration !== undefined
      ? transitionDuration
      : prefersReducedMotion
      ? 0
      : DEFAULT_TRANSITION_DURATION;
  ```

  So an unset `transitionDuration` now collapses the animation entirely when
  `prefers-reduced-motion: reduce` is set, rather than still animating for
  300ms. An explicit `transitionDuration` always wins, which is the escape
  hatch for anyone who needs to keep animating.

  The hook is SSR-safe: it returns `false` until mounted, then follows the
  media query, and supports both `addEventListener` and the legacy
  `addListener` APIs.

  Note that `transitionDuration` on `CollapsiblePrimitiveRootProps` is
  unchanged for consumers — it was already optional at the prop level; only the
  internal default is gone.

- f83f617: Document Progress keyboard behavior and ARIA references.
- 16ed885: Render indeterminate Progress without determinate ARIA value attributes.
- 09da0e2: Keep Progress.Indicator out of the accessibility tree as a second progressbar while preserving its styling data attributes.
- 669e5d8: Document Radio keyboard interaction and ARIA reference tables.
- 06d4f89: Expose stable Radio state and anatomy data attributes.
- 903a35d: Expose stable RadioGroup anatomy markers through `data-slot` attributes on root, label, item, and indicator parts.
- e0a9b2d: Document Slider and RadioCards keyboard interactions and ARIA references.
- e6dde24: Add ScrollArea keyboard interaction and ARIA reference tables to the docs.
- 0ccabb4: fix(scrollarea): hide the scrollbar while a document overlay is open

  An overlay (Dialog, Menu, Popover, Combobox, Drawer) covers the page and locks
  body scroll, but a `ScrollArea` with `type="always"` still painted its scrollbar
  and thumb on top of it.

  Adds a document-level overlay registry and suppresses the scrollbar and thumb
  while any overlay is open:

  ```ts
  const isVisible =
    !overlaySuppressesScrollbar &&
    (type === "always" ||
      (type === "auto" && isOverflowing) ||
      (isOverflowing &&
        (type === "scroll" || type === "hover") &&
        scrollbarVisible));
  ```

  The registry is ref-counted and mirrors its state onto
  `data-rad-ui-overlay-open` on `<html>`, so overlays stack correctly (two open
  overlays decrement back to zero rather than clearing early). `ScrollArea` picks
  the state up via `useDocumentOverlayOpenState`, which also observes the
  attribute and `body`'s inline `style`, so overlays from other libraries that
  only lock body scroll are covered too.

  `resetDocumentOverlayOpenForTests` is wired into the global `afterEach` in
  `setupTests.ts` so the registry cannot leak between suites.

- ffab89f: Expose stable Select anatomy markers through `data-slot` attributes on root, trigger, content, group, item, item text, and item indicator parts.
- 8f8574c: Add Select documentation for large option lists.
- ed757fa: Improve Splitter handle accessibility with separator range attributes, Home/End keyboard resizing, and matching docs tables.
- 6c18fcb: docs(a11y): add ARIA references for alert dialog, context menu, and menubar
- 279d111: Document Switch keyboard interactions and ARIA pattern references.
- bfd1085: Expose stable Switch anatomy data slots and keep the thumb visual-only for assistive technologies.
- 5f1af85: Expose stable Tabs anatomy markers through `data-slot` attributes on root, list, trigger, and content parts.
- 8284dc5: Added TextArea accessibility docs covering keyboard behavior and native multiline textbox semantics.
- 8ca42a5: Expose TextField anatomy through stable `data-slot` attributes.
- 88c11a3: docs(toast): add keyboard interaction and ARIA reference tables
- ebe6ba7: Document Toggle and Toggle Group keyboard interactions and ARIA references.
- 32d31e8: Expose Tooltip anatomy data slots for root, trigger, content, and arrow parts.
- 91d18f6: Document Tree keyboard interactions and ARIA tree view references.
- dc01059: docs(Tree): add large-data branch mounting guidance and correct item API docs.

## 0.6.0

### Minor Changes

- fa1a1d5: scroll area visual types
- 1535c08: new toast component

### Patch Changes

- 3a9ef46: Add configurable `loop` focus-wrapping options for Tabs, Disclosure, Tree, and NavigationMenu, including NavigationMenu content panels.
- b7d4406: Restore Menubar horizontal keyboard navigation when focus is inside open menu content.
- b7d4406: Preserve inline AspectRatio styles while applying its ratio value.
- b577317: popover - improve radix api parity, modal focus behavior, arrow styling, and positioning stability

## 0.5.0

### Minor Changes

- ad29c4f: hovercard - size prop , datalist - size , color prop, quote -truncate prop
- fd2bd8b: drawer preview added

### Patch Changes

- a25ee5a: Add a work-in-progress `TextField` compound API with slot and reset fragments, updated styling, Storybook stories, and behavioral test coverage.

## 0.4.0

### Minor Changes

- 2708fb3: 27 components as officially released as preview, including Checkbox, Radio, Select, Combobox, DropdownMenu, and others.
- 5c8ec74: Context Menu (bugs fixes,placement fixes, scroll , variant and size prop)

### Patch Changes

- 3accf7b: slider vertical inverted fix
- 5b55d3c: Refresh **ToggleGroup** and **Toolbar** styles to match the segmented neutral treatment (shared borders, gray fills, internal dividers). Fix **Toolbar** link/button layout after `all: unset` by restoring `inline-flex` row alignment. Expand **Link** and **Toolbar** Storybook examples for icons (leading, trailing, icon-only) and correct **WithIcon** column alignment with `items-start`.
- 69e0c14: onValueCommit prop for slider

## 0.3.0

### Minor Changes

- d2c5395: migration from querySelector to refs for roving focus, tree and slider

### Patch Changes

- 4db8aa7: ui revamp for multiple comps

## 0.2.1

### Patch Changes

- 9a28add: Align AlertDialog styling with theme tokens.

## 0.2.0

### Minor Changes

- 11a4fe9: new spinner component added
- 140d24d: Renamed the select to combobox primitive and separated themed components for select and combobox
- bdf63a1: Addition of color and radius api support in TextArea and new styling

### Patch Changes

- 008342f: **Accordion**: add root `disabled` to disable every item; thread `data-orientation` through root, item, header, trigger, and content for styling hooks consistent with Radix-style patterns; expand accessibility tests.
- 38503b6: mergeRefs added
- b968b4a: export types for all comps
- a42620d: Fix select and combobox popup behavior by improving portal rendering, restoring macOS-style reopen anchoring for `Select`, and tightening related UI polish in the sandbox and shared component styles.

## 0.1.10

### Patch Changes

- f162d4c: Improve readability of borders and text colors

## 0.1.9

### Patch Changes

- 4be6c27: Fix React RSC (React Server Components) vulnerability by ensuring proper client component directives and preventing server-side rendering issues
- 9fb0047: Improve component styling and accessibility, add animations, and update component examples

## 0.1.8

### Patch Changes

- d22ef40: resize, size and varaint api support added for textarea

## 0.1.6

### Patch Changes

- 4363ff3: Added Separator for dropdown , context and menubar menus
- 336fe3f: MenuPrimitive root now supports rtl, loop, avoidCollision,placement and the item supports disabled, asChild , onSelect. Tests for the same have been added too.
- bcad222: Fix incomplete npm bundles for some 0.1.x releases; raise Node heap for builds, add export validation and a `--check` flag, with ESM/CJS and root export support.

## 0.1.5

### Patch Changes

- f77dc1b: Sub-components, now throw subtle warnings instead of console logs

## 0.1.0

### Minor Changes

- b471ddb: Tests, API improvements across components, Steps + Minimap, roving focus for CheckboxGroup, RadioGroup and Select updates, `forwardRef` on many primitives, a11y and build fixes.

### BREAKING CHANGES

**Toggle:** `onChange` was renamed to `onPressedChange`.

```tsx
// Before
<Toggle onChange={(pressed) => { /* handle toggle */ }} />

// After
<Toggle onPressedChange={(pressed) => { /* handle toggle */ }} />
```
