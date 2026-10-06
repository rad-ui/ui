# Clarity Audit Spec

This document is the canonical audit and enforcement spec for Clarity component
styling. Use it before adding or changing component styles.

`clarity_design_system.md` defines the neutral color scale and design intent.
This file defines how to turn that intent into component recipes, token usage,
review rules, and audit findings.

## Goal

Clarity styling must be consistent enough that every component can be reviewed
against the same contract:

- Component anatomy is public, stable, and namespace-based.
- Public styling props are reflected through shared semantic `data-*`
  attributes.
- Component sizes, spacing, radius, elevation, motion, focus, and color intent
  come from Clarity tokens or semantic aliases.
- Accessibility requirements are explicit and checked before styling ships.
- One-off visual decisions are treated as audit findings, not local precedent.

## Source Of Truth

Read these docs together when auditing or authoring Clarity styles:

- `knowledge/MASTER_LIST.md`
- `knowledge/design_system/clarity_design_system.md`
- `knowledge/features/data-attributes.md`
- `knowledge/features/styling-namespaces.md`
- `knowledge/good_practices/index.md`

The implementation surfaces currently live in:

- `src/design-systems/clarity/default.scss`
- `src/design-systems/clarity/tokens/*`
- `src/components/ui/**/*.clarity.scss`
- `styles/cssTokens/base.tokens.css`

## Component Anatomy Contract

Every styled Clarity component must declare and follow a public anatomy.

Generated classes use:

```txt
{namespace}-{component}-{part}
```

For the bundled Clarity namespace, examples include:

```txt
.rad-ui-button-root
.rad-ui-card-root
.rad-ui-card-header
.rad-ui-card-title
.rad-ui-accordion-trigger
.rad-ui-dialog-content
```

Rules:

- Root selectors must include the `root` part.
- Child selectors must target explicit public parts or slots.
- Do not style private wrapper details unless the part is documented as public.
- Do not rely on DOM position selectors when a public part class exists.
- Do not create component-scoped styling attributes such as
  `data-button-variant`, `data-badge-size`, or `data-radio-group-color`.
- Use generated classes for ownership and shared `data-*` attributes for state
  and styling metadata.
- Headless mode must not emit accidental classes when no `Theme classNamespace`
  exists.

## Public Attribute Contract

Use these shared attributes consistently:

| Attribute | Meaning | Examples |
|-----------|---------|----------|
| `data-variant` | Public styling variant | `solid`, `soft`, `outline`, `ghost`, `surface` |
| `data-size` | Public styling size | `small`, `medium`, `large`, `x-large` or existing component API values |
| `data-color` | Public color prop | `gray`, `blue`, `red`, `accent` |
| `data-state` | Behavior state | `open`, `closed`, `checked`, `unchecked`, `active`, `selected` |
| `data-disabled` | Disabled interaction state | Presence attribute |
| `data-orientation` | Directional behavior or layout | `horizontal`, `vertical` |
| `data-slot` | Optional public anatomy marker | `accordion-trigger`, `card-title` |

Audit rule: public styling attributes must be semantic and unprefixed. Rad
UI-prefixed attributes are allowed only for provider or infrastructure behavior,
such as `data-rad-ui-theme`, `data-rad-ui-accent-color`, and
`data-rad-ui-portal-root`.

## Token Usage Rules

Component styles should use semantic aliases first, then raw generated token
variables only when no semantic alias exists.

### Surface And Color Aliases

Use the aliases defined in `src/design-systems/clarity/default.scss` before
raw scale tokens:

| Alias | Expected mapping | Usage |
|-------|------------------|-------|
| `--rad-ui-surface-canvas` | `gray-50` | App/page background |
| `--rad-ui-surface-panel` | `gray-100` | Panels, cards, sidebars |
| `--rad-ui-surface-subtle` | `gray-100` | Subtle sections and code blocks |
| `--rad-ui-surface-muted` | `gray-200` | Muted component surfaces |
| `--rad-ui-surface-hover` | `gray-200` | Transparent component hover surface |
| `--rad-ui-surface-inverse` | `gray-1000` | Inverse surfaces |
| `--rad-ui-border-soft` | `gray-500` | Non-interactive borders |
| `--rad-ui-border-default` | `gray-600` | Interactive borders |
| `--rad-ui-border-strong` | `gray-700` | Hovered or high-emphasis borders |
| `--rad-ui-solid-background` | `gray-800` | Default solid fill |
| `--rad-ui-solid-hover` | `gray-900` | Hovered solid fill |
| `--rad-ui-text-primary` | `gray-1000` | Primary text, headings, icons |
| `--rad-ui-text-secondary` | `gray-950` | Supporting text |
| `--rad-ui-text-muted` | `gray-950` | Muted readable text |
| `--rad-ui-text-strong` | `gray-1000` | Strong foreground |
| `--rad-ui-text-inverse` | `gray-50` | Text on inverse/solid fills |
| `--rad-ui-tooltip-background` | `surface-inverse` (dark: `surface-muted`) | Tooltip surface and arrow |
| `--rad-ui-tooltip-text` | `text-inverse` (dark: `text-primary`) | Tooltip text |
| `--rad-ui-tooltip-border` | `surface-inverse` (dark: `border-soft`) | Tooltip edge |
| `--rad-ui-badge-soft-text-weight` | `70%` (dark: `100%`) | Share of the `950` step in soft badge text |

