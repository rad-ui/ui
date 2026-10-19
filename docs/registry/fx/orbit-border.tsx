'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './orbit-border.css'

export type OrbitBorderProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Colour of the light travelling around the edge. */
    color?: string
    /** Seconds per lap. */
    duration?: number
    /** Border width in px. */
    width?: number
    /** Corner radius in px. */
    radius?: number
    paused?: boolean
}

const OrbitBorder = ({ color = '#38bdf8', duration = 4, width = 1.5, radius = 14, paused = false, className, style, children, ...props }: OrbitBorderProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        className={['rad-fx-orbit', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{
            '--rad-fx-orbit-color': color,
            '--rad-fx-orbit-duration': `${duration}s`,
            '--rad-fx-orbit-width': `${width}px`,
            '--rad-fx-orbit-radius': `${radius}px`,
            ...style
        } as React.CSSProperties}
        {...props}
    >
        {children}
    </div>
}

export default OrbitBorder
