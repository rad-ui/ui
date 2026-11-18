// Pure colour maths for the theme generator (/theme-generator).
//
// Everything here is deterministic: the same inputs always give the same hex
// values. No DOM, no randomness, no imports, so `node --test` can run it
// directly (see scale.test.mjs) and the page can run it in the browser.
//
// The model, in short:
// - Work in OKLCH. Each of the 12 Rad UI steps (50 ... 1000) has a target
//   lightness per appearance and a share of the brand's chroma.
// - Step 800 is the brand colour itself (the solid accent, used by switches,
//   progress, radios and the focus ring). 900 is its hover shade.
// - Any colour outside sRGB keeps its lightness and hue and loses chroma until
//   it fits, so nothing is clipped unpredictably by the browser.
// - Text steps are then pushed darker (light) or lighter (dark) until they meet
//   WCAG AA against every background step they are used on. Contrast is
//   measured on the final 8-bit hex values, which is exactly what renders.

export const STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950', '1000'] as const
export type Step = (typeof STEPS)[number]
export type Appearance = 'light' | 'dark'
export type Scale = Record<Step, string>

export const AA_TEXT = 4.5
export const AA_UI = 3

/**
 * Where each text step is used in the Clarity theme, and on what.
 * 950: secondary text (--rad-ui-text-secondary) on canvas/panel/muted, and the
 *      solid button fill with step 50 as its label.
 * 1000: primary text, and soft/outline button labels on 200-400 hover fills.
 */
export const TEXT_RULES: { text: Step; on: Step[] }[] = [
    { text: '950', on: ['50', '100', '200'] },
    { text: '1000', on: ['50', '100', '200', '300', '400'] },
]

export const GRAY_OPTIONS = {
    neutral: { label: 'Neutral', hue: 0, chroma: 0 },
    brand: { label: 'Brand-tinted', hue: null, chroma: 0.014 },
    slate: { label: 'Slate', hue: 255, chroma: 0.016 },
    mauve: { label: 'Mauve', hue: 300, chroma: 0.014 },
    sage: { label: 'Sage', hue: 160, chroma: 0.012 },
    olive: { label: 'Olive', hue: 120, chroma: 0.012 },
    sand: { label: 'Sand', hue: 75, chroma: 0.012 },
} as const
export type GrayOption = keyof typeof GRAY_OPTIONS

export const RADIUS_OPTIONS = {
    none: { label: 'None', sm: '0px', md: '0px', lg: '0px', xl: '0px' },
    small: { label: 'Small', sm: '0.125rem', md: '0.25rem', lg: '0.375rem', xl: '0.5rem' },
    medium: { label: 'Medium', sm: '0.375rem', md: '0.5rem', lg: '0.75rem', xl: '1rem' },
    large: { label: 'Large', sm: '0.625rem', md: '0.875rem', lg: '1.125rem', xl: '1.5rem' },
} as const
export type RadiusOption = keyof typeof RADIUS_OPTIONS

export type ThemeInput = {
    brand: string
    gray: GrayOption
    radius: RadiusOption
    appearance: Appearance
}

export const DEFAULT_THEME: ThemeInput = { brand: '#5b4fe0', gray: 'brand', radius: 'medium', appearance: 'light' }

// ── Colour spaces ────────────────────────────────────────────────────────────

export type Rgb = { r: number; g: number; b: number } // 0..1, gamma-encoded sRGB
export type Oklch = { l: number; c: number; h: number }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/** Accepts #rgb, #rrggbb, with or without the hash. Returns null otherwise. */
export function parseHex(input: string): Rgb | null {
    const raw = input.trim().replace(/^#/, '').toLowerCase()
    const full = /^[0-9a-f]{3}$/.test(raw) ? raw.split('').map((ch) => ch + ch).join('') : raw
    if (!/^[0-9a-f]{6}$/.test(full)) return null
    return {
        r: parseInt(full.slice(0, 2), 16) / 255,
        g: parseInt(full.slice(2, 4), 16) / 255,
        b: parseInt(full.slice(4, 6), 16) / 255,
    }
}

/** Normalises any accepted hex to lowercase #rrggbb, or null. */
export function normalizeHex(input: string): string | null {
    const rgb = parseHex(input)
    return rgb ? toHex(rgb) : null
}

export function toHex({ r, g, b }: Rgb): string {
    const part = (v: number) => Math.round(clamp(v, 0, 1) * 255).toString(16).padStart(2, '0')
    return `#${part(r)}${part(g)}${part(b)}`
}

const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))
const fromLinear = (v: number) => (v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055)

