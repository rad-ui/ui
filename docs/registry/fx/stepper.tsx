import * as React from 'react'

import './stepper.css'

export type StepperProps = {
    steps: string[]
    /** Index of the current step. Earlier steps show as done. */
    current: number
    /** Accessible name for the list, e.g. "Checkout progress". */
    label?: string
    className?: string
}

// An ordered list: the current step has aria-current="step", and done steps say so
// in text, not just with a tick. The connecting line fills as you advance.
const Stepper = ({ steps, current, label = 'Progress', className }: StepperProps) => (
    <ol className={['rad-fx-stepper', className].filter(Boolean).join(' ')} aria-label={label}>
        {steps.map((step, i) => {
            const state = i < current ? 'done' : i === current ? 'current' : 'upcoming'
            return <li key={step} className="rad-fx-step" data-state={state} aria-current={state === 'current' ? 'step' : undefined}>
                <span className="rad-fx-step-marker" aria-hidden="true">
                    <span className="rad-fx-step-number">{i + 1}</span>
                    <svg viewBox="0 0 24 24" focusable="false"><path d="M6 12.5 L10 16.5 L18 8" pathLength={1} /></svg>
                </span>
                <span className="rad-fx-step-label">
                    {step}
                    {state === 'done' ? <span className="rad-fx-step-sr"> (completed)</span> : null}
                </span>
                {i < steps.length - 1 ? <span className="rad-fx-step-line" aria-hidden="true" /> : null}
            </li>
        })}
    </ol>
)

export default Stepper
