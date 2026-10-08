import * as React from 'react'

import './shimmer-text.css'

type ShimmerTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'

export type ShimmerTextProps = {
    children: React.ReactNode
    as?: ShimmerTag
    /** Seconds per sweep. */
    duration?: number
    /** Colour of the passing highlight. The text colour itself stays `currentColor`. */
    highlight?: string
    className?: string
}

// Real text, never split: screen readers, selection and translation all just work.
const ShimmerText = ({ children, as: Tag = 'span', duration = 2.5, highlight = 'rgba(255, 255, 255, 0.85)', className }: ShimmerTextProps) => (
    <Tag
        className={['rad-fx-shimmer', className].filter(Boolean).join(' ')}
        style={{ '--rad-fx-shimmer-duration': `${duration}s`, '--rad-fx-shimmer-highlight': highlight } as React.CSSProperties}
    >
        {children}
    </Tag>
)

export default ShimmerText
