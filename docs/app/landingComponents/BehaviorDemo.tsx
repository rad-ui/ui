'use client'

import { useState, type FocusEvent } from 'react'
import Accordion from '@radui/ui/Accordion'
import Switch from '@radui/ui/Switch'
import Kbd from '@radui/ui/Kbd'

const ITEMS = [
    {
        id: 'focus',
        question: 'Focus never gets lost',
        answer:
            'Focus moves into overlays on open, cycles inside them while open, and returns to the trigger on close. Rad UI owns that contract so your dialogs cannot strand a keyboard user.'
    },
    {
        id: 'roving',
        question: 'Groups are a single tab stop',
        answer:
            'Tab lists, toolbars, menus and radio groups share one roving tabindex. Tab moves past the group; arrow keys move inside it.'
    },
    {
        id: 'motion',
        question: 'Reduced motion is respected',
        answer:
            'Transitions that move or scale meaningful UI collapse under prefers-reduced-motion. You keep the state change; the movement goes.'
    }
]

const GUARANTEES = [
    ['Focus management', 'Trap, restore, and return targets'],
    ['Roving focus', 'One tab stop per composite'],
    ['Keyboard bindings', 'WAI-ARIA patterns, not inventions'],
    ['ARIA wiring', 'Roles, ids and relationships'],
    ['Portals + scrim', 'Layering without z-index wars'],
    ['Reduced motion', 'Honoured before paint']
]

export default function BehaviorDemo() {
    const [focus, setFocus] = useState<string>('nothing focused')

    const track = (label: string) => (event: FocusEvent) => {
        if (event.currentTarget === event.target) setFocus(label)
    }

    return (
        <div className="landing-demo overflow-hidden rounded-lg border border-gray-600 bg-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-500 px-4 py-2.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-950">
                    keyboard path
                </span>
                <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-gray-950">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green-1000" />
                    focus: {focus}
                </span>
            </div>

            <div className="grid gap-px bg-gray-500 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
                <div className="bg-gray-100 p-5 sm:p-6">
                    <Accordion.Root
                        type="single"
                        collapsible
                        defaultValue={["focus"]}
                        className="w-full"
                        onFocus={track('accordion trigger')}
                    >
                        {ITEMS.map((item) => (
                            <Accordion.Item key={item.id} value={item.id}>
                                <Accordion.Header>
                                    <Accordion.Trigger onFocus={track(`trigger · ${item.id}`)}>
                                        {item.question}
                                    </Accordion.Trigger>
                                </Accordion.Header>
                                <Accordion.Content>{item.answer}</Accordion.Content>
                            </Accordion.Item>
                        ))}
                    </Accordion.Root>

                    <div className="mt-6 flex items-center justify-between border-t border-gray-500 pt-4">
                        <label
                            htmlFor="landing-behaviour-switch"
                            className="text-sm text-gray-1000"
                        >
                            Reduced motion
                        </label>
                        <Switch.Root
                            id="landing-behaviour-switch"
                            onFocus={track('switch')}
                            className="shrink-0"
                        >
                            <Switch.Thumb />
                        </Switch.Root>
                    </div>
                </div>

                <div className="bg-gray-50 p-5 sm:p-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-950">
                        try it
                    </span>
                    <ul className="mt-4 space-y-2.5 text-sm leading-6 text-gray-950">
                        <li className="flex items-center gap-2">
                            <Kbd size="small">Tab</Kbd>
                            <span>step to the first trigger</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Kbd size="small">↓</Kbd>
                            <span>move inside the group</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Kbd size="small">Enter</Kbd>
                            <span>toggle the panel</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Kbd size="small">Tab</Kbd>
                            <span>leave — the group is one stop</span>
                        </li>
                    </ul>

                    <dl className="mt-6 border-t border-gray-500 pt-4">
                        {GUARANTEES.map(([name, detail]) => (
                            <div
                                key={name}
                                className="flex items-baseline justify-between gap-4 border-b border-gray-400 py-2 last:border-b-0"
                            >
                                <dt className="font-mono text-[0.72rem] text-gray-1000">{name}</dt>
                                <dd className="text-right text-[0.78rem] leading-5 text-gray-950">
                                    {detail}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}