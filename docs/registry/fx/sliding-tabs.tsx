'use client'

import * as React from 'react'
import Tabs from '@radui/ui/Tabs'

import './sliding-tabs.css'

export type SlidingTab = {
    value: string
    label: React.ReactNode
    content: React.ReactNode
}

export type SlidingTabsProps = {
    tabs: SlidingTab[]
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
    className?: string
}

// Rad UI Tabs owns the behaviour: roles, arrow-key navigation, focus and
// selection. This component only adds the sliding indicator and a content fade.
const SlidingTabs = ({ tabs, defaultValue, value, onValueChange, className }: SlidingTabsProps) => {
    const [internal, setInternal] = React.useState(defaultValue ?? tabs[0]?.value)
    const current = value ?? internal
    const listRef = React.useRef<HTMLDivElement | null>(null)
    const triggerRefs = React.useRef(new Map<string, HTMLElement>())
    const [indicator, setIndicator] = React.useState<{ left: number, width: number } | null>(null)

    const measure = React.useCallback(() => {
        const trigger = current ? triggerRefs.current.get(current) : undefined
        if (!trigger) return
        setIndicator({ left: trigger.offsetLeft, width: trigger.offsetWidth })
    }, [current])

    React.useLayoutEffect(() => { measure() }, [measure])

    React.useEffect(() => {
        const list = listRef.current
        if (!list || typeof ResizeObserver === 'undefined') return
        const observer = new ResizeObserver(measure)
        observer.observe(list)
        return () => observer.disconnect()
    }, [measure])

    const handleChange = (next: string) => {
        if (value === undefined) setInternal(next)
        onValueChange?.(next)
    }

    return <Tabs.Root
        // Own class namespace: Rad UI theme styles stay off, this file's CSS is the only styling.
        customRootClass="rad-fx-sliding-tabs"
        className={className}
        value={current}
        onValueChange={handleChange}
    >
        <Tabs.List ref={listRef} className="rad-fx-sliding-tabs-list">
            {indicator ? <span
                className="rad-fx-sliding-tabs-indicator"
                aria-hidden="true"
                style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
            /> : null}
            {tabs.map((tab) => (
                <Tabs.Trigger
                    key={tab.value}
                    value={tab.value}
                    className="rad-fx-sliding-tabs-trigger"
                    ref={(node: HTMLElement | null) => {
                        if (node) triggerRefs.current.set(tab.value, node)
                        else triggerRefs.current.delete(tab.value)
                    }}
                >
                    {tab.label}
                </Tabs.Trigger>
            ))}
        </Tabs.List>
        {tabs.map((tab) => (
            <Tabs.Content key={tab.value} value={tab.value} className="rad-fx-sliding-tabs-content">
                {tab.content}
            </Tabs.Content>
        ))}
    </Tabs.Root>
}

export default SlidingTabs
