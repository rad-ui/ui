'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './light-beams.css'

export type LightBeamsProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Number of beams. */
    count?: number
    /** Beam colour. */
    color?: string
    /** Seconds per sway. */
    speed?: number
    paused?: boolean
}

const LightBeams = ({ count = 5, color = 'rgba(167, 139, 250, 0.5)', speed = 8, paused = false, className, style, children, ...props }: LightBeamsProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        className={['rad-fx-beams', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-beam-color': color, '--rad-fx-beam-speed': `${speed}s`, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-beams-rig" aria-hidden="true">
            {Array.from({ length: count }, (_, i) => {
                const position = count === 1 ? 50 : 10 + (80 / (count - 1)) * i
                return <span
                    key={i}
                    className="rad-fx-beam"
                    style={{ left: `${position}%`, '--rad-fx-beam-tilt': `${(position - 50) * 0.5}deg`, animationDelay: `${-i * 1.3}s` } as React.CSSProperties}
                />
            })}
        </div>
        <div className="rad-fx-beams-content">{children}</div>
    </div>
}

export default LightBeams
