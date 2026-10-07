'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './dot-field.css'

export type DotFieldProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Dot colour. */
    color?: string
    /** Spacing between dots in px. */
    gap?: number
    /** Seconds for the light to sweep across. */
    speed?: number
    paused?: boolean
}

const DotField = ({ color = 'rgba(148, 163, 184, 0.9)', gap = 18, speed = 9, paused = false, className, style, children, ...props }: DotFieldProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        className={['rad-fx-dots', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-dots-color': color, '--rad-fx-dots-gap': `${gap}px`, '--rad-fx-dots-speed': `${speed}s`, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-dots-base" aria-hidden="true" />
        <div className="rad-fx-dots-lit" aria-hidden="true" />
        <div className="rad-fx-dots-content">{children}</div>
    </div>
}

export default DotField
