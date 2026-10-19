'use client'

import * as React from 'react'

import './flip-card.css'

export type FlipCardProps = {
    front: React.ReactNode
    back: React.ReactNode
    /** Accessible names for the flip button on each side. */
    flipLabel?: { toBack: string, toFront: string }
    flipped?: boolean
    defaultFlipped?: boolean
    onFlippedChange?: (flipped: boolean) => void
    className?: string
}

// The hidden face is inert, so screen readers and Tab only ever reach the side you can see.
// Flipping is an explicit button, never hover-only, so it works for keyboard and touch.
const FlipCard = ({ front, back, flipLabel = { toBack: 'Show back', toFront: 'Show front' }, flipped, defaultFlipped = false, onFlippedChange, className }: FlipCardProps) => {
    const [internal, setInternal] = React.useState(defaultFlipped)
    const isFlipped = flipped ?? internal

    const toggle = () => {
        const next = !isFlipped
        if (flipped === undefined) setInternal(next)
        onFlippedChange?.(next)
    }

    return <div className={['rad-fx-flip', className].filter(Boolean).join(' ')} data-state={isFlipped ? 'back' : 'front'}>
        <div className="rad-fx-flip-inner">
            <div className="rad-fx-flip-face" data-face="front" inert={isFlipped} aria-hidden={isFlipped || undefined}>
                {front}
            </div>
            <div className="rad-fx-flip-face" data-face="back" inert={!isFlipped} aria-hidden={!isFlipped || undefined}>
                {back}
            </div>
        </div>
        {/* The label says what the button will do, so it is not also marked aria-pressed. */}
        <button type="button" className="rad-fx-flip-toggle" onClick={toggle}>
            {isFlipped ? flipLabel.toFront : flipLabel.toBack}
        </button>
    </div>
}

export default FlipCard
