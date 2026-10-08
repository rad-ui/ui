'use client'

import * as React from 'react'

import { useInViewOnce } from './use-reduced-motion'
import './fill-text.css'

type FillTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'

export type FillTextProps = {
    children: React.ReactNode
    as?: FillTag
    /** Fill colour. The outline uses the same colour. */
    color?: string
    /** `inView` fills once when visible; `hover` fills on hover. */
    trigger?: 'inView' | 'hover'
    className?: string
}

// Outlined letters that flood with colour. Real, unsplit text throughout.
const FillText = ({ children, as: Tag = 'span', color = '#f4f4f5', trigger = 'inView', className }: FillTextProps) => {
    const ref = React.useRef<HTMLElement | null>(null)
    const [filled, setFilled] = React.useState(false)
    useInViewOnce(ref, () => setFilled(true), trigger === 'inView' && !filled, 0.6)

    return <Tag
        ref={ref as React.Ref<never>}
        className={['rad-fx-fill', className].filter(Boolean).join(' ')}
        data-trigger={trigger}
        data-state={filled ? 'filled' : 'outline'}
        style={{ '--rad-fx-fill-color': color } as React.CSSProperties}
    >
        {children}
    </Tag>
}

export default FillText
