'use client'

import * as React from 'react'

import { useInViewOnce } from './use-reduced-motion'
import './stagger-list.css'

export type StaggerListProps = {
    /** List items: usually <li> elements. */
    children: React.ReactNode
    as?: 'ul' | 'ol' | 'div'
    /** Milliseconds between items. */
    stagger?: number
    /** Milliseconds per item. */
    duration?: number
    className?: string
}

// Items fade up one after another when the list scrolls into view. The list
// semantics, order and content are untouched; only opacity and position animate.
const StaggerList = ({ children, as: Tag = 'ul', stagger = 70, duration = 500, className }: StaggerListProps) => {
    const ref = React.useRef<HTMLElement | null>(null)
    const [visible, setVisible] = React.useState(false)
    useInViewOnce(ref, () => setVisible(true), !visible, 0.1)

    let index = 0
    const items = React.Children.map(children, (child) => {
        if (!React.isValidElement<{ style?: React.CSSProperties }>(child)) return child
        const i = index++
        return React.cloneElement(child, { style: { ...child.props.style, '--rad-fx-stagger-i': i } as React.CSSProperties })
    })

    return <Tag
        ref={ref as React.Ref<never>}
        className={['rad-fx-stagger', className].filter(Boolean).join(' ')}
        data-state={visible ? 'visible' : 'hidden'}
        onFocusCapture={() => setVisible(true)}
        style={{ '--rad-fx-stagger-step': `${stagger}ms`, '--rad-fx-stagger-duration': `${duration}ms` } as React.CSSProperties}
    >
        {items}
    </Tag>
}

export default StaggerList
