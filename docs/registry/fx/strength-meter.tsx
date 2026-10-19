import * as React from 'react'

import './strength-meter.css'

export type StrengthMeterProps = {
    /** 0 (none) to 4 (strong). */
    score: 0 | 1 | 2 | 3 | 4
    /** Accessible name, e.g. "Password strength". */
    label?: string
    /** Text for each score, also shown under the meter. */
    levels?: [string, string, string, string, string]
    className?: string
}

const DEFAULT_LEVELS: [string, string, string, string, string] = ['Too short', 'Weak', 'Fair', 'Good', 'Strong']
const COLORS = ['#71717a', '#ef4444', '#f59e0b', '#22c55e', '#10b981']

// role="meter" with the level as aria-valuetext, so it reads "Strong", not "4".
// The level is also written out in text: colour is never the only signal.
const StrengthMeter = ({ score, label = 'Strength', levels = DEFAULT_LEVELS, className }: StrengthMeterProps) => (
    <div className={['rad-fx-strength', className].filter(Boolean).join(' ')} style={{ '--rad-fx-strength-color': COLORS[score] } as React.CSSProperties}>
        <div
            role="meter"
            aria-label={label}
            aria-valuemin={0}
            aria-valuemax={4}
            aria-valuenow={score}
            aria-valuetext={levels[score]}
            className="rad-fx-strength-bars"
        >
            {[1, 2, 3, 4].map((step) => (
                <span key={step} className="rad-fx-strength-bar" data-on={step <= score ? '' : undefined} />
            ))}
        </div>
        <p className="rad-fx-strength-text" aria-hidden="true">{levels[score]}</p>
    </div>
)

export default StrengthMeter
