'use client'

import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import Checkbox from '@radui/ui/Checkbox'
import Slider from '@radui/ui/Slider'
import Switch from '@radui/ui/Switch'
import Tabs from '@radui/ui/Tabs'
import Theme from '@radui/ui/Theme'
import ToggleGroup from '@radui/ui/ToggleGroup'

import { NavBarContext } from '@/components/Main/NavBar/NavBarContext'

import Unthemed from './Unthemed'

type Mode = 'clarity' | 'none' | 'custom'

const MODES: { id: Mode; label: string; setup: string; note: string }[] = [
    {
        id: 'clarity',
        label: 'Clarity theme',
        setup: `import "@radui/ui/themes/default.css"\n\n<Theme classNamespace="rad-ui">\n  <App />\n</Theme>`,
        note: 'The optional Clarity stylesheet targets generated rad-ui-* classes.'
    },
    {
        id: 'none',
        label: 'No styles',
        setup: `// no stylesheet, no generated classes\n\n<Theme>\n  <App />\n</Theme>`,
        note: 'Nothing visual is left, but every role, ARIA attribute and key binding still works. Try the arrow keys.'
    },
    {
        id: 'custom',
        label: 'Your CSS',
        setup: `<Switch.Root\n  className="rounded-full bg-gray-400\n    data-[state=checked]:bg-violet-900"\n>\n  <Switch.Thumb className="…" />\n</Switch.Root>`,
        note: 'Style straight off the data-state contract, with Tailwind, CSS modules or plain CSS.'
    }
]

const VIOLET = 'var(--rad-ui-color-violet-900)'

/** Utility classes only applied in "Your CSS" mode. Note every state hook is a data-* attribute. */
const custom = {
    tabsList: 'inline-flex gap-1 rounded-full bg-gray-200 p-1',
    tabsTrigger:
        'rounded-full px-3.5 py-1.5 text-sm font-medium text-gray-950 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--rad-ui-color-violet-800)] data-[state=active]:bg-gray-50 data-[state=active]:text-gray-1000 data-[state=active]:shadow-sm',
    switchRoot:
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-gray-500 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--rad-ui-color-violet-800)] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 data-[state=checked]:bg-[var(--rad-ui-color-violet-900)]',
    switchThumb:
        'block h-5 w-5 translate-x-0.5 rounded-full bg-gray-50 shadow-md transition-transform duration-200 data-[state=checked]:translate-x-[22px]',
    checkbox:
        'grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 border-gray-700 text-gray-50 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--rad-ui-color-violet-800)] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 data-[state=checked]:border-transparent data-[state=checked]:bg-[var(--rad-ui-color-violet-900)] [&_svg]:h-3.5 [&_svg]:w-3.5',
    sliderRoot: 'relative flex h-6 w-full touch-none select-none items-center',
    sliderTrack: 'relative h-1.5 w-full grow rounded-full bg-gray-300',
    sliderRange: 'h-full rounded-full bg-[var(--rad-ui-color-violet-900)]',
    sliderThumb:
        'absolute top-1/2 block h-5 w-5 -translate-y-1/2 rounded-full border-2 border-[var(--rad-ui-color-violet-900)] bg-gray-50 shadow-md outline-none focus-visible:ring-4 focus-visible:ring-[var(--rad-ui-color-violet-500)]'
}

type Readout = { label: string; attrs: [string, string][] }

const WATCHED = ['role', 'aria-checked', 'aria-valuenow', 'data-state', 'tabindex', 'class']

function readAttrs(el: Element | null): [string, string][] {
    if (!el) return []
    return WATCHED.filter((name) => el.hasAttribute(name)).map((name) => {
        const value = el.getAttribute(name) ?? ''
        // Utility class lists are long; the point is only that they are yours.
        return [name, name === 'class' && value.length > 34 ? `${value.slice(0, 32).trimEnd()} …` : value] as [
            string,
            string
        ]
    })
}

