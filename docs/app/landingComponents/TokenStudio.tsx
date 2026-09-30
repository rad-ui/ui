'use client'

import { useEffect, useRef, useState } from 'react'
import Button from '@radui/ui/Button'
import Badge from '@radui/ui/Badge'
import Switch from '@radui/ui/Switch'

const BRANDS = [
    { id: 'green', label: 'Green' },
    { id: 'violet', label: 'Violet' },
    { id: 'blue', label: 'Blue' },
    { id: 'amber', label: 'Amber' },
    { id: 'rose', label: 'Rose' }
] as const

const RADII = [
    { id: '0px', label: 'Square' },
    { id: '6px', label: 'Soft' },
    { id: '12px', label: 'Round' },
    { id: '9999px', label: 'Pill' }
] as const

type BrandId = (typeof BRANDS)[number]['id']

/**
 * The proof for "bring your own styles": real Rad UI components whose
 * appearance is driven entirely by three custom properties. Nothing here
 * comes from the library.
 */
export default function TokenStudio() {
    const [brand, setBrand] = useState<BrandId>('green')
    const [radius, setRadius] = useState<string>('9999px')
    const [shipped, setShipped] = useState(false)
    const [optIn, setOptIn] = useState(true)
    const [resolved, setResolved] = useState<Record<string, string> | null>(null)
    const stage = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const node = stage.current
        if (!node || typeof window === 'undefined') return

        const styles = window.getComputedStyle(node)
        const read = (name: string) => styles.getPropertyValue(name).trim()
        setResolved({
            brand: read('--landing-brand'),
            fg: read('--landing-brand-fg'),
            radius
        })
    }, [brand, radius])

    return (
        <div className="landing-studio overflow-hidden rounded-lg border border-gray-500 bg-gray-100" data-brand={brand}>
            <div className="grid gap-px bg-gray-500 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
                <div className="bg-gray-100 p-5 sm:p-6">
                    <fieldset>
                        <legend className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-950">
                            your accent
                        </legend>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {BRANDS.map((option) => {
                                const id = `landing-brand-${option.id}`
                                const checked = brand === option.id
                                return (
                                    <label
                                        key={option.id}
                                        htmlFor={id}
                                        className={`inline-flex cursor-pointer items-center gap-2 rounded-[5px] border px-2.5 py-1.5 font-mono text-[0.72rem] transition-colors ${
                                            checked
                                                ? 'border-gray-1000 bg-gray-200 text-gray-1000'
                                                : 'border-gray-400 text-gray-950 hover:border-gray-700'
                                        }`}
                                    >
                                        <input
                                            id={id}
                                            type="radio"
                                            name="landing-brand"
                                            value={option.id}
                                            checked={checked}
                                            onChange={() => setBrand(option.id)}
                                            className="sr-only"
                                        />
                                        <span
                                            aria-hidden
                                            data-brand={option.id}
                                            className="landing-swatch h-3 w-3 rounded-full border border-black/20"
                                            style={{ background: 'var(--landing-brand)' }}
                                        />
                                        {option.label}
                                    </label>
                                )
                            })}
                        </div>
                    </fieldset>

                    <fieldset className="mt-6">
                        <legend className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-950">
                            your radius
                        </legend>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {RADII.map((option) => {
                                const id = `landing-radius-${option.id.replace('px', '')}`
                                const checked = radius === option.id
                                return (
                                    <label
                                        key={option.id}
                                        htmlFor={id}
                                        className={`inline-flex cursor-pointer items-center gap-2 rounded-[5px] border px-2.5 py-1.5 font-mono text-[0.72rem] transition-colors ${
                                            checked
                                                ? 'border-gray-1000 bg-gray-200 text-gray-1000'
                                                : 'border-gray-400 text-gray-950 hover:border-gray-700'
                                        }`}
                                    >
                                        <input
                                            id={id}
                                            type="radio"
                                            name="landing-radius"
                                            value={option.id}
                                            checked={checked}
                                            onChange={() => setRadius(option.id)}
                                            className="sr-only"
                                        />
                                        {option.label}
                                    </label>
                                )
                            })}
                        </div>
                    </fieldset>

                    <pre className="mt-6 overflow-x-auto rounded-md border border-gray-400 bg-gray-50 px-3 py-3 font-mono text-[0.72rem] leading-6 text-gray-1000">
                        <code>{`--brand: ${resolved?.brand ?? '…'};\n--brand-fg: ${resolved?.fg ?? '…'};\n--radius: ${resolved?.radius ?? radius};`}</code>
                    </pre>
                    <p className="mt-2 text-[0.78rem] leading-5 text-gray-950">
                        Read back from the live DOM. Rad UI never sees any of them.
                    </p>
                </div>

                <div ref={stage} className="bg-gray-50 p-5 sm:p-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-950">
                        unstyled primitives
                    </span>

                    <div
                        style={{
                            ['--landing-radius' as string]: radius,
                            borderRadius: 'var(--landing-radius)'
                        }}
                        className="mt-4 flex flex-wrap items-center gap-3 border border-gray-400 p-5"
                    >
                        <Button
                            variant="solid"
                            size="medium"
                            onClick={() => setShipped((value) => !value)}
                            style={{
                                background: 'var(--landing-brand)',
                                color: 'var(--landing-brand-fg)',
                                borderRadius: 'var(--landing-radius)'
                            }}
                        >
                            {shipped ? 'Shipped' : 'Ship it'}
                        </Button>

                        <Badge
                            variant="solid"
                            size="medium"
                            style={{
                                background: 'var(--landing-brand)',
                                color: 'var(--landing-brand-fg)',
                                borderRadius: 'var(--landing-radius)'
                            }}
                        >
                            v1.0
                        </Badge>

                        <span className="inline-flex items-center gap-2">
                            <Switch.Root
                                checked={optIn}
                                onCheckedChange={setOptIn}
                                aria-label="Beta opt in"
                            >
                                <Switch.Thumb />
                            </Switch.Root>
                            <span className="text-sm text-gray-1000">Beta</span>
                        </span>
                    </div>

                    <p className="mt-4 text-[0.85rem] leading-6 text-gray-950">
                        Three properties. Different accent, different radius, same three components.
                        Toggle the switch, tab to the button, and notice that the library has no
                        opinion about any of it.
                    </p>
                </div>
            </div>
        </div>
    )
}