Tooltips stay a dark chip in both appearances. The inverse surface flips to
near-white in dark mode, so the tooltip aliases are re-declared under
`[data-rad-ui-theme="dark"]` instead of reusing `--rad-ui-surface-inverse`.

Audit rule: if a component uses `--rad-ui-color-gray-*` directly, confirm there
is no suitable semantic alias. If an alias exists, prefer the alias.

### Sizing Aliases

Use component-level aliases from `default.scss`:

| Alias | Usage |
|-------|-------|
| `--rad-ui-control-height-xs` | Extra-small controls |
| `--rad-ui-control-height-sm` | Small controls |
| `--rad-ui-control-height-md` | Default controls |
| `--rad-ui-control-height-lg` | Large controls |
| `--rad-ui-control-height-xl` | Extra-large controls |
| `--rad-ui-control-padding-x-sm` | Small horizontal control padding |
| `--rad-ui-control-padding-x-md` | Default horizontal control padding |
| `--rad-ui-control-padding-x-lg` | Large horizontal control padding |
| `--rad-ui-button-padding-x-sm` | Small button horizontal padding |
| `--rad-ui-button-padding-x-md` | Default button horizontal padding |
| `--rad-ui-button-padding-x-lg` | Large button horizontal padding |
| `--rad-ui-button-padding-x-xl` | Extra-large button horizontal padding |

`--rad-ui-button-padding-x-*` is deliberately separate from
`--rad-ui-control-padding-x-*`. The generic control scale is sized for fields
that sit inside a form; a button is a standalone target and reads one step
wider. Tabs and Combobox already depend on the control scale, so redefining it
to suit Button would have moved those two.
| `--rad-ui-control-padding-y-sm` | Small vertical control padding |
| `--rad-ui-control-padding-y-md` | Default vertical control padding |
| `--rad-ui-control-padding-y-lg` | Large vertical control padding |
| `--rad-ui-icon-size-xs` | Extra-small icon |
| `--rad-ui-icon-size-sm` | Small icon |
| `--rad-ui-icon-size-md` | Default icon |
| `--rad-ui-icon-size-lg` | Large icon |
| `--rad-ui-density-gap-xs` | Tightest internal gap |
| `--rad-ui-density-gap-sm` | Small internal gap |
| `--rad-ui-density-gap-md` | Default internal gap |
| `--rad-ui-density-gap-lg` | Large internal gap |
| `--rad-ui-density-gap-xl` | Largest internal gap |

Raw size tokens currently available:

| Token | Value |
|-------|-------|
| `--rad-ui-size-4` | `1rem` |
| `--rad-ui-size-5` | `1.25rem` |
| `--rad-ui-size-6` | `1.5rem` |
| `--rad-ui-size-8` | `2rem` |
| `--rad-ui-size-10` | `2.5rem` |
| `--rad-ui-size-12` | `3rem` |
| `--rad-ui-size-16` | `4rem` |

Audit rule: component control heights should use `--rad-ui-control-height-*`
unless the component has a documented reason to use a raw size token.

### Spacing Scale

Raw spacing tokens currently available:

| Token | Value |
|-------|-------|
| `--rad-ui-spacing-0` | `0` |
| `--rad-ui-spacing-1` | `0.25rem` |
| `--rad-ui-spacing-2` | `0.5rem` |
| `--rad-ui-spacing-3` | `0.75rem` |
| `--rad-ui-spacing-4` | `1rem` |
| `--rad-ui-spacing-5` | `1.25rem` |
| `--rad-ui-spacing-6` | `1.5rem` |
| `--rad-ui-spacing-8` | `2rem` |
| `--rad-ui-spacing-10` | `2.5rem` |
| `--rad-ui-spacing-12` | `3rem` |

