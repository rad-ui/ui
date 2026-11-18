'use client'

import { useState } from 'react'
import Link from 'next/link'
import Tabs from '@radui/ui/Tabs'
import { PALETTE_STEPS, paletteHex } from '@/utils/colors/palette-hex'

const familyName = (family: string) => family.charAt(0).toUpperCase() + family.slice(1)

/** One swatch: the colour, its step and hex, copied to the clipboard on click. */
function HexChip({ hex, family, step }: { hex: string; family: string; step: string }) {
    const [copied, setCopied] = useState(false)
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(hex)
            setCopied(true)
            setTimeout(() => setCopied(false), 1400)
        } catch {
            // Clipboard can be blocked (insecure context, permissions); the hex is still on screen to select.
        }
    }
    return (
        <button
            type="button"
            onClick={copy}
            aria-label={`Copy ${familyName(family)} ${step}, ${hex}`}
            className="group flex min-w-0 flex-col overflow-hidden rounded-[6px] border border-gray-400 bg-gray-50 text-left hover:border-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1000"
        >
            <span className="block h-10" style={{ backgroundColor: hex }} aria-hidden="true" />
            <span className="flex flex-col px-1.5 py-1 font-mono text-[0.68rem] leading-4">
                <span className="text-gray-950">{step}</span>
                <span className="truncate text-gray-1000">{copied ? 'copied' : hex}</span>
            </span>
        </button>
    )
}

function HexTable({ mode }: { mode: 'light' | 'dark' }) {
    return (
        <div className="grid gap-5">
            {Object.entries(paletteHex).map(([family, scales]) => (
                <section key={family} aria-labelledby={`hex-${mode}-${family}`}>
                    <h3 id={`hex-${mode}-${family}`} className="mb-2 text-sm font-semibold text-gray-1000">
                        {familyName(family)}
                    </h3>
                    <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 lg:grid-cols-12">
                        {PALETTE_STEPS.map((step, i) => (
                            <HexChip key={step} hex={scales[mode][i]} family={family} step={step} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}

/** Every family's hex codes, light and dark, so the palette can be copied into any project. */
export default function HexCodes() {
    return (
        <section className="border-t border-gray-400 bg-gray-50" aria-labelledby="hex-codes-title">
            <div className="mx-auto w-full max-w-[1440px] px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
                <div className="mb-6 grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
                    <div>
                        <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-gray-950">Hex codes</p>
                        <h2 id="hex-codes-title" className="mt-3 text-3xl font-semibold text-gray-1000">
                            Copy any colour.
                        </h2>
                    </div>
                    <p className="max-w-3xl text-sm leading-6 text-gray-950">
                        All {Object.keys(paletteHex).length} families with their 12 shades in hex, for light and dark
                        mode. Click a swatch to copy it. Text shades 950 and 1000 pass WCAG AA (4.5:1) on shades 50 to 200 of the
                        same family, in both modes. Need a scale from your own brand colour?{' '}
                        <Link href="/theme-generator" className="text-gray-1000 underline">
                            Make one in the theme generator
                        </Link>
                        .
                    </p>
                </div>
                <Tabs.Root defaultValue="light">
                    <Tabs.List aria-label="Colour mode">
                        <Tabs.Trigger value="light">Light mode</Tabs.Trigger>
                        <Tabs.Trigger value="dark">Dark mode</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="light">
                        <div className="pt-5">
                            <HexTable mode="light" />
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="dark">
                        <div className="pt-5">
                            <HexTable mode="dark" />
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </section>
    )
}
