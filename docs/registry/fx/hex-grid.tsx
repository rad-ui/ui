'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './hex-grid.css'

export type HexGridProps = React.ComponentPropsWithoutRef<'div'> & {
    color?: string
    /** Hexagon size in px. */
    size?: number
    /** Seconds for the glow to sweep across. */
    speed?: number
    paused?: boolean
}

// A honeycomb grid with a pool of light drifting across it.
const HexGrid = ({ color = 'rgba(56, 189, 248, 0.55)', size = 28, speed = 10, paused = false, className, style, children, ...props }: HexGridProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)
    const patternId = `rad-fx-hex-${React.useId().replace(/[^a-zA-Z0-9-]/g, '')}`
    const w = size * Math.sqrt(3)
    const h = size * 3
    const s = size
    // One tile holds a full hexagon plus the halves that complete the pattern.
    const hex = (cx: number, cy: number) => `M${cx} ${cy - s} L${cx + w / 2} ${cy - s / 2} L${cx + w / 2} ${cy + s / 2} L${cx} ${cy + s} L${cx - w / 2} ${cy + s / 2} L${cx - w / 2} ${cy - s / 2} Z`

    const grid = (className: string) => <svg className={className} width="100%" height="100%" aria-hidden="true" focusable="false">
        <defs>
            <pattern id={`${patternId}-${className}`} width={w} height={h} patternUnits="userSpaceOnUse">
                <path d={`${hex(w / 2, s)} ${hex(0, s * 2.5)} ${hex(w, s * 2.5)}`} fill="none" strokeWidth="1" style={{ stroke: 'var(--rad-fx-hex-color)' }} />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId}-${className})`} />
    </svg>

    return <div
        ref={ref}
        className={['rad-fx-hex', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-hex-color': color, '--rad-fx-hex-speed': `${speed}s`, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-hex-layer" aria-hidden="true">
            {grid('rad-fx-hex-dim')}
            {grid('rad-fx-hex-lit')}
        </div>
        <div className="rad-fx-hex-content">{children}</div>
    </div>
}

export default HexGrid
