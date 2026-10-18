'use client'

import * as React from 'react'

import './compare-slider.css'

export type CompareSliderProps = {
    before: React.ReactNode
    after: React.ReactNode
    /** Accessible name for the slider, e.g. "Before and after comparison". */
    label?: string
    /** Starting position, 0–100. */
    defaultValue?: number
    className?: string
}

// Before/after comparison driven by a real <input type="range">: arrow keys, Home/End,
// screen-reader value announcements and touch all come from the browser.
const CompareSlider = ({ before, after, label = 'Comparison position', defaultValue = 50, className }: CompareSliderProps) => {
    const [value, setValue] = React.useState(defaultValue)

    return <div className={['rad-fx-compare', className].filter(Boolean).join(' ')} style={{ '--rad-fx-compare': `${value}%` } as React.CSSProperties}>
        <div className="rad-fx-compare-layer">{after}</div>
        <div className="rad-fx-compare-layer rad-fx-compare-before">{before}</div>
        <div className="rad-fx-compare-handle" aria-hidden="true"><span /></div>
        <input
            type="range"
            min={0}
            max={100}
            value={value}
            aria-label={label}
            aria-valuetext={`${value}% before`}
            className="rad-fx-compare-input"
            onChange={(event) => setValue(Number(event.target.value))}
        />
    </div>
}

export default CompareSlider
