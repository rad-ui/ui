'use client'

import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import './card-stack.css'

export type CardStackProps = {
    /** The cards, front to back. */
    cards: React.ReactNode[]
    /** Accessible name for the stack. */
    label: string
    /** How many cards peek out behind the front one. */
    visibleBehind?: number
    className?: string
}

// A deck you page through with Previous / Next. Only the front card is reachable
// by screen readers and Tab; the position is announced politely on change.
const CardStack = ({ cards, label, visibleBehind = 2, className }: CardStackProps) => {
    const [front, setFront] = React.useState(0)
    const [leaving, setLeaving] = React.useState<number | null>(null)
    const count = cards.length

    const go = (step: 1 | -1) => {
        if (step === 1) setLeaving(front)
        setFront((current) => (current + step + count) % count)
    }

    return <section className={['rad-fx-stack', className].filter(Boolean).join(' ')} aria-label={label} aria-roledescription="card stack">
        <div className="rad-fx-stack-deck">
            {cards.map((card, i) => {
                const position = (i - front + count) % count
                const isFront = position === 0
                return <div
                    key={i}
                    className="rad-fx-stack-card"
                    data-position={position}
                    data-leaving={leaving === i ? '' : undefined}
                    onAnimationEnd={() => setLeaving(null)}
                    inert={!isFront}
                    aria-hidden={!isFront || undefined}
                    style={{
                        '--rad-fx-stack-pos': Math.min(position, visibleBehind + 1),
                        zIndex: count - position,
                        opacity: position > visibleBehind ? 0 : 1
                    } as React.CSSProperties}
                >
                    {card}
                </div>
            })}
        </div>
        <div className="rad-fx-stack-controls">
            <button type="button" onClick={() => go(-1)}>Previous</button>
            <span aria-hidden="true">{front + 1} / {count}</span>
            <button type="button" onClick={() => go(1)}>Next</button>
        </div>
        <VisuallyHidden asChild><span aria-live="polite">Card {front + 1} of {count}</span></VisuallyHidden>
    </section>
}

export default CardStack
