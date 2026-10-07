'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './warp-tunnel.css'

export type WarpTunnelProps = React.ComponentPropsWithoutRef<'div'> & {
    color?: string
    /** Number of frames in flight. */
    rings?: number
    /** Seconds for a frame to reach you. Keep it slow: zooming motion can trigger vestibular discomfort. */
    speed?: number
    paused?: boolean
}

// Rounded frames rushing toward the viewer, like flying down a tunnel.
const WarpTunnel = ({ color = 'rgba(167, 139, 250, 0.6)', rings = 10, speed = 6, paused = false, className, style, children, ...props }: WarpTunnelProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        className={['rad-fx-warp', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-warp-color': color, '--rad-fx-warp-speed': `${speed}s`, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-warp-layer" aria-hidden="true">
            {Array.from({ length: rings }, (_, i) => (
                <span key={i} className="rad-fx-warp-ring" style={{ animationDelay: `calc(var(--rad-fx-warp-speed, 6s) * ${(-i / rings).toFixed(3)})`, '--rad-fx-warp-rest': (0.15 + (i / rings) * 0.85).toFixed(2) } as React.CSSProperties} />
            ))}
        </div>
        <div className="rad-fx-warp-content">{children}</div>
    </div>
}

export default WarpTunnel
