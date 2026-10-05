'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from 'lucide-react'

import Kbd from '@radui/ui/Kbd'
import RadioGroup from '@radui/ui/RadioGroup'
import Slider from '@radui/ui/Slider'
import Tabs from '@radui/ui/Tabs'
import ToggleGroup from '@radui/ui/ToggleGroup'

const GROUPS = [
    { id: 'format', label: 'Toggle group' },
    { id: 'align', label: 'Toggle group' },
    { id: 'tabs', label: 'Tabs' },
    { id: 'plan', label: 'Radio group' },
    { id: 'size', label: 'Slider' }
] as const

type Inspected = {
    group: string | null
    element: string
    name: string
    attrs: [string, string][]
}

const KEY_LABELS: Record<string, string> = {
    ArrowLeft: '←',
    ArrowRight: '→',
    ArrowUp: '↑',
    ArrowDown: '↓',
    ' ': 'Space',
    Escape: 'Esc'
}

function accessibleName(el: HTMLElement): string {
    const label = el.getAttribute('aria-label')
    if (label) return label
    const labelledBy = el.getAttribute('aria-labelledby')
    if (labelledBy) {
        const text = labelledBy
            .split(' ')
            .map((id) => el.ownerDocument.getElementById(id)?.textContent?.trim())
            .filter(Boolean)
            .join(' ')
        if (text) return text
    }
    return el.textContent?.trim() || '—'
}

function inspect(el: HTMLElement): Inspected {
    const attrs: [string, string][] = []
    for (const { name, value } of Array.from(el.attributes)) {
        if (name === 'aria-label' || name === 'aria-labelledby' || name === 'aria-controls' || name === 'id') continue
        if (name.startsWith('aria-') || name.startsWith('data-state') || name === 'role' || name === 'tabindex') {
            attrs.push([name, value])
        }
    }
    attrs.sort(([a], [b]) => (a === 'role' ? -1 : b === 'role' ? 1 : a.localeCompare(b)))
    const group = el.closest<HTMLElement>('[data-landing-group]')?.dataset.landingGroup ?? null
    return { group, element: el.tagName.toLowerCase(), name: accessibleName(el), attrs }
}

