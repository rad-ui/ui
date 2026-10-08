'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './marquee.css'

export type MarqueeProps = {
    /** The items. Rendered once for assistive tech; the looping copy is hidden and inert. */
    children: React.ReactNode
    /** Seconds per loop. Higher is slower. */
    duration?: number
    direction?: 'left' | 'right'
    /** Pause while hovered or while focus is inside. */
    pauseOnHover?: boolean
    /** Stop scrolling. Wire to a visible pause control (WCAG 2.2.2). */
    paused?: boolean
    /** Gap between items, any CSS length. */
    gap?: string
    /** Accessible name for the list, e.g. "Customers". */
    label?: string
    className?: string
}

const Marquee = ({ children, duration = 30, direction = 'left', pauseOnHover = true, paused = false, gap = '2.5rem', label, className }: MarqueeProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        role={label ? 'region' : undefined}
        aria-label={label}
        className={['rad-fx-marquee', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        data-pause-on-hover={pauseOnHover ? '' : undefined}
        data-direction={direction}
        style={{ '--rad-fx-marquee-duration': `${duration}s`, '--rad-fx-marquee-gap': gap } as React.CSSProperties}
    >
        <div className="rad-fx-marquee-track">
            <div className="rad-fx-marquee-group">{children}</div>
            {/* The second copy only exists to make the loop seamless: hidden and unfocusable. */}
            <div className="rad-fx-marquee-group" aria-hidden="true" inert>{children}</div>
        </div>
    </div>
}

export default Marquee
