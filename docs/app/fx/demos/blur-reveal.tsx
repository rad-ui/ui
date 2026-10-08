'use client'
import BlurReveal from '@/registry/fx/blur-reveal'

export const BlurRevealHeadline = () => (
    <BlurReveal
        as="h2"
        text="Ship interfaces people remember"
        className="max-w-xl px-6 text-center text-4xl font-semibold tracking-tight text-gray-1000"
    />
)

export const BlurRevealLetters = () => (
    <BlurReveal
        by="letter"
        stagger={30}
        text="Motion, minus the vertigo."
        className="px-6 text-center text-2xl font-medium text-gray-1000"
    />
)
