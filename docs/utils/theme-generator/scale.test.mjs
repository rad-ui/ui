// Run with `pnpm test` (node --test; Node strips the TypeScript types).
import { test } from 'node:test'
import assert from 'node:assert/strict'

import {
    AA_TEXT,
    DEFAULT_THEME,
    GRAY_OPTIONS,
    RADIUS_OPTIONS,
    STEPS,
    TEXT_RULES,
    contrastRatio,
    decodeTheme,
    encodeTheme,
    generateTheme,
    normalizeHex,
    oklchToHex,
    parseHex,
    rgbToOklch,
    toCss,
    toTailwind,
} from './scale.ts'

// A spread of awkward brands: light, dark, saturated, gray, out-of-gamut-ish.
const BRANDS = [
    '#5b4fe0', '#ffd60a', '#111111', '#ffffff', '#000000', '#e11d48', '#10b981', '#888888',
    '#00ffff', '#ff00ff', '#0000ff', '#00ff00', '#ff0000', '#7c3aed', '#f97316', '#0ea5e9',
    '#a3e635', '#78350f', '#1e3a8a', '#fde68a', '#334155', '#f0abfc',
]
const APPEARANCES = ['light', 'dark']
const HEX = /^#[0-9a-f]{6}$/

const everyTheme = function* () {
    for (const brand of BRANDS) {
        for (const gray of Object.keys(GRAY_OPTIONS)) {
            yield generateTheme({ ...DEFAULT_THEME, brand, gray })
        }
    }
}

test('contrast ratio matches the WCAG reference values', () => {
    assert.equal(contrastRatio('#000000', '#ffffff').toFixed(2), '21.00')
    assert.equal(contrastRatio('#ffffff', '#ffffff'), 1)
    // #767676 on white is the classic "just passes AA" gray.
    assert.ok(contrastRatio('#767676', '#ffffff') >= 4.5)
    assert.ok(contrastRatio('#777777', '#ffffff') < 4.5)
})

test('hex parsing and OKLCH round trips are stable', () => {
    assert.equal(normalizeHex('ABC'), '#aabbcc')
    assert.equal(normalizeHex('#12345'), null)
    assert.equal(normalizeHex('nope'), null)
    for (const hex of BRANDS) {
        assert.equal(oklchToHex(rgbToOklch(parseHex(hex))), hex, `round trip ${hex}`)
    }
})

test('generation is deterministic', () => {
    for (const brand of BRANDS) {
        const a = generateTheme({ ...DEFAULT_THEME, brand })
        const b = generateTheme({ ...DEFAULT_THEME, brand })
        assert.deepEqual(a, b)
        assert.equal(toCss(a), toCss(b))
    }
})

test('every scale has 12 valid hex steps', () => {
    for (const theme of everyTheme()) {
        for (const appearance of APPEARANCES) {
            for (const scale of [theme.accent[appearance], theme.gray[appearance]]) {
                assert.deepEqual(Object.keys(scale), [...STEPS])
                for (const step of STEPS) assert.match(scale[step], HEX)
            }
        }
    }
})

test('text steps meet AA on the backgrounds they are used on, in both appearances', () => {
    for (const theme of everyTheme()) {
        for (const appearance of APPEARANCES) {
            const accent = theme.accent[appearance]
            const gray = theme.gray[appearance]
            for (const { text, on } of TEXT_RULES) {
                for (const bg of on) {
                    const where = `${theme.brandHex} ${theme.input.gray} ${appearance} ${text} on ${bg}`
                    assert.ok(contrastRatio(gray[text], gray[bg]) >= AA_TEXT, `gray ${where}`)
                    assert.ok(contrastRatio(accent[text], accent[bg]) >= AA_TEXT, `accent ${where}`)
                }
            }
            // Accent text also sits on gray surfaces: outline buttons, links on panels.
            for (const bg of ['50', '100', '200']) {
                assert.ok(contrastRatio(accent['950'], gray[bg]) >= AA_TEXT, `accent 950 on gray ${bg}`)
                assert.ok(contrastRatio(accent['1000'], gray[bg]) >= AA_TEXT, `accent 1000 on gray ${bg}`)
            }
            // Solid buttons: step 50 label on the 950 fill and the 1000 hover fill.
            assert.ok(contrastRatio(accent['50'], accent['950']) >= AA_TEXT)
            assert.ok(contrastRatio(accent['50'], accent['1000']) >= AA_TEXT)
        }
    }
})

test('backgrounds and text run in the right direction for each appearance', () => {
    const lum = (hex) => rgbToOklch(parseHex(hex)).l
    for (const theme of everyTheme()) {
        for (const scale of [theme.gray.light, theme.accent.light]) {
            // Light: 50 -> 700 get darker; text steps are darker than every background.
            for (let i = 1; i < 8; i++) assert.ok(lum(scale[STEPS[i]]) < lum(scale[STEPS[i - 1]]) + 1e-3)
            assert.ok(lum(scale['1000']) < lum(scale['950']))
        }
        for (const scale of [theme.gray.dark, theme.accent.dark]) {
            for (let i = 1; i < 8; i++) assert.ok(lum(scale[STEPS[i]]) > lum(scale[STEPS[i - 1]]) - 1e-3)
            assert.ok(lum(scale['1000']) > lum(scale['950']))
        }
    }
})

test('step 800 is the brand colour in light mode', () => {
    for (const brand of BRANDS) {
        assert.equal(generateTheme({ ...DEFAULT_THEME, brand }).accent.light['800'], brand)
    }
})

test('the neutral gray has no tint', () => {
    const theme = generateTheme({ ...DEFAULT_THEME, brand: '#e11d48', gray: 'neutral' })
    for (const appearance of APPEARANCES) {
        for (const step of STEPS) {
            const hex = theme.gray[appearance][step]
            assert.equal(hex.slice(1, 3), hex.slice(3, 5), `${appearance} ${step} ${hex}`)
            assert.equal(hex.slice(3, 5), hex.slice(5, 7), `${appearance} ${step} ${hex}`)
        }
    }
})

test('URL state round trips and rejects junk', () => {
    const input = { brand: '#0ea5e9', gray: 'slate', radius: 'large', appearance: 'dark' }
    assert.deepEqual(decodeTheme(encodeTheme(input)), input)
    assert.deepEqual(decodeTheme('brand=zzz&gray=nope&radius=huge&mode=sepia'), DEFAULT_THEME)
    assert.deepEqual(decodeTheme(''), DEFAULT_THEME)
})

test('CSS export declares every token for light and dark', () => {
    const theme = generateTheme({ ...DEFAULT_THEME, radius: 'large' })
    const css = toCss(theme)
    const [light, dark] = css.split('[data-rad-ui-theme="dark"]')
    for (const step of STEPS) {
        assert.ok(light.includes(`--rad-ui-color-accent-${step}: ${theme.accent.light[step]};`))
        assert.ok(light.includes(`--rad-ui-color-gray-${step}: ${theme.gray.light[step]};`))
        assert.ok(dark.includes(`--rad-ui-color-accent-${step}: ${theme.accent.dark[step]};`))
        assert.ok(dark.includes(`--rad-ui-color-gray-${step}: ${theme.gray.dark[step]};`))
    }
    assert.ok(light.includes(`--rad-ui-radius-md: ${RADIUS_OPTIONS.large.md};`))
    const tailwind = toTailwind()
    for (const step of STEPS) assert.ok(tailwind.includes(`--color-accent-${step}:`))
})
