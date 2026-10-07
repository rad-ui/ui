'use client'

import * as React from 'react'

import { useReducedMotion } from './use-reduced-motion'
import './press-ripple.css'

export type PressRippleProps = {
    /** Usually a button. Presses still reach it as normal. */
    children: React.ReactNode
    color?: string
    /** Corner radius to clip the ripple to the child's shape. */
    radius?: number | string
    className?: string
}

type Ripple = { id: number, x: number, y: number, size: number }

const PressRipple = ({ children, color = 'rgba(255, 255, 255, 0.35)', radius = 8, className }: PressRippleProps) => {
    const ref = React.useRef<HTMLSpanElement | null>(null)
    const reduced = useReducedMotion(ref)
    const [ripples, setRipples] = React.useState<Ripple[]>([])
    const nextId = React.useRef(0)

    const spawn = (x: number, y: number, rect: DOMRect) => {
        if (reduced) return
        const size = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y)) * 2
        const id = nextId.current++
        setRipples((current) => [...current, { id, x, y, size }])
    }

    const handlePointerDown = (event: React.PointerEvent<HTMLSpanElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        spawn(event.clientX - rect.left, event.clientY - rect.top, rect)
    }

    // Keyboard presses ripple from the centre.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        const rect = event.currentTarget.getBoundingClientRect()
        spawn(rect.width / 2, rect.height / 2, rect)
    }

    return <span
        ref={ref}
        className={['rad-fx-ripple', className].filter(Boolean).join(' ')}
        style={{ borderRadius: radius, '--rad-fx-ripple-color': color } as React.CSSProperties}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
    >
        {children}
        {ripples.map((ripple) => (
            <span
                key={ripple.id}
                className="rad-fx-ripple-wave"
                aria-hidden="true"
                style={{ left: ripple.x - ripple.size / 2, top: ripple.y - ripple.size / 2, width: ripple.size, height: ripple.size }}
                onAnimationEnd={() => setRipples((current) => current.filter((r) => r.id !== ripple.id))}
            />
        ))}
    </span>
}

export default PressRipple
