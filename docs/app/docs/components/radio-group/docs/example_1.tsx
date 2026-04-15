"use client"

import RadioGroup from "@radui/ui/RadioGroup"

const options = [
    { id: 'default', value: 'default', label: 'Default' },
    { id: 'comfortable', value: 'comfortable', label: 'Comfortable' },
    { id: 'compact', value: 'compact', label: 'Compact' }
]

const RadioGroupExample = () => {
    return (
        <RadioGroup.Root defaultValue="comfortable" aria-label="Density">
            {options.map((option) => (
                <RadioGroup.Label key={option.id}>
                    <RadioGroup.Item value={option.value}>
                        <RadioGroup.Indicator />
                    </RadioGroup.Item>
                    {option.label}
                </RadioGroup.Label>
            ))}
        </RadioGroup.Root>
    )
}

export default RadioGroupExample
