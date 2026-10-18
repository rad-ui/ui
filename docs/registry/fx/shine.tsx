import * as React from 'react'

import './shine.css'

export type ShineProps = {
    /** Usually a button, link or card. It keeps its own semantics and focus. */
    children: React.ReactNode
    /** Corner radius of the shine's clip, to match the child. */
    radius?: number | string
    /** Colour of the light band. */
    color?: string
    className?: string
}

// A band of light sweeps across the child on hover and on keyboard focus inside.
const Shine = ({ children, radius = 8, color = 'rgba(255, 255, 255, 0.35)', className }: ShineProps) => (
    <span
        className={['rad-fx-shine', className].filter(Boolean).join(' ')}
        style={{ borderRadius: radius, '--rad-fx-shine-color': color } as React.CSSProperties}
    >
        {children}
    </span>
)

export default Shine
