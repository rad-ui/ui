'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './wave-lines.css'

export type WaveLinesProps = React.ComponentPropsWithoutRef<'div'> & {
    /** One colour per wave, back to front. */
    colors?: string[]
    /** Seconds for the front wave to drift one full width. */
    speed?: number
    paused?: boolean
}

const DEFAULT_COLORS = ['rgba(99, 102, 241, 0.22)', 'rgba(168, 85, 247, 0.28)', 'rgba(34, 211, 238, 0.32)']

// One period of a smooth wave, drawn twice side by side so the drift loops seamlessly.
const WAVE = 'M0 60 C 150 20, 250 100, 400 60 S 650 20, 800 60 V 120 H 0 Z'

const WaveLines = ({ colors = DEFAULT_COLORS, speed = 14, paused = false, className, style, children, ...props }: WaveLinesProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        className={['rad-fx-waves', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-waves-speed': `${speed}s`, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-waves-sea" aria-hidden="true">
            {colors.map((color, i) => (
                <svg
                    key={i}
                    className="rad-fx-wave-line"
                    viewBox="0 0 1600 120"
                    preserveAspectRatio="none"
                    focusable="false"
                    // Every wave sits on the bottom edge; back waves are taller so they show above the front ones.
                    style={{ '--rad-fx-wave-i': i, height: `${55 - (i * 20) / Math.max(1, colors.length - 1)}%` } as React.CSSProperties}
                >
                    <path d={WAVE} fill={color} />
                    <path d={WAVE} fill={color} transform="translate(800 0)" />
                </svg>
            ))}
        </div>
        <div className="rad-fx-waves-content">{children}</div>
    </div>
}

export default WaveLines
