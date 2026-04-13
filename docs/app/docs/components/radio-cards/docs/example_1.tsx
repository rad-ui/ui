"use client"

import RadioCards from "@radui/ui/RadioCards"

const RadioCardsExample = () => {
    return (
        <RadioCards.Root name="plan" className="flex gap-3">
            <RadioCards.Item value="free">Free</RadioCards.Item>
            <RadioCards.Item value="pro">Pro</RadioCards.Item>
            <RadioCards.Item value="enterprise">Enterprise</RadioCards.Item>
        </RadioCards.Root>
    )
}

export default RadioCardsExample
