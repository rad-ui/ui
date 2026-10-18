'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './fireflies.css'

export type FirefliesProps = React.ComponentPropsWithoutRef<'div'> & {
    count?: number
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

// Little lights wandering on their own paths and glowing softly on and off.
const Fireflies = ({ count = 26, color = '#fde68a', seed = 5, paused = false, className, style, children, ...props }: FirefliesProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    const flies = React.useMemo(() => {
        const random = mulberry32(seed)
        const step = () => `${(random() * 120 - 60).toFixed(0)}px`
        return Array.from({ length: count }, () => ({
            left: `${(random() * 100).toFixed(1)}%`,
            top: `${(random() * 100).toFixed(1)}%`,
            path: [step(), step(), step(), step(), step(), step()],
            duration: `${(random() * 10 + 12).toFixed(1)}s`,
            glow: `${(random() * 2 + 2).toFixed(2)}s`,
            delay: `${(random() * -20).toFixed(1)}s`
        }))
    }, [count, seed])

    return <div
        ref={ref}
        className={['rad-fx-fireflies', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-firefly-color': color, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-fireflies-air" aria-hidden="true">
            {flies.map((fly, i) => (
                <span
                    key={i}
                    className="rad-fx-firefly"
                    style={{
                        left: fly.left,
                        top: fly.top,
                        animationDuration: `${fly.duration}, ${fly.glow}`,
                        animationDelay: `${fly.delay}, ${fly.delay}`,
                        '--x1': fly.path[0], '--y1': fly.path[1], '--x2': fly.path[2], '--y2': fly.path[3], '--x3': fly.path[4], '--y3': fly.path[5]
                    } as React.CSSProperties}
                />
            ))}
        </div>
        <div className="rad-fx-fireflies-content">{children}</div>
    </div>
}

export default Fireflies
