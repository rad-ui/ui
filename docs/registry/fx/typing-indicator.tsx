import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import './typing-indicator.css'

export type TypingIndicatorProps = {
    /** Announced to screen readers, e.g. "Ada is typing". */
    label?: string
    color?: string
    className?: string
}

const TypingIndicator = ({ label = 'Typing', color = 'currentColor', className }: TypingIndicatorProps) => (
    <span role="status" className={['rad-fx-typing', className].filter(Boolean).join(' ')} style={{ '--rad-fx-typing-color': color } as React.CSSProperties}>
        <VisuallyHidden asChild><span>{label}</span></VisuallyHidden>
        <span className="rad-fx-typing-dot" aria-hidden="true" />
        <span className="rad-fx-typing-dot" aria-hidden="true" />
        <span className="rad-fx-typing-dot" aria-hidden="true" />
    </span>
)

export default TypingIndicator
