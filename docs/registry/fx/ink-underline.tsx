'use client'

import * as React from 'react'

import { useInViewOnce } from './use-reduced-motion'
import './ink-underline.css'

export type InkUnderlineProps = {
    children: React.ReactNode
    color?: string
    /** `inView` draws once when visible; `hover` draws on hover and keyboard focus inside. */
    trigger?: 'inView' | 'hover'
    /** Stroke width in the underline's own units (about px at body size). */
    thickness?: number
    className?: string
}

const InkUnderline = ({ children, color = '#f472b6', trigger = 'inView', thickness = 3, className }: InkUnderlineProps) => {
    const ref = React.useRef<HTMLSpanElement | null>(null)
    const [drawn, setDrawn] = React.useState(false)
    useInViewOnce(ref, () => setDrawn(true), trigger === 'inView' && !drawn, 0.6)

    return <span
        ref={ref}
        className={['rad-fx-ink', className].filter(Boolean).join(' ')}
        data-trigger={trigger}
        data-state={drawn ? 'drawn' : 'idle'}
        style={{ '--rad-fx-ink-color': color } as React.CSSProperties}
    >
        {children}
        <svg className="rad-fx-ink-line" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M2 8 C 30 2, 50 12, 80 6 S 130 2, 160 7 S 190 9, 198 5" pathLength={1} strokeWidth={thickness} />
        </svg>
    </span>
}

export default InkUnderline
