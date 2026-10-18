'use client'

import * as React from 'react'

import { useInViewOnce } from './use-reduced-motion'
import './strike-swap.css'

export type StrikeSwapProps = {
    /** The word that gets struck out. Rendered as <del>. */
    from: React.ReactNode
    /** The replacement. Rendered as <ins>. */
    to: React.ReactNode
    /** Colour of the strike line and the new word. */
    color?: string
    className?: string
}

// A correction, with real <del> and <ins> so assistive tech can tell which word
// was removed and which replaced it. The strike draws through, then the new word arrives.
const StrikeSwap = ({ from, to, color = '#f472b6', className }: StrikeSwapProps) => {
    const ref = React.useRef<HTMLSpanElement | null>(null)
    const [swapped, setSwapped] = React.useState(false)
    useInViewOnce(ref, () => setSwapped(true), !swapped, 0.6)

    return <span
        ref={ref}
        className={['rad-fx-strike', className].filter(Boolean).join(' ')}
        data-state={swapped ? 'swapped' : 'idle'}
        style={{ '--rad-fx-strike-color': color } as React.CSSProperties}
    >
        <del className="rad-fx-strike-from">{from}</del>{' '}
        <ins className="rad-fx-strike-to">{to}</ins>
    </span>
}

export default StrikeSwap
