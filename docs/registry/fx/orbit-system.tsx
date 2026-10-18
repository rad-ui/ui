'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './orbit-system.css'

export type OrbitSystemProps = React.ComponentPropsWithoutRef<'div'> & {
    color?: string
    /** Planet colours, one orbit each, innermost first. */
    planets?: string[]
    /** Seconds for the innermost orbit; outer orbits are slower. */
    speed?: number
    paused?: boolean
}

// Concentric orbits with planets circling at different speeds, behind centred content.
const OrbitSystem = ({ color = 'rgba(148, 163, 184, 0.25)', planets = ['#38bdf8', '#a78bfa', '#f472b6', '#fbbf24'], speed = 8, paused = false, className, style, children, ...props }: OrbitSystemProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        className={['rad-fx-orbits', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-orbits-color': color, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-orbits-layer" aria-hidden="true">
            {planets.map((planet, i) => (
                <span
                    key={i}
                    className="rad-fx-orbits-ring"
                    style={{ width: `${30 + i * 18}%`, animationDuration: `${speed * (1 + i * 0.7)}s`, animationDelay: `${-i * 1.7}s`, '--rad-fx-planet': planet } as React.CSSProperties}
                >
                    <span className="rad-fx-orbits-planet" />
                </span>
            ))}
        </div>
        <div className="rad-fx-orbits-content">{children}</div>
    </div>
}

export default OrbitSystem
