# Sync And Verify Clarity Usage

This agent command audits Rad UI for correct usage of the Clarity design system,
fixes violations, and reports what changed with clear reasoning.

## Source Of Truth

Start with [Knowledge Master List](../../knowledge/MASTER_LIST.md).

Then read [Clarity Design System](../../knowledge/design_system/clarity_design_system.md).
Treat its scale, semantic aliases, accessibility guidance, and
"Rules / What Not To Do" section as the canonical design-system contract for
this task.

## Goal

Conduct an audit of Clarity usage only inside `src/`. Find places where source
UI, component stories, source examples, component styles, or component demos
drift from the design-system rules, then fix the issues with minimal,
intentional changes.

## Audit Scope

Search only inside `src/`.

Do not audit or edit `docs/`, root-level `styles/`, generated token output, or
any other folder outside `src/` for this task. If generated files outside `src/`
would need updates because of a `src/` token-source change, call that out in the
final summary instead of editing those generated files directly.

Look for:

- Raw neutral hex colors that duplicate or bypass the Clarity scale.
- Ad hoc grayscale values, private neutral ramps, or unsupported steps such as
  `25`, `75`, `150`, or `1100`.
- Public token naming that uses `1` through `12` instead of
  `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`, `1000`.
- Components or examples using background tokens as borders.
- Components or examples using border tokens as filled backgrounds.
- Text using `900` when `950` or `1000` is the correct text token.
- Body text using `700` or `800` without an explicit contrast reason.
- Solid `800` fills without the matching `900` hover state.
- Interactive states using `50` or `100`.
- Disabled styling implemented only through opacity over arbitrary colors.
- State that is communicated only through color where an accessible signal is
  needed.
- Direct raw-token usage in component APIs where a semantic alias should be
  exposed instead.
- Stories, examples, or demos inside `src/` that teach patterns conflicting with
  the Clarity rules.

## Fix Rules

- Prefer semantic aliases in component APIs, stories, and examples inside `src/`.
- Keep raw scale tokens as implementation details unless the surrounding code is
  explicitly documenting the scale itself.
- Preserve existing component behavior and public APIs unless an API is clearly
  violating the design-system contract.
- Make focused edits only. Do not refactor unrelated styling, layout, or
  component architecture.
- Do not add new color systems, extra neutral tokens, or component-specific
  grayscale ramps.
- Do not introduce hue into the neutral scale. If semantic colors are needed,
  define them separately and explain why.
- When fixing hover, active, selected, border, focus, text, or disabled states,
  map them back to the Clarity intent table.
- If a potential issue cannot be safely fixed without a product or API decision,
  leave it unchanged and call it out in the final summary.

## Verification

After fixes, run the smallest relevant checks first, then broader checks when
the touched area warrants it.

Use project-documented commands from `knowledge/MASTER_LIST.md` and
`package.json`, such as:

- `npm run lint`
- `npm test`
- `npm run build:rollup`

If a command is unavailable, too expensive, or fails for an unrelated existing
reason, report that clearly.

## Deliverable

Provide a clean final summary with:

- What was audited.
- What was fixed.
- Why each category of fix was necessary.
- The design-system reasoning behind the changes.
- Which checks were run and their results.
- Any remaining issues, skipped findings, or decisions needed from maintainers.

Keep the summary concise, but make the reasoning explicit enough that a reviewer
can understand the design-system intent without rereading the full diff.