Audit rule: use spacing tokens or density aliases for padding, gap, inset, and
offset values. Literal spacing values require a documented exception.

### Radius Scale

Raw radius tokens currently available:

| Token | Value | Usage |
|-------|-------|-------|
| `--rad-ui-radius-none` | `0` | Square geometry |
| `--rad-ui-radius-sm` | `0.375rem` | Small controls |
| `--rad-ui-radius-md` | `0.5rem` | Default controls |
| `--rad-ui-radius-lg` | `0.75rem` | Large controls and small panels |
| `--rad-ui-radius-xl` | `1rem` | Large panels and overlays |
| `--rad-ui-radius-full` | `9999px` | Pills and circular controls |

Component radius aliases:

| Alias | Usage |
|-------|-------|
| `--rad-ui-control-radius-sm` | Small controls |
| `--rad-ui-control-radius-md` | Default controls |
| `--rad-ui-control-radius-lg` | Large controls |
| `--rad-ui-control-radius-pill` | Pills |
| `--rad-ui-panel-radius-sm` | Small panels |
| `--rad-ui-panel-radius-md` | Default panels |
| `--rad-ui-panel-radius-lg` | Large panels and modal surfaces |

Audit rule: controls use control radius aliases. Panels and overlays use panel
radius aliases. Do not use large panel radius on compact controls.

### Elevation Model

Use elevation only when a component needs separation from its surrounding plane.
Do not use shadows as decoration.

| Level | Tokens | Usage |
|-------|--------|-------|
| Flat | No shadow, token border | In-flow surfaces and controls |
| Raised control | `--rad-ui-control-shadow` | Buttons, selected cards, raised interactive controls |
| Hovered control | `--rad-ui-control-shadow-hover` | Hover affordance when elevation is part of the recipe |
| Active control | `--rad-ui-control-shadow-active` | Pressed or active raised controls |
| Floating surface | `--rad-ui-shadow-md` or elevation `md` | Popovers, menus, hover cards |
| Modal surface | `--rad-ui-shadow-lg` or elevation `lg` | Dialogs, drawers, blocking overlays |

Audit rule: no component should introduce a new local box-shadow stack when an
existing shadow or elevation level fits.

### Motion Model

Durations are published as `--rad-ui-motion-duration-*` in
`styles/cssTokens/base.tokens.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--rad-ui-motion-duration-instant` | `80ms` | Micro feedback where delay would feel wrong |
| `--rad-ui-motion-duration-fast` | `120ms` | Hover, press, focus, color transitions |
| `--rad-ui-motion-duration-normal` | `180ms` | Small enter/exit and common state changes |
| `--rad-ui-motion-duration-slow` | `240ms` | Overlay and panel enter/exit |
| `--rad-ui-motion-duration-slower` | `320ms` | Large surfaces or complex motion |

Easings:

| Token | Usage |
|-------|-------|
| `--rad-ui-motion-easing-entrance` | Decelerating curve for entering motion |
| `--rad-ui-motion-easing-standard` | Standard curve for exiting and general transitions |

Rules:

- Use the duration and easing tokens rather than typed-in values.
- Hover and press transitions should be fast.
- Overlay enter/exit motion should use normal or slow durations.
- Large drawer or modal movement may use slow or slower durations.
- Respect reduced-motion behavior where animations move, scale, or transform
  meaningful UI.

A looping animation's cycle time is not an interaction duration and is not
governed by this scale. Neither is the near-zero duration used inside a
`prefers-reduced-motion: reduce` block. Both are excluded from the automated
`literal-duration` rule.

Audit rule: literal animation durations such as `200ms` are findings unless
they map to a documented recipe or should be promoted to a token.

### Typography And Icon Scale

Component typography aliases:

| Alias | Usage |
|-------|-------|
| `--rad-ui-component-font-size-xs` | Extra-small labels and dense metadata |
| `--rad-ui-component-font-size-sm` | Small controls and support text |
| `--rad-ui-component-font-size-md` | Default controls and component body text |
| `--rad-ui-component-font-size-dense` | Dense table, tree, and command rows |
| `--rad-ui-component-font-size-comfortable` | Comfortable panel and dialog body text |
| `--rad-ui-component-line-height-tight` | Compact labels |
| `--rad-ui-component-line-height-normal` | Default controls |
| `--rad-ui-component-line-height-relaxed` | Multi-line descriptions |
| `--rad-ui-component-font-weight-regular` | Default readable text |
| `--rad-ui-component-font-weight-medium` | Controls and labels |
| `--rad-ui-component-font-weight-semibold` | Strong labels and titles |

