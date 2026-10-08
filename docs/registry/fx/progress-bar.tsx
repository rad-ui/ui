import * as React from 'react'

import './progress-bar.css'

export type ProgressBarProps = {
    /** 0–100. Leave undefined for an indeterminate bar. */
    value?: number
    /** Accessible name, e.g. "Installing dependencies". */
    label: string
    /** Show the label and percentage above the bar. */
    showLabel?: boolean
    color?: string
    className?: string
}

const ProgressBar = ({ value, label, showLabel = true, color = '#a78bfa', className }: ProgressBarProps) => {
    const indeterminate = value === undefined
    const clamped = Math.min(100, Math.max(0, value ?? 0))
    const labelId = React.useId()

    return <div className={['rad-fx-bar', className].filter(Boolean).join(' ')} style={{ '--rad-fx-bar-color': color } as React.CSSProperties}>
        {showLabel ? <div className="rad-fx-bar-meta">
            <span id={labelId}>{label}</span>
            {!indeterminate ? <span aria-hidden="true">{Math.round(clamped)}%</span> : null}
        </div> : null}
        <div
            role="progressbar"
            aria-labelledby={showLabel ? labelId : undefined}
            aria-label={showLabel ? undefined : label}
            aria-valuemin={indeterminate ? undefined : 0}
            aria-valuemax={indeterminate ? undefined : 100}
            aria-valuenow={indeterminate ? undefined : Math.round(clamped)}
            className="rad-fx-bar-track"
            data-state={indeterminate ? 'indeterminate' : 'determinate'}
        >
            <div className="rad-fx-bar-fill" style={indeterminate ? undefined : { transform: `scaleX(${clamped / 100})` }} />
        </div>
    </div>
}

export default ProgressBar
