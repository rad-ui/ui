'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './ripple-drops.css'

export type RippleDropsProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Number of drop spots. */
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

const RippleDrops = ({ count = 9, color = 'rgba(125, 211, 252, 0.5)', seed = 12, paused = false, className, style, children, ...props }: RippleDropsProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)
    const spots = React.useMemo(() => {
        const random = mulberry32(seed)
        return Array.from({ length: count }, () => ({
            left: `${(random() * 90 + 5).toFixed(1)}%`,
            top: `${(random() * 90 + 5).toFixed(1)}%`,
            delay: (random() * -4).toFixed(2),
            size: `${(random() * 120 + 100).toFixed(0)}px`
        }))
    }, [count, seed])

    return <div ref={ref} className={['rad-fx-ripples', className].filter(Boolean).join(' ')} data-state={paused || offscreen ? 'paused' : 'running'} style={{ '--rad-fx-ripple-color': color, ...style } as React.CSSProperties} {...props}>
        <div className="rad-fx-ripples-layer" aria-hidden="true">
            {spots.map((spot, i) => (
                <span key={i} className="rad-fx-ripples-spot" style={{ left: spot.left, top: spot.top, width: spot.size, height: spot.size }}>
                    <span className="rad-fx-ripples-ring" style={{ animationDelay: `${spot.delay}s` }} />
                    <span className="rad-fx-ripples-ring" style={{ animationDelay: `${Number(spot.delay) - 0.6}s` }} />
                </span>
            ))}
        </div>
        <div className="rad-fx-ripples-content">{children}</div>
    </div>
}

export default RippleDrops
