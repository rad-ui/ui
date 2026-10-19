'use client'

import * as React from 'react'

import './expand-strip.css'

export type ExpandStripItem = {
    title: string
    description?: React.ReactNode
    /** Any CSS background: colour, gradient or url(). */
    background: string
    href?: string
}

export type ExpandStripProps = {
    items: ExpandStripItem[]
    /** Accessible name for the list. */
    label: string
    className?: string
}

// A row of panels; the one under the pointer or keyboard focus widens to show its
// description. Every title and description is always in the DOM and readable.
const ExpandStrip = ({ items, label, className }: ExpandStripProps) => (
    <ul className={['rad-fx-strip', className].filter(Boolean).join(' ')} aria-label={label}>
        {items.map((item) => {
            const inner = <>
                <span className="rad-fx-strip-title">{item.title}</span>
                {item.description ? <span className="rad-fx-strip-description">{item.description}</span> : null}
            </>
            return <li key={item.title} className="rad-fx-strip-item" style={{ background: item.background }}>
                {item.href
                    ? <a className="rad-fx-strip-body" href={item.href}>{inner}</a>
                    : <div className="rad-fx-strip-body" tabIndex={0}>{inner}</div>}
            </li>
        })}
    </ul>
)

export default ExpandStrip
