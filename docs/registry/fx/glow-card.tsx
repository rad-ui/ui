'use client'

import * as React from 'react'

import './glow-card.css'

export type GlowCardProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Glow colour. */
    glowColor?: string
    /** Glow radius in px. */
    radius?: number
}

// The glow follows the pointer, and lights up the centre when keyboard focus
// lands inside, so keyboard users get the same affordance as mouse users.
const GlowCard = ({ glowColor = 'rgba(56, 189, 248, 0.25)', radius = 320, className, style, onPointerMove, children, ...props }: GlowCardProps) => {
    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty('--rad-fx-glow-x', `${event.clientX - rect.left}px`)
        event.currentTarget.style.setProperty('--rad-fx-glow-y', `${event.clientY - rect.top}px`)
        onPointerMove?.(event)
    }

    return <div
        className={['rad-fx-glow-card', className].filter(Boolean).join(' ')}
        style={{ '--rad-fx-glow-color': glowColor, '--rad-fx-glow-radius': `${radius}px`, ...style } as React.CSSProperties}
        onPointerMove={handlePointerMove}
        {...props}
    >
        <div className="rad-fx-glow-card-light" aria-hidden="true" />
        <div className="rad-fx-glow-card-content">{children}</div>
    </div>
}

export default GlowCard