The raw font-size scale includes two dense UI steps that predate the scale
itself, `1.5` (`0.8125rem`) and `2.5` (`0.9375rem`). Both were previously
typed in as literals across many components; they are now generated tokens
(`--rad-ui-font-size-1-5`, `--rad-ui-font-size-2-5`) behind the `dense` and
`comfortable` aliases above.

Audit rule: component styles should not introduce arbitrary font sizes,
line-heights, or weights when component aliases exist.

### Focus Model

Use the existing focus aliases:

| Alias | Usage |
|-------|-------|
| `--rad-ui-focus-ring-color-subtle` | Lower-emphasis focus indicators |
| `--rad-ui-focus-ring-color` | Default strong focus indicator |
| `--rad-ui-focus-ring-style` | Focus outline style |
| `--rad-ui-focus-ring-offset` | Focus ring offset |
| `--rad-ui-focus-ring-shadow` | Default focus shadow |
| `--rad-ui-focus-ring-shadow-sm` | Compact focus shadow |
| `--rad-ui-focus-ring-shadow-inset` | Inset focus shadow |
| `--rad-ui-focus-ring-shadow-offset` | Offset focus ring on canvas |
| `--rad-ui-focus-ring-shadow-offset-panel` | Offset focus ring on panels |

Audit rule: do not hand-code focus rings in component styles. Use focus aliases
so focus color, width, offset, and inset/offset behavior stay consistent.

## Color Intent

Clarity neutral tokens represent intent, not arbitrary lightness values.

| Token | Intent |
|-------|--------|
| `50` | App/page background |
| `100` | Subtle surfaces, cards, sidebars, code blocks |
| `200` | Default UI element background |
| `300` | Hovered UI element background |
| `400` | Active, pressed, or selected UI element background |
| `500` | Subtle borders and separators |
| `600` | Interactive borders and default focus rings |
| `700` | Hovered borders and strong separators |
| `800` | Solid fills |
| `900` | Solid hover fills |
| `950` | Supporting readable text |
| `1000` | Primary text, headings, icons |

Rules:

- If a component is transparent by default, use the element background intent
  for hover.
- Solid variants use solid background and solid hover as a pair.
- Text uses `950` or `1000`, not `900`.
- Borders use `500`, `600`, or `700`, not component background steps.
- Component backgrounds use `200`, `300`, or `400`, not border steps.
- `50` and `100` are page and surface steps, not interactive states.
- Semantic colors must follow the same intent model as neutral colors.

## Accessibility Contrast

Accessibility checks are required for every recipe and variant.

Minimum rules:

- Normal text must meet WCAG AA contrast of at least 4.5:1.
- Large text and non-text UI indicators must meet at least 3:1.
- Focus indicators must be visible against the adjacent surface.
- Disabled states must remain understandable and must not rely only on opacity
  over arbitrary backgrounds.
- State must not be communicated only through color. Pair visual state with
  public data attributes, ARIA state, iconography, text, shape, or another
  accessible signal when needed.
- Hover-only affordances must not be the only way to discover a required
  interaction.

Audit rule: if contrast cannot be proven from tokens, mark the component as a
contrast risk and verify before restyling further.

## Component Recipe Format

Every component recipe should use this structure:

```md
### Component Name

Anatomy:
- `.rad-ui-component-root`
- `.rad-ui-component-part`

Public attributes:
- `data-variant`
- `data-size`
- `data-color`
- `data-state`

Variants:
- `solid`: ...
- `soft`: ...
- `outline`: ...
- `ghost`: ...

Sizing:
- `small`: ...
- `medium`: ...
- `large`: ...
- `x-large`: ...

Radius:
- ...

Color:
- ...

Elevation:
- ...

Motion:
- ...

Accessibility:
- ...

Enforcement:
- ...
```

## Canonical Component Recipes

### Button / Control

Use for Button, Dialog trigger, Drawer trigger, AlertDialog actions, Toggle-like
button controls, and command actions.

Anatomy:

- `.rad-ui-button-root`
- Component-specific triggers may extend or share the button recipe only when
  they remain button-like in behavior and layout.

Public attributes:

- `data-variant`
- `data-size`
- `data-color`
- `data-state` when toggleable or disclosure-like
- `data-disabled`

Variants:

- `solid`: solid background, solid hover, inverse foreground, matching solid
  border.
- `soft`: muted or accent-tinted element background, hover to element hover,
  readable foreground.
