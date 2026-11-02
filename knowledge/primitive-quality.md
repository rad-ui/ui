# Primitive quality

Long-term goal: every Rad UI primitive is complete, accessible and stable enough to build production apps on, with code quality to match. Started 2026-11-02.

This file is the working tracker. Update it in the same PR as the work it describes; bigger items get a GitHub issue linked from the roadmap issue.

## Fixed rules

- **`asChild` stays as it is.** No change to how `asChild` merges props onto the child, and no second composition API next to it.
- Headless boundary from `MASTER_LIST.md` still holds: behaviour and accessibility in the library, visual design in the themes.
- No public API breaks without a changeset that says so. Prefer additive changes.

## Missing primitives

| Primitive | Status | Notes |
| --- | --- | --- |
| Field | partial | `feat/field-primitive` has 5 unmerged commits (label/help/error linking, validation, async validate, reset); #1771 |
| Form | missing | #1773: validation state, submit, server errors |
| Input wiring | partial | #1770: TextField controlled/uncontrolled and Field wiring |
| Direction provider | missing | #1786, #1813: RTL for direction-dependent keyboard handling |
| OTP field | missing | one-time code input |
| Autocomplete | missing | #1775: build it, or document Combobox as the answer |
| CSP provider | missing | nonce for injected styles |
| Shared prop and event merging | partial | #1791: one utility instead of ad-hoc `composeEventHandlers` |

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
