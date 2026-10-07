'use client'

import * as React from 'react'

import './flashlight.css'

export type FlashlightProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Radius of the beam in px. */
    radius?: number
    /** How dark the surroundings get while the beam is on, 0–1. */
    darkness?: number
}

// While the pointer is over it, everything darkens except a beam around the cursor.
// It is fully lit by default and whenever keyboard focus is inside, so nothing is
// ever hidden from anyone not using a mouse.
const Flashlight = ({ radius = 140, darkness = 0.82, className, style, onPointerMove, children, ...props }: FlashlightProps) => {
    const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
        onPointerMove?.(event)
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty('--rad-fx-beam-x', `${event.clientX - rect.left}px`)
        event.currentTarget.style.setProperty('--rad-fx-beam-y', `${event.clientY - rect.top}px`)
    }

    return <div
        className={['rad-fx-flashlight', className].filter(Boolean).join(' ')}
        style={{ '--rad-fx-beam-radius': `${radius}px`, '--rad-fx-darkness': darkness, ...style } as React.CSSProperties}
        onPointerMove={handleMove}
        {...props}
    >
        {children}
        <div className="rad-fx-flashlight-dark" aria-hidden="true" />
    </div>
}

export default Flashlight