- `outline`: transparent or panel background, default border, hover surface.
- `ghost`: transparent background, hover surface, no default border unless
  required by accessibility.
- `destructive`: semantic destructive intent using status aliases, not local
  red values.

Sizing:

- Small: `--rad-ui-control-height-sm`, compact padding, small or medium icon.
- Medium: `--rad-ui-control-height-md`, default padding, medium icon.
- Large: `--rad-ui-control-height-lg`, larger padding, medium or large icon.
- Extra-large: documented only when the component API already supports it.

Radius:

- Default controls use `--rad-ui-control-radius-md`.
- Pills use `--rad-ui-control-radius-pill`.
- Icon-only controls must stay visually balanced and retain accessible hit area.

Elevation:

- Flat by default unless the recipe explicitly calls for raised controls.
- Raised controls use `--rad-ui-control-shadow`.
- Hover/active elevation uses `--rad-ui-control-shadow-hover` and
  `--rad-ui-control-shadow-active`.

Motion:

- Hover, active, border, color, and background transitions use fast duration.
- Avoid transform motion unless the interaction benefits from physical feedback.

Accessibility:

- `:focus-visible` uses focus aliases.
- Disabled controls expose `data-disabled` or native `disabled` where
  applicable.
- Icon-only controls need an accessible name.

Enforcement:

- Do not hard-code button backgrounds, border colors, or focus rings.
- Do not use raw accent steps directly when semantic aliases are available.

### Badge / Chip

Use for Badge, Kbd-like chips, compact status labels, and metadata pills.

Anatomy:

- `.rad-ui-badge-root`
- Optional icon or text parts only if publicly exposed.

Public attributes:

- `data-variant`
- `data-size`
- `data-color`

Variants:

- `soft` (default): translucent tint of the tone (`800` at 14%) with vivid text
  (`950` in dark; light mixes in `1000` via `--rad-ui-badge-soft-text-weight`,
  70%). Clears WCAG AA on every scale in both appearances.
- `solid`: solid background with inverse foreground.
- `surface`: panel or muted surface with subtle border.
- `outline`: transparent or panel background with default border.
- `ghost`: transparent background, readable foreground.

Sizing:

- Small: compact font, tight horizontal padding.
- Medium: default chip size.
- Large: larger padding and line-height.
- Extra-large: only if supported by API.

Radius:

- Badges use `--rad-ui-control-radius-sm` (a small rounded rectangle, not a pill).

Typography:

- Badges use `--rad-ui-font-mono` at weight 600: they read as labels, not prose.
- Without `color`, the tone is the neutral gray scale; with `color`, the accent scale.

Elevation:

- No shadow by default.

Motion:

- Badges are static unless interactive. Interactive chips follow Button /
  Control motion.

Accessibility:

- Status badges must not rely on color alone. Pair with text or accessible
  label.

Enforcement:

- Do not use badge styles as a generic replacement for buttons.

### Card / Panel

Use for Card, Callout body surfaces, DataList panels, static content panels, and
section containers.

Anatomy:

- `.rad-ui-card-root`
- `.rad-ui-card-header`
- `.rad-ui-card-title`
- `.rad-ui-card-description`
- `.rad-ui-card-action`
- `.rad-ui-card-content`
- `.rad-ui-card-footer`

Public attributes:

- `data-variant`
- `data-size`
- `data-color` only when color meaning is part of the component API.

Variants:

- `outline`: panel surface, subtle/default border.
- `soft`: subtle surface, optional divider treatment for header/footer.
- `ghost`: no frame, no background, no border.

Sizing:

- Small: compact padding and gap.
- Medium: default panel padding.
- Large: larger content padding and relaxed gaps.
- Extra-large: only for spacious editorial or dashboard panels.

Radius:

- Small panels use `--rad-ui-panel-radius-sm`.
- Default panels use `--rad-ui-panel-radius-md`.
- Large panels and modal-like surfaces use `--rad-ui-panel-radius-lg`.

Elevation:

- Cards are flat by default.
- Use elevation only for selected, draggable, floating, or overlay-like cards.

Motion:

- Static cards should not animate by default.
- Interactive cards may transition border, background, and shadow with fast
  duration.

Accessibility:

- Headings and descriptions use readable text aliases.
- Clickable cards must expose proper interactive semantics.

Enforcement:

- Do not nest decorative card frames inside other card frames.
- Do not use card shadows where a token border is enough.

### Text Input / Field

Use for TextField, TextArea, NumberField, Combobox trigger input, and similar
field controls.

