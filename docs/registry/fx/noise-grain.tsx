'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './noise-grain.css'

export type NoiseGrainProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Grain opacity, 0–1. Subtle reads best: 0.08–0.2. */
    opacity?: number
    /** Let the grain shimmer like film. */
    animated?: boolean
    paused?: boolean
}

// A film-grain overlay. The noise is an inline SVG turbulence texture: no image request.
const NoiseGrain = ({ opacity = 0.14, animated = true, paused = false, className, style, children, ...props }: NoiseGrainProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        className={['rad-fx-grain', className].filter(Boolean).join(' ')}
        data-animated={animated ? '' : undefined}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-grain-opacity': opacity, ...style } as React.CSSProperties}
        {...props}
    >
        {children}
        <div className="rad-fx-grain-layer" aria-hidden="true" />
    </div>
}

export default NoiseGrain