export function rgbToOklch(rgb: Rgb): Oklch {
    const r = toLinear(rgb.r)
    const g = toLinear(rgb.g)
    const b = toLinear(rgb.b)
    const l_ = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
    const m_ = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
    const s_ = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
    const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
    const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
    const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_
    const c = Math.sqrt(A * A + B * B)
    let h = (Math.atan2(B, A) * 180) / Math.PI
    if (h < 0) h += 360
    return { l: L, c, h: c < 1e-4 ? 0 : h }
}

/** OKLCH to sRGB without clamping; values may fall outside 0..1. */
function oklchToRgbRaw({ l, c, h }: Oklch): Rgb {
    const hr = (h * Math.PI) / 180
    const A = c * Math.cos(hr)
    const B = c * Math.sin(hr)
    const l_ = Math.pow(l + 0.3963377774 * A + 0.2158037573 * B, 3)
    const m_ = Math.pow(l - 0.1055613458 * A - 0.0638541728 * B, 3)
    const s_ = Math.pow(l - 0.0894841775 * A - 1.291485548 * B, 3)
    return {
        r: fromLinear(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_),
        g: fromLinear(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_),
        b: fromLinear(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_),
    }
}

const inGamut = ({ r, g, b }: Rgb) => [r, g, b].every((v) => v >= -1e-6 && v <= 1 + 1e-6)

/** Keeps lightness and hue, lowers chroma until the colour fits sRGB. */
export function oklchToRgb(color: Oklch): Rgb {
    const l = clamp(color.l, 0, 1)
    let rgb = oklchToRgbRaw({ ...color, l })
    if (inGamut(rgb)) return rgb
    let low = 0
    let high = color.c
    for (let i = 0; i < 24; i++) {
        const mid = (low + high) / 2
        if (inGamut(oklchToRgbRaw({ l, c: mid, h: color.h }))) low = mid
        else high = mid
    }
    rgb = oklchToRgbRaw({ l, c: low, h: color.h })
    return { r: clamp(rgb.r, 0, 1), g: clamp(rgb.g, 0, 1), b: clamp(rgb.b, 0, 1) }
}

export const oklchToHex = (color: Oklch) => toHex(oklchToRgb(color))

// ── Contrast (WCAG 2.x) ──────────────────────────────────────────────────────

export function relativeLuminance(hex: string): number {
    const rgb = parseHex(hex)
    if (!rgb) throw new Error(`Not a hex colour: ${hex}`)
    return 0.2126 * toLinear(rgb.r) + 0.7152 * toLinear(rgb.g) + 0.0722 * toLinear(rgb.b)
}

