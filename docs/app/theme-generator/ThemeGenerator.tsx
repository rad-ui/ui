'use client'

import { useContext, useEffect, useMemo, useState } from 'react'
import { Check, Link2, Moon, Sun, X } from 'lucide-react'

import Button from '@radui/ui/Button'
import Select from '@radui/ui/Select'
import Tabs from '@radui/ui/Tabs'
import TextField from '@radui/ui/TextField'
import ToggleGroup from '@radui/ui/ToggleGroup'

import Copy from '@/components/Copy'
import { NavBarContext } from '@/components/Main/NavBar/NavBarContext'
import {
    AA_TEXT,
    AA_UI,
    DEFAULT_THEME,
    GRAY_OPTIONS,
    RADIUS_OPTIONS,
    STEPS,
    contrastReport,
    decodeTheme,
    encodeTheme,
    generateTheme,
    normalizeHex,
    solidOnCanvas,
    toCss,
    toTailwind,
    type Appearance,
    type GrayOption,
    type RadiusOption,
    type Scale,
    type ThemeInput,
} from '@/utils/theme-generator/scale'

import ThemePreview from './ThemePreview'

const PRESETS = [
    { name: 'Iris', hex: '#5b4fe0' },
    { name: 'Ocean', hex: '#0284c7' },
    { name: 'Forest', hex: '#15803d' },
    { name: 'Tangerine', hex: '#f97316' },
    { name: 'Rose', hex: '#e11d48' },
    { name: 'Lemon', hex: '#facc15' },
    { name: 'Ink', hex: '#1f2937' },
]

/** ToggleGroup reports arrays in some modes and strings in others. */
function firstValue(value: unknown): string | undefined {
    if (Array.isArray(value)) return value[0]
    return typeof value === 'string' && value ? value : undefined
}

const toggleItem =
    'rounded-md px-2.5 py-1 text-[0.8125rem] text-gray-950 outline-none transition-colors hover:text-gray-1000 focus-visible:ring-2 focus-visible:ring-gray-1000 data-[state=on]:bg-gray-50 data-[state=on]:text-gray-1000 data-[state=on]:shadow-sm data-[state=on]:ring-1 data-[state=on]:ring-gray-500'

function Field({ label, htmlFor, id, children }: { label: string; htmlFor?: string; id?: string; children: React.ReactNode }) {
    return (
        <div className="grid gap-2">
            {htmlFor ? (
                <label htmlFor={htmlFor} className="text-[0.8125rem] font-medium text-gray-1000">
                    {label}
                </label>
            ) : (
                <span id={id} className="text-[0.8125rem] font-medium text-gray-1000">
                    {label}
                </span>
            )}
            {children}
        </div>
    )
}

