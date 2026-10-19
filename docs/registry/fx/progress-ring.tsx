import * as React from 'react'

import './progress-ring.css'

export type ProgressRingProps = {
    /** 0–100. Leave undefined for an indeterminate spinner. */
    value?: number
    /** Accessible name, e.g. "Uploading report.pdf". */
    label: string
    /** Diameter in px. */
    size?: number
    /** Ring thickness in px. */
    thickness?: number
    /** Show the percentage in the middle. */
    showValue?: boolean
    color?: string
    className?: string
}

const ProgressRing = ({ value, label, size = 96, thickness = 8, showValue = true, color = '#a78bfa', className }: ProgressRingProps) => {
    const indeterminate = value === undefined
    const clamped = Math.min(100, Math.max(0, value ?? 0))
    const radius = 50 - thickness / 2
    const circumference = 2 * Math.PI * radius

    return <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : 100}
        aria-valuenow={indeterminate ? undefined : Math.round(clamped)}
        className={['rad-fx-ring', className].filter(Boolean).join(' ')}
        data-state={indeterminate ? 'indeterminate' : 'determinate'}
        style={{ width: size, height: size, '--rad-fx-ring-color': color } as React.CSSProperties}
    >
        <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
            <circle className="rad-fx-ring-track" cx="50" cy="50" r={radius} strokeWidth={thickness} />
            <circle
                className="rad-fx-ring-bar"
                cx="50" cy="50" r={radius}
                strokeWidth={thickness}
                strokeDasharray={circumference}
                strokeDashoffset={indeterminate ? circumference * 0.7 : circumference * (1 - clamped / 100)}
            />
        </svg>
        {showValue && !indeterminate ? <span className="rad-fx-ring-value" aria-hidden="true">{Math.round(clamped)}%</span> : null}
    </div>
}

export default ProgressRing