export default function KeyboardDemo() {
    const rootRef = useRef<HTMLDivElement | null>(null)
    const [current, setCurrent] = useState<Inspected | null>(null)
    const [keys, setKeys] = useState<{ id: number; key: string }[]>([])
    const keyId = useRef(0)

    const refresh = useCallback(() => {
        const root = rootRef.current
        const active = typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null
        if (!root || !active || !root.contains(active)) {
            setCurrent(null)
            return
        }
        setCurrent(inspect(active))
    }, [])

    useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const observer = new MutationObserver(refresh)
        observer.observe(root, { subtree: true, attributes: true })
        return () => observer.disconnect()
    }, [refresh])

    const onKeyDown = (event: KeyboardEvent) => {
        const key = KEY_LABELS[event.key] ?? (event.key.length === 1 ? event.key.toUpperCase() : event.key)
        keyId.current += 1
        const id = keyId.current
        setKeys((prev) => [...prev.slice(-5), { id, key: event.shiftKey && key === 'Tab' ? '⇧ Tab' : key }])
        // Attributes may update after the key handler; read them on the next frame too.
        requestAnimationFrame(refresh)
    }

    return (
        <div className="grid overflow-hidden rounded-2xl border border-gray-400 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div
                ref={rootRef}
                onFocus={refresh}
                onBlur={() => requestAnimationFrame(refresh)}
                onKeyDownCapture={onKeyDown}
                onPointerUp={() => requestAnimationFrame(refresh)}
                className="grid content-center gap-7 bg-gray-50 p-6 sm:p-8"
            >
                <div className="flex flex-wrap items-center gap-3">
                    <div data-landing-group="format">
                        <ToggleGroup.Root type="multiple" defaultValue={['bold']} aria-label="Text formatting">
                            <ToggleGroup.Item value="bold" aria-label="Bold" iconOnly>
                                <Bold size={16} />
                            </ToggleGroup.Item>
                            <ToggleGroup.Item value="italic" aria-label="Italic" iconOnly>
                                <Italic size={16} />
                            </ToggleGroup.Item>
                            <ToggleGroup.Item value="underline" aria-label="Underline" iconOnly>
                                <Underline size={16} />
                            </ToggleGroup.Item>
                        </ToggleGroup.Root>
                    </div>
                    <div data-landing-group="align">
                        <ToggleGroup.Root type="single" defaultValue={['left']} aria-label="Alignment">
                            <ToggleGroup.Item value="left" aria-label="Align left" iconOnly>
                                <AlignLeft size={16} />
                            </ToggleGroup.Item>
                            <ToggleGroup.Item value="center" aria-label="Align center" iconOnly>
                                <AlignCenter size={16} />
                            </ToggleGroup.Item>
                            <ToggleGroup.Item value="right" aria-label="Align right" iconOnly>
                                <AlignRight size={16} />
                            </ToggleGroup.Item>
                        </ToggleGroup.Root>
                    </div>
                </div>

                <div data-landing-group="tabs">
                    <Tabs.Root defaultValue="preview">
                        <Tabs.List aria-label="Editor view">
                            <Tabs.Trigger value="write">Write</Tabs.Trigger>
                            <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
                            <Tabs.Trigger value="history">History</Tabs.Trigger>
                        </Tabs.List>
                    </Tabs.Root>
                </div>

                <div data-landing-group="plan">
                    <RadioGroup.Root defaultValue="team" aria-label="Plan" className="flex flex-wrap gap-x-6 gap-y-2">
                        {['Hobby', 'Team', 'Enterprise'].map((label) => (
                            <RadioGroup.Label key={label}>
                                <RadioGroup.Item value={label.toLowerCase()}>
                                    <RadioGroup.Indicator />
                                </RadioGroup.Item>
                                {label}
                            </RadioGroup.Label>
                        ))}
                    </RadioGroup.Root>
                </div>

                <div data-landing-group="size" className="max-w-sm">
                    <Slider aria-label="Font size" defaultValue={16} min={10} max={32} />
                </div>
            </div>

            <div className="flex min-w-0 flex-col gap-6 border-t border-gray-400 bg-gray-100 p-6 sm:p-8 lg:border-l lg:border-t-0">
                <div>
                    <p className="text-sm font-medium text-gray-1000">Tab stops</p>
                    <ol className="mt-3 flex flex-wrap gap-1.5" aria-label="Tab stops in the demo">
                        {GROUPS.map((group, index) => {
                            const on = current?.group === group.id
                            return (
                                <li
                                    key={group.id}
                                    className={`rounded-full px-2.5 py-1 text-[0.8125rem] transition-colors duration-200 ${
                                        on ? 'bg-gray-1000 text-gray-50' : 'bg-gray-200 text-gray-950'
                                    }`}
                                >
                                    {index + 1}. {group.label}
                                </li>
                            )
                        })}
                    </ol>
                    <p className="mt-3 text-sm leading-6 text-gray-950">
                        Five widgets, five tab stops. Arrow keys move inside each one.
                    </p>
                </div>

                <div className="lg:min-h-[268px] border-t border-gray-400 pt-5">
                    <p className="text-sm font-medium text-gray-1000">Focused element</p>
                    {current ? (
                        <div className="mt-2 font-mono text-[0.8125rem] leading-6">
                            <p className="text-gray-1000">
                                &lt;{current.element}&gt;{' '}
                                <span className="font-sans text-gray-950">“{current.name}”</span>
                            </p>
                            <dl className="mt-1 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
                                {current.attrs.map(([name, value]) => (
                                    <div key={name} className="contents">
                                        <dt className="text-gray-950">{name}</dt>
                                        <dd className="truncate font-semibold text-gray-1000">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    ) : (
                        <p className="mt-2 text-sm leading-6 text-gray-950">
                            Click or tab into any control, then use the arrow keys, Home, End and Space.
                        </p>
                    )}
                </div>

                <div className="border-t border-gray-400 pt-5">
                    <p className="text-sm font-medium text-gray-1000">Keys</p>
                    <div className="mt-2 flex min-h-7 flex-wrap items-center gap-1.5" aria-hidden>
                        {keys.length ? (
                            keys.map((k) => (
                                <span key={k.id} className="landing-pop">
                                    <Kbd size="small">{k.key}</Kbd>
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-gray-950">Nothing pressed yet</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
