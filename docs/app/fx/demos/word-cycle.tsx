'use client'
import WordCycle from '@/registry/fx/word-cycle'

export const WordCycleDemo = () => (
    <h2 className="px-6 text-center text-3xl font-semibold tracking-tight text-gray-1000">
        Interfaces that feel <WordCycle
            words={['fast', 'accessible', 'alive', 'yours']}
            colors={['var(--rad-ui-color-sky-950)', 'var(--rad-ui-color-green-950)', 'var(--rad-ui-color-pink-950)', 'var(--rad-ui-color-amber-950)']}
        />
    </h2>
)
