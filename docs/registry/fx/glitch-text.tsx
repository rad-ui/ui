'use client'

import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import { useOffscreen } from './use-reduced-motion'
import './glitch-text.css'

type GlitchTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'

export type GlitchTextProps = {
    text: string
    as?: GlitchTag
    /** Seconds between glitch bursts. Each burst is brief and never flashes more than 3 times a second. */
    interval?: number
    /** Colours of the two split channels. */
    colors?: [string, string]
    paused?: boolean
    className?: string
}

const GlitchText = ({ text, as: Tag = 'span', interval = 3, colors = ['#22d3ee', '#f472b6'], paused = false, className }: GlitchTextProps) => {
    const ref = React.useRef<HTMLElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <Tag
        ref={ref as React.Ref<never>}
        className={['rad-fx-glitch', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-glitch-interval': `${interval}s`, '--rad-fx-glitch-a': colors[0], '--rad-fx-glitch-b': colors[1] } as React.CSSProperties}
    >
        <VisuallyHidden asChild><span>{text}</span></VisuallyHidden>
        {/* Real elements rather than ::before/::after with content: attr(),
            which some screen readers read aloud. */}
        <span className="rad-fx-glitch-stack" aria-hidden="true">
            <span className="rad-fx-glitch-base">{text}</span>
            <span className="rad-fx-glitch-layer" data-channel="a">{text}</span>
            <span className="rad-fx-glitch-layer" data-channel="b">{text}</span>
        </span>
    </Tag>
}

export default GlitchText
