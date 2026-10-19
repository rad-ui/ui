'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './constellation.css'

export type ConstellationProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Number of stars. */
    count?: number
    color?: string
    /** Stars closer than this (in % of width) get connected. */
    reach?: number
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

// Stars joined by faint lines to their nearest neighbours, gently twinkling.
const Constellation = ({ count = 34, color = '#c4b5fd', reach = 16, seed = 21, paused = false, className, style, children, ...props }: ConstellationProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    const { stars, links } = React.useMemo(() => {
        const random = mulberry32(seed)
        const stars = Array.from({ length: count }, () => ({
            x: random() * 100,
            y: random() * 60,
            r: random() * 0.35 + 0.25,
            delay: (random() * -4).toFixed(2)
        }))
        const links: [number, number][] = []
        stars.forEach((a, i) => stars.forEach((b, j) => {
            if (j <= i) return
            if (Math.hypot(a.x - b.x, a.y - b.y) < reach) links.push([i, j])
        }))
        return { stars, links }
    }, [count, reach, seed])

    return <div ref={ref} className={['rad-fx-constellation', className].filter(Boolean).join(' ')} data-state={paused || offscreen ? 'paused' : 'running'} style={{ '--rad-fx-star-color': color, ...style } as React.CSSProperties} {...props}>
        <svg className="rad-fx-constellation-layer" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
            {links.map(([a, b]) => (
                <line key={`${a}-${b}`} x1={stars[a].x} y1={stars[a].y} x2={stars[b].x} y2={stars[b].y} className="rad-fx-constellation-link" />
            ))}
            {stars.map((star, i) => (
                <circle key={i} cx={star.x} cy={star.y} r={star.r} className="rad-fx-constellation-star" style={{ animationDelay: `${star.delay}s` }} />
            ))}
        </svg>
        <div className="rad-fx-constellation-content">{children}</div>
    </div>
}

export default Constellation
