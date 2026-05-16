"use client"

import { useState } from "react"
import CheckboxCards from "@radui/ui/CheckboxCards"

const options = [
    { id: 'notifications', value: 'notifications', title: 'Enable notifications', description: 'You can enable or disable notifications at any time.' },
    { id: 'marketing', value: 'marketing', title: 'Marketing emails', description: 'Receive occasional product news and feature updates.' },
    { id: 'security', value: 'security', title: 'Security alerts', description: 'Get notified about important account activity.' }
]

const CheckboxCardsExample = () => {
    const [checked, setChecked] = useState(['notifications', 'security'])

    return (
        <CheckboxCards.Root
            name="preferences"
            value={checked}
            onValueChange={setChecked}
        >
            {options.map((option) => (
                <CheckboxCards.Item key={option.id} value={option.value}>
                    <CheckboxCards.Content>
                        <CheckboxCards.Indicator />
                    </CheckboxCards.Content>
                    <div>
                        <div className="font-semibold text-sm">{option.title}</div>
                        <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                </CheckboxCards.Item>
            ))}
        </CheckboxCards.Root>
    )
}

export default CheckboxCardsExample
