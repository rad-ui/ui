'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './contour-lines.css'

export type ContourLinesProps = React.ComponentPropsWithoutRef<'div'> & {
    color?: string
    /** Distance between contour lines in px. */
    spacing?: number
    /** Seconds per drift cycle. */
    speed?: number
    paused?: boolean
}

// Topographic contour rings around a few slowly wandering peaks.
const ContourLines = ({ color = 'rgba(52, 211, 153, 0.35)', spacing = 18, speed = 20, paused = false, className, style, children, ...props }: ContourLinesProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        className={['rad-fx-contour', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-contour-color': color, '--rad-fx-contour-spacing': `${spacing}px`, '--rad-fx-contour-speed': `${speed}s`, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-contour-layer" aria-hidden="true">
            <span /><span /><span />
        </div>
        <div className="rad-fx-contour-content">{children}</div>
    </div>
}

export default ContourLines
