'use client'

import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import { useInViewOnce, useReducedMotion } from './use-reduced-motion'
import './split-flap.css'

type SplitFlapTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'

export type SplitFlapProps = {
    /** Final text. Shown in uppercase; screen readers get it once, as written. */
    text: string
    as?: SplitFlapTag
    /** Milliseconds per flip. */
    speed?: number
    /** Flips before the first tile settles. */
    flips?: number
    /** Extra flips for each tile after the previous one, so tiles settle left to right. */
    stagger?: number
    /** Characters cycled through while flipping. */
    characters?: string
    trigger?: 'inView' | 'mount'
    className?: string
}

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const SplitFlap = ({ text, as: Tag = 'div', speed = 55, flips = 8, stagger = 2, characters = DEFAULT_CHARACTERS, trigger = 'inView', className }: SplitFlapProps) => {
    const ref = React.useRef<HTMLElement | null>(null)
    const reduced = useReducedMotion(ref)
    const target = React.useMemo(() => Array.from(text.toUpperCase()), [text])
    // Server render and first paint show the final text.
    const [tick, setTick] = React.useState<number | null>(null)
    const [started, setStarted] = React.useState(trigger === 'mount')
    useInViewOnce(ref, () => setStarted(true), trigger === 'inView' && !started)

    const lastTick = flips + (target.length - 1) * stagger

    React.useEffect(() => {
        if (!started || reduced) return
        let current = 0
        setTick(0)
        const timer = window.setInterval(() => {
            current += 1
            setTick(current)
            if (current >= lastTick) window.clearInterval(timer)
        }, speed)
        return () => window.clearInterval(timer)
    }, [started, reduced, speed, lastTick])

    return <Tag ref={ref as React.Ref<never>} className={['rad-fx-flap', className].filter(Boolean).join(' ')}>
        <VisuallyHidden asChild><span>{text}</span></VisuallyHidden>
        <span className="rad-fx-flap-board" aria-hidden="true">
            {target.map((finalChar, i) => {
                if (finalChar === ' ') return <span key={i} className="rad-fx-flap-gap" />
                const settled = tick === null || tick >= flips + i * stagger
                const char = settled ? finalChar : characters[(tick * 7 + i * 13) % characters.length]
                return <span key={i} className="rad-fx-flap-tile">
                    {/* A new key restarts the flip animation each time the character changes. */}
                    <span key={settled ? 'final' : tick} className="rad-fx-flap-char" data-state={settled ? 'settled' : 'flipping'}>{char}</span>
                </span>
            })}
        </span>
    </Tag>
}

export default SplitFlap
