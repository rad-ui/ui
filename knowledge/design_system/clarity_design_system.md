
Each step represents a **specific UI intent**, not just a color.

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


| Step | Token | Category                  | Usage Description |
|------|------|---------------------------|------------------|
| 1    | 50   | Backgrounds               | App/page background, lowest visual weight |
| 2    | 100  | Backgrounds               | Subtle surfaces, section backgrounds |
| 3    | 200  | Interactive components    | Hover backgrounds, subtle interaction states |
| 4    | 300  | Interactive components    | Active/pressed states, stronger surface contrast |
| 5    | 400  | Interactive components    | Selected states, emphasized surfaces |
| 6    | 500  | Borders & separators      | Light borders, dividers |
| 7    | 600  | Borders & separators      | Default borders, stronger separators |
| 8    | 700  | Solid colors              | Disabled text/icons, muted UI elements
| 9    | 800  | Solid colors              | supporting content
| 10   | 900  | Accessible text           | Secondary text, high readability |
| 11   | 1000 | Accessible text           | Headings,Primary text, max contrast text (near black) |
---

### 3. No Pure Extremes

- ❌ No `#ffffff`
- ❌ No `#000000`

Why?
Pure colors feel harsh and break layering.

Instead:
- 50 → slightly tinted white
- 1000 → slightly lifted black

---

### 4. Neutral Only

- No blue/green/purple tint
- True grayscale only

If you want semantic colors, define them separately.

---

### 5. Accessibility First

- Text (900–1000) must meet **WCAG AA**
- Borders (400–500) must be visible but not distracting
- Avoid low contrast adjacent steps

---

## Reference Scale (Baseline)

This is the default Rad UI grayscale.

```json
{
  "50":  "#fafafa",
  "100": "#f4f4f5",
  "200": "#e4e4e7",
  "300": "#d4d4d8",
  "400": "#a1a1aa",
  "500": "#71717a",
  "600": "#52525b",
  "700": "#3f3f46",
  "800": "#27272a",
  "900": "#18181b",
  "1000": "#0f0f11"
}