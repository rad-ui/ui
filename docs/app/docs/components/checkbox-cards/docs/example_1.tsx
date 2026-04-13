"use client"

import CheckboxCards from "@radui/ui/CheckboxCards"

const CheckboxCardsExample = () => {
    return (
        <CheckboxCards.Root className="flex gap-3">
            <CheckboxCards.Item value="design">
                <CheckboxCards.Content>Design</CheckboxCards.Content>
                <CheckboxCards.Indicator />
            </CheckboxCards.Item>
            <CheckboxCards.Item value="engineering">
                <CheckboxCards.Content>Engineering</CheckboxCards.Content>
                <CheckboxCards.Indicator />
            </CheckboxCards.Item>
            <CheckboxCards.Item value="product">
                <CheckboxCards.Content>Product</CheckboxCards.Content>
                <CheckboxCards.Indicator />
            </CheckboxCards.Item>
        </CheckboxCards.Root>
    )
}

export default CheckboxCardsExample
