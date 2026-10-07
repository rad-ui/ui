import * as React from 'react'

import './color-shift-text.css'

type ColorShiftTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'

export type ColorShiftTextProps = {
    children: React.ReactNode
    as?: ColorShiftTag
    /** Two or more colours that flow through the text. Check each against your background. */
    colors?: string[]
    /** Seconds per cycle. */
    duration?: number
    className?: string
}

const DEFAULT_COLORS = ['#22d3ee', '#a78bfa', '#f472b6', '#22d3ee']

const ColorShiftText = ({ children, as: Tag = 'span', colors = DEFAULT_COLORS, duration = 6, className }: ColorShiftTextProps) => (
    <Tag
        className={['rad-fx-color-shift', className].filter(Boolean).join(' ')}
        style={{
            '--rad-fx-color-shift-gradient': `linear-gradient(90deg, ${colors.join(', ')})`,
            '--rad-fx-color-shift-duration': `${duration}s`
        } as React.CSSProperties}
    >
        {children}
    </Tag>
)

export default ColorShiftText
