import * as React from 'react'

import './success-check.css'

export type SuccessCheckProps = {
    /** Announced to screen readers, e.g. "Payment complete". */
    label: string
    /** Diameter in px. */
    size?: number
    color?: string
    className?: string
}

// A ring draws itself, then the tick, then a soft pop. Render it when the
// success happens: it carries role="status" so the label is announced.
const SuccessCheck = ({ label, size = 88, color = '#4ade80', className }: SuccessCheckProps) => (
    <span role="status" aria-label={label} className={['rad-fx-success', className].filter(Boolean).join(' ')} style={{ width: size, height: size, '--rad-fx-success-color': color } as React.CSSProperties}>
        <svg viewBox="0 0 52 52" aria-hidden="true" focusable="false">
            <circle className="rad-fx-success-ring" cx="26" cy="26" r="23" pathLength={1} />
            <path className="rad-fx-success-tick" d="M15 27 L23 34 L37 19" pathLength={1} />
        </svg>
    </span>
)

export default SuccessCheck
