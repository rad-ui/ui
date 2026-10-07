'use client'
import { useState } from 'react'
import Button from '@radui/ui/Button'
import AuroraBackdrop from '@/registry/fx/aurora-backdrop'

export const AuroraBackdropHero = () => (
    <AuroraBackdrop className="flex w-full items-center justify-center px-8 py-24">
        <p className="text-center text-3xl font-semibold tracking-tight text-gray-1000">Build something bright</p>
    </AuroraBackdrop>
)

export const AuroraBackdropPausable = () => {
    const [paused, setPaused] = useState(false)
    return <AuroraBackdrop paused={paused} speed={14} className="flex w-full items-center justify-center px-8 py-16">
        <Button variant="soft" color="gray" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
            {paused ? 'Play background' : 'Pause background'}
        </Button>
    </AuroraBackdrop>
}
