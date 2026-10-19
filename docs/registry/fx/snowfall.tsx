'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './snowfall.css'

export type SnowfallProps = React.ComponentPropsWithoutRef<'div'> & {
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

const Snowfall = ({ count = 60, color = '#f8fafc', seed = 9, paused = false, className, style, children, ...props }: SnowfallProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)
    const flakes = React.useMemo(() => {
        const random = mulberry32(seed)
        return Array.from({ length: count }, () => {
            const size = random() * 4 + 2
            return {
                left: `${(random() * 100).toFixed(1)}%`,
                size: `${size.toFixed(1)}px`,
                blur: size > 4.5 ? '1px' : '0px',
                fall: `${(random() * 8 + 8).toFixed(1)}s`,
                sway: `${(random() * 2 + 2.5).toFixed(1)}s`,
                delay: `${(random() * -16).toFixed(1)}s`,
                rest: `${(random() * 90 + 5).toFixed(0)}%`
            }
        })
    }, [count, seed])

    return <div ref={ref} className={['rad-fx-snow', className].filter(Boolean).join(' ')} data-state={paused || offscreen ? 'paused' : 'running'} style={{ '--rad-fx-snow-color': color, ...style } as React.CSSProperties} {...props}>
        <div className="rad-fx-snow-layer" aria-hidden="true">
            {flakes.map((flake, i) => (
                <span key={i} className="rad-fx-snow-fall" style={{ left: flake.left, animationDuration: flake.fall, animationDelay: flake.delay, '--rad-fx-snow-rest': flake.rest } as React.CSSProperties}>
                    <span className="rad-fx-snow-flake" style={{ width: flake.size, height: flake.size, filter: `blur(${flake.blur})`, animationDuration: flake.sway, animationDelay: flake.delay }} />
                </span>
            ))}
        </div>
        <div className="rad-fx-snow-content">{children}</div>
    </div>
}

export default Snowfall
