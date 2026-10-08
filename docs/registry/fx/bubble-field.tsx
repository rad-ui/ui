'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './bubble-field.css'

export type BubbleFieldProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Number of bubbles. */
    count?: number
    /** Bubble colours. */
    colors?: string[]
    seed?: number
    paused?: boolean
}

// Seeded so server and client draw the same bubbles.
const mulberry32 = (seed: number) => () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const DEFAULT_COLORS = ['rgba(56, 189, 248, 0.35)', 'rgba(167, 139, 250, 0.35)', 'rgba(244, 114, 182, 0.3)']

const BubbleField = ({ count = 22, colors = DEFAULT_COLORS, seed = 11, paused = false, className, style, children, ...props }: BubbleFieldProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    const bubbles = React.useMemo(() => {
        const random = mulberry32(seed)
        return Array.from({ length: count }, (_, i) => ({
            left: `${(random() * 100).toFixed(2)}%`,
            size: `${(random() * 46 + 10).toFixed(0)}px`,
            delay: `${(random() * -14).toFixed(2)}s`,
            duration: `${(random() * 8 + 9).toFixed(2)}s`,
            drift: `${(random() * 60 - 30).toFixed(0)}px`,
            rest: `${(random() * 80 + 5).toFixed(0)}%`,
            color: colors[i % colors.length]
        }))
    }, [count, seed, colors])

    return <div
        ref={ref}
        className={['rad-fx-bubbles', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={style}
        {...props}
    >
        <div className="rad-fx-bubbles-tank" aria-hidden="true">
            {bubbles.map((bubble, i) => (
                <span
                    key={i}
                    className="rad-fx-bubble"
                    style={{
                        left: bubble.left,
                        width: bubble.size,
                        height: bubble.size,
                        animationDelay: bubble.delay,
                        animationDuration: bubble.duration,
                        '--rad-fx-bubble-drift': bubble.drift,
                        '--rad-fx-bubble-color': bubble.color,
                        '--rad-fx-bubble-rest': bubble.rest
                    } as React.CSSProperties}
                />
            ))}
        </div>
        <div className="rad-fx-bubbles-content">{children}</div>
    </div>
}

export default BubbleField
