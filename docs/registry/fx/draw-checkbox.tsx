'use client'

import * as React from 'react'

import './draw-checkbox.css'

export type DrawCheckboxProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> & {
    /** Visible label. */
    label: React.ReactNode
}

// A native checkbox, so form submission, keyboard, labels and screen readers all
// behave exactly like a plain input. Only the box and tick are drawn on top.
const DrawCheckbox = React.forwardRef<HTMLInputElement, DrawCheckboxProps>(({ label, className, style, ...inputProps }, ref) => (
    <label className={['rad-fx-check', className].filter(Boolean).join(' ')} style={style}>
        <span className="rad-fx-check-control">
            <input ref={ref} type="checkbox" className="rad-fx-check-input" {...inputProps} />
            <svg className="rad-fx-check-box" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <rect x="2" y="2" width="20" height="20" rx="6" />
                <path d="M6.5 12.5 L10.5 16.5 L17.5 8" pathLength={1} />
            </svg>
        </span>
        <span className="rad-fx-check-label">{label}</span>
    </label>
))

DrawCheckbox.displayName = 'DrawCheckbox'

export default DrawCheckbox