export default function ThemeGenerator() {
    const { darkMode } = useContext(NavBarContext)
    const [input, setInput] = useState<ThemeInput>({ ...DEFAULT_THEME, appearance: darkMode ? 'dark' : 'light' })
    const [hexDraft, setHexDraft] = useState(DEFAULT_THEME.brand)
    const [pinnedAppearance, setPinnedAppearance] = useState(false)
    const [linkCopied, setLinkCopied] = useState(false)
    const [ready, setReady] = useState(false)

    // Read a shared theme from the URL once, on the client (the page is static).
    useEffect(() => {
        const search = window.location.search
        if (search) {
            const decoded = decodeTheme(search)
            const params = new URLSearchParams(search)
            if (params.has('mode')) setPinnedAppearance(true)
            else decoded.appearance = darkMode ? 'dark' : 'light'
            setInput(decoded)
            setHexDraft(decoded.brand)
        }
        setReady(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Follow the site's light/dark toggle until the visitor picks one here.
    useEffect(() => {
        if (!ready || pinnedAppearance) return
        setInput((current) => ({ ...current, appearance: darkMode ? 'dark' : 'light' }))
    }, [darkMode, pinnedAppearance, ready])

    // Keep the URL shareable without adding history entries.
    useEffect(() => {
        if (!ready) return
        const url = `${window.location.pathname}?${encodeTheme(input)}`
        window.history.replaceState(window.history.state, '', url)
    }, [input, ready])

    useEffect(() => {
        if (!linkCopied) return
        const timeout = setTimeout(() => setLinkCopied(false), 2000)
        return () => clearTimeout(timeout)
    }, [linkCopied])

    const theme = useMemo(() => generateTheme(input), [input])
    const css = useMemo(() => toCss(theme), [theme])
    const tailwind = useMemo(() => toTailwind(), [])
    const hexValid = normalizeHex(hexDraft) !== null

    const setBrand = (value: string) => {
        setHexDraft(value)
        const hex = normalizeHex(value)
        if (hex) setInput((current) => ({ ...current, brand: hex }))
    }

    const copyLink = () => {
        const url = `${window.location.origin}${window.location.pathname}?${encodeTheme(input)}`
        navigator.clipboard?.writeText(url)
        setLinkCopied(true)
    }

    return (
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start xl:grid-cols-[20rem_minmax(0,1fr)]">
            {/* ── Controls ─────────────────────────────── */}
            <section
                aria-label="Theme settings"
                className="grid gap-5 rounded-xl border border-gray-400 bg-gray-100 p-4 sm:p-5 lg:sticky lg:top-4"
            >
                <Field label="Brand colour" htmlFor="theme-generator-hex">
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            aria-label="Pick a brand colour"
                            value={theme.brandHex}
                            onChange={(event) => setBrand(event.target.value)}
                            className="h-9 w-11 shrink-0 cursor-pointer rounded-md border border-gray-500 bg-gray-50 p-0.5"
                        />
                        <TextField.Root className="min-w-0 flex-1">
                            <TextField.Input
                                id="theme-generator-hex"
                                value={hexDraft}
                                spellCheck={false}
                                autoComplete="off"
                                aria-invalid={!hexValid}
                                aria-describedby="theme-generator-hex-hint"
                                onChange={(event) => setBrand(event.target.value)}
                                className="font-mono"
                            />
                        </TextField.Root>
                    </div>
                    <p id="theme-generator-hex-hint" className="text-[0.8125rem] text-gray-950">
                        {hexValid ? 'Hex, like #5b4fe0. It becomes step 800.' : 'Use a hex colour like #5b4fe0 or #f90.'}
                    </p>
                    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Example brand colours">
                        {PRESETS.map((preset) => (
                            <button
                                key={preset.hex}
                                type="button"
                                aria-label={preset.name}
                                aria-pressed={theme.brandHex === preset.hex}
                                title={preset.name}
                                onClick={() => setBrand(preset.hex)}
                                className="grid h-7 w-7 place-items-center rounded-full outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-gray-1000 aria-pressed:ring-2 aria-pressed:ring-gray-1000 aria-pressed:ring-offset-2 aria-pressed:ring-offset-gray-100"
                            >
                                <span aria-hidden className="h-5 w-5 rounded-full border border-black/10" style={{ background: preset.hex }} />
                            </button>
                        ))}
                    </div>
                </Field>

                <Field label="Gray" id="theme-generator-gray">
                    <div style={{ ['--rad-select-width' as string]: '100%' }}>
                        <Select.Root
                            value={input.gray}
                            onValueChange={(value: string) => {
                                if (value in GRAY_OPTIONS) setInput((current) => ({ ...current, gray: value as GrayOption }))
                            }}
                        >
                            <Select.Trigger aria-labelledby="theme-generator-gray">Choose a gray</Select.Trigger>
                            <Select.Content>
                                <Select.Group>
                                    {(Object.keys(GRAY_OPTIONS) as GrayOption[]).map((key) => (
                                        <Select.Item key={key} value={key}>
                                            <Select.Indicator />
                                            {GRAY_OPTIONS[key].label}
                                        </Select.Item>
                                    ))}
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    </div>
                </Field>

                <Field label="Radius" id="theme-generator-radius">
                    <ToggleGroup.Root
                        type="single"
                        value={[input.radius]}
                        onValueChange={(value: unknown) => {
                            const next = firstValue(value)
                            if (next && next in RADIUS_OPTIONS) setInput((current) => ({ ...current, radius: next as RadiusOption }))
                        }}
                        aria-labelledby="theme-generator-radius"
                        className="grid grid-cols-4 rounded-lg bg-gray-200 p-0.5"
                    >
                        {(Object.keys(RADIUS_OPTIONS) as RadiusOption[]).map((key) => (
                            <ToggleGroup.Item key={key} value={key} className={`${toggleItem} min-h-8 px-1`}>
                                {RADIUS_OPTIONS[key].label}
                            </ToggleGroup.Item>
                        ))}
                    </ToggleGroup.Root>
                </Field>

                <Field label="Preview" id="theme-generator-appearance">
                    <ToggleGroup.Root
                        type="single"
                        value={[input.appearance]}
                        onValueChange={(value: unknown) => {
                            const next = firstValue(value)
                            if (next === 'light' || next === 'dark') {
                                setPinnedAppearance(true)
                                setInput((current) => ({ ...current, appearance: next }))
                            }
                        }}
                        aria-labelledby="theme-generator-appearance"
                        className="grid grid-cols-2 rounded-lg bg-gray-200 p-0.5"
                    >
                        <ToggleGroup.Item value="light" className={`${toggleItem} inline-flex min-h-8 items-center justify-center gap-1.5`}>
                            <Sun className="h-3.5 w-3.5" aria-hidden />
                            Light
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value="dark" className={`${toggleItem} inline-flex min-h-8 items-center justify-center gap-1.5`}>
                            <Moon className="h-3.5 w-3.5" aria-hidden />
                            Dark
                        </ToggleGroup.Item>
                    </ToggleGroup.Root>
                </Field>

                <div className="grid gap-2 border-t border-gray-400 pt-4">
                    <Button type="button" variant="outline" onClick={copyLink}>
                        {linkCopied ? <Check className="h-4 w-4" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
                        {linkCopied ? 'Link copied' : 'Copy link to this theme'}
                    </Button>
                    <p className="text-[0.8125rem] text-gray-950">The whole theme lives in the URL, so the link is the theme.</p>
                    <span className="sr-only" aria-live="polite">
                        {linkCopied ? 'Link copied' : ''}
                    </span>
                </div>
            </section>

            {/* ── Output ───────────────────────────────── */}
            <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-10">
                <section aria-labelledby="theme-generator-preview-title" className="grid grid-cols-[minmax(0,1fr)] gap-3">
                    <h2 id="theme-generator-preview-title" className="text-lg font-semibold text-gray-1000">
                        Live preview <span className="font-normal text-gray-950">· {input.appearance}</span>
                    </h2>
                    <ThemePreview theme={theme} appearance={input.appearance} siteDark={Boolean(darkMode)} />
                </section>

                <section aria-labelledby="theme-generator-scales-title" className="grid grid-cols-[minmax(0,1fr)] gap-5">
                    <div>
                        <h2 id="theme-generator-scales-title" className="text-lg font-semibold text-gray-1000">
                            Scales and contrast
                        </h2>
                        <p className="mt-1 max-w-[62ch] text-sm leading-6 text-gray-950">
                            Twelve steps per scale, in Rad UI's token names. Text steps 950 and 1000 are checked against
                            every background step they sit on. AA needs 4.5:1 for body text.
                        </p>
                    </div>
                    {(['light', 'dark'] as Appearance[]).map((appearance) => (
                        <div key={appearance} className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 rounded-xl border border-gray-400 p-4">
                            <h3 className="text-[0.9375rem] font-semibold capitalize text-gray-1000">{appearance}</h3>
                            <ScaleRow name="accent" scale={theme.accent[appearance]} />
                            <ScaleRow name="gray" scale={theme.gray[appearance]} />
                            <div className="grid gap-4 xl:grid-cols-2">
                                <ContrastTable name="Accent" scale={theme.accent[appearance]} />
                                <ContrastTable name="Gray" scale={theme.gray[appearance]} />
                            </div>
                            <SolidNote scale={theme.accent[appearance]} />
                        </div>
                    ))}
                </section>

                <section id="theme-generator-export" aria-labelledby="theme-generator-export-title" className="grid grid-cols-[minmax(0,1fr)] scroll-mt-4 gap-3">
                    <h2 id="theme-generator-export-title" className="text-lg font-semibold text-gray-1000">
                        Export
                    </h2>
                    <p className="max-w-[62ch] text-sm leading-6 text-gray-950">
                        Save the CSS as a file and load it after <code className="break-all font-mono text-gray-1000">@radui/ui/themes/default.css</code>.
                        Your <code className="font-mono text-gray-1000">&lt;Theme&gt;</code> keeps working as before, now in your colours.
                    </p>
                    <Tabs.Root defaultValue="css" className="min-w-0 max-w-full">
                        <Tabs.List aria-label="Export format">
                            <Tabs.Trigger value="css">CSS variables</Tabs.Trigger>
                            <Tabs.Trigger value="tailwind">Tailwind v4</Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value="css">
                            <CodeBlock code={css} label="rad-ui-theme.css" />
                        </Tabs.Content>
                        <Tabs.Content value="tailwind">
                            <CodeBlock code={tailwind} label="globals.css" />
                        </Tabs.Content>
                    </Tabs.Root>
                </section>
            </div>
        </div>
    )
}

function ScaleRow({ name, scale }: { name: string; scale: Scale }) {
    return (
        <div className="grid gap-2">
            <p className="font-mono text-[0.8125rem] text-gray-1000">--rad-ui-color-{name}-*</p>
            <ol className="grid grid-cols-6 gap-1.5 sm:grid-cols-12" aria-label={`${name} scale`}>
                {STEPS.map((step) => (
                    <li key={step} className="min-w-0">
                        <span
                            aria-hidden
                            className="block h-10 rounded-md border border-black/10"
                            style={{ background: scale[step] }}
                        />
                        <span className="mt-1 block font-mono text-[0.75rem] text-gray-1000">{step}</span>
                        <span className="block truncate font-mono text-[0.6875rem] text-gray-950">{scale[step]}</span>
                    </li>
                ))}
            </ol>
        </div>
    )
}

function Verdict({ pass, label }: { pass: boolean; label: string }) {
    return (
        <span className="inline-flex items-center gap-1 font-medium text-gray-1000">
            {pass ? <Check className="h-3.5 w-3.5" aria-hidden /> : <X className="h-3.5 w-3.5" aria-hidden />}
            {pass ? label : 'Fail'}
        </span>
    )
}

function ContrastTable({ name, scale }: { name: string; scale: Scale }) {
    const rows = contrastReport(scale)
    return (
        <div className="min-w-0 overflow-x-auto">
            <table className="w-full text-left text-[0.8125rem]">
                <caption className="pb-2 text-left font-medium text-gray-1000">{name} text</caption>
                <thead>
                    <tr className="border-b border-gray-400 text-gray-950">
                        <th scope="col" className="py-1.5 pr-3 font-medium">Sample</th>
                        <th scope="col" className="py-1.5 pr-3 font-medium">Text on</th>
                        <th scope="col" className="py-1.5 pr-3 font-medium">Ratio</th>
                        <th scope="col" className="py-1.5 font-medium">AA</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={`${row.text}-${row.on}`} className="border-b border-gray-300">
                            <td className="py-1.5 pr-3">
                                {/* The sample is the real pair; it passes by construction. */}
                                <span
                                    className="inline-block rounded px-1.5 py-0.5 font-medium"
                                    style={{ color: scale[row.text], background: scale[row.on] }}
                                >
                                    Aa
                                </span>
                            </td>
                            <td className="py-1.5 pr-3 font-mono text-gray-1000">
                                {row.text} / {row.on}
                            </td>
                            <td className="py-1.5 pr-3 font-mono tabular-nums text-gray-1000">{row.ratio.toFixed(2)}:1</td>
                            <td className="py-1.5">
                                <Verdict pass={row.pass} label={row.ratio >= 7 ? 'AAA' : 'Pass'} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function SolidNote({ scale }: { scale: Scale }) {
    const ratio = solidOnCanvas(scale)
    const pass = ratio >= AA_UI
    return (
        <p className="text-[0.8125rem] leading-6 text-gray-950">
            <span className="font-medium text-gray-1000">Brand fill (800) on the page (50):</span>{' '}
            <span className="font-mono text-gray-1000">{ratio.toFixed(2)}:1</span>.{' '}
            {pass
                ? 'Switches, radios and progress bars clear the 3:1 non-text minimum.'
                : `Below the 3:1 non-text minimum. Light brands like this read fine as fills next to a border, but consider a deeper shade if a switch or progress bar must stand on its own.`}{' '}
            Button labels use 50 on 950, which always clears {AA_TEXT}:1.
        </p>
    )
}

function CodeBlock({ code, label }: { code: string; label: string }) {
    return (
        <div className="mt-3 overflow-hidden rounded-xl border border-gray-400 bg-gray-100">
            <div className="flex items-center justify-between gap-3 border-b border-gray-400 px-3 py-1.5">
                <span className="font-mono text-[0.8125rem] text-gray-950">{label}</span>
                <Copy content={code} />
            </div>
            <pre className="max-h-[28rem] overflow-auto p-4 font-mono text-[0.8125rem] leading-6 text-gray-1000">
                <code>{code}</code>
            </pre>
        </div>
    )
}
