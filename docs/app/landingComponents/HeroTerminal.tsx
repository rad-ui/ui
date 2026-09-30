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
 * Motion is off when the OS asks for it, or when the visitor flips the
 * reduced-motion switch in the behaviour demo. The demo writes
 * `data-reduced-motion` onto <html> for the CSS entry points, so the JS
 * animation has to read the same flag to stay consistent with them.
 */
const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        document.documentElement.dataset.reducedMotion === 'on')

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
        const showAll = () => {
            setReduced(true)
            setVisible(TRANSCRIPT.length)
        }

        if (prefersReducedMotion()) {
            showAll()
            return
        }

        let cancelled = false
        // Reassigned each cycle rather than pushed to, so the array only ever
        // holds the current cycle's timers instead of growing for as long as
        // the page stays open.
        let timers: Array<ReturnType<typeof setTimeout>> = []

        const run = () => {
            // Drop the previous cycle's pending timers and rewind the
            // transcript, otherwise `visible` stays at full and the next
            // cycle's first tick snaps the whole block back to one line.
            timers.forEach(clearTimeout)
            timers = []
            setVisible(1)

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

        // The switch can be flipped after this hero has already started
        // typing, so watch the flag rather than only reading it on mount.
        const observer = new MutationObserver(() => {
            if (!prefersReducedMotion()) return
            cancelled = true
            clearInterval(cycle)
            timers.forEach(clearTimeout)
            showAll()
        })
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-reduced-motion']
        })

        return () => {
            cancelled = true
            observer.disconnect()
            clearInterval(cycle)
            timers.forEach(clearTimeout)
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