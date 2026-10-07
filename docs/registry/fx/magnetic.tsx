'use client'

import * as React from 'react'

import { useReducedMotion } from './use-reduced-motion'
import './magnetic.css'

export type MagneticProps = {
    /** The element to attract, usually a button or link. It keeps its own semantics and focus. */
    children: React.ReactNode
    /** 0–1: how far the element follows the pointer. */
    strength?: number
    className?: string
}

const Magnetic = ({ children, strength = 0.3, className }: MagneticProps) => {
    const ref = React.useRef<HTMLSpanElement | null>(null)
    const reduced = useReducedMotion(ref)

    const move = (event: React.PointerEvent<HTMLSpanElement>) => {
        if (reduced || event.pointerType === 'touch') return
        const rect = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - (rect.left + rect.width / 2)) * strength
        const y = (event.clientY - (rect.top + rect.height / 2)) * strength
        event.currentTarget.style.setProperty('--rad-fx-magnet-x', `${x.toFixed(1)}px`)
        event.currentTarget.style.setProperty('--rad-fx-magnet-y', `${y.toFixed(1)}px`)
    }

    const reset = (event: React.PointerEvent<HTMLSpanElement>) => {
        event.currentTarget.style.setProperty('--rad-fx-magnet-x', '0px')
        event.currentTarget.style.setProperty('--rad-fx-magnet-y', '0px')
    }

    // A wrapper span, not a cloned child: the child's own props, ref and focus stay untouched.
    return <span ref={ref} className={['rad-fx-magnetic', className].filter(Boolean).join(' ')} onPointerMove={move} onPointerLeave={reset}>
        {children}
    </span>
}

export default Magnetic
