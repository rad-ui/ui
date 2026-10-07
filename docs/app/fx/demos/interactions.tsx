'use client'
import { useState } from 'react'
import Button from '@radui/ui/Button'
import GlowCard from '@/registry/fx/glow-card'
import PerspectiveCard from '@/registry/fx/perspective-card'
import Magnetic from '@/registry/fx/magnetic'
import ClickBurst from '@/registry/fx/click-burst'
import RevealOnScroll from '@/registry/fx/reveal-on-scroll'

const cardClass = 'w-72 rounded-2xl border border-gray-400 bg-gray-100 p-6 text-gray-1000'

export const GlowCardDemo = () => (
    <div className="flex flex-wrap justify-center gap-4 p-6">
        {['Keyboard ready', 'Pointer aware'].map((title) => (
            <GlowCard key={title} className={cardClass}>
                <p className="text-lg font-semibold">{title}</p>
                <p className="mt-2 text-sm text-gray-950">Move the pointer over the card, or tab to the link.</p>
                <a href="#" className="mt-4 inline-block text-sm font-medium text-green-1000 underline">Learn more</a>
            </GlowCard>
        ))}
    </div>
)

export const PerspectiveCardDemo = () => (
    <div className="p-10">
        <PerspectiveCard className={cardClass}>
            <p className="text-lg font-semibold">Gentle tilt</p>
            <p className="mt-2 text-sm text-gray-950">Capped at 8°, off for touch and for reduced motion.</p>
        </PerspectiveCard>
    </div>
)

export const MagneticDemo = () => (
    <div className="flex gap-6 p-10">
        <Magnetic><Button>Get started</Button></Magnetic>
        <Magnetic strength={0.5}><Button variant="soft" color="gray">Stronger pull</Button></Magnetic>
    </div>
)

export const ClickBurstDemo = () => {
    const [count, setCount] = useState(0)
    return <div className="flex flex-col items-center gap-3 p-10">
        <ClickBurst><Button onClick={() => setCount((c) => c + 1)}>Celebrate</Button></ClickBurst>
        <p className="text-sm text-gray-950" aria-live="polite">Clicked {count} times</p>
    </div>
}

export const RevealOnScrollDemo = () => (
    <div className="grid w-full max-w-xl grid-cols-1 gap-3 p-8 sm:grid-cols-3">
        {['Reveal', 'on', 'scroll'].map((word, i) => (
            <RevealOnScroll key={word} delay={i * 120} className="rounded-xl border border-gray-400 bg-gray-100 p-6 text-center font-semibold text-gray-1000">
                {word}
            </RevealOnScroll>
        ))}
    </div>
)
