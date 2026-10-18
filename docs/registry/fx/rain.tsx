'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './rain.css'

export type RainProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Number of drops. */
    count?: number
    color?: string
    /** Slant in degrees. */
    angle?: number
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

const Rain = ({ count = 70, color = 'rgba(165, 180, 252, 0.55)', angle = 12, seed = 2, paused = false, className, style, children, ...props }: RainProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)
    const drops = React.useMemo(() => {
        const random = mulberry32(seed)
        return Array.from({ length: count }, () => ({
            left: `${(random() * 120 - 10).toFixed(1)}%`,
            height: `${(random() * 50 + 30).toFixed(0)}px`,
            duration: `${(random() * 0.5 + 0.55).toFixed(2)}s`,
            delay: `${(random() * -2).toFixed(2)}s`,
            opacity: (random() * 0.6 + 0.4).toFixed(2),
            rest: (random() * 0.9).toFixed(2)
        }))
    }, [count, seed])

    return <div ref={ref} className={['rad-fx-rain', className].filter(Boolean).join(' ')} data-state={paused || offscreen ? 'paused' : 'running'} style={{ '--rad-fx-rain-color': color, '--rad-fx-rain-angle': `${angle}deg`, ...style } as React.CSSProperties} {...props}>
        <div className="rad-fx-rain-layer" aria-hidden="true">
            {drops.map((drop, i) => (
                <span key={i} className="rad-fx-rain-drop" style={{ left: drop.left, height: drop.height, opacity: drop.opacity, animationDuration: drop.duration, animationDelay: drop.delay, '--rad-fx-rain-rest': drop.rest } as React.CSSProperties} />
            ))}
        </div>
        <div className="rad-fx-rain-content">{children}</div>
    </div>
}

export default Rain
