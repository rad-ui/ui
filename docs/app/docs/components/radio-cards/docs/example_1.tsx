"use client"

import RadioCards from "@radui/ui/RadioCards"

const options = [
    { id: 'plus', value: 'plus', title: 'Plus', description: 'For individuals and small teams.' },
    { id: 'pro', value: 'pro', title: 'Pro', description: 'For growing businesses.' },
    { id: 'enterprise', value: 'enterprise', title: 'Enterprise', description: 'For large teams and enterprises.' }
]

const RadioCardsExample = () => {
    return (
        <RadioCards.Root defaultValue="plus" aria-label="Plan">
            {options.map((option) => (
                <RadioCards.Item key={option.id} value={option.value}>
                    <div className="font-semibold text-sm">{option.title}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                </RadioCards.Item>
            ))}
        </RadioCards.Root>
    )
}

export default RadioCardsExample
