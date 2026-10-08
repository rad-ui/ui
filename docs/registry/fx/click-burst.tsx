'use client'

import * as React from 'react'

import { useReducedMotion } from './use-reduced-motion'
import './click-burst.css'

export type ClickBurstProps = {
    /** Usually a button. Clicks (mouse, touch or keyboard) still reach it as normal. */
    children: React.ReactNode
    color?: string
    /** Number of sparks. */
    sparks?: number
    /** Spark travel distance in px. */
    distance?: number
    className?: string
}

type Burst = { id: number, x: number, y: number }

const ClickBurst = ({ children, color = '#fbbf24', sparks = 8, distance = 28, className }: ClickBurstProps) => {
    const ref = React.useRef<HTMLSpanElement | null>(null)
    const reduced = useReducedMotion(ref)
    const [bursts, setBursts] = React.useState<Burst[]>([])
    const nextId = React.useRef(0)

    const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        if (reduced) return
        const rect = event.currentTarget.getBoundingClientRect()
        // Keyboard "clicks" have no pointer position (detail === 0): burst from the centre.
        const fromKeyboard = event.detail === 0
        const x = fromKeyboard ? rect.width / 2 : event.clientX - rect.left
        const y = fromKeyboard ? rect.height / 2 : event.clientY - rect.top
        const id = nextId.current++
        setBursts((current) => [...current, { id, x, y }])
    }

    const remove = (id: number) => setBursts((current) => current.filter((burst) => burst.id !== id))

    return <span ref={ref} className={['rad-fx-click-burst', className].filter(Boolean).join(' ')} onClick={handleClick}>
        {children}
        {bursts.map((burst) => (
            <span
                key={burst.id}
                className="rad-fx-click-burst-sparks"
                aria-hidden="true"
                style={{ left: burst.x, top: burst.y, '--rad-fx-burst-color': color, '--rad-fx-burst-distance': `${distance}px` } as React.CSSProperties}
                onAnimationEnd={(event) => { if (event.target === event.currentTarget.lastElementChild) remove(burst.id) }}
            >
                {Array.from({ length: sparks }, (_, i) => (
                    <span key={i} className="rad-fx-click-burst-spark" style={{ '--rad-fx-burst-angle': `${(360 / sparks) * i}deg` } as React.CSSProperties} />
                ))}
            </span>
        ))}
    </span>
}

export default ClickBurst
