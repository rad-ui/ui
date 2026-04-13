"use client"

import RadioGroup from "@radui/ui/RadioGroup"

const RadioGroupExample = () => {
    return (
        <RadioGroup.Root name="plan">
            <RadioGroup.Item value="free">
                <RadioGroup.Indicator />
                <RadioGroup.Label>Free — $0/month</RadioGroup.Label>
            </RadioGroup.Item>
            <RadioGroup.Item value="pro">
                <RadioGroup.Indicator />
                <RadioGroup.Label>Pro — $12/month</RadioGroup.Label>
            </RadioGroup.Item>
            <RadioGroup.Item value="enterprise">
                <RadioGroup.Indicator />
                <RadioGroup.Label>Enterprise — Custom pricing</RadioGroup.Label>
            </RadioGroup.Item>
        </RadioGroup.Root>
    )
}

export default RadioGroupExample