export function contrastRatio(a: string, b: string): number {
    const la = relativeLuminance(a)
    const lb = relativeLuminance(b)
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

// ── Scale generation ─────────────────────────────────────────────────────────

// Target OKLCH lightness per step. 800 and 900 come from the brand instead.
const LIGHTNESS: Record<Appearance, Record<'accent' | 'gray', number[]>> = {
    light: {
        accent: [0.99, 0.975, 0.955, 0.932, 0.905, 0.872, 0.826, 0.745, 0.63, 0.59, 0.5, 0.27],
        gray: [0.993, 0.982, 0.962, 0.94, 0.918, 0.893, 0.852, 0.772, 0.645, 0.6, 0.5, 0.25],
    },
    dark: {
        accent: [0.165, 0.19, 0.24, 0.28, 0.32, 0.365, 0.43, 0.52, 0.63, 0.68, 0.8, 0.93],
        gray: [0.17, 0.2, 0.235, 0.27, 0.305, 0.345, 0.41, 0.5, 0.58, 0.63, 0.78, 0.94],
    },
}

// Share of the brand's chroma each step keeps.
const CHROMA_SHARE: Record<Appearance, number[]> = {
    light: [0.06, 0.14, 0.24, 0.34, 0.44, 0.52, 0.62, 0.78, 1, 1, 0.82, 0.5],
    dark: [0.14, 0.16, 0.34, 0.48, 0.56, 0.6, 0.64, 0.76, 1, 1, 0.72, 0.32],
}

/** Dark backgrounds need a brand fill that reads; lift very dark brands to this. */
const DARK_MIN_SOLID_L = 0.55

const minContrast = (scale: Scale, text: Step, on: Step[], extra: string[] = []) =>
    Math.min(...on.map((bg) => contrastRatio(scale[text], scale[bg])), ...extra.map((bg) => contrastRatio(scale[text], bg)))

/**
 * Moves one text step's lightness until it meets `target` against its
 * backgrounds (in this scale and any extra backgrounds). Light themes go
 * darker, dark themes go lighter. Always terminates: pure black/white clears
 * AA against every background the tables above can produce.
 */
function enforceText(
    scale: Scale,
    step: Step,
    on: Step[],
    base: Oklch,
    appearance: Appearance,
    extra: string[],
): Scale {
    const direction = appearance === 'light' ? -1 : 1
    let l = base.l
    let next = scale
    for (let i = 0; i < 200 && minContrast(next, step, on, extra) < AA_TEXT; i++) {
        l = clamp(l + direction * 0.005, 0, 1)
        next = { ...next, [step]: oklchToHex({ ...base, l }) }
        if (l === 0 || l === 1) break
    }
    return next
}

type ScaleSpec = {
    hue: number
    chroma: number
    kind: 'accent' | 'gray'
    appearance: Appearance
    /** The brand colour for accent scales: becomes step 800. */
    anchor?: Oklch
    /** Backgrounds from another scale that this scale's text must also clear. */
    extraBackgrounds?: Partial<Record<Step, string>>
}

export function generateScale(spec: ScaleSpec): Scale {
    const { hue, chroma, kind, appearance, anchor } = spec
    const lightness = LIGHTNESS[appearance][kind]
    const share = kind === 'accent' ? CHROMA_SHARE[appearance] : STEPS.map((_, i) => (i === 0 ? 0.6 : 1))
    const plan: Oklch[] = STEPS.map((_, i) => ({ l: lightness[i], c: chroma * share[i], h: hue }))

    if (anchor) {
        const solid = { ...anchor }
        if (appearance === 'dark' && solid.l < DARK_MIN_SOLID_L) solid.l = DARK_MIN_SOLID_L
        const hoverShift = appearance === 'light' ? -0.045 : 0.05
        plan[8] = solid
        plan[9] = { ...solid, l: clamp(solid.l + hoverShift, 0, 1) }
    }

    let scale = Object.fromEntries(STEPS.map((step, i) => [step, oklchToHex(plan[i])])) as Scale
    // The brand stays exactly as typed in light mode.
    if (anchor && appearance === 'light' && spec.anchor) scale['800'] = oklchToHex(anchor)

    for (const rule of TEXT_RULES) {
        const index = STEPS.indexOf(rule.text)
        const extra = rule.on.map((bg) => spec.extraBackgrounds?.[bg]).filter(Boolean) as string[]
        scale = enforceText(scale, rule.text, rule.on, plan[index], appearance, extra)
    }
    return scale
}

export type GeneratedTheme = {
    input: ThemeInput
    brandHex: string
    accent: Record<Appearance, Scale>
    gray: Record<Appearance, Scale>
}

/** The whole theme: accent + gray, light + dark. Invalid hex falls back to the default brand. */
export function generateTheme(input: ThemeInput): GeneratedTheme {
    const brandHex = normalizeHex(input.brand) ?? DEFAULT_THEME.brand
    const brand = rgbToOklch(parseHex(brandHex) as Rgb)
    const grayOption = GRAY_OPTIONS[input.gray] ?? GRAY_OPTIONS.neutral
    const grayHue = grayOption.hue ?? brand.h
    // A gray tinted by an almost-gray brand should stay almost gray.
    const grayChroma = grayOption.hue === null ? Math.min(grayOption.chroma, brand.c * 0.25) : grayOption.chroma

    const build = (appearance: Appearance) => {
        const gray = generateScale({ hue: grayHue, chroma: grayChroma, kind: 'gray', appearance })
        // Accent text sits on gray surfaces too (outline buttons, links on panels).
        const accent = generateScale({
            hue: brand.h,
            chroma: brand.c,
            kind: 'accent',
            appearance,
            anchor: brand,
            extraBackgrounds: { '50': gray['50'], '100': gray['100'], '200': gray['200'] },
        })
        return { gray, accent }
    }
    const light = build('light')
    const dark = build('dark')
    return {
        input: { ...input, brand: brandHex },
        brandHex,
        accent: { light: light.accent, dark: dark.accent },
        gray: { light: light.gray, dark: dark.gray },
    }
}

// ── Reports and export ───────────────────────────────────────────────────────

export type ContrastCheck = { text: Step; on: Step; ratio: number; pass: boolean }

export function contrastReport(scale: Scale): ContrastCheck[] {
    return TEXT_RULES.flatMap((rule) =>
        rule.on.map((bg) => {
            const ratio = contrastRatio(scale[rule.text], scale[bg])
            return { text: rule.text, on: bg, ratio, pass: ratio >= AA_TEXT }
        }),
    )
}

/** Non-text contrast of the solid brand step on the page background (WCAG 1.4.11). */
export const solidOnCanvas = (scale: Scale) => contrastRatio(scale['800'], scale['50'])

export function themeVars(theme: GeneratedTheme, appearance: Appearance): Record<string, string> {
    const vars: Record<string, string> = {}
    for (const step of STEPS) vars[`--rad-ui-color-gray-${step}`] = theme.gray[appearance][step]
    for (const step of STEPS) vars[`--rad-ui-color-accent-${step}`] = theme.accent[appearance][step]
    const radius = RADIUS_OPTIONS[theme.input.radius] ?? RADIUS_OPTIONS.medium
    for (const size of ['sm', 'md', 'lg', 'xl'] as const) vars[`--rad-ui-radius-${size}`] = radius[size]
    return vars
}

const block = (selector: string, vars: Record<string, string>) =>
    `${selector} {\n${Object.entries(vars).map(([name, value]) => `  ${name}: ${value};`).join('\n')}\n}`

export function toCss(theme: GeneratedTheme): string {
    const light = themeVars(theme, 'light')
    const dark = Object.fromEntries(Object.entries(themeVars(theme, 'dark')).filter(([name]) => !name.includes('radius')))
    return [
        `/* Rad UI theme: brand ${theme.brandHex}, ${GRAY_OPTIONS[theme.input.gray].label.toLowerCase()} gray, ${RADIUS_OPTIONS[theme.input.radius].label.toLowerCase()} radius.`,
        ` * Load after @radui/ui/themes/default.css. Overrides the gray and accent`,
        ` * scales for every <Theme>, light and dark. Text steps 950 and 1000 meet`,
        ` * WCAG AA (4.5:1) on steps 50-200 and 50-400. */`,
        block(':root,\n[data-rad-ui-theme]', light),
        '',
        block('[data-rad-ui-theme="dark"]', dark),
        '',
    ].join('\n')
}

export function toTailwind(): string {
    return [
        `/* globals.css: Tailwind v4. The Rad UI preset already maps gray-*;`,
        ` * this adds accent-* (bg-accent-800, text-accent-1000, ...). */`,
        `@import "tailwindcss";`,
        `@import "@radui/ui/themes/tailwind-presets/default.css";`,
        `@import "./rad-ui-theme.css"; /* the CSS from the first tab */`,
        ``,
        `@theme inline {`,
        ...STEPS.map((step) => `  --color-accent-${step}: oklch(from var(--rad-ui-color-accent-${step}) l c h);`),
        ...(['sm', 'md', 'lg', 'xl'] as const).map((size) => `  --radius-${size}: var(--rad-ui-radius-${size});`),
        `}`,
        ``,
    ].join('\n')
}

// ── URL state ────────────────────────────────────────────────────────────────

export function encodeTheme(input: ThemeInput): string {
    const params = new URLSearchParams()
    params.set('brand', (normalizeHex(input.brand) ?? DEFAULT_THEME.brand).slice(1))
    params.set('gray', input.gray)
    params.set('radius', input.radius)
    params.set('mode', input.appearance)
    return params.toString()
}

export function decodeTheme(search: string): ThemeInput {
    const params = new URLSearchParams(search)
    const brand = normalizeHex(params.get('brand') ?? '') ?? DEFAULT_THEME.brand
    const gray = params.get('gray') as GrayOption
    const radius = params.get('radius') as RadiusOption
    const mode = params.get('mode')
    return {
        brand,
        gray: gray && gray in GRAY_OPTIONS ? gray : DEFAULT_THEME.gray,
        radius: radius && radius in RADIUS_OPTIONS ? radius : DEFAULT_THEME.radius,
        appearance: mode === 'dark' || mode === 'light' ? mode : DEFAULT_THEME.appearance,
    }
}
