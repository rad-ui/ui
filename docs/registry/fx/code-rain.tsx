'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './code-rain.css'

export type CodeRainProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Number of falling columns. */
    columns?: number
    color?: string
    /** Glyphs to draw from. */
    characters?: string
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

// Columns of glyphs streaming down, brightest at the leading edge. Pure decoration:
// the glyphs are random and aria-hidden.
const CodeRain = ({ columns = 28, color = '#4ade80', characters = 'アイウエオカキクケコサシスセソ0123456789<>/{}=+*', seed = 3, paused = false, className, style, children, ...props }: CodeRainProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)
    const streams = React.useMemo(() => {
        const random = mulberry32(seed)
        return Array.from({ length: columns }, () => ({
            glyphs: Array.from({ length: Math.floor(random() * 12 + 10) }, () => characters[Math.floor(random() * characters.length)]).join(''),
            duration: `${(random() * 5 + 5).toFixed(1)}s`,
            delay: `${(random() * -10).toFixed(1)}s`,
            rest: `${(random() * 70).toFixed(0)}%`
        }))
    }, [columns, characters, seed])

    return <div ref={ref} className={['rad-fx-code', className].filter(Boolean).join(' ')} data-state={paused || offscreen ? 'paused' : 'running'} style={{ '--rad-fx-code-color': color, ...style } as React.CSSProperties} {...props}>
        <div className="rad-fx-code-layer" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {streams.map((stream, i) => (
                <span key={i} className="rad-fx-code-column">
                    <span className="rad-fx-code-stream" style={{ animationDuration: stream.duration, animationDelay: stream.delay, '--rad-fx-code-rest': stream.rest } as React.CSSProperties}>{stream.glyphs}</span>
                </span>
            ))}
        </div>
        <div className="rad-fx-code-content">{children}</div>
    </div>
}

export default CodeRain
