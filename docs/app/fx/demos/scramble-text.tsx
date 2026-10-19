'use client'
import ScrambleText from '@/registry/fx/scramble-text'

export const ScrambleTextDemo = () => (
    <ScrambleText as="h2" text="ACCESS GRANTED" className="text-3xl font-semibold tracking-widest text-gray-1000" />
)

export const ScrambleTextHoverDemo = () => (
    <p className="text-lg text-gray-950">
        Hover the code: <ScrambleText trigger="hover" text="RAD-UI-FX-2026" className="text-gray-1000" />
    </p>
)
