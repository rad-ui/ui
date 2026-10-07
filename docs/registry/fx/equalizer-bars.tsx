'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './equalizer-bars.css'

export type EqualizerBarsProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Number of bars. */
    bars?: number
    /** Gradient from the bottom of a bar to its top. */
    colors?: [string, string]
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

// An audio equaliser along the bottom edge, every bar bouncing to its own beat.
const EqualizerBars = ({ bars = 40, colors = ['#7c3aed', '#22d3ee'], seed = 14, paused = false, className, style, children, ...props }: EqualizerBarsProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)
    const levels = React.useMemo(() => {
        const random = mulberry32(seed)
        return Array.from({ length: bars }, () => ({
            duration: `${(random() * 0.6 + 0.5).toFixed(2)}s`,
            delay: `${(random() * -1).toFixed(2)}s`,
            peak: (random() * 0.6 + 0.35).toFixed(2)
        }))
    }, [bars, seed])

    return <div ref={ref} className={['rad-fx-eq', className].filter(Boolean).join(' ')} data-state={paused || offscreen ? 'paused' : 'running'} style={{ '--rad-fx-eq-a': colors[0], '--rad-fx-eq-b': colors[1], ...style } as React.CSSProperties} {...props}>
        <div className="rad-fx-eq-layer" aria-hidden="true">
            {levels.map((level, i) => (
                <span key={i} className="rad-fx-eq-bar" style={{ animationDuration: level.duration, animationDelay: level.delay, '--rad-fx-eq-peak': level.peak } as React.CSSProperties} />
            ))}
        </div>
        <div className="rad-fx-eq-content">{children}</div>
    </div>
}

export default EqualizerBars
