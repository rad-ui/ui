'use client'
import { useState } from 'react'
import Button from '@radui/ui/Button'
import GridBackdrop from '@/registry/fx/grid-backdrop'
import DotField from '@/registry/fx/dot-field'
import Starfield from '@/registry/fx/starfield'
import MeteorShower from '@/registry/fx/meteor-shower'

const Title = ({ children }: { children: React.ReactNode }) => (
    <p className="text-center text-3xl font-semibold tracking-tight text-gray-1000">{children}</p>
)

export const GridBackdropDemo = () => (
    <GridBackdrop className="flex w-full items-center justify-center px-8 py-28"><Title>Enter the grid</Title></GridBackdrop>
)

export const DotFieldDemo = () => (
    <DotField className="flex w-full items-center justify-center px-8 py-28"><Title>Quietly alive</Title></DotField>
)

export const StarfieldDemo = () => (
    <Starfield className="flex w-full items-center justify-center bg-gray-50 px-8 py-28"><Title>Night shift</Title></Starfield>
)

export const MeteorShowerDemo = () => (
    <MeteorShower className="flex w-full items-center justify-center px-8 py-28"><Title>Make a wish</Title></MeteorShower>
)

export const PausableStarfieldDemo = () => {
    const [paused, setPaused] = useState(false)
    return <Starfield paused={paused} className="flex w-full items-center justify-center px-8 py-16">
        <Button variant="soft" color="gray" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
            {paused ? 'Play background' : 'Pause background'}
        </Button>
    </Starfield>
}