Anatomy:

- Root field wrapper part.
- Native `input` or `textarea` part.
- Optional icon, prefix, suffix, clear, and validation parts when public.

Public attributes:

- `data-variant`
- `data-size`
- `data-color` when applicable
- `data-disabled`
- `data-invalid` or ARIA invalid state when supported

Variants:

- `outline`: field background, default border, strong border or focus ring on
  focus.
- `soft`: muted field background, transparent or subtle border.
- `solid`: solid fill only when contrast and placeholder treatment are defined.
- `ghost`: transparent field for dense or embedded UI.

Sizing:

- Field height follows control height aliases.
- Multi-line fields use padding aliases and minimum block-size tokens.

Radius:

- Fields use control radius aliases.

Elevation:

- No shadow by default.
- Focus uses focus aliases, not elevation.

Motion:

- Border, background, placeholder, and focus transitions use fast duration.

Accessibility:

- Placeholder text must meet appropriate contrast for placeholder content.
- Invalid state must include ARIA or documented error semantics.
- Disabled and read-only states must be visually distinct.

Enforcement:

- Do not style native focus with arbitrary outline values.
- Do not lower opacity globally on the entire field if it harms text contrast.

### Overlay Surface

Use for Dialog, AlertDialog, Drawer, Popover, HoverCard, Tooltip, DropdownMenu,
ContextMenu, Menubar content, Select content, Command palettes, and Navigation
Menu panels.

Anatomy:

- Trigger part when provided.
- Overlay or backdrop part when provided.
- Content/popup/surface part.
- Title, description, body, footer, close, arrow, viewport, and item parts when
  public.

Public attributes:

- `data-state`
- `data-side`
- `data-align`
- `data-orientation`
- `data-disabled` for unavailable items/actions
- `data-size` or `data-variant` only when part of the component API.

Variants:

- Floating surface: panel background, default border, floating elevation.
- Modal surface: panel background, default or strong border, modal elevation.
- Tooltip surface: the `--rad-ui-tooltip-*` aliases (inverse in light mode,
  a raised dark surface in dark mode), never a raw inverse surface.

Sizing:

- Use overlay width and viewport aliases:
  `--rad-ui-overlay-width-sm`, `--rad-ui-overlay-width-md`,
  `--rad-ui-overlay-max-height-md`, and
  `--rad-ui-overlay-viewport-gutter`.

Radius:

- Floating surfaces use panel radius.
- Modal and drawer surfaces use medium or large panel radius based on size.

Elevation:

- Popovers, menus, and hover cards use floating elevation.
- Dialogs and drawers use modal elevation.
- Tooltips may use compact floating elevation.
- An overlay arrow reads as part of the floating surface, so its shadow is a
  `filter` rather than a `box-shadow` and cannot reuse an elevation token. Use
  `--rad-ui-overlay-arrow-shadow`.

Motion:

- Enter/exit uses normal or slow durations.
- Tooltip motion may be fast or normal.
- Drawer movement may use slow or slower duration.
- Respect reduced motion for transform and large movement.

Accessibility:

- Modal overlays must preserve focus management and accessible labels.
- Scrims must not reduce content contrast inside the active surface.
- Tooltip content must remain readable and must not be required for critical
  interaction.

Enforcement:

- Do not invent local scrim colors. Use or define `--rad-ui-overlay-scrim`.
- Do not use high elevation on in-flow surfaces.

### Menu / Listbox / Select Item

Use for Select items, menu items, command items, combobox options, navigation
items, and list rows with active selection.

Anatomy:

- Root collection part.
- Item part.
- Label, indicator, shortcut, icon, separator, and group parts when public.

Public attributes:

- `data-state`
- `data-highlighted`
- `data-selected`
- `data-disabled`
- `data-orientation`
- `data-color` when supported.

Variants:

- Default item: transparent or surface background.
- Highlighted item: element hover or item highlighted alias.
- Selected item: element active or item selected alias.
- Disabled item: disabled text and non-interactive cursor.

Sizing:

- Dense item: compact padding and small font.
- Default item: default component font and density gap.
- Spacious item: larger vertical padding.

Radius:

- Items use small or medium control radius.

Elevation:

- Items do not define elevation. Parent floating surface owns elevation.

Motion:

- Highlight and selection background changes use fast duration.

Accessibility:

- Active descendant, selected state, checked state, or ARIA semantics must align
  with visual state.
- Selected or highlighted state must not be color-only when meaning persists.

Enforcement:

- Do not style item state with private attributes when public state attributes
  already exist.

