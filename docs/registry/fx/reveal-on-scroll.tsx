'use client'

import * as React from 'react'

import { useInViewOnce } from './use-reduced-motion'
import './reveal-on-scroll.css'

export type RevealOnScrollProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Where the content comes from. */
    from?: 'below' | 'above' | 'left' | 'right' | 'none'
    /** Travel distance in px. */
    distance?: number
    /** Milliseconds. */
    duration?: number
    /** Milliseconds before starting, handy for staggering siblings. */
    delay?: number
}

const OFFSETS = { below: [0, 1], above: [0, -1], left: [-1, 0], right: [1, 0], none: [0, 0] } as const

const RevealOnScroll = ({ from = 'below', distance = 24, duration = 700, delay = 0, className, style, onFocusCapture, children, ...props }: RevealOnScrollProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const [revealed, setRevealed] = React.useState(false)
    const [dx, dy] = OFFSETS[from]

    useInViewOnce(ref, () => setRevealed(true), !revealed, 0.15)

    return <div
        ref={ref}
        className={['rad-fx-reveal', className].filter(Boolean).join(' ')}
        data-state={revealed ? 'visible' : 'hidden'}
        // Keyboard focus landing inside hidden content reveals it at once.
        onFocusCapture={(event) => { setRevealed(true); onFocusCapture?.(event) }}
        style={{
            '--rad-fx-reveal-x': `${dx * distance}px`,
            '--rad-fx-reveal-y': `${dy * distance}px`,
            '--rad-fx-reveal-duration': `${duration}ms`,
            '--rad-fx-reveal-delay': `${delay}ms`,
            ...style
        } as React.CSSProperties}
        {...props}
    >
        {children}
    </div>
}

export default RevealOnScroll
