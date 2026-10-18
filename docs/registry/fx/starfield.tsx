'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './starfield.css'

export type StarfieldProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Number of stars. */
    count?: number
    /** Star colour. */
    color?: string
    /** Change to get a different (but stable) sky. */
    seed?: number
    paused?: boolean
}

// Small seeded PRNG: the same sky on the server and the client, so hydration matches.
const mulberry32 = (seed: number) => () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const Starfield = ({ count = 90, color = '#e2e8f0', seed = 7, paused = false, className, style, children, ...props }: StarfieldProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    const stars = React.useMemo(() => {
        const random = mulberry32(seed)
        return Array.from({ length: count }, () => ({
            left: `${(random() * 100).toFixed(2)}%`,
            top: `${(random() * 100).toFixed(2)}%`,
            size: `${(random() * 1.8 + 0.6).toFixed(2)}px`,
            delay: `${(random() * -6).toFixed(2)}s`,
            duration: `${(random() * 4 + 3).toFixed(2)}s`
        }))
    }, [count, seed])

    return <div
        ref={ref}
        className={['rad-fx-starfield', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-star-color': color, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-starfield-sky" aria-hidden="true">
            {stars.map((star, i) => (
                <span
                    key={i}
                    className="rad-fx-star"
                    style={{ left: star.left, top: star.top, width: star.size, height: star.size, animationDelay: star.delay, animationDuration: star.duration }}
                />
            ))}
        </div>
        <div className="rad-fx-starfield-content">{children}</div>
    </div>
}

export default Starfield
