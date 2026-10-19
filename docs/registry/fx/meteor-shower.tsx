'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './meteor-shower.css'

export type MeteorShowerProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Number of meteors. Keep it low: a few streaks read better than a storm. */
    count?: number
    /** Meteor colour. */
    color?: string
    seed?: number
    paused?: boolean
}

const mulberry32 = (seed: number) => () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const MeteorShower = ({ count = 12, color = '#cbd5e1', seed = 3, paused = false, className, style, children, ...props }: MeteorShowerProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    const meteors = React.useMemo(() => {
        const random = mulberry32(seed)
        return Array.from({ length: count }, () => ({
            left: `${(random() * 130 - 10).toFixed(2)}%`,
            delay: `${(random() * 8).toFixed(2)}s`,
            duration: `${(random() * 3 + 3).toFixed(2)}s`
        }))
    }, [count, seed])

    return <div
        ref={ref}
        className={['rad-fx-meteors', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-meteor-color': color, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-meteors-sky" aria-hidden="true">
            {meteors.map((meteor, i) => (
                <span key={i} className="rad-fx-meteor" style={{ left: meteor.left, animationDelay: meteor.delay, animationDuration: meteor.duration }} />
            ))}
        </div>
        <div className="rad-fx-meteors-content">{children}</div>
    </div>
}

export default MeteorShower
