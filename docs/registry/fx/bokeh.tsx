'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './bokeh.css'

export type BokehProps = React.ComponentPropsWithoutRef<'div'> & {
    count?: number
    colors?: string[]
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

const DEFAULT_COLORS = ['rgba(251, 191, 36, 0.35)', 'rgba(244, 114, 182, 0.3)', 'rgba(96, 165, 250, 0.3)']

const Bokeh = ({ count = 16, colors = DEFAULT_COLORS, seed = 6, paused = false, className, style, children, ...props }: BokehProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)
    const orbs = React.useMemo(() => {
        const random = mulberry32(seed)
        return Array.from({ length: count }, (_, i) => ({
            left: `${(random() * 100).toFixed(1)}%`,
            top: `${(random() * 100).toFixed(1)}%`,
            size: `${(random() * 120 + 50).toFixed(0)}px`,
            dx: `${(random() * 60 - 30).toFixed(0)}px`,
            dy: `${(random() * 60 - 30).toFixed(0)}px`,
            duration: `${(random() * 8 + 8).toFixed(1)}s`,
            delay: `${(random() * -10).toFixed(1)}s`,
            color: colors[i % colors.length]
        }))
    }, [count, seed, colors])

    return <div ref={ref} className={['rad-fx-bokeh', className].filter(Boolean).join(' ')} data-state={paused || offscreen ? 'paused' : 'running'} style={style} {...props}>
        <div className="rad-fx-bokeh-layer" aria-hidden="true">
            {orbs.map((orb, i) => (
                <span key={i} className="rad-fx-bokeh-orb" style={{ left: orb.left, top: orb.top, width: orb.size, height: orb.size, animationDuration: orb.duration, animationDelay: orb.delay, '--rad-fx-bokeh-color': orb.color, '--rad-fx-bokeh-dx': orb.dx, '--rad-fx-bokeh-dy': orb.dy } as React.CSSProperties} />
            ))}
        </div>
        <div className="rad-fx-bokeh-content">{children}</div>
    </div>
}

export default Bokeh
