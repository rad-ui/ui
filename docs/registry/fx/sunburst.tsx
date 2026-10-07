'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './sunburst.css'

export type SunburstProps = React.ComponentPropsWithoutRef<'div'> & {
    color?: string
    /** Number of rays. */
    rays?: number
    /** Where the rays come from, as "x y" percentages, e.g. "50% 100%" for the bottom edge. */
    origin?: string
    /** Seconds per full turn. */
    speed?: number
    paused?: boolean
}

// Rays fanning out from a point, turning very slowly. Retro posters, celebrations.
const Sunburst = ({ color = 'rgba(250, 204, 21, 0.14)', rays = 18, origin = '50% 50%', speed = 60, paused = false, className, style, children, ...props }: SunburstProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        className={['rad-fx-sunburst', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-sun-color': color, '--rad-fx-sun-step': `${360 / rays}deg`, '--rad-fx-sun-x': origin.split(' ')[0], '--rad-fx-sun-y': origin.split(' ')[1] ?? '50%', '--rad-fx-sun-speed': `${speed}s`, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-sunburst-layer" aria-hidden="true">
            <span className="rad-fx-sunburst-rays" />
        </div>
        <div className="rad-fx-sunburst-content">{children}</div>
    </div>
}

export default Sunburst
