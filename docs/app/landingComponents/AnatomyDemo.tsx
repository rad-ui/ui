'use client'

import { useState } from 'react'
import Tabs from '@radui/ui/Tabs'

type PartKey = 'Root' | 'List' | 'Trigger' | 'Content'

const PARTS: Array<{
    key: PartKey
    summary: string
    code: string
    provides: string[]
}> = [
    {
        key: 'Root',
        summary: 'The coordinator. It owns the selected value and shares state with every child.',
        code: '<Tabs.Root defaultValue="tokens">\n  ...\n</Tabs.Root>',
        provides: ['value state', 'onValueChange', 'orientation', 'activation mode']
    },
    {
        key: 'List',
        summary: 'The keyboard group. It keeps the triggers as one tab stop and moves focus inside.',
        code: '<Tabs.List>\n  ...\n</Tabs.List>',
        provides: ['role="tablist"', 'roving focus', 'aria-orientation']
    },
    {
        key: 'Trigger',
        summary: 'The selectable button. It announces the active tab and points to its panel.',
        code: '<Tabs.Trigger value="tokens">\n  Tokens\n</Tabs.Trigger>',
        provides: ['role="tab"', 'aria-selected', 'aria-controls']
    },
    {
        key: 'Content',
        summary: "The labeled panel. It connects back to its trigger and holds that value's content.",
        code: '<Tabs.Content value="tokens">\n  ...\n</Tabs.Content>',
        provides: ['role="tabpanel"', 'aria-labelledby', 'tabIndex focus target']
    }
]

const PANELS = [
    {
        id: 'tokens',
        label: 'Tokens',
        heading: 'Bring your own tokens',
        body: 'Point the primitives at your own variables. Nothing to override, nothing to fight.',
        stat: '--rad-ui-color-accent-*'
    },
    {
        id: 'parts',
        label: 'Parts',
        heading: 'Compose only what you need',
        body: 'Every component is a set of published parts. Drop the parts your product does not use.',
        stat: '4 published parts'
    },
    {
        id: 'states',
        label: 'States',
        heading: 'State is a data attribute',
        body: 'Open, closed, active and selected are emitted as stable attributes you can style against.',
        stat: 'data-state="active"'
    }
]

function ring(isActive: boolean) {
    return isActive ? 'landing-part-active' : ''
}

/**
 * Click a part, see it highlighted in a real Tabs composition and read
 * the props it is responsible for. The demo uses unmodified Clarity
 * styling on purpose — this section is about anatomy, not appearance.
 */
export default function AnatomyDemo() {
    const [active, setActive] = useState<PartKey>('Trigger')
    const part = PARTS.find((entry) => entry.key === active) ?? PARTS[0]

    return (
        <div className="landing-demo grid gap-px overflow-hidden rounded-lg border border-gray-500 bg-gray-500 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)]">
            <div className="bg-gray-50 p-5 sm:p-7">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-950">
                    learn the parts
                </span>
                <p className="mt-3 max-w-sm text-sm leading-6 text-gray-950">
                    Pick a primitive part to see where it lives in the composition and what behavior it
                    carries for you.
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5" role="group" aria-label="Component parts">
                    {PARTS.map((entry) => {
                        const selected = entry.key === active
                        return (
                            <button
                                key={entry.key}
                                type="button"
                                onClick={() => setActive(entry.key)}
                                aria-pressed={selected}
                                className={`rounded-[5px] border px-2.5 py-1 font-mono text-[0.72rem] transition-colors ${
                                    selected
                                        ? 'border-gray-1000 bg-gray-1000 text-gray-50'
                                        : 'border-gray-400 text-gray-950 hover:border-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {entry.key}
                            </button>
                        )
                    })}
                </div>

                <div className="mt-5 rounded-md border border-gray-400 bg-gray-100 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-950">
                        selected part
                    </p>
                    <h3 className="mt-2 text-lg font-medium text-gray-1000">{part.key}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-950">{part.summary}</p>
                </div>

                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-950">
                    source shape
                </p>
                <pre className="mt-2 whitespace-pre-wrap break-words rounded-md border border-gray-400 bg-gray-100 px-3 py-2.5 font-mono text-[0.72rem] leading-6 text-gray-1000">
                    <code>{part.code}</code>
                </pre>

                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-950">
                    behavior contract
                </p>
                <ul className="mt-4 space-y-1.5">
                    {part.provides.map((item) => (
                        <li
                            key={item}
                            className="flex items-center gap-2 font-mono text-[0.72rem] text-gray-950"
                        >
                            <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-green-1000" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-gray-100 p-5 sm:p-7">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-950">
                        live composition
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-950">
                        highlighted part
                    </span>
                </div>

                <Tabs.Root
                    defaultValue={PANELS[0].id}
                    className={`landing-demo-tabs ${ring(active === 'Root')}`}
                >
                    <Tabs.List
                        className={`${ring(active === 'List')} ${
                            active === 'Trigger' ? 'landing-trigger-parts-active' : ''
                        }`}
                    >
                        {PANELS.map((panel) => (
                            <Tabs.Trigger
                                key={panel.id}
                                value={panel.id}
                            >
                                {panel.label}
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>
                    {PANELS.map((panel) => (
                        <Tabs.Content
                            key={panel.id}
                            value={panel.id}
                            className={ring(active === 'Content')}
                        >
                            <p className="font-medium text-gray-1000">{panel.heading}</p>
                            <p className="mt-1.5 text-sm leading-6 text-gray-950">{panel.body}</p>
                            <p className="mt-3 font-mono text-[0.72rem] text-green-1000">
                                {panel.stat}
                            </p>
                        </Tabs.Content>
                    ))}
                </Tabs.Root>
            </div>
        </div>
    )
}
