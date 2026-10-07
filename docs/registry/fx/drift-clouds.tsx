'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './drift-clouds.css'

export type DriftCloudsProps = React.ComponentPropsWithoutRef<'div'> & {
    count?: number
    color?: string
    /** Seconds for a cloud to cross. Higher is calmer. */
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

const DriftClouds = ({ count = 7, color = 'rgba(203, 213, 225, 0.22)', speed = 40, seed = 4, paused = false, className, style, children, ...props }: DriftCloudsProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)
    const clouds = React.useMemo(() => {
        const random = mulberry32(seed)
        return Array.from({ length: count }, () => ({
            top: `${(random() * 75).toFixed(0)}%`,
            width: `${(random() * 25 + 25).toFixed(0)}%`,
            duration: (random() * 0.8 + 0.6).toFixed(2),
            delay: (random() * -1).toFixed(2),
            rest: (random() * 0.8).toFixed(2)
        }))
    }, [count, seed])

    return <div ref={ref} className={['rad-fx-clouds', className].filter(Boolean).join(' ')} data-state={paused || offscreen ? 'paused' : 'running'} style={{ '--rad-fx-cloud-color': color, '--rad-fx-cloud-speed': `${speed}s`, ...style } as React.CSSProperties} {...props}>
        <div className="rad-fx-clouds-layer" aria-hidden="true">
            {clouds.map((cloud, i) => (
                <span key={i} className="rad-fx-cloud" style={{ top: cloud.top, width: cloud.width, animationDuration: `calc(var(--rad-fx-cloud-speed, 40s) * ${cloud.duration})`, animationDelay: `calc(var(--rad-fx-cloud-speed, 40s) * ${cloud.delay})`, '--rad-fx-cloud-rest': cloud.rest } as React.CSSProperties} />
            ))}
        </div>
        <div className="rad-fx-clouds-content">{children}</div>
    </div>
}

export default DriftClouds
