# Primitive quality

Long-term goal: every Rad UI primitive is complete, accessible and stable enough to build production apps on, with code quality to match. Started 2026-11-02.

This file is the working tracker. Update it in the same PR as the work it describes; bigger items get a GitHub issue linked from the roadmap issue.

## Fixed rules

- **`asChild` stays as it is.** No change to how `asChild` merges props onto the child, and no second composition API next to it.
- **`asChild` hands over semantics** (#2256). It puts a part's behaviour and ARIA on the consumer's element; that's the point. Agents and docs: use it to compose behaviour onto an element that should have that role, never to borrow a part's look for an element with a different role. `Button asChild` around `<a href>` or a router `Link` deliberately keeps link semantics.
- Headless boundary from `MASTER_LIST.md` still holds: behaviour and accessibility in the library, visual design in the themes.
- No public API breaks without a changeset that says so. Prefer additive changes.
- **One handler-merging rule** (#1791): compose a consumer's handler with ours through `composeEventHandlers` (or `mergeProps`, which uses it). The consumer runs first, ours is skipped after `event.preventDefault()`, and every argument is forwarded. Don't hand-roll the chain; `composition.contract.test.ts` pins the rule.
- **Callback names** (#1785): state changes are `on<Thing>Change` (plus `ChangeComplete` / `Commit`); DOM events keep React's names. `callbackNaming.test.ts` fails on anything else until it's renamed or added to its reviewed list with a reason.

## Missing primitives

| Primitive | Status | Notes |
| --- | --- | --- |
| Field | built | Label, description and error linking; browser checks, custom and async `validate`, `match`, debounce; reset. Checkbox, Switch, Select and NumberField join a Field directly. #1771 |
| Form | built | Validates every Field on submit, focuses the first invalid one, waits for async checks, server `errors` by name, `onFormSubmit(values)`. #1773 |
| Input wiring | built | TextField and TextArea `onValueChange`; Field wiring. #1770 |
| Direction provider | built | `DirectionProvider` sets reading direction once; directional keys and Slider follow it. #1786, #1813 |
| OTP field | built | Paste, autofill, per-slot inputs, form value |
| Autocomplete | built | Free-text input with filtered suggestions, `Empty` and `Clear` parts. #1775 |
| CSP provider | not needed | No component injects `<style>` or `<script>`; a test (`contentSecurityPolicy.test.tsx`) keeps it that way |
| Shared prop and event merging | partial | Internal `mergeProps`, also exported from `@radui/ui/Slot` with `Slot` and `composeRefs`; older parts still use `composeEventHandlers`. #1791 |

## Quality checklist (per component)

A component moves to `done` when all of these hold, with tests:

1. **Keyboard** matches the WAI-ARIA APG pattern, including Home/End, typeahead where the pattern has it, and RTL arrow flipping.
2. **ARIA**: roles, states and labelling correct; axe clean in every state.
3. **Controlled and uncontrolled** both work (`value`/`defaultValue`, `open`/`defaultOpen`), with `on*Change` naming per #1785.
4. **Forms**: `name`, `required`, `disabled`, hidden input or native element so `FormData` and form reset work; Field integration once Field ships.
5. **Focus**: initial focus, focus return, focus trapping for modals, no focus loss on re-render.
6. **Floating parts** (popovers, menus, tooltips, select): collision handling, `side`/`align`/offsets per #1784, portal, inert background for modals (#1790).
7. **Animation**: open/close and enter/exit states exposed as `data-*` attributes so CSS can animate exit; respects reduced motion.
8. **SSR**: no hydration mismatch, no `window` at import, works in Next.js App Router with RSC boundaries (#1868).
9. **Types**: published `.d.ts` complete and correct for every part, including `asChild` children.
10. **Stability**: no flaky tests; behaviour covered by interaction tests (#1817, #1825); bundle and re-render cost checked for heavy components (#1850).
11. **Docs**: API reference for every part, keyboard table, accessibility notes, data attributes.

## Order of work

1. Stability first: open bugs on existing components (#2283, #2278, #2273, #2274, #2248), and the quality checklist run on the most used components (Button, Dialog, Select, Popover, Menu, Tabs, Checkbox, Combobox, Tooltip, Toast).
2. Field (merge the branch), then Form, then Input wiring.
3. Direction provider and RTL across directional components.
4. Missing primitives: OTP field, Autocomplete decision, CSP provider.
5. Checklist across the remaining components until every row is `done`.

## Log

| Date | Change |
| --- | --- |
| 2026-11-02 | Tracker created |
| 2026-11-03 | Field, Form, OTP field, Autocomplete, Direction provider and about 60 behaviour additions (detached triggers, open change details and completion, transition attributes, modal options, multiple select, menu checkbox and radio items, tooltip provider, tabs indicator, number field format and scrub, and more) landed on one branch with the open stability fixes; CSP provider ruled unnecessary with a guard test |
| 2026-11-03 | `side`/`align`/offsets on Tooltip, HoverCard and menus (#1784); modal background test across every modal part (#1790); server render and hydration tests for 36 components; axe now runs every WCAG A/AA rule (#2300), which found a CheckboxGroup/RadioGroup label bug (#2301) |
| 2026-11-04 | The 2026-11-03 work merged to main (#2302, #2303, #2305). API sweep across every primitive: shared positioning options (anchor, positionMethod, collisionAvoidance, sticky, disableAnchorTracking), actionsRef on every popup plus Field/Form validate(), list filtering (filter, limit, locale, useFilter) and form options (form, inputRef, readOnly, uncheckedValue) for Select/Combobox/Autocomplete and the choice controls, Slider push/swap thumbs, NumberField allowOutOfRange/snapOnStep, OTP options and Separator, NavigationMenu delays/orientation/transitions, Tooltip disabled/closeOnClick, menu highlight/closeParentOnEsc/Arrow, Select.Label, Combobox.Status, Drawer indent parts, Toolbar focusableWhenDisabled, Tree controlled expansion and RTL. Fixed: Escape in a submenu closed the whole menu; a required OTPField never blocked submission |
| 2026-11-05 | Stacked modals: a Dialog opened from a Drawer is no longer hidden or treated as outside, and portalled Selects inside a Drawer can be clicked (#2322, #2323). Reduced motion: motion tokens collapse under the system setting (item 7). Forced-colours mode: focus outline and state fills in system colours (#1806). Controlled/uncontrolled contract test over 18 components (item 3, #1825). List items re-render only when their highlight changes, 1-2 renders per arrow key instead of one per item (#1850) |
