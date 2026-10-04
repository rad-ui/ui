---
"@radui/ui": patch
---

Fix several rendering and typing gaps: Checkbox now renders a visible minus indicator for the `indeterminate` state (previously the box filled with no glyph) and `Checkbox.Root` accepts `checked`/`defaultChecked="indeterminate"` in its types; Fieldset Legend, Description, and Message now receive their theme classes so their Clarity styles apply, and a Message inherits the fieldset's `invalid` state (danger color and `role="alert"`); Text accepts `htmlFor` when rendered `as="label"`. The convenience `<Slider>` now renders one thumb per entry when given an array `value`/`defaultValue` (previously a `[20, 80]` range showed a single thumb), labelling a two-thumb range's thumbs as minimum and maximum.
