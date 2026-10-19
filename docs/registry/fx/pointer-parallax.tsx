'use client'

import * as React from 'react'

import { useReducedMotion } from './use-reduced-motion'
import './pointer-parallax.css'

export type PointerParallaxProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Max shift in px for a layer with depth 1. */
    strength?: number
}

export type PointerParallaxLayerProps = React.ComponentPropsWithoutRef<'div'> & {
    /** How far this layer moves: 0 is fixed, 1 moves the most, negatives move the other way. */
    depth?: number
}

// Layers drift with the pointer at different depths. Pointer-only and purely visual:
// layout, reading order and focus never change.
const PointerParallax = ({ strength = 24, className, style, onPointerMove, onPointerLeave, children, ...props }: PointerParallaxProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const reduced = useReducedMotion(ref)

    const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
        onPointerMove?.(event)
        if (reduced || event.pointerType === 'touch') return
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty('--rad-fx-px', `${((event.clientX - rect.left) / rect.width - 0.5) * 2}`)
        event.currentTarget.style.setProperty('--rad-fx-py', `${((event.clientY - rect.top) / rect.height - 0.5) * 2}`)
    }

    const handleLeave = (event: React.PointerEvent<HTMLDivElement>) => {
        onPointerLeave?.(event)
        event.currentTarget.style.setProperty('--rad-fx-px', '0')
        event.currentTarget.style.setProperty('--rad-fx-py', '0')
    }

    return <div
        ref={ref}
        className={['rad-fx-parallax', className].filter(Boolean).join(' ')}
        style={{ '--rad-fx-parallax-strength': `${strength}px`, ...style } as React.CSSProperties}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        {...props}
    >
        {children}
    </div>
}

const PointerParallaxLayer = ({ depth = 0.5, className, style, ...props }: PointerParallaxLayerProps) => (
    <div
        className={['rad-fx-parallax-layer', className].filter(Boolean).join(' ')}
        style={{ '--rad-fx-depth': depth, ...style } as React.CSSProperties}
        {...props}
    />
)

PointerParallax.Layer = PointerParallaxLayer

export { PointerParallaxLayer }
export default PointerParallax
