
# Clarity Design System

This is Rad UI's neutral clarity scale. It uses these public token names:

`50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`, `1000`

Each step represents a **specific UI intent**, not just a color. Do not treat the
numbers as arbitrary lightness values or as a linear color ramp.

---

## Core Principles

### 1. Perceptual Consistency
- Steps must feel evenly spaced to the human eye
- Do NOT use linear interpolation blindly
- Avoid muddy midtones or sudden jumps

Bad:
- 400 → 500 barely changes
- 700 → 800 jumps too much

Good:
- Smooth, predictable progression

---

### 2. Intent-Based Design (VERY IMPORTANT)

Use the `50` through `1000` scale by intent, including the `950` text step.
Components should rely on semantic aliases first, then map those aliases to the
scale.

| Step | Token | Category                  | Usage Description |
|------|------|---------------------------|------------------|
| 1    | 50   | Backgrounds               | App/page background, lowest visual weight |
| 2    | 100  | Backgrounds               | Subtle surfaces, section backgrounds, cards, sidebars, code blocks |
| 3    | 200  | Component backgrounds     | Default UI element background |
| 4    | 300  | Component backgrounds     | Hovered UI element background |
| 5    | 400  | Component backgrounds     | Active, pressed, or selected UI element background |
| 6    | 500  | Borders & separators      | Subtle borders and separators for non-interactive surfaces |
| 7    | 600  | Borders & focus rings     | Default borders on interactive components, default focus rings |
| 8    | 700  | Strong borders            | Hovered interactive borders, stronger focus rings, high-emphasis separators |
| 9    | 800  | Solid backgrounds         | Solid fills for high-emphasis components and visual anchors |
| 10   | 900  | Solid hover               | Hovered solid fills |
| 11   | 950  | Accessible text           | Secondary/supporting text, readable foregrounds with slightly lower emphasis |
| 12   | 1000 | High-contrast text        | Headings, primary text, icons, and maximum-contrast foregrounds |

---

Notes:

- If a component is transparent by default, use `200` for its hover background.
- Use `800` for the default solid fill and `900` for its hover state.
- Use `950` for secondary or supporting text when it meets the required contrast on the chosen background.
- Use `1000` for primary foreground content.
- Do not introduce `1` through `12` public tokens. Rad UI uses `50` through `1000`.

### 3. Semantic Alias Mapping

Prefer semantic aliases in component APIs, docs, and examples. The raw scale
tokens should remain the implementation mapping.

| Alias | Token | Usage |
|-------|-------|-------|
| `appBackground` | `50` | Main page or app background |
| `surfaceSubtle` | `100` | Subtle sections, sidebars, cards, code blocks |
| `elementBackground` | `200` | Default UI element background |
| `elementHover` | `300` | Hovered UI element background |
| `elementActive` | `400` | Active, pressed, or selected UI element background |
| `borderSubtle` | `500` | Non-interactive borders and separators |
| `borderDefault` | `600` | Interactive component borders and default focus rings |
| `borderStrong` | `700` | Hovered borders, strong focus rings, high-emphasis separators |
| `solidBackground` | `800` | Default solid fills for high-emphasis components |
| `solidHover` | `900` | Hovered solid fills |
| `textSecondary` | `950` | Supporting text when contrast passes |
| `textPrimary` | `1000` | Primary text, headings, and icons |

### 4. Rules / What Not To Do

These rules protect the scale from drifting into one-off styling decisions.

- Do not use raw hex values in components when a scale token or semantic alias exists.
- Do not introduce extra neutral steps such as `25`, `75`, `150`, or `1100`.
- Do not introduce `1` through `12` public tokens. Rad UI uses `50` through `1000`.
- Do not use a token outside its intended role just because it looks close in one context.
- Do not use `900` for text; use `950` for supporting text or `1000` for primary text.
- Do not use `700` or `800` for body text unless the contrast has been explicitly checked.
- Do not use `800` as a solid background without defining the matching `900` hover state.
- Do not use `200`, `300`, or `400` as borders; those steps are for component backgrounds.
- Do not use `500`, `600`, or `700` as filled component backgrounds; those steps are for borders and focus states.
- Do not use `50` or `100` for interactive states; they are background and surface steps.
- Do not make disabled text by lowering opacity over arbitrary colors; use the appropriate semantic disabled token once defined.
- Do not mix semantic aliases and raw tokens in the same component API.
- Do not encode visual state only through color. Pair state with data attributes, ARIA state, or another accessible signal when needed.
- Do not add hue to the neutral scale. Semantic colors must be defined separately.
- Do not create component-specific private grayscale ramps.

### 5. No Pure Extremes

- ❌ No `#ffffff`
- ❌ No `#000000`

Why?
Pure colors feel harsh and break layering.

Instead:
- 50 → neutral white — no hue tint (off-white, not `#ffffff`)
- 1000 → neutral near-black — no hue tint (not `#000000`)

---

### 6. Neutral Only

- No hue tint (including blue/green/purple); chroma stays at zero
- True grayscale only: neutral white through neutral near-black

If you want semantic colors, define them separately.

---

### 7. Accessibility First

- Text (`950` and `1000`) must meet **WCAG AA**
- Borders (`500` through `700`) must be visible but not distracting
- Avoid low contrast adjacent steps

---

## Reference Scale (Baseline)

This is the default Rad UI grayscale.

```json
{
  "50": "hsl(0, 0%, 99.0%)",
  "100": "hsl(0, 0%, 97.8%)",
  "200": "hsl(0, 0%, 95.3%)",
  "300": "hsl(0, 0%, 92.4%)",
  "400": "hsl(0, 0%, 89.5%)",
  "500": "hsl(0, 0%, 86.3%)",
  "600": "hsl(0, 0%, 80.9%)",
  "700": "hsl(0, 0%, 71.0%)",
  "800": "hsl(0, 0%, 56.1%)",
  "900": "hsl(0, 0%, 50.3%)",
  "950": "hsl(0, 0%, 39.3%)",
  "1000": "hsl(0, 0%, 13.0%)"
}
```
