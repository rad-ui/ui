'use client'

import * as React from 'react'

import { useReducedMotion } from './use-reduced-motion'
import './perspective-card.css'

export type PerspectiveCardProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Maximum tilt in degrees. Keep it small; big tilts make people queasy. */
    maxTilt?: number
    /** Show a soft glare that follows the pointer. */
    glare?: boolean
}

const PerspectiveCard = ({ maxTilt = 8, glare = true, className, onPointerMove, onPointerLeave, children, ...props }: PerspectiveCardProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const reduced = useReducedMotion(ref)

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        onPointerMove?.(event)
        if (reduced || event.pointerType === 'touch') return
        const rect = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        const style = event.currentTarget.style
        style.setProperty('--rad-fx-tilt-x', `${(-y * maxTilt * 2).toFixed(2)}deg`)
        style.setProperty('--rad-fx-tilt-y', `${(x * maxTilt * 2).toFixed(2)}deg`)
        style.setProperty('--rad-fx-glare-x', `${((x + 0.5) * 100).toFixed(1)}%`)
        style.setProperty('--rad-fx-glare-y', `${((y + 0.5) * 100).toFixed(1)}%`)
        event.currentTarget.dataset.state = 'tilting'
    }

    const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
        onPointerLeave?.(event)
        const style = event.currentTarget.style
        style.setProperty('--rad-fx-tilt-x', '0deg')
        style.setProperty('--rad-fx-tilt-y', '0deg')
        event.currentTarget.dataset.state = 'idle'
    }

    return <div className="rad-fx-perspective">
        <div
            ref={ref}
            className={['rad-fx-perspective-card', className].filter(Boolean).join(' ')}
            data-state="idle"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            {...props}
        >
            {children}
            {glare ? <div className="rad-fx-perspective-glare" aria-hidden="true" /> : null}
        </div>
    </div>
}

export default PerspectiveCard
