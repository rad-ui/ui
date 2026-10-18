'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './halftone.css'

export type HalftoneProps = React.ComponentPropsWithoutRef<'div'> & {
    color?: string
    /** Dot spacing in px. */
    spacing?: number
    /** Seconds for the dense band to travel across. */
    speed?: number
    paused?: boolean
}

// Print-style halftone dots, with a band of larger dots sweeping across.
const Halftone = ({ color = 'rgba(244, 114, 182, 0.55)', spacing = 14, speed = 8, paused = false, className, style, children, ...props }: HalftoneProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        className={['rad-fx-halftone', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-halftone-color': color, '--rad-fx-halftone-spacing': `${spacing}px`, '--rad-fx-halftone-speed': `${speed}s`, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-halftone-layer" aria-hidden="true">
            <span className="rad-fx-halftone-small" />
            <span className="rad-fx-halftone-large" />
        </div>
        <div className="rad-fx-halftone-content">{children}</div>
    </div>
}

export default Halftone
