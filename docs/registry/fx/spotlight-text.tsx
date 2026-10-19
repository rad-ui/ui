'use client'

import * as React from 'react'

import './spotlight-text.css'

type SpotlightTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'

export type SpotlightTextProps = {
    text: string
    as?: SpotlightTag
    /** Colours of the light. */
    colors?: [string, string]
    /** Radius of the light in px. */
    radius?: number
    className?: string
}

// The real text is always fully visible at its own colour; the light is an
// aria-hidden copy on top, masked to a circle under the pointer.
const SpotlightText = ({ text, as: Tag = 'span', colors = ['#22d3ee', '#a855f7'], radius = 110, className }: SpotlightTextProps) => {
    const handleMove = (event: React.PointerEvent<HTMLElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty('--rad-fx-spot-x', `${event.clientX - rect.left}px`)
        event.currentTarget.style.setProperty('--rad-fx-spot-y', `${event.clientY - rect.top}px`)
    }

    return <Tag
        className={['rad-fx-spotlight', className].filter(Boolean).join(' ')}
        onPointerMove={handleMove}
        style={{ '--rad-fx-spot-a': colors[0], '--rad-fx-spot-b': colors[1], '--rad-fx-spot-radius': `${radius}px` } as React.CSSProperties}
    >
        {text}
        <span className="rad-fx-spotlight-light" aria-hidden="true">{text}</span>
    </Tag>
}

export default SpotlightText
