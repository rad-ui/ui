import * as React from 'react'

import './smooth-details.css'

export type SmoothDetailsProps = Omit<React.ComponentPropsWithoutRef<'details'>, 'title'> & {
    /** The always-visible summary line. */
    title: React.ReactNode
}

// Native <details>/<summary>: keyboard, screen readers, find-in-page and
// no-JS all work. Browsers that support ::details-content animate the height;
// others simply open instantly.
const SmoothDetails = ({ title, className, children, ...props }: SmoothDetailsProps) => (
    <details className={['rad-fx-details', className].filter(Boolean).join(' ')} {...props}>
        <summary className="rad-fx-details-summary">
            <span>{title}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 9 L12 15 L18 9" /></svg>
        </summary>
        <div className="rad-fx-details-body">{children}</div>
    </details>
)

export default SmoothDetails
