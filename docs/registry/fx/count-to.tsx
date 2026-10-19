'use client'

import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import { useInViewOnce, useReducedMotion } from './use-reduced-motion'
import './count-to.css'

export type CountToProps = {
    /** Final value. Screen readers only get this. */
    to: number
    from?: number
    /** Milliseconds to count. */
    duration?: number
    /** Passed to Intl.NumberFormat, e.g. { style: 'currency', currency: 'USD' }. */
    format?: Intl.NumberFormatOptions
    /** Defaults to en-US so server and client format identically. */
    locale?: string
    className?: string
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

const CountTo = ({ to, from = 0, duration = 1600, format, locale = 'en-US', className }: CountToProps) => {
    const ref = React.useRef<HTMLSpanElement | null>(null)
    const reduced = useReducedMotion(ref)
    const [value, setValue] = React.useState(to)
    const formatter = React.useMemo(() => new Intl.NumberFormat(locale, format), [locale, format])
    const decimals = format?.maximumFractionDigits ?? 0

    useInViewOnce(ref, () => {
        if (reduced) return
        const start = performance.now()
        const step = (now: number) => {
            const progress = Math.min(1, (now - start) / duration)
            const current = from + (to - from) * easeOut(progress)
            setValue(progress < 1 ? Number(current.toFixed(decimals)) : to)
            if (progress < 1) requestAnimationFrame(step)
        }
        setValue(from)
        requestAnimationFrame(step)
    }, !reduced)

    return <span ref={ref} className={['rad-fx-count-to', className].filter(Boolean).join(' ')}>
        <VisuallyHidden asChild><span>{formatter.format(to)}</span></VisuallyHidden>
        <span aria-hidden="true">{formatter.format(value)}</span>
    </span>
}

export default CountTo
