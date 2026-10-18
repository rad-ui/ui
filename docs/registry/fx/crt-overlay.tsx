'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './crt-overlay.css'

export type CrtOverlayProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Scanline strength, 0–1. */
    intensity?: number
    /** A soft bright band rolling down the screen. No flicker, ever. */
    roll?: boolean
    paused?: boolean
}

// Scanlines, a rolling band and a vignette over any content. Deliberately no
// flicker: flashing overlays are a seizure risk and add nothing here.
const CrtOverlay = ({ intensity = 0.35, roll = true, paused = false, className, style, children, ...props }: CrtOverlayProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        className={['rad-fx-crt', className].filter(Boolean).join(' ')}
        data-roll={roll ? '' : undefined}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-crt-intensity': intensity, ...style } as React.CSSProperties}
        {...props}
    >
        {children}
        <div className="rad-fx-crt-screen" aria-hidden="true" />
    </div>
}

export default CrtOverlay
