'use client'

import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import './copy-button.css'

export type CopyButtonProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> & {
    /** Text to copy. */
    value: string
    /** Accessible name, e.g. "Copy install command". */
    label?: string
    /** Milliseconds before returning to the copy icon. */
    resetAfter?: number
}

// The copy icon morphs into a check, and a status message says "Copied" so the
// result is announced, not just shown.
const CopyButton = ({ value, label = 'Copy', resetAfter = 1800, className, onClick, ...props }: CopyButtonProps) => {
    const [copied, setCopied] = React.useState(false)
    const timer = React.useRef<number | undefined>(undefined)
    React.useEffect(() => () => window.clearTimeout(timer.current), [])

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            window.clearTimeout(timer.current)
            timer.current = window.setTimeout(() => setCopied(false), resetAfter)
        } catch {
            setCopied(false)
        }
    }

    return <>
        <button type="button" aria-label={label} className={['rad-fx-copy', className].filter(Boolean).join(' ')} data-state={copied ? 'copied' : 'idle'} onClick={handleClick} {...props}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <g className="rad-fx-copy-icon">
                    <rect x="8" y="8" width="12" height="12" rx="2.5" />
                    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                </g>
                <path className="rad-fx-copy-check" d="M5 12.5 L10 17.5 L19 7" pathLength={1} />
            </svg>
        </button>
        <VisuallyHidden asChild><span role="status">{copied ? 'Copied' : ''}</span></VisuallyHidden>
    </>
}

export default CopyButton
