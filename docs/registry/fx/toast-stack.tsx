'use client'

import * as React from 'react'

import './toast-stack.css'

export type Toast = {
    id: string | number
    title: React.ReactNode
    description?: React.ReactNode
}

export type ToastStackProps = {
    toasts: Toast[]
    onDismiss: (id: Toast['id']) => void
    /** Accessible name for the region. */
    label?: string
    /** Newest toasts fanned out in a stack; older ones tuck behind. */
    visible?: number
    className?: string
}

// A polite live region: new toasts are announced without stealing focus.
// Hovering or focusing the stack fans every toast out so all are reachable.
const ToastStack = ({ toasts, onDismiss, label = 'Notifications', visible = 3, className }: ToastStackProps) => {
    const ordered = [...toasts].reverse()

    return <section className={['rad-fx-toasts', className].filter(Boolean).join(' ')} aria-label={label}>
        <ol className="rad-fx-toasts-list" aria-live="polite" aria-relevant="additions">
            {ordered.map((toast, i) => (
                <li
                    key={toast.id}
                    className="rad-fx-toast"
                    style={{ '--rad-fx-toast-i': i, zIndex: ordered.length - i, opacity: i >= visible ? 0 : undefined } as React.CSSProperties}
                >
                    <div className="rad-fx-toast-text">
                        <p className="rad-fx-toast-title">{toast.title}</p>
                        {toast.description ? <p className="rad-fx-toast-description">{toast.description}</p> : null}
                    </div>
                    <button type="button" className="rad-fx-toast-close" aria-label="Dismiss notification" onClick={() => onDismiss(toast.id)}>
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 7 L17 17 M17 7 L7 17" /></svg>
                    </button>
                </li>
            ))}
        </ol>
    </section>
}

export default ToastStack
