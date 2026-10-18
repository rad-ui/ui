'use client'

import * as React from 'react'

import { useOffscreen } from './use-reduced-motion'
import './mesh-gradient.css'

export type MeshGradientProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Four colours, one per corner of the mesh. */
    colors?: [string, string, string, string]
    /** Seconds per drift cycle. */
    speed?: number
    paused?: boolean
}

// Four soft colour fields drifting around each other, like a living gradient mesh.
const MeshGradient = ({ colors = ['#4f46e5', '#db2777', '#0891b2', '#7c3aed'], speed = 16, paused = false, className, style, children, ...props }: MeshGradientProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const offscreen = useOffscreen(ref)

    return <div
        ref={ref}
        className={['rad-fx-mesh', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{ '--rad-fx-mesh-1': colors[0], '--rad-fx-mesh-2': colors[1], '--rad-fx-mesh-3': colors[2], '--rad-fx-mesh-4': colors[3], '--rad-fx-mesh-speed': `${speed}s`, ...style } as React.CSSProperties}
        {...props}
    >
        <div className="rad-fx-mesh-layer" aria-hidden="true">
            <span /><span /><span /><span />
        </div>
        <div className="rad-fx-mesh-content">{children}</div>
    </div>
}

export default MeshGradient
