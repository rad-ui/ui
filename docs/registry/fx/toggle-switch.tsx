'use client'

import * as React from 'react'

import './toggle-switch.css'

export type ToggleSwitchProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'onChange'> & {
    /** Visible label; also the switch's accessible name. */
    label: React.ReactNode
    checked?: boolean
    defaultChecked?: boolean
    onCheckedChange?: (checked: boolean) => void
}

// A button with role="switch": Space and Enter toggle it, and screen readers
// announce on/off. The knob squishes on press and springs across.
const ToggleSwitch = React.forwardRef<HTMLButtonElement, ToggleSwitchProps>(({ label, checked, defaultChecked = false, onCheckedChange, className, onClick, ...props }, ref) => {
    const [internal, setInternal] = React.useState(defaultChecked)
    const isOn = checked ?? internal
    const labelId = React.useId()

    return <span className={['rad-fx-switch', className].filter(Boolean).join(' ')}>
        <button
            ref={ref}
            type="button"
            role="switch"
            aria-checked={isOn}
            aria-labelledby={labelId}
            className="rad-fx-switch-track"
            data-state={isOn ? 'on' : 'off'}
            onClick={(event) => {
                onClick?.(event)
                const next = !isOn
                if (checked === undefined) setInternal(next)
                onCheckedChange?.(next)
            }}
            {...props}
        >
            <span className="rad-fx-switch-knob" aria-hidden="true" />
        </button>
        <span id={labelId} className="rad-fx-switch-label">{label}</span>
    </span>
})

ToggleSwitch.displayName = 'ToggleSwitch'

export default ToggleSwitch
