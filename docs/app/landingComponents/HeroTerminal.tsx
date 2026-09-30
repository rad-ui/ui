'use client'

import { useEffect, useState } from 'react'

type Line = {
    prompt?: boolean
    text: string
    tone?: 'default' | 'ok' | 'accent'
}

const TRANSCRIPT: Line[] = [
    { prompt: true, text: 'npx create-rad-app@latest' },
    { text: 'scanning  ./src            14 files', tone: 'default' },
    { text: 'ok        next@16 · react@19 · ts 5.2', tone: 'ok' },
    { text: 'ok        63 primitives linked, 0 kB css', tone: 'ok' },
    { text: 'ok        roving focus + aria wired', tone: 'ok' },
    { text: 'ready     your tokens, your components', tone: 'accent' }
]

const TRANSCRIPT_TEXT = TRANSCRIPT.map((line) => line.text).join('\n')

/**
 * The hero object: a terminal transcript that types itself in once.
 *
 * The full transcript always exists in the DOM — the reveal is opacity
 * only — so screen readers get everything and there is no
 * server/client text mismatch to hydrate.
 */
export default function HeroTerminal() {
    const [visible, setVisible] = useState(1)
    const [reduced, setReduced] = useState(false)

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (media.matches) {
            setReduced(true)
            setVisible(TRANSCRIPT.length)
            return
        }

        let cancelled = false
        const timers: ReturnType<typeof setTimeout>[] = []

        const run = () => {
            TRANSCRIPT.forEach((_line, index) => {
                timers.push(
                    setTimeout(() => {
                        if (cancelled) return
                        setVisible(index + 1)
                    }, 420 + index * 520)
                )
            })
        }

        run()

        const cycle = setInterval(run, 9000)
        timers.push(cycle as unknown as ReturnType<typeof setTimeout>)

        return () => {
            cancelled = true
            timers.forEach((timer) => {
                clearTimeout(timer)
                clearInterval(timer)
            })
        }
    }, [])

    const complete = reduced || visible >= TRANSCRIPT.length

    return (
        <div className="overflow-hidden rounded-lg border border-gray-500 bg-gray-100 shadow-[0_24px_70px_color-mix(in_oklab,var(--rad-ui-color-gray-1000)_14%,transparent)]">
            <div className="flex items-center justify-between border-b border-gray-500 px-3.5 py-2.5">
                <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-950">
                    init · rad ui
                </span>
            </div>

            <div className="sr-only">{TRANSCRIPT_TEXT}</div>

            <div aria-hidden className="px-4 py-4 font-mono text-[0.78rem] leading-7 sm:text-[0.82rem]">
                {TRANSCRIPT.map((line, index) => (
                    <div
                        key={line.text}
                        className="flex gap-2.5 transition-opacity duration-300"
                        style={{ opacity: index < visible ? 1 : 0 }}
                    >
                        {line.prompt ? (
                            <span className="shrink-0 text-green-1000">$</span>
                        ) : (
                            <span className="shrink-0" />
                        )}
                        <span
                            className={
                                line.tone === 'ok'
                                    ? 'text-gray-1000'
                                    : line.tone === 'accent'
                                      ? 'text-green-1000'
                                      : 'text-gray-950'
                            }
                        >
                            {line.text}
                        </span>
                    </div>
                ))}
                <div
                    className="flex gap-2.5"
                    style={{ opacity: complete ? 0 : 1 }}
                >
                    <span className="shrink-0 text-green-1000">$</span>
                    <span className="landing-caret inline-block h-[0.95em] w-[0.5em] translate-y-[0.12em] bg-gray-1000" />
                </div>
            </div>
        </div>
    )
}