'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './halo-glow.css'

export type HaloGlowProps = {
    /** The content the halo sits behind, e.g. a logo, avatar or button. */
    children: React.ReactNode
    colors?: string[]
    /** Seconds per turn. */
    speed?: number
    /** Halo size relative to the content. */
    spread?: number
    paused?: boolean
    className?: string
}

// A slowly turning, blurred conic gradient behind any element.
const HaloGlow = ({ children, colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#8b5cf6'], speed = 8, spread = 1.4, paused = false, className }: HaloGlowProps) => {
    const ref = React.useRef<HTMLSpanElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <span
        ref={ref}
        className={['rad-fx-halo', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{
            '--rad-fx-halo-gradient': `conic-gradient(from 0deg, ${colors.join(', ')})`,
            '--rad-fx-halo-speed': `${speed}s`,
            '--rad-fx-halo-spread': spread
        } as React.CSSProperties}
    >
        <span className="rad-fx-halo-ring" aria-hidden="true" />
        <span className="rad-fx-halo-content">{children}</span>
    </span>
}

export default HaloGlow
