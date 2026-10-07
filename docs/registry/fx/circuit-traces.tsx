'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './circuit-traces.css'

export type CircuitTracesProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Number of traces. */
    count?: number
    color?: string
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

// Right-angled circuit traces with pulses of light running along them.
const CircuitTraces = ({ count = 14, color = '#22d3ee', seed = 8, paused = false, className, style, children, ...props }: CircuitTracesProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)
    const traces = React.useMemo(() => {
        const random = mulberry32(seed)
        return Array.from({ length: count }, () => {
            let x = Math.round(random() * 20) * 5
            let y = Math.round(random() * 12) * 5
            let d = `M${x} ${y}`
            let horizontal = random() > 0.5
            for (let step = 0; step < 4; step++) {
                const length = (Math.round(random() * 4) + 2) * 5 * (random() > 0.5 ? 1 : -1)
                if (horizontal) x = Math.min(100, Math.max(0, x + length))
                else y = Math.min(60, Math.max(0, y + length))
                d += ` L${x} ${y}`
                horizontal = !horizontal
            }
            return { d, end: { x, y }, duration: `${(random() * 3 + 3).toFixed(1)}s`, delay: `${(random() * -6).toFixed(1)}s` }
        })
    }, [count, seed])

    return <div ref={ref} className={['rad-fx-circuit', className].filter(Boolean).join(' ')} data-state={paused || offscreen ? 'paused' : 'running'} style={{ '--rad-fx-circuit-color': color, ...style } as React.CSSProperties} {...props}>
        <svg className="rad-fx-circuit-layer" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
            {traces.map((trace, i) => (
                <g key={i}>
                    <path d={trace.d} className="rad-fx-circuit-trace" />
                    <path d={trace.d} className="rad-fx-circuit-pulse" pathLength={1} style={{ animationDuration: trace.duration, animationDelay: trace.delay }} />
                    <circle cx={trace.end.x} cy={trace.end.y} r={0.7} className="rad-fx-circuit-pad" />
                </g>
            ))}
        </svg>
        <div className="rad-fx-circuit-content">{children}</div>
    </div>
}

export default CircuitTraces
