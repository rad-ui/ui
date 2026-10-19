'use client'

import * as React from 'react'

import { useReducedMotion } from './use-reduced-motion'
import './dock.css'

export type DockItem = {
    /** Accessible name, also shown as the tooltip label. */
    label: string
    icon: React.ReactNode
    onSelect?: () => void
}

export type DockProps = {
    items: DockItem[]
    /** Accessible name for the toolbar. */
    label?: string
    /** Extra scale for the item under the pointer. */
    magnification?: number
    className?: string
}

// A toolbar of icon buttons that swell near the pointer. One Tab stop; arrow keys
// move between items (the toolbar pattern), and the focused item magnifies too.
const Dock = ({ items, label = 'Dock', magnification = 0.6, className }: DockProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const reduced = useReducedMotion(ref)
    const buttons = React.useRef<(HTMLButtonElement | null)[]>([])
    const [active, setActive] = React.useState(0)

    const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (reduced || event.pointerType === 'touch') return
        buttons.current.forEach((button) => {
            if (!button) return
            const rect = button.getBoundingClientRect()
            const distance = Math.abs(event.clientX - (rect.left + rect.width / 2))
            const influence = Math.max(0, 1 - distance / 140)
            button.style.setProperty('--rad-fx-dock-scale', `${1 + influence * magnification}`)
        })
    }

    const reset = () => buttons.current.forEach((button) => button?.style.setProperty('--rad-fx-dock-scale', '1'))

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const moves: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, Home: -Infinity, End: Infinity }
        if (!(event.key in moves)) return
        event.preventDefault()
        const step = moves[event.key]
        const next = step === -Infinity ? 0 : step === Infinity ? items.length - 1 : (active + step + items.length) % items.length
        setActive(next)
        buttons.current[next]?.focus()
    }

    return <div
        ref={ref}
        role="toolbar"
        aria-label={label}
        aria-orientation="horizontal"
        className={['rad-fx-dock', className].filter(Boolean).join(' ')}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        onKeyDown={handleKeyDown}
    >
        {items.map((item, i) => (
            <button
                key={item.label}
                ref={(node) => { buttons.current[i] = node }}
                type="button"
                className="rad-fx-dock-item"
                aria-label={item.label}
                tabIndex={i === active ? 0 : -1}
                onFocus={() => setActive(i)}
                onClick={item.onSelect}
            >
                <span className="rad-fx-dock-icon" aria-hidden="true">{item.icon}</span>
                <span className="rad-fx-dock-tip" aria-hidden="true">{item.label}</span>
            </button>
        ))}
    </div>
}

export default Dock
