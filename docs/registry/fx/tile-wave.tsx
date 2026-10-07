'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './tile-wave.css'

export type TileWaveProps = React.ComponentPropsWithoutRef<'div'> & {
    color?: string
    columns?: number
    rows?: number
    /** Seconds per wave. */
    speed?: number
    paused?: boolean
}

// A grid of tiles that light up in a diagonal wave.
const TileWave = ({ color = 'rgba(167, 139, 250, 0.5)', columns = 18, rows = 10, speed = 3.2, paused = false, className, style, children, ...props }: TileWaveProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)
    const diagonal = columns + rows

    return <div
        ref={ref}
        className={['rad-fx-tiles', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-tile-color': color, '--rad-fx-tile-speed': `${speed}s`, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-tiles-layer" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
            {Array.from({ length: columns * rows }, (_, i) => {
                const col = i % columns
                const row = Math.floor(i / columns)
                return <span key={i} className="rad-fx-tile" style={{ animationDelay: `calc(var(--rad-fx-tile-speed, 3.2s) * ${((col + row) / diagonal).toFixed(3)})` }} />
            })}
        </div>
        <div className="rad-fx-tiles-content">{children}</div>
    </div>
}

export default TileWave
