'use client'

import * as React from 'react'

import { useInViewOnce } from './use-reduced-motion'
import './marker-highlight.css'

export type MarkerHighlightProps = {
    children: React.ReactNode
    /** `mark` tells assistive tech the text is highlighted; use `span` for purely visual emphasis. */
    as?: 'mark' | 'span'
    /** Marker colour. Keep it light enough for the text on top to keep its contrast. */
    color?: string
    /** Milliseconds for the stroke. */
    duration?: number
    delay?: number
    className?: string
}

const MarkerHighlight = ({ children, as: Tag = 'mark', color = 'rgba(250, 204, 21, 0.45)', duration = 900, delay = 0, className }: MarkerHighlightProps) => {
    const ref = React.useRef<HTMLElement | null>(null)
    const [drawn, setDrawn] = React.useState(false)
    useInViewOnce(ref, () => setDrawn(true), !drawn, 0.6)

    return <Tag
        ref={ref as React.Ref<never>}
        className={['rad-fx-marker', className].filter(Boolean).join(' ')}
        data-state={drawn ? 'drawn' : 'idle'}
        style={{ '--rad-fx-marker-color': color, '--rad-fx-marker-duration': `${duration}ms`, '--rad-fx-marker-delay': `${delay}ms` } as React.CSSProperties}
    >
        {children}
    </Tag>
}

export default MarkerHighlight
