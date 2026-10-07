'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './grid-backdrop.css'

export type GridBackdropProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Line colour. */
    color?: string
    /** Colour of the glow along the horizon. */
    glowColor?: string
    /** Cell size in px. */
    cellSize?: number
    /** Seconds for the grid to travel one cell. */
    speed?: number
    paused?: boolean
}

const GridBackdrop = ({ color = 'rgba(167, 139, 250, 0.45)', glowColor = 'rgba(139, 92, 246, 0.35)', cellSize = 48, speed = 2, paused = false, className, style, children, ...props }: GridBackdropProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        className={['rad-fx-grid', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-grid-color': color, '--rad-fx-grid-glow': glowColor, '--rad-fx-grid-size': `${cellSize}px`, '--rad-fx-grid-speed': `${speed}s`, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-grid-plane" aria-hidden="true" />
        <div className="rad-fx-grid-content">{children}</div>
    </div>
}

export default GridBackdrop
