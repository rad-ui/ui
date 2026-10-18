import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import './loader.css'

export type LoaderProps = {
    variant?: 'dots' | 'bars' | 'orbit'
    /** Announced to screen readers. */
    label?: string
    /** Size in px. */
    size?: number
    color?: string
    className?: string
}

const PARTS = { dots: 3, bars: 4, orbit: 2 } as const

const Loader = ({ variant = 'dots', label = 'Loading', size = 32, color = 'currentColor', className }: LoaderProps) => (
    <span
        role="status"
        className={['rad-fx-loader', className].filter(Boolean).join(' ')}
        data-variant={variant}
        style={{ '--rad-fx-loader-size': `${size}px`, '--rad-fx-loader-color': color } as React.CSSProperties}
    >
        <VisuallyHidden asChild><span>{label}</span></VisuallyHidden>
        <span className="rad-fx-loader-art" aria-hidden="true">
            {Array.from({ length: PARTS[variant] }, (_, i) => (
                <span key={i} className="rad-fx-loader-part" style={{ '--rad-fx-loader-i': i } as React.CSSProperties} />
            ))}
        </span>
    </span>
)

export default Loader