### Selection Control

Use for Checkbox, Radio, Switch, Toggle, ToggleGroup, RadioCards,
CheckboxCards, Slider, and Progress-like controls.

Anatomy:

- Root part.
- Indicator/thumb/track/control part as applicable.
- Label, description, icon, and card content parts when public.

Public attributes:

- `data-state`
- `data-disabled`
- `data-orientation`
- `data-size`
- `data-variant`
- `data-color`

Variants:

- Filled: selected state uses solid intent and readable foreground.
- Outline: selected state uses border and indicator.
- Soft: selected state uses active element background.
- Card: selected state uses border, background, and optional shadow.

Sizing:

- Control glyphs use size or icon aliases.
- Label and group gaps use density aliases.

Radius:

- Checkbox uses control radius.
- Radio uses full radius.
- Switch uses full radius for track and thumb.
- Card variants use panel radius.

Elevation:

- No elevation by default.
- Card variants may use selected control shadow.

Motion:

- Toggle and check transitions use fast duration.
- Switch thumb movement may use normal duration.
- Progress and slider updates should avoid sluggish motion.

Accessibility:

- Native or ARIA checked state must match visual state.
- Focus target must be visible and large enough.
- Disabled state must be perceivable without relying only on opacity.

Enforcement:

- Do not encode selected state only by changing color.

### Feedback Surface

Use for Callout, AlertDialog body treatment, inline validation, status panels,
and empty/loading/error messages.

Anatomy:

- Root surface.
- Icon part.
- Title part.
- Description/content part.
- Action part when supported.

Public attributes:

- `data-variant`
- `data-size`
- `data-color`
- `data-intent` when the API distinguishes semantic intent from hue.

Variants:

- Soft: semantic background, readable text, optional soft border.
- Outline: transparent or panel background with semantic border.
- Solid: only when foreground contrast is verified.

Sizing:

- Small: compact inline messages.
- Medium: default callouts.
- Large: panel-like feedback.

Radius:

- Inline feedback uses control or small panel radius.
- Panel feedback uses panel radius.

Elevation:

- No shadow by default.

Motion:

- Static feedback should not animate unless entering/exiting.

Accessibility:

- Error, warning, success, and info states need text or accessible labels, not
  color alone.
- Live regions are required only when content appears dynamically and needs
  announcement.

Enforcement:

- Do not hard-code semantic status colors inside component styles.

## Audit Categories

Use these categories when reviewing existing `*.clarity.scss` files:

| Category | Meaning |
|----------|---------|
| Compliant | Matches anatomy, token, state, accessibility, and recipe rules |
| Recipe missing | Component needs a recipe before styling can be judged |
| Token mismatch | Uses raw or local values where aliases/tokens exist |
| Selector contract issue | Uses unstable DOM selectors, private parts, or wrong class contract |
| Attribute contract issue | Uses non-canonical or component-scoped public styling attributes |
| Accessibility risk | Contrast, focus, disabled, state, or semantics need verification |
| Motion mismatch | Duration, easing, reduced-motion, or transform behavior is off-recipe |
| Elevation mismatch | Shadow/elevation is decorative, excessive, or locally invented |
| Color intent mismatch | Uses scale steps outside their intended role |

## Enforcement Rules

These are hard review rules for Clarity styling:
- No raw hex, HSL, RGB, or RGBA in component `.clarity.scss` when a token or
  semantic alias exists.
- No one-off control heights, padding, gaps, radius, font sizes, line-heights,
  or shadows when Clarity tokens cover the use case.
- No local focus ring definitions. Use `--rad-ui-focus-*` aliases.
- No component-specific private grayscale ramps.
- No local light/dark step remapping inside component styles.
- No solid background without a matching hover state.
- No `900` text. Use supporting or primary text aliases.
- No border steps as filled component backgrounds.
- No component background steps as borders.
- No page or surface steps as interactive states.
- No disabled text by arbitrary opacity over arbitrary backgrounds.
- No variant that contradicts its canonical recipe.
- No styling attributes outside the shared public contract unless documented.
- No state communicated only through color.
- No high elevation on in-flow static surfaces.
- No accidental generated part classes in headless/classless mode.

## Automated Enforcement

The mechanically checkable subset of these rules is enforced by
`scripts/clarity-audit.cjs`, run in CI via `npm run check:clarity`.

Checked automatically:

