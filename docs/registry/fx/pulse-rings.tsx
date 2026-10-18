'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './pulse-rings.css'

export type PulseRingsProps = {
    /** Shown in the centre, e.g. an avatar or icon. */
    children?: React.ReactNode
    /** Ring colour. */
    color?: string
    /** Number of rings in flight. */
    rings?: number
    /** Seconds per ring. */
    duration?: number
    /** Diameter of the rings' starting circle, in px. */
    size?: number
    paused?: boolean
    className?: string
}

const PulseRings = ({ children, color = 'rgba(52, 211, 153, 0.6)', rings = 3, duration = 2.8, size = 72, paused = false, className }: PulseRingsProps) => {
    const ref = React.useRef<HTMLSpanElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <span
        ref={ref}
        className={['rad-fx-pulse', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ width: size, height: size, '--rad-fx-pulse-color': color, '--rad-fx-pulse-duration': `${duration}s` } as React.CSSProperties}
    >
        {Array.from({ length: rings }, (_, i) => (
            <span key={i} className="rad-fx-pulse-ring" aria-hidden="true" style={{ animationDelay: `${(duration / rings) * i}s` }} />
        ))}
        <span className="rad-fx-pulse-center">{children}</span>
    </span>
}

export default PulseRings
