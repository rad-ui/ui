'use client'

import * as React from 'react'

import { useReducedMotion } from './use-reduced-motion'
import './extruded-text.css'

type ExtrudedTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'

export type ExtrudedTextProps = {
    text: string
    as?: ExtrudedTag
    /** Layers of extrusion, in px. */
    depth?: number
    /** Colour of the extruded sides. */
    sideColor?: string
    /** Tilt toward the pointer. */
    tilt?: boolean
    /** Maximum tilt in degrees. */
    maxTilt?: number
    className?: string
}

const ExtrudedText = ({ text, as: Tag = 'span', depth = 10, sideColor = '#6d28d9', tilt = true, maxTilt = 12, className }: ExtrudedTextProps) => {
    const ref = React.useRef<HTMLElement | null>(null)
    const reduced = useReducedMotion(ref)
    const shadow = React.useMemo(() => [
        ...Array.from({ length: depth }, (_, i) => `${i + 1}px ${i + 1}px 0 ${sideColor}`),
        `${depth + 4}px ${depth + 6}px 16px rgba(0, 0, 0, 0.45)`
    ].join(', '), [depth, sideColor])

    const handleMove = (event: React.PointerEvent<HTMLElement>) => {
        if (!tilt || reduced || event.pointerType === 'touch') return
        const rect = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        event.currentTarget.style.setProperty('--rad-fx-extrude-x', `${(-y * maxTilt * 2).toFixed(1)}deg`)
        event.currentTarget.style.setProperty('--rad-fx-extrude-y', `${(x * maxTilt * 2).toFixed(1)}deg`)
    }

    const handleLeave = (event: React.PointerEvent<HTMLElement>) => {
        event.currentTarget.style.setProperty('--rad-fx-extrude-x', '0deg')
        event.currentTarget.style.setProperty('--rad-fx-extrude-y', '0deg')
    }

    return <Tag
        ref={ref as React.Ref<never>}
        className={['rad-fx-extruded', className].filter(Boolean).join(' ')}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ textShadow: shadow }}
    >
        {text}
    </Tag>
}

export default ExtrudedText
