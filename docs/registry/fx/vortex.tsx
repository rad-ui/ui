'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './vortex.css'

export type VortexProps = React.ComponentPropsWithoutRef<'div'> & {
    colors?: [string, string]
    /** Seconds per turn. Keep it slow: spinning spirals can cause discomfort. */
    speed?: number
    paused?: boolean
}

// A slowly turning spiral of colour that fades toward the edges.
const Vortex = ({ colors = ['rgba(139, 92, 246, 0.45)', 'rgba(34, 211, 238, 0.25)'], speed = 30, paused = false, className, style, children, ...props }: VortexProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        className={['rad-fx-vortex', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-vortex-a': colors[0], '--rad-fx-vortex-b': colors[1], '--rad-fx-vortex-speed': `${speed}s`, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-vortex-layer" aria-hidden="true">
            <span className="rad-fx-vortex-swirl" />
        </div>
        <div className="rad-fx-vortex-content">{children}</div>
    </div>
}

export default Vortex