export default function HeadlessDemo() {
    const { darkMode } = useContext(NavBarContext)
    const [mode, setMode] = useState<Mode>('clarity')
    const [readouts, setReadouts] = useState<Readout[]>([])

    const stageRef = useRef<HTMLDivElement | null>(null)
    const switchRef = useRef<HTMLButtonElement | null>(null)
    const checkboxRef = useRef<HTMLButtonElement | null>(null)
    const thumbRef = useRef<HTMLElement | null>(null)

    const sync = useCallback(() => {
        setReadouts([
            { label: 'Switch', attrs: readAttrs(switchRef.current) },
            { label: 'Checkbox', attrs: readAttrs(checkboxRef.current) },
            { label: 'Slider thumb', attrs: readAttrs(thumbRef.current) }
        ])
    }, [])

    // Mirror the real DOM: whatever the component writes, the panel shows.
    useEffect(() => {
        const stage = stageRef.current
        if (!stage) return
        sync()
        const observer = new MutationObserver(sync)
        observer.observe(stage, { subtree: true, attributes: true, attributeFilter: WATCHED })
        return () => observer.disconnect()
    }, [sync, mode])

    const pick = (value: unknown) => {
        const next = Array.isArray(value) ? value[0] : value
        if (next === 'clarity' || next === 'none' || next === 'custom') setMode(next)
    }

    const isCustom = mode === 'custom'
    const active = MODES.find((m) => m.id === mode) ?? MODES[0]
    const c = (key: keyof typeof custom) => (isCustom ? custom[key] : undefined)

    return (
        <div>
            <Unthemed>
                <ToggleGroup.Root
                    type="single"
                    value={[mode]}
                    onValueChange={pick}
                    aria-label="Styling mode"
                    className="inline-flex flex-wrap rounded-xl bg-gray-200 p-1"
                >
                    {MODES.map((m) => (
                        <ToggleGroup.Item
                            key={m.id}
                            value={m.id}
                            className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-950 outline-none transition-colors hover:text-gray-1000 focus-visible:ring-2 focus-visible:ring-gray-1000 data-[state=on]:bg-gray-50 data-[state=on]:text-gray-1000 data-[state=on]:shadow-sm data-[state=on]:ring-1 data-[state=on]:ring-gray-500"
                        >
                            {m.label}
                        </ToggleGroup.Item>
                    ))}
                </ToggleGroup.Root>
            </Unthemed>

            <div className="mt-5 grid overflow-hidden rounded-2xl border border-gray-400 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
                {/* The stage: same JSX in every mode, only the Theme namespace and className change. */}
                <Theme
                    id="landing-headless-stage"
                    appearance={darkMode ? 'dark' : 'light'}
                    accentColor="gray"
                    classNamespace={mode === 'clarity' ? 'rad-ui' : undefined}
                    className="bg-gray-50 text-gray-1000"
                >
                    <div ref={stageRef} className="grid min-h-[300px] max-w-md content-center gap-7 p-6 sm:p-8">
                        <Tabs.Root defaultValue="week">
                            <Tabs.List aria-label="Range" className={c('tabsList')}>
                                <Tabs.Trigger value="day" className={c('tabsTrigger')}>
                                    Day
                                </Tabs.Trigger>
                                <Tabs.Trigger value="week" className={c('tabsTrigger')}>
                                    Week
                                </Tabs.Trigger>
                                <Tabs.Trigger value="month" className={c('tabsTrigger')}>
                                    Month
                                </Tabs.Trigger>
                            </Tabs.List>
                        </Tabs.Root>

                        <div className="flex items-center justify-between gap-4">
                            <label htmlFor="landing-headless-switch" className="text-[0.9375rem]">
                                Auto-sync
                            </label>
                            <Switch.Root
                                ref={switchRef}
                                id="landing-headless-switch"
                                defaultChecked
                                className={c('switchRoot')}
                            >
                                <Switch.Thumb className={c('switchThumb')} />
                            </Switch.Root>
                        </div>

                        <label className="flex items-center gap-3 text-[0.9375rem]">
                            <Checkbox.Root ref={checkboxRef} className={c('checkbox')}>
                                <Checkbox.Indicator />
                            </Checkbox.Root>
                            Email me a summary
                        </label>

                        <div className="grid gap-2">
                            <span id="landing-headless-volume" className="text-[0.9375rem]">
                                Volume
                            </span>
                            <Slider.Root defaultValue={60} className={c('sliderRoot')}>
                                <Slider.Track className={c('sliderTrack')}>
                                    <Slider.Range className={c('sliderRange')}>
                                        <Slider.Thumb
                                            ref={thumbRef}
                                            aria-labelledby="landing-headless-volume"
                                            className={c('sliderThumb')}
                                        />
                                    </Slider.Range>
                                </Slider.Track>
                            </Slider.Root>
                        </div>
                    </div>
                </Theme>

                <div className="flex min-w-0 flex-col gap-5 border-t border-gray-400 bg-gray-100 p-6 sm:p-8 lg:border-l lg:border-t-0">
                    <div>
                        <p className="text-sm font-medium text-gray-1000">Setup</p>
                        <pre className="mt-2 overflow-x-auto font-mono text-[0.8125rem] leading-6 text-gray-1000">
                            <code>{active.setup}</code>
                        </pre>
                        <p className="mt-2 text-sm leading-6 text-gray-950">{active.note}</p>
                    </div>

                    <div className="border-t border-gray-400 pt-5">
                        <p className="text-sm font-medium text-gray-1000">Live DOM</p>
                        <div className="mt-2 grid gap-3" aria-live="off">
                            {readouts.map((item) => (
                                <div key={item.label} className="min-w-0">
                                    <p className="text-[0.8125rem] text-gray-950">{item.label}</p>
                                    <p className="mt-0.5 break-words font-mono text-[0.78rem] leading-5 text-gray-1000">
                                        {item.attrs.map(([name, value]) => (
                                            <span key={name} className="mr-2 inline-block">
                                                <span className="text-gray-950">{name}=</span>
                                                <span
                                                    className={
                                                        name === 'data-state' || name.startsWith('aria-')
                                                            ? 'font-semibold'
                                                            : name === 'class'
                                                              ? ''
                                                              : ''
                                                    }
                                                    style={
                                                        name === 'data-state' || name.startsWith('aria-')
                                                            ? { color: VIOLET }
                                                            : undefined
                                                    }
                                                >
                                                    &quot;{value}&quot;
                                                </span>
                                            </span>
                                        ))}
                                        {!item.attrs.some(([name]) => name === 'class') ? (
                                            <span className="inline-block text-gray-950">no class</span>
                                        ) : null}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
