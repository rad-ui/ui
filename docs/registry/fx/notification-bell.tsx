'use client'

import * as React from 'react'

import { useReducedMotion } from './use-reduced-motion'
import './notification-bell.css'

export type NotificationBellProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> & {
    /** Unread count. The bell rings and the badge pops when it goes up. */
    count: number
    /** Builds the accessible name from the count. */
    getLabel?: (count: number) => string
}

const defaultLabel = (count: number) => (count === 0 ? 'Notifications' : `Notifications, ${count} unread`)

// The count lives in the button's accessible name, so it is read on focus
// without interrupting anyone with live announcements on every increment.
const NotificationBell = ({ count, getLabel = defaultLabel, className, ...props }: NotificationBellProps) => {
    const ref = React.useRef<HTMLButtonElement | null>(null)
    const reduced = useReducedMotion(ref)
    const previous = React.useRef(count)
    const [ringId, setRingId] = React.useState(0)

    React.useEffect(() => {
        if (count > previous.current && !reduced) setRingId((id) => id + 1)
        previous.current = count
    }, [count, reduced])

    return <button ref={ref} type="button" aria-label={getLabel(count)} className={['rad-fx-bell', className].filter(Boolean).join(' ')} {...props}>
        <svg key={`bell-${ringId}`} className="rad-fx-bell-icon" data-ring={ringId > 0 ? '' : undefined} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M6 16 V11 a6 6 0 0 1 12 0 V16 l1.5 2 h-15 Z" />
            <path d="M10 20.5 a2 2 0 0 0 4 0" />
        </svg>
        {count > 0 ? <span key={`badge-${ringId}`} className="rad-fx-bell-badge" aria-hidden="true">{count > 99 ? '99+' : count}</span> : null}
    </button>
}

export default NotificationBell
