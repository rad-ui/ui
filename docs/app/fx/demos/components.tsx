'use client'
import { useState } from 'react'
import Button from '@radui/ui/Button'
import OrbitBorder from '@/registry/fx/orbit-border'
import Marquee from '@/registry/fx/marquee'
import SlidingTabs from '@/registry/fx/sliding-tabs'

export const OrbitBorderDemo = () => (
    <div className="p-10">
        <OrbitBorder className="w-80 bg-gray-100 p-6 text-gray-1000">
            <p className="text-lg font-semibold">Pro plan</p>
            <p className="mt-2 text-sm text-gray-950">Draw the eye without moving the layout.</p>
        </OrbitBorder>
    </div>
)

const LOGOS = ['Acme', 'Globex', 'Initech', 'Umbrella', 'Hooli', 'Stark', 'Wayne', 'Wonka']

export const MarqueeDemo = () => {
    const [paused, setPaused] = useState(false)
    return <div className="flex w-full flex-col items-center gap-4 py-10">
        <Marquee label="Customers" paused={paused} className="w-full">
            {LOGOS.map((logo) => (
                <span key={logo} className="rounded-lg border border-gray-400 bg-gray-100 px-5 py-2 text-lg font-semibold text-gray-1000">{logo}</span>
            ))}
        </Marquee>
        <Button size="small" variant="soft" color="gray" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
            {paused ? 'Play' : 'Pause'}
        </Button>
    </div>
}

export const SlidingTabsDemo = () => (
    <div className="w-full max-w-md p-8 text-gray-1000">
        <SlidingTabs tabs={[
            { value: 'overview', label: 'Overview', content: <p className="mt-4 text-sm text-gray-950">Arrow keys move between tabs. The indicator just follows.</p> },
            { value: 'activity', label: 'Activity', content: <p className="mt-4 text-sm text-gray-950">Built on Rad UI Tabs: roles, focus and keyboard come from the library.</p> },
            { value: 'settings', label: 'Settings', content: <p className="mt-4 text-sm text-gray-950">Turn on Reduce motion and the indicator snaps instead of sliding.</p> }
        ]} />
    </div>
)
