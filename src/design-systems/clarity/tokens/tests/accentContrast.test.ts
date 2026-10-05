import colors from '../colors';

/**
 * WCAG 2.2 AA guard for the accent scales.
 *
 * Components rely on these pairings (see knowledge/design_system/clarity_audit_spec.md):
 * - solid fills: step 50 text on a step 950 fill (Button, Badge, Avatar fallback);
 * - readable accent text: step 950 on the page (gray 50), panel (gray 100),
 *   subtle (own 100) and component-background (own 200) surfaces;
 * - primary accent text: step 1000 on the component background (own 200).
 * Normal-size text needs at least 4.5:1, in both light and dark themes.
 */

type Rgb = [number, number, number];

const srgbToLinear = (value: number) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
const clamp = (value: number) => Math.min(1, Math.max(0, value));

const oklchToLinear = (l: number, c: number, h: number): Rgb => {
    const a = c * Math.cos((h * Math.PI) / 180);
    const b = c * Math.sin((h * Math.PI) / 180);
    const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s_ = (l - 0.0894841775 * a - 1.2914855480 * b) ** 3;
    return [
        clamp(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_),
        clamp(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_),
        clamp(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_)
    ];
};

const hslToLinear = (h: number, s: number, l: number): Rgb => {
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [f(0), f(8), f(4)].map(srgbToLinear) as Rgb;
};

const toLinear = (color: string): Rgb => {
    const value = color.trim();
    let match = value.match(/^#([0-9a-f]{6})$/i);
    if (match) {
        const n = parseInt(match[1], 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(channel => srgbToLinear(channel / 255)) as Rgb;
    }
    match = value.match(/^oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)$/);
    if (match) return oklchToLinear(Number(match[1]), Number(match[2]), Number(match[3]));
    match = value.match(/^hsl\(([\d.]+),\s*([\d.]+)%,\s*([\d.]+)%\)$/);
    if (match) return hslToLinear(Number(match[1]), Number(match[2]) / 100, Number(match[3]) / 100);
    throw new Error(`Unsupported color format: ${color}`);
};

const luminance = ([r, g, b]: Rgb) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const contrast = (a: string, b: string) => {
    const [high, low] = [luminance(toLinear(a)), luminance(toLinear(b))].sort((x, y) => y - x);
    return (high + 0.05) / (low + 0.05);
};

type Scale = Record<'light' | 'dark', Record<string, string>>;
const accentScales = Object.entries(colors as unknown as Record<string, Scale>)
    .filter(([name]) => name !== 'black' && name !== 'white');

const cases = accentScales.flatMap(([name]) => (['light', 'dark'] as const).map(mode => [name, mode] as const));

describe('Clarity accent scales meet WCAG AA for their text pairings', () => {
    test.each(cases)('%s (%s)', (name, mode) => {
        const scale = (colors as unknown as Record<string, Scale>)[name][mode];
        const gray = (colors.gray as unknown as Scale)[mode];
        const pairs: Record<string, number> = {
            '50 on 950 (solid fill)': contrast(scale['50'], scale['950']),
            '950 on page': contrast(scale['950'], gray['50']),
            '950 on panel': contrast(scale['950'], gray['100']),
            '950 on own 100': contrast(scale['950'], scale['100']),
            '950 on own 200': contrast(scale['950'], scale['200']),
            '1000 on own 200': contrast(scale['1000'], scale['200'])
        };
        const failing = Object.entries(pairs)
            .filter(([, ratio]) => ratio < 4.5)
            .map(([pair, ratio]) => `${pair}: ${ratio.toFixed(2)}`);
        expect(failing).toEqual([]);
    });
});