| Rule id | Meaning |
|---------|---------|
| `raw-color` | A hex, `rgb()`, `hsl()` value with no Clarity token reference |
| `token-fallback-literal` | A literal used as a `var()` fallback, which still ships a fixed value to consumers without the token file |
| `hand-coded-shadow` | A `box-shadow` built from literals instead of an elevation token |
| `filter-drop-shadow` | A `filter: drop-shadow(...)` built from literals |
| `literal-duration` | A transition or animation duration that is not a `--rad-ui-motion-duration-*` token |
| `literal-spacing` | `padding`/`margin`/`gap` with a dimension literal |
| `literal-radius` | `border-radius` with a dimension literal |
| `literal-typography` | `font-size`/`line-height` with a dimension literal |
| `literal-sizing` | `height`/`min-height` with a dimension literal |

Deliberately not automated, because they need a human or a rendered contrast
check: WCAG contrast ratios, whether a variant contradicts its recipe, whether
elevation is justified, whether state is perceivable without color, and whether
the public anatomy and attribute contracts are correct.

### Baseline Budget

The component styles predate the alias layer, so the audit cannot start from
zero findings. Each rule carries a budget in the script's `BASELINE` map
recording the count when the gate was introduced. CI fails only when a rule goes
above its budget.

This is a ratchet, not a waiver. Lower a budget whenever you fix findings in
that rule so the reduction sticks. Rules with no `BASELINE` entry have a budget
of zero, so adding a new rule fails on its first finding — which is the point,
since adding a rule should be deliberate.

Use `npm run check:clarity -- --update-baseline` to print current counts after
triaging, and `--json` for machine-readable output.

Paying down a family's budget is worth doing a component family at a time. Two
patterns have worked so far:

- When a literal matches an existing token's value exactly, swap the literal for
  that token. Verify the resolved value in compiled CSS before committing;
  nearest-value matching is how a type or size silently shifts.
- When several components repeat the same literal, that literal is a missing
  token, not a bug in each component. Add the step to the scale, regenerate, then
  swap the usages. Regeneration must be idempotent, so confirm it produces no
  diff before you rely on it.

Redefining a shared alias to suit one component is not an option when other
components already read it. Add a component-scoped alias alongside it instead.

### Allow List

Genuinely correct exceptions go in the script's `ALLOW_LIST`, keyed by path and
rule, each with a reason. The script fails on an allow-list entry that no longer
matches a real finding, so an exception cannot outlive the problem it described.
Prefer fixing the token or alias over adding an entry.

## Audit Procedure

Run the audit in this order:

1. Identify the component and all `*.clarity.scss` files involved.
2. Run `npm run check:clarity` to clear the automated rules first, so the
   manual review below starts from a stylesheet that has no token drift.
3. List public anatomy classes used by the styles.
4. Check whether the anatomy follows `{namespace}-{component}-{part}`.
5. List public `data-*` attributes used by selectors.
6. Check whether styling attributes are shared and unprefixed.
7. Map each variant to a canonical recipe.
8. Map each size to control, density, spacing, typography, and icon aliases.
9. Map each radius to control or panel radius aliases.
10. Map each background, border, text, and solid fill to color intent.
11. Check focus treatment against focus aliases.
12. Check elevation against the elevation model.
13. Check motion duration, easing, and reduced-motion behavior.
14. Check contrast for text, icons, borders, state indicators, and focus rings.
15. Classify findings using the audit categories.
16. Only restyle after the recipe and token mapping are clear.

## Review Checklist

Before approving new or changed Clarity styling:

- The component has a documented or obvious recipe.
- The root class includes `root`.
- Public child selectors target documented parts.
- Styling props use `data-variant`, `data-size`, and `data-color`.
- Behavior state uses semantic state attributes.
- Size values use component aliases or raw tokens with a clear reason.
- Radius values use control or panel aliases.
- Color values follow intent and use semantic aliases where possible.
- Focus rings use focus aliases.
- Motion uses duration/easing tokens and respects reduced motion where needed.
- Elevation uses the defined elevation model.
- Text and persistent icons meet contrast requirements.
- Disabled state remains perceivable.
- State is not color-only.
- No local styling exception is being used as a substitute for fixing the
  token, alias, or recipe.

## Rollout Plan

Use this sequence before large styling work:

1. Land this audit spec.
2. Add or refine component recipes as components are audited.
3. Audit current `src/components/ui/**/*.clarity.scss` files.
4. File findings by audit category.
5. Fix shared aliases and tokens before local component styles when multiple
   components show the same problem.
6. Restyle components against the recipe, not against isolated screenshots.
7. Update tests or docs when public anatomy, data attributes, or styling
   contracts change.
