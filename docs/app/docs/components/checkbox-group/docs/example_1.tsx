"use client"

import { useState } from "react"
import CheckboxGroup from "@radui/ui/CheckboxGroup"

const options = [
    { id: 'notifications', value: 'notifications', label: 'Email notifications' },
    { id: 'marketing', value: 'marketing', label: 'Marketing emails' },
    { id: 'security', value: 'security', label: 'Security alerts' }
]

const CheckboxGroupExample = () => {
    const [checked, setChecked] = useState(['notifications', 'security'])

    return (
        <CheckboxGroup.Root
            name="preferences"
            value={checked}
            onValueChange={setChecked}
        >
            {options.map((option) => (
                <CheckboxGroup.Label key={option.id}>
                    <CheckboxGroup.Trigger value={option.value}>
                        <CheckboxGroup.Indicator />
                    </CheckboxGroup.Trigger>
                    {option.label}
                </CheckboxGroup.Label>
            ))}
        </CheckboxGroup.Root>
    )
}

export default CheckboxGroupExample
