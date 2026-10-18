'use client'

import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import { useOffscreen } from './use-reduced-motion'
import './wave-text.css'

type WaveTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'

export type WaveTextProps = {
    /** The text. Screen readers get it once, whole. */
    text: string
    as?: WaveTag
    /** `loop` ripples continuously; `hover` only while the pointer is over it. */
    trigger?: 'loop' | 'hover'
    /** Height of the wave, in em. */
    amplitude?: number
    /** Seconds for one ripple to travel through a letter. */
    duration?: number
    /** Seconds between neighbouring letters. */
    stagger?: number
    paused?: boolean
    className?: string
}

const WaveText = ({ text, as: Tag = 'span', trigger = 'loop', amplitude = 0.22, duration = 1.4, stagger = 0.06, paused = false, className }: WaveTextProps) => {
    const ref = React.useRef<HTMLElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <Tag
        ref={ref as React.Ref<never>}
        className={['rad-fx-wave', className].filter(Boolean).join(' ')}
        data-trigger={trigger}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-wave-amplitude': `${amplitude}em`, '--rad-fx-wave-duration': `${duration}s`, '--rad-fx-wave-stagger': `${stagger}s` } as React.CSSProperties}
    >
        <VisuallyHidden asChild><span>{text}</span></VisuallyHidden>
        <span aria-hidden="true">
            {Array.from(text).map((char, i) => (
                <span key={i} className="rad-fx-wave-char" style={{ '--rad-fx-wave-index': i } as React.CSSProperties}>
                    {char === ' ' ? ' ' : char}
                </span>
            ))}
        </span>
    </Tag>
}

export default WaveText
