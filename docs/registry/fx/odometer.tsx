'use client'

import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import './odometer.css'

export type OdometerProps = {
    value: number
    /** Passed to Intl.NumberFormat. */
    format?: Intl.NumberFormatOptions
    /** Defaults to en-US so server and client format identically. */
    locale?: string
    /** Announce changes politely to screen readers. Off by default: only turn it on for values people need to hear. */
    live?: boolean
    className?: string
}

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

// Each digit is a vertical strip of 0–9 that rolls to its value. The strips are
// aria-hidden; screen readers get the formatted number as plain text.
const Odometer = ({ value, format, locale = 'en-US', live = false, className }: OdometerProps) => {
    const text = React.useMemo(() => new Intl.NumberFormat(locale, format).format(value), [value, format, locale])
    const chars = Array.from(text)

    return <span className={['rad-fx-odometer', className].filter(Boolean).join(' ')}>
        <VisuallyHidden asChild><span aria-live={live ? 'polite' : undefined}>{text}</span></VisuallyHidden>
        <span className="rad-fx-odometer-display" aria-hidden="true">
            {chars.map((char, i) => {
                // Key digits from the right, so units stay units when the number grows.
                const key = chars.length - i
                const digit = DIGITS.indexOf(char)
                if (digit === -1) return <span key={`s${key}`} className="rad-fx-odometer-symbol">{char}</span>
                return <span key={`d${key}`} className="rad-fx-odometer-digit">
                    <span className="rad-fx-odometer-strip" style={{ transform: `translateY(${-digit * 10}%)` }}>
                        {DIGITS.map((d) => <span key={d}>{d}</span>)}
                    </span>
                </span>
            })}
        </span>
    </span>
}

export default Odometer
