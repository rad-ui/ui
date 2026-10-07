'use client'

import * as React from 'react'

import { useInViewOnce } from './use-reduced-motion'
import './wipe-reveal.css'

type WipeTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'

export type WipeRevealProps = {
    children: React.ReactNode
    as?: WipeTag
    /** Colour of the wiping bar. */
    color?: string
    /** Milliseconds for the whole wipe. */
    duration?: number
    delay?: number
    className?: string
}

// Editorial wipe: a bar sweeps across and leaves the text behind it. The text is
// real and always in the accessibility tree; only its clip animates.
const WipeReveal = ({ children, as: Tag = 'span', color = '#a78bfa', duration = 900, delay = 0, className }: WipeRevealProps) => {
    const ref = React.useRef<HTMLElement | null>(null)
    const [shown, setShown] = React.useState(false)
    useInViewOnce(ref, () => setShown(true), !shown, 0.5)

    return <Tag
        ref={ref as React.Ref<never>}
        className={['rad-fx-wipe', className].filter(Boolean).join(' ')}
        data-state={shown ? 'shown' : 'hidden'}
        style={{ '--rad-fx-wipe-color': color, '--rad-fx-wipe-duration': `${duration}ms`, '--rad-fx-wipe-delay': `${delay}ms` } as React.CSSProperties}
    >
        <span className="rad-fx-wipe-text">{children}</span>
        <span className="rad-fx-wipe-bar" aria-hidden="true" />
    </Tag>
}

export default WipeReveal
