'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './lava-lamp.css'

export type LavaLampProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Two colours: the blobs blend from the first to the second. */
    colors?: [string, string]
    /** Seconds per rise and fall. */
    speed?: number
    paused?: boolean
}

const BLOBS = [
    { left: '12%', size: '16%', delay: '0s', duration: 1 },
    { left: '58%', size: '13%', delay: '-3s', duration: 1.25 },
    { left: '36%', size: '11%', delay: '-6s', duration: 0.85 },
    { left: '74%', size: '9%', delay: '-1.5s', duration: 1.1 },
    { left: '24%', size: '10%', delay: '-4.5s', duration: 1.4 },
    { left: '48%', size: '14%', delay: '-8s', duration: 1.2 },
    { left: '84%', size: '12%', delay: '-5.5s', duration: 0.95 }
]

// Blobs rise and sink; a blur-then-threshold SVG filter makes them merge like wax.
const LavaLamp = ({ colors = ['#f472b6', '#8b5cf6'], speed = 12, paused = false, className, style, children, ...props }: LavaLampProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)
    const filterId = `rad-fx-lava-${React.useId().replace(/[^a-zA-Z0-9-]/g, '')}`

    return <div
        ref={ref}
        className={['rad-fx-lava', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-lava-a': colors[0], '--rad-fx-lava-b': colors[1], '--rad-fx-lava-speed': `${speed}s`, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-lava-wax" aria-hidden="true" style={{ filter: `url(#${filterId})` }}>
            {BLOBS.map((blob, i) => (
                <span
                    key={i}
                    className="rad-fx-lava-blob"
                    style={{ left: blob.left, width: blob.size, animationDelay: blob.delay, animationDuration: `calc(var(--rad-fx-lava-speed, 12s) * ${blob.duration})` }}
                />
            ))}
        </div>
        <svg className="rad-fx-lava-defs" aria-hidden="true" focusable="false">
            <filter id={filterId}>
                <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
            </filter>
        </svg>
        <div className="rad-fx-lava-content">{children}</div>
    </div>
}

export default LavaLamp
