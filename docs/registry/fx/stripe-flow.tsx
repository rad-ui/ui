'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './stripe-flow.css'

export type StripeFlowProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Stripe colour and gap colour. */
    colors?: [string, string]
    /** Stripe width in px. */
    width?: number
    /** Seconds per stripe step. */
    speed?: number
    paused?: boolean
}

// Diagonal stripes gliding along, softened at the edges.
const StripeFlow = ({ colors = ['rgba(167, 139, 250, 0.16)', 'transparent'], width = 22, speed = 1.6, paused = false, className, style, children, ...props }: StripeFlowProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        className={['rad-fx-stripes', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-stripe-a': colors[0], '--rad-fx-stripe-b': colors[1], '--rad-fx-stripe-width': `${width}px`, '--rad-fx-stripe-speed': `${speed}s`, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-stripes-layer" aria-hidden="true" />
        <div className="rad-fx-stripes-content">{children}</div>
    </div>
}

export default StripeFlow
