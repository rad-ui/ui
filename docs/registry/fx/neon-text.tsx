import * as React from 'react'

import './neon-text.css'

type NeonTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'

export type NeonTextProps = {
    children: React.ReactNode
    as?: NeonTag
    /** Tube colour: used for the glow. The letters stay a pale tint of it. */
    color?: string
    /** A rare, gentle flicker: two short dips every few seconds, well under 3 flashes a second. */
    flicker?: boolean
    className?: string
}

// Real text, never split. Use it on a dark surface: the glow is what sells it.
const NeonText = ({ children, as: Tag = 'span', color = '#e879f9', flicker = true, className }: NeonTextProps) => (
    <Tag
        className={['rad-fx-neon', className].filter(Boolean).join(' ')}
        data-flicker={flicker ? '' : undefined}
        style={{ '--rad-fx-neon-color': color } as React.CSSProperties}
    >
        {children}
    </Tag>
)

export default NeonText
