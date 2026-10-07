'use client'

import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import { useOffscreen } from './use-reduced-motion'
import './circular-text.css'

export type CircularTextProps = {
    /** Text around the circle, e.g. "SCROLL DOWN • SCROLL DOWN • ". Read once by screen readers. */
    text: string
    /** Diameter in px. */
    size?: number
    /** Seconds per turn. */
    duration?: number
    direction?: 'clockwise' | 'counterclockwise'
    /** Shown in the centre, e.g. an icon. */
    children?: React.ReactNode
    paused?: boolean
    className?: string
}

const CircularText = ({ text, size = 160, duration = 16, direction = 'clockwise', children, paused = false, className }: CircularTextProps) => {
    const ref = React.useRef<HTMLSpanElement | null>(null)
    const offscreen = useOffscreen(ref)
    const pathId = `rad-fx-circle-${React.useId().replace(/[^a-zA-Z0-9-]/g, '')}`
    const radius = 38
    const circumference = 2 * Math.PI * radius

    return <span
        ref={ref}
        className={['rad-fx-circular', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        data-direction={direction}
        style={{ width: size, height: size, '--rad-fx-circular-duration': `${duration}s` } as React.CSSProperties}
    >
        <VisuallyHidden asChild><span>{text.trim()}</span></VisuallyHidden>
        <svg className="rad-fx-circular-ring" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
            <defs>
                <path id={pathId} d={`M 50 50 m -${radius} 0 a ${radius} ${radius} 0 1 1 ${radius * 2} 0 a ${radius} ${radius} 0 1 1 -${radius * 2} 0`} />
            </defs>
            <text>
                {/* Non-breaking spaces survive textLength fitting, so the seam keeps its gap. */}
                <textPath href={`#${pathId}`} textLength={circumference} lengthAdjust="spacing">{text.replace(/ /g, '\u00a0')}</textPath>
            </text>
        </svg>
        {children ? <span className="rad-fx-circular-center">{children}</span> : null}
    </span>
}

export default CircularText
