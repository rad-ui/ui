'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './hyperspace.css'

export type HyperspaceProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Number of streaks. */
    count?: number
    color?: string
    /** Seconds per streak. Higher is calmer; this effect is intense, so give it a pause control. */
    speed?: number
    seed?: number
    paused?: boolean
}

// Seeded so server and client draw the same scene.
const mulberry32 = (seed: number) => () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

// Stars stretching into streaks as they rush out from the centre.
const Hyperspace = ({ count = 70, color = '#e0e7ff', speed = 1.8, seed = 17, paused = false, className, style, children, ...props }: HyperspaceProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)
    const streaks = React.useMemo(() => {
        const random = mulberry32(seed)
        return Array.from({ length: count }, () => ({
            angle: `${(random() * 360).toFixed(1)}deg`,
            duration: (random() * 0.8 + 0.6).toFixed(2),
            delay: (random() * -2).toFixed(2),
            rest: `${(random() * 40 + 8).toFixed(0)}cqmax`
        }))
    }, [count, seed])

    return <div ref={ref} className={['rad-fx-hyper', className].filter(Boolean).join(' ')} data-state={paused || offscreen ? 'paused' : 'running'} style={{ '--rad-fx-hyper-color': color, '--rad-fx-hyper-speed': `${speed}s`, ...style } as React.CSSProperties} {...props}>
        <div className="rad-fx-hyper-layer" aria-hidden="true">
            {streaks.map((streak, i) => (
                <span key={i} className="rad-fx-hyper-arm" style={{ rotate: streak.angle }}>
                    <span className="rad-fx-hyper-streak" style={{ animationDuration: `calc(var(--rad-fx-hyper-speed, 1.8s) * ${streak.duration})`, animationDelay: `calc(var(--rad-fx-hyper-speed, 1.8s) * ${streak.delay})`, '--rad-fx-hyper-rest': streak.rest } as React.CSSProperties} />
                </span>
            ))}
        </div>
        <div className="rad-fx-hyper-content">{children}</div>
    </div>
}

export default Hyperspace
